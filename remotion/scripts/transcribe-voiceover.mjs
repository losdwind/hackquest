import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {
  downloadWhisperModel,
  installWhisperCpp,
  toCaptions,
  transcribe,
} from '@remotion/install-whisper-cpp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const audioPath = getArg('--audio')
  ? path.resolve(getArg('--audio'))
  : path.join(
      repoRoot,
      'remotion',
      'public',
      'courses',
      'course-1-stablecoin-protocol',
      'unit-1',
      'lesson-1-defi-landscape',
      'audio',
      'voiceover.mp3',
    );
const outputPath = getArg('--out')
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
      'transcription.json',
    );
const model = getArg('--model') ?? 'small.en';
const whisperDir = getArg('--whisper-dir')
  ? path.resolve(getArg('--whisper-dir'))
  : path.join(repoRoot, 'remotion', '.cache', 'whisper.cpp');
const tempWav = path.join(repoRoot, 'remotion', '.cache', 'voiceover-16k.wav');
const fps = Number(getArg('--fps') ?? 30);

await fs.mkdir(path.dirname(tempWav), {recursive: true});

const ffmpeg = spawnSync(
  'ffmpeg',
  ['-y', '-i', audioPath, '-ar', '16000', '-ac', '1', tempWav],
  {stdio: 'inherit'},
);

if (ffmpeg.status !== 0) {
  throw new Error('ffmpeg failed to convert audio for transcription');
}

await installWhisperCpp({to: whisperDir, version: '1.5.5'});
await downloadWhisperModel({model, folder: whisperDir});

const whisperCppOutput = await transcribe({
  model,
  whisperPath: whisperDir,
  whisperCppVersion: '1.5.5',
  inputPath: tempWav,
  tokenLevelTimestamps: true,
});

const {captions} = toCaptions({whisperCppOutput});

await fs.mkdir(path.dirname(outputPath), {recursive: true});
await fs.writeFile(outputPath, JSON.stringify(captions, null, 2), 'utf8');

const lastEndMs = captions.reduce(
  (max, caption) => Math.max(max, caption.endMs),
  0,
);
const durationInFrames = Math.max(1, Math.ceil((lastEndMs / 1000) * fps));

const publicRoot = path.join(repoRoot, 'remotion', 'public');
const captionsRelPath = path
  .relative(publicRoot, outputPath)
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

console.log(`Wrote captions to ${outputPath}`);
console.log(`Updated lesson config: ${configPath}`);
