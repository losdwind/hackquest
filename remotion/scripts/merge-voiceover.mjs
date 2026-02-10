import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

import {resolveDefaultLessonRoot} from './lib/default-lesson-root.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const coursesRoot = path.join(repoRoot, 'courses');

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);
const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const lessonRoot = getArg('--lesson-root')
  ? path.resolve(getArg('--lesson-root'))
  : defaultLessonRoot;

const segmentsDir = path.join(lessonRoot, 'generated', 'audio', 'segments');
const defaultSegmentsJson = path.join(lessonRoot, 'generated', 'voiceover-en-segments.json');
const outputPath = path.join(lessonRoot, 'generated', 'audio', 'voiceover.mp3');
const listPath = path.join(segmentsDir, 'concat.txt');

const DEFAULT_GAP_MS = 800;
const gapMsRaw = getArg('--gap-ms');
const envGapMsRaw = process.env.HQ_SEGMENT_GAP_MS;
const hasGapOverride = gapMsRaw !== null;
const baseGapMs = Math.max(
  0,
  Number(gapMsRaw ?? envGapMsRaw ?? DEFAULT_GAP_MS) || 0,
);

const clampMs = (value, min, max) => Math.min(max, Math.max(min, value));

const getSentenceTerminalGapMs = (text, fallbackMs) => {
  if (!text) return fallbackMs;
  let trimmed = String(text).trim();
  if (!trimmed) return fallbackMs;

  // Strip trailing quotes/brackets so punctuation like ".") still counts.
  trimmed = trimmed.replace(/[\s"'\u201D\u2019)\]}]+$/g, '');
  const last = trimmed.at(-1);
  if (!last) return fallbackMs;

  // Make punctuation-based gaps relative to the base.
  // This avoids accidentally shrinking gaps when DEFAULT_GAP_MS increases.
  if (last === '.' || last === '!' || last === '?') return fallbackMs + 200;
  if (last === ';' || last === ':') return fallbackMs + 80;
  if (last === ',') return fallbackMs - 150;
  return fallbackMs;
};

const resolveGapAfterSegmentMs = (segment, fallbackMs) => {
  if (hasGapOverride) return fallbackMs;
  const rawOverride = segment?.postGapMs;
  if (typeof rawOverride === 'number' && Number.isFinite(rawOverride)) {
    return clampMs(Math.round(rawOverride), 0, 1200);
  }
  return getSentenceTerminalGapMs(segment?.text, fallbackMs);
};

const segmentsJsonPath = getArg('--segments')
  ? path.resolve(getArg('--segments'))
  : defaultSegmentsJson;

const segmentsRaw = await fs.readFile(segmentsJsonPath, 'utf8');
const segments = JSON.parse(segmentsRaw);
const entries = segments.map((segment) => ({
  id: Number(segment.id),
  text: segment.text,
  postGapMs: segment.postGapMs,
  file: String(segment.id).padStart(3, '0') + '.mp3',
}));

if (entries.length === 0) {
  throw new Error(`No mp3 segments found in ${segmentsDir}`);
}

const missing = [];
for (const entry of entries) {
  try {
    await fs.access(path.join(segmentsDir, entry.file));
  } catch {
    missing.push(entry.file);
  }
}

if (missing.length) {
  throw new Error(
    `Missing ${missing.length} segment files in ${segmentsDir}: ${missing.slice(0, 5).join(', ')}`,
  );
}

const sampleRate = 44100;
const channelLayout = 'mono';
let result;

const resolvedGapsMs = entries.map((entry, index) => {
  const isLast = index === entries.length - 1;
  if (isLast) return 0;
  return resolveGapAfterSegmentMs(entry, baseGapMs);
});
const hasAnyGap = resolvedGapsMs.some((ms) => ms > 0);

if (!hasAnyGap) {
  const concatLines = entries
    .map((entry) => `file '${path.join(segmentsDir, entry.file)}'`)
    .join('\n');

  await fs.writeFile(listPath, concatLines, 'utf8');

  result = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      listPath,
      '-c:a',
      'libmp3lame',
      '-b:a',
      '192k',
      '-ar',
      String(sampleRate),
      '-ac',
      '1',
      outputPath,
    ],
    {stdio: 'inherit'},
  );
} else {
  // Build a filter graph that inserts silence between segments.
  const inputArgs = [];
  const filterParts = [];
  const concatInputs = [];
  let inputIndex = 0;

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i];
    const filePath = path.join(segmentsDir, entry.file);
    inputArgs.push('-i', filePath);
    filterParts.push(
      `[${inputIndex}:a]aformat=sample_fmts=fltp:channel_layouts=${channelLayout},aresample=${sampleRate}[a${inputIndex}]`,
    );
    concatInputs.push(`[a${inputIndex}]`);
    inputIndex += 1;

    const gapMsForThis = resolvedGapsMs[i] ?? 0;
    const isLast = i === entries.length - 1;
    if (!isLast && gapMsForThis > 0) {
      const gapSec = gapMsForThis / 1000;
      inputArgs.push(
        '-f',
        'lavfi',
        '-t',
        String(gapSec),
        '-i',
        `anullsrc=r=${sampleRate}:cl=${channelLayout}`,
      );
      filterParts.push(
        `[${inputIndex}:a]aformat=sample_fmts=fltp:channel_layouts=${channelLayout},aresample=${sampleRate}[a${inputIndex}]`,
      );
      concatInputs.push(`[a${inputIndex}]`);
      inputIndex += 1;
    }
  }

  const concatCount = inputIndex;
  const filterComplex = `${filterParts.join(';')};${concatInputs.join('')}concat=n=${concatCount}:v=0:a=1[aout]`;

  result = spawnSync(
    'ffmpeg',
    [
      '-y',
      ...inputArgs,
      '-filter_complex',
      filterComplex,
      '-map',
      '[aout]',
      '-c:a',
      'libmp3lame',
      '-b:a',
      '192k',
      '-ar',
      String(sampleRate),
      '-ac',
      '1',
      outputPath,
    ],
    {stdio: 'inherit'},
  );
}

if (result.status !== 0) {
  throw new Error('ffmpeg failed to merge voiceover segments');
}

const gapLabel = hasGapOverride
  ? `gap ${baseGapMs}ms`
  : `smart gap (base ${baseGapMs}ms)`;
console.log(`Merged ${entries.length} segments into ${outputPath} (${gapLabel})`);
