import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Pillar } from '@/types';

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white p-6 shadow-glass transition-all duration-300 hover:border-emerald-200 hover:shadow-glass-lg sm:p-8 3xl:rounded-[2rem] 3xl:p-10 4xl:p-14"
    >
      {/* Hover accent bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="flex items-center justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white 3xl:h-16 3xl:w-16 3xl:rounded-3xl 4xl:h-20 4xl:w-20">
          <Icon className="h-7 w-7 3xl:h-8 3xl:w-8 4xl:h-10 4xl:w-10" aria-hidden="true" />
        </span>
        <span className="text-base font-bold tracking-widest text-navy-200 3xl:text-lg 4xl:text-xl">
          {pillar.index}
        </span>
      </div>

      {/* Text */}
      <h3 className="mt-6 text-xl font-bold text-navy-900 sm:text-2xl 3xl:text-2xl 4xl:text-3xl">
        {pillar.title}
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-emerald-600 sm:text-sm 3xl:text-sm 4xl:text-base">
        {pillar.subtitle}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base 3xl:text-base 4xl:text-lg">
        {pillar.description}
      </p>
    </motion.div>
  );
}

/** Sustainability — commitment callout + the four pillars. */
export function Sustainability() {
  return (
    <section
      id="sustainability"
      aria-label="Sustainability"
      className="section-py relative overflow-hidden"
    >
      {/* Section background */}
      <div className="absolute inset-0 bg-white" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-20"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth
              <br />
              <span style={{ color: '#08213c38' }}>and Responsible Business</span>
            </>
          }
        />

        {/* Commitment banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 overflow-hidden rounded-3xl border border-navy-100 bg-white p-7 shadow-glass sm:p-10 3xl:rounded-[2rem] 3xl:p-12 4xl:p-16"
        >
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            {/* Icon */}
            <span className="shrink-0 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-500 text-white shadow-glow-emerald 3xl:h-20 3xl:w-20 3xl:rounded-3xl">
              <Leaf className="h-8 w-8 3xl:h-10 3xl:w-10" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700 3xl:text-base">
                Our Commitment
              </p>
              <p className="mt-2 max-w-3xl text-base leading-relaxed text-navy-700 text-pretty sm:text-lg xl:text-xl 3xl:text-xl 4xl:text-xl">
                {SUSTAINABILITY.body}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 3xl:gap-8 4xl:gap-10"
        >
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.index} pillar={pillar} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
