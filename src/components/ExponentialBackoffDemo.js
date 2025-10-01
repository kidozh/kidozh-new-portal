import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'

export default function ExponentialBackoffDemo() {
  const { t } = useTranslation()
  const [attempts, setAttempts] = React.useState([])
  const [running, setRunning] = React.useState(false)
  const [currentDelay, setCurrentDelay] = React.useState(null)
    const [successPct, setSuccessPct] = React.useState(90) // percent
  const [networkRTT, setNetworkRTT] = React.useState(200) // ms - simulated network round-trip time
  const timerRef = React.useRef(null)
  const baseDelay = 100 // ms
  const maxAttempts = 8

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // ensure indicator timer cleared on unmount
  React.useEffect(() => {
    return () => {
      if (indicatorTimerRef.current) clearTimeout(indicatorTimerRef.current)
    }
  }, [])

  const jitterFor = (raw) => Math.floor(Math.random() * Math.floor(raw * 0.1))
  // Continuous sending model
  const senderTimerRef = React.useRef(null)
  const seqRef = React.useRef(0)
  const responseTimersRef = React.useRef(new Map())
  const [nextSendRemaining, setNextSendRemaining] = React.useState(null)
  const countdownRef = React.useRef(null)
  const [changeIndicator, setChangeIndicator] = React.useState(null)
  const indicatorTimerRef = React.useRef(null)
  const [logs, setLogs] = React.useState([])
  const runningRef = React.useRef(false)

  const currentDelayRef = React.useRef(null)
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    // keep ref in sync with state
    currentDelayRef.current = currentDelay
  }, [currentDelay])

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const set = (v) => setIsDark(v.matches)
    set(m)
    if (m.addEventListener) m.addEventListener('change', set)
    else if (m.addListener) m.addListener(set)
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', set)
      else if (m.removeListener) m.removeListener(set)
    }
  }, [])

  const pushLog = (msg) => {
    const time = new Date().toLocaleTimeString()
    setLogs((prev) => {
      const next = [{ time, msg }, ...prev]
      return next.slice(0, 20)
    })
  }

  const sendOne = () => {
    const id = ++seqRef.current
    const sendTime = new Date().toLocaleTimeString()
    const delayAtSend = currentDelay === null ? baseDelay : currentDelay

    // mark as sent (cap history at 200 entries)
    setAttempts((prev) => {
      const next = [...prev, { id, attempt: id, delayAtSend, status: 'sent', time: sendTime }]
      return next.length > 200 ? next.slice(-200) : next
    })

    // simulate network RTT and response
    const observedRTT = Math.max(1, networkRTT + jitterFor(networkRTT))
    const timer = setTimeout(() => {
      const success = Math.random() < successPct / 100

      setAttempts((prev) =>
        prev.map((it) => (it.id === id ? { ...it, observedRTT, status: success ? 'succeeded' : 'failed' } : it))
      )

      // On failure: increase interval (double)
      if (!success) {
        setCurrentDelay((prevDelay) => {
          const prev = prevDelay == null ? baseDelay : prevDelay
          let next = Math.min(prev * 2, 20000)
          next = Math.min(next + jitterFor(next), 20000)
          if (next !== prev) {
            if (senderTimerRef.current) {
              clearTimeout(senderTimerRef.current)
              senderTimerRef.current = null
            }
            if (countdownRef.current) {
              clearInterval(countdownRef.current)
              countdownRef.current = null
            }
            scheduleNextSend(next)
            // show transient indicator
            const kind = 'increase'
            setChangeIndicator(kind)
            if (indicatorTimerRef.current) clearTimeout(indicatorTimerRef.current)
            indicatorTimerRef.current = setTimeout(() => setChangeIndicator(null), 1200)
            // log the decision
            try { pushLog(`failure → doubled ${prev}ms → ${next}ms`) } catch (e) {}
          }
          return next
        })
      } else {
        // On success: adapt based on observedRTT vs current delay
        setCurrentDelay((prevDelay) => {
          const prev = prevDelay == null ? baseDelay : prevDelay
          let next = prev
          if (observedRTT > prev * 2) {
            // RTT is more than twice the current interval -> double
            next = Math.min(prev * 2, 20000)
          } else if (observedRTT < prev / 2) {
            next = Math.max(baseDelay, Math.floor(prev / 2))
          } else {
            next = prev
          }
          next = Math.min(next + jitterFor(next), 20000)
          if (next !== prev) {
            if (senderTimerRef.current) {
              clearTimeout(senderTimerRef.current)
              senderTimerRef.current = null
            }
            if (countdownRef.current) {
              clearInterval(countdownRef.current)
              countdownRef.current = null
            }
            scheduleNextSend(next)
            const kind = next > prev ? 'increase' : 'decrease'
            setChangeIndicator(kind)
            if (indicatorTimerRef.current) clearTimeout(indicatorTimerRef.current)
            indicatorTimerRef.current = setTimeout(() => setChangeIndicator(null), 1200)
            // log the decision with reason
            try {
              const reason = observedRTT > prev * 2 ? `RTT ${observedRTT}ms > 2×${prev}ms` : `RTT ${observedRTT}ms < 1/2×${prev}ms`
              pushLog(`${reason} → ${next}ms`)
            } catch (e) {}
          }
          return next
        })
      }

      responseTimersRef.current.delete(id)
    }, observedRTT)

    responseTimersRef.current.set(id, timer)
  }

  const scheduleNextSend = (interval) => {
    // schedule next send after interval ms
    const start = Date.now()
    setNextSendRemaining(interval)
    senderTimerRef.current = setTimeout(() => {
      if (!runningRef.current) return
      sendOne()
      // schedule using the latest currentDelayRef value (fix stale closure)
      const nextInterval = currentDelayRef.current == null ? baseDelay : currentDelayRef.current
      scheduleNextSend(nextInterval)
    }, interval)

    // countdown updater
    if (countdownRef.current) clearInterval(countdownRef.current)
    countdownRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      const remaining = Math.max(0, interval - elapsed)
      setNextSendRemaining(remaining)
      if (remaining === 0 && countdownRef.current) {
        clearInterval(countdownRef.current)
        countdownRef.current = null
      }
    }, 100)
  }

  // Immediate adaptation when networkRTT changes while running:
  React.useEffect(() => {
    if (!running) return
    const cap = 20000
    const observed = Math.ceil(networkRTT)
    setCurrentDelay((prevDelay) => {
      const prev = prevDelay == null ? baseDelay : prevDelay
      let next = prev
      // apply single-step adaptation using the new thresholds:
      // if observed RTT is more than twice the current interval -> double
      if (observed > prev * 2) {
        next = Math.min(prev * 2, cap)
      } else if (observed < prev / 2) {
        // if observed RTT is less than half the current interval -> halve
        next = Math.max(baseDelay, Math.floor(prev / 2))
      }
      if (next !== prev) {
        // reschedule sender loop with next
        if (senderTimerRef.current) {
          clearTimeout(senderTimerRef.current)
          senderTimerRef.current = null
        }
        if (countdownRef.current) {
          clearInterval(countdownRef.current)
          countdownRef.current = null
        }
        scheduleNextSend(next)
      }
      return next
    })
  }, [networkRTT])

  const start = () => {
    if (running) return
    setAttempts([])
    setRunning(true)
    runningRef.current = true
    // start from a delay that is at least slightly larger than current RTT
    const initialDelay = Math.max(baseDelay, Math.ceil(networkRTT * 1.1))
    setCurrentDelay(initialDelay)
    currentDelayRef.current = initialDelay
    // send first immediately, then schedule loop
    sendOne()
    scheduleNextSend(initialDelay)
  }

  const cancel = () => {
    // stop sender timer
    if (senderTimerRef.current) {
      clearTimeout(senderTimerRef.current)
      senderTimerRef.current = null
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
      countdownRef.current = null
    }
    // clear pending response timers
    for (const t of responseTimersRef.current.values()) clearTimeout(t)
    responseTimersRef.current.clear()
    setRunning(false)
    runningRef.current = false
    setAttempts((prev) => [...prev, { attempt: 'cancelled', delay: 0, status: 'cancelled', time: new Date().toLocaleTimeString() }])
    setCurrentDelay(null)
    currentDelayRef.current = null
  }

  const reset = () => {
    cancel()
    setAttempts([])
    setCurrentDelay(null)
    runningRef.current = false
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">{t('project.ebpc.expDemoTitle')}</h2>
      <hr className="h-1 my-6 w-24 bg-orange-500 border-orange-500" />

      <p className="text-gray-700 dark:text-gray-200 font-light mb-4">
        {t('project.ebpc.expDemoDesc')}
      </p>

      <div className="flex gap-3 mb-4 items-center">
        <button
          onClick={start}
          disabled={running}
          className="text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 font-medium rounded-full px-4 py-2"
        >
          {t('project.ebpc.expDemoStart')}
        </button>
        <button
          onClick={cancel}
          disabled={!running}
          className="text-orange-700 bg-orange-100 hover:bg-orange-200 disabled:opacity-50 font-medium rounded-full px-4 py-2"
        >
          {t('project.ebpc.expDemoCancel')}
        </button>
        <button
          onClick={reset}
          className="text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-full px-3 py-2"
        >
          {t('project.ebpc.expDemoReset')}
        </button>
      </div>

      {/* Prominent current delay display */}
      <div className="mb-4">
        <div aria-live="polite" className="inline-flex items-baseline gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-300">{t('project.ebpc.expDemoCurrentInterval')}</span>
          <span className="text-xl font-mono font-semibold text-orange-600 dark:text-orange-400">{currentDelay === null ? '-' : `${currentDelay} ms`}</span>
          {changeIndicator === 'increase' && <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">↑</span>}
          {changeIndicator === 'decrease' && <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">↓</span>}
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.expDemoNetworkSuccess', { pct: successPct })}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={successPct}
            onChange={(e) => setSuccessPct(Number(e.target.value))}
            className="w-full mt-2"
            style={{ accentColor: isDark ? '#60a5fa' : '#fb923c' }}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.expDemoNetworkRtt', { ms: networkRTT })}</label>
          <input
            type="range"
            min="0"
            max="2000"
            value={networkRTT}
            onChange={(e) => setNetworkRTT(Number(e.target.value))}
            className="w-full mt-2"
            style={{ accentColor: isDark ? '#60a5fa' : '#fb923c' }}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.expDemoScheduledDelay')}</label>
          <input
            type="range"
            min="0"
            max="20000"
            value={currentDelay === null ? 0 : currentDelay}
            readOnly
            disabled
            className="w-full mt-2 opacity-90"
            style={{ accentColor: isDark ? '#60a5fa' : '#fb923c' }}
          />
        </div>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
  <div className="mb-1">{t('project.ebpc.expDemoRunning')}: <strong>{running ? t('project.ebpc.yes') : t('project.ebpc.no')}</strong></div>
  <div className="mb-1">{t('project.ebpc.expDemoAttempts')}: <strong>{attempts.length}</strong></div>
  <div className="mb-1">{t('project.ebpc.expDemoCurrentDelay')}: <strong>{currentDelay === null ? '-' : `${currentDelay} ms`}</strong>
          {changeIndicator === 'increase' && <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">↑</span>}
          {changeIndicator === 'decrease' && <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded">↓</span>}
        </div>
  <div className="mb-1">{t('project.ebpc.expDemoNextSendIn')}: <strong>{nextSendRemaining == null ? '-' : `${Math.ceil(nextSendRemaining)} ms`}</strong></div>
      </div>
      <div className="mb-4">
        {/* Sparkline */}
        {attempts.length > 0 && (
          <div className="w-full h-24 bg-white dark:bg-slate-800 p-2 rounded">
            <Sparkline attempts={attempts.slice(-60)} width={600} height={48} />
          </div>
        )}
      </div>

      {/* Decision log */}
      <div className="mb-4">
  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{t('project.ebpc.expDemoDecisionLogTitle')}</h4>
        <div className="overflow-auto max-h-40 border rounded p-2 bg-white dark:bg-slate-800 text-sm">
          {logs.length === 0 ? (
            <div className="text-gray-500">{t('project.ebpc.expDemoNoDecisions')}</div>
          ) : (
            <ul className="list-none space-y-1">
              {logs.map((l, i) => (
                <li key={i} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">{l.msg}</span>
                  <span className="text-xs text-gray-400 ml-2">{l.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="overflow-auto max-h-60 border rounded p-2 bg-gray-50 dark:bg-slate-700">
        {attempts.length === 0 ? (
          <div className="text-gray-500">{t('project.ebpc.expDemoNoAttempts')}</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-2 py-1">{t('project.ebpc.table.index')}</th>
                <th className="px-2 py-1">{t('project.ebpc.table.status')}</th>
                <th className="px-2 py-1">{t('project.ebpc.table.delayAtSend')}</th>
                <th className="px-2 py-1">{t('project.ebpc.table.observedRtt')}</th>
                <th className="px-2 py-1">{t('project.ebpc.table.time')}</th>
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => {
                const bad = typeof a.observedRTT === 'number' && a.observedRTT > (a.delayAtSend || 0)
                return (
                  <tr key={a.id} className={bad ? 'bg-red-50 dark:bg-red-900/30' : ''}>
                    <td className="px-2 py-1 align-top">{a.attempt}</td>
                    <td className="px-2 py-1 align-top">{a.status}</td>
                    <td className="px-2 py-1 align-top">{a.delayAtSend ?? '-'}</td>
                    <td className="px-2 py-1 align-top">{typeof a.observedRTT === 'number' ? a.observedRTT : '-'}</td>
                    <td className="px-2 py-1 align-top">{a.time}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function Sparkline({ attempts, width = 600, height = 48 }) {
  // build two series: delayAtSend and observedRTT
  const delays = attempts.map((a) => (typeof a.delayAtSend === 'number' ? a.delayAtSend : 0))
  const rtts = attempts.map((a) => (typeof a.observedRTT === 'number' ? a.observedRTT : 0))
  const maxVal = Math.max(...delays, ...rtts, 1)
  const w = Math.max(100, width)
  const h = Math.max(24, height)
  const step = w / Math.max(1, attempts.length - 1)

  const pointsFor = (arr) =>
    arr
      .map((v, i) => {
        const x = Math.round(i * step)
        const y = Math.round(h - (v / maxVal) * h)
        return `${x},${y}`
      })
      .join(' ')

  const delayPoints = pointsFor(delays)
  const rttPoints = pointsFor(rtts)

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block">
      <polyline fill="none" stroke="#93c5fd" strokeWidth="2" points={rttPoints} />
      <polyline fill="none" stroke="#fb923c" strokeWidth="2" points={delayPoints} />
    </svg>
  )
}
