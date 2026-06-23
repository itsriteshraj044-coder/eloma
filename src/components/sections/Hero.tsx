import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Application } from '@splinetool/runtime';
import { Container } from '@/components/ui/Container';
import { SplineScene } from '@/components/ui/splite';

/**
 * Draws a video-filled, animated text mask onto a full-bleed canvas.
 * `align: 'responsive'` left-aligns the word on large screens (so it lines up
 * with the surrounding labels) and centers it when the layout stacks.
 */
export function useVideoTextCanvas(
  text: string,
  widthRatio: number,
  videoSrc: string,
  align: 'center' | 'responsive' = 'center',
) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const fontSizeRef  = useRef(0);
  const prevWRef     = useRef(0);
  const prevHRef     = useRef(0);
  const leftAlignRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Track the breakpoint so the mask matches the surrounding flex alignment.
    const mq = align === 'responsive' ? window.matchMedia('(min-width: 1024px)') : null;
    const syncAlign = () => { leftAlignRef.current = mq ? mq.matches : false; };
    syncAlign();
    mq?.addEventListener('change', syncAlign);

    const video = document.createElement('video');
    video.src         = videoSrc;
    video.muted       = true;
    video.loop        = true;
    video.playsInline = true;
    video.play().catch(() => {});

    let raf = 0;
    let fontReady = false;
    let onScreen = true;
    let running = false;

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
      if (!fontReady || video.readyState < 2) { if (running) raf = requestAnimationFrame(draw); return; }

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
      const left = leftAlignRef.current;
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle    = '#000';
      ctx.font         = `600 ${fontSizeRef.current}px Inter, system-ui, sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.textAlign    = left ? 'left' : 'center';
      ctx.fillText(text, left ? 0 : w / 2, h * 0.50);
      ctx.globalCompositeOperation = 'source-over';

      if (running) raf = requestAnimationFrame(draw);
    };

    document.fonts.load('600 400px Inter').then(() => { fontReady = true; });

    const start = () => {
      if (running) return;
      running = true;
      video.play().catch(() => {});
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      video.pause();
    };
    // Only animate while on-screen AND the tab is visible — a continuous video
    // draw must never compete with scroll once the hero is scrolled away.
    const sync = () => (onScreen && !document.hidden ? start() : stop());

    const onVisibility = () => sync();
    document.addEventListener('visibilitychange', onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    sync();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      mq?.removeEventListener('change', syncAlign);
      video.pause();
      video.src = '';
    };
  }, [text, widthRatio, videoSrc, align]);

  return canvasRef;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const elomaCanvasRef = useVideoTextCanvas('Eloma', 0.27, '/golden.mp4', 'responsive');

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

  // Mount the (heavy) Spline scene once the hero first appears, then keep it
  // mounted — scrolling back up never reloads it. While it's off screen we
  // pause its WebGL loop (stop) and resume (play) on return, so it never
  // competes with scrolling through the rest of the site.
  const heroSeen = useInView(sectionRef, { once: true, margin: '200px' });
  const heroVisible = useInView(sectionRef, { margin: '0px 0px -10% 0px' });
  const splineAppRef = useRef<Application | null>(null);

  useEffect(() => {
    const app = splineAppRef.current;
    if (!app) return;
    if (heroVisible) app.play();
    else app.stop();
  }, [heroVisible]);

  return (
    <section ref={sectionRef} id="top" aria-label="Hero" className="relative overflow-hidden">
      <motion.div style={{ opacity: heroOpacity }} className="will-transform">
        <Container className="grid min-h-[88vh] grid-cols-1 items-center gap-8 pb-10 pt-24 sm:min-h-screen sm:pt-28 lg:grid-cols-2 lg:gap-12 lg:pb-0 lg:pt-20 3xl:gap-16">

          {/* ── Left — wordmark, shifted to the left ── */}
          <div className="flex flex-col items-center gap-[clamp(0.75rem,2vw,1.5rem)] text-center lg:order-1 lg:-ml-[clamp(0.5rem,2.5vw,3rem)] lg:items-start lg:text-left">
            {/* 1. Experience label */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="select-none text-[clamp(1.25rem,3.5vw,1.75rem)] leading-[1.15] font-extralight normal-case text-navy-900"
              style={{ fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif' }}
            >
              Experience
            </motion.p>

            {/* 2. ELOMA canvas */}
            <motion.div
              style={{ scale: canvasScale, opacity: canvasOpacity }}
              className="will-transform aspect-[7/2] w-full origin-center lg:origin-left"
            >
              <canvas ref={elomaCanvasRef} aria-hidden="true" className="h-full w-full" />
            </motion.div>

            {/* 3. Group label */}
            <motion.p
              style={{ scale: canvasScale, opacity: canvasOpacity, fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif' }}
              className="will-transform select-none text-[clamp(1.25rem,3.5vw,1.75rem)] leading-[1.15] font-extralight normal-case text-navy-900 lg:origin-left"
            >
              Group
            </motion.p>
          </div>

          {/* ── Right — interactive Spline model (crystal-clear render) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative h-[clamp(18rem,58vw,26rem)] w-full lg:order-2 lg:h-[min(82vh,46rem)]"
          >
            {heroSeen && (
              <SplineScene
                scene="https://prod.spline.design/Oq4lYkpzOO6mDc23/scene.splinecode"
                pixelRatio={2}
                onLoad={(app) => {
                  splineAppRef.current = app;
                  if (!heroVisible) app.stop();
                }}
                className="absolute inset-0 h-full w-full"
              />
            )}
          </motion.div>

        </Container>
      </motion.div>
    </section>
  );
}
