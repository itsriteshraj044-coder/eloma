import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/** Draws a centered, gold-gradient-filled, animated text mask onto a full-bleed canvas. */
function useGradientTextCanvas(text: string, widthRatio: number) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const fontSizeRef = useRef(0);
  const prevWRef    = useRef(0);
  const prevHRef    = useRef(0);
  const t0Ref       = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let fontReady = false;
    t0Ref.current = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      prevWRef.current = 0;
      prevHRef.current = 0;
    };

    const syncFont = (w: number, h: number) => {
      if (w === prevWRef.current && h === prevHRef.current) return;
      prevWRef.current = w;
      prevHRef.current = h;
      // Scale the wordmark with the canvas width so it fills the hero container.
      fontSizeRef.current = w * widthRatio;
    };

    const draw = (now: number) => {
      if (!fontReady) { raf = requestAnimationFrame(draw); return; }

      const w = canvas.width;
      const h = canvas.height;
      const t = (now - t0Ref.current) / 1000;

      ctx.clearRect(0, 0, w, h);

      const a = (Math.sin(t * 0.40) + 1) / 2;
      const b = (Math.cos(t * 0.33 + 1.1) + 1) / 2;

      const g = ctx.createLinearGradient(a * w, b * h * 0.3, w * (1 - b * 0.28), h);
      g.addColorStop(0,    '#6FD5B0');
      g.addColorStop(0.30, '#3CB98C');
      g.addColorStop(0.62, '#08213C');
      g.addColorStop(1,    '#1F4267');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      syncFont(w, h);
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle    = '#000';
      ctx.font         = `900 ${fontSizeRef.current}px Inter, system-ui, sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign    = 'center';
      ctx.fillText(text, w / 2, h * 0.50);
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(draw);
    };

    document.fonts.load('900 400px Inter').then(() => { fontReady = true; });

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [text, widthRatio]);

  return canvasRef;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const elomaCanvasRef = useGradientTextCanvas('ELOMA', 0.18);
  const groupCanvasRef = useGradientTextCanvas('GROUP', 0.14);

  // Open/close scroll animation: scrolling down zooms both wordmark canvases
  // in (toward the viewer, fading into the next section); scrolling back up
  // zooms them back out to rest — driven by Lenis-synced native scroll, never
  // a manual scroll listener.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <section ref={sectionRef} id="top" aria-label="Hero" className="relative overflow-hidden bg-white">
      {/* Abstract animated blob shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="bg-blob will-transform absolute -right-[15%] -top-[20%] aspect-square w-[clamp(420px,55vw,900px)] bg-gradient-to-br from-navy-100/70 via-navy-50/60 to-transparent"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-blob will-transform absolute -bottom-[25%] -left-[10%] aspect-square w-[clamp(380px,48vw,780px)] bg-gradient-to-tr from-navy-50/80 via-navy-100/40 to-transparent"
          animate={{ x: [0, 30, 0], y: [0, -40, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-blob will-transform absolute right-[15%] top-[35%] aspect-square w-[clamp(220px,26vw,420px)] bg-gradient-to-bl from-emerald-50/60 via-navy-50/30 to-transparent"
          animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="will-transform flex min-h-screen flex-col items-center justify-center gap-[clamp(0.75rem,2vw,1.5rem)] px-4 pb-[clamp(1.5rem,4vw,3rem)] pt-[clamp(3.5rem,8vw,6rem)]">

          {/* 1. Experience label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="select-none text-sub-heading uppercase text-navy-900"
          >
            Experience
          </motion.p>

          {/* 2. ELOMA canvas */}
          <motion.div
            style={{ scale: canvasScale, opacity: canvasOpacity }}
            className="will-transform container-px aspect-[5/1] w-full"
          >
            <canvas ref={elomaCanvasRef} aria-hidden="true" className="h-full w-full" />
          </motion.div>

          {/* 3. GROUP canvas */}
          <motion.div
            style={{ scale: canvasScale, opacity: canvasOpacity }}
            className="will-transform container-px aspect-[6/1] w-full"
          >
            <canvas ref={groupCanvasRef} aria-hidden="true" className="h-full w-full" />
          </motion.div>

      </motion.div>

      {/* ── Scroll indicator — bottom-right corner ──────────────────── */}
      <motion.a
        href="#businesses"
        aria-label="Scroll to explore"
        style={{ opacity: heroOpacity }}
        className="will-transform absolute bottom-[clamp(1.5rem,4vw,3rem)] right-[clamp(1.5rem,4vw,4rem)] z-10 flex flex-col items-center gap-2 text-navy-400"
      >
        <span className="text-eyebrow-fluid uppercase [writing-mode:vertical-rl]">Scroll</span>
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-navy-200 p-1.5">
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
          />
        </span>
      </motion.a>
    </section>
  );
}
