import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

import {parseScriptMd} from '../src/storyboard/parse-script-md.ts';
import {resolveDefaultLessonRoot} from './lib/default-lesson-root.mjs';
import {resolveMetaFileAbsPath} from './lib/resolve-meta-path.mjs';
import {z} from 'zod';

// Bun can import TS directly; this keeps runtime + build-time schema in sync.
import {registry as storyboardComponentsRegistry} from '../src/storyboard/registry.ts';

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

const metaPath = path.join(lessonRoot, 'source', 'lesson.meta.json');
const mdPath = path.join(lessonRoot, 'source', 'script.md');
const jsonPath = path.join(lessonRoot, 'source', 'script.json');
let scriptPath = mdPath;
try {
  await fs.access(mdPath);
} catch {
  scriptPath = jsonPath;
}

const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'));
const scriptRaw = await fs.readFile(scriptPath, 'utf8');
const script = scriptPath.toLowerCase().endsWith('.md')
  ? {segments: parseScriptMd(scriptRaw)}
  : JSON.parse(scriptRaw);

if (!meta.id || typeof meta.id !== 'string') {
  throw new Error(`Invalid meta.id in ${metaPath}`);
}
if (!meta.assets?.segmentTimings) {
  throw new Error(`Missing meta.assets.segmentTimings in ${metaPath}`);
}
if (!Array.isArray(script.segments) || script.segments.length === 0) {
  throw new Error(`No segments in ${scriptPath}`);
}

const scriptIds = script.segments.map((s) => Number(s.id)).filter((n) => Number.isFinite(n));
const scriptSet = new Set(scriptIds);
if (scriptSet.size !== scriptIds.length) {
  throw new Error(`Duplicate segment ids in ${scriptPath}`);
}

const timingsPath =
  resolveMetaFileAbsPath({
    repoRoot,
    coursesRoot,
    metaAbsPath: metaPath,
    value: meta.assets.segmentTimings,
  }) ?? path.join(coursesRoot, meta.assets.segmentTimings);
const timings = JSON.parse(await fs.readFile(timingsPath, 'utf8'));
const timingIds = (Array.isArray(timings) ? timings : []).map((t) => Number(t.id));
const timingSet = new Set(timingIds);

const missingInTimings = scriptIds.filter((id) => !timingSet.has(id)).sort((a, b) => a - b);
const extraInTimings = timingIds.filter((id) => !scriptSet.has(id)).sort((a, b) => a - b);
if (missingInTimings.length) {
  throw new Error(
    `Timings missing ids from script: ${missingInTimings.slice(0, 10).join(', ')}`,
  );
}
if (extraInTimings.length) {
  throw new Error(
    `Timings has extra ids not in script: ${extraInTimings.slice(0, 10).join(', ')}`,
  );
}

const isVideoRef = (assetRef) =>
  Boolean(assetRef && /\.(mp4|mov|webm|mkv)(\?.*)?$/i.test(assetRef));

const isImageRef = (assetRef) =>
  Boolean(assetRef && /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(assetRef));

const ChartSchema = z
  .object({
    title: z.string(),
    series: z.array(z.object({label: z.string(), value: z.number()})),
    maxValue: z.number().optional(),
  })
  .passthrough();

const formatZodIssues = (err) => {
  const issues = err?.issues;
  if (!Array.isArray(issues) || issues.length === 0) return String(err?.message ?? err);
  return issues
    .slice(0, 12)
    .map((i) => `${i.path?.length ? i.path.join('.') : '(root)'}: ${i.message}`)
    .join('; ');
};

const scriptSegments = script.segments ?? [];
for (const seg of scriptSegments) {
  const id = Number(seg.id);
  const visual = seg.visual ?? {};
  const sceneType = String(visual.sceneType ?? '').toLowerCase();
  const componentName = visual.component ? String(visual.component).trim() : '';
  const assetRef = visual.assetRef ?? null;
  const json = visual.json;

  if (componentName) {
    const def = storyboardComponentsRegistry[componentName];
    if (!def) {
      throw new Error(
        `Segment ${id}: Unknown component "${componentName}". Add it to src/storyboard/registry.ts`,
      );
    }
    if (!json || typeof json !== 'object') {
      throw new Error(
        `Segment ${id}: Component "${componentName}" requires a \`\`\`json block with {"props": {...}}`,
      );
    }
    const props = json?.props;
    if (!props || typeof props !== 'object' || Array.isArray(props)) {
      throw new Error(
        `Segment ${id}: Component "${componentName}" requires JSON envelope {"props": {...}} (top-level props are not allowed)`,
      );
    }

    const parsed = def.propsSchema.safeParse(props);
    if (!parsed.success) {
      throw new Error(
        `Segment ${id}: Invalid props for "${componentName}": ${formatZodIssues(parsed.error)}`,
      );
    }

    if (def.assetKind === 'video') {
      if (!assetRef || !isVideoRef(assetRef)) {
        throw new Error(
          `Segment ${id}: Component "${componentName}" requires Asset Ref to be a video file (mp4/mov/webm/mkv). Got: ${String(assetRef)}`,
        );
      }
    }
    if (def.assetKind === 'image') {
      if (!assetRef || !isImageRef(assetRef)) {
        throw new Error(
          `Segment ${id}: Component "${componentName}" requires Asset Ref to be an image file (png/jpg/webp/gif/svg). Got: ${String(assetRef)}`,
        );
      }
    }
    continue;
  }

  if (/video/.test(sceneType)) {
    if (!assetRef || !isVideoRef(assetRef)) {
      throw new Error(
        `Segment ${id}: Scene Type Video requires Asset Ref to be a video file. Got: ${String(assetRef)}`,
      );
    }
    continue;
  }

  if (/chart|graph/.test(sceneType)) {
    if (!json || typeof json !== 'object') {
      throw new Error(`Segment ${id}: Scene Type Chart requires a JSON block.`);
    }
    const chartCandidate = json.chart ?? json;
    const parsed = ChartSchema.safeParse(chartCandidate);
    if (!parsed.success) {
      throw new Error(`Segment ${id}: Invalid chart JSON: ${formatZodIssues(parsed.error)}`);
    }
  }
}

console.log('Validation passed.');
