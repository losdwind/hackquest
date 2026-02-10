import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');

const coursesRoot = path.join(repoRoot, 'courses');

// Source assets owned by the Remotion/design-system side.
const sourcePublicRoot = path.join(repoRoot, 'remotion', 'public');

// Union public dir (runtime/build artifact). Remotion `--public-dir` should point here.
// This keeps `remotion/public/` clean (brand + other shared assets), while still making
// course assets available to `staticFile()` via symlinks.
const runtimePublicRoot = path.join(repoRoot, 'remotion', '.hq-public');

const ensureDir = async (dir) => {
  await fs.mkdir(dir, {recursive: true});
};

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const ensureSymlink = async (linkPath, targetRel) => {
  try {
    const stat = await fs.lstat(linkPath);
    if (!stat.isSymbolicLink()) {
      throw new Error(`${linkPath} exists and is not a symlink`);
    }
    const current = await fs.readlink(linkPath);
    if (current === targetRel) return;
    await fs.unlink(linkPath);
  } catch (err) {
    if (err && typeof err === 'object' && err.code === 'ENOENT') {
      // create below
    } else if (err && typeof err === 'object' && err.message) {
      // fallthrough: recreate
    }
  }

  try {
    await fs.symlink(targetRel, linkPath);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to create symlink ${linkPath} -> ${targetRel}. ${msg}`,
    );
  }
};

const main = async () => {
  await ensureDir(runtimePublicRoot);

  // Clean up legacy course symlinks that were previously placed in `remotion/public/`.
  // `remotion/public/` should only contain assets owned by the Remotion project (brand, etc.).
  try {
    const legacy = await fs.readdir(sourcePublicRoot, {withFileTypes: true});
    for (const entry of legacy) {
      if (entry.name === 'brand') continue;
      const abs = path.join(sourcePublicRoot, entry.name);
      // eslint-disable-next-line no-await-in-loop
      const stat = await fs.lstat(abs);
      if (stat.isSymbolicLink()) {
        // eslint-disable-next-line no-await-in-loop
        await fs.unlink(abs);
      }
    }
  } catch {
    // ignore
  }

  // Ensure brand assets exist under public/.
  const sourceBrandDir = path.join(sourcePublicRoot, 'brand');
  const runtimeBrandLink = path.join(runtimePublicRoot, 'brand');
  const required = ['logo-full-horizontal.svg'];
  for (const file of required) {
    // eslint-disable-next-line no-await-in-loop
    if (!(await exists(path.join(sourceBrandDir, file)))) {
      throw new Error(
        `Missing ${path.join('remotion', 'public', 'brand', file)}. Expected brand assets to be committed under remotion/public/brand/.`,
      );
    }
  }

  // Link brand dir into the runtime public.
  await ensureSymlink(runtimeBrandLink, '../public/brand');

  // Link each top-level course folder into public/ so `staticFile("course-.../...")` works.
  const entries = await fs.readdir(coursesRoot, {withFileTypes: true});
  const courseDirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => name !== 'brand')
    .sort((a, b) => a.localeCompare(b));

  const targetBaseRel = '../../courses';
  for (const name of courseDirs) {
    const linkPath = path.join(runtimePublicRoot, name);
    const targetRel = `${targetBaseRel}/${name}`;
    // eslint-disable-next-line no-await-in-loop
    await ensureSymlink(linkPath, targetRel);
  }

  console.log(
    `Public dir ready: ${path.join('remotion', '.hq-public')} (linked ${courseDirs.length} course dirs + brand)`,
  );
};

await main();
