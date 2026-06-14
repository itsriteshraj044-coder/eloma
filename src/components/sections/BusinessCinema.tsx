import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

/**
 * Concept 06 — "The Rail".
 * A pinned cinematic journey: the section pins for ~4 screen heights and
 * vertical scroll travels sideways through six full-bleed division slides
 * (position: sticky + translateX from useScroll — transform only, runs
 * through the global Lenis scroll). Below lg it degrades to a native
 * snap-scroll carousel with no pinning.
 */

const SLIDE_VW = 58; // slide width in vw
const GAP_VW = 3;
const STEP_VW = SLIDE_VW + GAP_VW;
const N = BUSINESSES.length;

function Slide({ business, compact = false }: { business: Business; compact?: boolean }) {
  const Icon = business.icon;
  return (
    <article
      className={
        compact
          ? 'relative flex h-full w-[85vw] max-w-[420px] shrink-0 snap-center flex-col overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-glass'
          : 'relative flex h-[clamp(380px,56vh,580px)] w-[58vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-8 shadow-glass-lg 3xl:p-12'
      }
    >
      {/* Ghost numeral fills the slide like a film frame marker */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-2 select-none text-[clamp(8rem,22vw,20rem)] font-extrabold leading-none tracking-tighter text-navy-900 opacity-[0.04]"
      >
        {business.index}
      </span>

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600 3xl:h-14 3xl:w-14">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-navy-300">
            Frame {business.index} / 0{N}
          </span>
        </div>
        <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2.1rem)] font-normal capitalize leading-tight text-navy-900">
          {business.title}
        </h3>
        <p className="mt-1.5 text-sm font-normal text-emerald-600 3xl:text-base">{business.tagline}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-500 3xl:text-base">
          {business.description}
        </p>
      </div>

      <div className="relative mt-6">
        <div className="flex flex-wrap gap-1.5">
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
        <span className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
          Discover more
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

function CinemaHeader() {
  return (
    <motion.div
      variants={staggerParent(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="flex flex-col items-start gap-4"
    >
      <motion.span
        variants={fadeUp}
        className="text-[11px] font-bold uppercase tracking-[2.5px] text-navy-300"
      >
        Concept 06 · The Rail
      </motion.span>
      <motion.span variants={fadeUp} className="eyebrow w-fit">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        The Business Universe
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
      >
        <span className="text-emerald-500">Scroll down,</span>{' '}
        <span className="text-navy-900">travel sideways.</span>
      </motion.h2>
      <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
        {BUSINESS_UNIVERSE.description}
      </motion.p>
    </motion.div>
  );
}

export function BusinessCinema() {
  const railRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(N - 1) * STEP_VW}vw`]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    if (next !== frame) setFrame(next);
  });

  return (
    <section id="business-cinema" aria-label="Our businesses — the rail" className="relative bg-white">

      {/* ── Desktop: pinned horizontal journey ── */}
      <div ref={railRef} className="relative hidden lg:block lg:h-[400vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* Ambient backdrop */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-20" />
            <div className="absolute -top-24 left-[20%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
            <div className="absolute bottom-[-6rem] right-[10%] h-80 w-80 rounded-full bg-navy-50/80 blur-3xl" />
          </div>

          <Container className="relative w-full">
            <CinemaHeader />
          </Container>

          {/* Travelling track */}
          <motion.div
            style={{ x }}
            className="will-transform relative mt-10 flex gap-[3vw] pl-[max(3rem,calc((100vw-110rem)/2+3rem))]"
          >
            {BUSINESSES.map((business) => (
              <Slide key={business.id} business={business} />
            ))}
          </motion.div>

          {/* Journey progress */}
          <Container className="relative mt-8 w-full">
            <div className="flex items-center gap-5">
              <span className="text-sm font-bold tracking-[2px] text-navy-400 tabular-nums">
                {BUSINESSES[frame].index} <span className="text-navy-200">/ 0{N}</span>
              </span>
              <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-navy-100">
                <motion.span
                  style={{ scaleX: scrollYProgress }}
                  className="will-transform absolute inset-0 origin-left rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
              </div>
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-navy-300">
                {BUSINESSES[frame].title}
              </span>
            </div>
          </Container>
        </div>
      </div>

      {/* ── Mobile / tablet: native snap carousel ── */}
      <div className="section-py lg:hidden">
        <Container>
          <CinemaHeader />
        </Container>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(0.75rem,4vw,1.5rem)] pb-4">
          {BUSINESSES.map((business) => (
            <Slide key={business.id} business={business} compact />
          ))}
        </div>
      </div>

    </section>
  );
}
