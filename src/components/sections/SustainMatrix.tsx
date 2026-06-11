import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Pillar } from '@/types';

const tile = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
};

function StoryTile({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <motion.div
      variants={tile}
      className="flex flex-col justify-between border border-navy-100 bg-white p-6 lg:p-7 3xl:p-9"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-[12px] font-semibold tracking-[2px] text-navy-300">{pillar.index}</span>
      </div>
      <div className="pt-8">
        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-emerald-600">
          {pillar.subtitle}
        </p>
        <h3 className="mt-1.5 text-[clamp(1.1rem,1.5vw,1.35rem)] font-semibold capitalize text-navy-900">
          {pillar.title}
        </h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-navy-500 3xl:text-sm">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}

function PhotoTile({ index }: { index: number }) {
  const media = PILLAR_MEDIA[index];
  return (
    <motion.div variants={tile} className="group relative min-h-[240px] overflow-hidden">
      <img
        src={media.src}
        alt={media.alt}
        width={1400}
        height={1050}
        loading="lazy"
        decoding="async"
        className="will-transform absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
      />
      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[1.5px] text-navy-800">
        {PILLARS[index].index}
      </span>
    </motion.div>
  );
}

/**
 * "Sustain Matrix" — a disciplined checkerboard: business photography and the
 * pillar stories alternate in a sharp 4×2 matrix framed by a single rule.
 * No rounded showpieces, no motion theatre — structure, type and imagery in
 * strict professional rhythm.
 */
export function SustainMatrix() {
  // Checkerboard order: photo/story alternating, flipped on the second row.
  const row1: Array<{ type: 'photo' | 'story'; i: number }> = [
    { type: 'photo', i: 0 },
    { type: 'story', i: 0 },
    { type: 'photo', i: 1 },
    { type: 'story', i: 1 },
  ];
  const row2: Array<{ type: 'photo' | 'story'; i: number }> = [
    { type: 'story', i: 2 },
    { type: 'photo', i: 2 },
    { type: 'story', i: 3 },
    { type: 'photo', i: 3 },
  ];

  return (
    <section
      id="sustain-matrix"
      aria-label="Why we exist — matrix"
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
          description={SUSTAINABILITY.body}
        />

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 overflow-hidden rounded-[1.5rem] border border-navy-100 shadow-glass lg:mt-20"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {[...row1, ...row2].map((cell, idx) =>
              cell.type === 'photo' ? (
                <PhotoTile key={`p-${cell.i}-${idx}`} index={cell.i} />
              ) : (
                <StoryTile key={`s-${cell.i}-${idx}`} pillar={PILLARS[cell.i]} />
              ),
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={cn('mt-6 text-center text-[11px] font-semibold uppercase tracking-[2.5px] text-navy-300')}
        >
          The Root · The Branches · The Canopy · The Horizon
        </motion.p>
      </Container>
    </section>
  );
}
