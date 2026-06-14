import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 04 — "Group Dossier".
 * Enterprise-gateway pattern: a numbered tab rail on the left with a sliding
 * active pill (layoutId — transform-based) and an auto-advancing emerald
 * progress bar; the stage on the right presents one business at a time as a
 * formal dossier sheet. Hovering pauses the tour. Below lg the rail becomes
 * a horizontal scroll of numbered tabs.
 */

const ADVANCE_MS = 6000;

export function BusinessDossier() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;
  const running = inView && !paused;

  // Auto-advance while in view and not hovered.
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % BUSINESSES.length);
    }, ADVANCE_MS);
    return () => clearTimeout(id);
  }, [running, activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="business-dossier"
      aria-label="Our businesses — group dossier"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-[14%] h-72 w-72 rounded-full bg-navy-50/90 blur-3xl" />
        <div className="absolute -bottom-24 right-[10%] h-80 w-80 rounded-full bg-emerald-50 blur-3xl" />
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
              Concept 04 · Group Dossier
            </motion.span>
            <motion.span variants={fadeUp} className="eyebrow mt-4 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The Business Universe
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
            >
              <span className="text-emerald-500">The group,</span>{' '}
              <span className="text-navy-900">on file.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-body-fluid text-navy-500 lg:col-span-5">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8 3xl:gap-10"
        >

          {/* ── Tab rail ── */}
          <div
            role="tablist"
            aria-label="Businesses"
            aria-orientation="vertical"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {BUSINESSES.map((business, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={business.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'relative flex min-h-11 shrink-0 cursor-pointer items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-emerald-400 lg:px-5 lg:py-4',
                    isActive ? 'text-white' : 'text-navy-600 hover:bg-navy-50/70',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="dossier-active-pill"
                      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                      className="absolute inset-0 rounded-2xl bg-navy-800"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      'relative text-xs font-bold tracking-[2px]',
                      isActive ? 'text-emerald-300' : 'text-emerald-600',
                    )}
                  >
                    {business.index}
                  </span>
                  <span className="relative whitespace-nowrap text-sm font-semibold capitalize lg:text-base">
                    {business.title}
                  </span>
                  {/* Auto-advance progress — transform-only scaleX */}
                  {isActive && running && (
                    <motion.span
                      key={`progress-${activeIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: ADVANCE_MS / 1000, ease: 'linear' }}
                      className="will-transform absolute inset-x-4 bottom-1.5 h-0.5 origin-left rounded-full bg-emerald-400/80 lg:inset-x-5"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Dossier stage ── */}
          <div className="relative lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                role="tabpanel"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                className="will-transform relative h-full overflow-hidden rounded-[2rem] border border-navy-100 bg-gradient-to-br from-white to-navy-50/50 p-6 shadow-glass sm:p-8 lg:min-h-[420px] 3xl:p-10"
              >
                {/* Ghost numeral */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-10 right-4 select-none text-[clamp(7rem,13vw,12rem)] font-extrabold leading-none tracking-tighter text-navy-900 opacity-[0.04]"
                >
                  {active.index}
                </span>

                {/* File header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100/80 pb-5">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-emerald-600 shadow-glass 3xl:h-14 3xl:w-14">
                      <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                        Division file · {active.index}/0{BUSINESSES.length}
                      </p>
                      <h3 className="mt-0.5 text-[clamp(1.3rem,1.9vw,1.65rem)] font-normal capitalize leading-tight text-navy-900">
                        {active.title}
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-700">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active division
                  </span>
                </div>

                <p className="relative mt-5 text-sm font-normal text-emerald-600">{active.tagline}</p>
                <p className="relative mt-2 max-w-2xl text-sm leading-relaxed text-navy-500 3xl:text-base">
                  {active.description}
                </p>

                {/* Capability checklist */}
                <div className="relative mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
                  {active.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-2.5 text-sm text-navy-700">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {feature}
                    </span>
                  ))}
                </div>

                <span className="relative mt-7 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                  Discover more
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </motion.article>
            </AnimatePresence>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
