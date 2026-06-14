import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

/**
 * "Accordion" — four photographic panels share one stage. The active panel
 * breathes open to tell its story while the others fold into slim spines
 * with vertical titles; hovering (or tapping) any spine hands it the stage.
 */
export function SustainAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="sustain-accordion"
      aria-label="Why we exist — accordion"
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mt-12 flex flex-col gap-3 lg:mt-16 lg:h-[540px] lg:flex-row 3xl:h-[600px]"
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const isActive = i === active;
            return (
              <div
                key={pillar.index}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={cn(
                  'relative cursor-pointer overflow-hidden rounded-[1.75rem] transition-all duration-700 ease-premium',
                  isActive
                    ? 'h-[420px] sm:h-[460px] lg:h-auto lg:flex-[2.7]'
                    : 'h-[76px] lg:h-auto lg:flex-[0.75]',
                )}
              >
                <img
                  src={PILLAR_MEDIA[i].src}
                  alt={PILLAR_MEDIA[i].alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Scrim — deeper when open, calm veil when folded */}
                <div
                  className={cn(
                    'pointer-events-none absolute inset-0 transition-opacity duration-700',
                    isActive
                      ? 'bg-gradient-to-t from-navy-950/85 via-navy-900/20 to-transparent opacity-100'
                      : 'bg-navy-950/45 opacity-100',
                  )}
                  aria-hidden="true"
                />

                {/* Folded spine — index + vertical title */}
                <div
                  className={cn(
                    'absolute inset-0 flex items-center justify-between px-6 transition-opacity duration-500 lg:flex-col lg:py-7',
                    isActive ? 'pointer-events-none opacity-0' : 'opacity-100',
                  )}
                >
                  <span className="text-[12px] font-bold tracking-[2px] text-emerald-300">
                    {pillar.index}
                  </span>
                  <span className="text-[clamp(1rem,1.2vw,1.2rem)] font-semibold text-white lg:[writing-mode:vertical-rl]">
                    {pillar.title}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                {/* Open story */}
                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 p-6 transition-all duration-700 ease-premium sm:p-8 lg:p-10',
                    isActive ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-6 opacity-0',
                  )}
                >
                  <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-300">
                    {pillar.index}
                    <span className="h-px w-7 bg-emerald-300/70" aria-hidden="true" />
                    {pillar.subtitle}
                  </span>
                  <h3 className="mt-2.5 text-[clamp(1.5rem,2.2vw,2.1rem)] font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-body-fluid text-white/85">{pillar.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
