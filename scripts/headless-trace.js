const puppeteer = require('puppeteer');
const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

const DEV_URL = 'http://localhost:8000/';
const TRACE_PATH = './trace.json';

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      const req = http.get(url, (res) => {
        res.destroy();
        resolve();
      });
      req.on('error', (err) => {
        if (Date.now() - start > timeout) return reject(new Error('Timeout waiting for dev server'));
        setTimeout(check, 500);
      });
    })();
  });
}

async function startDevIfNeeded() {
  // naive check: try to connect; if fail, spawn `npm run develop`
  try {
    await waitForServer(DEV_URL, 2000);
    console.log('Dev server already running');
    return null;
  } catch (e) {
    console.log('Starting dev server...');
    const proc = spawn('npm', ['run', 'develop'], { stdio: 'ignore', shell: true });
    // wait for server
    await waitForServer(DEV_URL, 60000);
    console.log('Dev server started');
    return proc;
  }
}

(async () => {
  let devProc = null;
  try {
    devProc = await startDevIfNeeded();
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    console.log('Opening page', DEV_URL);
    await page.goto(DEV_URL, { waitUntil: 'networkidle2', timeout: 60000 });

  // start tracing
    console.log('Start tracing');
    await page.tracing.start({ path: TRACE_PATH, screenshots: false });

    // wait a moment for page to settle and hydrate (allow header/lang buttons to render)
    await new Promise((r) => setTimeout(r, 2000));

    // save DOM snapshot to inspect language switch button structure
    try {
      const html = await page.content();
      require('fs').writeFileSync('dom-snapshot.html', html);
      console.log('Saved dom-snapshot.html');
    } catch (e) {
      console.log('Failed to save DOM snapshot', e.message);
    }

    // Click language button prioritizing data-lang attribute
    let clicked = false;
    try {
      // wait for a visible data-lang button to appear
      const sel = '[data-lang="en"]';
      await page.waitForSelector(sel, { timeout: 8000 });
      await page.click(sel);
      clicked = true;
    } catch (e) {
      // fallback: try to find any button with 'EN' text
      try {
        const btn = await page.$x("//button[normalize-space(.)='EN' or normalize-space(.)='en']");
        if (btn && btn[0]) {
          await btn[0].click();
          clicked = true;
        }
      } catch (e2) {
        // ignore
      }
    }

    console.log('Clicked language button?', clicked);

    // wait for navigation or network idle
    try {
      await Promise.race([
        page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 8000 }),
        new Promise((r) => setTimeout(r, 3000))
      ]);
    } catch (e) {
      // ignore
    }

    // extra wait to capture layout work
    await new Promise((r) => setTimeout(r, 2000));

    console.log('Stop tracing');
    await page.tracing.stop();

    console.log('Trace saved to', TRACE_PATH);

    await browser.close();
  } catch (err) {
    console.error('Error during headless trace:', err);
  } finally {
    if (devProc) {
      try { devProc.kill(); } catch (e) {}
    }
  }
})();
