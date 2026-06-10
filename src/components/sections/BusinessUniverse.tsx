import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

function BusinessCard({ business }: { business: Business }) {
  const Icon = business.icon;
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-glass transition-all duration-300 hover:border-emerald-200 hover:shadow-[0_24px_64px_-12px_rgba(10,35,65,0.18)] 3xl:rounded-[2rem]"
    >
      {/* Top accent bar */}
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Diagonal shimmer */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

      {/* Ghost index */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 select-none text-[96px] font-black leading-none text-navy-900/[0.04]"
      >
        {business.index}
      </span>

      <div className="relative flex h-full flex-col p-6 sm:p-7 3xl:p-9 4xl:p-12">
        {/* Icon row */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-2xl bg-emerald-400/20 blur-md opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-600 text-white shadow-glow-emerald transition-transform duration-300 group-hover:scale-105 3xl:h-20 3xl:w-20 3xl:rounded-3xl 4xl:h-24 4xl:w-24">
              <Icon className="h-8 w-8 3xl:h-10 3xl:w-10 4xl:h-12 4xl:w-12" aria-hidden="true" />
            </span>
          </div>
          <span className="text-[10px] font-bold tracking-[0.25em] text-navy-200">
            {business.index}
          </span>
        </div>

        {/* Text */}
        <h3 className="mt-5 text-xl font-bold text-navy-900 sm:text-2xl 3xl:text-3xl 4xl:text-3xl">
          {business.title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-emerald-600 sm:text-base 3xl:text-base 4xl:text-lg">
          {business.tagline}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base 3xl:text-base 4xl:text-lg">
          {business.description}
        </p>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-navy-100 to-transparent" />

        {/* Feature pills */}
        <div className="flex flex-wrap gap-2">
          {business.features.map((f) => (
            <span
              key={f}
              className="flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors duration-200 group-hover:border-emerald-300 group-hover:bg-emerald-100 3xl:px-4 3xl:py-2 3xl:text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-1.5 pt-5 text-base font-semibold text-navy-800 transition-colors duration-200 group-hover:text-emerald-600 3xl:text-lg">
          Discover more
          <ArrowUpRight
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 3xl:h-6 3xl:w-6"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function BusinessUniverse() {
  return (
    <section
      id="businesses"
      aria-label="Our businesses"
      className="section-py relative overflow-hidden"
    >
      {/* Section background */}
      <div className="absolute inset-0 bg-white" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-20" aria-hidden="true" />

      <Container className="relative">
        {/* Counter badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-semibold text-navy-600 shadow-glass 3xl:px-7 3xl:py-3 3xl:text-base">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-emerald-400">
              5
            </span>
            Business Verticals
          </span>
        </motion.div>

        <SectionHeading
          eyebrow="The Business Universe"
          title={
            <>
              Four worlds. <span style={{ color: '#08213c38' }}>One universe.</span>
            </>
          }
          description={BUSINESS_UNIVERSE.description}
        />

        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 3xl:gap-8 4xl:gap-10"
        >
          {BUSINESSES.map((business, i) => {
            const isLastOdd = i === BUSINESSES.length - 1 && BUSINESSES.length % 2 === 1;
            return (
              <motion.div
                key={business.id}
                variants={scaleIn}
                className={isLastOdd ? 'sm:col-span-2 xl:col-span-1' : ''}
              >
                <BusinessCard business={business} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
