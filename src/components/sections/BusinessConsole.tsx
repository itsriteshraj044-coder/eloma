import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 19 — "The Console".
 * The group as enterprise software: a polished operations console with a
 * window chrome, a division navigator on the left and a live overview
 * canvas — capabilities rendered as labelled KPI tiles, a status footer
 * with group facts. Selecting a division repaints the canvas; the console
 * cycles divisions on its own until you take the controls. Below lg the
 * navigator becomes a horizontal tab strip.
 */

const AUTO_MS = 5200;

export function BusinessConsole() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoTour, setAutoTour] = useState(true);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (!autoTour || paused || !inView) return;
    const id = setTimeout(() => setActiveIndex((i) => (i + 1) % BUSINESSES.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [autoTour, paused, inView, activeIndex]);

  const select = (i: number) => {
    setActiveIndex(i);
    setAutoTour(false);
  };

  return (
    <section
      ref={sectionRef}
      id="business-console"
      aria-label="Our businesses — the console"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-20 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
        <div className="absolute -top-28 left-[14%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
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
            Concept 19 · The Console
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">Every division,</span>{' '}
            <span className="text-navy-900">at a glance.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── The console window ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white shadow-glass-lg"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between gap-3 border-b border-navy-100 bg-navy-50/60 px-5 py-3">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-navy-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-navy-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[2.5px] text-navy-500">
              Eloma Group · Division overview
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-600">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2s]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>

          <div className="grid lg:grid-cols-12">

            {/* Navigator */}
            <nav
              aria-label="Division navigator"
              className="flex gap-1.5 overflow-x-auto border-b border-navy-100 p-3 lg:col-span-4 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4 2xl:col-span-3"
            >
              {BUSINESSES.map((business, i) => {
                const Icon = business.icon;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={business.id}
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    className={cn(
                      'relative flex min-h-11 shrink-0 cursor-pointer items-center gap-3 rounded-xl px-3.5 py-3 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-emerald-400',
                      isActive ? 'text-navy-900' : 'text-navy-500 hover:bg-navy-50/70',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="console-nav-pill"
                        transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                        className="absolute inset-0 rounded-xl border border-emerald-200 bg-emerald-50/80"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(
                        'relative grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors duration-300',
                        isActive ? 'bg-emerald-500 text-white' : 'bg-navy-50 text-navy-500',
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="relative flex min-w-0 flex-col">
                      <span className="truncate text-sm font-semibold capitalize">{business.title}</span>
                      <span className="hidden truncate text-[11px] text-navy-400 lg:block">
                        Division {business.index}
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Canvas */}
            <div className="relative min-h-[clamp(320px,34vw,420px)] lg:col-span-8 2xl:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                  className="will-transform flex h-full flex-col p-6 sm:p-8 3xl:p-10"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-[clamp(1.2rem,1.7vw,1.5rem)] font-normal capitalize leading-tight text-navy-900">
                          {active.title}
                        </h3>
                        <p className="mt-0.5 text-[13px] font-normal text-emerald-600">{active.tagline}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-700">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Operational
                    </span>
                  </div>

                  <p className="mt-5 max-w-3xl text-sm leading-relaxed text-navy-500 3xl:text-base">
                    {active.description}
                  </p>

                  {/* Capability tiles */}
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {active.features.map((feature, fi) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 + fi * 0.06, ease: EASE_PREMIUM }}
                        className="rounded-xl border border-navy-100 bg-navy-50/40 p-3.5"
                      >
                        <p className="text-[9px] font-extrabold uppercase tracking-[1.5px] text-navy-300">
                          Capability 0{fi + 1}
                        </p>
                        <p className="mt-1.5 text-[13px] font-semibold leading-snug text-navy-800">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <span className="mt-auto inline-flex w-fit cursor-pointer items-center gap-1.5 pt-6 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                    Discover more
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Status footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-navy-100 bg-navy-50/50 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[1.5px] text-navy-400">
            <span>6 divisions · 8 global markets</span>
            <span className="tabular-nums">
              Viewing {active.index} / 0{BUSINESSES.length}
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
