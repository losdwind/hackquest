import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const segmentsDir = path.join(
  repoRoot,
  'remotion',
  'public',
  'audio',
  'voiceover',
  'segments',
);
const defaultSegmentsJson = path.join(
  repoRoot,
  'Syllabus',
  'course-1-stablecoin-protocol',
  'Unit 1 Background Foundations',
  '1 DeFi landscape',
  'voiceover-en-segments.json',
);
const outputPath = path.join(
  repoRoot,
  'remotion',
  'public',
  'audio',
  'voiceover',
  'defi-voiceover.mp3',
);
const listPath = path.join(
  repoRoot,
  'remotion',
  'public',
  'audio',
  'voiceover',
  'segments',
  'concat.txt',
);
const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const segmentsJsonPath = getArg('--segments')
  ? path.resolve(getArg('--segments'))
  : defaultSegmentsJson;

const segmentsRaw = await fs.readFile(segmentsJsonPath, 'utf8');
const segments = JSON.parse(segmentsRaw);
const entries = segments
  .map((segment) => String(segment.id).padStart(3, '0') + '.mp3')
  .sort();

if (entries.length === 0) {
  throw new Error(`No mp3 segments found in ${segmentsDir}`);
}

const missing = [];
for (const file of entries) {
  try {
    await fs.access(path.join(segmentsDir, file));
  } catch {
    missing.push(file);
  }
}

if (missing.length) {
  throw new Error(
    `Missing ${missing.length} segment files in ${segmentsDir}: ${missing.slice(0, 5).join(', ')}`,
  );
}

const concatLines = entries
  .map((file) => `file '${path.join(segmentsDir, file)}'`)
  .join('\n');

await fs.writeFile(listPath, concatLines, 'utf8');

const result = spawnSync(
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
    '44100',
    '-ac',
    '1',
    outputPath,
  ],
  {stdio: 'inherit'},
);

if (result.status !== 0) {
  throw new Error('ffmpeg failed to merge voiceover segments');
}

console.log(`Merged ${entries.length} segments into ${outputPath}`);
