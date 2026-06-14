// Dev-only: print exact geometry of the schematic canvas, SVG and callout cards.
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
  document.querySelector('#capabilities-schematic')?.scrollIntoView({ block: 'center', behavior: 'instant' });
});
await new Promise((r) => setTimeout(r, 4000));

const data = await page.evaluate(() => {
  const section = document.querySelector('#capabilities-schematic');
  const canvas = section.querySelector('.aspect-\\[2\\/1\\]');
  const svg = canvas.querySelector('svg');
  const cards = [...canvas.querySelectorAll(':scope > div')].map((d) => {
    const r = d.getBoundingClientRect();
    return {
      text: d.textContent.slice(0, 24),
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
      transform: getComputedStyle(d).transform,
    };
  });
  const c = canvas.getBoundingClientRect();
  const s = svg.getBoundingClientRect();
  return {
    canvas: { x: Math.round(c.x), y: Math.round(c.y), w: Math.round(c.width), h: Math.round(c.height) },
    svg: { x: Math.round(s.x), y: Math.round(s.y), w: Math.round(s.width), h: Math.round(s.height) },
    cards,
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
