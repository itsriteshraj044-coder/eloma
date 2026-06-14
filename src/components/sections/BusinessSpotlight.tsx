import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 05 — "Spotlight Index".
 * An oversized typographic index: six names, one standard. Hovering a row
 * dims the rest and summons a glass dossier card that trails the cursor on
 * a spring (x/y transforms only). Below lg the preview card is dropped and
 * each row carries its details inline.
 */

export function BusinessSpotlight() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Cursor-trailing preview card position.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });

  const hovered = BUSINESSES.find((b) => b.id === hoveredId) ?? null;
  const HoveredIcon = hovered?.icon;

  return (
    <section
      id="business-spotlight"
      aria-label="Our businesses — spotlight index"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 right-[18%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
        <div className="absolute -bottom-32 left-[12%] h-80 w-80 rounded-full bg-navy-50/80 blur-3xl" />
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
              Concept 05 · Spotlight Index
            </motion.span>
            <motion.span variants={fadeUp} className="eyebrow mt-4 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The Business Universe
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
            >
              <span className="text-emerald-500">Six names.</span>{' '}
              <span className="text-navy-900">One standard.</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-body-fluid text-navy-500 lg:col-span-5">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── Index ── */}
        <motion.div
          ref={listRef}
          variants={staggerParent(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          onMouseMove={(e) => {
            const rect = listRef.current?.getBoundingClientRect();
            if (!rect) return;
            mx.set(e.clientX - rect.left);
            my.set(e.clientY - rect.top);
          }}
          onMouseLeave={() => setHoveredId(null)}
          className="relative mt-12"
        >
          <ul className="list-none">
            {BUSINESSES.map((business) => {
              const Icon = business.icon;
              const isHovered = hoveredId === business.id;
              const isDimmed = hoveredId !== null && !isHovered;
              return (
                <motion.li
                  key={business.id}
                  variants={fadeUp}
                  onMouseEnter={() => setHoveredId(business.id)}
                  className={cn(
                    'group cursor-pointer border-t border-navy-100 transition-opacity duration-300 last:border-b',
                    isDimmed && 'opacity-35',
                  )}
                >
                  <div className="grid items-center gap-x-4 gap-y-2 px-1 py-6 sm:px-3 lg:grid-cols-12 lg:py-8">

                    {/* Numeral */}
                    <span
                      className={cn(
                        'text-sm font-bold tracking-[2px] transition-colors duration-300 lg:col-span-1',
                        isHovered ? 'text-emerald-500' : 'text-navy-300',
                      )}
                    >
                      {business.index}
                    </span>

                    {/* Oversized title */}
                    <h3
                      className={cn(
                        'will-transform text-[clamp(1.5rem,4.5vw,2.35rem)] font-normal capitalize leading-[1.1] text-navy-900 transition-transform duration-400 ease-premium lg:col-span-6',
                        isHovered && 'lg:translate-x-3',
                      )}
                    >
                      {business.title}
                    </h3>

                    {/* Tagline (desktop) */}
                    <p className="hidden text-sm text-navy-400 lg:col-span-4 lg:block">
                      {business.tagline}
                    </p>

                    {/* Arrow */}
                    <span
                      className={cn(
                        'hidden h-11 w-11 place-items-center justify-self-end rounded-full border transition-colors duration-300 lg:col-span-1 lg:grid',
                        isHovered
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-600'
                          : 'border-navy-100 bg-white text-navy-400',
                      )}
                    >
                      <ArrowUpRight
                        className={cn(
                          'will-transform h-[18px] w-[18px] transition-transform duration-400 ease-premium',
                          isHovered && 'rotate-45',
                        )}
                        aria-hidden="true"
                      />
                    </span>

                    {/* Inline details (below lg, where there is no cursor card) */}
                    <div className="lg:hidden">
                      <p className="flex items-center gap-2 text-[13px] font-normal text-emerald-600">
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {business.tagline}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-navy-500">
                        {business.description}
                      </p>
                      <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-navy-400">
                        {business.features.map((feature, fi) => (
                          <span key={feature} className="flex items-center gap-2.5">
                            {fi > 0 && (
                              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-400 opacity-70" />
                            )}
                            {feature}
                          </span>
                        ))}
                      </p>
                    </div>

                  </div>
                </motion.li>
              );
            })}
          </ul>

          {/* ── Cursor-trailing dossier card (lg+) ── */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
            aria-hidden="true"
          >
            <AnimatePresence>
              {hovered && HoveredIcon && (
                <motion.div
                  key={hovered.id}
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                  className="will-transform ml-8 w-[300px] -translate-y-1/2 rounded-2xl border border-emerald-200/70 bg-white/95 p-5 shadow-glass-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <HoveredIcon className="h-5 w-5" />
                    </span>
                    <p className="text-[13px] font-semibold leading-snug text-emerald-700">
                      {hovered.tagline}
                    </p>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-navy-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                    {hovered.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {hovered.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-navy-50/80 px-2.5 py-1 text-[11px] font-medium text-navy-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
