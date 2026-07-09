import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:4321/';
const out = process.argv[3] || 'shot';
const mode = process.argv[4] || 'full'; // 'full' or a viewport index

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

if (mode === 'full') {
  await page.screenshot({ path: `${out}-full.png`, fullPage: true });
} else {
  // one screenshot per 844px viewport slice
  const height = await page.evaluate(() => document.body.scrollHeight);
  const panels = Math.ceil(height / 844);
  for (let i = 0; i < panels; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 844);
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${out}-view${i}.png` });
  }
}
await browser.close();
console.log('done');
