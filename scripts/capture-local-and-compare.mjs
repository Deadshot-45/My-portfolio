import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 812 },
];

const LOCAL_DIR = path.resolve('visual-audit/local');
const DIFF_DIR = path.resolve('visual-audit/diff');
const REF_DIR = path.resolve('visual-audit/reference');

fs.mkdirSync(LOCAL_DIR, { recursive: true });
fs.mkdirSync(DIFF_DIR, { recursive: true });

function checkServerReady(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        resolve(res.statusCode === 200);
      })
      .on('error', () => {
        resolve(false);
      });
  });
}

function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = async () => {
      const ready = await checkServerReady(url);
      if (ready) {
        resolve();
      } else {
        if (Date.now() - start > timeoutMs) reject(new Error('Timeout waiting for server'));
        else setTimeout(check, 500);
      }
    };
    check();
  });
}

function compareImages(img1Path, img2Path, diffOutputPath) {
  if (!fs.existsSync(img1Path) || !fs.existsSync(img2Path)) {
    console.log(`Skipping diff, missing: ${img1Path} or ${img2Path}`);
    return null;
  }

  const raw1 = PNG.sync.read(fs.readFileSync(img1Path));
  const raw2 = PNG.sync.read(fs.readFileSync(img2Path));

  const width = Math.max(raw1.width, raw2.width);
  const height = Math.max(raw1.height, raw2.height);

  // Pad raw1 if needed
  const img1 = new PNG({ width, height });
  PNG.bitblt(raw1, img1, 0, 0, raw1.width, raw1.height, 0, 0);

  // Pad raw2 if needed
  const img2 = new PNG({ width, height });
  PNG.bitblt(raw2, img2, 0, 0, raw2.width, raw2.height, 0, 0);

  const diff = new PNG({ width, height });
  const mismatchedPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1,
  });

  fs.writeFileSync(diffOutputPath, PNG.sync.write(diff));
  const totalPixels = width * height;
  const mismatchPercent = ((mismatchedPixels / totalPixels) * 100).toFixed(2);

  return { mismatchedPixels, totalPixels, mismatchPercent };
}

async function run() {
  let server = null;
  const alreadyRunning = await checkServerReady('http://localhost:3000');

  if (alreadyRunning) {
    console.log('Next.js server is already active on http://localhost:3000');
  } else {
    console.log('Starting Next.js dev server on port 3000...');
    server = spawn('node', ['./node_modules/next/dist/bin/next', 'dev', '-p', '3000'], {
      stdio: 'pipe',
      detached: false,
    });

    server.stdout.on('data', (d) => process.stdout.write(`[Server] ${d}`));
    server.stderr.on('data', (d) => process.stderr.write(`[Server ERR] ${d}`));

    console.log('Waiting for http://localhost:3000 to be ready...');
    await waitForServer('http://localhost:3000', 30000);
    console.log('Server is ready!');
  }

  try {
    const browser = await chromium.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: true,
    });

    const diffResults = [];

    for (const vp of VIEWPORTS) {
      console.log(`Capturing local at ${vp.name} (${vp.width}x${vp.height})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      try {
        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 35000 });
        await page.waitForTimeout(3000);

        const localFull = path.join(LOCAL_DIR, `${vp.name}.png`);
        await page.screenshot({ path: localFull, fullPage: true });

        const localHero = path.join(LOCAL_DIR, `${vp.name}-hero.png`);
        await page.screenshot({ path: localHero, fullPage: false });

        console.log(`Comparing ${vp.name}...`);
        const refFull = path.join(REF_DIR, `${vp.name}.png`);
        const refHero = path.join(REF_DIR, `${vp.name}-hero.png`);

        const diffFull = path.join(DIFF_DIR, `${vp.name}-diff.png`);
        const diffHero = path.join(DIFF_DIR, `${vp.name}-hero-diff.png`);

        const fullStats = compareImages(refFull, localFull, diffFull);
        const heroStats = compareImages(refHero, localHero, diffHero);

        diffResults.push({
          viewport: vp.name,
          full: fullStats,
          hero: heroStats,
        });
      } catch (err) {
        console.error(`Error on local ${vp.name}:`, err.message);
      } finally {
        await context.close();
      }
    }

    await browser.close();

    console.log('\n=======================================');
    console.log('VISUAL COMPARISON RESULTS');
    console.log('=======================================');
    console.table(
      diffResults.map((r) => ({
        Viewport: r.viewport,
        'Hero Diff %': r.hero?.mismatchPercent + '%',
        'Hero Mismatched Pixels': r.hero?.mismatchedPixels,
        'FullPage Diff %': r.full?.mismatchPercent + '%',
        'FullPage Mismatched Pixels': r.full?.mismatchedPixels,
      }))
    );

    fs.writeFileSync(
      path.join(DIFF_DIR, 'summary.json'),
      JSON.stringify(diffResults, null, 2)
    );
  } finally {
    if (server) {
      console.log('Shutting down spawned server...');
      server.kill();
    }
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
