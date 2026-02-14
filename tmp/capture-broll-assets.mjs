#!/usr/bin/env node
/**
 * capture-broll-assets.mjs — v2
 *
 * 用真实 Chrome 浏览器（非 headless）截取课程 B-roll 素材。
 * 你能看到浏览器窗口实时操作，截图/GIF 质量和你手动看到的一致。
 *
 *   1. DeFiLlama — 稳定币总市值增长图（PNG + GIF hover 动画）
 *   2. CoinGecko — UST (USTC) 崩盘价格图（PNG + GIF hover 动画）
 *   3. Carbon — DSCEngine.sol 代码美化截图（PNG）
 *
 * 用法：
 *   bun run tmp/capture-broll-assets.mjs
 */

import { chromium } from "playwright";
import { execSync } from "child_process";
import { mkdirSync } from "fs";
import path from "path";

// ── 输出目录 ──────────────────────────────────────────────
const LESSON_ROOT =
  "courses/course-1-stablecoin-protocol/unit-1-background-foundations/1-intro-defi-landscape";
const OUT_DIR = path.resolve(LESSON_ROOT, "assets/diagrams");
const TMP_FRAMES = path.resolve("tmp/frames");

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(TMP_FRAMES, { recursive: true });

// ── 工具函数 ──────────────────────────────────────────────

function framesToGif(framePattern, outputPath, { fps = 4, width = 1920 } = {}) {
  const cmd = [
    "ffmpeg -y",
    `-framerate ${fps}`,
    `-i "${framePattern}"`,
    `-vf "scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=bayer"`,
    `-loop 0`,
    `"${outputPath}"`,
  ].join(" ");
  console.log(`  ▸ ffmpeg → ${path.basename(outputPath)}`);
  execSync(cmd, { stdio: "pipe" });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── 主流程 ────────────────────────────────────────────────
async function main() {
  console.log("🚀 Launching real Chrome browser...\n");

  const browser = await chromium.launch({
    channel: "chrome",
    headless: false,
    args: [
      "--window-size=1920,1080",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. DeFiLlama — 稳定币总市值
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log("📊 [1/3] DeFiLlama — Stablecoin Total Market Cap");

  const ctx1 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page1 = await ctx1.newPage();

  await page1.goto("https://defillama.com/stablecoins", { waitUntil: "load" });
  console.log("  ⏳ Waiting for chart to render...");
  await sleep(12000);

  // 关弹窗
  for (const text of ["Accept", "Got it", "Close", "×"]) {
    try { await page1.click(`button:has-text("${text}")`, { timeout: 800 }); } catch {}
  }
  await sleep(1000);

  // PNG
  const pngPath1 = path.join(OUT_DIR, "segment-01-stablecoin-market-cap.png");
  await page1.screenshot({ path: pngPath1, fullPage: false });
  console.log(`  ✅ PNG: ${path.basename(pngPath1)}`);

  // GIF：鼠标从左到右沿图表 hover
  const gifDir1 = path.join(TMP_FRAMES, "defillama");
  mkdirSync(gifDir1, { recursive: true });

  const frames1 = 24;
  for (let i = 0; i < frames1; i++) {
    const x = 160 + (1600 * i) / (frames1 - 1);
    const y = 450;
    await page1.mouse.move(x, y);
    await sleep(150);
    await page1.screenshot({
      path: path.join(gifDir1, `f-${String(i).padStart(3, "0")}.png`),
    });
  }

  const gifPath1 = path.join(OUT_DIR, "segment-01-stablecoin-market-cap.gif");
  framesToGif(path.join(gifDir1, "f-%03d.png"), gifPath1, { fps: 6, width: 1920 });
  console.log(`  ✅ GIF: ${path.basename(gifPath1)} (${frames1} frames)\n`);

  await page1.close();
  await ctx1.close();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. CoinGecko — UST 崩盘
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log("💀 [2/3] CoinGecko — UST Depeg Chart");

  const ctx2 = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page2 = await ctx2.newPage();

  await page2.goto("https://www.coingecko.com/en/coins/terraclassicusd", { waitUntil: "load" });
  console.log("  ⏳ Waiting for chart to render...");
  await sleep(10000);

  // 关 cookie banner
  for (const sel of [
    'button:has-text("Accept")',
    'button:has-text("OK")',
    'button:has-text("Got it")',
    '[data-action="click->cookie-consent#close"]',
    '.cookie-consent button',
  ]) {
    try { await page2.click(sel, { timeout: 800 }); } catch {}
  }
  await sleep(1000);

  // 点 Max 时间范围
  console.log("  ⏳ Clicking Max range...");
  const maxSelectors = [
    'button:has-text("Max")',
    'button:has-text("MAX")',
    '[data-range="max"]',
    'button:has-text("ALL")',
  ];
  let clickedMax = false;
  for (const sel of maxSelectors) {
    try {
      await page2.locator(sel).first().click({ timeout: 2000 });
      clickedMax = true;
      console.log(`  ✓ Clicked: ${sel}`);
      break;
    } catch {}
  }
  if (!clickedMax) {
    // 最后手段：用 evaluate 找按钮
    try {
      await page2.evaluate(() => {
        const btns = [...document.querySelectorAll("button")];
        const maxBtn = btns.find((b) => /^max$/i.test(b.textContent.trim()));
        if (maxBtn) maxBtn.click();
      });
      clickedMax = true;
      console.log("  ✓ Clicked Max via JS evaluate");
    } catch {}
  }
  if (!clickedMax) console.log("  ⚠ Could not click Max, using default range");

  await sleep(5000);  // 等图表重绘

  // PNG
  const pngPath2 = path.join(OUT_DIR, "segment-03-ust-depeg.png");
  await page2.screenshot({ path: pngPath2, fullPage: false });
  console.log(`  ✅ PNG: ${path.basename(pngPath2)}`);

  // GIF：hover 遍历崩盘曲线
  const gifDir2 = path.join(TMP_FRAMES, "ust-depeg");
  mkdirSync(gifDir2, { recursive: true });

  const frames2 = 30;
  for (let i = 0; i < frames2; i++) {
    const x = 100 + (1720 * i) / (frames2 - 1);
    const y = 400;
    await page2.mouse.move(x, y);
    await sleep(120);
    await page2.screenshot({
      path: path.join(gifDir2, `f-${String(i).padStart(3, "0")}.png`),
    });
  }

  const gifPath2 = path.join(OUT_DIR, "segment-03-ust-depeg.gif");
  framesToGif(path.join(gifDir2, "f-%03d.png"), gifPath2, { fps: 6, width: 1920 });
  console.log(`  ✅ GIF: ${path.basename(gifPath2)} (${frames2} frames)\n`);

  await page2.close();
  await ctx2.close();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. Carbon — DSCEngine.sol 代码预览
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log("💻 [3/3] Carbon — DSCEngine.sol Code Preview");

  const code = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract DSCEngine is ReentrancyGuard {

    // ── Core Parameters ──────────────────────────
    uint256 private constant LIQUIDATION_THRESHOLD = 50;   // 200% collateral ratio
    uint256 private constant LIQUIDATION_BONUS     = 10;   // 10% liquidator reward
    uint256 private constant MIN_HEALTH_FACTOR     = 1e18;

    // ── External Functions ───────────────────────
    function depositCollateralAndMintDsc(
        address tokenCollateralAddress,
        uint256 amountCollateral,
        uint256 amountDscToMint
    ) external { ... }

    function redeemCollateralForDsc(
        address tokenCollateralAddress,
        uint256 amountCollateral,
        uint256 amountDscToBurn
    ) external { ... }

    function liquidate(
        address collateral,
        address user,
        uint256 debtToCover
    ) external moreThanZero(debtToCover) nonReentrant { ... }

    function getHealthFactor(
        address user
    ) external view returns (uint256) { ... }
}`;

  const carbonUrl =
    "https://carbon.now.sh/?" +
    new URLSearchParams({
      bg: "rgba(0,0,0,1)",
      t: "one-dark",
      wt: "none",
      l: "auto",
      width: "880",
      ds: "true",
      dsyoff: "20px",
      dsblur: "68px",
      wc: "true",
      wa: "true",
      pv: "56px",
      ph: "56px",
      ln: "true",
      fl: "1",
      fm: "JetBrains Mono",
      fs: "14px",
      lh: "152%",
      si: "false",
      es: "2x",
      wm: "false",
      code: code,
    }).toString();

  const ctx3 = await browser.newContext({
    viewport: { width: 1400, height: 1000 },
    deviceScaleFactor: 2,
  });
  const page3 = await ctx3.newPage();

  await page3.goto(carbonUrl, { waitUntil: "load" });
  console.log("  ⏳ Waiting for Carbon to render...");
  await sleep(10000);

  // 截取 Carbon 代码容器
  const pngPath3 = path.join(OUT_DIR, "segment-06-code-preview.png");

  let exported = false;
  for (const sel of ["#export-container", ".container-bg", ".carbon"]) {
    try {
      const el = page3.locator(sel).first();
      await el.waitFor({ timeout: 5000 });
      await el.screenshot({ path: pngPath3 });
      exported = true;
      console.log(`  ✅ PNG: ${path.basename(pngPath3)} (via ${sel})`);
      break;
    } catch {}
  }
  if (!exported) {
    await page3.screenshot({ path: pngPath3, fullPage: false });
    console.log(`  ✅ PNG: ${path.basename(pngPath3)} (full viewport fallback)`);
  }

  console.log("");
  await page3.close();
  await ctx3.close();
  await browser.close();

  // ── 清理 ──────────────────────────────────────────────
  console.log("🧹 Cleaning up temp frames...");
  execSync(`rm -rf "${TMP_FRAMES}"`);

  // ── 最终报告 ──────────────────────────────────────────
  console.log("\n✅ All assets captured!\n");
  console.log(`📁 ${OUT_DIR}\n`);
  execSync(`ls -lh "${OUT_DIR}"`, { stdio: "inherit" });
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
