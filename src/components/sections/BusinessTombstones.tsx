import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

/**
 * Concept 18 — "The Tombstones".
 * The most formal treatment of all: each division as a financial tombstone —
 * the announcement plaques investment banks have printed for a century.
 * Double-ruled frames, centred typography, small caps, a seal-like index
 * medallion. No tricks; the restraint is the design. Hover deepens the
 * frame; everything reads like it belongs in the back pages of the FT.
 */

function Tombstone({ business }: { business: Business }) {
  const Icon = business.icon;
  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex h-full flex-col items-center rounded-2xl border border-navy-200 bg-white p-2 text-center shadow-glass transition-shadow duration-300 hover:shadow-glass-lg"
    >
      {/* Inner rule — the double frame */}
      <div className="flex h-full w-full flex-col items-center rounded-xl border border-navy-100 px-5 py-7 transition-colors duration-300 group-hover:border-emerald-200 sm:px-6 sm:py-8">

        {/* Seal */}
        <span className="relative grid h-12 w-12 place-items-center rounded-full border border-navy-200 bg-navy-50/60 text-navy-600 transition-colors duration-300 group-hover:border-emerald-300 group-hover:text-emerald-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
          <span className="absolute -bottom-2 rounded-full border border-navy-200 bg-white px-1.5 text-[9px] font-bold tabular-nums text-navy-500">
            {business.index}
          </span>
        </span>

        <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[2.5px] text-navy-400">
          Eloma Group announces
        </p>

        <h3 className="mt-2 text-[clamp(1.2rem,1.6vw,1.45rem)] font-semibold capitalize leading-tight text-navy-900">
          {business.title}
        </h3>

        <span aria-hidden="true" className="mt-3 block h-px w-10 bg-emerald-300" />

        <p className="mt-3 text-[13px] font-medium italic leading-snug text-navy-500">
          “{business.tagline}”
        </p>

        <p className="mt-3 text-[13px] leading-relaxed text-navy-500">
          {business.description}
        </p>

        <p className="mt-auto flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 pt-5 text-[10px] font-bold uppercase tracking-[1.5px] text-navy-400">
          {business.features.map((feature, fi) => (
            <span key={feature} className="flex items-center gap-2.5">
              {fi > 0 && (
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-400 opacity-70" />
              )}
              {feature}
            </span>
          ))}
        </p>

        <span
          aria-hidden="true"
          className="mt-4 block h-px w-full bg-navy-100 transition-colors duration-300 group-hover:bg-emerald-100"
        />
        <span className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Discover more
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </motion.article>
  );
}

export function BusinessTombstones() {
  return (
    <section
      id="business-tombstones"
      aria-label="Our businesses — the tombstones"
      className="section-py relative overflow-hidden bg-gradient-to-b from-white via-navy-50/30 to-white"
    >
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
            Concept 18 · The Tombstones
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">Six announcements.</span>{' '}
            <span className="text-navy-900">A century of form.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* Plaque grid */}
        <motion.div
          variants={staggerParent(0.09, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-6"
        >
          {BUSINESSES.map((business) => (
            <Tombstone key={business.id} business={business} />
          ))}
        </motion.div>

        {/* Colophon */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center text-[10px] font-bold uppercase tracking-[2.5px] text-navy-300"
        >
          Eloma Group · Established excellence across six verticals
        </motion.p>
      </Container>
    </section>
  );
}
