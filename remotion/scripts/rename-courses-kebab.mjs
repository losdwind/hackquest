import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const coursesRoot = path.join(repoRoot, 'courses');

const toPosix = (p) => p.split(path.sep).join('/');

const isDirectory = async (p) => {
  try {
    const stat = await fs.lstat(p);
    return stat.isDirectory();
  } catch {
    return false;
  }
};

const kebabCase = (name) => {
  const raw = String(name ?? '').trim();
  if (!raw) return raw;
  // Keep alnum, turn everything else into hyphens, collapse runs.
  const replaced = raw
    .replace(/['’]/g, '') // drop apostrophes
    .replace(/&/g, ' and ')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return replaced.toLowerCase();
};

const walkDirs = async (rootAbs) => {
  const results = [];
  const queue = [rootAbs];
  while (queue.length) {
    const dir = queue.pop();
    if (!dir) continue;
    const entries = await fs.readdir(dir, {withFileTypes: true});
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('.')) continue;
      const abs = path.join(dir, entry.name);
      results.push(abs);
      queue.push(abs);
    }
  }
  return results;
};

const buildRenamePlan = async () => {
  const dirs = await walkDirs(coursesRoot);
  // Rename bottom-up (deepest first) so parents remain valid while moving children.
  dirs.sort((a, b) => b.split(path.sep).length - a.split(path.sep).length);

  /** @type Array<{fromAbs: string, toAbs: string, parentAbs: string, fromName: string, toName: string}> */
  const plan = [];

  for (const fromAbs of dirs) {
    const parentAbs = path.dirname(fromAbs);
    const fromName = path.basename(fromAbs);
    const toName = kebabCase(fromName);
    if (!toName || toName === fromName) continue;
    const toAbs = path.join(parentAbs, toName);
    plan.push({fromAbs, toAbs, parentAbs, fromName, toName});
  }

  // Collision detection per parent.
  const byParent = new Map();
  for (const item of plan) {
    const key = item.parentAbs;
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key).push(item);
  }

  const errors = [];
  for (const [parentAbs, items] of byParent.entries()) {
    const existing = new Set(
      (await fs.readdir(parentAbs, {withFileTypes: true}))
        .filter((e) => e.isDirectory())
        .map((e) => e.name),
    );

    const targetNames = new Map();
    for (const item of items) {
      const prev = targetNames.get(item.toName);
      if (prev) {
        errors.push(
          `Collision in ${toPosix(path.relative(repoRoot, parentAbs))}: ` +
            `${prev.fromName} and ${item.fromName} -> ${item.toName}`,
        );
      } else {
        targetNames.set(item.toName, item);
      }
    }

    for (const item of items) {
      // If the target name already exists and isn't the directory we're renaming, fail.
      if (existing.has(item.toName) && item.toName !== item.fromName) {
        errors.push(
          `Target exists in ${toPosix(path.relative(repoRoot, parentAbs))}: ` +
            `${item.fromName} -> ${item.toName} (already exists)`,
        );
      }
    }
  }

  if (errors.length) {
    throw new Error(errors.join('\n'));
  }

  return plan;
};

const rewriteFile = async (absPath, transform) => {
  const before = await fs.readFile(absPath, 'utf8');
  const after = transform(before);
  if (after !== before) {
    await fs.writeFile(absPath, after, 'utf8');
    return true;
  }
  return false;
};

const rewriteCourseContentPaths = async () => {
  const changed = [];
  const mdFiles = [];
  const jsonFiles = [];

  const queue = [coursesRoot];
  while (queue.length) {
    const dir = queue.pop();
    if (!dir) continue;
    const entries = await fs.readdir(dir, {withFileTypes: true});
    for (const entry of entries) {
      if (entry.name.startsWith('.')) continue;
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        queue.push(abs);
        continue;
      }
      if (!entry.isFile()) continue;
      if (entry.name.endsWith('.md')) mdFiles.push(abs);
      if (entry.name.endsWith('.json')) jsonFiles.push(abs);
    }
  }

  // Normalize Asset Ref lines to lesson-root relative: "assets/<file>".
  for (const abs of mdFiles) {
    // Only touch files that actually contain Asset Ref.
    const did = await rewriteFile(abs, (text) =>
      text.replace(
        /^Asset Ref:\s*course-[^/\s]+\/.+?\/assets\//gim,
        'Asset Ref: assets/',
      ),
    );
    if (did) changed.push(abs);
  }

  // Normalize voiceover TTS outputDir to lesson-root relative.
  for (const abs of jsonFiles) {
    if (!abs.endsWith('voiceover-en-tts-config.json')) continue;
    const did = await rewriteFile(abs, (text) => {
      try {
        const parsed = JSON.parse(text);
        if (
          parsed &&
          typeof parsed === 'object' &&
          parsed.outputDir &&
          typeof parsed.outputDir === 'string'
        ) {
          parsed.outputDir = 'generated/audio/segments';
          return JSON.stringify(parsed, null, 2) + '\n';
        }
      } catch {
        // ignore parse errors
      }
      return text;
    });
    if (did) changed.push(abs);
  }

  return changed;
};

const main = async () => {
  if (!(await isDirectory(coursesRoot))) {
    throw new Error(`Missing courses dir: ${coursesRoot}`);
  }

  const plan = await buildRenamePlan();
  if (plan.length === 0) {
    console.log('No directory renames needed under courses/.');
    return;
  }

  console.log(`Planned ${plan.length} directory rename(s) under courses/.`);

  // Execute renames.
  for (const item of plan) {
    // eslint-disable-next-line no-await-in-loop
    await fs.rename(item.fromAbs, item.toAbs);
  }

  console.log('Directory renames complete.');

  const rewrites = await rewriteCourseContentPaths();
  console.log(`Rewrote ${rewrites.length} file(s) (Asset Ref / tts outputDir normalization).`);

  console.log('Done.');
};

await main();

