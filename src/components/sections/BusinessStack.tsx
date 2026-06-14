import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

/**
 * Concept 03 — "The Deck".
 * Full-width dossier cards that pin (position: sticky) and pile on top of
 * each other as you scroll — each incoming card slides over the last while
 * the covered card gently scales back (transform only, scroll-driven via
 * useScroll/useTransform). The section uses overflow-x-clip so sticky
 * positioning keeps working.
 */

function StackCard({
  business,
  index,
  total,
  progress,
}: {
  business: Business;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = business.icon;
  // As the next card slides over this one, scale this card back slightly.
  const start = index / total;
  const end = (index + 1) / total;
  const scale = useTransform(progress, [start, end], [1, 0.94]);

  return (
    <li
      style={{ top: `calc(clamp(4.5rem, 9vh, 7rem) + ${index * 16}px)` }}
      className="sticky"
    >
      <motion.article
        style={{ scale }}
        className="will-transform relative origin-top overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-6 shadow-glass-lg sm:p-8 lg:min-h-[360px] lg:p-10 3xl:p-12"
      >
        {/* Ghost numeral */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-6 select-none text-[clamp(5rem,10vw,9rem)] font-extrabold leading-none tracking-tighter text-navy-900 opacity-[0.04]"
        >
          {business.index}
        </span>

        <div className="relative grid gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Identity column */}
          <div className="flex items-start gap-4 lg:col-span-4 lg:flex-col lg:gap-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 3xl:h-14 3xl:w-14">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold tracking-[2px] text-emerald-500">
                {business.index} / 0{total}
              </p>
              <h3 className="mt-1 text-[clamp(1.35rem,2vw,1.75rem)] font-normal capitalize leading-tight text-navy-900">
                {business.title}
              </h3>
              <p className="mt-1 text-sm font-normal text-emerald-600">{business.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-navy-500 3xl:text-base">
              {business.description}
            </p>
            <span className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
              Discover more
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>

          {/* Capability checklist */}
          <ul className="grid list-none grid-cols-2 gap-x-4 gap-y-3 self-start lg:col-span-3 lg:grid-cols-1">
            {business.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-sm text-navy-600">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

        </div>
      </motion.article>
    </li>
  );
}

export function BusinessStack() {
  const stackRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="business-stack"
      aria-label="Our businesses — stacked deck"
      className="section-py relative overflow-x-clip bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col items-center gap-4 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-bold uppercase tracking-[2.5px] text-navy-300"
          >
            Concept 03 · The Deck
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">The universe,</span>{' '}
            <span className="text-navy-900">layer by layer.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* Sticky deck */}
        <motion.ul
          ref={stackRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="mt-12 flex list-none flex-col gap-8 pb-[6vh] lg:mt-16"
        >
          {BUSINESSES.map((business, index) => (
            <StackCard
              key={business.id}
              business={business}
              index={index}
              total={BUSINESSES.length}
              progress={scrollYProgress}
            />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
