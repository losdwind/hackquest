import fs from 'node:fs/promises';
import path from 'node:path';

const walkForLessonMeta = async (dir) => {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const results = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkForLessonMeta(full)));
      continue;
    }
    if (entry.isFile() && entry.name === 'lesson.meta.json') {
      results.push(full);
    }
  }
  return results;
};

export const resolveDefaultLessonRoot = async (coursesRoot) => {
  const metas = await walkForLessonMeta(coursesRoot);
  if (metas.length === 0) {
    throw new Error(`No lesson.meta.json found under ${coursesRoot}`);
  }
  metas.sort((a, b) => a.localeCompare(b));
  const metaPath = metas[0];
  const dir = path.dirname(metaPath);
  // Convention: <lessonRoot>/source/lesson.meta.json
  return path.basename(dir).toLowerCase() === 'source' ? path.dirname(dir) : dir;
};

