import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const idx = args.indexOf(flag);
  if (idx === -1) return null;
  return args[idx + 1] ?? null;
};

const lessonRootRel =
  getArg('--lesson-root') ??
  'courses/course-1-stablecoin-protocol/unit-1-background-foundations/1-defi-landscape';

const lessonRoot = path.resolve(repoRoot, lessonRootRel);
const assetsDir = path.join(lessonRoot, 'assets');

const W = 1920;
const H = 1080;
const FPS = 30;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const withTimeout = async (promise, ms, label) => {
  let t;
  const timeout = new Promise((_, reject) => {
    t = setTimeout(() => reject(new Error(`Timeout after ${ms}ms: ${label}`)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(t);
  }
};

const run = (cmd, cmdArgs) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, {stdio: 'inherit'});
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });

async function ensureDir(dir) {
  await fs.mkdir(dir, {recursive: true});
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function recordClip({
  name,
  url,
  durationMs,
  actions,
  waitFor,
}) {
  const tmpDir = path.join(assetsDir, '.tmp-recordings');
  await ensureDir(tmpDir);

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-extensions',
      '--disable-background-networking',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
    ],
  });

  const ctx = await browser.newContext({
    viewport: {width: W, height: H},
    recordVideo: {dir: tmpDir, size: {width: W, height: H}},
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
  });

  const page = await ctx.newPage();
  const video = page.video();

  // Best-effort: make the page stable enough to render.
  page.setDefaultTimeout(60_000);

  try {
    // Prefer a fast navigation signal. Some heavy SPAs never reliably reach
    // domcontentloaded under bot protections or long-running scripts.
    await page.goto(url, {waitUntil: 'commit', timeout: 45_000});

    // Some sites are heavy; give them a short warmup even if DOMContentLoaded fired.
    await sleep(1500);

    if (waitFor) {
      await page.waitForSelector(waitFor, {timeout: 30_000}).catch(() => null);
    }

    if (actions) {
      await actions(page);
    }

    // Hold the final state for the remainder.
    await sleep(Math.max(0, durationMs));
  } catch (err) {
    console.error(`[record] ${name} failed:`, err);
  } finally {
    // Context close can hang if the internal video recorder is unhappy.
    // Make it bounded and then hard-kill the browser process if needed.
    await withTimeout(ctx.close(), 10_000, `ctx.close(${name})`).catch(() => null);
    await withTimeout(browser.close(), 10_000, `browser.close(${name})`).catch(() => null);
    try {
      browser.process()?.kill('SIGKILL');
    } catch {
      // ignore
    }
  }

  const webmPath = video ? await video.path().catch(() => null) : null;
  if (!webmPath || !(await fileExists(webmPath))) {
    throw new Error(`[record] ${name}: missing webm output`);
  }

  // Empty file usually means the recorder got no frames.
  const stat = await fs.stat(webmPath);
  if (stat.size < 16 * 1024) {
    // Clean up known-bad outputs so the temp dir does not accumulate junk.
    await fs.rm(webmPath, {force: true}).catch(() => null);
    throw new Error(`[record] ${name}: webm is too small (${stat.size} bytes)`);
  }

  const outMp4 = path.join(assetsDir, name);
  const tmpMp4 = `${outMp4}.tmp.mp4`;

  // Convert webm -> mp4 (H.264) for the pipeline.
  await run('ffmpeg', [
    '-y',
    '-hide_banner',
    '-loglevel',
    'error',
    '-i',
    webmPath,
    '-r',
    String(FPS),
    '-vf',
    'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p',
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-crf',
    '23',
    '-pix_fmt',
    'yuv420p',
    tmpMp4,
  ]);

  await fs.rename(tmpMp4, outMp4);
  await fs.rm(webmPath, {force: true});

  console.log(`[record] wrote ${path.relative(repoRoot, outMp4)}`);
}

const safeClick = async (page, selector) => {
  const loc = page.locator(selector);
  const count = await loc.count().catch(() => 0);
  if (count > 0) {
    await loc.first().click({timeout: 3000}).catch(() => null);
  }
};

const scrollDemo = async (page) => {
  await page.mouse.wheel(0, 720);
  await sleep(900);
  await page.mouse.wheel(0, 720);
  await sleep(900);
  await page.mouse.wheel(0, -420);
  await sleep(700);
};

async function main() {
  await ensureDir(assetsDir);

  const clips = [
    {
      name: 'defillama-demo-fake.mp4',
      url: 'https://defillama.com/',
      durationMs: 8000,
      actions: async (page) => {
        // Close generic modals / cookie prompts if present.
        await safeClick(page, 'button:has-text("Accept")');
        await safeClick(page, 'button:has-text("I agree")');
        await scrollDemo(page);
      },
      waitFor: 'text=/TVL/i',
    },
    {
      name: 'defillama-rankings-fake.mp4',
      url: 'https://defillama.com/protocols',
      durationMs: 9000,
      actions: async (page) => {
        await safeClick(page, 'button:has-text("Accept")');
        await scrollDemo(page);
      },
      waitFor: 'text=/Protocols/i',
    },
    {
      name: 'aave-demo-fake.mp4',
      url: 'https://app.aave.com/',
      durationMs: 9000,
      actions: async (page) => {
        // Many dapps show a disclaimer or geo modal.
        await safeClick(page, 'button:has-text("Accept")');
        await safeClick(page, 'button:has-text("I understand")');
        await safeClick(page, 'button:has-text("Continue")');
        await scrollDemo(page);
      },
      waitFor: 'text=/Markets|Supply|Borrow/i',
    },
    {
      name: 'aave-markets-fake.mp4',
      url: 'https://app.aave.com/markets/',
      durationMs: 9000,
      actions: async (page) => {
        await safeClick(page, 'button:has-text("Accept")');
        await safeClick(page, 'button:has-text("Continue")');
        await scrollDemo(page);
      },
      waitFor: 'text=/Markets/i',
    },
    {
      name: 'uniswap-swap-fake.mp4',
      url: 'https://app.uniswap.org/swap',
      durationMs: 9000,
      actions: async (page) => {
        await safeClick(page, 'button:has-text("Accept")');
        await safeClick(page, 'button:has-text("Continue")');
        await safeClick(page, 'button:has-text("Dismiss")');
        await scrollDemo(page);
      },
      waitFor: 'text=/Swap/i',
    },
  ];

  // Record web clips first.
  // Important: some sites can hang the internal recorder. Keep a hard ceiling.
  for (const clip of clips) {
    try {
      console.log(`\n[record] starting ${clip.name} <- ${clip.url}`);
      await withTimeout(recordClip(clip), 120_000, `recordClip(${clip.name})`);
    } catch (err) {
      console.error(String(err?.message ?? err));
      console.error(`[record] keeping existing asset for ${clip.name}`);
    }
  }

  console.log('\n[record] done');
}

await main();
