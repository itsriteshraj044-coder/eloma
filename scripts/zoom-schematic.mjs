// Dev-only: zoomed screenshot of the schematic canvas (deviceScaleFactor 2).
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
  defaultViewport: { width: 1440, height: 1100, deviceScaleFactor: 2 },
});
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));
await page.evaluate(() => {
  document.querySelector('#capabilities-blueprint .aspect-\\[2\\/1\\]')?.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 5000));

const el = await page.$('#capabilities-blueprint .aspect-\\[2\\/1\\]');
await el.screenshot({ path: 'C:\\Users\\rites\\AppData\\Local\\Temp\\blueprint-zoom.png' });
console.log('saved');
await browser.close();
