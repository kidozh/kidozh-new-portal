(async()=>{
  try{
    const p = require('puppeteer')
    const b = await p.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await b.newPage()
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()))
      page.on('requestfailed', req => console.log('REQ FAILED:', req.url(), req.failure && req.failure().errorText))
      page.on('requestfinished', async (req) => {
        try{
          const res = req.response()
          if (res) console.log('REQ FIN:', res.status(), req.url())
        }catch(e){/* ignore */}
      })
  await page.goto('http://localhost:8000/project/ebpc/', { waitUntil: 'networkidle2', timeout: 30000 })
    // wait a bit for client-side rendering and additional fetches
    await new Promise(res => setTimeout(res, 3000))
    // Try forcing Gatsby client loader to (re)load the page and navigate
    try{
      await page.evaluate(async () => {
        if (window.___loader && typeof window.___loader.loadPage === 'function') {
          await window.___loader.loadPage('/project/ebpc/')
        }
        if (typeof window.___push === 'function') {
          window.___push('/project/ebpc/')
        } else if (typeof window.___navigate === 'function') {
          window.___navigate('/project/ebpc/')
        }
      })
      // wait a bit for navigation/render
      await new Promise(res => setTimeout(res, 2000))
    }catch(e){ console.log('loader-nav-error', String(e)) }
    const hasSvg = await page.$eval('svg', () => true).catch(() => false)
    const desc = await page.$eval('svg desc', d => d.textContent).catch(() => null)
    const circleCount = await page.$$eval('svg circle', nodes => nodes.length).catch(()=>null)
    const inner = await page.$eval('svg', s=> s.innerHTML).catch(()=>null)
  const body = await page.$eval('body', b => b.innerHTML.slice(0,4000)).catch(()=>null)
    const totalNodes = await page.$$eval('*', nodes => nodes.length).catch(()=>null)
    // find heading with text 'Connectivity points (weighted)'
    const sectionHtml = await page.evaluate(()=>{
      const h4s = Array.from(document.querySelectorAll('h4'))
      const found = h4s.find(h=> h.textContent && h.textContent.includes('Connectivity points'))
      if (!found) return null
      return found.parentElement ? found.parentElement.innerHTML.slice(0,2000) : found.innerHTML
    }).catch(()=>null)
    const loadingOverlay = await page.$eval('.map-loading-overlay', el => ({ present: !!el, text: el.innerText.trim() })).catch(()=>({ present: false }))
  const readyState = await page.evaluate(()=>document.readyState).catch(()=>null)
    const scriptSrcs = await page.$$eval('script', s=> Array.from(s).map(x=> x.src || (x.innerText||'').slice(0,80))).catch(()=>null)
    const gatsbyKeys = await page.evaluate(()=> Object.keys(window).filter(k=>/gatsby/i.test(k) || /GATSBY/i.test(k) || /^__/.test(k)).slice(0,50)).catch(()=>null)
    const focusWrapperInner = await page.$eval('#gatsby-focus-wrapper', n=> n.innerHTML.slice(0,400)).catch(()=>null)
  console.log('bodySnippet:', body)
  console.log('document.readyState:', readyState)
  console.log('scriptSrcs:', scriptSrcs)
  console.log('gatsbyRelatedWindowKeys:', gatsbyKeys)
  console.log('#gatsby-focus-wrapper snippet:', focusWrapperInner)
  console.log('totalNodes:', totalNodes)
  console.log('sectionHtmlSnippet:', sectionHtml)
    console.log('desc:', desc)
    console.log('circleCount:', circleCount)
    console.log('hasSvg:', hasSvg)
    console.log('svgInnerSnippet:', inner ? inner.slice(0,200) : null)
    await b.close()
  }catch(e){
    console.error('ERROR:', e)
    process.exit(1)
  }
})()
