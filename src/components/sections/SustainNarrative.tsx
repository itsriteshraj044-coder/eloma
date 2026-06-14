import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Narrative" — a quiet, luxury-grade reading experience. The left half is
 * one full-height photograph bled to the viewport edge; it stays while the
 * four stories pass on the right as open typography, each arrival met with
 * a slow crossfade and a settling zoom. A thin emerald thread fills beside
 * the text as the story progresses. No cards, no numbers, no chrome.
 */
export function SustainNarrative() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section
      id="sustain-narrative"
      aria-label="Why we exist — narrative"
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
      </Container>

      <div className="mt-14 lg:mt-20 lg:grid lg:grid-cols-2">
        {/* The photograph — full height, bled to the left edge, slow crossfades */}
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen overflow-hidden">
            {PILLAR_MEDIA.map((media, i) => (
              <motion.div
                key={media.src}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                transition={{ duration: 1.2, ease: EASE_PREMIUM }}
                className="absolute inset-0"
                style={{ willChange: 'transform, opacity' }}
              >
                <img
                  src={media.src}
                  alt={media.alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            ))}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent"
              aria-hidden="true"
            />
            {/* Whispered caption */}
            <div className="absolute bottom-12 left-10 xl:left-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                >
                  <p className="text-[12px] font-bold uppercase tracking-[3px] text-emerald-300">
                    {PILLARS[active].subtitle}
                  </p>
                  <p className="mt-2 text-[clamp(1.3rem,1.6vw,1.7rem)] font-light text-white">
                    {PILLARS[active].title}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* The stories — open typography, an emerald thread filling alongside */}
        <div
          ref={listRef}
          className="relative px-[clamp(24px,4vw,64px)] lg:pl-16 lg:pr-[max(clamp(24px,4vw,64px),calc(50vw-880px))] xl:pl-24"
        >
          <div
            className="absolute bottom-0 left-[clamp(24px,4vw,64px)] top-0 hidden w-px bg-navy-100 lg:left-6 lg:block xl:left-10"
            aria-hidden="true"
          >
            <motion.span
              style={{ scaleY: scrollYProgress, willChange: 'transform' }}
              className="block h-full w-full origin-top bg-emerald-500"
            />
          </div>

          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: '-45% 0px -45% 0px' }}
              className={cn(
                'flex flex-col justify-center py-14 transition-opacity duration-700 lg:min-h-[72vh] lg:py-20',
                i !== active && 'lg:opacity-35',
              )}
            >
              {/* Mobile keeps its own full-bleed photograph */}
              <div className="relative mb-9 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] h-[clamp(260px,55vw,420px)] overflow-hidden lg:hidden">
                <img
                  src={PILLAR_MEDIA[i].src}
                  alt={PILLAR_MEDIA[i].alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.85, ease: EASE_PREMIUM }}
              >
                <span className="text-eyebrow-fluid uppercase tracking-[3px] text-emerald-600">
                  {pillar.subtitle}
                </span>
                <h3 className="mt-4 text-[clamp(2rem,3.2vw,3.1rem)] font-light leading-[1.12] tracking-[-0.01em] text-navy-900">
                  {pillar.title}
                </h3>
                <span
                  className="mt-6 block h-px w-20 bg-emerald-500/80"
                  aria-hidden="true"
                />
                <p className="mt-6 max-w-lg text-body-fluid text-navy-500">
                  {pillar.description}
                </p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
