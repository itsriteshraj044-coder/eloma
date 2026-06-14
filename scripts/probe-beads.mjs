// Dev-only: inspect the anchor bead circles' attributes/styles.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
  defaultViewport: { width: 1440, height: 1100 },
});
const page = await browser.newPage();
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));
await page.evaluate(() => {
  document.querySelector('#capabilities-blueprint .aspect-\\[2\\/1\\]')?.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 5000));

const info = await page.evaluate(() => {
  const svg = document.querySelector('#capabilities-blueprint svg');
  const circles = [...svg.querySelectorAll('circle')];
  return circles.map((c) => {
    const cs = getComputedStyle(c);
    return {
      cx: c.getAttribute('cx'),
      cy: c.getAttribute('cy'),
      rAttr: c.getAttribute('r'),
      styleAttr: c.getAttribute('style'),
      dashArray: cs.strokeDasharray,
      dashOffset: cs.strokeDashoffset,
      pathLength: c.getAttribute('pathLength'),
    };
  });
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
