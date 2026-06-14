import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 14 — "The Tower".
 * Eloma HQ as a building cross-section: six floors, one division per floor,
 * and a working elevator that rides the shaft to whichever floor is active
 * (y-transform on a spring). The elevator tours the building floor by floor
 * — bouncing at top and bottom like a real lift — until a floor is picked.
 * The floor's dossier is presented beside the tower (below it on mobile).
 */

const FLOOR_H = 76; // px — also the elevator travel step
const AUTO_MS = 4200;
const N = BUSINESSES.length;

export function BusinessTower() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoTour, setAutoTour] = useState(true);
  const directionRef = useRef(1);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;

  // Elevator tours the floors, reversing at the ends.
  useEffect(() => {
    if (!autoTour || !inView) return;
    const id = setInterval(() => {
      setActiveIndex((i) => {
        if (i + directionRef.current > N - 1 || i + directionRef.current < 0) {
          directionRef.current = -directionRef.current;
        }
        return i + directionRef.current;
      });
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [autoTour, inView]);

  const select = (i: number) => {
    setActiveIndex(i);
    setAutoTour(false);
  };

  // Floor 06 is at the top of the building; row position from index:
  const rowPos = (i: number) => N - 1 - i;

  return (
    <section
      ref={sectionRef}
      id="business-tower"
      aria-label="Our businesses — the tower"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-25 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />
        <div className="absolute -top-28 left-[16%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
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
            Concept 14 · The Tower
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">One address.</span>{' '}
            <span className="text-navy-900">Six floors.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-10 2xl:gap-14">

          {/* ── The building ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8, ease: EASE_PREMIUM }}
            className="mx-auto w-full max-w-[460px] lg:col-span-5"
          >
            {/* Roof */}
            <div className="flex flex-col items-center">
              <span aria-hidden="true" className="h-6 w-0.5 bg-navy-200" />
              <span aria-hidden="true" className="relative -mt-6 mb-1 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.4s]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <div className="flex w-[58%] items-center justify-center rounded-t-xl border border-b-0 border-navy-200 bg-navy-800 px-4 py-2">
                <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-white">
                  Eloma <span className="text-emerald-300">HQ</span>
                </span>
              </div>
            </div>

            {/* Building body */}
            <div className="flex overflow-hidden rounded-t-[1.25rem] border border-navy-200 bg-white shadow-glass-lg">

              {/* Elevator shaft */}
              <div className="relative w-16 shrink-0 border-r border-navy-100 bg-navy-50/60">
                {/* Guide rail */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-navy-200"
                />
                {/* The car */}
                <motion.div
                  initial={false}
                  animate={{ y: rowPos(activeIndex) * FLOOR_H + 8 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 16, mass: 0.9 }}
                  className="will-transform absolute left-1/2 top-0 -ml-5 flex h-[60px] w-10 flex-col overflow-hidden rounded-lg bg-navy-800 shadow-glass"
                  aria-hidden="true"
                >
                  <span className="mx-auto mt-1.5 h-1 w-5 rounded-full bg-emerald-400" />
                  <span className="mx-auto mt-1.5 flex flex-1 gap-0.5 pb-1.5">
                    <span className="h-full w-3 rounded-sm bg-navy-600" />
                    <span className="h-full w-3 rounded-sm bg-navy-600" />
                  </span>
                </motion.div>
              </div>

              {/* Floors — 06 on top, 01 at street level */}
              <div className="flex-1">
                {[...BUSINESSES].reverse().map((business) => {
                  const i = BUSINESSES.indexOf(business);
                  const Icon = business.icon;
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={business.id}
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={isActive}
                      aria-label={`Floor ${business.index}: ${business.title}`}
                      style={{ height: FLOOR_H }}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 border-b border-navy-100 px-4 text-left outline-none transition-colors duration-300 last:border-b-0 focus-visible:bg-emerald-50',
                        isActive ? 'bg-emerald-50/80' : 'hover:bg-navy-50/50',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors duration-300',
                          isActive ? 'bg-emerald-500 text-white' : 'bg-navy-50 text-navy-500',
                        )}
                      >
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            'block truncate text-sm font-semibold capitalize transition-colors duration-300',
                            isActive ? 'text-navy-900' : 'text-navy-600',
                          )}
                        >
                          {business.title}
                        </span>
                        <span className="block truncate text-[11px] text-navy-400">{business.tagline}</span>
                      </span>
                      <span
                        className={cn(
                          'text-xs font-bold tabular-nums tracking-[1px] transition-colors duration-300',
                          isActive ? 'text-emerald-600' : 'text-navy-300',
                        )}
                      >
                        F{Number(business.index)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lobby + ground */}
            <div className="flex items-center justify-between border border-t-0 border-navy-200 bg-navy-50/70 px-5 py-3">
              <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-navy-400">
                Lobby · Eloma Group
              </span>
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-4 w-2.5 rounded-t-md border border-navy-200 bg-white" />
                <span className="h-4 w-2.5 rounded-t-md border border-navy-200 bg-white" />
              </span>
            </div>
            <span aria-hidden="true" className="block h-1 w-full rounded-full bg-navy-100" />
          </motion.div>

          {/* ── Floor dossier ── */}
          <div className="relative lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                className="will-transform relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-glass sm:p-8 3xl:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 right-5 select-none text-[clamp(4.5rem,7vw,7rem)] font-extrabold leading-none tracking-tighter text-navy-900 opacity-[0.05]"
                >
                  F{Number(active.index)}
                </span>

                <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                  Floor {active.index} of 0{N} · Eloma HQ
                </p>

                <div className="mt-4 flex items-center gap-4">
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

                <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
                  {active.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-2.5 text-sm text-navy-700">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                      {feature}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                  Discover more
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </motion.article>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </section>
  );
}
