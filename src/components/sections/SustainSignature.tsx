import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Signature" — kinetic typography index. The four pillar titles stand as
 * oversized outlined wordmarks; gliding onto one fills its letters with the
 * pillar's photograph (type as the window) while the story and a tall
 * portrait settle into the side panel. Mobile reads as a clean editorial list.
 */
export function SustainSignature() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="sustain-signature"
      aria-label="Why we exist — signature"
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

        <div className="mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
          {/* Typographic index */}
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {PILLARS.map((pillar, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={pillar.index}
                  variants={fadeUp}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={cn(
                    'group cursor-pointer border-t border-navy-100 py-6 transition-transform duration-500 ease-premium last:border-b sm:py-7',
                    isActive && 'lg:translate-x-3',
                  )}
                >
                  <div className="flex items-center gap-5 sm:gap-7">
                    <span
                      className={cn(
                        'text-[12px] font-bold tracking-[2px] transition-colors duration-500',
                        isActive ? 'text-emerald-600' : 'text-navy-300',
                      )}
                    >
                      {pillar.index}
                    </span>
                    <h3
                      className={cn(
                        'flex-1 text-[clamp(1.9rem,4.2vw,3.9rem)] font-black uppercase leading-none tracking-tight',
                        // Mobile: solid ink. Desktop: outlined, photograph fills on focus.
                        'text-navy-900 lg:[-webkit-text-fill-color:transparent]',
                        !isActive && 'lg:text-navy-200 lg:[-webkit-text-stroke:1.5px]',
                      )}
                      style={
                        isActive
                          ? {
                              backgroundImage: `url(${PILLAR_MEDIA[i].src})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center 30%',
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                            }
                          : undefined
                      }
                    >
                      {pillar.title}
                    </h3>
                    <span
                      className={cn(
                        'hidden h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-premium lg:grid',
                        isActive
                          ? 'rotate-45 border-emerald-400 bg-emerald-50 text-emerald-600'
                          : 'border-navy-200/70 text-navy-300',
                      )}
                    >
                      <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl pl-0 text-body-fluid text-navy-500 sm:pl-12 lg:hidden">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Side panel — active pillar portrait + story (desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={active}
                  src={PILLAR_MEDIA[active].src}
                  alt={PILLAR_MEDIA[active].alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_PREMIUM }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                className="mt-6"
              >
                <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-600">
                  {PILLARS[active].subtitle}
                  <span className="h-px w-8 bg-emerald-400/70" aria-hidden="true" />
                </span>
                <p className="mt-3 text-body-fluid text-navy-500">
                  {PILLARS[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
