import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Sustain Atmosphere" — the section itself is the photograph: a full-bleed
 * nature backdrop crossfades as the visitor moves across the four pillars,
 * softened by a white veil so the copy stays editorial. The active pillar's
 * story floats on a glass plate.
 */
export function SustainAtmosphere() {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active];
  const ActiveIcon = pillar.icon;

  return (
    <section
      id="sustain-atmosphere"
      aria-label="Why we exist — atmosphere"
      className="section-py relative overflow-hidden"
    >
      {/* Full-bleed crossfading backdrop + white veil */}
      <div aria-hidden="true" className="absolute inset-0">
        {PILLARS.map((p, i) => (
          <img
            key={p.index}
            src={PILLAR_MEDIA[i].src}
            alt=""
            width={1400}
            height={933}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-premium',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/55" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        >
          <span className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Why We Exist
          </span>
          <h2 className="mt-5 max-w-2xl text-[clamp(1.75rem,5vw,2.5rem)] font-normal leading-[1.15] text-navy-900 text-balance">
            Committed to Sustainable Growth{' '}
            <span className="text-emerald-500">and Responsible Business</span>
          </h2>
          <p className="mt-4 max-w-xl text-body-fluid text-navy-600 text-pretty">
            {SUSTAINABILITY.body}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">

          {/* Pillar index — drives the backdrop */}
          <ul className="list-none border-t border-navy-200/60 lg:col-span-6">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              const isActive = i === active;
              return (
                <li key={p.index} className="border-b border-navy-200/60">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full cursor-pointer items-center gap-4 py-5 text-left sm:gap-6 lg:py-6"
                  >
                    <span
                      className={cn(
                        'text-[11px] font-semibold tracking-[2px] transition-colors duration-300',
                        isActive ? 'text-emerald-600' : 'text-navy-300',
                      )}
                    >
                      {p.index}
                    </span>
                    <span
                      className={cn(
                        'flex-1 text-[clamp(1.2rem,2.2vw,1.8rem)] font-light capitalize leading-tight transition-colors duration-300',
                        isActive ? 'text-navy-900' : 'text-navy-400 group-hover:text-navy-700',
                      )}
                    >
                      {p.title}
                    </span>
                    <span
                      className={cn(
                        'grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-300',
                        isActive ? 'bg-white text-emerald-600 shadow-glass' : 'text-navy-300',
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Active story plate */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={pillar.index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                className="rounded-[1.5rem] bg-white/90 p-7 shadow-glass-lg sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ActiveIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[2.5px] text-emerald-600">
                    {pillar.index} — {pillar.subtitle}
                  </p>
                </div>
                <h3 className="mt-4 text-[clamp(1.3rem,2vw,1.7rem)] font-medium capitalize text-navy-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-body-fluid text-navy-600 text-pretty">
                  {pillar.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </section>
  );
}
