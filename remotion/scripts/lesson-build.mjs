import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import crypto from 'node:crypto';

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

const hasFlag = (flag) => args.includes(flag);

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);
const lessonRoot = getArg('--lesson-root')
  ? path.resolve(getArg('--lesson-root'))
  : defaultLessonRoot;

const skipTts = hasFlag('--skip-tts');

const run = (scriptName, extraArgs = []) => {
  const scriptPath = path.join(scriptDir, scriptName);
  const result = spawnSync('bun', [scriptPath, ...extraArgs], {stdio: 'inherit'});
  if (result.status !== 0) {
    throw new Error(`Failed: bun ${path.relative(repoRoot, scriptPath)} ${extraArgs.join(' ')}`);
  }
};

const sha256 = (value) =>
  crypto.createHash('sha256').update(String(value)).digest('hex');

const readJsonIfExists = async (p) => {
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const resolveTtsOutputDir = async (lessonRootAbs) => {
  const configPath = path.join(lessonRootAbs, 'source', 'voiceover-en-tts-config.json');
  const config = await readJsonIfExists(configPath);
  if (!config) return null;

  const configDir = path.dirname(configPath);
  const lessonRootFromConfig = path.resolve(configDir, '..');
  const outputDirRaw = String(config.outputDir ?? '').trim();
  if (!outputDirRaw) return null;

  const outputDir = path.isAbsolute(outputDirRaw)
    ? outputDirRaw
    : outputDirRaw.replace(/\\/g, '/').startsWith('courses/')
      ? path.join(repoRoot, outputDirRaw)
      : path.join(lessonRootFromConfig, outputDirRaw);

  return {configPath, config, outputDir};
};

const readSegments = async (lessonRootAbs) => {
  const segmentsPath = path.join(lessonRootAbs, 'generated', 'voiceover-en-segments.json');
  const segments = await readJsonIfExists(segmentsPath);
  if (!Array.isArray(segments)) return [];
  return segments
    .map((s) => ({id: Number(s.id), text: String(s.text ?? '')}))
    .filter((s) => Number.isFinite(s.id) && s.id > 0 && s.text.trim());
};

const ensureIncrementalTtsInputs = async ({lessonRootAbs, segments, tts}) => {
  const segmentsDir = tts.outputDir;
  await fs.mkdir(segmentsDir, {recursive: true});

  // Only hash the fields that can affect audio output (not outputDir).
  const ttsFingerprint = {
    languageCode: tts.config.languageCode,
    voiceName: tts.config.voiceName,
    speakingRate: tts.config.speakingRate,
    pitch: tts.config.pitch,
    volumeGainDb: tts.config.volumeGainDb,
    audioEncoding: tts.config.audioEncoding,
    useSsml: tts.config.useSsml,
    breaksMs: tts.config.breaksMs,
    emphasisLevel: tts.config.emphasisLevel,
    emphasisMode: tts.config.emphasisMode,
    emphasisPitch: tts.config.emphasisPitch,
    emphasisRate: tts.config.emphasisRate,
    emphasisWords: tts.config.emphasisWords,
    pronunciations: tts.config.pronunciations,
    prosodyRules: tts.config.prosodyRules,
  };
  const configHash = sha256(JSON.stringify(ttsFingerprint));

  const manifestPath = path.join(segmentsDir, '.tts-manifest.json');
  const previous = await readJsonIfExists(manifestPath);
  const prevSegments = previous?.segments && typeof previous.segments === 'object'
    ? previous.segments
    : {};

  const desired = {};
  const presentIds = new Set();

  for (const seg of segments) {
    const key = String(seg.id).padStart(3, '0');
    presentIds.add(key);
    desired[key] = sha256(`${configHash}\n${seg.text}`);
  }

  // If we have a previous manifest, delete only the mp3s that are now stale.
  if (previous && previous.version === 1 && typeof previous.configHash === 'string') {
    for (const [id, oldHash] of Object.entries(prevSegments)) {
      const newHash = desired[id];
      const shouldDelete = !newHash || (typeof oldHash === 'string' && oldHash !== newHash);
      if (!shouldDelete) continue;
      const mp3 = path.join(segmentsDir, `${id}.mp3`);
      try {
        // eslint-disable-next-line no-await-in-loop
        await fs.unlink(mp3);
      } catch {
        // ignore
      }
    }
  }

  // Also delete mp3 files for segments that no longer exist (manifest-less cleanup).
  // This prevents merge/timings from using orphaned audio if IDs were removed.
  try {
    const entries = await fs.readdir(segmentsDir, {withFileTypes: true});
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const m = /^(\d{3})\.mp3$/.exec(entry.name);
      if (!m) continue;
      const id = m[1];
      if (presentIds.has(id)) continue;
      // eslint-disable-next-line no-await-in-loop
      await fs.unlink(path.join(segmentsDir, entry.name));
    }
  } catch {
    // ignore
  }

  const nextManifest = {
    version: 1,
    configHash,
    segments: desired,
  };
  await fs.writeFile(manifestPath, JSON.stringify(nextManifest, null, 2), 'utf8');
};

const ensureAllAudioSegmentsExist = async ({segments, segmentsDir}) => {
  const missing = [];
  for (const seg of segments) {
    const id = String(seg.id).padStart(3, '0');
    const mp3 = path.join(segmentsDir, `${id}.mp3`);
    // eslint-disable-next-line no-await-in-loop
    if (!(await exists(mp3))) missing.push(`${id}.mp3`);
  }
  if (missing.length) {
    throw new Error(
      `Missing ${missing.length} TTS segment(s) under ${segmentsDir}: ${missing.slice(0, 8).join(', ')}`,
    );
  }
};

// 1) Validate and rebuild segments JSON from script.md / script.json.
run('validate-script.mjs', ['--lesson-root', lessonRoot]);
run('build-segments-from-script.mjs', ['--lesson-root', lessonRoot]);

const segments = await readSegments(lessonRoot);
if (!segments.length) {
  throw new Error(`No segments found for lesson: ${lessonRoot}`);
}

// 2) Incremental TTS (skip unchanged segments).
const tts = await resolveTtsOutputDir(lessonRoot);
if (!skipTts && tts) {
  await ensureIncrementalTtsInputs({lessonRootAbs: lessonRoot, segments, tts});
  run('tts-google.mjs', ['--lesson-root', lessonRoot]);
}

// 3) Merge voiceover + timings + captions (requires mp3 segments).
const segmentsDirDefault = path.join(lessonRoot, 'generated', 'audio', 'segments');
const segmentsDir = tts?.outputDir ?? segmentsDirDefault;
await ensureAllAudioSegmentsExist({segments, segmentsDir});

run('merge-voiceover.mjs', ['--lesson-root', lessonRoot]);
run('build-segment-timings.mjs', ['--lesson-root', lessonRoot]);
run('build-line-captions.mjs', ['--lesson-root', lessonRoot]);

console.log('Lesson build complete.');

