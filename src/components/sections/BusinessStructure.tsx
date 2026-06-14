import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 15 — "The Structure".
 * The classic corporate holding chart, drawn beautifully: the Eloma Group
 * parent entity on top, connector lines (scale transforms only) dropping to
 * six subsidiary cards in a row. Selecting an entity opens its corporate
 * brief below. Below lg the chart becomes an indented entity tree.
 */

const AUTO_MS = 5000;

export function BusinessStructure() {
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
      id="business-structure"
      aria-label="Our businesses — group structure"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-25 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black_25%,transparent_75%)]" />
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
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">Four worlds.</span>{' '}
            <span className="text-navy-900">One universe.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── Desktop chart ── */}
        <div className="mt-12 hidden lg:block">
          {/* Parent entity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="flex justify-center"
          >
            <div className="relative rounded-2xl border border-navy-200 bg-navy-800 px-10 py-5 text-center shadow-glass-lg">
              <p className="text-base font-extrabold tracking-[0.14em] text-white">ELOMA GROUP</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[2.5px] text-emerald-300">
                Parent · Holding entity
              </p>
            </div>
          </motion.div>

          {/* Connectors — scale transforms only */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.4, delay: 0.25, ease: EASE_PREMIUM }}
            className="mx-auto block h-9 w-px origin-top bg-navy-200"
          />
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE_PREMIUM }}
            className="mx-auto block h-px w-[calc(100%*5/6)] bg-navy-200"
          />

          {/* Subsidiary row */}
          <div className="grid grid-cols-6 gap-4 3xl:gap-5">
            {BUSINESSES.map((business, i) => {
              const Icon = business.icon;
              const isActive = i === activeIndex;
              return (
                <div key={business.id} className="flex flex-col">
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: 0.35, delay: 0.6 + i * 0.06, ease: EASE_PREMIUM }}
                    className="mx-auto block h-9 w-px origin-top bg-navy-200"
                  />
                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={VIEWPORT_ONCE}
                    transition={{ duration: 0.55, delay: 0.7 + i * 0.06, ease: EASE_PREMIUM }}
                    type="button"
                    onClick={() => select(i)}
                    onMouseEnter={() => select(i)}
                    onFocus={() => select(i)}
                    aria-pressed={isActive}
                    aria-label={`Show ${business.title}`}
                    className={cn(
                      'flex h-full min-h-11 cursor-pointer flex-col items-center rounded-2xl border px-3 py-5 text-center outline-none transition-[border-color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-emerald-400',
                      isActive
                        ? 'border-emerald-300 bg-emerald-50/70 shadow-glow-emerald'
                        : 'border-navy-100 bg-white shadow-glass hover:border-emerald-200 hover:bg-navy-50/40',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-10 w-10 place-items-center rounded-xl transition-colors duration-300',
                        isActive ? 'bg-emerald-500 text-white' : 'bg-navy-50 text-navy-500',
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="mt-3 text-[10px] font-bold tracking-[2px] text-navy-300">
                      {business.index}
                    </span>
                    <span className="mt-1 text-sm font-semibold capitalize leading-snug text-navy-800 xl:text-[15px]">
                      {business.title}
                    </span>
                    <span className="mt-1 hidden text-[11px] leading-snug text-navy-400 2xl:block">
                      {business.tagline}
                    </span>
                  </motion.button>
                </div>
              );
            })}
          </div>

          {/* ── Corporate brief ── */}
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
                <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                  <div className="flex items-center gap-4 sm:col-span-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                        Entity {active.index} · Wholly aligned
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
        </div>

        {/* ── Mobile / tablet: entity tree ── */}
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 lg:hidden"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-navy-200 bg-navy-800 px-6 py-4 text-center shadow-glass"
          >
            <p className="text-sm font-extrabold tracking-[0.14em] text-white">ELOMA GROUP</p>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[2.5px] text-emerald-300">
              Parent · Holding entity
            </p>
          </motion.div>

          <ul className="relative mt-2 list-none pl-6">
            <span aria-hidden="true" className="absolute bottom-12 left-3 top-0 w-px bg-navy-200" />
            {BUSINESSES.map((business) => {
              const Icon = business.icon;
              return (
                <motion.li key={business.id} variants={fadeUp} className="relative pt-4">
                  <span aria-hidden="true" className="absolute left-[-0.75rem] top-12 h-px w-5 bg-navy-200" />
                  <article className="rounded-2xl border border-navy-100 bg-white p-5 shadow-glass">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-[10px] font-bold tracking-[2px] text-navy-300">
                          ENTITY {business.index}
                        </p>
                        <h3 className="text-base font-semibold capitalize leading-tight text-navy-900">
                          {business.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 text-[13px] font-normal text-emerald-600">{business.tagline}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{business.description}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-navy-400">
                      {business.features.map((feature, fi) => (
                        <span key={feature} className="flex items-center gap-2.5">
                          {fi > 0 && (
                            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-400 opacity-70" />
                          )}
                          {feature}
                        </span>
                      ))}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
