import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import type { Pillar } from '@/types';

function PanoramaPanel({ pillar, mediaIndex }: { pillar: Pillar; mediaIndex: number }) {
  const Icon = pillar.icon;
  const media = PILLAR_MEDIA[mediaIndex];

  return (
    <div className="flex h-full w-screen shrink-0 items-center">
      <Container className="w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Story */}
          <div className="relative order-2 lg:order-1">
            <span
              className="pointer-events-none absolute -top-12 left-0 text-[clamp(4.5rem,9vw,8.5rem)] font-black leading-none tracking-[-0.05em] text-navy-50 lg:-top-20"
              aria-hidden="true"
            >
              {pillar.index}
            </span>
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-6 text-eyebrow-fluid uppercase text-emerald-600">{pillar.subtitle}</p>
              <h3 className="mt-2 text-card-heading uppercase text-navy-900">{pillar.title}</h3>
              <p className="mt-4 max-w-xl text-body-fluid text-navy-500">{pillar.description}</p>
            </div>
          </div>

          {/* Photography */}
          <div className="relative order-1 overflow-hidden rounded-[2rem] shadow-glass-lg lg:order-2">
            <img
              src={media.src}
              alt={media.alt}
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              className="h-[clamp(180px,32vh,300px)] w-full object-cover lg:h-[clamp(320px,52vh,560px)]"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[2px] text-navy-800">
              {pillar.index} / 04
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * "Panorama" — a pinned horizontal journey. The viewport locks and the four
 * pillars travel past as widescreen chapters while the visitor scrolls,
 * with an emerald progress line tracking the crossing.
 */
export function SustainPanorama() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef });
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw']);

  return (
    <section
      id="sustain-panorama"
      aria-label="Why we exist — panorama"
      className="relative overflow-hidden bg-white"
    >
      <Container className="pt-[clamp(32px,5vw,88px)]">
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
      </Container>

      {/* Pinned horizontal track — 4 viewport-wide chapters */}
      <div ref={trackRef} className="relative h-[340vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div style={{ x }} className="will-transform flex">
            {PILLARS.map((pillar, i) => (
              <PanoramaPanel key={pillar.index} pillar={pillar} mediaIndex={i} />
            ))}
          </motion.div>

          {/* Progress line */}
          <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-4">
            <span className="text-[10px] font-extrabold tracking-[2px] text-navy-300">01</span>
            <div className="h-[3px] w-40 overflow-hidden rounded-full bg-navy-100 sm:w-56">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="will-transform h-full w-full origin-left rounded-full bg-emerald-400"
              />
            </div>
            <span className="text-[10px] font-extrabold tracking-[2px] text-navy-300">04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
