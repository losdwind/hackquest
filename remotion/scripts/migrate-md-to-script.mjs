import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

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

const lessonRoot = path.resolve(getArg('--lesson-root') ?? defaultLessonRoot);

const voiceoverPath = path.join(lessonRoot, 'source', 'voiceover-en.md');
const storyboardPath = path.join(lessonRoot, 'source', 'assets-en.md');
const outPath = path.join(lessonRoot, 'source', 'script.json');

const parseVoiceover = (markdown) => {
  const lines = markdown.split(/\r?\n/);
  const segments = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    const text = current.text.join(' ').replace(/\s+/g, ' ').trim();
    if (text) segments.push({id: current.id, text});
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const match = /^##\s+Segment\s+(\d+)/i.exec(line.trim());
    if (match) {
      flush();
      current = {id: Number(match[1]), text: []};
      continue;
    }
    if (!current) continue;
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Skip auto-sync header comments.
    if (trimmed.startsWith('<!--')) continue;
    if (trimmed.startsWith('-->')) continue;
    if (trimmed.startsWith('#')) continue;
    current.text.push(trimmed);
  }

  flush();
  return segments;
};

const getFieldValue = (line, label) => {
  const regex = new RegExp(`^${label}\\s*:\\s*(.+)$`, 'i');
  const match = regex.exec(line);
  return match ? match[1].trim() : null;
};

const normalizeAssetRef = (value) => {
  if (!value) return null;
  const cleaned = value.trim();
  if (!cleaned) return null;
  if (/^(none|n\/a|null)$/i.test(cleaned)) return null;
  return cleaned;
};

const parseStoryboard = (markdown) => {
  const lines = markdown.split(/\r?\n/);
  const segments = [];
  let current = null;
  let fence = null; // {lang, buffer[]}

  const flush = () => {
    if (current) segments.push(current);
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    const segmentMatch = /^##\s+Segment\s+(\d+)/i.exec(line.trim());
    if (segmentMatch && !fence) {
      flush();
      current = {id: Number(segmentMatch[1])};
      continue;
    }

    if (!current) continue;

    if (fence) {
      if (/^```/.test(line.trim())) {
        const content = fence.buffer.join('\n').trim();
        if (fence.lang === 'json') {
          try {
            current.json = JSON.parse(content);
          } catch {
            current.json = undefined;
          }
        } else {
          // Treat unknown/no-language fences as markdown.
          current.markdown = content;
        }
        fence = null;
      } else {
        fence.buffer.push(rawLine);
      }
      continue;
    }

    const fenceMatch = /^```(\w+)?/.exec(line.trim());
    if (fenceMatch) {
      fence = {lang: (fenceMatch[1] ?? '').toLowerCase(), buffer: []};
      continue;
    }

    const typeValue =
      getFieldValue(line, 'Scene Type') ??
      getFieldValue(line, 'Visual Type') ??
      getFieldValue(line, 'Type');
    if (typeValue) {
      current.sceneType = typeValue;
      continue;
    }

    const contentValue =
      getFieldValue(line, 'Scene Content') ??
      getFieldValue(line, 'Visual Notes') ??
      getFieldValue(line, 'Content');
    if (contentValue) {
      current.sceneContent = contentValue;
      continue;
    }

    const assetValue = getFieldValue(line, 'Asset Ref') ?? getFieldValue(line, 'Asset');
    if (assetValue) {
      current.assetRef = normalizeAssetRef(assetValue) ?? undefined;
      continue;
    }

    const componentValue = getFieldValue(line, 'Component');
    if (componentValue) {
      current.component = componentValue.trim();
      continue;
    }
  }

  flush();
  return segments;
};

const voiceoverMd = await fs.readFile(voiceoverPath, 'utf8');
const storyboardMd = await fs.readFile(storyboardPath, 'utf8');
const voiceSegments = parseVoiceover(voiceoverMd);
const storyboardSegments = parseStoryboard(storyboardMd);

const storyboardById = new Map(storyboardSegments.map((s) => [Number(s.id), s]));

const script = {
  schema_version: '1.0.0',
  lang: 'en',
  segments: voiceSegments.map((v) => {
    const st = storyboardById.get(Number(v.id)) ?? {};
    const visual = {
      sceneType: st.sceneType,
      sceneContent: st.sceneContent,
      assetRef: st.assetRef ?? null,
      component: st.component,
      markdown: st.markdown,
      json: st.json,
    };
    // Remove empty visual object to keep file tidy.
    const hasVisual = Object.values(visual).some((x) => x !== undefined && x !== null && x !== '');
    return {
      id: Number(v.id),
      voiceover: {text: v.text},
      ...(hasVisual ? {visual} : {}),
    };
  }),
};

await fs.writeFile(outPath, JSON.stringify(script, null, 2), 'utf8');
console.log(`Wrote ${script.segments.length} segments to ${path.relative(repoRoot, outPath)}`);
