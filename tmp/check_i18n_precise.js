(async ()=>{
  try{
    const p = require('puppeteer')
    const b = await p.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
    const page = await b.newPage()
    page.on('console', msg => console.log('PAGE LOG:', msg.text()))
    const url = 'http://localhost:8000/project/ebpc/'
    console.log('Visiting', url)
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
    // wait extra to let client-side hydration render demos
    await new Promise(r=>setTimeout(r,1500))
    const body = await page.$eval('body', b => b.innerText).catch(()=>null)
    console.log('body length:', body && body.length)

    const targets = [
      // English
      'Producer / Consumer demo',
      'This demo simulates a producer adding messages to a queue',
      'Start', 'Stop', 'Mode:', 'Bounded (drops when full)', 'Hard buffer (never drops)', 'Blocking (producer waits)', 'Queue (size', 'Processed', 'Dropped', 'Workers', 'Avg latency',
      // Chinese
      '生产者 / 消费者 演示',
      '该演示模拟生产者向队列中添加消息',
      '开始', '停止', '模式：', '有界（满时丢弃）', '硬缓冲（永不丢弃）', '阻塞（生产者等待）', '队列（大小', '已处理', '已丢弃', '工作者数', '平均延迟'
    ]

    const results = {}
    for(const t of targets){
      const found = body && body.includes(t)
      results[t] = Boolean(found)
    }

    console.log('matchResults:')
    for(const k of Object.keys(results)){
      console.log(JSON.stringify(k), '=>', results[k])
    }

    await b.close()
  }catch(e){
    console.error('ERROR:', e && (e.stack || e))
    process.exit(1)
  }
})()
