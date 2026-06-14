import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

/**
 * Concept 09 — "The Carousel".
 * A true 3D ring: six cards on a circle (rotateY + translateZ), slowly
 * revolving, drag to spin, dots to snap. The frontmost card's dossier is
 * presented beneath the ring. Transform-only, driven by a single rotation
 * MotionValue via useAnimationFrame. Reduced motion disables auto-spin.
 * Below lg the ring becomes a flat card grid.
 */

const N = BUSINESSES.length;
const STEP = 360 / N;
const SPIN_DEG_PER_MS = -0.0038; // slow clockwise drift

function shortestTo(target: number, current: number) {
  const diff = ((target - current) % 360 + 540) % 360 - 180;
  return current + diff;
}

function RingCard({
  business,
  index,
  radius,
  rotation,
}: {
  business: Business;
  index: number;
  radius: number;
  rotation: MotionValue<number>;
}) {
  const Icon = business.icon;
  // Dim cards as they swing toward the sides/back.
  const opacity = useTransform(rotation, (r) => {
    const a = ((index * STEP + r) % 360 + 360) % 360;
    const d = Math.min(a, 360 - a);
    return d >= 100 ? 0 : 1 - (d / 100) * 0.55;
  });

  return (
    <motion.div
      style={{
        transform: `rotateY(${index * STEP}deg) translateZ(${radius}px)`,
        opacity,
      }}
      className="absolute left-1/2 top-1/2 h-[clamp(280px,30vh,340px)] w-[clamp(230px,18vw,300px)] -translate-x-1/2 -translate-y-1/2 [backface-visibility:hidden]"
    >
      <article className="flex h-full w-full flex-col rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-glass-lg">
        <div className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-xs font-bold tracking-[2px] text-navy-300">{business.index}</span>
        </div>
        <h3 className="mt-4 text-[clamp(1.1rem,1.3vw,1.3rem)] font-normal capitalize leading-tight text-navy-900">
          {business.title}
        </h3>
        <p className="mt-1 text-[13px] font-normal leading-snug text-emerald-600">{business.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          {business.features.slice(0, 2).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-navy-50/80 px-2.5 py-1 text-[11px] font-medium text-navy-600"
            >
              {feature}
            </span>
          ))}
        </div>
      </article>
    </motion.div>
  );
}

/** Flat card for the mobile/tablet fallback. */
function FlatCard({ business }: { business: Business }) {
  const Icon = business.icon;
  return (
    <motion.article
      variants={fadeUp}
      className="flex h-full flex-col rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-glass"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-xs font-bold tracking-[2px] text-navy-300">{business.index}</span>
      </div>
      <h3 className="mt-4 text-[clamp(1.15rem,4vw,1.35rem)] font-normal capitalize leading-tight text-navy-900">
        {business.title}
      </h3>
      <p className="mt-1 text-[13px] font-normal text-emerald-600">{business.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">{business.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {business.features.map((feature) => (
          <span
            key={feature}
            className="flex items-center gap-1.5 rounded-full bg-navy-50/80 px-2.5 py-1 text-xs font-normal text-navy-600"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            {feature}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function BusinessRing() {
  const rotation = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const [frontIndex, setFrontIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [radius, setRadius] = useState(380);

  const stageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartRot = useRef(0);

  // Radius follows the stage width so the ring breathes with the viewport.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setRadius(Math.min(470, Math.max(280, w * 0.31)));
    });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Ambient revolve.
  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current || reducedMotion) return;
    rotation.set(rotation.get() + delta * SPIN_DEG_PER_MS);
  });

  useMotionValueEvent(rotation, 'change', (r) => {
    const idx = ((Math.round(-r / STEP) % N) + N) % N;
    if (idx !== frontIndex) setFrontIndex(idx);
  });

  const snapTo = (i: number) => {
    isDragging.current = false;
    animate(rotation, shortestTo(-i * STEP, rotation.get()), {
      duration: 0.8,
      ease: EASE_PREMIUM,
    });
  };

  const front = BUSINESSES[frontIndex];
  const FrontIcon = front.icon;

  return (
    <section
      id="business-ring"
      aria-label="Our businesses — the carousel"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-[16%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
        <div className="absolute -bottom-24 right-[12%] h-80 w-80 rounded-full bg-navy-50/80 blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col items-center gap-4 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-bold uppercase tracking-[2.5px] text-navy-300"
          >
            Concept 09 · The Carousel
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">A universe</span>{' '}
            <span className="text-navy-900">in rotation.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── Desktop 3D ring ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.9, ease: EASE_PREMIUM }}
          className="hidden lg:block"
        >
          <div
            ref={stageRef}
            role="group"
            aria-label="Rotating business carousel — drag to spin"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              isDragging.current = false;
            }}
            onPointerDown={(e) => {
              isDragging.current = true;
              dragStartX.current = e.clientX;
              dragStartRot.current = rotation.get();
            }}
            onPointerMove={(e) => {
              if (!isDragging.current) return;
              rotation.set(dragStartRot.current + (e.clientX - dragStartX.current) * 0.25);
            }}
            onPointerUp={() => snapTo(frontIndex)}
            className="relative mx-auto mt-6 h-[clamp(360px,44vh,460px)] w-full max-w-6xl cursor-grab touch-none select-none active:cursor-grabbing [perspective:1600px]"
          >
            <motion.div
              style={{ rotateY: rotation }}
              className="will-transform absolute inset-0 [transform-style:preserve-3d]"
            >
              {BUSINESSES.map((business, i) => (
                <RingCard
                  key={business.id}
                  business={business}
                  index={i}
                  radius={radius}
                  rotation={rotation}
                />
              ))}
            </motion.div>
          </div>

          {/* Snap dots */}
          <div className="mt-2 flex justify-center gap-2">
            {BUSINESSES.map((business, i) => (
              <button
                key={business.id}
                type="button"
                onClick={() => snapTo(i)}
                aria-label={`Rotate to ${business.title}`}
                aria-pressed={i === frontIndex}
                className="grid h-11 w-8 cursor-pointer place-items-center outline-none focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-400 ease-premium',
                    i === frontIndex ? 'w-6 bg-emerald-400' : 'w-1.5 bg-navy-200',
                  )}
                />
              </button>
            ))}
          </div>

          {/* Front card dossier */}
          <div className="mx-auto mt-6 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={front.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                className="will-transform rounded-[1.5rem] border border-navy-100 bg-white/95 p-6 text-center shadow-glass"
              >
                <p className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600">
                  <FrontIcon className="h-4 w-4" aria-hidden="true" />
                  {front.title} · {front.tagline}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{front.description}</p>
                <span className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                  Discover more
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Mobile / tablet: flat grid ── */}
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {BUSINESSES.map((business) => (
            <FlatCard key={business.id} business={business} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
