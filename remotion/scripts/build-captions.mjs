import fs from 'node:fs/promises';
import path from 'node:path';

const FPS = 30;

const toMs = (timestamp) => {
  const match = /^(\d{2}):(\d{2}):(\d{2}),(\d{3})$/.exec(timestamp);
  if (!match) {
    throw new Error(`Invalid timestamp: ${timestamp}`);
  }
  const [, hh, mm, ss, ms] = match;
  return (
    Number(hh) * 60 * 60 * 1000 +
    Number(mm) * 60 * 1000 +
    Number(ss) * 1000 +
    Number(ms)
  );
};

const repoRoot = path.resolve(process.cwd(), '..');
const defaultSource = path.join(
  repoRoot,
  'Syllabus',
  'course-1-stablecoin-protocol',
  'Unit 1 Background Foundations',
  '1 DeFi landscape',
  'videoscript-zh.md',
);

const sourcePath = process.argv[2] ? path.resolve(process.argv[2]) : defaultSource;
const outputPath = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.join(process.cwd(), 'public', 'captions', 'defi-landscape-zh.json');

const metaPath = path.join(
  process.cwd(),
  'src',
  'data',
  'defi-landscape-zh.ts',
);

const markdown = await fs.readFile(sourcePath, 'utf8');
const lines = markdown.split(/\r?\n/);

const entries = [];
for (const line of lines) {
  const match = /^\|\s*(\d{2}:\d{2}:\d{2},\d{3})\s*\|\s*(.*?)\s*\|/.exec(
    line,
  );
  if (!match) continue;
  const timestamp = match[1];
  const text = match[2].trim();
  if (!text) continue;
  entries.push({
    startMs: toMs(timestamp),
    text,
  });
}

entries.sort((a, b) => a.startMs - b.startMs);

const DEFAULT_END_MS = 2500;
const captions = entries.map((entry, index) => {
  const nextStart = entries[index + 1]?.startMs;
  const endMs =
    typeof nextStart === 'number' && nextStart > entry.startMs
      ? nextStart
      : entry.startMs + DEFAULT_END_MS;

  return {
    text: entry.text,
    startMs: entry.startMs,
    endMs,
    timestampMs: entry.startMs,
    confidence: null,
  };
});

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, JSON.stringify(captions, null, 2), 'utf8');

const last = captions[captions.length - 1];
const lastEndMs = last?.endMs ?? 0;
const durationSec = (lastEndMs / 1000).toFixed(2);
const durationInFrames = Math.max(1, Math.ceil((lastEndMs / 1000) * FPS));
const publicRoot = path.join(process.cwd(), 'public');
const captionsFile = path
  .relative(publicRoot, outputPath)
  .split(path.sep)
  .join('/');

const metaContents = `export const defiLandscapeZhMeta = {\n  captionsFile: '${captionsFile}',\n  durationMs: ${lastEndMs},\n  durationInFrames: ${durationInFrames},\n  fps: ${FPS},\n  captionsCount: ${captions.length},\n} as const;\n`;

await fs.mkdir(path.dirname(metaPath), {recursive: true});
await fs.writeFile(metaPath, metaContents, 'utf8');

console.log(`Wrote ${captions.length} captions to ${outputPath}`);
console.log(`Estimated duration: ${durationSec}s`);
console.log(`Updated metadata: ${metaPath}`);
