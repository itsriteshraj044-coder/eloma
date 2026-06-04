import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { RotateCcw } from 'lucide-react'

const GREEN = '#3CB98C'
const TEXT  = '#1A2B3C'

type Coord = [number, number]

const LOCATIONS: { id: string; coord: Coord; name: string; size: number }[] = [
  { id: 'au', coord: [-33.87,  151.21], name: 'Australia', size: 0.07 },
  { id: 'us', coord: [ 40.71,  -74.01], name: 'USA',       size: 0.04 },
  { id: 'ca', coord: [ 43.65,  -79.38], name: 'Canada',    size: 0.04 },
  { id: 'gb', coord: [ 51.51,   -0.13], name: 'UK',        size: 0.04 },
  { id: 'eu', coord: [ 48.86,    2.35], name: 'Europe',    size: 0.04 },
  { id: 'ae', coord: [ 25.20,   55.27], name: 'Dubai',     size: 0.04 },
  { id: 'in', coord: [ 28.61,   77.21], name: 'India',     size: 0.04 },
  { id: 'cn', coord: [ 31.23,  121.47], name: 'China',     size: 0.04 },
  { id: 'sg', coord: [  1.35,  103.82], name: 'Singapore', size: 0.04 },
  { id: 'jp', coord: [ 35.68,  139.65], name: 'Japan',     size: 0.04 },
]

const [AU, US, CA, GB, EU, AE, IN, CN, SG, JP] = LOCATIONS.map(l => l.coord)

const ARCS: { from: Coord; to: Coord }[] = [
  { from: AU, to: SG }, { from: AU, to: CN },
  { from: AU, to: JP }, { from: AU, to: US },
  { from: SG, to: IN }, { from: SG, to: CN },
  { from: SG, to: JP }, { from: CN, to: JP },
  { from: IN, to: AE }, { from: SG, to: AE },
  { from: AE, to: EU }, { from: AE, to: GB },
  { from: EU, to: GB }, { from: GB, to: US },
  { from: EU, to: CA }, { from: US, to: CA },
]

const STATS = [
  { value: '10+', label: 'Countries'  },
  { value: '5',   label: 'Companies'  },
  { value: '1',   label: 'Vision'     },
]

export function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let phi      = 0
    let theta    = 0
    let animId   = 0
    let dragging = false
    let lastX    = 0
    let lastY    = 0

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width:            600 * 2,
      height:           600 * 2,
      phi:              0,
      theta:            0,
      dark:             0,
      diffuse:          1.2,
      mapSamples:       16000,
      mapBrightness:    6,
      baseColor:        [1,     1,     1    ],
      markerColor:      [0.235, 0.725, 0.549],
      glowColor:        [0.7,   0.82,  1    ],
      markers:          LOCATIONS.map(l => ({ location: l.coord, size: l.size, id: l.id })),
      arcs:             ARCS,
      arcColor:         [0.235, 0.725, 0.549],
      arcWidth:         0.25,
      arcHeight:        0.35,
    })

    function animate() {
      if (!dragging) {
        phi   += 0.003
        theta *= 0.98
      }
      globe.update({ phi, theta })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onDown = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY
      canvas.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      phi   += (e.clientX - lastX) * 0.005
      theta  = Math.max(-1.2, Math.min(1.2, theta + (e.clientY - lastY) * 0.003))
      lastX  = e.clientX; lastY = e.clientY
    }
    const onUp = () => { dragging = false }

    canvas.addEventListener('pointerdown',   onDown)
    canvas.addEventListener('pointermove',   onMove)
    canvas.addEventListener('pointerup',     onUp)
    canvas.addEventListener('pointercancel', onUp)

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('pointerdown',   onDown)
      canvas.removeEventListener('pointermove',   onMove)
      canvas.removeEventListener('pointerup',     onUp)
      canvas.removeEventListener('pointercancel', onUp)
      globe.destroy()
    }
  }, [])

  return (
    <section className="gs-section">
      <div className="gs-inner">

        {/* ══════════════════════════════════════════
            LEFT — editorial type-first panel
            Follows CLAUDE.md typography scale:
            H2 = clamp(52px, 10vw, 136px), uppercase, -0.04em
            ══════════════════════════════════════════ */}
        <div className="gs-text">

          {/* Eyebrow identifier */}
          <div className="gs-eyebrow">
            <span className="gs-ey-num">01</span>
            <span className="gs-ey-rule" />
            <span className="gs-ey-tag">Global Presence</span>
            <span className="gs-ey-dot" />
          </div>

          {/* MASSIVE stacked heading — type IS the design */}
          <h2 className="gs-heading" aria-label="Worldwide Freight Network">
            <span className="gs-h-green">WORLDWIDE</span>
            <span className="gs-h-dark">FREIGHT</span>
            <span className="gs-h-dark">NETWORK.</span>
          </h2>

          {/* Green gradient divider */}
          <div className="gs-rule" />

          {/* Body copy — Eloma Group global presence */}
          <p className="gs-body">
            A growing presence across key global regions — we operate across
            multiple countries, connecting businesses and communities through
            trusted, scalable solutions.
          </p>

          {/* Stats — large numbers in framed row */}
          <div className="gs-stats-row">
            {STATS.map((s, i) => (
              <>
                {i > 0 && <span key={`sep${i}`} className="gs-stat-sep" />}
                <div key={s.label} className="gs-stat">
                  <span className="gs-stat-num">{s.value}</span>
                  <span className="gs-stat-lbl">{s.label}</span>
                </div>
              </>
            ))}
          </div>

          {/* Drag hint */}
          <div className="gs-drag-pill" aria-hidden="true">
            <RotateCcw size={11} strokeWidth={2.5} />
            <span>Drag globe to explore</span>
          </div>

        </div>

        {/* ══════════════════════════════════════════
            RIGHT — interactive globe
            ══════════════════════════════════════════ */}
        <div className="gs-canvas-wrap">
          <div className="gs-globe-box">
            <canvas ref={canvasRef} className="gs-canvas" />

            {/* ELOMA watermark */}
            <div className="gs-globe-brand" aria-hidden="true">ELOMA</div>

            {/* Country labels — CSS Anchor Positioning (Chrome 125+) */}
            {LOCATIONS.map(l => (
              <div key={l.id} className={`gs-label gs-label-${l.id}`}>
                {l.name}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        /* ── Section wrapper — fits one viewport ── */
        .gs-section {
          background: #f5f7fb;
          min-height: calc(100vh - 64px); /* 64px = header height */
          display: flex;
          align-items: center;
          padding: clamp(20px, 2.5vw, 40px) 0;
          overflow: hidden;
          box-sizing: border-box;
        }

        /* ── Inner: wide, minimal bezel per CLAUDE.md ── */
        .gs-inner {
          width: 100%;
          max-width: 1760px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 64px);
          display: flex;
          align-items: center;
          gap: clamp(28px, 3.5vw, 64px);
        }

        /* ══════════════════════════════════════════
           TEXT PANEL — editorial, type-forward
           ══════════════════════════════════════════ */
        .gs-text {
          flex: 0 0 auto;
          width: clamp(300px, 44vw, 680px);
          display: flex;
          flex-direction: column;
        }

        /* ── Eyebrow ── */
        .gs-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: clamp(14px, 1.6vw, 24px);
        }
        .gs-ey-num {
          font-size: clamp(10px, 0.75vw, 12px);
          font-weight: 800;
          color: ${GREEN};
          letter-spacing: 3px;
          text-transform: uppercase;
          font-variant-numeric: tabular-nums;
        }
        .gs-ey-rule {
          display: block;
          flex: 0 0 36px;
          height: 1.5px;
          background: linear-gradient(90deg, ${GREEN} 0%, transparent 100%);
          border-radius: 2px;
        }
        .gs-ey-tag {
          font-size: clamp(10px, 0.75vw, 12px);
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(26,43,60,0.38);
        }
        .gs-ey-dot {
          display: block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: ${GREEN};
          animation: gs-blink 1.8s ease-in-out infinite;
        }

        /* ── MASSIVE stacked heading — CLAUDE.md H2 scale ── */
        .gs-heading {
          display: flex;
          flex-direction: column;
          margin: 0 0 clamp(14px, 1.6vw, 22px);
          gap: 0;
        }
        .gs-h-green {
          font-size: clamp(48px, 7.5vw, 108px);
          font-weight: 900;
          color: ${GREEN};
          letter-spacing: -0.04em;
          line-height: 0.88;
          text-transform: uppercase;
        }
        .gs-h-dark {
          font-size: clamp(48px, 7.5vw, 108px);
          font-weight: 900;
          color: ${TEXT};
          letter-spacing: -0.04em;
          line-height: 0.88;
          text-transform: uppercase;
        }

        /* ── Green accent rule ── */
        .gs-rule {
          width: 48px;
          height: 3px;
          background: linear-gradient(90deg, ${GREEN}, rgba(60,185,140,0.2));
          border-radius: 3px;
          margin-bottom: clamp(12px, 1.2vw, 18px);
          flex-shrink: 0;
        }

        /* ── Body text — CLAUDE.md body scale ── */
        .gs-body {
          font-size: clamp(13px, 1.1vw, 16px);
          color: rgba(26,43,60,0.58);
          line-height: 1.72;
          margin: 0 0 clamp(18px, 2vw, 28px);
          max-width: 460px;
        }

        /* ── Stats row ── */
        .gs-stats-row {
          display: flex;
          align-items: center;
          padding: clamp(12px, 1.4vw, 18px) 0;
          border-top: 1px solid rgba(26,43,60,0.08);
          border-bottom: 1px solid rgba(26,43,60,0.08);
          margin-bottom: clamp(14px, 1.6vw, 22px);
        }
        .gs-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 0 clamp(10px, 1.3vw, 20px);
        }
        .gs-stat:first-child { padding-left: 0; }
        .gs-stat:last-child  { padding-right: 0; }
        .gs-stat-sep {
          display: block;
          width: 1px;
          height: 36px;
          background: rgba(26,43,60,0.10);
          flex-shrink: 0;
        }
        .gs-stat-num {
          font-size: clamp(28px, 3.2vw, 48px);
          font-weight: 900;
          color: ${TEXT};
          letter-spacing: -0.05em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .gs-stat-lbl {
          font-size: clamp(9px, 0.7vw, 11px);
          font-weight: 800;
          color: rgba(26,43,60,0.38);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        /* ── Drag hint pill ── */
        .gs-drag-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: flex-start;
          padding: 9px 18px;
          background: transparent;
          border: 1px solid rgba(60,185,140,0.28);
          border-radius: 999px;
          color: rgba(60,185,140,0.8);
          font-size: clamp(10px, 0.75vw, 12px);
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: default;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .gs-drag-pill:hover {
          background: rgba(60,185,140,0.07);
          border-color: rgba(60,185,140,0.5);
          color: ${GREEN};
        }

        /* ══════════════════════════════════════════
           GLOBE — right side
           ══════════════════════════════════════════ */
        .gs-canvas-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }
        .gs-globe-box {
          position: relative;
          width:  clamp(300px, 44vw, 620px);
          height: clamp(300px, 44vw, 620px);
          flex-shrink: 0;
        }
        .gs-canvas {
          width: 100%; height: 100%;
          cursor: grab;
          user-select: none; -webkit-user-select: none;
          touch-action: none; display: block;
        }
        .gs-canvas:active { cursor: grabbing; }

        /* ── ELOMA watermark ── */
        .gs-globe-brand {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none; user-select: none;
          font-size: clamp(1.3rem, 3.4vw, 3.4rem);
          font-weight: 900;
          letter-spacing: 0.45em; text-indent: 0.45em;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(26, 43, 60, 0.18);
          text-stroke: 1.5px rgba(26, 43, 60, 0.18);
          font-family: system-ui, -apple-system, 'Helvetica Neue', sans-serif;
          text-transform: uppercase;
          mix-blend-mode: multiply;
        }

        /* ── Country labels — CSS Anchor Positioning (Chrome 125+) ── */
        .gs-label {
          pointer-events: none; user-select: none;
          white-space: nowrap;
          padding: 3px 8px;
          background: #ffffff;
          border: 1px solid rgba(60,185,140,0.35);
          border-radius: 5px;
          font-size: 8px; font-weight: 700;
          letter-spacing: 0.9px; text-transform: uppercase;
          color: ${TEXT};
          box-shadow: 0 2px 10px rgba(0,0,0,0.10);
          position: relative;
        }
        .gs-label::after {
          content: '';
          position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #ffffff; margin-top: -1px;
        }
        .gs-label::before {
          content: '';
          position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: rgba(60,185,140,0.35);
        }
        @supports (anchor-name: --test) {
          .gs-label {
            position: absolute; translate: -50% 0;
            margin-bottom: 10px;
            transition: opacity 0.3s ease, filter 0.3s ease;
          }
          ${LOCATIONS.map(l => `
          .gs-label-${l.id} {
            position-anchor: --cobe-${l.id};
            bottom: anchor(top); left: anchor(center);
            opacity: var(--cobe-visible-${l.id}, 0);
            filter: blur(calc((1 - var(--cobe-visible-${l.id}, 0)) * 4px));
          }`).join('')}
        }
        @supports not (anchor-name: --test) {
          .gs-label { display: none; }
        }

        @keyframes gs-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }

        /* ══════════════════════════════════════════
           RESPONSIVE — all breakpoints per CLAUDE.md
           ══════════════════════════════════════════ */

        /* 2K */
        @media (min-width: 1920px) {
          .gs-inner { max-width: 1900px; }
        }
        /* 4K */
        @media (min-width: 2560px) {
          .gs-inner { max-width: 2400px; }
        }

        /* Tablet landscape → stack */
        @media (max-width: 1024px) {
          .gs-inner {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          .gs-text   { width: 100%; max-width: 680px; }
          .gs-eyebrow { justify-content: center; }
          .gs-rule    { margin-left: auto; margin-right: auto; }
          .gs-body    { margin-left: auto; margin-right: auto; }
          .gs-stats-row { justify-content: center; }
          .gs-drag-pill { align-self: center; }
          .gs-globe-box {
            width:  clamp(280px, 70vw, 520px);
            height: clamp(280px, 70vw, 520px);
          }
        }

        /* Mobile */
        @media (max-width: 540px) {
          .gs-section { min-height: unset; padding: 48px 0; align-items: flex-start; }
          .gs-h-green,
          .gs-h-dark { font-size: clamp(44px, 13vw, 72px); }
          .gs-globe-box {
            width:  clamp(260px, 86vw, 420px);
            height: clamp(260px, 86vw, 420px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gs-ey-dot { animation: none; }
        }
      `}</style>
    </section>
  )
}
