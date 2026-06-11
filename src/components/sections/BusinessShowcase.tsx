import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { BUSINESS_THEMES } from '@/components/sections/BusinessUniverse';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

const FALLBACK_THEME = BUSINESS_THEMES['call-centre'];

/**
 * "Business Showcase" — 2026 editorial pattern: typography is the design.
 * Each business is an oversized headline resting in quiet grey; engaging it
 * fills the type, unfolds the story, and lets a whisper of that business's
 * colour world bleed in. No cards, no borders beyond hairlines, light only.
 */
function ShowcaseRow({
  business,
  isOpen,
  onToggle,
}: {
  business: Business;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = business.icon;
  const theme = BUSINESS_THEMES[business.id] ?? FALLBACK_THEME;

  return (
    <motion.li
      variants={{ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } } }}
      className="border-t border-navy-100 last:border-b"
    >
      {/* Headline row */}
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6 lg:gap-8 3xl:py-7"
      >
        <span
          style={{ color: theme.accent }}
          className="w-8 shrink-0 text-[11px] font-semibold tracking-[2px] sm:w-10"
        >
          {business.index}
        </span>

        <span
          className={cn(
            'flex-1 text-[clamp(1.25rem,2.4vw,1.9rem)] font-light capitalize leading-[1.15] tracking-[-0.01em] transition-colors duration-400',
            isOpen ? 'text-navy-900' : 'text-navy-200 group-hover:text-navy-900',
          )}
        >
          {business.title}
        </span>

        <span
          style={isOpen ? { color: theme.accent } : undefined}
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300 sm:h-11 sm:w-11',
            isOpen ? 'bg-white shadow-glass' : 'text-navy-300 group-hover:text-navy-900',
          )}
        >
          <Plus
            className={cn(
              'h-5 w-5 transition-transform duration-400 ease-premium',
              isOpen && 'rotate-45',
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      {/* Unfolding story */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_PREMIUM }}
            className="overflow-hidden"
          >
            {/* Whisper of the colour world behind the open story */}
            <div
              style={{ background: `radial-gradient(520px 200px at 18% 0%, ${theme.bg}, transparent 72%)` }}
              className="grid gap-6 pb-8 pl-12 pr-2 sm:pl-16 lg:grid-cols-12 lg:gap-8 lg:pb-10"
            >
              <div className="lg:col-span-7">
                <p style={{ color: theme.accent }} className="text-sm font-normal">
                  {business.tagline}
                </p>
                <p className="mt-3 max-w-[62ch] text-body-fluid text-navy-500">
                  {business.description}
                </p>
              </div>

              <div className="flex flex-col items-start lg:col-span-5">
                <span
                  style={{ backgroundColor: theme.bg, color: theme.accent }}
                  className="grid h-12 w-12 place-items-center rounded-xl"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-semibold uppercase tracking-[1.5px] text-navy-400">
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

                <span
                  style={{ color: theme.accent }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  Discover more
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function BusinessShowcase() {
  const [openId, setOpenId] = useState<string | null>(BUSINESSES[0].id);

  return (
    <section
      id="business-showcase"
      aria-label="Our businesses — showcase"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
        <SectionHeading
          eyebrow="The Business Universe"
          title={
            <>
              <span style={{ color: '#0d9a6a' }}>Four worlds.</span>{' '}
              <span className="text-navy-900">One universe.</span>
            </>
          }
          titleClassName="font-normal normal-case"
          description={BUSINESS_UNIVERSE.description}
        />

        <motion.ul
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 list-none"
        >
          {BUSINESSES.map((business) => (
            <ShowcaseRow
              key={business.id}
              business={business}
              isOpen={openId === business.id}
              onToggle={() => setOpenId(openId === business.id ? null : business.id)}
            />
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
