const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2] || 'http://localhost:8000/project/ebpc/';
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const networkRequests = []
  page.on('requestfinished', async (req) => {
    try {
      const resp = req.response()
      networkRequests.push({ url: req.url(), status: resp ? resp.status() : null })
    } catch (e) {}
  })

  page.on('console', msg => {
    try {
      console.log('PAGE LOG:', msg.text());
    } catch (e) {}
  });

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Prefer waiting for the map-ready flag set by the client component (if present)
  let consoleSignal = null
  try {
    // Also listen for console messages that indicate the ConnectivityMap ran
    consoleSignal = await new Promise((resolve) => {
      const listener = (msg) => {
        try {
          const text = msg.text && msg.text()
          if (text && text.includes && text.includes('ConnectivityMap:')) {
            page.off('console', listener)
            resolve(text)
          }
        } catch (e) {}
      }
      page.on('console', listener)
      // timeout fallback after 40s
      setTimeout(() => { page.off('console', listener); resolve(null) }, 40000)
    })
  } catch (e) {
    consoleSignal = null
  }

  try {
    await page.waitForFunction(() => {
      try { return !!window.__connectivity_heatmap_ready } catch (e) { return false }
    }, { timeout: 40000 })
  } catch (e) {
    // fallback: wait up to 30s for the page to populate: either an SVG appears or body length > 1000
    try {
      await page.waitForFunction(() => {
        try {
          const body = document.querySelector('body')
          const hasEnough = body && body.innerHTML && body.innerHTML.length > 1000
          const hasSvg = !!document.querySelector('svg')
          return hasEnough || hasSvg
        } catch (e) { return false }
      }, { timeout: 30000 })
    } catch (e) {
      // continue and collect what we can
    }
  }

  // collect a bunch of debug info without waiting specifically for <image>
  // take a screenshot for manual inspection
  try { await page.screenshot({ path: '/tmp/ebpc_debug.png', fullPage: true }) } catch (e) {}

  const info = await page.evaluate(() => {
    const svg = document.querySelector('svg')
    const img = document.querySelector('svg image, svg img')
    const clip = document.querySelector('svg defs clipPath')
    const desc = document.querySelector('svg desc')
    const circles = document.querySelectorAll('svg circle')
    const body = document.querySelector('body')
    return {
      hasSvg: !!svg,
      hasImage: !!img,
      imgHref: img ? (img.getAttribute('href') || img.getAttribute('xlink:href') || '') : '',
      imgHrefLen: img ? ((img.getAttribute('href') || img.getAttribute('xlink:href') || '').length) : 0,
      clipId: clip ? (clip.id || clip.getAttribute('id') || '') : '',
      desc: desc ? desc.textContent : null,
      circleCount: circles ? circles.length : 0,
      windowHeatmapReady: (typeof window.__connectivity_heatmap_ready !== 'undefined') ? !!window.__connectivity_heatmap_ready : null,
      windowHeatmapLen: window.__connectivity_heatmap_length || null,
      windowHeatmapHrefLen: (window.__connectivity_heatmap_href || '').length || 0,
      bodyLength: body ? body.innerHTML.length : 0,
      bodySnippet: body ? body.innerHTML.slice(0, 1000) : '',
      svgInnerHTMLSnippet: svg ? svg.innerHTML.slice(0, 2000) : ''
    }
  })

  console.log('IMAGE DEBUG INFO:', info)
  console.log('NETWORK REQUESTS (recent):', networkRequests.slice(-30))
  const found = !!info.hasImage

  await browser.close();
  process.exit(found ? 0 : 2);
})();
