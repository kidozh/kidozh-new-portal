import * as React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

function Sparkline({ values = [], width = 200, height = 40, color = '#F97316' }) {
  if (!values || values.length === 0) return null
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const len = values.length
  const step = width / Math.max(1, len - 1)
  const points = values.map((v, i) => {
    const x = i * step
    // invert y so larger values are higher on the chart
    const y = height - ((v - min) / (max - min || 1)) * height
    return `${x},${y}`
  })
  const d = `M ${points.join(' L ')}`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ProducerConsumerDemo({
  initialConcurrency = 4,
  initialProduceInterval = 500,
  initialProcessTime = 800,
  initialBufferSize = 10,
  initialMode = 'bounded',
  title = '',
  __exposeHandlersRef = null,
  globalStartId = 0,
  globalStopId = 0,
  externalProduceController = null,
}) {
  const { t } = useTranslation()
  const [running, setRunning] = React.useState(false)
  const [produceInterval, setProduceInterval] = React.useState(initialProduceInterval) // ms
  const [processTime, setProcessTime] = React.useState(initialProcessTime) // ms per item
  const [concurrency, setConcurrency] = React.useState(initialConcurrency)
  const [bufferSize, setBufferSize] = React.useState(initialBufferSize)
  const [mode, setMode] = React.useState(initialMode) // 'bounded' | 'hard-buffer' | 'blocking'

  
  const workersRef = React.useRef(0)
  const producersRef = React.useRef(null)
  const queueRef = React.useRef([])
  const seqRef = React.useRef(0)
  const runningRef = React.useRef(false)
  const blockingRef = React.useRef({ cancel: false })
  const produceIntervalRef = React.useRef(produceInterval)
  const processTimeRef = React.useRef(processTime)

  const [queue, setQueue] = React.useState([])
  const [processed, setProcessed] = React.useState(0)
  const [dropped, setDropped] = React.useState(0)
  const [avgLatency, setAvgLatency] = React.useState(0)
  const latenciesRef = React.useRef([])

  // history for sparkline (queue lengths over time)
  const queueHistoryRef = React.useRef([])
  const [queueHistory, setQueueHistory] = React.useState([])

  // for simple processed-item animation
  const [recentProcessed, setRecentProcessed] = React.useState([])

  React.useEffect(() => {
    return () => {
      if (producersRef.current) clearInterval(producersRef.current)
      blockingRef.current.cancel = true
    }
  }, [])

  const pushQueueHistory = (len) => {
    queueHistoryRef.current.push(len)
    if (queueHistoryRef.current.length > 60) queueHistoryRef.current.shift()
    setQueueHistory([...queueHistoryRef.current])
  }

  const start = () => {
    if (running) return
    setRunning(true)
    runningRef.current = true
    seqRef.current = 0
    queueRef.current = []
    setQueue([])
    setProcessed(0)
    setDropped(0)
    latenciesRef.current = []
    queueHistoryRef.current = []
    setQueueHistory([])

    // start either a blocking producer loop or a regular interval producer
    if (mode === 'blocking') {
      blockingRef.current.cancel = false
      produceBlockingLoop()
    } else {
      // if an external produce controller is provided, rely on it to trigger produceOne()
      if (externalProduceController) {
        // ensure consumers start checking
        scheduleConsumers()
      } else {
        producersRef.current = setInterval(() => {
          produceOne()
        }, produceInterval)
        // ensure consumers start checking
        scheduleConsumers()
      }
    }
  }

  const stop = () => {
    setRunning(false)
    runningRef.current = false
    if (producersRef.current) {
      clearInterval(producersRef.current)
      producersRef.current = null
    }
    // stop blocking loop if running
    blockingRef.current.cancel = true
  }

  const produceOne = () => {
    const id = ++seqRef.current
    const now = Date.now()

    // hard-buffer mode: never drop, always enqueue
    if (mode === 'bounded' && queueRef.current.length >= bufferSize) {
      setDropped((d) => d + 1)
      pushQueueHistory(queueRef.current.length)
      return
    }

    const item = { id, producedAt: now }
    queueRef.current = [...queueRef.current, item]
    setQueue([...queueRef.current])
    pushQueueHistory(queueRef.current.length)
    // try to kick consumers
    scheduleConsumers()
  }

  // when an external controller ticks, enqueue one item (only when running)
  const handleExternalTick = React.useCallback(() => {
    if (!runningRef.current) return
    // use same produce semantics
    produceOne()
  }, [])

  // blocking producer: produce and wait until the produced item is processed
  const produceBlockingLoop = async () => {
    while (runningRef.current && !blockingRef.current.cancel && mode === 'blocking') {
      const id = ++seqRef.current
      const now = Date.now()
      const item = { id, producedAt: now }
      // enqueue for visibility
      queueRef.current = [...queueRef.current, item]
      setQueue([...queueRef.current])
      pushQueueHistory(queueRef.current.length)

      // wait for processing to finish (simulate synchronous producer)
      await new Promise((resolve) => {
        // directly simulate processing here so producer truly waits
        setTimeout(() => {
          const end = Date.now()
          const latency = end - item.producedAt
          latenciesRef.current.push(latency)
          if (latenciesRef.current.length > 100) latenciesRef.current.shift()
          const avg = latenciesRef.current.reduce((a, b) => a + b, 0) / latenciesRef.current.length
          setAvgLatency(Math.round(avg))
          setProcessed((p) => p + 1)

          // animate processed item
          setRecentProcessed((r) => {
            const next = [...r, item.id]
            if (next.length > 8) next.shift()
            return next
          })
          setTimeout(() => {
            setRecentProcessed((r) => r.filter((x) => x !== item.id))
          }, 800)

          // remove from visible queue
          queueRef.current = queueRef.current.filter((i) => i.id !== id)
          setQueue([...queueRef.current])
          pushQueueHistory(queueRef.current.length)

          resolve()
        }, processTimeRef.current)
      })

      // optional inter-production delay
      await new Promise((r) => setTimeout(r, produceIntervalRef.current))
    }
  }

  const scheduleConsumers = () => {
    // try to start workers up to concurrency
    while (workersRef.current < concurrency && queueRef.current.length > 0) {
      const item = queueRef.current.shift()
      setQueue([...queueRef.current])
      pushQueueHistory(queueRef.current.length)
      workersRef.current += 1
      processItem(item)
    }
  }

  const processItem = (item) => {
    setTimeout(() => {
      const end = Date.now()
      const latency = end - item.producedAt
      latenciesRef.current.push(latency)
      if (latenciesRef.current.length > 100) latenciesRef.current.shift()
      const avg = latenciesRef.current.reduce((a, b) => a + b, 0) / latenciesRef.current.length
      setAvgLatency(Math.round(avg))
      setProcessed((p) => p + 1)

      // animate processed item
      setRecentProcessed((r) => {
        const next = [...r, item.id]
        // keep small history for animation
        if (next.length > 8) next.shift()
        return next
      })
      setTimeout(() => {
        setRecentProcessed((r) => r.filter((x) => x !== item.id))
      }, 800)

      workersRef.current -= 1
      // if still running, continue consuming
      if (running) scheduleConsumers()
    }, processTime)
  }

  // update producer interval when slider changes
  React.useEffect(() => {
    if (!running) return
    if (producersRef.current) {
      clearInterval(producersRef.current)
      producersRef.current = setInterval(() => produceOne(), produceInterval)
    }
    produceIntervalRef.current = produceInterval
  }, [produceInterval])

  // subscribe to external produce controller if provided
  React.useEffect(() => {
    if (!externalProduceController) return
    externalProduceController.subscribe && externalProduceController.subscribe(handleExternalTick)
    return () => {
      externalProduceController.unsubscribe && externalProduceController.unsubscribe(handleExternalTick)
    }
  }, [externalProduceController, handleExternalTick])

  // update concurrency change: try to schedule
  React.useEffect(() => {
    scheduleConsumers()
  }, [concurrency])

  // keep processTime ref up to date for blocking loop
  React.useEffect(() => {
    processTimeRef.current = processTime
  }, [processTime])

  // if mode changes while running, switch producer strategy
  React.useEffect(() => {
    if (!runningRef.current) return
    if (mode === 'blocking') {
      // stop interval producer if present
      if (producersRef.current) {
        clearInterval(producersRef.current)
        producersRef.current = null
      }
      blockingRef.current.cancel = false
      produceBlockingLoop()
    } else {
      // switch to interval producer
      blockingRef.current.cancel = true
      if (!producersRef.current) producersRef.current = setInterval(() => produceOne(), produceIntervalRef.current)
      scheduleConsumers()
    }
  }, [mode])

  // expose start/stop to parent via __exposeHandlersRef
  React.useEffect(() => {
    if (__exposeHandlersRef && typeof __exposeHandlersRef === 'object') {
      __exposeHandlersRef.current = { start, stop }
    }
    return () => {
      if (__exposeHandlersRef && __exposeHandlersRef.current) __exposeHandlersRef.current = null
    }
  }, [__exposeHandlersRef])

  // react to global start/stop commands
  React.useEffect(() => {
    if (globalStartId && running === false) {
      start()
    }
  }, [globalStartId])

  React.useEffect(() => {
    if (globalStopId && running === true) {
      stop()
    }
  }, [globalStopId])

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
      <style>{`
        @keyframes slideUpFade {
          from { transform: translateY(8px); opacity: 1 }
          to { transform: translateY(-8px); opacity: 0 }
        }
      `}</style>
  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{title || t('project.ebpc.producerDemoTitle')}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t('project.ebpc.producerDemoDesc')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.produceInterval', { ms: produceInterval })}</label>
          <input type="range" min="50" max="2000" value={produceInterval} onChange={(e) => setProduceInterval(Number(e.target.value))} className="w-full mt-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.processingTime', { ms: processTime })}</label>
          <input type="range" min="50" max="3000" value={processTime} onChange={(e) => setProcessTime(Number(e.target.value))} className="w-full mt-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.concurrencyLabel', { n: concurrency })}</label>
          <input type="range" min="1" max="8" value={concurrency} onChange={(e) => setConcurrency(Number(e.target.value))} className="w-full mt-2" />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.bufferSize', { n: bufferSize })}</label>
          <input type="range" min="1" max="200" value={bufferSize} onChange={(e) => setBufferSize(Number(e.target.value))} className="w-full mt-2" />
        </div>
      </div>

      <div className="flex gap-3 items-center mb-4">
        <div className="flex gap-2">
          <button onClick={start} disabled={running} className="text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 font-medium rounded-full px-4 py-2">{t('project.ebpc.start')}</button>
          <button onClick={stop} disabled={!running} className="text-orange-700 bg-orange-100 hover:bg-orange-200 disabled:opacity-50 font-medium rounded-full px-4 py-2">{t('project.ebpc.stop')}</button>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.modeLabel')}</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="text-sm p-1 rounded">
            <option value="bounded">{t('project.ebpc.modeBounded')}</option>
            <option value="hard-buffer">{t('project.ebpc.modeHardBuffer')}</option>
            <option value="blocking">{t('project.ebpc.modeBlocking')}</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-700 dark:text-gray-200">{t('project.ebpc.queueHeading', { size: queue.length })}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{t('project.ebpc.recentQueueLength')}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-1 min-h-10 transition-all" style={{ position: 'relative' }}>
              {queue.map((it, idx) => {
                // horizontal offset so items slide smoothly as earlier items removed
                const offset = idx * 18
                const isLast = idx === queue.length - 1
                const transform = `translateX(${offset}px) scale(${isLast ? 1.03 : 1})`
                const style = {
                  transform,
                  transition: 'transform 380ms cubic-bezier(.22,.9,.27,1), opacity 300ms ease',
                  display: 'inline-block',
                  opacity: 1,
                }
                return (
                  <div key={it.id} style={style} className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 rounded">
                    #{it.id}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="w-40 h-10">
            <Sparkline values={queueHistory} width={160} height={40} color="#f59e0b" />
          </div>
        </div>
      </div>

      <div className="mb-4">
  <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">{t('project.ebpc.recentlyProcessed')}</div>
        <div className="flex gap-2 flex-wrap">
          {recentProcessed.map((id) => (
            <div key={id} aria-hidden style={{ animation: 'slideUpFade 0.8s ease forwards' }} className="px-2 py-1 text-xs bg-green-100 dark:bg-green-800 rounded">
              ✓ #{id}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-200">
  <div>{t('project.ebpc.processed')}: <strong>{processed}</strong></div>
  <div>{t('project.ebpc.dropped')}: <strong>{dropped}</strong></div>
  <div>{t('project.ebpc.workers')}: <strong>{workersRef.current}</strong></div>
  <div>{t('project.ebpc.avgLatency')}: <strong>{avgLatency} ms</strong></div>
      </div>
    </div>
  )
}

const ProducerConsumerDemoForward = React.forwardRef((props, ref) => {
  const handlersRef = React.useRef(null)
  React.useImperativeHandle(ref, () => ({
    start: () => handlersRef.current && handlersRef.current.start && handlersRef.current.start(),
    stop: () => handlersRef.current && handlersRef.current.stop && handlersRef.current.stop(),
  }))
  return <ProducerConsumerDemo {...props} __exposeHandlersRef={handlersRef} />
})

export default ProducerConsumerDemoForward
