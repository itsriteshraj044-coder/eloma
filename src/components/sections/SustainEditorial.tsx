import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import type { PillarMedia } from '@/data/sustainabilityMedia';
import type { Pillar } from '@/types';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

interface EditorialBlockProps {
  pillar: Pillar;
  media: PillarMedia;
  flip: boolean;
}

function EditorialBlock({ pillar, media, flip }: EditorialBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Slow drift inside the full-bleed frame — the photograph breathes as you pass.
  const y = useTransform(scrollYProgress, [0, 1], ['-3.5%', '3.5%']);
  const Icon = pillar.icon;

  return (
    <div ref={ref} className="grid items-center gap-9 lg:grid-cols-12 lg:gap-0">
      {/* Photograph — bleeds to the viewport edge, no frame, no radius */}
      <div
        className={cn(
          'relative overflow-hidden lg:col-span-7',
          flip
            ? 'order-1 lg:order-2 mr-[calc(50%-50vw)] ml-[calc(50%-50vw)] lg:ml-0'
            : 'order-1 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] lg:mr-0',
        )}
      >
        <div className="relative h-[clamp(300px,52vw,460px)] lg:h-[clamp(440px,42vw,620px)]">
          <motion.img
            src={media.src}
            alt={media.alt}
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            style={{ y, willChange: 'transform' }}
            className="absolute left-0 top-[-8%] h-[116%] w-full object-cover"
          />
        </div>
      </div>

      {/* Open copy — type on white, nothing contained */}
      <div
        className={cn(
          'relative order-2 lg:col-span-5',
          flip ? 'lg:order-1 lg:pr-14 xl:pr-20' : 'lg:pl-14 xl:pl-20',
        )}
      >
        {/* Outlined numeral straddles the seam between photo and page */}
        <motion.span
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-[clamp(3rem,6vw,5.5rem)] z-10 select-none',
            'text-[clamp(4.5rem,9vw,9rem)] font-black leading-none',
            'text-transparent [-webkit-text-stroke:1.5px] text-emerald-400/80',
            flip ? 'right-0 lg:left-auto lg:-right-6' : 'left-0 lg:-left-10',
          )}
        >
          {pillar.index}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.85, ease: EASE_PREMIUM, delay: 0.1 }}
        >
          <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-600">
            <Icon className="h-4 w-4" aria-hidden="true" />
            {pillar.subtitle}
          </span>
          <h3 className="mt-4 text-[clamp(1.8rem,2.8vw,2.6rem)] font-semibold leading-[1.15] text-navy-900">
            {pillar.title}
          </h3>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.9, ease: EASE_PREMIUM, delay: 0.3 }}
            className="mt-5 block h-px w-24 origin-left bg-emerald-500"
            aria-hidden="true"
          />
          <p className="mt-5 max-w-xl text-body-fluid text-navy-500">{pillar.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * "Editorial" — an open magazine feature, nothing boxed. Each pillar is a
 * full-bleed photograph running to the viewport edge with a slow parallax
 * breath inside, faced by open type on white: an outlined numeral straddling
 * the seam, a drawn hairline, copy with room to breathe. Sides alternate
 * down the page; no cards, no plates, no shadows.
 */
export function SustainEditorial() {
  return (
    <section
      id="sustain-editorial"
      aria-label="Why we exist — editorial"
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

        <div className="mt-16 flex flex-col gap-20 sm:gap-24 lg:mt-24 lg:gap-32">
          {PILLARS.map((pillar, i) => (
            <EditorialBlock
              key={pillar.index}
              pillar={pillar}
              media={PILLAR_MEDIA[i]}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
