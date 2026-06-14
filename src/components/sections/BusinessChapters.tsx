import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 08 — "Chapters".
 * Scrollytelling: the right column reads like a book — six tall chapters
 * scrolling naturally — while the left stage stays pinned and crossfades a
 * giant chapter numeral, icon and title in sync with whichever chapter is
 * in view (viewport observers, no scroll listeners). Below lg the stage is
 * dropped and each chapter carries its own heading.
 */

export function BusinessChapters() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section
      id="business-chapters"
      aria-label="Our businesses — chapters"
      className="section-py relative bg-white"
    >
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
              Concept 08 · Chapters
            </motion.span>
            <motion.span variants={fadeUp} className="eyebrow mt-4 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The Business Universe
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
            >
              <span className="text-emerald-500">One story,</span>{' '}
              <span className="text-navy-900">six chapters.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-body-fluid text-navy-500 lg:col-span-5">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14 3xl:gap-20">

          {/* ── Pinned stage (lg+) ── */}
          <div className="relative hidden lg:block">
            <div className="sticky top-[14vh] flex h-[72vh] items-center">
              <div className="relative w-full overflow-hidden rounded-[2rem] border border-navy-100 bg-gradient-to-br from-white via-navy-50/40 to-emerald-50/50 p-10 shadow-glass">
                {/* Chapter progress rail */}
                <div className="absolute left-8 top-1/2 flex -translate-y-1/2 flex-col gap-2" aria-hidden="true">
                  {BUSINESSES.map((b, i) => (
                    <span
                      key={b.id}
                      className={cn(
                        'w-1 rounded-full transition-all duration-400 ease-premium',
                        i === activeIndex ? 'h-9 bg-emerald-400' : 'h-4 bg-navy-100',
                      )}
                    />
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                    className="will-transform relative pl-10"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-navy-400">
                      Chapter {active.index} / 0{BUSINESSES.length}
                    </p>
                    {/* Giant chapter numeral */}
                    <p
                      aria-hidden="true"
                      className="pointer-events-none mt-2 select-none text-[clamp(7rem,11vw,11rem)] font-extrabold leading-[0.9] tracking-tighter text-navy-900 opacity-[0.07]"
                    >
                      {active.index}
                    </p>
                    <div className="-mt-10 flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-emerald-600 shadow-glass 3xl:h-14 3xl:w-14">
                        <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-[clamp(1.4rem,2vw,1.8rem)] font-normal capitalize leading-tight text-navy-900">
                          {active.title}
                        </h3>
                        <p className="mt-0.5 text-sm font-normal text-emerald-600">{active.tagline}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Scrolling chapters ── */}
          <div>
            {BUSINESSES.map((business, i) => {
              const Icon = business.icon;
              return (
                <motion.article
                  key={business.id}
                  onViewportEnter={() => setActiveIndex(i)}
                  viewport={{ amount: 0.5, margin: '-10% 0px -10% 0px' }}
                  className="flex flex-col justify-center border-t border-navy-100 py-10 first:border-t-0 lg:min-h-[62vh] lg:py-12"
                >
                  {/* Inline chapter heading — the pinned stage covers this on lg */}
                  <div className="lg:hidden">
                    <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                      Chapter {business.index}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="text-[clamp(1.2rem,4vw,1.45rem)] font-normal capitalize leading-tight text-navy-900">
                          {business.title}
                        </h3>
                        <p className="mt-0.5 text-[13px] font-normal text-emerald-600">{business.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Chapter body */}
                  <p className="mt-5 text-[clamp(1rem,1.2vw,1.2rem)] leading-[1.8] text-navy-600 lg:mt-0">
                    {business.description}
                  </p>

                  <ul className="mt-6 grid list-none gap-3 sm:grid-cols-2">
                    {business.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-navy-700">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex w-fit cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                    Discover more
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </motion.article>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
