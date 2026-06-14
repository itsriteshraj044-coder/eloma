import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Pillar } from '@/types';

const WORDS = SUSTAINABILITY.body.split(' ');

function StatementWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  );
}

function VistaPillar({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <motion.div variants={fadeUp} className="group relative pt-7">
      {/* Top rule — emerald sweep on hover */}
      <span className="absolute inset-x-0 top-0 h-px bg-navy-100" aria-hidden="true" />
      <span
        className="will-transform absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-emerald-400 transition-transform duration-500 ease-premium group-hover:scale-x-100"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-[13px] font-bold tracking-[2.5px] text-navy-200">{pillar.index}</span>
      </div>
      <h3 className="mt-5 text-[clamp(1.2rem,1.5vw,1.45rem)] font-black uppercase tracking-[-0.02em] text-navy-900">
        {pillar.title}
      </h3>
      <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[2px] text-emerald-600">
        {pillar.subtitle}
      </p>
      <p className="mt-3 text-[clamp(0.875rem,1vw,1rem)] leading-[1.75] text-navy-500">
        {pillar.description}
      </p>
    </motion.div>
  );
}

/**
 * "Vista" — a scroll-illuminated manifesto. The commitment reads as one large
 * statement whose words light up word-by-word as the visitor scrolls, flanked
 * by photography drifting on parallax; the four pillars then settle beneath
 * as a quiet editorial row.
 */
export function SustainVista() {
  const statementRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: statementProgress } = useScroll({
    target: statementRef,
    offset: ['start 0.85', 'end 0.45'],
  });
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const driftUp = useTransform(sectionProgress, [0, 1], [60, -60]);
  const driftDown = useTransform(sectionProgress, [0, 1], [-50, 70]);

  return (
    <section
      ref={sectionRef}
      id="sustain-vista"
      aria-label="Why we exist — vista"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
        {/* Parallax photography flanking the statement (decorative) */}
        <motion.div
          style={{ y: driftUp }}
          className="will-transform pointer-events-none absolute -left-6 top-40 hidden w-56 rotate-[-5deg] overflow-hidden rounded-2xl shadow-glass-lg xl:block 3xl:w-64"
          aria-hidden="true"
        >
          <img
            src={PILLAR_MEDIA[0].src}
            alt=""
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
        </motion.div>
        <motion.div
          style={{ y: driftDown }}
          className="will-transform pointer-events-none absolute -right-6 top-64 hidden w-56 rotate-[4deg] overflow-hidden rounded-2xl shadow-glass-lg xl:block 3xl:w-64"
          aria-hidden="true"
        >
          <img
            src={PILLAR_MEDIA[2].src}
            alt=""
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
        </motion.div>

        {/* Eyebrow + heading */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col items-center gap-4 text-center sm:gap-5"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Why We Exist
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-section-h2 uppercase text-balance text-navy-900">
            Committed to Sustainable Growth
            <br />
            <span className="text-emerald-500">and Responsible Business</span>
          </motion.h2>
        </motion.div>

        {/* Scroll-illuminated statement */}
        <div ref={statementRef} className="mx-auto mt-14 max-w-4xl lg:mt-20">
          <p className="text-center text-[clamp(1.25rem,2.2vw,1.9rem)] font-semibold leading-[1.6] tracking-[-0.01em] text-navy-900 text-balance">
            {WORDS.map((word, i) => (
              <StatementWord
                key={`${word}-${i}`}
                word={word}
                progress={statementProgress}
                range={[i / WORDS.length, Math.min(1, (i + 1.5) / WORDS.length)]}
              />
            ))}
          </p>
        </div>

        {/* Pillar row */}
        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-24 xl:grid-cols-4 3xl:gap-x-10"
        >
          {PILLARS.map((pillar) => (
            <VistaPillar key={pillar.index} pillar={pillar} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
