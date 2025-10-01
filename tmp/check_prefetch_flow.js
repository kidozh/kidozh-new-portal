const puppeteer = require('puppeteer');

(async () => {
  const start = Date.now();
  const requests = [];
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    page.on('request', (req) => {
      requests.push({ type: 'request', url: req.url(), method: req.method(), time: Date.now() - start });
    });
    page.on('response', async (res) => {
      requests.push({ type: 'response', url: res.url(), status: res.status(), time: Date.now() - start });
    });

    const base = 'http://localhost:8000';
    console.log('Going to', `${base}/project`);
    await page.goto(`${base}/project`, { waitUntil: 'networkidle2' });

    // find anchor whose href contains '/project/ebpc'
    const href = await page.evaluate(() => {
      const a = Array.from(document.querySelectorAll('a')).find(a => a.href && a.href.includes('/project/ebpc'));
      return a ? a.href : null;
    });

    if (!href) {
      console.error('No anchor found for /project/ebpc');
      await browser.close();
      process.exit(2);
    }

    console.log('Found href:', href);

    // find element handle
    const anchors = await page.$$('a');
    let target = null;
    for (const a of anchors) {
      try {
        const v = await (await a.getProperty('href')).jsonValue();
        if (v && v.includes('/project/ebpc')) {
          target = a;
          break;
        }
      } catch (e) {
        // ignore
      }
    }

    if (!target) {
      console.error('Element handle not found');
      await browser.close();
      process.exit(2);
    }

    const hoverStart = Date.now();
    console.log('Hovering target...');
    await target.hover();
    // wait to allow prefetch to fire
    await page.waitForTimeout(1000);
    const hoverTime = Date.now();

    // click and wait for navigation
    console.log('Clicking target...');
    const clickStart = Date.now();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
      target.click(),
    ]);
    const navEnd = Date.now();

    console.log('Timings (ms): start->hover=', hoverStart - start, 'start->click=', clickStart - start, 'click->nav=', navEnd - clickStart);

    // summarize requests
    const beforeClick = requests.filter(r => r.time < (clickStart - start) + 100);
    const afterClick = requests.filter(r => r.time >= (clickStart - start) - 100);

    console.log('\nRequests before click (count):', beforeClick.length);
    beforeClick.forEach(r => console.log(r.type, r.status || '', r.time, r.url));

    console.log('\nRequests after click (count):', afterClick.length);
    afterClick.forEach(r => console.log(r.type, r.status || '', r.time, r.url));

    const pd = requests.filter(r => r.url && r.url.includes('/page-data') && r.url.includes('page-data.json'));
    console.log('\npage-data requests found:', pd.length);
    pd.forEach(r => console.log(r.type, r.time, r.url));

    // optional: capture first visual snapshot of the page
    try {
      const title = await page.title();
      console.log('\nNavigated page title:', title);
    } catch (e) {}

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error('ERROR', err);
    try { if (browser) await browser.close(); } catch (e) {}
    process.exit(1);
  }
})();
