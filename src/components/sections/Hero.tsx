import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/** Draws a centered, video-filled, animated text mask onto a full-bleed canvas. */
function useVideoTextCanvas(text: string, widthRatio: number, videoSrc: string) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const fontSizeRef = useRef(0);
  const prevWRef    = useRef(0);
  const prevHRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const video = document.createElement('video');
    video.src         = videoSrc;
    video.muted       = true;
    video.loop        = true;
    video.playsInline = true;
    video.play().catch(() => {});

    let raf = 0;
    let fontReady = false;

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

    const draw = () => {
      if (!fontReady || video.readyState < 2) { raf = requestAnimationFrame(draw); return; }

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Cover-fit the video frame into the canvas.
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const scale = Math.max(w / vw, h / vh);
      const dw = vw * scale;
      const dh = vh * scale;
      ctx.drawImage(video, (w - dw) / 2, (h - dh) / 2, dw, dh);

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
      if (document.hidden) { cancelAnimationFrame(raf); video.pause(); }
      else { video.play().catch(() => {}); raf = requestAnimationFrame(draw); }
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
      video.pause();
      video.src = '';
    };
  }, [text, widthRatio, videoSrc]);

  return canvasRef;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const elomaCanvasRef = useVideoTextCanvas('Eloma', 0.18, '/golden.mp4');

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
    <section ref={sectionRef} id="top" aria-label="Hero" className="relative overflow-hidden">
      <motion.div
        style={{ opacity: heroOpacity }}
        className="will-transform flex flex-col items-center justify-center gap-[clamp(0.75rem,2vw,1.5rem)] px-3 pb-3 pt-20 sm:min-h-screen sm:px-4 sm:pb-[clamp(1.5rem,4vw,3rem)] sm:pt-[clamp(3.5rem,8vw,6rem)]">

          {/* 1. Experience label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="select-none text-[clamp(1.5rem,4.5vw,2.25rem)] leading-[1.15] font-normal normal-case text-navy-900"
            style={{ fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif' }}
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

          {/* 3. Group label */}
          <motion.p
            style={{ scale: canvasScale, opacity: canvasOpacity }}
            className="will-transform select-none text-[clamp(1.625rem,5vw,2.5rem)] leading-[1.1] font-normal normal-case text-navy-900"
          >
            Group
          </motion.p>

          {/* 4. Scroll indicator */}
          <motion.a
            href="#businesses"
            aria-label="Scroll to explore"
            className="will-transform mt-2 flex flex-col items-center gap-2 text-navy-400"
          >
            <span className="text-eyebrow-fluid uppercase">Scroll</span>
            <span className="flex h-8 w-5 items-start justify-center overflow-hidden rounded-full border border-navy-200 p-1.5">
              <motion.span
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
              />
            </span>
          </motion.a>

      </motion.div>
    </section>
  );
}
