import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Pillar } from '@/types';

function StrataCard({ pillar, mediaIndex }: { pillar: Pillar; mediaIndex: number }) {
  const Icon = pillar.icon;
  const media = PILLAR_MEDIA[mediaIndex];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: EASE_PREMIUM }}
      className="overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-glass-lg"
    >
      <div className="grid lg:grid-cols-2">
        {/* Photography */}
        <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[440px]">
          <img
            src={media.src}
            alt={media.alt}
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[2px] text-navy-800">
            {pillar.index} / 04
          </span>
        </div>

        {/* Story */}
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 3xl:p-16">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="mt-7 text-eyebrow-fluid uppercase text-emerald-600">{pillar.subtitle}</p>
          <h3 className="mt-2 text-card-heading uppercase text-navy-900">{pillar.title}</h3>
          <p className="mt-4 max-w-xl text-body-fluid text-navy-500">{pillar.description}</p>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * "Strata" — a sticky stacking deck. Each pillar is a full-width plate that
 * pins below the navbar; the next chapter slides up and settles over it with
 * a slight offset, so the four layers read as strata building on each other.
 */
export function SustainStrata() {
  return (
    <section
      id="sustain-strata"
      aria-label="Why we exist — strata"
      className="section-py relative overflow-hidden bg-gradient-to-b from-white via-navy-50/50 to-white"
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

        <div className="mt-14 lg:mt-20">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.index}
              className="sticky mb-8 last:mb-0"
              style={{ top: `calc(92px + ${i * 22}px)` }}
            >
              <StrataCard pillar={pillar} mediaIndex={i} />
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 text-center text-[11px] font-semibold uppercase tracking-[2.5px] text-navy-300"
        >
          Four layers · one foundation
        </motion.p>
      </Container>
    </section>
  );
}
