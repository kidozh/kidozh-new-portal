import * as React from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

export default function ConnectivityMap({ data = [], width = 800, height = 320, pointScale = 12 }) {
  const [landGeo, setLandGeo] = React.useState(null)
  const [topoKey, setTopoKey] = React.useState(null)
  const [loadError, setLoadError] = React.useState(null)
  const canvasRef = React.useRef(null)
  const [imageHref, setImageHref] = React.useState(null)
  const clipIdRef = React.useRef(`land-clip-${Math.random().toString(36).slice(2,9)}`)
  const maxTotal = Math.max(0.00001, ...data.map((d) => d.total || 0))

  React.useEffect(() => {
    let cancelled = false
    // try to fetch a topojson file at runtime from /data/world-110m.json
    fetch('/data/world-110m.json')
      .then((r) => {
        if (!r.ok) throw new Error('TopoJSON fetch failed')
        return r.json()
      })
      .then((topo) => {
        try { console.log('ConnectivityMap: topojson fetched, objects=', Object.keys(topo.objects || {})) } catch(e) {}
        if (cancelled) return
        // topo.objects.land or topo.objects['countries'] may exist depending on file
        if (!topo.objects) throw new Error('TopoJSON has no objects')
        const keys = Object.keys(topo.objects)
        // prefer common names but fall back to first object
        const preferred = ['land', 'ne_110m_land', 'coastline', 'countries', 'world']
        let chosenKey = keys.find((k) => preferred.includes(k)) || keys[0]
        const landObj = topo.objects[chosenKey]
        if (landObj) {
          const geo = feature(topo, landObj)
          try { console.log('ConnectivityMap: chosen topo key=', chosenKey) } catch (e) {}
          setTopoKey(chosenKey)
          setLandGeo(geo)
        } else {
          // fallback: try to convert entire topo to geo
          try {
            const k2 = Object.keys(topo.objects || {})[0]
            if (k2) {
              const geo = feature(topo, topo.objects[k2])
              setTopoKey(k2)
              setLandGeo(geo)
            } else {
              setLandGeo(null)
            }
          } catch (e) {
            setLandGeo(null)
            setLoadError(e.message || String(e))
          }
        }
      })
      .catch(() => {
        // on any failure, leave landGeo null (component will render graticule fallback)
        setLandGeo(null)
        setLoadError('fetch_failed')
      })
    return () => {
      cancelled = true
    }
  }, [])

  // prepare projection and path generator
  const projection = React.useMemo(() => {
    const p = geoMercator().scale(1).translate([0, 0])
    return p
  }, [])

  // compute path generator bound and auto-fit projection when landGeo available
  const pathGenerator = React.useMemo(() => geoPath().projection(projection), [projection])

  React.useEffect(() => {
    if (!landGeo) return
    try {
      // let d3 compute appropriate scale and translate for us
      if (typeof projection.fitSize === 'function') {
        // small padding
        projection.fitSize([Math.max(20, width - 20), Math.max(20, height - 20)], landGeo)
      } else {
        // fallback to manual bounds-based fit
        const bounds = pathGenerator.bounds(landGeo)
        const dx = bounds[1][0] - bounds[0][0]
        const dy = bounds[1][1] - bounds[0][1]
        if (dx > 0 && dy > 0) {
          const scale = Math.min((width - 20) / dx, (height - 20) / dy)
          const translate = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2]
          projection.scale(scale).translate(translate)
        }
      }
    } catch (e) {
      // ignore fit errors and leave projection as-is
    }
  }, [landGeo, width, height, pathGenerator, projection])

  // create a simple IDW-based heatmap on a canvas and export to data URL, clipped to land later
  React.useEffect(() => {
    if (!landGeo) return
    if (typeof window === 'undefined') return
    if (!projection || typeof projection.invert !== 'function') return

    // create a temporary canvas
    const cvs = document.createElement('canvas')
    cvs.width = Math.max(1, Math.round(width))
    cvs.height = Math.max(1, Math.round(height))
    const ctx = cvs.getContext('2d')

    // parameters
    const step = 3 // pixel sampling step
    const power = 2
    const eps = 1e-8

    const pts = data.map(d => ({ lon: d.lon, lat: d.lat, v: d.total || 0 }))
    if (!pts.length) { 
      setImageHref(null); 
      try { window.__connectivity_heatmap_ready = false } catch (e) {}
      try { window.__connectivity_heatmap_href = null } catch (e) {}
      try { window.__connectivity_heatmap_length = null } catch (e) {}
      return 
    }

    // simple color ramp: blue -> yellow -> red
    const lerp = (a,b,t) => a + (b-a)*t
    const lerpColor = (c1,c2,t) => [
      Math.round(lerp(c1[0], c2[0], t)),
      Math.round(lerp(c1[1], c2[1], t)),
      Math.round(lerp(c1[2], c2[2], t))
    ]
    const blue=[59,130,246], yellow=[250,204,21], red=[239,68,68]
    const colorFor = (t) => {
      const v = Math.max(0, Math.min(1, t))
      if (v <= 0.5) return lerpColor(blue, yellow, v/0.5)
      return lerpColor(yellow, red, (v-0.5)/0.5)
    }

    for (let py = 0; py < cvs.height; py += step) {
      for (let px = 0; px < cvs.width; px += step) {
        let lonlat = null
        try { lonlat = projection.invert([px, py]) } catch (e) { lonlat = null }
        if (!lonlat) { ctx.clearRect(px, py, step, step); continue }
        const [lon, lat] = lonlat
        let num = 0, den = 0
        for (let i=0;i<pts.length;i++){
          const dx = lon - pts[i].lon
          const dy = lat - pts[i].lat
          const dist2 = dx*dx + dy*dy
          if (dist2 < eps) { num = pts[i].v; den = 1; break }
          const w = 1 / Math.pow(dist2, power/2)
          num += pts[i].v * w
          den += w
        }
        const val = den === 0 ? 0 : num/den
        const t = Math.max(0, Math.min(1, val / maxTotal))
        const rgb = colorFor(t)
        ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        ctx.fillRect(px, py, step, step)
      }
    }

    try {
      const url = cvs.toDataURL('image/png')
      try {
        console.log('ConnectivityMap: generated heatmap data URL length=', url.length)
        try { window.__connectivity_heatmap_length = url.length } catch (e) {}
        try { window.__connectivity_heatmap_href = url } catch (e) {}
        try { window.__connectivity_heatmap_ready = true } catch (e) {}
      } catch (e) {}
      setImageHref(url)
    } catch (e) {
      setImageHref(null)
      try { window.__connectivity_heatmap_ready = false } catch (e) {}
      try { window.__connectivity_heatmap_href = null } catch (e) {}
      try { window.__connectivity_heatmap_length = null } catch (e) {}
    }

    // no cleanup needed
  }, [landGeo, data, projection, width, height, maxTotal])

  return (
    <div className="w-full overflow-hidden rounded relative">
      {/* Visible loading/error overlay */}
      {(!landGeo && !loadError) && (
        <div className="map-loading-overlay absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-black/40 z-10" aria-live="polite">
          <div className="text-sm text-gray-700 dark:text-gray-200 font-medium">Loading basemap…</div>
        </div>
      )}
      {loadError && (
        <div className="map-loading-overlay absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/60 z-10" role="alert">
          <div className="text-sm text-red-600 dark:text-red-400 font-medium">Basemap failed to load</div>
        </div>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} xmlns="http://www.w3.org/2000/svg" className="relative z-20">
        <defs>
          {landGeo && <clipPath id={clipIdRef.current}><path d={pathGenerator(landGeo)} /></clipPath>}
        </defs>
        <rect x={0} y={0} width={width} height={height} fill="transparent" />

        {imageHref && landGeo && (
            <image href={imageHref} xlinkHref={imageHref} x={0} y={0} width={width} height={height} preserveAspectRatio="none" clipPath={`url(#${clipIdRef.current})`} style={{ pointerEvents: 'none' }} />
        )}

        {/* land basemap: only draw land polygons (no country borders) */}
        {landGeo ? (
          <g>
            <path d={pathGenerator(landGeo)} fill="#cbd5e1" stroke="none" />
          </g>
        ) : (
          // fallback: simple graticule if topojson not available
          <g stroke="#94a3b8" strokeOpacity={0.2} strokeWidth={0.5} fill="none">
            {Array.from({ length: 13 }, (_, i) => -180 + i * 30).map((lon) => {
              const points = []
              for (let lat = -85; lat <= 85; lat += 2) {
                let coords = null
                try {
                  coords = projection([lon, lat])
                } catch (e) {
                  coords = null
                }
                if (!coords) continue
                const [x, y] = coords
                if (!isFinite(x) || !isFinite(y)) continue
                points.push(`${x},${y}`)
              }
              // only render if we have a valid polyline
              return points.length > 1 ? <polyline key={`lon-${lon}`} points={points.join(' ')} /> : null
            })}
            {Array.from({ length: 7 }, (_, i) => -90 + i * 30).map((lat) => {
              const points = []
              for (let lon = -180; lon <= 180; lon += 2) {
                let coords = null
                try {
                  coords = projection([lon, lat])
                } catch (e) {
                  coords = null
                }
                if (!coords) continue
                const [x, y] = coords
                if (!isFinite(x) || !isFinite(y)) continue
                points.push(`${x},${y}`)
              }
              return points.length > 1 ? <polyline key={`lat-${lat}`} points={points.join(' ')} /> : null
            })}
          </g>
        )}

        {/* points */}
        <g>
          {data.map((p, i) => {
            let coords
            try {
              coords = projection([p.lon, p.lat])
            } catch (e) {
              coords = null
            }
            if (!coords || !isFinite(coords[0]) || !isFinite(coords[1])) return null
            const [x, y] = coords
            const r = 4 + (p.total / maxTotal) * pointScale
            const alpha = 0.5 + (p.total / maxTotal) * 0.5
            const fill = `rgba(249,115,22,${alpha})`
            return (
              <g key={`${p.city}-${i}`}>
                <circle cx={x} cy={y} r={r} fill={fill} stroke="#fff" strokeWidth={0.6} />
                <title>{`${p.city}, ${p.country}: ${p.total.toFixed(3)}`}</title>
              </g>
            )
          })}
        </g>
        {/* invisible debug text for load status (aria-hidden) */}
        <desc>{landGeo ? `topo: ${topoKey || 'loaded'}` : loadError ? `error:${loadError}` : 'loading topojson'}</desc>
      </svg>
    </div>
  )
}
