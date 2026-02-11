import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const remotionRoot = path.resolve(scriptDir, '..');

const scanDirs = [path.join(remotionRoot, 'src'), path.join(remotionRoot, 'scripts')];
const codeExts = new Set(['.ts', '.tsx', '.js', '.mjs']);
const blockedPatterns = [
  /from\s+['"]\.\.\/courses\//,
  /from\s+['"]\.\/courses\//,
  /from\s+['"][^'"]*src\/courses\//,
];

const toPosix = (p) => p.split(path.sep).join('/');

const walk = async (dir) => {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
      continue;
    }
    if (entry.isFile() && codeExts.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
};

const files = (await Promise.all(scanDirs.map((dir) => walk(dir)))).flat();
const violations = [];

for (const abs of files) {
  const rel = toPosix(path.relative(remotionRoot, abs));
  const content = await fs.readFile(abs, 'utf8');
  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (blockedPatterns.some((re) => re.test(line))) {
      violations.push(`${rel}:${index + 1}: ${line.trim()}`);
    }
  });
}

if (violations.length > 0) {
  console.error('Legacy import(s) detected. Please use root courses manifest chain only.');
  for (const v of violations) {
    console.error(`- ${v}`);
  }
  process.exit(1);
}

console.log('No legacy imports found.');
