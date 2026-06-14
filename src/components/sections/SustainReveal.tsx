import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/** Diagonal wipe — the incoming photograph sweeps across the stage. */
const WIPE_FROM = 'polygon(0% 0%, 0% 0%, -18% 100%, 0% 100%)';
const WIPE_TO = 'polygon(0% 0%, 118% 0%, 100% 100%, 0% 100%)';

/**
 * "Reveal" — one cinematic stage. Choosing a chapter sweeps its photograph
 * across the stage with a diagonal wipe while the story settles onto the
 * scrim; numbered chapter cards beneath drive the show. Manual, calm,
 * no autoplay and no scroll-jacking.
 */
export function SustainReveal() {
  const [active, setActive] = useState(0);
  const [base, setBase] = useState(0);

  const select = (i: number) => {
    if (i === active) return;
    setBase(active);
    setActive(i);
  };

  return (
    <section
      id="sustain-reveal"
      aria-label="Why we exist — reveal"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container>
        <SectionHeading
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth
              <br />
              <span className="text-emerald-500">and Responsible Business</span>
            </>
          }
          titleClassName="normal-case font-normal tracking-normal"
          description={SUSTAINABILITY.body}
        />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mt-12 lg:mt-16"
        >
          {/* Stage */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[16/10] lg:aspect-[21/10]">
            {/* Outgoing photograph rests beneath */}
            <img
              src={PILLAR_MEDIA[base].src}
              alt=""
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Incoming photograph wipes across */}
            <motion.div
              key={active}
              initial={{ clipPath: WIPE_FROM }}
              animate={{ clipPath: WIPE_TO }}
              transition={{ duration: 0.9, ease: EASE_PREMIUM }}
              className="absolute inset-0"
              style={{ willChange: 'clip-path' }}
            >
              <img
                src={PILLAR_MEDIA[active].src}
                alt={PILLAR_MEDIA[active].alt}
                width={1400}
                height={1050}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>

            {/* Scrim + story */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/15 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: EASE_PREMIUM, delay: 0.25 }}
                >
                  <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-300">
                    {PILLARS[active].index}
                    <span className="h-px w-7 bg-emerald-300/70" aria-hidden="true" />
                    {PILLARS[active].subtitle}
                  </span>
                  <h3 className="mt-2.5 text-[clamp(1.6rem,2.4vw,2.3rem)] font-semibold text-white">
                    {PILLARS[active].title}
                  </h3>
                  <p className="mt-3 max-w-xl text-body-fluid text-white/85">
                    {PILLARS[active].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Chapter cards */}
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 lg:mt-6 lg:gap-4">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              const isActive = i === active;
              return (
                <button
                  key={pillar.index}
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={isActive}
                  className={cn(
                    'flex min-h-[64px] items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-500 ease-premium sm:gap-4 sm:px-5',
                    isActive
                      ? 'border-emerald-300 bg-white shadow-[0_18px_40px_-22px_rgba(10,26,51,0.3)]'
                      : 'border-navy-100 hover:border-navy-200',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-500',
                      isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-50 text-navy-400',
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block text-[11px] font-bold tracking-[2px] transition-colors duration-500',
                        isActive ? 'text-emerald-600' : 'text-navy-300',
                      )}
                    >
                      {pillar.index}
                    </span>
                    <span className="block truncate text-[clamp(0.9rem,1vw,1.05rem)] font-semibold text-navy-900">
                      {pillar.title}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
