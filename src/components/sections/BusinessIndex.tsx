import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { BUSINESS_THEMES } from '@/components/sections/BusinessUniverse';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

const FALLBACK_THEME = BUSINESS_THEMES['call-centre'];

/**
 * "Business Index" — the same six businesses as the Business Universe grid,
 * presented as a premium editorial index: numbered hairline rows that tint
 * with each business's colour world on hover. Light surfaces only.
 */
function IndexRow({ business }: { business: Business }) {
  const Icon = business.icon;
  const theme = BUSINESS_THEMES[business.id] ?? FALLBACK_THEME;

  return (
    <motion.li variants={fadeUp} className="group relative overflow-hidden border-t border-navy-100 last:border-b">
      {/* Colour-world tint — fades in behind the row on hover */}
      <span
        aria-hidden="true"
        style={{ backgroundColor: theme.bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 ease-premium group-hover:opacity-100"
      />

      <div className="relative grid gap-3 px-2 py-6 sm:px-4 lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-7 3xl:py-8">

        {/* Index numeral */}
        <span
          style={{ color: theme.accent }}
          className="text-sm font-semibold tracking-[2px] lg:col-span-1"
        >
          {business.index}
        </span>

        {/* Icon + title + tagline */}
        <div className="flex items-center gap-4 lg:col-span-4">
          <span
            style={{ backgroundColor: theme.bg, color: theme.accent }}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-transform duration-400 ease-premium group-hover:scale-110 group-hover:-rotate-3"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="will-transform transition-transform duration-400 ease-premium lg:group-hover:translate-x-1.5">
            <h3 className="text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900">
              {business.title}
            </h3>
            <p style={{ color: theme.accent }} className="mt-0.5 text-[13px] font-normal">
              {business.tagline}
            </p>
          </div>
        </div>

        {/* Description + features */}
        <div className="lg:col-span-6">
          <p className="text-sm leading-relaxed text-navy-500">
            {business.description}
          </p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-navy-400">
            {business.features.map((feature, fi) => (
              <span key={feature} className="flex items-center gap-2.5">
                {fi > 0 && (
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: theme.accent }}
                    className="h-1 w-1 rounded-full opacity-60"
                  />
                )}
                {feature}
              </span>
            ))}
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden lg:col-span-1 lg:flex lg:justify-end">
          <span
            style={{ color: theme.accent }}
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-glass transition-transform duration-400 ease-premium group-hover:rotate-45"
          >
            <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
        </div>

      </div>
    </motion.li>
  );
}

export function BusinessIndex() {
  return (
    <section
      id="business-index"
      aria-label="Our businesses — index"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">

        {/* Header — left-aligned editorial counterpoint to the centred grid above */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8"
        >
          <div className="lg:col-span-7">
            <motion.span variants={fadeUp} className="eyebrow w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The Business Universe
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
            >
              <span style={{ color: '#0d9a6a' }}>Four worlds.</span>{' '}
              <span className="text-navy-900">One universe.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-body-fluid text-navy-500 lg:col-span-5">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* Index rows */}
        <motion.ul
          variants={staggerParent(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 list-none"
        >
          {BUSINESSES.map((business) => (
            <IndexRow key={business.id} business={business} />
          ))}
        </motion.ul>

      </Container>
    </section>
  );
}
