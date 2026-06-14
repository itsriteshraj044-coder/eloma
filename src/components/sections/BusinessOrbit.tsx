import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 01 — "Orbital Atlas".
 * The universe metaphor made literal: an Eloma core with the six businesses
 * as nodes on an orbit ring. Selecting a node (or letting the auto-tour run)
 * draws a connection line to the core and reveals the dossier on the right.
 * Below lg the orbit collapses into a horizontal chip selector.
 */

const ORBIT_RADIUS = 41; // % of the square stage
const NODE_POSITIONS = BUSINESSES.map((_, i) => {
  const angle = ((-90 + i * (360 / BUSINESSES.length)) * Math.PI) / 180;
  return { x: 50 + ORBIT_RADIUS * Math.cos(angle), y: 50 + ORBIT_RADIUS * Math.sin(angle) };
});

const AUTO_TOUR_MS = 4500;

export function BusinessOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoTour, setAutoTour] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;
  const activePos = NODE_POSITIONS[activeIndex];

  // Auto-tour the orbit while the section is in view; stops on first manual pick.
  useEffect(() => {
    if (!autoTour || !inView) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % BUSINESSES.length);
    }, AUTO_TOUR_MS);
    return () => clearInterval(id);
  }, [autoTour, inView]);

  const select = (index: number) => {
    setActiveIndex(index);
    setAutoTour(false);
  };

  return (
    <section
      ref={sectionRef}
      id="business-orbit"
      aria-label="Our businesses — orbital atlas"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Ambient backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_70%_60%_at_35%_50%,black_20%,transparent_75%)]" />
        <div className="absolute -top-32 left-[10%] h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />
        <div className="absolute -bottom-28 right-[8%] h-72 w-72 rounded-full bg-navy-50/90 blur-3xl" />
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
            Concept 01 · Orbital Atlas
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">One core.</span>{' '}
            <span className="text-navy-900">Six orbits.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-8 2xl:gap-12">

          {/* ── Orbit stage (lg+) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.9, ease: EASE_PREMIUM }}
            className="relative hidden lg:col-span-6 lg:block"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[clamp(420px,38vw,640px)]">

              {/* Static orbit rings */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full border border-navy-100" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-[18%] rounded-full border border-navy-100/70" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-[33%] rounded-full border border-navy-50" />

              {/* Slow rotating dashed ring — ambient loop */}
              <div
                aria-hidden="true"
                className="will-transform pointer-events-none absolute inset-[9%] animate-spin rounded-full border border-dashed border-emerald-200/80 [animation-duration:48s]"
              />

              {/* Connection line core → active node */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <motion.line
                  key={active.id}
                  x1="50"
                  y1="50"
                  x2={activePos.x}
                  y2={activePos.y}
                  stroke="#3CB98C"
                  strokeWidth="0.4"
                  strokeDasharray="2 1.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                />
              </svg>

              {/* Core hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-emerald-200/50 [animation-duration:3.2s]" />
                <span className="relative grid h-[clamp(96px,9vw,132px)] w-[clamp(96px,9vw,132px)] place-items-center rounded-full border border-emerald-200 bg-white shadow-glass-lg">
                  <span className="flex flex-col items-center">
                    <span className="text-base font-extrabold tracking-[0.12em] text-navy-900">ELOMA</span>
                    <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[2px] text-emerald-600">Group</span>
                  </span>
                </span>
              </div>

              {/* Business nodes */}
              {BUSINESSES.map((business, i) => {
                const Icon = business.icon;
                const pos = NODE_POSITIONS[i];
                const isActive = i === activeIndex;
                return (
                  <div
                    key={business.id}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={isActive}
                      aria-label={`Show ${business.title}`}
                      className={cn(
                        'will-transform group flex cursor-pointer flex-col items-center gap-1.5 outline-none transition-transform duration-300 ease-premium focus-visible:scale-110',
                        isActive ? 'scale-110' : 'hover:scale-105',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-12 w-12 place-items-center rounded-full border transition-colors duration-300 3xl:h-14 3xl:w-14',
                          isActive
                            ? 'border-emerald-400 bg-navy-800 text-emerald-300 shadow-glow-emerald'
                            : 'border-navy-100 bg-white text-navy-500 shadow-glass group-hover:border-emerald-200 group-hover:text-emerald-600',
                        )}
                      >
                        <Icon className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
                      </span>
                      <span
                        className={cn(
                          'whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors duration-300',
                          isActive ? 'bg-emerald-50 text-emerald-700' : 'text-navy-400 group-hover:text-navy-600',
                        )}
                      >
                        {business.title}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Mobile / tablet selector chips ── */}
          <motion.div
            variants={staggerParent(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:hidden"
          >
            {BUSINESSES.map((business, i) => (
              <motion.button
                key={business.id}
                variants={fadeUp}
                type="button"
                onClick={() => select(i)}
                aria-pressed={i === activeIndex}
                className={cn(
                  'flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors duration-300',
                  i === activeIndex
                    ? 'border-navy-800 bg-navy-800 text-white'
                    : 'border-navy-100 bg-white text-navy-500',
                )}
              >
                <span className={cn('text-xs font-bold', i === activeIndex ? 'text-emerald-300' : 'text-emerald-600')}>
                  {business.index}
                </span>
                {business.title}
              </motion.button>
            ))}
          </motion.div>

          {/* ── Detail dossier ── */}
          <div className="relative lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                className="will-transform relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-glass sm:p-8 3xl:p-10"
              >
                {/* Ghost numeral */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 right-5 select-none text-[clamp(4.5rem,7vw,7rem)] font-extrabold leading-none tracking-tighter text-navy-900 opacity-[0.05]"
                >
                  {active.index}
                </span>

                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 3xl:h-14 3xl:w-14">
                    <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.25rem,1.8vw,1.6rem)] font-normal capitalize leading-tight text-navy-900">
                      {active.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-normal text-emerald-600">{active.tagline}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-navy-500 3xl:text-base">
                  {active.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {active.features.map((feature) => (
                    <span
                      key={feature}
                      className="flex items-center gap-1.5 rounded-full bg-navy-50/80 px-2.5 py-1 text-xs font-normal text-navy-600"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-navy-50 pt-5">
                  <span className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                    Discover more
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  {/* Tour dots */}
                  <span className="flex items-center gap-1.5" aria-hidden="true">
                    {BUSINESSES.map((b, i) => (
                      <span
                        key={b.id}
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-400 ease-premium',
                          i === activeIndex ? 'w-5 bg-emerald-400' : 'w-1.5 bg-navy-100',
                        )}
                      />
                    ))}
                  </span>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </section>
  );
}
