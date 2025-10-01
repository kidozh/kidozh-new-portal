(async ()=>{
  try{
    const p = require('puppeteer')
    const b = await p.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await b.newPage()
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))

    const url = 'http://localhost:8000/project/ebpc/'
    console.log('Visiting', url)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise(r=>setTimeout(r,1200))

    // Try click [data-lang="en"]
    let clicked = false
    try{
      await page.waitForSelector('[data-lang="en"]', { timeout: 3000 })
      await page.click('[data-lang="en"]')
      clicked = true
      console.log('Clicked [data-lang="en"]')
    }catch(e){
      // fallback: try button with text EN
      try{
        const btns = await page.$x("//button[normalize-space(.)='EN' or normalize-space(.)='en']")
        if (btns && btns[0]) {
          await btns[0].click()
          clicked = true
          console.log('Clicked button with text EN')
        }
      }catch(e2){}
    }

    // wait for UI update
    await new Promise(r=>setTimeout(r,2000))

    const body = await page.$eval('body', b => b.innerText).catch(()=>null)
    console.log('body length:', body && body.length)

    const englishTargets = [
      'Producer / Consumer demo',
      'This demo simulates a producer adding messages to a queue',
      'Start', 'Stop', 'Mode:', 'Bounded (drops when full)', 'Hard buffer (never drops)', 'Blocking (producer waits)', 'Queue (size', 'Processed', 'Dropped', 'Workers', 'Avg latency'
    ]

    const results = {}
    for(const t of englishTargets){ results[t] = Boolean(body && body.includes(t)) }

    console.log('clicked:', clicked)
    console.log('matchResults:', JSON.stringify(results, null, 2))

    await b.close()
  }catch(e){ console.error('ERROR:', e && (e.stack||e)); process.exit(1) }
})()
