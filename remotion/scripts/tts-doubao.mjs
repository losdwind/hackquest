import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import {randomUUID} from 'node:crypto';

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

const appId =
  String(config.appId ?? '').trim() || String(process.env.HQ_DOUBAO_APP_ID ?? '').trim();
const accessToken =
  String(config.accessToken ?? '').trim() ||
  String(process.env.HQ_DOUBAO_ACCESS_TOKEN ?? '').trim();
const cluster = String(config.cluster ?? 'volcano_tts').trim();
const uid = String(config.uid ?? process.env.HQ_DOUBAO_UID ?? 'hackquest-user').trim();
const endpoint = String(
  config.endpoint ?? process.env.HQ_DOUBAO_ENDPOINT ?? 'https://openspeech.bytedance.com/api/v1/tts',
).trim();
const voiceType =
  String(config.voiceType ?? '').trim() ||
  String(process.env.HQ_DOUBAO_VOICE_TYPE ?? '').trim();
const speedRatio = Number(config.speedRatio ?? 1.0);
const loudnessRatio = Number(config.loudnessRatio ?? 1.0);
const encoding = String(config.audioEncoding ?? 'mp3').trim().toLowerCase();
const explicitLanguage = String(config.explicitLanguage ?? 'en').trim();
const useSsml =
  Boolean(config.useSsml) ||
  String(config.textType ?? '').trim().toLowerCase() === 'ssml';

if (!appId) throw new Error('Missing appId in config or HQ_DOUBAO_APP_ID');
if (!accessToken) throw new Error('Missing accessToken in config or HQ_DOUBAO_ACCESS_TOKEN');
if (!voiceType) throw new Error('Missing voiceType in config or HQ_DOUBAO_VOICE_TYPE');

const extraParam = config.extraParam && typeof config.extraParam === 'object'
  ? JSON.stringify(config.extraParam)
  : undefined;

const decodeBase64 = (data) => Buffer.from(String(data), 'base64');

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const pronunciationEntries = Object.entries(config.pronunciations ?? {})
  .map(([word, alias]) => ({
    word: String(word ?? '').trim(),
    alias: String(alias ?? '').trim(),
  }))
  .filter((entry) => entry.word && entry.alias)
  .sort((a, b) => b.word.length - a.word.length);

const applyPronunciations = (rawText) => {
  let text = String(rawText ?? '');
  for (const entry of pronunciationEntries) {
    const escaped = escapeRegExp(entry.word);
    const hasCjk = /[\u3400-\u9fff]/.test(entry.word);
    const pattern = hasCjk || entry.word.includes(' ')
      ? escaped
      : `\\b${escaped}\\b`;
    const regex = new RegExp(pattern, 'gi');
    text = text.replace(regex, entry.alias);
  }
  return text;
};

const toSsml = (rawText) => {
  const normalized = applyPronunciations(rawText);
  const breaks = config.breaksMs ?? {};
  const commaBreak = Number(breaks.comma ?? 0);
  const sentenceBreak = Number(breaks.sentence ?? 0);
  const semicolonBreak = Number(breaks.semicolon ?? 0);
  const colonBreak = Number(breaks.colon ?? 0);
  const dashBreak = Number(breaks.dash ?? 0);
  const segmentTailBreak = Number(breaks.segmentTail ?? 0);

  const sentences = normalized.split(/(?<=[。！？.!?])\s*/).filter(Boolean);
  const rendered = sentences.map((sentenceRaw) => {
    let s = escapeXml(sentenceRaw.trim());
    if (commaBreak > 0) {
      s = s.replace(/([,，])\s*/g, `$1<break time="${commaBreak}ms"/>`);
    }
    if (semicolonBreak > 0) {
      s = s.replace(/([;；])\s*/g, `$1<break time="${semicolonBreak}ms"/>`);
    }
    if (colonBreak > 0) {
      s = s.replace(/([:：])\s*/g, `$1<break time="${colonBreak}ms"/>`);
    }
    if (dashBreak > 0) {
      s = s.replace(/([—-])\s*/g, `$1<break time="${dashBreak}ms"/>`);
    }
    return s;
  });

  const joiner = sentenceBreak > 0 ? `<break time="${sentenceBreak}ms"/>` : ' ';
  const tail = segmentTailBreak > 0 ? `<break time="${segmentTailBreak}ms"/>` : '';
  return `<speak>${rendered.join(joiner)}${tail}</speak>`;
};

const normalizedText = (rawText) => applyPronunciations(rawText).trim();

const postTts = async (payload, signal) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer;${accessToken}`,
    },
    body: JSON.stringify(payload),
    signal,
  });
  const body = await response.json();
  return {response, body};
};

const synthesizeOne = async (text) => {
  const reqid = randomUUID();
  const normalized = normalizedText(text);
  const requestText = useSsml ? toSsml(normalized) : normalized;
  const requestTextType =
    useSsml ? 'ssml' : (config.textType ? String(config.textType) : undefined);

  const payload = {
    app: {
      appid: appId,
      token: accessToken,
      cluster,
    },
    user: {
      uid,
    },
    audio: {
      voice_type: voiceType,
      encoding,
      speed_ratio: Number.isFinite(speedRatio) ? speedRatio : 1.0,
      loudness_ratio: Number.isFinite(loudnessRatio) ? loudnessRatio : 1.0,
      explicit_language: explicitLanguage || undefined,
      ...(config.rate ? {rate: Number(config.rate)} : {}),
      ...(config.bitrate ? {bitrate: Number(config.bitrate)} : {}),
      ...(config.emotion ? {emotion: String(config.emotion)} : {}),
      ...(config.enableEmotion !== undefined ? {enable_emotion: Boolean(config.enableEmotion)} : {}),
      ...(config.emotionScale ? {emotion_scale: Number(config.emotionScale)} : {}),
    },
    request: {
      reqid,
      text: requestText,
      operation: 'query',
      ...(config.model ? {model: String(config.model)} : {}),
      ...(requestTextType ? {text_type: requestTextType} : {}),
      ...(config.silenceDuration ? {silence_duration: Number(config.silenceDuration)} : {}),
      ...(config.withTimestamp ? {with_timestamp: Number(config.withTimestamp)} : {}),
      ...(extraParam ? {extra_param: extraParam} : {}),
    },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const {response, body} = await postTts(payload, controller.signal);
    if (!response.ok) {
      throw new Error(
        `Doubao TTS HTTP ${response.status}: ${JSON.stringify(body).slice(0, 300)}`,
      );
    }
    if (Number(body?.code) === 3000 && body?.data) {
      return decodeBase64(body.data);
    }

    // Some voices may reject SSML; gracefully retry with plain text.
    if (useSsml) {
      const plainPayload = {
        ...payload,
        request: {
          ...payload.request,
          text: normalized,
        },
      };
      delete plainPayload.request.text_type;
      const retry = await postTts(plainPayload, controller.signal);
      if (retry.response.ok && Number(retry.body?.code) === 3000 && retry.body?.data) {
        console.warn(`SSML rejected for reqid=${reqid}, fallback to plain text succeeded.`);
        return decodeBase64(retry.body.data);
      }
    }

    if (Number(body?.code) !== 3000) {
      throw new Error(
        `Doubao TTS error code=${body?.code}, message=${body?.message ?? 'unknown'}`,
      );
    }
    throw new Error(`Doubao TTS returned empty audio data for reqid=${reqid}`);
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
