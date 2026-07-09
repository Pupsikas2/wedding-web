import { chromium } from 'playwright';
const b = await chromium.launch();
for (const w of [430, 1200]) {
  const p = await b.newPage({ viewport:{width:w,height:900}, deviceScaleFactor:1 });
  await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
  await p.waitForTimeout(300);
  await p.screenshot({ path:`/tmp/wide-${w}.png` });
  await p.close();
}
await b.close();
console.log('done');
