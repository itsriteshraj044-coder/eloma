import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 11 — "The Root System".
 * The group as a living tree: the Eloma trunk at the base and six branches
 * growing up to the divisions. Branches draw themselves in on scroll, an
 * emerald sap pulse rides the active branch, and selecting a leaf opens its
 * dossier. Below lg the tree becomes a simple card grid (the transit
 * concept already owns the vertical-timeline treatment).
 */

const VIEW_W = 1200;
const VIEW_H = 560;
const ROOT = { x: 600, y: 492 };
const LEAVES = [
  { x: 140, y: 208 },
  { x: 326, y: 128 },
  { x: 512, y: 88 },
  { x: 688, y: 88 },
  { x: 874, y: 128 },
  { x: 1060, y: 208 },
];

/** Branch curve: trunk base → leaf, rising vertically then bending out. */
function branchD(leaf: { x: number; y: number }): string {
  return `M ${ROOT.x} ${ROOT.y} C ${ROOT.x} ${ROOT.y - 190}, ${leaf.x} ${leaf.y + 190}, ${leaf.x} ${leaf.y}`;
}

const BRANCHES = LEAVES.map(branchD);
const AUTO_MS = 5000;

export function BusinessRoots() {
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
      id="business-roots"
      aria-label="Our businesses — the root system"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-[12%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
        <div className="absolute -bottom-24 right-[14%] h-80 w-80 rounded-full bg-navy-50/80 blur-3xl" />
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
            Concept 11 · The Root System
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">One root.</span>{' '}
            <span className="text-navy-900">Six branches.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── Desktop tree ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="relative mt-8 hidden lg:block"
        >
          <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
            <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              {/* Ground line */}
              <line
                x1="320" y1={ROOT.y + 36} x2="880" y2={ROOT.y + 36}
                stroke="#d3deea" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 14"
              />
              {/* Branches grow in, staggered */}
              {BRANCHES.map((d, i) => (
                <motion.path
                  key={`base-${i}`}
                  d={d}
                  fill="none"
                  stroke="#d3deea"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE_PREMIUM }}
                />
              ))}
              {/* Active branch lights up */}
              <motion.path
                key={`active-${activeIndex}`}
                d={BRANCHES[activeIndex]}
                fill="none"
                stroke="#3CB98C"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: EASE_PREMIUM }}
              />
              {/* Sap pulse riding the active branch */}
              <g key={`sap-${activeIndex}`} className="motion-reduce:hidden">
                <circle r="8" fill="#3CB98C" opacity="0.25">
                  <animateMotion dur="2.6s" repeatCount="indefinite" path={BRANCHES[activeIndex]} />
                </circle>
                <circle r="4" fill="#2c9d74">
                  <animateMotion dur="2.6s" repeatCount="indefinite" path={BRANCHES[activeIndex]} />
                </circle>
              </g>
            </svg>

            {/* Trunk badge — the group */}
            <div
              style={{ left: `${(ROOT.x / VIEW_W) * 100}%`, top: `${(ROOT.y / VIEW_H) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-ping rounded-full bg-emerald-200/50 [animation-duration:3.2s]"
              />
              <span className="relative grid h-[clamp(84px,7vw,108px)] w-[clamp(84px,7vw,108px)] place-items-center rounded-full border border-emerald-200 bg-white shadow-glass-lg">
                <span className="flex flex-col items-center">
                  <span className="text-sm font-extrabold tracking-[0.12em] text-navy-900">ELOMA</span>
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[2px] text-emerald-600">
                    Shared root
                  </span>
                </span>
              </span>
            </div>

            {/* Leaves — the divisions */}
            {BUSINESSES.map((business, i) => {
              const Icon = business.icon;
              const pos = LEAVES[i];
              const isActive = i === activeIndex;
              return (
                <div
                  key={business.id}
                  style={{ left: `${(pos.x / VIEW_W) * 100}%`, top: `${(pos.y / VIEW_H) * 100}%` }}
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
                          ? 'border-emerald-400 bg-emerald-500 text-white shadow-glow-emerald'
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

          {/* Active branch dossier */}
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
                        Branch {active.index}
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

        {/* ── Mobile / tablet: compact branch cards ── */}
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {BUSINESSES.map((business) => {
            const Icon = business.icon;
            return (
              <motion.article
                key={business.id}
                variants={fadeUp}
                className="relative flex h-full flex-col rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-glass"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-0 h-5 w-1 -translate-y-full rounded-b-none rounded-t-full bg-emerald-300"
                />
                <div className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-50 text-emerald-600">
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
          })}
        </motion.div>
      </Container>
    </section>
  );
}
