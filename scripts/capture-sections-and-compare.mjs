import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const SECTIONS = [
  { id: 'hero', selector: '#hero' },
  { id: 'why', selector: '#why' },
  { id: 'services-intro', selector: '#services-intro' },
  { id: 'work', selector: '#work' },
  { id: 'showcase', selector: '#showcase' },
  { id: 'clients', selector: '#clients' },
  { id: 'craft', selector: '#craft' },
  { id: 'process', selector: '#process' },
  { id: 'contact', selector: '#contact' },
];

const AUDIT_DIR = path.resolve('visual-audit/sections');
fs.mkdirSync(AUDIT_DIR, { recursive: true });

function comparePNG(p1, p2, outDiff) {
  if (!fs.existsSync(p1) || !fs.existsSync(p2)) return null;

  const r1 = PNG.sync.read(fs.readFileSync(p1));
  const r2 = PNG.sync.read(fs.readFileSync(p2));

  const width = Math.max(r1.width, r2.width);
  const height = Math.max(r1.height, r2.height);

  const img1 = new PNG({ width, height });
  PNG.bitblt(r1, img1, 0, 0, r1.width, r1.height, 0, 0);

  const img2 = new PNG({ width, height });
  PNG.bitblt(r2, img2, 0, 0, r2.width, r2.height, 0, 0);

  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.12,
  });

  fs.writeFileSync(outDiff, PNG.sync.write(diff));
  const total = width * height;
  return {
    mismatched,
    total,
    pct: ((mismatched / total) * 100).toFixed(2),
  };
}

async function run() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  console.log('Capturing local sections on http://localhost:3000...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 35000 });
  await page.waitForTimeout(3000);

  for (const sec of SECTIONS) {
    try {
      const loc = page.locator(sec.selector);
      if (await loc.count() > 0) {
        const outPath = path.join(AUDIT_DIR, `local-${sec.id}.png`);
        await loc.first().screenshot({ path: outPath });
        console.log(`Captured ${sec.id} (${outPath})`);
      } else {
        console.warn(`Selector not found: ${sec.selector}`);
      }
    } catch (e) {
      console.error(`Failed to capture ${sec.id}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('All local sections captured successfully!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
