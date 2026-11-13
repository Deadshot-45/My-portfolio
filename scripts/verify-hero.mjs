import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('visual-audit/hero-check');
fs.mkdirSync(OUT_DIR, { recursive: true });

function checkServerReady(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => resolve(res.statusCode === 200))
      .on('error', () => resolve(false));
  });
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = async () => {
      if (await checkServerReady(url)) return resolve();
      if (Date.now() - start > timeoutMs) return reject(new Error('Timeout waiting for server'));
      setTimeout(check, 500);
    };
    check();
  });
}

async function run() {
  let server = null;
  const alreadyRunning = await checkServerReady('http://localhost:3000');

  if (!alreadyRunning) {
    console.log('Starting Next.js dev server on port 3000...');
    server = spawn('node', ['./node_modules/next/dist/bin/next', 'dev', '-p', '3000'], {
      stdio: 'pipe',
      detached: false,
    });
    await waitForServer('http://localhost:3000', 30000);
  } else {
    console.log('Detected existing server on http://localhost:3000');
  }

  try {
    const browser = await chromium.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
    });

    // 1. Desktop 1440x900
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(1500);

    await page.screenshot({ path: path.join(OUT_DIR, 'hero-sunset-1440.png') });
    console.log('Saved hero-sunset-1440.png');

    // Click Day button
    await page.locator('[aria-label="Day sky"]').click();
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(OUT_DIR, 'hero-day-1440.png') });
    console.log('Saved hero-day-1440.png');

    // Click Night button
    await page.locator('[aria-label="Night sky"]').click();
    await page.waitForTimeout(1100);
    await page.screenshot({ path: path.join(OUT_DIR, 'hero-night-1440.png') });
    console.log('Saved hero-night-1440.png');

    // Back to Sunset + test MENU drawer
    await page.locator('[aria-label="Sunset sky"]').click();
    await page.waitForTimeout(900);
    await page.locator('[aria-label="Open menu"]').click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(OUT_DIR, 'hero-menu-1440.png') });
    console.log('Saved hero-menu-1440.png');
    await context.close();

    // 2. Mobile 390x844
    const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const mobilePage = await mobileCtx.newPage();
    await mobilePage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 35000 });
    await mobilePage.waitForTimeout(1500);
    await mobilePage.screenshot({ path: path.join(OUT_DIR, 'hero-sunset-390.png') });
    console.log('Saved hero-sunset-390.png');
    await mobileCtx.close();

    await browser.close();
  } finally {
    if (server) server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
