import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const GREEN = '#3CB98C'
const NAVY  = '#1A2B3C'

export function Hero4Section() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const elomaScale     = useTransform(scrollYProgress, [0, 0.75], [1, 4])
  const panelOpacity   = useTransform(scrollYProgress, [0.75, 0.92], [1, 0])

  // Supporting content recedes as the zoom begins: fades + drifts down + blurs,
  // fully gone by ~22% scroll — well before ELOMA fills the frame.
  const supportOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const supportY       = useTransform(scrollYProgress, [0, 0.22], [0, 40])
  const supportBlur    = useTransform(scrollYProgress, [0, 0.22], [0, 8])
  const supportFilter  = useTransform(supportBlur, (b) => `blur(${b}px)`)
  // Only allow interaction while the content is meaningfully visible.
  const supportPointer = useTransform(supportOpacity, (o) => (o > 0.1 ? 'auto' : 'none'))

  return (
    <div
      id="hero4-section"
      ref={sectionRef}
      style={{ height: '280vh', position: 'relative' }}
    >
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',       // predictable paint bounds
          opacity: panelOpacity,
          willChange: 'opacity',    // pre-promote so layer exists before animation
        }}
      >
        {/* ── Background video ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            willChange: 'transform', // keeps video on its own compositor layer
          }}
        >
          <source src="/images/elomagroup.mp4" type="video/mp4" />
        </video>

        {/*
          ── Single overlay div: radial vignette (dark corners, clear centre)
             stacked with a bottom-up linear for text legibility.
             One div instead of two = one fewer compositor layer.
        ── */}
        {/* Left edge gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `linear-gradient(to right, ${NAVY}cc 0%, ${NAVY}88 12%, ${NAVY}44 24%, transparent 38%)`,
            pointerEvents: 'none',
          }}
        />
        {/* Right edge gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `linear-gradient(to left, ${NAVY}99 0%, ${NAVY}55 12%, ${NAVY}22 24%, transparent 38%)`,
            pointerEvents: 'none',
          }}
        />
        {/* Bottom gradient — keeps bottom-left content legible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: `linear-gradient(to top, ${NAVY}cc 0%, ${NAVY}66 12%, ${NAVY}1a 26%, transparent 40%)`,
            pointerEvents: 'none',
          }}
        />

        {/* ── ELOMA — centered, zooms symmetrically toward viewer ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <motion.h2
            style={{
              scale: elomaScale,
              transformOrigin: 'center center',
              willChange: 'transform',
              color: '#ffffff',
              fontSize: 'clamp(64px, 10.5vw, 180px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              margin: 0,
              fontFamily: '"Helvetica Neue","Arial Black",Arial,system-ui,sans-serif',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            ELOMA
          </motion.h2>
        </div>

        {/* ── Supporting content — bottom-left, recedes as zoom begins ── */}
        <motion.div
          style={{
            position: 'absolute',
            zIndex: 3,
            bottom: 'clamp(52px, 9vh, 128px)',
            left: 'clamp(24px, 6vw, 120px)',
            right: '8%',
            opacity: supportOpacity,
            y: supportY,
            filter: supportFilter,
            pointerEvents: supportPointer,
            willChange: 'opacity, transform, filter',
          }}
        >
          {/* EXPERIENCE — stacked editorial label */}
          <div style={{ marginBottom: 'clamp(20px, 2.8vw, 36px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: GREEN }} />
              <span style={{
                fontSize: 'clamp(9px, 0.65vw, 11px)',
                fontWeight: 700,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: GREEN,
              }}>Eloma Group</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
              <span style={{
                fontSize: 'clamp(26px, 3.2vw, 52px)',
                fontWeight: 900,
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: '#ffffff',
                textTransform: 'uppercase',
              }}>Experience</span>
              <div style={{
                flex: 1,
                maxWidth: '80px',
                height: '2px',
                background: `linear-gradient(90deg, ${GREEN} 0%, transparent 100%)`,
                borderRadius: '2px',
                marginBottom: '4px',
              }} />
            </div>
          </div>

          {/* CTAs — identical outline, green fill on hover */}
          <div style={{ display: 'flex', gap: 'clamp(10px, 1.4vw, 16px)', flexWrap: 'wrap' as const }}>
            <button className="h4-btn">Our Businesses &rarr;</button>
            <button className="h4-btn">About Eloma &rarr;</button>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .h4-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: clamp(12px, 1.3vw, 16px) clamp(24px, 2.8vw, 38px);
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.55);
          border-radius: 999px;
          color: #ffffff;
          font-size: clamp(13px, 0.9vw, 15px);
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
          white-space: nowrap;
          min-height: 44px;
          backdrop-filter: blur(8px);
        }
        .h4-btn:hover {
          background: #3CB98C;
          border-color: #3CB98C;
          color: #ffffff;
          box-shadow: 0 8px 28px rgba(60,185,140,0.45);
        }
        .h4-btn:active { transform: scale(0.98); }
        @media (max-width: 540px) {
          .h4-btn { padding: 12px 24px; font-size: 13px; }
        }
      `}</style>
    </div>
  )
}
