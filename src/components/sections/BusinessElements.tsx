import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

/**
 * Concept 10 — "The Elements".
 * The divisions presented as a periodic table of the group: each tile is an
 * element card — atomic number (index), two-letter symbol, name — that flips
 * in 3D (rotateY, transform-only) on hover or tap to reveal the dossier on
 * its back. Chemistry as brand language: six elements, one compound.
 */

const SYMBOLS: Record<string, string> = {
  'call-centre': 'Cc',
  imports: 'Im',
  'it-infrastructure': 'It',
  'supply-chain': 'Sc',
  travel: 'Tr',
  'virtual-security': 'Vs',
};

function ElementTile({ business }: { business: Business }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = business.icon;
  const symbol = SYMBOLS[business.id] ?? business.title.slice(0, 2);

  return (
    <motion.div variants={fadeUp} className="h-[clamp(320px,30vw,380px)] [perspective:1400px]">
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${business.title} — flip for details`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        className="will-transform relative h-full w-full cursor-pointer outline-none [transform-style:preserve-3d] focus-visible:[&>div]:ring-2 focus-visible:[&>div]:ring-emerald-400"
      >
        {/* ── Front face — the element ── */}
        <div className="absolute inset-0 flex flex-col rounded-[1.5rem] border border-navy-100 bg-white p-5 shadow-glass [backface-visibility:hidden] sm:p-6">
          <div className="flex items-start justify-between">
            <span className="text-sm font-bold tabular-nums text-navy-300">{business.index}</span>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          {/* Element symbol */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-[clamp(3.5rem,6vw,5rem)] font-extrabold leading-none tracking-tight text-navy-900">
              {symbol.charAt(0)}
              <span className="text-emerald-500">{symbol.charAt(1)}</span>
            </p>
            <p className="mt-3 text-[clamp(1.05rem,1.3vw,1.25rem)] font-semibold capitalize text-navy-800">
              {business.title}
            </p>
            <p className="mt-1 text-center text-xs leading-snug text-navy-400">{business.tagline}</p>
          </div>

          <div className="flex items-center justify-between border-t border-navy-50 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-navy-300">
              Eloma element
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
              <RefreshCw className="h-3 w-3" aria-hidden="true" />
              Flip
            </span>
          </div>
        </div>

        {/* ── Back face — the dossier ── */}
        <div className="absolute inset-0 flex flex-col rounded-[1.5rem] border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-white p-5 shadow-glass-lg [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-emerald-600 shadow-glass">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold capitalize text-navy-900">{business.title}</p>
            <span className="ml-auto text-xs font-bold text-emerald-500">{symbol}</span>
          </div>

          <p className="mt-3 flex-1 overflow-hidden text-[13px] leading-relaxed text-navy-600">
            {business.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {business.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-navy-600 shadow-glass"
              >
                {feature}
              </span>
            ))}
          </div>

          <span className="mt-3 inline-flex items-center gap-1.5 border-t border-emerald-100 pt-3 text-[13px] font-semibold text-emerald-600">
            Discover more
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function BusinessElements() {
  return (
    <section
      id="business-elements"
      aria-label="Our businesses — the elements"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black_20%,transparent_75%)]" />
        <div className="absolute -top-24 right-[18%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
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
            Concept 10 · The Elements
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">Six elements.</span>{' '}
            <span className="text-navy-900">One compound.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* Element grid */}
        <motion.div
          variants={staggerParent(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-5"
        >
          {BUSINESSES.map((business) => (
            <ElementTile key={business.id} business={business} />
          ))}
        </motion.div>

        {/* Legend strip */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center text-xs font-semibold uppercase tracking-[2px] text-navy-300"
        >
          Hover or tap an element to reveal its properties
        </motion.p>
      </Container>
    </section>
  );
}
