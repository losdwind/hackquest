import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const inputPath = getArg('--in')
  ? path.resolve(getArg('--in'))
  : path.join(
      repoRoot,
      'remotion',
      'public',
      'courses',
      'course-1-stablecoin-protocol',
      'unit-1',
      'lesson-1-defi-landscape',
      'captions',
      'defi-landscape-en-words.json',
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
      'phrases.json',
    );
const maxDurationMs = Number(getArg('--max-ms') ?? 2600);
const minDurationMs = Number(getArg('--min-ms') ?? 700);
const maxTokens = Number(getArg('--max-tokens') ?? 14);
const minTokens = Number(getArg('--min-tokens') ?? 4);
const targetDurationMs = Number(getArg('--target-ms') ?? 1800);
const targetTokens = Number(getArg('--target-tokens') ?? 10);
const maxSentenceDurationMs = Number(getArg('--max-sentence-ms') ?? 3600);
const maxSentenceTokens = Number(
  getArg('--max-sentence-tokens') ?? maxTokens + 2,
);
const fps = Number(getArg('--fps') ?? 30);

const raw = await fs.readFile(inputPath, 'utf8');
const rawTokens = JSON.parse(raw);

const normalizeTokens = (tokens) => {
  const normalized = [];
  for (const token of tokens) {
    if (!token || typeof token.text !== 'string') continue;
    const text = token.text;
    if (!text) continue;
    const startsWithSpace = /^\s/.test(text);
    if (!normalized.length || startsWithSpace) {
      normalized.push({...token});
      continue;
    }
    const previous = normalized[normalized.length - 1];
    previous.text += text;
    previous.endMs = Math.max(previous.endMs, token.endMs);
  }
  return normalized;
};

const words = normalizeTokens(rawTokens);

const sentenceEnd = /[.!?]["')\]]*$/;
const softEnd = /[,;:]$/;
const breakBeforeWords = new Set([
  'and',
  'but',
  'or',
  'so',
  'because',
  'while',
  'when',
  'which',
  'that',
  'who',
  'how',
  'to',
  'if',
  'then',
]);

const captions = [];

const flush = (segmentTokens) => {
  if (!segmentTokens.length) return;
  const text = segmentTokens.map((token) => token.text).join('');
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return;
  const startMs = segmentTokens[0].startMs;
  const endMs = segmentTokens[segmentTokens.length - 1].endMs;
  captions.push({
    text: cleaned,
    startMs,
    endMs,
    timestampMs: startMs,
    confidence: null,
  });
};

const splitSentence = (sentenceTokens) => {
  const sentenceDuration =
    sentenceTokens[sentenceTokens.length - 1].endMs - sentenceTokens[0].startMs;
  const sentenceTokenCount = sentenceTokens
    .map((t) => t.text)
    .join('')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (
    sentenceTokenCount <= maxSentenceTokens &&
    sentenceDuration <= maxSentenceDurationMs
  ) {
    flush(sentenceTokens);
    return;
  }

  let startIndex = 0;
  let i = 0;
  let candidates = [];

  const countTokens = (tokens) =>
    tokens
      .map((t) => t.text)
      .join('')
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

  const pickBreakpoint = (endIndex) => {
    const viable = candidates.filter((index) => {
      if (index < startIndex || index > endIndex) return false;
      const count = countTokens(sentenceTokens.slice(startIndex, index + 1));
      return count >= minTokens;
    });
    if (!viable.length) return endIndex;
    let best = viable[0];
    let bestScore = Infinity;
    for (const index of viable) {
      const count = countTokens(sentenceTokens.slice(startIndex, index + 1));
      const score = Math.abs(count - targetTokens);
      if (score < bestScore) {
        bestScore = score;
        best = index;
      }
    }
    return best;
  };

  const takeSegment = (splitIndex) => {
    const segmentTokens = sentenceTokens.slice(startIndex, splitIndex + 1);
    flush(segmentTokens);
    startIndex = splitIndex + 1;
    candidates = [];
  };

  while (i < sentenceTokens.length) {
    if (i < startIndex) {
      i = startIndex;
    }
    const token = sentenceTokens[i];
    const tokenText = token.text.trim();
    const nextToken = sentenceTokens[i + 1];
    const nextText = nextToken ? nextToken.text.trim().toLowerCase() : '';

    if (
      softEnd.test(tokenText) ||
      (nextText && breakBeforeWords.has(nextText))
    ) {
      candidates.push(i);
    }

    const segmentTokens = sentenceTokens.slice(startIndex, i + 1);
    const duration = token.endMs - sentenceTokens[startIndex].startMs;
    const tokenCount = segmentTokens
      .map((t) => t.text)
      .join('')
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const canBreak = tokenCount >= minTokens && duration >= minDurationMs;
    const hitTarget = tokenCount >= targetTokens;
    const hitMax = tokenCount >= maxTokens || duration >= maxDurationMs;
    const isEnd = i === sentenceTokens.length - 1;

    if ((hitMax || (hitTarget && candidates.length)) && canBreak) {
      const pick = pickBreakpoint(i);
      takeSegment(pick);
      i = startIndex;
      continue;
    }

    if (isEnd) {
      takeSegment(i);
      break;
    }

    i += 1;
  }
};

const sentences = [];
let buffer = [];
for (const token of words) {
  buffer.push(token);
  const tokenText = token.text.trim();
  if (sentenceEnd.test(tokenText)) {
    sentences.push(buffer);
    buffer = [];
  }
}
if (buffer.length) {
  sentences.push(buffer);
}

for (const sentenceTokens of sentences) {
  splitSentence(sentenceTokens);
}

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

console.log(`Wrote ${captions.length} captions to ${outputPath}`);
console.log(`Updated lesson config: ${configPath}`);
