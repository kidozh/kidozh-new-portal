(async()=>{
  try{
    const p = require('puppeteer')
    const b = await p.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await b.newPage()
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))
    await page.goto('http://localhost:8000/project/', { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise(r=>setTimeout(r,1500))
    const body = await page.$eval('body', b => b.innerText.slice(0,4000)).catch(()=>null)
    console.log('bodySnippet:', body && body.slice(0,1000))
    // find any element that contains 'PREVIEW'
    const foundPreview = await page.evaluate(()=>{
      const nodes = Array.from(document.querySelectorAll('a,button,h1,h2,h3,h4,p,span'))
      return nodes.some(n => n.textContent && n.textContent.trim().includes('PREVIEW'))
    }).catch(()=>false)
    console.log('foundPreview:', foundPreview)

    const foundProjectPreviewKey = await page.evaluate(()=>{
      const nodes = Array.from(document.querySelectorAll('*'))
      return nodes.some(n => n.textContent && n.textContent.includes('project.preview'))
    }).catch(()=>false)
    console.log('foundLiteralKey project.preview:', foundProjectPreviewKey)

    await b.close()
  }catch(e){
    console.error('ERROR:', e)
    process.exit(1)
  }
})()
