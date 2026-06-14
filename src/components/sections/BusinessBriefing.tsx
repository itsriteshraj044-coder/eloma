import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 17 — "The Briefing".
 * An investor-presentation frame: one composed slide per division — section
 * kicker, oversized index, structured two-column brief — with boardroom
 * pagination (arrows, slide fraction, progress). Advances itself like a
 * well-rehearsed presenter; pauses while you hover; arrows take over on
 * first use.
 */

const AUTO_MS = 6000;
const N = BUSINESSES.length;

export function BusinessBriefing() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (!autoPlay || paused || !inView) return;
    const id = setTimeout(() => setActiveIndex((i) => (i + 1) % N), AUTO_MS);
    return () => clearTimeout(id);
  }, [autoPlay, paused, inView, activeIndex]);

  const go = (dir: 1 | -1) => {
    setActiveIndex((i) => (i + dir + N) % N);
    setAutoPlay(false);
  };

  return (
    <section
      ref={sectionRef}
      id="business-briefing"
      aria-label="Our businesses — the briefing"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 right-[14%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
        <div className="absolute -bottom-24 left-[10%] h-80 w-80 rounded-full bg-navy-50/80 blur-3xl" />
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
            Concept 17 · The Briefing
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">The group,</span>{' '}
            <span className="text-navy-900">presented properly.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── Slide frame ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mx-auto mt-12 max-w-6xl"
        >
          <div className="overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-glass-lg">

            {/* Slide canvas */}
            <div className="relative min-h-[clamp(340px,38vw,460px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -28 }}
                  transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                  className="will-transform grid h-full gap-0 lg:grid-cols-12"
                >
                  {/* Left panel — section identity */}
                  <div className="relative flex flex-col justify-between overflow-hidden border-b border-navy-100 bg-gradient-to-br from-navy-50/80 to-emerald-50/40 p-7 sm:p-9 lg:col-span-5 lg:border-b-0 lg:border-r 3xl:p-12">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-12 -right-4 select-none text-[clamp(9rem,16vw,16rem)] font-extrabold leading-none tracking-tighter text-navy-900 opacity-[0.05]"
                    >
                      {active.index}
                    </span>
                    <div className="relative">
                      <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-navy-400">
                        Section {active.index} of 0{N}
                      </p>
                      <h3 className="mt-5 text-[clamp(1.6rem,2.6vw,2.3rem)] font-normal capitalize leading-[1.1] text-navy-900">
                        {active.title}
                      </h3>
                      <p className="mt-3 flex items-center gap-3 text-sm font-semibold text-emerald-600 3xl:text-base">
                        <span aria-hidden="true" className="h-px w-7 shrink-0 bg-emerald-300" />
                        {active.tagline}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-emerald-600 shadow-glass">
                        <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[2px] text-navy-400">
                        Eloma Group · Division briefing
                      </span>
                    </div>
                  </div>

                  {/* Right panel — the brief */}
                  <div className="flex flex-col p-7 sm:p-9 lg:col-span-7 3xl:p-12">
                    <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-300">
                      Overview
                    </p>
                    <p className="mt-3 text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.8] text-navy-600">
                      {active.description}
                    </p>

                    <p className="mt-7 text-[11px] font-bold uppercase tracking-[2px] text-navy-300">
                      Core capabilities
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {active.features.map((feature) => (
                        <span key={feature} className="flex items-center gap-2.5 text-sm text-navy-700">
                          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          {feature}
                        </span>
                      ))}
                    </div>

                    <span className="mt-auto inline-flex w-fit cursor-pointer items-center gap-1.5 pt-7 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                      Discover more
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Presenter bar */}
            <div className="flex items-center justify-between gap-4 border-t border-navy-100 bg-navy-50/50 px-5 py-3.5 sm:px-7">
              <span className="text-sm font-bold tabular-nums tracking-[2px] text-navy-500">
                {active.index} <span className="text-navy-300">/ 0{N}</span>
              </span>

              {/* Slide progress */}
              <div className="relative h-0.5 max-w-xs flex-1 overflow-hidden rounded-full bg-navy-100">
                <motion.span
                  animate={{ scaleX: (activeIndex + 1) / N }}
                  transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                  className="will-transform absolute inset-0 origin-left rounded-full bg-emerald-400"
                  aria-hidden="true"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous division"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-navy-100 bg-white text-navy-600 shadow-glass outline-none transition-colors duration-300 hover:border-emerald-200 hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next division"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-navy-100 bg-white text-navy-600 shadow-glass outline-none transition-colors duration-300 hover:border-emerald-200 hover:text-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
