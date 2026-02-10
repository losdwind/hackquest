const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

const trimLeadingDotSlash = (value: string) => value.replace(/^\.\/+/, '');

const toPosixPath = (value: string) => value.replace(/\\/g, '/');

export const getCourseRootFromMetaFile = (metaFile: string) => {
  const cleaned = toPosixPath(String(metaFile ?? '')).replace(/^\/+/, '');
  const first = cleaned.split('/').filter(Boolean)[0];
  return first ?? '';
};

export const getLessonRootFromMetaFile = (metaFile: string) => {
  // Convention: <lessonRoot>/source/lesson.meta.json
  const cleaned = toPosixPath(String(metaFile ?? '')).replace(/^\/+/, '');
  const parts = cleaned.split('/').filter(Boolean);
  if (parts.length < 3) return cleaned;
  const maybeSource = parts[parts.length - 2];
  if (maybeSource.toLowerCase() === 'source') {
    return parts.slice(0, -2).join('/');
  }
  return parts.slice(0, -1).join('/');
};

const isGlobalPublicPath = (value: string) => value.startsWith('brand/');

/**
 * Resolve a path from lesson meta/script into a public-root-relative path suitable for `staticFile()`.
 *
 * Supported inputs:
 * - Absolute URLs: returned as-is.
 * - Legacy public-root-relative paths that start with the course root (e.g. "course-.../Unit .../...").
 * - Global public-root-relative paths (e.g. "brand/...").
 * - Lesson-root-relative paths (e.g. "cover/hero.svg", "generated/...").
 */
export const resolveLessonPublicPath = (
  metaFile: string,
  rawPath: string | null | undefined,
) => {
  if (!rawPath) return null;
  const trimmed = String(rawPath).trim();
  if (!trimmed) return null;
  if (isHttpUrl(trimmed)) return trimmed;

  let cleaned = toPosixPath(trimmed).replace(/^\/+/, '');
  cleaned = trimLeadingDotSlash(cleaned);

  const courseRoot = getCourseRootFromMetaFile(metaFile);
  if (isGlobalPublicPath(cleaned)) return cleaned;
  if (courseRoot && cleaned.startsWith(`${courseRoot}/`)) return cleaned;

  const lessonRoot = getLessonRootFromMetaFile(metaFile);
  return lessonRoot ? `${lessonRoot}/${cleaned}` : cleaned;
};

