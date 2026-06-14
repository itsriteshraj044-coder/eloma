import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

const ADVANCE_MS = 8000;

/** Per-pillar current behaviour: how the field flows for each chapter. */
const MODE_SPEED = [34, 44, 40, 52];
const MODE_TURB = [0.55, 0.45, 0.95, 0.28];

function modeAngle(mode: number, x: number, y: number, w: number, h: number, n: number) {
  switch (mode) {
    case 0: // The Root — streams converge and sink
      return Math.PI / 2 + (w / 2 - x) * 0.0004 + n * MODE_TURB[0];
    case 1: // The Branches — fan outward from one trunk
      return Math.atan2(y - h * 1.15, x - w / 2) + n * MODE_TURB[1];
    case 2: // The Canopy — wide horizontal weather
      return n * MODE_TURB[2];
    default: // The Horizon — a calm lift toward light
      return -Math.PI * 0.13 + n * MODE_TURB[3];
  }
}

function lerpAngle(a: number, b: number, t: number) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}

interface FieldParticle {
  x: number;
  y: number;
  life: number;
  color: string;
}

/**
 * "Currents" — a living generative centerpiece, not a layout. Hundreds of
 * fine emerald streamlines flow across a white field like wind made visible;
 * each chapter re-teaches the field its motion (sinking roots, fanning
 * branches, weathered canopy, rising horizon) and the streams retrain
 * mid-flight. The cursor bends the flow around it. Pure canvas — the same
 * craft language as the hero globe.
 */
export function SustainCurrents() {
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bandRef, { amount: 0.25 });
  const inViewRef = useRef(false);
  const modeRef = useRef({ from: 0, to: 0, blend: 1 });
  const mouseRef = useRef({ x: -9999, y: -9999 });

  inViewRef.current = inView;

  const select = (i: number) => {
    if (i === active) return;
    const m = modeRef.current;
    m.from = m.to;
    m.to = i;
    m.blend = 0;
    setActive(i);
  };

  /* Auto-advance, paused while the visitor engages or the band is offscreen */
  useEffect(() => {
    if (!inView || engaged) return;
    const id = setInterval(() => {
      const next = (modeRef.current.to + 1) % PILLARS.length;
      modeRef.current.from = modeRef.current.to;
      modeRef.current.to = next;
      modeRef.current.blend = 0;
      setActive(next);
    }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [inView, engaged, active]);

  /* The field */
  useEffect(() => {
    const canvas = canvasRef.current;
    const band = bandRef.current;
    if (!canvas || !band) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = band.clientWidth;
      h = band.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(band);

    const onPointer = (e: PointerEvent) => {
      const r = band.getBoundingClientRect();
      mouseRef.current.x = e.clientX - r.left;
      mouseRef.current.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    band.addEventListener('pointermove', onPointer);
    band.addEventListener('pointerleave', onLeave);

    const count = Math.min(640, Math.max(260, Math.round((w * h) / 3400)));
    const particles: FieldParticle[] = Array.from({ length: count }, () => ({
      x: Math.random() * (w || 1200),
      y: Math.random() * (h || 600),
      life: 40 + Math.random() * 200,
      color:
        Math.random() < 0.82
          ? 'rgba(5, 150, 105, 0.26)' // emerald stream
          : 'rgba(15, 42, 86, 0.14)', // navy undertow
    }));

    let raf = 0;
    let last = performance.now();
    let t = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!inViewRef.current || reduced) return;
      t += dt;

      const m = modeRef.current;
      if (m.blend < 1) m.blend = Math.min(1, m.blend + dt * 0.7);
      const blend = m.blend * m.blend * (3 - 2 * m.blend); // smoothstep

      // Trails: a faint white veil each frame turns motion into streamlines
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.lineWidth = 1;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const n =
          Math.sin(p.x * 0.0021 + t * 0.42) * Math.cos(p.y * 0.0018 - t * 0.31) +
          Math.sin((p.x + p.y) * 0.001 + t * 0.18);

        let angle = lerpAngle(
          modeAngle(m.from, p.x, p.y, w, h, n),
          modeAngle(m.to, p.x, p.y, w, h, n),
          blend,
        );

        // The cursor bends the current around itself
        const dx = p.x - mx;
        const dy = p.y - my;
        const md = dx * dx + dy * dy;
        if (md < 16900) {
          const push = 1 - Math.sqrt(md) / 130;
          angle = lerpAngle(angle, Math.atan2(dy, dx), push * 0.8);
        }

        const speed = (MODE_SPEED[m.from] + (MODE_SPEED[m.to] - MODE_SPEED[m.from]) * blend) * dt;
        const nx = p.x + Math.cos(angle) * speed;
        const ny = p.y + Math.sin(angle) * speed;

        ctx.strokeStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.life -= 1;

        if (p.life <= 0 || p.x < -8 || p.x > w + 8 || p.y < -8 || p.y > h + 8) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.life = 40 + Math.random() * 200;
        }
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      band.removeEventListener('pointermove', onPointer);
      band.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const pillar = PILLARS[active];

  return (
    <section
      id="sustain-currents"
      aria-label="Why we exist — currents"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container>
        <SectionHeading
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth
              <br />
              <span className="text-emerald-500">and Responsible Business</span>
            </>
          }
          titleClassName="normal-case font-normal tracking-normal"
          description={SUSTAINABILITY.body}
        />
      </Container>

      {/* The field — full-bleed living canvas */}
      <div
        ref={bandRef}
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        className="relative mt-10 h-[clamp(540px,80vh,780px)] w-full lg:mt-14"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        {/* Soft blends into the page above and below */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"
          aria-hidden="true"
        />
        {/* A calm pool behind the words */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[min(92vw,880px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.92),rgba(255,255,255,0))]"
          aria-hidden="true"
        />

        {/* The chapter */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.7, ease: EASE_PREMIUM }}
              className="max-w-2xl text-center"
            >
              <p className="text-eyebrow-fluid uppercase tracking-[3.5px] text-emerald-600">
                {pillar.subtitle}
              </p>
              <h3 className="mt-5 text-[clamp(2.4rem,4.4vw,4.2rem)] font-light leading-[1.08] tracking-[-0.015em] text-navy-900">
                {pillar.title}
              </h3>
              <p className="mx-auto mt-6 max-w-xl text-body-fluid text-navy-500">
                {pillar.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Chapter nav — bare words, an emerald breath beneath the current one */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center px-4 sm:bottom-9">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-3">
            {PILLARS.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => select(i)}
                aria-pressed={i === active}
                className="group relative px-3 py-2.5 sm:px-4"
              >
                <span
                  className={cn(
                    'text-[clamp(0.8rem,0.95vw,1rem)] font-medium tracking-wide transition-colors duration-500',
                    i === active ? 'text-navy-900' : 'text-navy-400 hover:text-navy-700',
                  )}
                >
                  {p.title}
                </span>
                <span
                  className={cn(
                    'absolute inset-x-3 bottom-0.5 h-px origin-left bg-emerald-500 transition-transform duration-700 ease-premium sm:inset-x-4',
                    i === active ? 'scale-x-100' : 'scale-x-0',
                  )}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
