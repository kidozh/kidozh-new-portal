(async ()=>{
  try{
    const p = require('puppeteer')
    const b = await p.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await b.newPage()
    // set Accept-Language header to prefer English
    await page.setExtraHTTPHeaders({'Accept-Language': 'en-US,en;q=0.9'})
    // ensure navigator.language is en-US before any script executes
    await page.evaluateOnNewDocument(() => {
      try{ Object.defineProperty(navigator, 'language', { get: () => 'en-US' }) }catch(e){}
      try{ Object.defineProperty(navigator, 'languages', { get: () => ['en-US','en'] }) }catch(e){}
      try{ localStorage.setItem('i18nextLng','en') }catch(e){}
      try{ document.cookie = 'i18next=en; path=/' }catch(e){}
    })
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))

    const url = 'http://localhost:8000/project/ebpc/'
    console.log('Visiting', url)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

    // wait longer to allow client-side language detection & hydration
    await new Promise(r=>setTimeout(r,3000))

    const body = await page.$eval('body', b => b.innerText).catch(()=>null)
    console.log('body length:', body && body.length)

    const englishTargets = [
      'Producer / Consumer demo',
      'This demo simulates a producer adding messages to a queue',
      'Start', 'Stop', 'Mode:', 'Bounded (drops when full)', 'Hard buffer (never drops)', 'Blocking (producer waits)', 'Queue (size', 'Processed', 'Dropped', 'Workers', 'Avg latency'
    ]

    const results = {}
    for(const t of englishTargets){ results[t] = Boolean(body && body.includes(t)) }

    console.log('matchResults:', JSON.stringify(results, null, 2))

    await b.close()
  }catch(e){ console.error('ERROR:', e && (e.stack||e)); process.exit(1) }
})()
