// Dev-only: tight crop around the top-left anchor bead.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
  defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 3 },
});
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));
await page.evaluate(() => {
  document.querySelector('#capabilities-blueprint .aspect-\\[2\\/1\\]')?.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 5000));

const clip = await page.evaluate(() => {
  const canvas = document.querySelector('#capabilities-blueprint .aspect-\\[2\\/1\\]');
  const r = canvas.getBoundingClientRect();
  // top-left bead at viewBox (313,161) of 800x420
  const bx = r.x + (313 / 800) * r.width;
  const by = r.y + (161 / 420) * r.height;
  return { x: bx - 80 + window.scrollX, y: by - 80 + window.scrollY, width: 160, height: 160 };
});
await page.screenshot({ path: 'C:\\Users\\rites\\AppData\\Local\\Temp\\bead-crop.png', clip });
console.log('saved', JSON.stringify(clip));
await browser.close();
