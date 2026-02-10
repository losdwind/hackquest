import path from 'node:path';

const toPosix = (value) => String(value ?? '').replace(/\\/g, '/');

export const getCourseRootFromMetaAbsPath = (coursesRoot, metaAbsPath) => {
  const rel = path.relative(coursesRoot, metaAbsPath);
  const parts = rel.split(path.sep).filter(Boolean);
  return parts[0] ?? '';
};

export const getLessonRootFromMetaAbsPath = (metaAbsPath) => {
  const dir = path.dirname(metaAbsPath);
  // Convention: <lessonRoot>/source/lesson.meta.json
  return path.basename(dir).toLowerCase() === 'source' ? path.dirname(dir) : dir;
};

/**
 * Resolve a meta-referenced file path to an absolute filesystem path.
 *
 * Supported inputs:
 * - Absolute paths: returned as-is.
 * - Legacy course-root-relative paths that start with the course root dir name.
 * - Repo-root-relative paths under "courses/..." (legacy in some configs).
 * - Lesson-root-relative paths (recommended).
 */
export const resolveMetaFileAbsPath = ({
  repoRoot,
  coursesRoot,
  metaAbsPath,
  value,
}) => {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  if (path.isAbsolute(raw)) return raw;

  const cleaned = toPosix(raw).replace(/^\.\/+/, '').replace(/^\/+/, '');
  const lessonRoot = getLessonRootFromMetaAbsPath(metaAbsPath);
  const courseRoot = getCourseRootFromMetaAbsPath(coursesRoot, metaAbsPath);

  if (courseRoot && cleaned.startsWith(`${courseRoot}/`)) {
    return path.join(coursesRoot, cleaned);
  }

  if (cleaned.startsWith('courses/')) {
    return path.join(repoRoot, cleaned);
  }

  return path.join(lessonRoot, cleaned);
};

