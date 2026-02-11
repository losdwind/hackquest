import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {parseScriptMd} from '../src/storyboard/parse-script-md.ts';
import {resolveDefaultLessonRoot} from './lib/default-lesson-root.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const coursesRoot = path.join(repoRoot, 'courses');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);

const lessonRoot = path.resolve(getArg('--lesson-root') ?? defaultLessonRoot);

const scriptPathRaw = getArg('--script')
  ? path.resolve(getArg('--script'))
  : null;
const scriptPath =
  scriptPathRaw ??
  (await (async () => {
    const md = path.join(lessonRoot, 'source', 'script.md');
    try {
      await fs.access(md);
      return md;
    } catch {
      return path.join(lessonRoot, 'source', 'script.json');
    }
  })());
const outPath = getArg('--out')
  ? path.resolve(getArg('--out'))
  : path.join(lessonRoot, 'generated', 'voiceover-en-segments.json');

const raw = await fs.readFile(scriptPath, 'utf8');
const isMd = scriptPath.toLowerCase().endsWith('.md');
const script = isMd ? {segments: parseScriptMd(raw)} : JSON.parse(raw);
const segments = Array.isArray(script.segments) ? script.segments : [];

if (!segments.length) {
  throw new Error(`No segments found in ${scriptPath}`);
}

const out = segments.map((s) => {
  const id = Number(s.id);
  const text = String(s.voiceover?.text ?? '').trim();
  if (!Number.isFinite(id) || id <= 0) {
    throw new Error(`Invalid segment id in ${scriptPath}: ${JSON.stringify(s.id)}`);
  }
  if (!text) {
    throw new Error(`Missing voiceover.text for segment ${id} in ${scriptPath}`);
  }
  const entry = {id, text};
  const postGapMs = s.voiceover?.postGapMs;
  if (typeof postGapMs === 'number' && Number.isFinite(postGapMs)) {
    return {...entry, postGapMs};
  }
  return entry;
});

// Basic uniqueness check.
const ids = out.map((s) => s.id);
const dup = ids.find((id, index) => ids.indexOf(id) !== index);
if (dup) {
  throw new Error(`Duplicate segment id ${dup} in ${scriptPath}`);
}

await fs.mkdir(path.dirname(outPath), {recursive: true});
await fs.writeFile(outPath, JSON.stringify(out, null, 2), 'utf8');

console.log(`Wrote ${out.length} segments to ${path.relative(repoRoot, outPath)}`);
