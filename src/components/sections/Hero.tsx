import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/** Draws a centered, gold-gradient-filled, animated text mask onto a full-bleed canvas. */
function useGradientTextCanvas(text: string) {
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
      const testPx = 400;
      ctx.font = `900 ${testPx}px Inter, system-ui, sans-serif`;
      const byWidth  = (testPx * w * 0.90) / ctx.measureText(text).width;
      const byHeight = h * 0.85;
      fontSizeRef.current = Math.min(byWidth, byHeight);
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
      g.addColorStop(0,    '#FFF6CC');
      g.addColorStop(0.30, '#FFD700');
      g.addColorStop(0.62, '#B8860B');
      g.addColorStop(1,    '#FFE680');
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
  }, [text]);

  return canvasRef;
}

/** Open/close zoom: scales an element up as it passes through the viewport, both ways. */
function useScrollZoom() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start'],
  });
  const sp      = useSpring(scrollYProgress, { stiffness: 70, damping: 22, restDelta: 0.0005 });
  const scale   = useTransform(sp, [0, 0.5, 1], [0.55, 1.25, 0.55]);
  const opacity = useTransform(sp, [0, 0.5, 1], [0.15, 1, 0.15]);
  return { ref, scale, opacity };
}

export function Hero() {
  const elomaCanvasRef = useGradientTextCanvas('ELOMA');
  const groupCanvasRef = useGradientTextCanvas('GROUP');

  const eloma = useScrollZoom();
  const group = useScrollZoom();

  return (
    <section id="top" aria-label="Hero" className="relative bg-white">
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20 pb-16 sm:gap-6 lg:pt-24">

        {/* 1. Experience label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="select-none text-xl font-extrabold tracking-wide text-navy-900 sm:text-2xl lg:text-3xl xl:text-4xl uppercase"
        >
          Experience
        </motion.p>

        {/* 2. ELOMA canvas — opens/zooms in & out with scroll */}
        <motion.div
          ref={eloma.ref}
          style={{ scale: eloma.scale, opacity: eloma.opacity }}
          className="h-28 w-full max-w-4xl sm:h-36 lg:h-48 3xl:h-56"
        >
          <canvas ref={elomaCanvasRef} aria-hidden="true" className="h-full w-full" />
        </motion.div>

        {/* 3. GROUP canvas — opens/zooms in & out with scroll */}
        <motion.div
          ref={group.ref}
          style={{ scale: group.scale, opacity: group.opacity }}
          className="h-20 w-full max-w-3xl sm:h-28 lg:h-36 3xl:h-44"
        >
          <canvas ref={groupCanvasRef} aria-hidden="true" className="h-full w-full" />
        </motion.div>

        {/* ── Scroll indicator ──────────────────────────────────────── */}
        <motion.a
          href="#businesses"
          aria-label="Scroll to explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-2 text-navy-400 sm:mt-14"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-navy-200 p-1.5">
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            />
          </span>
        </motion.a>

      </div>
    </section>
  );
}
