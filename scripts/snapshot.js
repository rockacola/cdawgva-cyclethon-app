const { mkdirSync } = require('fs');
const { join } = require('path');

const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:3000';

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'about-cyclethon', path: '/about-cyclethon' },
  { name: 'donations', path: '/donations' },
  { name: 'donations-live', path: '/donations/live' },
  { name: 'donations-search', path: '/donations/search' },
  { name: 'donations-top', path: '/donations/top' },
  { name: 'finish-line', path: '/finish-line' },
  { name: 'journey', path: '/journey' },
  { name: 'journey-day-1', path: '/journey/day-1' },
  {
    name: 'ja-home',
    path: '/',
    // use-local-storage-state serialises values as JSON, so 'JA' is stored as '"JA"'
    setup: async (page) => page.evaluate(() => localStorage.setItem('locale', '"JA"')),
  },
];

async function main() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
  const dest = join('snapshots', timestamp);
  mkdirSync(dest, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  // Navigate once to establish a localhost:3000 context so localStorage is accessible
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });

  for (const { name, path, setup } of ROUTES) {
    await page.evaluate(() => localStorage.clear());
    if (setup) {
      await setup(page);
    }
    await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load' });
    // Wait for network to settle — helps lazy assets like maps load.
    // Timeout is intentional: SSE routes never reach networkidle.
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    // Hide Next.js dev overlay injected in development mode
    await page.evaluate(() => {
      const el = document.querySelector('nextjs-portal');
      if (el) {
        el.style.display = 'none';
      }
    });
    // Two-pass resize: use the footer's document bottom as the authoritative height.
    // scrollHeight is unreliable because body { min-height: 100vh } inflates it when
    // the viewport is resized. Measuring footer bottom avoids that, but vh-unit elements
    // shift on the first resize, so we re-measure and resize once more to settle.
    const footerBottom = (page) =>
      page.evaluate(() => {
        const footer = document.querySelector('footer');
        return footer
          ? Math.ceil(footer.getBoundingClientRect().bottom + window.scrollY)
          : document.documentElement.scrollHeight;
      });
    await page.setViewportSize({ width: 1280, height: await footerBottom(page) });
    await page.setViewportSize({ width: 1280, height: await footerBottom(page) });
    await page.screenshot({ path: join(dest, `${name}.png`) });
    console.log(`captured ${name}`);
  }

  await browser.close();
  console.log(`\nSnapshots saved to ${dest}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
