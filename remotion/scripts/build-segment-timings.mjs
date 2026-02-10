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

const defaultSegmentsJson = path.join(lessonRoot, 'generated', 'voiceover-en-segments.json');
const defaultSegmentsDir = path.join(lessonRoot, 'generated', 'audio', 'segments');
const defaultOutput = path.join(lessonRoot, 'generated', 'voiceover-en-segment-timings.json');

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

const rawSegments = getArg('--segments') ?? defaultSegmentsJson;
const rawSegmentsDir = getArg('--segments-dir') ?? defaultSegmentsDir;
const rawOutput = getArg('--output') ?? defaultOutput;

const segmentsJsonPath = path.resolve(rawSegments);
const segmentsDir = path.resolve(rawSegmentsDir);
const outputPath = path.resolve(rawOutput);

const segmentsRaw = await fs.readFile(segmentsJsonPath, 'utf8');
const segments = JSON.parse(segmentsRaw);

const timings = [];
let cursorMs = 0;

for (let index = 0; index < segments.length; index += 1) {
  const segment = segments[index];
  const id = Number(segment.id);
  const filename = `${String(id).padStart(3, '0')}.mp3`;
  const filePath = path.join(segmentsDir, filename);
  const probe = spawnSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      filePath,
    ],
    {encoding: 'utf8'},
  );

  if (probe.status !== 0) {
    throw new Error(`ffprobe failed for ${filePath}`);
  }

  const durationSec = Number(String(probe.stdout).trim());
  if (!Number.isFinite(durationSec)) {
    throw new Error(`Invalid duration for ${filePath}`);
  }
  const durationMs = Math.max(1, Math.round(durationSec * 1000));

  timings.push({
    id,
    startMs: cursorMs,
    durationMs,
  });
  cursorMs += durationMs;
  const isLast = index === segments.length - 1;
  if (!isLast) {
    const gapAfterMs = resolveGapAfterSegmentMs(segment, baseGapMs);
    if (gapAfterMs) cursorMs += gapAfterMs;
  }
}

await fs.writeFile(outputPath, JSON.stringify(timings, null, 2), 'utf8');

const gapLabel = hasGapOverride
  ? `gap ${baseGapMs}ms`
  : `smart gap (base ${baseGapMs}ms)`;
console.log(`Wrote ${timings.length} timings to ${outputPath} (${gapLabel})`);
