import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import dotenv from 'dotenv';

import {resolveDefaultLessonRoot} from './lib/default-lesson-root.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const coursesRoot = path.join(repoRoot, 'courses');
dotenv.config({path: path.join(repoRoot, '.env'), quiet: true});
dotenv.config({path: path.join(repoRoot, 'remotion', '.env'), quiet: true});

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const hasFlag = (flag) => args.includes(flag);

const lessonRoot = getArg('--lesson-root')
  ? path.resolve(getArg('--lesson-root'))
  : defaultLessonRoot;

const segmentsPath = getArg('--segments')
  ? path.resolve(getArg('--segments'))
  : path.join(lessonRoot, 'generated', 'voiceover-en-segments.json');
const configPath = getArg('--config')
  ? path.resolve(getArg('--config'))
  : path.join(lessonRoot, 'source', 'voiceover-en-tts-config.json');
const force = hasFlag('--force');
const fromId = Number(getArg('--from') ?? 0);
const toIdRaw = getArg('--to');
const toId = toIdRaw ? Number(toIdRaw) : Number.POSITIVE_INFINITY;
const timeoutMs = Math.max(1000, Number(getArg('--timeout-ms') ?? 120_000) || 120_000);

const configRaw = await fs.readFile(configPath, 'utf8');
const config = JSON.parse(configRaw);
const configDir = path.dirname(configPath);
const lessonRootFromConfig = path.resolve(configDir, '..');

const outputDirRaw = String(config.outputDir ?? '').trim();
if (!outputDirRaw) {
  throw new Error(`Missing outputDir in ${configPath}`);
}

const outputDir = path.isAbsolute(outputDirRaw)
  ? outputDirRaw
  : outputDirRaw.replace(/\\/g, '/').startsWith('courses/')
    ? path.join(repoRoot, outputDirRaw)
    : path.join(lessonRootFromConfig, outputDirRaw);

const apiKey =
  String(config.apiKey ?? '').trim() ||
  String(process.env.HQ_MINIMAX_API_KEY ?? '').trim() ||
  String(process.env.MINIMAX_API_KEY ?? '').trim();
const endpoint = String(
  config.endpoint ?? process.env.HQ_MINIMAX_ENDPOINT ?? 'https://api-uw.minimax.io/v1/t2a_v2',
).trim();
const groupId =
  String(config.groupId ?? '').trim() || String(process.env.HQ_MINIMAX_GROUP_ID ?? '').trim();

if (!apiKey) {
  throw new Error('Missing apiKey in config or HQ_MINIMAX_API_KEY/MINIMAX_API_KEY');
}
if (!endpoint) {
  throw new Error('Missing endpoint in config or HQ_MINIMAX_ENDPOINT');
}

const model = String(config.model ?? 'speech-2.8-hd').trim() || 'speech-2.8-hd';
const languageBoost = String(config.languageBoost ?? 'auto').trim() || 'auto';
const outputFormat = String(config.outputFormat ?? 'hex').trim().toLowerCase() || 'hex';
if (!['hex', 'url'].includes(outputFormat)) {
  throw new Error(`Invalid outputFormat=${outputFormat}. Expected "hex" or "url".`);
}
const stream = Boolean(config.stream ?? false);
if (stream) {
  throw new Error('stream=true is not supported by this script yet. Please use non-streaming mode.');
}

const toNumberOrUndefined = (value) => {
  if (value === undefined || value === null || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};

const toIntegerOrUndefined = (value) => {
  const n = toNumberOrUndefined(value);
  return Number.isFinite(n) ? Math.trunc(n) : undefined;
};

const voiceSetting = {
  voice_id: String(
    config.voiceId ?? process.env.HQ_MINIMAX_VOICE_ID ?? 'English_Insightful_Speaker',
  ).trim(),
  speed: toNumberOrUndefined(config.speed) ?? 1,
  vol: toNumberOrUndefined(config.volume) ?? 1,
  pitch: toIntegerOrUndefined(config.pitch) ?? 0,
};
if (!voiceSetting.voice_id) {
  throw new Error('Missing voiceId in config or HQ_MINIMAX_VOICE_ID');
}
if (config.emotion !== undefined && config.emotion !== null && String(config.emotion).trim()) {
  voiceSetting.emotion = String(config.emotion).trim();
}
if (config.textNormalization !== undefined) {
  voiceSetting.text_normalization = Boolean(config.textNormalization);
}
if (config.latexRead !== undefined) {
  voiceSetting.latex_read = Boolean(config.latexRead);
}

const audioSetting = {
  sample_rate: toIntegerOrUndefined(config.sampleRate) ?? 32_000,
  bitrate: toIntegerOrUndefined(config.bitrate) ?? 128_000,
  format: String(config.format ?? 'mp3').trim().toLowerCase() || 'mp3',
  channel: toIntegerOrUndefined(config.channel) ?? 1,
};

if (!['mp3', 'pcm', 'flac', 'wav'].includes(audioSetting.format)) {
  throw new Error(`Invalid format=${audioSetting.format}. Expected mp3/pcm/flac/wav.`);
}
if (audioSetting.format !== 'mp3') {
  throw new Error(
    `Unsupported format=${audioSetting.format} for current pipeline. Please use format="mp3".`,
  );
}

const voiceModify = config.voiceModify && typeof config.voiceModify === 'object'
  ? {
      ...(toIntegerOrUndefined(config.voiceModify.pitch) !== undefined
        ? {pitch: toIntegerOrUndefined(config.voiceModify.pitch)}
        : {}),
      ...(toIntegerOrUndefined(config.voiceModify.intensity) !== undefined
        ? {intensity: toIntegerOrUndefined(config.voiceModify.intensity)}
        : {}),
      ...(toIntegerOrUndefined(config.voiceModify.timbre) !== undefined
        ? {timbre: toIntegerOrUndefined(config.voiceModify.timbre)}
        : {}),
      ...(config.voiceModify.soundEffects
        ? {sound_effects: String(config.voiceModify.soundEffects).trim()}
        : {}),
    }
  : null;

const pronunciationToneFromMap = Object.entries(config.pronunciations ?? {})
  .map(([word, alias]) => `${String(word ?? '').trim()}/${String(alias ?? '').trim()}`)
  .filter((entry) => !entry.startsWith('/') && !entry.endsWith('/'));
const pronunciationToneFromList = Array.isArray(config.pronunciationTone)
  ? config.pronunciationTone.map((entry) => String(entry ?? '').trim()).filter(Boolean)
  : [];
const pronunciationTone = [...pronunciationToneFromMap, ...pronunciationToneFromList];

const decodeHexAudio = (hex) => {
  const raw = String(hex ?? '').trim().replace(/^0x/i, '').replace(/\s+/g, '');
  if (!raw) return Buffer.alloc(0);
  if (raw.length % 2 !== 0) {
    throw new Error(`Invalid hex audio length: ${raw.length}`);
  }
  return Buffer.from(raw, 'hex');
};

const readResponseBody = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return {rawText: text};
  }
};

const fetchAudioFromUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download audio URL: HTTP ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

const synthesizeOne = async (text) => {
  const payload = {
    model,
    text: String(text ?? ''),
    stream: false,
    language_boost: languageBoost || undefined,
    output_format: outputFormat,
    voice_setting: voiceSetting,
    audio_setting: audioSetting,
  };

  if (pronunciationTone.length > 0) {
    payload.pronunciation_dict = {tone: pronunciationTone};
  }
  if (voiceModify && Object.keys(voiceModify).length > 0) {
    payload.voice_modify = voiceModify;
  }
  if (config.subtitleEnable !== undefined) {
    payload.subtitle_enable = Boolean(config.subtitleEnable);
  }

  const requestUrl = groupId
    ? `${endpoint}${endpoint.includes('?') ? '&' : '?'}GroupId=${encodeURIComponent(groupId)}`
    : endpoint;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const body = await readResponseBody(response);
    if (!response.ok) {
      throw new Error(`MiniMax TTS HTTP ${response.status}: ${JSON.stringify(body).slice(0, 300)}`);
    }

    const statusCode = Number(body?.base_resp?.status_code);
    if (statusCode !== 0) {
      throw new Error(
        `MiniMax TTS error status_code=${statusCode}, status_msg=${body?.base_resp?.status_msg ?? 'unknown'}`,
      );
    }

    const audioData = body?.data?.audio;
    if (!audioData) {
      throw new Error('MiniMax TTS returned empty audio data.');
    }

    if (outputFormat === 'url') {
      return fetchAudioFromUrl(String(audioData));
    }

    return decodeHexAudio(audioData);
  } finally {
    clearTimeout(timer);
  }
};

const segmentsRaw = await fs.readFile(segmentsPath, 'utf8');
const segments = JSON.parse(segmentsRaw);

await fs.mkdir(outputDir, {recursive: true});

for (const segment of segments) {
  const id = String(segment.id).padStart(3, '0');
  const filePath = path.join(outputDir, `${id}.mp3`);

  if (segment.id < fromId || segment.id > toId) {
    continue;
  }

  if (!force) {
    try {
      await fs.access(filePath);
      console.log(`Skip ${id} (exists)`);
      continue;
    } catch {
      // file does not exist
    }
  }

  console.log(`Generate ${id}...`);
  const audioBuffer = await synthesizeOne(String(segment.text ?? ''));
  await fs.writeFile(filePath, audioBuffer);
  console.log(`Wrote ${filePath}`);
}

console.log('Done.');
