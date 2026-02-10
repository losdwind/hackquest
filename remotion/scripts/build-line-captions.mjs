import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

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

const defaultLessonRoot = await resolveDefaultLessonRoot(coursesRoot);

const lessonRoot = getArg('--lesson-root')
  ? path.resolve(getArg('--lesson-root'))
  : defaultLessonRoot;

const segmentsPath = getArg('--segments')
  ? path.resolve(getArg('--segments'))
  : path.join(lessonRoot, 'generated', 'voiceover-en-segments.json');

const captionsPath = getArg('--out')
  ? path.resolve(getArg('--out'))
  : path.join(lessonRoot, 'generated', 'captions', 'lines.json');

const segmentsDir = getArg('--audio-dir')
  ? path.resolve(getArg('--audio-dir'))
  : path.join(lessonRoot, 'generated', 'audio', 'segments');

const fps = Number(getArg('--fps') ?? 30);
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

const segmentsRaw = await fs.readFile(segmentsPath, 'utf8');
const segments = JSON.parse(segmentsRaw);

const MIN_TOKENS = 4;
const MAX_TOKENS = 14;
const TARGET_TOKENS = 10;
const MAX_SENTENCE_TOKENS = 16;
const BREAK_BEFORE_WORDS = new Set([
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
  'if',
  'then',
  'as',
  'since',
  'unless',
  'although',
  'though',
  'after',
  'before',
  'once',
  'until',
  'where',
  'especially',
  'like',
]);

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

const splitIntoSentences = (text) => {
  const sentences = [];
  let start = 0;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (!'.!?'.includes(char)) {
      continue;
    }

    let j = i + 1;
    while (j < text.length && text[j] === ' ') {
      j += 1;
    }
    while (j < text.length && '\"\'“”()[]{}'.includes(text[j])) {
      j += 1;
    }

    if (j >= text.length || text[j] === text[j]?.toUpperCase()) {
      const sentence = text.slice(start, i + 1).trim();
      if (sentence) {
        sentences.push(sentence);
      }
      start = j;
      i = j - 1;
    }
  }

  const tail = text.slice(start).trim();
  if (tail) {
    sentences.push(tail);
  }

  return sentences;
};

const normalizeWord = (word) =>
  word.toLowerCase().replace(/^["'“”([{]+|[)"'“”\].,!?;:}]+$/g, '');

const countWords = (text) =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

const splitLongSentence = (sentence) => {
  const tokens = sentence.split(/\s+/).filter(Boolean);
  if (tokens.length <= MAX_SENTENCE_TOKENS) {
    return [sentence];
  }

  const candidates = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token.endsWith(',') || token.endsWith(';') || token.endsWith(':')) {
      candidates.push(i);
    }
    const next = tokens[i + 1];
    if (next && BREAK_BEFORE_WORDS.has(normalizeWord(next))) {
      candidates.push(i);
    }
  }

  const segments = [];
  let start = 0;
  let i = start;

  const pickBreakpoint = (endIndex) => {
    const viable = candidates.filter((index) => {
      if (index < start || index > endIndex) return false;
      const count = index - start + 1;
      return count >= MIN_TOKENS;
    });

    if (!viable.length) {
      return endIndex;
    }

    let best = viable[0];
    let bestScore = Math.abs(best - start + 1 - TARGET_TOKENS);
    for (const index of viable.slice(1)) {
      const score = Math.abs(index - start + 1 - TARGET_TOKENS);
      if (score < bestScore) {
        bestScore = score;
        best = index;
      } else if (score === bestScore && index - start > best - start) {
        best = index;
      }
    }

    return best;
  };

  while (i < tokens.length) {
    const tokenCount = i - start + 1;
    const hitMax = tokenCount >= MAX_TOKENS;
    const hasCandidate = candidates.some((index) => index >= start && index <= i);
    const hitTarget = tokenCount >= TARGET_TOKENS && hasCandidate;
    const isEnd = i === tokens.length - 1;

    if (hitMax || hitTarget) {
      const splitIndex = pickBreakpoint(i);
      const segment = tokens.slice(start, splitIndex + 1).join(' ').trim();
      if (segment) {
        segments.push(segment);
      }
      start = splitIndex + 1;
      i = start;
      continue;
    }

    if (isEnd) {
      const segment = tokens.slice(start).join(' ').trim();
      if (segment) {
        segments.push(segment);
      }
      break;
    }

    i += 1;
  }

  return segments;
};

const mergeShortSegments = (segments) => {
  const merged = [];
  for (const segment of segments) {
    if (
      merged.length &&
      countWords(segment) < MIN_TOKENS &&
      countWords(merged[merged.length - 1]) + countWords(segment) <= MAX_TOKENS
    ) {
      merged[merged.length - 1] = `${merged[merged.length - 1]} ${segment}`.trim();
    } else {
      merged.push(segment);
    }
  }
  return merged;
};

const splitText = (text) => {
  const sentences = splitIntoSentences(text);
  let segments = [];
  for (const sentence of sentences) {
    segments = segments.concat(splitLongSentence(sentence));
  }
  return mergeShortSegments(segments);
};

let cursorMs = 0;
const captions = [];

for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
  const segment = segments[segmentIndex];
  const fileName = `${String(segment.id).padStart(3, '0')}.mp3`;
  const filePath = path.join(segmentsDir, fileName);
  const durationMs = getDurationMs(filePath);
  const startMs = cursorMs;
  const endMs = startMs + durationMs;
  const parts = splitText(segment.text);
  const weights = parts.map((part) => countWords(part));
  const totalWords = weights.reduce((sum, value) => sum + value, 0) || 1;

  let allocated = 0;
  let partCursor = startMs;

  for (let i = 0; i < parts.length; i += 1) {
    const remaining = parts.length - i;
    let partDuration =
      i === parts.length - 1
        ? durationMs - allocated
        : Math.round((durationMs * weights[i]) / totalWords);

    partDuration = Math.max(1, partDuration);
    const maxAllow = durationMs - allocated - (remaining - 1);
    if (partDuration > maxAllow) {
      partDuration = maxAllow;
    }

    const partStart = partCursor;
    const partEnd = partStart + partDuration;

    captions.push({
      text: parts[i],
      startMs: partStart,
      endMs: partEnd,
      timestampMs: partStart,
      confidence: null,
    });

    allocated += partDuration;
    partCursor = partEnd;
  }

  cursorMs = endMs;
  const isLast = segmentIndex === segments.length - 1;
  if (!isLast) {
    const gapAfterMs = resolveGapAfterSegmentMs(segment, baseGapMs);
    if (gapAfterMs) cursorMs += gapAfterMs;
  }
}

await fs.mkdir(path.dirname(captionsPath), {recursive: true});
await fs.writeFile(captionsPath, JSON.stringify(captions, null, 2), 'utf8');

console.log(`Wrote ${captions.length} captions to ${captionsPath}`);
