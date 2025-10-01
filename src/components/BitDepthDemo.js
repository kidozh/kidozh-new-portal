import * as React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

export default function BitDepthDemo() {
  const { t } = useTranslation()
  const [bitDepth, setBitDepth] = React.useState(8)
  const [noiseLevel, setNoiseLevel] = React.useState(0.05)
  const [isDark, setIsDark] = React.useState(false)
  const width = 600
  const height = 80

  const phaseRef = React.useRef(0)
  const rafRef = React.useRef(null)
  const N = 256
  const baseFreq = 4 // cycles over buffer

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

  const makeSignals = (phase, noise) => {
    const clean = new Array(N)
    const observed = new Array(N)
    for (let i = 0; i < N; i++) {
      const t = ((i / N) * Math.PI * 2 * baseFreq) + phase
      const s = Math.sin(t) * 0.9
      const n = (Math.random() - 0.5) * noise
      clean[i] = Math.max(-1, Math.min(1, s))
      observed[i] = Math.max(-1, Math.min(1, s + n))
    }
    return { clean, observed }
  }

  const quantize = (arr, bits) => {
    if (!arr || arr.length === 0) return []
    const levels = Math.max(2, Math.pow(2, bits))
    return arr.map((v) => {
      const scaled = (v + 1) / 2 // 0..1
      const q = Math.round(scaled * (levels - 1))
      const deq = (q / (levels - 1)) * 2 - 1
      return deq
    })
  }

  const toPoints = (arr) => {
    if (!arr || arr.length === 0) return ''
    const step = width / (arr.length - 1)
    return arr
      .map((v, i) => {
        const x = Math.round(i * step)
        const y = Math.round((1 - (v + 1) / 2) * height)
        return `${x},${y}`
      })
      .join(' ')
  }

  const [clean, setClean] = React.useState(new Array(N).fill(0))
  const [observed, setObserved] = React.useState(new Array(N).fill(0))
  const [quantized, setQuantized] = React.useState(new Array(N).fill(0))
  const [snr, setSnr] = React.useState(null)
  const [sqnr, setSqnr] = React.useState(null)
  const [snrHistory, setSnrHistory] = React.useState([])
  const [sqnrHistory, setSqnrHistory] = React.useState([])

  // animation loop
  React.useEffect(() => {
    let last = performance.now()
    const loop = (now) => {
      const dt = now - last
      last = now
      phaseRef.current += dt * 0.002 // phase speed
      const { clean: c, observed: o } = makeSignals(phaseRef.current, noiseLevel)
  const q = quantize(o, bitDepth)
  const qClean = quantize(c, bitDepth)
      setClean(c)
      setObserved(o)
      setQuantized(q)

      // compute SNR: signal = clean, noise = clean - quantized
      let sp = 0
      let np = 0
      let qnp = 0
      for (let i = 0; i < N; i++) {
        sp += c[i] * c[i]
        const e = c[i] - q[i]
        np += e * e
        const qe = c[i] - qClean[i]
        qnp += qe * qe
      }
      sp = sp / N
      np = np / N
      qnp = qnp / N
  const val = np === 0 ? Infinity : 10 * Math.log10(sp / np)
  const valq = qnp === 0 ? Infinity : 10 * Math.log10(sp / qnp)
  const snrVal = Number.isFinite(val) ? val : null
  const sqnrVal = Number.isFinite(valq) ? valq : null
  setSnr(snrVal)
  setSqnr(sqnrVal)
  setSnrHistory((prev) => [snrVal, ...prev].slice(0, 100))
  setSqnrHistory((prev) => [sqnrVal, ...prev].slice(0, 100))

      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [bitDepth, noiseLevel])

  const origPoints = toPoints(clean)
  const qPoints = toPoints(quantized)

  const originalBits = 16
  const estimatedBits = bitDepth
  const reduction = ((1 - estimatedBits / originalBits) * 100).toFixed(0)

  const strokeOrig = isDark ? '#60a5fa' : '#fb923c'
  const strokeQuant = isDark ? '#fb923c' : '#60a5fa'

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .bitdemo-fade { animation: fadein 400ms ease-out; }
        .bitdemo-pulse { animation: pulse 1400ms ease-in-out infinite; }
      `}</style>
  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('project.ebpc.bitDepthTitle')}</h3>
  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{t('project.ebpc.bitDepthDesc')}</p>

      <div className="mb-3">
  <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.bitDepthLabel')}: <strong>{bitDepth}</strong></label>
        <input
          type="range"
          min="1"
          max="16"
          value={bitDepth}
          onChange={(e) => setBitDepth(Number(e.target.value))}
          className="w-full mt-2"
          style={{ accentColor: strokeQuant }}
        />
      </div>

      <div className="mb-3">
  <label className="text-sm text-gray-600 dark:text-gray-300">{t('project.ebpc.noiseLevelLabel')}: <strong>{(noiseLevel * 100).toFixed(0)}%</strong></label>
        <input
          type="range"
          min="0"
          max="0.2"
          step="0.005"
          value={noiseLevel}
          onChange={(e) => setNoiseLevel(Number(e.target.value))}
          className="w-full mt-2"
          style={{ accentColor: strokeOrig }}
        />
      </div>

      <div className="mb-3 bitdemo-fade">
        <div className="w-full overflow-hidden rounded bg-gray-50 dark:bg-slate-700 p-2">
          <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="block mb-1">
            <polyline fill="none" stroke={strokeOrig} strokeWidth="1.5" points={origPoints} />
            <polyline className="bitdemo-pulse" fill="none" stroke={strokeQuant} strokeWidth="1.5" points={qPoints} />
          </svg>
          <div className="text-xs text-gray-500 dark:text-gray-400">{isDark ? t('project.ebpc.legendDark') : t('project.ebpc.legendLight')}</div>
        </div>
      </div>

      <div className="flex gap-6 items-center">
  <div className="text-sm text-gray-700 dark:text-gray-200">{t('project.ebpc.estimatedBits')}: <strong>{estimatedBits} bits</strong></div>
  <div className="text-sm text-gray-700 dark:text-gray-200">{t('project.ebpc.estimatedReduction')}: <strong>{reduction}%</strong></div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700 dark:text-gray-200">{t('project.ebpc.snrLabel')}:</div>
          <div className="flex items-center gap-2">
            <SparklineMini values={snrHistory} color={snr >= 30 ? '#16a34a' : snr >= 20 ? '#f59e0b' : '#ef4444'} />
            <div className="text-sm text-gray-700 dark:text-gray-200">{snr == null ? '—' : `${snr.toFixed(1)} dB`}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-700 dark:text-gray-200">{t('project.ebpc.sqnrLabel')}:</div>
          <div className="flex items-center gap-2">
            <SparklineMini values={sqnrHistory} color={sqnr >= 40 ? '#16a34a' : sqnr >= 25 ? '#f59e0b' : '#ef4444'} />
            <div className="text-sm text-gray-700 dark:text-gray-200">{sqnr == null ? '—' : `${sqnr.toFixed(1)} dB`}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SparklineMini({ values = [], color = '#60a5fa', width = 80, height = 24 }) {
  if (!values || values.length === 0) return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <rect width={width} height={height} fill="transparent" />
    </svg>
  )
  const pts = values.slice(0, 40).reverse()
  const max = Math.max(...pts.filter(Boolean), 1)
  const min = Math.min(...pts.filter(Boolean), -1)
  const range = Math.max(1e-6, max - min)
  const step = width / Math.max(1, pts.length - 1)
  const points = pts.map((v, i) => {
    const x = Math.round(i * step)
    const y = Math.round(height - ((v - min) / range) * height)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block">
      <polyline fill="none" stroke={color} strokeWidth="1.6" points={points} />
    </svg>
  )
}
