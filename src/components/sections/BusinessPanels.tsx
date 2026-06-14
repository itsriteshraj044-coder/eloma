import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

/**
 * Concept 02 — "Gateway Panels".
 * Six vertical gates standing side by side; the active one swings open
 * (Framer layout/FLIP — transform-based, no width animation) to reveal its
 * dossier while the others compress into labelled spines.
 * Below lg the gates become a simple two-column card grid.
 */

function ExpandedContent({ business }: { business: Business }) {
  const Icon = business.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, delay: 0.2, ease: EASE_PREMIUM }}
      className="flex h-full w-[clamp(272px,27vw,460px)] flex-col"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600 3xl:h-14 3xl:w-14">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <span className="text-sm font-bold tracking-[2px] text-emerald-500">{business.index}</span>
      </div>

      <h3 className="mt-5 text-[clamp(1.25rem,1.7vw,1.5rem)] font-normal capitalize leading-tight text-navy-900">
        {business.title}
      </h3>
      <p className="mt-1 text-sm font-normal text-emerald-600">{business.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-navy-500 3xl:text-base">
        {business.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {business.features.map((feature) => (
          <span
            key={feature}
            className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-normal text-navy-600 shadow-glass"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            {feature}
          </span>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-emerald-600">
        Discover more
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </motion.div>
  );
}

function CollapsedContent({ business }: { business: Business }) {
  const Icon = business.icon;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15, ease: EASE_PREMIUM }}
      className="flex h-full flex-col items-center justify-between py-1"
    >
      <span className="text-xs font-bold tracking-[2px] text-navy-300">{business.index}</span>
      <span className="whitespace-nowrap text-[clamp(0.95rem,1.05vw,1.15rem)] font-semibold capitalize text-navy-700 [writing-mode:vertical-rl] rotate-180">
        {business.title}
      </span>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-50 text-navy-500">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    </motion.div>
  );
}

/** Plain card for the mobile/tablet fallback grid. */
function PanelCard({ business }: { business: Business }) {
  const Icon = business.icon;
  return (
    <motion.article
      variants={fadeUp}
      className="flex h-full flex-col rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-glass sm:p-6"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-xs font-bold tracking-[2px] text-navy-300">{business.index}</span>
      </div>
      <h3 className="mt-4 text-[clamp(1.15rem,4vw,1.35rem)] font-normal capitalize leading-tight text-navy-900">
        {business.title}
      </h3>
      <p className="mt-1 text-[13px] font-normal text-emerald-600">{business.tagline}</p>
      <p className="mt-2 text-sm leading-relaxed text-navy-500">{business.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {business.features.map((feature) => (
          <span
            key={feature}
            className="flex items-center gap-1.5 rounded-full bg-navy-50/80 px-2.5 py-1 text-xs font-normal text-navy-600"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            {feature}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function BusinessPanels() {
  const [activeId, setActiveId] = useState(BUSINESSES[0].id);

  return (
    <section
      id="business-panels"
      aria-label="Our businesses — gateway panels"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[12%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
        <div className="absolute -bottom-28 left-[6%] h-80 w-80 rounded-full bg-navy-50/80 blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8"
        >
          <div className="lg:col-span-7">
            <motion.span
              variants={fadeUp}
              className="block text-[11px] font-bold uppercase tracking-[2.5px] text-navy-300"
            >
              Concept 02 · Gateway Panels
            </motion.span>
            <motion.span variants={fadeUp} className="eyebrow mt-4 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The Business Universe
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
            >
              <span className="text-emerald-500">Six gates.</span>{' '}
              <span className="text-navy-900">Step into each world.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-body-fluid text-navy-500 lg:col-span-5">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── Desktop: expanding gate panels ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mt-12 hidden h-[clamp(460px,42vw,580px)] gap-3 lg:flex 3xl:gap-4"
        >
          {BUSINESSES.map((business) => {
            const isActive = business.id === activeId;
            return (
              <motion.article
                key={business.id}
                layout
                tabIndex={0}
                role="button"
                aria-expanded={isActive}
                aria-label={`Expand ${business.title}`}
                onMouseEnter={() => setActiveId(business.id)}
                onFocus={() => setActiveId(business.id)}
                onClick={() => setActiveId(business.id)}
                transition={{ layout: { duration: 0.55, ease: EASE_PREMIUM } }}
                className={cn(
                  'will-transform relative cursor-pointer overflow-hidden rounded-[1.75rem] border p-5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 3xl:p-7',
                  isActive
                    ? 'flex-[3.4] border-emerald-200 bg-gradient-to-b from-white to-emerald-50/60 shadow-glass-lg'
                    : 'flex-1 border-navy-100 bg-white transition-colors duration-300 hover:border-emerald-200/70',
                )}
              >
                {isActive ? (
                  <ExpandedContent business={business} />
                ) : (
                  <CollapsedContent business={business} />
                )}
              </motion.article>
            );
          })}
        </motion.div>

        {/* ── Mobile / tablet: card grid fallback ── */}
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {BUSINESSES.map((business) => (
            <PanelCard key={business.id} business={business} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
