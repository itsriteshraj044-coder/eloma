import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const BG    = '#ffffff'
const MUTED = 'rgba(26,43,60,0.42)'

const VIDEO_SRC  = '/images/WhatsApp%20Video%202026-06-02%20at%2012.47.59%20PM.mp4'
const VIDEO_SRC2 = '/images/WhatsApp%20Video%202026-06-02%20at%2012.48.07%20PM.mp4'

export function Hero3Section() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const scale             = useTransform(scrollYProgress, [0, 0.78], [1, 6])
  const experienceOpacity = useTransform(scrollYProgress, [0, 0.10], [1, 0])
  const wrapperOpacity    = useTransform(scrollYProgress, [0.78, 0.92], [1, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    const video  = videoRef.current
    if (!canvas || !video) return

    const ctx     = canvas.getContext('2d')!
    let rafId     = 0
    let vfcHandle = 0
    let running   = false
    let fontCache = 0   // invalidated on resize

    /* Resize canvas; cap DPR at 1.5 to halve pixel area on retina screens */
    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr  = Math.min(window.devicePixelRatio || 1, 1.5)
      const nw   = Math.round(rect.width  * dpr)
      const nh   = Math.round(rect.height * dpr)
      if (canvas.width !== nw || canvas.height !== nh) {
        canvas.width  = nw
        canvas.height = nh
        fontCache = 0   // must recalc after size change
      }
    }

    /* Draw one frame: video cover-fit → destination-in text mask */
    function drawFrame() {
      if (!running) return

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w   = canvas.width  / dpr
      const h   = canvas.height / dpr

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      if (video.readyState >= 2) {
        // Cover-fit video onto canvas
        const vr = video.videoWidth / video.videoHeight
        const cr = w / h
        let sx = 0, sy = 0, sw = video.videoWidth, sh = video.videoHeight
        if (vr > cr) { sw = sh * cr;  sx = (video.videoWidth  - sw) / 2 }
        else         { sh = sw / cr;  sy = (video.videoHeight - sh) / 2 }
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h)

        // Compute font-size once per canvas dimension (cached)
        if (!fontCache) {
          let fs = h * 0.82
          ctx.font = `900 ${fs}px "Helvetica Neue","Arial Black",Arial,sans-serif`
          const m = ctx.measureText('Eloma')
          if (m.width > 0) fs = fs * (w * 0.92) / m.width
          fontCache = fs
        }

        // Keep video only where letters are (destination-in)
        ctx.globalCompositeOperation = 'destination-in'
        ctx.font = `900 ${fontCache}px "Helvetica Neue","Arial Black",Arial,sans-serif`
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle    = 'black'
        ctx.fillText('Eloma', w / 2, h / 2)
        ctx.globalCompositeOperation = 'source-over'
      }

      // requestVideoFrameCallback fires exactly once per decoded video frame
      // (~24-30 fps) instead of every display frame (60 fps) — key perf win
      if ('requestVideoFrameCallback' in video) {
        vfcHandle = (video as any).requestVideoFrameCallback(drawFrame)
      } else {
        // Fallback: RAF throttled; skip odd frames (≈30 fps) on older browsers
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

    /* Pause the canvas loop entirely when the section is off-screen */
    const io = new IntersectionObserver(
      (entries) => { entries[0].isIntersecting ? start() : stop() },
      { threshold: 0 }
    )

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    io.observe(canvas)   // canvas leaving viewport = loop stops

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div id="hero3-section" ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>

      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: BG,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: wrapperOpacity,
          willChange: 'opacity',    // pre-promote compositor layer
        }}
      >
        <motion.p
          style={{
            opacity: experienceOpacity,
            position: 'absolute',
            top: 'clamp(80px, 10vh, 160px)',
            left: 0,
            right: 0,
            textAlign: 'center',
            margin: 0,
            fontSize: 'clamp(12px, 0.9vw, 15px)',
            fontWeight: 600,
            letterSpacing: '5px',
            textTransform: 'uppercase',
            color: MUTED,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          Experience
        </motion.p>

        <motion.div
          style={{
            scale,
            width: '100%',
            padding: '0 clamp(24px, 4vw, 64px)',
            boxSizing: 'border-box' as const,
            willChange: 'transform',  // pre-promote; compositor handles scale
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              width: '100%',
              height: 'clamp(140px, 20vw, 340px)',
            }}
          />
        </motion.div>

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          style={{ display: 'none' }}
        >
          <source src={VIDEO_SRC}  type="video/mp4" />
          <source src={VIDEO_SRC2} type="video/mp4" />
        </video>
      </motion.div>
    </div>
  )
}
