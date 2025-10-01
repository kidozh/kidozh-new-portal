(async ()=>{
  try{
    const p = require('puppeteer')
    const b = await p.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await b.newPage()
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))

    const url = 'http://localhost:8000/project/ebpc/'
    console.log('Visiting', url)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    // allow hydration
    await new Promise(r=>setTimeout(r,1200))

    // helper to get body text
    const getBody = async () => await page.$eval('body', b => b.innerText).catch(()=>null)

    console.log('Initial body length:', (await getBody())?.length)

    // Try multiple strategies to force language to en
    const attempts = []

    // Attempt 1: use global ___gatsbyI18next
    const attempt1 = await page.evaluate(() => {
      try{
        if (typeof window.___gatsbyI18next !== 'undefined' && window.___gatsbyI18next.changeLanguage) {
          window.___gatsbyI18next.changeLanguage('en')
          return 'used ___gatsbyI18next.changeLanguage'
        }
        return 'no ___gatsbyI18next'
      }catch(e){ return 'err:'+ (e && e.message)}
    })
    console.log('Attempt1:', attempt1)
    attempts.push(attempt1)
    await new Promise(r=>setTimeout(r,800))

    // Attempt 2: use i18n instance on window
    const attempt2 = await page.evaluate(() => {
      try{
        if (window.i18n && window.i18n.changeLanguage) { window.i18n.changeLanguage('en'); return 'used window.i18n.changeLanguage' }
        if (window.i18next && window.i18next.changeLanguage) { window.i18next.changeLanguage('en'); return 'used window.i18next.changeLanguage' }
        return 'no window.i18n or i18next'
      }catch(e){ return 'err:'+ (e && e.message)}
    })
    console.log('Attempt2:', attempt2)
    attempts.push(attempt2)
    await new Promise(r=>setTimeout(r,800))

    // Attempt 3: set localStorage and cookie then trigger i18n change if available
    const attempt3 = await page.evaluate(() => {
      try{
        try { localStorage.setItem('i18nextLng', 'en') } catch(e) {}
        try { document.cookie = 'i18next=en; path=/' } catch(e) {}
        if (window.i18n && window.i18n.changeLanguage) { window.i18n.changeLanguage('en'); return 'set storage+cookie and called window.i18n' }
        if (window.___gatsbyI18next && window.___gatsbyI18next.changeLanguage) { window.___gatsbyI18next.changeLanguage('en'); return 'set storage+cookie and called ___gatsbyI18next' }
        return 'set storage+cookie only'
      }catch(e){ return 'err:'+ (e && e.message)}
    })
    console.log('Attempt3:', attempt3)
    attempts.push(attempt3)
    await new Promise(r=>setTimeout(r,1200))

    const bodyAfter = await getBody()
    console.log('After attempts body length:', bodyAfter && bodyAfter.length)

    const englishTargets = [
      'Producer / Consumer demo',
      'This demo simulates a producer adding messages to a queue',
      'Start', 'Stop', 'Mode:', 'Bounded (drops when full)', 'Hard buffer (never drops)', 'Blocking (producer waits)', 'Queue (size', 'Processed', 'Dropped', 'Workers', 'Avg latency'
    ]

    const results = {}
    for(const t of englishTargets){ results[t] = Boolean(bodyAfter && bodyAfter.includes(t)) }

    console.log('attempts:', attempts)
    console.log('matchResults:', JSON.stringify(results, null, 2))

    await b.close()
  }catch(e){ console.error('ERROR:', e && (e.stack||e)); process.exit(1) }
})()
