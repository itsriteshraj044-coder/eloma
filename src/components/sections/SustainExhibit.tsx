import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

const MORPH = { duration: 0.75, ease: EASE_PREMIUM } as const;

/**
 * "Exhibit" — a curated gallery with shared-element morphs. One pillar holds
 * the feature stage (photograph beside its story and a ghost numeral); the
 * other three wait as thumbnails on the rail below. Selecting a thumbnail
 * morphs it up into the stage — the same photograph travels and reshapes
 * (App Store card expand) instead of cutting or fading.
 */
export function SustainExhibit() {
  const [active, setActive] = useState(0);

  const pillar = PILLARS[active];
  const Icon = pillar.icon;

  return (
    <section
      id="sustain-exhibit"
      aria-label="Why we exist — exhibit"
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
          <LayoutGroup>
            {/* Feature stage */}
            <div className="grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-white to-emerald-50/50 shadow-[0_30px_80px_-40px_rgba(10,26,51,0.25)] ring-1 ring-navy-900/5 lg:grid-cols-[1.15fr_1fr]">
              <motion.div
                layoutId={`exhibit-${active}`}
                transition={MORPH}
                style={{ borderRadius: 0 }}
                className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:min-h-[460px] 3xl:min-h-[520px]"
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
                <span className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold tracking-[2px] text-navy-900">
                  {pillar.index} / 04
                </span>
              </motion.div>

              {/* Story panel */}
              <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
                {/* Ghost numeral watermark */}
                <span
                  className="pointer-events-none absolute -right-2 -top-6 select-none text-[clamp(7rem,11vw,11rem)] font-black leading-none text-navy-900/[0.04]"
                  aria-hidden="true"
                >
                  {pillar.index}
                </span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                  >
                    <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-600">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {pillar.subtitle}
                    </span>
                    <h3 className="mt-4 text-[clamp(1.7rem,2.5vw,2.4rem)] font-semibold leading-tight text-navy-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-body-fluid text-navy-500">
                      {pillar.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Rail — the waiting exhibits */}
            <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4 lg:mt-5 lg:gap-5">
              {PILLARS.map((p, i) => {
                if (i === active) return null;
                return (
                  <motion.button
                    key={p.index}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View ${p.title}`}
                    layoutId={`exhibit-${i}`}
                    transition={MORPH}
                    style={{ borderRadius: '1.25rem' }}
                    whileHover={{ y: -6 }}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden text-left sm:aspect-[16/9]"
                  >
                    <img
                      src={PILLAR_MEDIA[i].src}
                      alt={PILLAR_MEDIA[i].alt}
                      width={1400}
                      height={1050}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-900/10 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                      <span className="text-[11px] font-bold tracking-[2px] text-emerald-300">
                        {p.index}
                      </span>
                      <p
                        className={cn(
                          'mt-0.5 truncate text-[clamp(0.85rem,1.1vw,1.1rem)] font-semibold text-white',
                          'transition-transform duration-500 ease-premium group-hover:translate-x-1',
                        )}
                      >
                        {p.title}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
        </motion.div>
      </Container>
    </section>
  );
}
