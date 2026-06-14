import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import type { Pillar } from '@/types';
import type { PillarMedia } from '@/data/sustainabilityMedia';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

interface CadenceCardProps {
  pillar: Pillar;
  media: PillarMedia;
}

function CadenceCard({ pillar, media }: CadenceCardProps) {
  const Icon = pillar.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.85, ease: EASE_PREMIUM }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-[1.75rem]">
        <img
          src={media.src}
          alt={media.alt}
          width={1400}
          height={1050}
          loading="lazy"
          decoding="async"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent"
          aria-hidden="true"
        />
        <span className="absolute bottom-5 left-6 text-[clamp(2.6rem,3.6vw,3.6rem)] font-black leading-none text-white/95">
          {pillar.index}
        </span>
        <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-emerald-600">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-6 px-1">
        <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-600">
          {pillar.subtitle}
          <span className="h-px w-8 bg-emerald-400/70" aria-hidden="true" />
        </span>
        <h3 className="mt-2.5 text-[clamp(1.4rem,1.8vw,1.8rem)] font-semibold text-navy-900">
          {pillar.title}
        </h3>
        <p className="mt-3 max-w-lg text-body-fluid text-navy-500">{pillar.description}</p>
      </div>
    </motion.article>
  );
}

/**
 * "Cadence" — a two-speed editorial. The pillars flow down two columns that
 * drift at different rates as the page scrolls (the right column starts low
 * and glides upward past the left), so the spread feels alive without any
 * pinning. Oversized numerals anchor each photograph.
 */
export function SustainCadence() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const rightY = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section
      id="sustain-cadence"
      aria-label="Why we exist — cadence"
      className="section-py relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white"
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

        <div ref={ref} className="mt-12 grid gap-12 md:grid-cols-2 md:gap-10 lg:mt-20 lg:gap-14">
          <motion.div
            style={{ y: leftY, willChange: 'transform' }}
            className="flex flex-col gap-12 lg:gap-20"
          >
            <CadenceCard pillar={PILLARS[0]} media={PILLAR_MEDIA[0]} />
            <CadenceCard pillar={PILLARS[2]} media={PILLAR_MEDIA[2]} />
          </motion.div>
          <motion.div
            style={{ y: rightY, willChange: 'transform' }}
            className="flex flex-col gap-12 md:mt-24 lg:mt-36 lg:gap-20"
          >
            <CadenceCard pillar={PILLARS[1]} media={PILLAR_MEDIA[1]} />
            <CadenceCard pillar={PILLARS[3]} media={PILLAR_MEDIA[3]} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
