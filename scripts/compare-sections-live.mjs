import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const SECTIONS = [
  { name: 'hero', localSelector: '#hero', refSelector: '#hero' },
  { name: 'why', localSelector: '#why', refSelector: 'section[data-why-frame="true"]' },
  { name: 'services-intro', localSelector: '#services-intro', refSelector: 'section[aria-label="Creative Developer"]' },
  { name: 'work', localSelector: '#work', refSelector: '#work' },
  { name: 'showcase', localSelector: '#showcase', refSelector: 'section[aria-labelledby="showcase-title"]' },
  { name: 'clients', localSelector: '#clients', refSelector: '#clients' },
  { name: 'craft', localSelector: '#craft', refSelector: '#craft' },
  { name: 'process', localSelector: '#process', refSelector: '#process' },
  { name: 'contact', localSelector: '#contact', refSelector: '#contact' },
];

const SECTIONS_DIR = path.resolve('visual-audit/sections');
fs.mkdirSync(SECTIONS_DIR, { recursive: true });

function compareImages(img1Path, img2Path, diffOutputPath) {
  if (!fs.existsSync(img1Path) || !fs.existsSync(img2Path)) return null;

  const raw1 = PNG.sync.read(fs.readFileSync(img1Path));
  const raw2 = PNG.sync.read(fs.readFileSync(img2Path));

  const width = Math.max(raw1.width, raw2.width);
  const height = Math.max(raw1.height, raw2.height);

  const img1 = new PNG({ width, height });
  PNG.bitblt(raw1, img1, 0, 0, raw1.width, raw1.height, 0, 0);

  const img2 = new PNG({ width, height });
  PNG.bitblt(raw2, img2, 0, 0, raw2.width, raw2.height, 0, 0);

  const diff = new PNG({ width, height });
  const mismatchedPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.15,
  });

  fs.writeFileSync(diffOutputPath, PNG.sync.write(diff));
  const totalPixels = width * height;
  const mismatchPercent = ((mismatchedPixels / totalPixels) * 100).toFixed(2);

  return { mismatchedPixels, totalPixels, mismatchPercent, width, height };
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

  console.log('Navigating to https://codeofsagar.in/...');
  try {
    await page.goto('https://codeofsagar.in/', { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(4000);

    for (const sec of SECTIONS) {
      try {
        const loc = page.locator(sec.refSelector);
        if (await loc.count() > 0) {
          const outRef = path.join(SECTIONS_DIR, `ref-${sec.name}.png`);
          await loc.first().screenshot({ path: outRef });
          console.log(`Captured reference section: ${sec.name}`);
        } else {
          console.warn(`Reference selector not found: ${sec.refSelector}`);
        }
      } catch (e) {
        console.error(`Failed to capture ref ${sec.name}:`, e.message);
      }
    }
  } catch (err) {
    console.error('Failed to load codeofsagar.in:', err.message);
  } finally {
    await browser.close();
  }

  // Compare each section
  console.log('\n=======================================');
  console.log('SECTION-BY-SECTION VISUAL AUDIT RESULTS');
  console.log('=======================================');
  const results = [];
  for (const sec of SECTIONS) {
    const refPath = path.join(SECTIONS_DIR, `ref-${sec.name}.png`);
    const locPath = path.join(SECTIONS_DIR, `local-${sec.name}.png`);
    const diffPath = path.join(SECTIONS_DIR, `diff-${sec.name}.png`);

    const stats = compareImages(refPath, locPath, diffPath);
    if (stats) {
      results.push({
        Section: sec.name,
        'Mismatch %': stats.mismatchPercent + '%',
        Mismatched: stats.mismatchedPixels,
        Dimensions: `${stats.width}x${stats.height}`,
      });
    } else {
      results.push({
        Section: sec.name,
        'Mismatch %': 'N/A',
        Mismatched: 0,
        Dimensions: 'Missing files',
      });
    }
  }

  console.table(results);
  fs.writeFileSync(
    path.join(SECTIONS_DIR, 'section-summary.json'),
    JSON.stringify(results, null, 2)
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
