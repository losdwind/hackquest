import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const segmentsPath = getArg('--segments')
  ? path.resolve(getArg('--segments'))
  : path.join(
      repoRoot,
      'Syllabus',
      'course-1-stablecoin-protocol',
      'Unit 1 Background Foundations',
      '1 DeFi landscape',
      'voiceover-en-segments.json',
    );

const captionsPath = getArg('--out')
  ? path.resolve(getArg('--out'))
  : path.join(
      repoRoot,
      'remotion',
      'public',
      'courses',
      'course-1-stablecoin-protocol',
      'unit-1',
      'lesson-1-defi-landscape',
      'captions',
      'lines.json',
    );

const segmentsDir = getArg('--audio-dir')
  ? path.resolve(getArg('--audio-dir'))
  : path.join(
      repoRoot,
      'remotion',
      'public',
      'courses',
      'course-1-stablecoin-protocol',
      'unit-1',
      'lesson-1-defi-landscape',
      'audio',
      'segments',
    );

const fps = Number(getArg('--fps') ?? 30);

const segmentsRaw = await fs.readFile(segmentsPath, 'utf8');
const segments = JSON.parse(segmentsRaw);

const getDurationMs = (filePath) => {
  const result = spawnSync(
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

  if (result.status !== 0) {
    throw new Error(`ffprobe failed for ${filePath}`);
  }

  const durationSec = Number.parseFloat(result.stdout.trim());
  if (!Number.isFinite(durationSec)) {
    throw new Error(`Invalid duration for ${filePath}`);
  }

  return Math.max(1, Math.round(durationSec * 1000));
};

let cursorMs = 0;
const captions = [];

for (const segment of segments) {
  const fileName = `${String(segment.id).padStart(3, '0')}.mp3`;
  const filePath = path.join(segmentsDir, fileName);
  const durationMs = getDurationMs(filePath);
  const startMs = cursorMs;
  const endMs = startMs + durationMs;

  captions.push({
    text: segment.text,
    startMs,
    endMs,
    timestampMs: startMs,
    confidence: null,
  });

  cursorMs = endMs;
}

await fs.mkdir(path.dirname(captionsPath), {recursive: true});
await fs.writeFile(captionsPath, JSON.stringify(captions, null, 2), 'utf8');

const durationInFrames = Math.max(1, Math.ceil((cursorMs / 1000) * fps));
const publicRoot = path.join(repoRoot, 'remotion', 'public');
const captionsRelPath = path
  .relative(publicRoot, captionsPath)
  .split(path.sep)
  .join('/');
const configPath = path.join(
  repoRoot,
  'remotion',
  'src',
  'courses',
  'course-1-stablecoin-protocol',
  'Unit 1 Background Foundations',
  '1 DeFi landscape',
  'lesson.config.ts',
);
const configContents = await fs.readFile(configPath, 'utf8');
const updatedConfig = configContents
  .replace(/durationInFrames:\s*\d+/, `durationInFrames: ${durationInFrames}`)
  .replace(/captions:\s*'[^']*'/, `captions: '${captionsRelPath}'`);

await fs.writeFile(configPath, updatedConfig, 'utf8');

console.log(`Wrote ${captions.length} captions to ${captionsPath}`);
console.log(`Updated lesson config: ${configPath}`);
