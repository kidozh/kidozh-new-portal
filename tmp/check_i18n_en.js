(async ()=>{
  try{
    const p = require('puppeteer')
    const b = await p.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await b.newPage()
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))

    const base = 'http://localhost:8000'
    const enPath = '/en/project/ebpc/'
    const defaultPath = '/project/ebpc/'

    const englishTargets = [
      'Producer / Consumer demo',
      'This demo simulates a producer adding messages to a queue',
      'Start', 'Stop', 'Mode:', 'Bounded (drops when full)', 'Hard buffer (never drops)', 'Blocking (producer waits)', 'Queue (size', 'Processed', 'Dropped', 'Workers', 'Avg latency'
    ]

    const check = async (url) => {
      console.log('Visiting', url)
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
      await new Promise(r=>setTimeout(r,1500))
      const body = await page.$eval('body', b => b.innerText).catch(()=>null)
      console.log('body length:', body && body.length)
      const results = {}
      for(const t of englishTargets){
        results[t] = Boolean(body && body.includes(t))
      }
      return results
    }

    // 1) try /en/... first
    let res = await check(base + enPath)
    console.log('Results for /en/ path:')
    console.log(JSON.stringify(res, null, 2))

    const anyTrue = Object.values(res).some(Boolean)
    if (!anyTrue) {
      // 2) try forcing language via navigator override + localStorage + cookie and visit default path
      console.log('No English matches on /en/ path; trying navigator/localStorage override on default path')
      await page.close()
      const page2 = await b.newPage()
      page2.on('console', msg => console.log('PAGE LOG:', msg.text()))
      // force navigator.language and localStorage before any script runs
      await page2.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'language', { get: () => 'en-US' })
        try { localStorage.setItem('i18nextLng', 'en') } catch(e) {}
        try { document.cookie = 'i18next=en; path=/' } catch(e) {}
      })
      const check2 = async (url) => {
        console.log('Visiting (forced) ', url)
        await page2.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
        await new Promise(r=>setTimeout(r,1500))
        const body = await page2.$eval('body', b => b.innerText).catch(()=>null)
        console.log('body length:', body && body.length)
        const results = {}
        for(const t of englishTargets){
          results[t] = Boolean(body && body.includes(t))
        }
        return results
      }
      res = await check2(base + defaultPath)
      console.log('Results for forced default path:')
      console.log(JSON.stringify(res, null, 2))
      await page2.close()
    }

    await b.close()
  }catch(e){
    console.error('ERROR:', e && (e.stack || e))
    process.exit(1)
  }
})()
