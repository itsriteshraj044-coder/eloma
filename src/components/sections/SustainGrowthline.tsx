import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Pillar } from '@/types';

function GrowthStop({ pillar, mediaIndex, side }: { pillar: Pillar; mediaIndex: number; side: 'left' | 'right' }) {
  const Icon = pillar.icon;
  const media = PILLAR_MEDIA[mediaIndex];
  const isLeft = side === 'left';

  return (
    <div className="relative grid gap-6 lg:grid-cols-2 lg:gap-x-24">
      {/* Node on the spine */}
      <span
        className="absolute left-[18px] top-2 z-10 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-emerald-200 bg-white shadow-glass lg:left-1/2"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </span>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        className={cn(
          'pl-14 lg:pl-0',
          isLeft ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16',
        )}
      >
        <div className="group relative inline-block w-full max-w-lg overflow-hidden rounded-2xl shadow-glass">
          <img
            src={media.src}
            alt={media.alt}
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            className="will-transform aspect-[16/9] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          />
        </div>

        <p
          className={cn(
            'mt-6 flex items-center gap-2.5 text-eyebrow-fluid uppercase text-emerald-600',
            isLeft && 'lg:justify-end',
          )}
        >
          <span className="text-navy-300">{pillar.index}</span>
          <span className="h-px w-6 bg-emerald-300" aria-hidden="true" />
          {pillar.subtitle}
        </p>
        <h3 className="mt-2 text-[clamp(1.5rem,2vw,2rem)] font-black uppercase tracking-[-0.04em] text-navy-900">
          {pillar.title}
        </h3>
        <p className={cn('mt-3 max-w-md text-body-fluid text-navy-500', isLeft && 'lg:ml-auto')}>
          {pillar.description}
        </p>

        <span
          className={cn(
            'mt-5 inline-grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600',
            isLeft && 'lg:ml-auto lg:block lg:pt-2.5 lg:text-center',
          )}
          aria-hidden="true"
        >
          <Icon className="mx-auto h-5 w-5" />
        </span>
      </motion.div>
    </div>
  );
}

/**
 * "Growth Line" — cinematic scrollytelling. One emerald spine grows from the
 * root to the horizon as the visitor scrolls; the four pillars branch off it
 * left and right as editorial stops along the journey.
 */
export function SustainGrowthline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 0.75', 'end 0.55'],
  });

  return (
    <section
      id="sustain-growthline"
      aria-label="Why we exist — growth line"
      className="section-py relative overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-light"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth
              <br />
              <span className="text-emerald-500">and Responsible Business</span>
            </>
          }
          description={SUSTAINABILITY.body}
        />

        <div ref={lineRef} className="relative mt-16 lg:mt-24">
          {/* Spine — static track + scroll-drawn emerald line */}
          <div
            className="absolute bottom-2 left-[18px] top-2 w-px -translate-x-1/2 bg-navy-100 lg:left-1/2"
            aria-hidden="true"
          />
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="will-transform absolute bottom-2 left-[18px] top-2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500 lg:left-1/2"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16 lg:gap-24">
            {PILLARS.map((pillar, i) => (
              <GrowthStop
                key={pillar.index}
                pillar={pillar}
                mediaIndex={i}
                side={i % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="relative mt-16 flex justify-start pl-14 lg:justify-center lg:pl-0"
          >
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-[11px] font-extrabold uppercase tracking-[2.5px] text-emerald-700">
              Growing, responsibly
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
