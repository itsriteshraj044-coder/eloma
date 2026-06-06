import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const BG      = '#F6FAF8'
const NAVY    = '#1A2B3C'
const GREEN   = '#3CB98C'
const MUTED   = 'rgba(26,43,60,0.42)'
const SILVER  = 'linear-gradient(145deg, #FFFFFF 0%, #E9F0EC 42%, #C8D6CF 100%)'
const GREEN_G = 'linear-gradient(145deg, #5BCBA3 0%, #2A9B74 100%)'
const NAVY_G  = `linear-gradient(145deg, #2E465B 0%, ${NAVY} 100%)`

const VIDEO_SRC  = '/images/WhatsApp%20Video%202026-06-02%20at%2012.47.59%20PM.mp4'
const VIDEO_SRC2 = '/images/WhatsApp%20Video%202026-06-02%20at%2012.48.07%20PM.mp4'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export function Hero3Section() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const reduce     = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const scale          = useTransform(scrollYProgress, [0, 0.78], [1, 6])
  const labelOpacity   = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const wrapperOpacity = useTransform(scrollYProgress, [0.86, 0.96], [1, 0])

  useEffect(() => {
    const canvasRaw = canvasRef.current
    const videoRaw  = videoRef.current
    if (!canvasRaw || !videoRaw) return

    const canvas: HTMLCanvasElement = canvasRaw
    const video: HTMLVideoElement   = videoRaw

    const ctx     = canvas.getContext('2d')!
    let rafId     = 0
    let vfcHandle = 0
    let running   = false
    let fontCache = 0

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr  = Math.min(window.devicePixelRatio || 1, 1.5)
      const nw   = Math.round(rect.width  * dpr)
      const nh   = Math.round(rect.height * dpr)
      if (canvas.width !== nw || canvas.height !== nh) {
        canvas.width  = nw
        canvas.height = nh
        fontCache = 0
      }
    }

    function drawFrame() {
      if (!running) return

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w   = canvas.width  / dpr
      const h   = canvas.height / dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      if (video.readyState >= 2) {
        const vr = video.videoWidth / video.videoHeight
        const cr = w / h
        let sx = 0, sy = 0, sw = video.videoWidth, sh = video.videoHeight
        if (vr > cr) { sw = sh * cr;  sx = (video.videoWidth  - sw) / 2 }
        else         { sh = sw / cr;  sy = (video.videoHeight - sh) / 2 }
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h)

        if (!fontCache) {
          let fs = h * 0.82
          ctx.font = `900 ${fs}px "Helvetica Neue","Arial Black",Arial,sans-serif`
          const m = ctx.measureText('Eloma')
          if (m.width > 0) fs = fs * (w * 0.92) / m.width
          fontCache = fs
        }

        ctx.globalCompositeOperation = 'destination-in'
        ctx.font = `900 ${fontCache}px "Helvetica Neue","Arial Black",Arial,sans-serif`
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle    = 'black'
        ctx.fillText('Eloma', w / 2, h / 2)
        ctx.globalCompositeOperation = 'source-over'
      }

      if ('requestVideoFrameCallback' in video) {
        vfcHandle = (video as any).requestVideoFrameCallback(drawFrame)
      } else {
        rafId = requestAnimationFrame(drawFrame)
      }
    }

    function start() {
      if (running) return
      running = true
      video.play().catch(() => {})
      if ('requestVideoFrameCallback' in video) {
        vfcHandle = (video as any).requestVideoFrameCallback(drawFrame)
      } else {
        rafId = requestAnimationFrame(drawFrame)
      }
    }

    function stop() {
      if (!running) return
      running = false
      if (vfcHandle && 'cancelVideoFrameCallback' in video) {
        ;(video as any).cancelVideoFrameCallback(vfcHandle)
        vfcHandle = 0
      }
      cancelAnimationFrame(rafId)
      rafId = 0
      video.pause()
    }

    const io = new IntersectionObserver(
      (entries) => { entries[0].isIntersecting ? start() : stop() },
      { threshold: 0 }
    )

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    io.observe(canvas)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`
        #hero3-section { height: 300vh; position: relative; }
        @media (max-width: 540px) { #hero3-section { height: 220vh; } }

        .h3-canvas { display: block; width: 100%; height: clamp(140px, 20vw, 340px); }
        @media (max-width: 540px) { .h3-canvas { height: clamp(120px, 36vw, 180px); } }

        @keyframes h3-float-a {
          0%, 100% { transform: translateY(0)    rotate(0deg);  }
          50%       { transform: translateY(-20px) rotate(3deg);  }
        }
        @keyframes h3-float-b {
          0%, 100% { transform: translateY(0)    rotate(0deg);  }
          50%       { transform: translateY(16px)  rotate(-4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .h3-shape { animation: none !important; }
        }
      `}</style>

      <div id="hero3-section" ref={sectionRef}>
        <motion.div
          style={{
            position: 'sticky', top: 0,
            height: '100vh', overflow: 'hidden',
            background: BG,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            opacity: wrapperOpacity,
            willChange: 'opacity',
          }}
        >

          {/* Radial vignette — edge depth */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(26,43,60,0.045) 100%)',
          }} />

          {/* Ambient floating shapes */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
            {/* Large silver sphere — top left */}
            <div className="h3-shape" style={{
              position: 'absolute',
              width: 'clamp(200px, 28vw, 440px)', aspectRatio: '1', borderRadius: '50%',
              top: '-8%', left: '-6%',
              background: SILVER, opacity: 0.55,
              boxShadow: '0 34px 70px rgba(26,43,60,0.10), inset 0 3px 4px rgba(255,255,255,0.9), inset 0 -12px 24px rgba(26,43,60,0.06)',
              animation: reduce ? 'none' : 'h3-float-a 18s ease-in-out infinite',
              willChange: 'transform',
            }} />
            {/* Green sphere — top right */}
            <div className="h3-shape" style={{
              position: 'absolute',
              width: 'clamp(60px, 7vw, 110px)', aspectRatio: '1', borderRadius: '50%',
              top: '12%', right: '8%',
              background: GREEN_G, opacity: 0.72,
              boxShadow: '0 22px 48px rgba(60,185,140,0.28)',
              animation: reduce ? 'none' : 'h3-float-b 12s ease-in-out infinite',
              willChange: 'transform',
            }} />
            {/* Silver capsule — bottom right */}
            <div className="h3-shape" style={{
              position: 'absolute',
              width: 'clamp(120px, 14vw, 220px)', height: 'clamp(50px, 6vw, 90px)', borderRadius: '999px',
              bottom: '10%', right: '-3%',
              background: SILVER, opacity: 0.42,
              boxShadow: '0 22px 48px rgba(26,43,60,0.12)',
              animation: reduce ? 'none' : 'h3-float-a 22s ease-in-out infinite',
              willChange: 'transform',
            }} />
            {/* Navy capsule — bottom left */}
            <div className="h3-shape" style={{
              position: 'absolute',
              width: 'clamp(80px, 10vw, 160px)', height: 'clamp(32px, 4vw, 60px)', borderRadius: '999px',
              bottom: '18%', left: '5%',
              background: NAVY_G, opacity: 0.28,
              boxShadow: '0 22px 48px rgba(26,43,60,0.18)',
              animation: reduce ? 'none' : 'h3-float-b 16s ease-in-out infinite',
              willChange: 'transform',
            }} />
          </div>

          {/* Eyebrow — slides in on mount, fades on scroll */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
            style={{
              position: 'absolute', top: 'clamp(80px, 10vh, 160px)',
              left: 0, right: 0, zIndex: 1, pointerEvents: 'none',
            }}
          >
            <motion.p style={{
              opacity: labelOpacity,
              margin: 0, textAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              fontSize: 'clamp(10px, 0.78vw, 13px)',
              fontWeight: 800, letterSpacing: '5px', textTransform: 'uppercase',
              color: MUTED, userSelect: 'none',
            }}>
              <span style={{
                display: 'inline-block', width: '5px', height: '5px', borderRadius: '50%',
                background: GREEN, boxShadow: `0 0 0 3px ${GREEN}28`, flexShrink: 0,
              }} />
              Experience · Eloma Group
            </motion.p>
          </motion.div>

          {/* Canvas + GROUP — entrance fades in together */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE }}
            style={{
              width: '100%', zIndex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
          >
            {/* Scroll-driven zoom */}
            <motion.div style={{
              scale,
              width: '100%',
              padding: '0 clamp(24px, 4vw, 64px)',
              boxSizing: 'border-box' as const,
              willChange: 'transform',
            }}>
              <canvas ref={canvasRef} className="h3-canvas" />
            </motion.div>

            {/* GROUP identifier — delayed entrance, same scroll fade */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
            >
              <motion.p style={{
                opacity: labelOpacity,
                margin: 'clamp(10px, 1.2vw, 18px) 0 0',
                fontSize: 'clamp(10px, 0.85vw, 14px)',
                fontWeight: 800, letterSpacing: '10px', textTransform: 'uppercase',
                color: MUTED, textAlign: 'center',
                userSelect: 'none', pointerEvents: 'none',
                paddingLeft: '10px', // optical compensate for letter-spacing
              }}>
                Group
              </motion.p>
            </motion.div>
          </motion.div>

          <video ref={videoRef} muted loop playsInline style={{ display: 'none' }}>
            <source src={VIDEO_SRC}  type="video/mp4" />
            <source src={VIDEO_SRC2} type="video/mp4" />
          </video>

        </motion.div>
      </div>
    </>
  )
}
