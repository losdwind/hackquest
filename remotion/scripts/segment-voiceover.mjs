import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const defaultSource = path.join(
  repoRoot,
  'Syllabus',
  'course-1-stablecoin-protocol',
  'Unit 1 Background Foundations',
  '1 DeFi landscape',
  'voiceover-en.md',
);
const defaultOutput = path.join(
  repoRoot,
  'Syllabus',
  'course-1-stablecoin-protocol',
  'Unit 1 Background Foundations',
  '1 DeFi landscape',
  'voiceover-en-segments.json',
);

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  if (index === -1) return null;
  return args[index + 1] ?? null;
};

const rawSource = process.argv[2];
const rawOutput = process.argv[3];
const usePositional = rawSource && !rawSource.startsWith('-');
const sourcePath = getArg('--source')
  ? path.resolve(getArg('--source'))
  : usePositional
    ? path.resolve(rawSource)
    : defaultSource;
const outputPath = getArg('--output')
  ? path.resolve(getArg('--output'))
  : usePositional && rawOutput && !rawOutput.startsWith('-')
    ? path.resolve(rawOutput)
    : defaultOutput;
const mode = (getArg('--mode') ?? 'segment').toLowerCase();
const maxChars = Number(getArg('--max-chars') ?? 900);
const maxSentences = Number(getArg('--max-sentences') ?? 3);

const markdown = await fs.readFile(sourcePath, 'utf8');
const lines = markdown.split(/\r?\n/);

const segments = [];

if (mode === 'segment') {
  let current = null;

  for (const line of lines) {
    const headerMatch = /^##\s+Segment\s+(\d+)/i.exec(line.trim());
    if (headerMatch) {
      if (current?.text.length) {
        segments.push({
          id: current.id,
          text: current.text.join(' ').replace(/\s+/g, ' ').trim(),
        });
      }
      current = {id: Number(headerMatch[1]), text: []};
      continue;
    }

    if (!current) {
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    current.text.push(trimmed);
  }

  if (current?.text.length) {
    segments.push({
      id: current.id,
      text: current.text.join(' ').replace(/\s+/g, ' ').trim(),
    });
  }
} else if (mode === 'sentence') {
  const textLines = lines
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
  const rawText = textLines.join(' ').replace(/\s+/g, ' ').trim();
  const sentences = rawText
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  let buffer = [];
  let bufferLength = 0;
  let id = 1;

  const flush = () => {
    if (!buffer.length) return;
    segments.push({
      id,
      text: buffer.join(' '),
    });
    id += 1;
    buffer = [];
    bufferLength = 0;
  };

  for (const sentence of sentences) {
    const nextLength = bufferLength + sentence.length + (buffer.length ? 1 : 0);
    if (
      buffer.length >= maxSentences ||
      (buffer.length > 0 && nextLength > maxChars)
    ) {
      flush();
    }
    buffer.push(sentence);
    bufferLength = bufferLength
      ? bufferLength + sentence.length + 1
      : sentence.length;
  }

  flush();
} else {
  throw new Error(`Unknown mode: ${mode}`);
}

await fs.writeFile(outputPath, JSON.stringify(segments, null, 2), 'utf8');

console.log(`Wrote ${segments.length} segments to ${outputPath}`);
