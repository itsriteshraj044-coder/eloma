import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 12 — "The Mainboard".
 * The group as a motherboard: an ELOMA core processor in the centre with
 * copper traces running out to six module chips. Data pulses travel every
 * trace on loop (SVG animateMotion, hidden under reduced motion); selecting
 * a module lights its trace and opens the module spec sheet below.
 * Below lg the board becomes a single-column module list.
 */

const VIEW_W = 1200;
const VIEW_H = 440;

/** Manhattan traces: CPU edge → module. Index order matches BUSINESSES. */
const TRACES = [
  'M 520 190 L 400 190 L 400 90 L 230 90',    // left top
  'M 520 220 L 230 220',                       // left middle
  'M 520 250 L 400 250 L 400 350 L 230 350',  // left bottom
  'M 680 190 L 800 190 L 800 90 L 970 90',    // right top
  'M 680 220 L 970 220',                       // right middle
  'M 680 250 L 800 250 L 800 350 L 970 350',  // right bottom
];

const MODULES = [
  { x: 230, y: 90, side: 'left' },
  { x: 230, y: 220, side: 'left' },
  { x: 230, y: 350, side: 'left' },
  { x: 970, y: 90, side: 'right' },
  { x: 970, y: 220, side: 'right' },
  { x: 970, y: 350, side: 'right' },
] as const;

const AUTO_MS = 5000;

export function BusinessCircuit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoTour, setAutoTour] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (!autoTour || !inView) return;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % BUSINESSES.length), AUTO_MS);
    return () => clearInterval(id);
  }, [autoTour, inView]);

  const select = (i: number) => {
    setActiveIndex(i);
    setAutoTour(false);
  };

  return (
    <section
      ref={sectionRef}
      id="business-circuit"
      aria-label="Our businesses — the mainboard"
      className="section-py relative overflow-hidden bg-white"
    >
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
            Concept 12 · The Mainboard
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">One circuit.</span>{' '}
            <span className="text-navy-900">Six modules.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── Desktop board ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="relative mt-10 hidden lg:block"
        >
          {/* The board surface */}
          <div className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-gradient-to-br from-white via-navy-50/30 to-emerald-50/30 shadow-glass">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-60" />
            {/* Corner screws */}
            {(['left-4 top-4', 'right-4 top-4', 'left-4 bottom-4', 'right-4 bottom-4'] as const).map((corner) => (
              <span
                key={corner}
                aria-hidden="true"
                className={cn('absolute h-3 w-3 rounded-full border border-navy-200 bg-white', corner)}
              />
            ))}

            <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
              <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                {/* Copper traces */}
                {TRACES.map((d, i) => (
                  <motion.path
                    key={`trace-${i}`}
                    d={d}
                    fill="none"
                    stroke="#9fb6cf"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.6 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE_PREMIUM }}
                  />
                ))}
                {/* Active trace lights up */}
                <motion.path
                  key={`active-${activeIndex}`}
                  d={TRACES[activeIndex]}
                  fill="none"
                  stroke="#3CB98C"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                />
                {/* Data pulses on every trace */}
                <g className="motion-reduce:hidden">
                  {TRACES.map((d, i) => (
                    <circle key={`pulse-${i}`} r="4" fill={i === activeIndex ? '#2c9d74' : '#6b8db3'}>
                      <animateMotion dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  ))}
                </g>
                {/* Solder pads at trace ends */}
                {TRACES.map((d, i) => {
                  const start = d.match(/^M (\d+) (\d+)/);
                  return start ? (
                    <circle key={`pad-${i}`} cx={start[1]} cy={start[2]} r="5" fill="#ffffff" stroke="#9fb6cf" strokeWidth="2" />
                  ) : null;
                })}
              </svg>

              {/* CPU — the group core */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className="absolute -inset-2 animate-pulse-glow rounded-[1.4rem] border border-emerald-200/70"
                />
                <div className="relative flex h-[clamp(96px,9vw,124px)] w-[clamp(120px,11vw,160px)] flex-col items-center justify-center rounded-2xl bg-navy-800 shadow-glass-lg">
                  <span className="text-base font-extrabold tracking-[0.14em] text-white">ELOMA</span>
                  <span className="mt-1 text-[9px] font-bold uppercase tracking-[2.5px] text-emerald-300">
                    Group Core
                  </span>
                </div>
              </div>

              {/* Module chips */}
              {BUSINESSES.map((business, i) => {
                const Icon = business.icon;
                const m = MODULES[i];
                const isActive = i === activeIndex;
                return (
                  <div
                    key={business.id}
                    style={{ left: `${(m.x / VIEW_W) * 100}%`, top: `${(m.y / VIEW_H) * 100}%` }}
                    className={cn(
                      'absolute -translate-y-1/2',
                      m.side === 'left' ? '-translate-x-full' : 'translate-x-0',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={isActive}
                      aria-label={`Show ${business.title}`}
                      className={cn(
                        'will-transform group flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 outline-none transition-[border-color,transform,background-color] duration-300 ease-premium focus-visible:ring-2 focus-visible:ring-emerald-400',
                        isActive
                          ? 'scale-105 border-emerald-300 bg-white shadow-glow-emerald'
                          : 'border-navy-200 bg-white/90 shadow-glass hover:scale-[1.03] hover:border-emerald-200',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-300',
                          isActive ? 'bg-emerald-500 text-white' : 'bg-navy-50 text-navy-500 group-hover:text-emerald-600',
                        )}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="flex flex-col items-start">
                        <span className="text-[10px] font-bold tracking-[1.5px] text-navy-300">
                          MOD-{business.index}
                        </span>
                        <span className="whitespace-nowrap text-[13px] font-semibold capitalize leading-tight text-navy-800">
                          {business.title}
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Module spec sheet ── */}
          <div className="mx-auto mt-6 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                className="will-transform relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-glass sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                  <div className="flex items-center gap-4 sm:col-span-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                        Module MOD-{active.index}
                      </p>
                      <h3 className="mt-0.5 text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900">
                        {active.title}
                      </h3>
                      <p className="mt-0.5 text-[13px] font-normal text-emerald-600">{active.tagline}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-sm leading-relaxed text-navy-500">{active.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      {active.features.map((feature) => (
                        <span
                          key={feature}
                          className="flex items-center gap-1.5 rounded-full bg-navy-50/80 px-2.5 py-1 text-xs font-normal text-navy-600"
                        >
                          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          {feature}
                        </span>
                      ))}
                      <span className="ml-auto inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                        Discover more
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Mobile / tablet: module list ── */}
        <motion.ul
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:hidden"
        >
          {BUSINESSES.map((business) => {
            const Icon = business.icon;
            return (
              <motion.li
                key={business.id}
                variants={fadeUp}
                className="flex h-full flex-col rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-glass"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-emerald-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-[10px] font-bold tracking-[1.5px] text-navy-300">
                    MOD-{business.index}
                  </span>
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
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
