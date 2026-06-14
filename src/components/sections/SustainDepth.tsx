import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import type { Pillar } from '@/types';

const N = PILLARS.length;

function DepthLayer({
  pillar,
  mediaIndex,
  progress,
}: {
  pillar: Pillar;
  mediaIndex: number;
  progress: MotionValue<number>;
}) {
  const Icon = pillar.icon;
  const media = PILLAR_MEDIA[mediaIndex];
  const start = mediaIndex / N;
  const end = (mediaIndex + 1) / N;

  // Fly-through: each chapter rises from deep space, fills the frame, then
  // sweeps past the camera as the next one approaches.
  const scale = useTransform(progress, [start, end], [0.62, 1.45]);
  const opacity = useTransform(
    progress,
    [start, start + 0.045, end - 0.05, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ scale, opacity, zIndex: N - mediaIndex }}
      className="will-transform absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-[min(92vw,960px)] overflow-hidden rounded-[2rem] shadow-glass-lg">
        <img
          src={media.src}
          alt={media.alt}
          width={1400}
          height={1050}
          loading="lazy"
          decoding="async"
          className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:aspect-[21/10]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/20 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
          <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-300">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-emerald-300">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            {pillar.index}
            <span className="h-px w-7 bg-emerald-300/70" aria-hidden="true" />
            {pillar.subtitle}
          </span>
          <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.5rem)] font-semibold text-white">
            {pillar.title}
          </h3>
          <p className="mt-2.5 max-w-2xl text-body-fluid text-white/85">{pillar.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function DepthDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const start = index / N;
  const end = (index + 1) / N;
  const dotScale = useTransform(progress, [start - 0.04, start, end, end + 0.04], [1, 1.6, 1.6, 1]);
  const dotOpacity = useTransform(progress, [start - 0.04, start, end, end + 0.04], [0.35, 1, 1, 0.35]);
  return (
    <motion.span
      style={{ scale: dotScale, opacity: dotOpacity }}
      className="will-transform block h-2 w-2 rounded-full bg-emerald-500"
      aria-hidden="true"
    />
  );
}

/**
 * "Depth" — a camera fly-through. The viewport pins and the four pillars
 * approach from deep in the frame, swell to fill it, and sweep past the
 * camera one after another — a dolly shot through the group's story, with
 * a dot rail tracking the dive.
 */
export function SustainDepth() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef });

  return (
    <section
      id="sustain-depth"
      aria-label="Why we exist — depth"
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
          titleClassName="normal-case font-normal tracking-normal"
          description={SUSTAINABILITY.body}
        />
      </Container>

      <div ref={trackRef} className="relative h-[380vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient backdrop */}
          <div
            className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(255,255,255,0.9)_100%)]"
            aria-hidden="true"
          />

          {PILLARS.map((pillar, i) => (
            <DepthLayer key={pillar.index} pillar={pillar} mediaIndex={i} progress={scrollYProgress} />
          ))}

          {/* Dot rail */}
          <div className="absolute right-5 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-8 lg:right-12">
            {PILLARS.map((p, i) => (
              <DepthDot key={p.index} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
