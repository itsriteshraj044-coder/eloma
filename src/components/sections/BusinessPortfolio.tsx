import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 16 — "The Portfolio".
 * Six divisions as a shelf of annual-report covers: formal print design —
 * masthead, rules, a photographic cover plate, a document footer with issue
 * line. Hovering a report lifts it off the shelf and opens its executive
 * summary beneath the grid (focus and tap do the same).
 */

const YEAR = '2026';

/** Cover photography — Unsplash CDN (hotlink-friendly), verified URLs. */
const COVER_IMAGES: Record<string, { src: string; alt: string }> = {
  'call-centre': {
    src: 'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=480&q=70',
    alt: 'Open-plan customer support floor with agents at workstations',
  },
  imports: {
    src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=480&q=70',
    alt: 'Container ships docked under port cranes',
  },
  'it-infrastructure': {
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=480&q=70',
    alt: 'Data centre server racks with network cabling',
  },
  'supply-chain': {
    src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=480&q=70',
    alt: 'Distribution warehouse with stocked racking',
  },
  travel: {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=480&q=70',
    alt: 'Aircraft wing above the clouds at sunset',
  },
  'virtual-security': {
    src: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=480&q=70',
    alt: 'Padlock resting on a computer keyboard',
  },
};

export function BusinessPortfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section
      id="business-portfolio"
      aria-label="Our businesses — the portfolio"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-[10%] h-72 w-72 rounded-full bg-navy-50/90 blur-3xl" />
        <div className="absolute -bottom-24 right-[12%] h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8"
        >
          <div className="lg:col-span-7">
            <motion.span
              variants={fadeUp}
              className="block text-[11px] font-bold uppercase tracking-[2.5px] text-navy-300"
            >
              Concept 16 · The Portfolio
            </motion.span>
            <motion.span variants={fadeUp} className="eyebrow mt-4 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The Business Universe
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
            >
              <span className="text-emerald-500">Four worlds.</span>{' '}
              <span className="text-navy-900">One universe.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-body-fluid text-navy-500 lg:col-span-5">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── The shelf ── */}
        <motion.div
          variants={staggerParent(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-6 3xl:gap-6"
        >
          {BUSINESSES.map((business, i) => {
            const isActive = i === activeIndex;
            const cover = COVER_IMAGES[business.id];
            return (
              <motion.button
                key={business.id}
                variants={fadeUp}
                type="button"
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                aria-pressed={isActive}
                aria-label={`Open ${business.title} report`}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                className={cn(
                  'will-transform group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-white p-4 text-left outline-none transition-[border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-emerald-400 sm:p-5',
                  isActive
                    ? 'border-emerald-300 shadow-glass-lg'
                    : 'border-navy-100 shadow-glass hover:border-navy-200',
                )}
              >
                {/* Spine */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-y-0 left-0 w-1.5 transition-colors duration-300',
                    isActive ? 'bg-emerald-400' : 'bg-navy-100 group-hover:bg-navy-200',
                  )}
                />

                {/* Masthead */}
                <span className="text-[9px] font-extrabold uppercase tracking-[2px] text-navy-400">
                  Eloma Group
                </span>
                <span aria-hidden="true" className="mt-2 block h-px w-full bg-navy-100" />
                <span aria-hidden="true" className="mt-0.5 block h-px w-2/3 bg-navy-100" />

                {/* Cover plate — photography with index badge */}
                <span className="relative mt-3 block overflow-hidden rounded-lg">
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    width={480}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      'aspect-[4/3] w-full object-cover transition-[filter] duration-500 ease-premium',
                      isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0',
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute bottom-1.5 right-1.5 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold tabular-nums transition-colors duration-300',
                      isActive ? 'bg-emerald-500 text-white' : 'bg-white/95 text-navy-700',
                    )}
                  >
                    {business.index}
                  </span>
                </span>

                {/* Title */}
                <span className="mt-3 block text-[clamp(0.85rem,1vw,1rem)] font-semibold capitalize leading-snug text-navy-900">
                  {business.title}
                </span>

                {/* Document footer */}
                <span aria-hidden="true" className="mt-auto block pt-4">
                  <span aria-hidden="true" className="block h-px w-full bg-navy-100" />
                  <span className="mt-2 flex items-center justify-between">
                    <span className="text-[8px] font-bold uppercase tracking-[1.5px] text-navy-300">
                      Division report
                    </span>
                    <span className="text-[8px] font-bold tabular-nums tracking-[1.5px] text-navy-300">
                      {YEAR}
                    </span>
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Executive summary of the open report ── */}
        <div className="mx-auto mt-8 max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_PREMIUM }}
              className="will-transform relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-glass sm:p-8"
            >
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                Report {active.index} · {YEAR} · Executive summary
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-12 sm:items-start">
                <div className="flex items-center gap-4 sm:col-span-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900">
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
                      Read the full report
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
