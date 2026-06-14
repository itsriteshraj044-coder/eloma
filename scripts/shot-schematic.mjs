// Dev-only helper: screenshot a section of the running dev server.
// Usage: node scripts/shot-schematic.mjs <url> <selector> <outfile>
import puppeteer from 'puppeteer-core';

const [url, selector, outfile] = process.argv.slice(2);

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
  defaultViewport: { width: 1440, height: 1100 },
});

const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

// Let the preloader finish, then bring the section into view so the
// whileInView reveals fire, then let the draw-in animations complete.
await new Promise((r) => setTimeout(r, 3500));
await page.evaluate((sel) => {
  document.querySelector(sel)?.scrollIntoView({ block: 'start', behavior: 'instant' });
}, selector);
await new Promise((r) => setTimeout(r, 4000));

const el = await page.$(selector);
if (!el) {
  console.error(`Selector not found: ${selector}`);
  await browser.close();
  process.exit(1);
}
await el.screenshot({ path: outfile });
console.log(`saved ${outfile}`);
await browser.close();
