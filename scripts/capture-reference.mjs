import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 812 },
];

const OUT_DIR = path.resolve('visual-audit/reference');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  console.log('Launching browser to capture reference site: https://codeofsagar.in/ ...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  for (const vp of VIEWPORTS) {
    console.log(`Capturing reference at ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    try {
      await page.goto('https://codeofsagar.in/', { waitUntil: 'networkidle', timeout: 30000 });
      // wait a bit for fonts & dynamic shaders/animations to stabilize
      await page.waitForTimeout(3000);

      const filePath = path.join(OUT_DIR, `${vp.name}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved ${filePath}`);

      // Also capture hero above-the-fold
      const heroPath = path.join(OUT_DIR, `${vp.name}-hero.png`);
      await page.screenshot({ path: heroPath, fullPage: false });
      console.log(`Saved ${heroPath}`);
    } catch (err) {
      console.error(`Error on ${vp.name}:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();
  console.log('Reference capture complete!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
