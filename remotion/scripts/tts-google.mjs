import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import textToSpeech from '@google-cloud/text-to-speech';

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

const keyFileArg = getArg('--key-file');
const keyFileEnv = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const segmentsPath = getArg('--segments')
  ? path.resolve(getArg('--segments'))
  : path.join(lessonRoot, 'generated', 'voiceover-en-segments.json');
const configPath = getArg('--config')
  ? path.resolve(getArg('--config'))
  : path.join(lessonRoot, 'source', 'voiceover-en-tts-config.json');
const force = hasFlag('--force');
const listVoices = hasFlag('--list-voices');
const listLanguage = getArg('--language') ?? undefined;
const fromId = Number(getArg('--from') ?? 0);
const toIdRaw = getArg('--to');
const toId = toIdRaw ? Number(toIdRaw) : Number.POSITIVE_INFINITY;
const timeoutMs = Math.max(1000, Number(getArg('--timeout-ms') ?? 120_000) || 120_000);

const defaultKeyFile = path.join(repoRoot, 'remotion', 'gen-lang-client-0197342560-4ae5c3613095.json');
const keyFileCandidates = [keyFileArg, keyFileEnv, defaultKeyFile].filter(
  (candidate) => typeof candidate === 'string' && candidate.trim(),
);

let keyFilename = null;
for (const candidate of keyFileCandidates) {
  const resolved = path.isAbsolute(candidate)
    ? candidate
    : path.join(repoRoot, candidate);
  try {
    // eslint-disable-next-line no-await-in-loop
    await fs.access(resolved);
    keyFilename = resolved;
    break;
  } catch {
    // ignore
  }
}

const client = keyFilename
  ? new textToSpeech.TextToSpeechClient({keyFilename})
  : new textToSpeech.TextToSpeechClient();

if (listVoices) {
  const [result] = await client.listVoices(
    listLanguage ? {languageCode: listLanguage} : {},
  );
  const voices = result.voices ?? [];
  voices.sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  for (const voice of voices) {
    const name = voice.name ?? 'unknown';
    const langs = (voice.languageCodes ?? []).join(', ');
    const rate = voice.naturalSampleRateHertz ?? 'n/a';
    console.log(`${name} | ${langs} | ${rate}Hz`);
  }
  process.exit(0);
}

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

if (!config.voiceName) {
  console.error('Missing voiceName in config. Run with --list-voices to pick one.');
  process.exit(1);
}

const escapeSsml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const escapeRegExp = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const pronunciationEntries = Object.entries(config.pronunciations ?? {})
  .map(([word, alias]) => ({
    word: typeof word === 'string' ? word.trim() : '',
    alias: typeof alias === 'string' ? alias.trim() : '',
  }))
  .filter((entry) => entry.word && entry.alias)
  .sort((a, b) => b.word.length - a.word.length);
const pronunciationWords = pronunciationEntries.map((entry) =>
  entry.word.toLowerCase(),
);

const emphasisWords = [...(config.emphasisWords ?? [])]
  .map((word) => (typeof word === 'string' ? word.trim() : ''))
  .filter(Boolean)
  .filter((word) => !pronunciationWords.includes(word.toLowerCase()))
  .sort((a, b) => b.length - a.length);
const emphasisLevel = config.emphasisLevel ?? 'moderate';
const emphasisModeConfig = config.emphasisMode ?? 'tag';
const emphasisPitch = config.emphasisPitch ?? '+2st';
const emphasisRate = config.emphasisRate ?? 'medium';
const isStudioVoice = /studio/i.test(config.voiceName ?? '');
const emphasisMode =
  isStudioVoice && emphasisModeConfig === 'tag'
    ? 'prosody'
    : emphasisModeConfig;

const prosodyRules = (config.prosodyRules ?? [])
  .map((rule) => {
    if (!rule?.pattern) return null;
    try {
      return {
        regex: new RegExp(rule.pattern, 'i'),
        pitch: rule.pitch,
        rate: rule.rate,
      };
    } catch {
      return null;
    }
  })
  .filter(Boolean);

const applyPronunciations = (text) => {
  if (pronunciationEntries.length === 0) {
    return text;
  }

  let result = text;
  for (const entry of pronunciationEntries) {
    const escaped = escapeRegExp(entry.word);
    const pattern = entry.word.includes(' ')
      ? escaped
      : `\\b${escaped}\\b`;
    const regex = new RegExp(pattern, 'gi');
    result = result.replace(
      regex,
      (match) => `<sub alias="${entry.alias}">${match}</sub>`,
    );
  }

  return result;
};

const applyEmphasis = (text) => {
  if (emphasisWords.length === 0) {
    return text;
  }

  let result = text;
  for (const word of emphasisWords) {
    const escaped = escapeRegExp(word);
    const pattern = word.includes(' ') ? escaped : `\\b${escaped}\\b`;
    const regex = new RegExp(pattern, 'gi');
    result = result.replace(regex, (match) => {
      if (emphasisMode === 'none') {
        return match;
      }
      if (emphasisMode === 'prosody') {
        const pitchAttr = isStudioVoice ? '' : ` pitch="${emphasisPitch}"`;
        return `<prosody${pitchAttr} rate="${emphasisRate}">${match}</prosody>`;
      }
      return `<emphasis level="${emphasisLevel}">${match}</emphasis>`;
    });
  }

  return result;
};

const applyProsody = (text, rawSentence) => {
  for (const rule of prosodyRules) {
    if (!rule.regex.test(rawSentence)) {
      continue;
    }

    const rateAttr = rule.rate ? ` rate="${rule.rate}"` : '';
    const pitchAttr =
      rule.pitch && !isStudioVoice ? ` pitch="${rule.pitch}"` : '';
    return `<prosody${rateAttr}${pitchAttr}>${text}</prosody>`;
  }

  return text;
};

const toSsml = (text) => {
  const {comma, dash, sentence, semicolon} = config.breaksMs ?? {};
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  const sentenceBreak = sentence ? `<break time="${sentence}ms"/>` : '';

  const processed = sentences.map((sentenceText) => {
    const rawSentence = sentenceText.trim();
    let ssml = escapeSsml(rawSentence);
    ssml = applyPronunciations(ssml);
    ssml = applyEmphasis(ssml);

    if (dash) {
      ssml = ssml.replace(/\s*—\s*/g, ` <break time="${dash}ms"/> `);
    }
    if (semicolon) {
      ssml = ssml.replace(/;\s+/g, `; <break time="${semicolon}ms"/> `);
    }
    if (comma) {
      ssml = ssml.replace(/,\s+/g, `, <break time="${comma}ms"/> `);
    }

    ssml = applyProsody(ssml, rawSentence);
    return ssml;
  });

  const joiner = sentenceBreak ? ` ${sentenceBreak} ` : ' ';
  return `<speak>${processed.join(joiner)}</speak>`;
};

const segmentsRaw = await fs.readFile(segmentsPath, 'utf8');
const segments = JSON.parse(segmentsRaw);

await fs.mkdir(outputDir, {recursive: true});

const makeRequest = (text) => {
  const input = config.useSsml
    ? {ssml: toSsml(text)}
    : {text};

  return {
    input,
    voice: {
      languageCode: config.languageCode,
      name: config.voiceName,
    },
    audioConfig: {
      audioEncoding: config.audioEncoding ?? 'MP3',
      speakingRate: config.speakingRate ?? 1.0,
      pitch: config.pitch ?? 0,
      volumeGainDb: config.volumeGainDb ?? 0,
    },
  };
};

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
      // File doesn't exist
    }
  }

  const request = makeRequest(segment.text);
  console.log(`Generate ${id}...`);
  const synthPromise = client.synthesizeSpeech(request);
  const [response] = await Promise.race([
    synthPromise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `synthesizeSpeech timeout after ${timeoutMs}ms (segment ${id}). ` +
              `Try again, or pass --timeout-ms to increase.`,
          ),
        );
      }, timeoutMs);
    }),
  ]);
  if (!response.audioContent) {
    throw new Error(`No audioContent for segment ${id}`);
  }

  await fs.writeFile(filePath, response.audioContent, 'binary');
  console.log(`Wrote ${filePath}`);
}

console.log('Done.');
