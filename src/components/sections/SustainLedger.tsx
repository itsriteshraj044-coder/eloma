import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

/**
 * "Ledger" — an oversized editorial index. The four pillars sit as numbered
 * entries in a typographic ledger on the left; the right panel is a sticky
 * plate where photography and the active story crossfade as entries are
 * browsed. Typography leads, chrome stays out of the way.
 */
export function SustainLedger() {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active];
  const ActiveIcon = pillar.icon;

  return (
    <section
      id="sustain-ledger"
      aria-label="Why we exist — ledger"
      className="section-py relative overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-15"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          align="left"
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth{' '}
              <span className="text-emerald-500">and Responsible Business</span>
            </>
          }
          description={SUSTAINABILITY.body}
          descriptionClassName="max-w-3xl"
        />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ── Index entries ─────────────────────────────────────────── */}
          <div role="tablist" aria-label="Pillars" className="flex flex-col">
            {PILLARS.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group relative flex min-h-[44px] w-full items-center gap-5 border-t border-navy-100 py-6 pl-5 text-left last:border-b sm:gap-8 lg:py-7"
                >
                  {isActive && (
                    <motion.span
                      layoutId="ledger-marker"
                      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                      className="absolute left-0 top-1/2 h-12 w-[3px] -translate-y-1/2 rounded-full bg-emerald-400"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      'w-[2ch] shrink-0 text-[clamp(1.9rem,3.2vw,3rem)] font-black leading-none tracking-[-0.04em] transition-colors duration-300',
                      isActive ? 'text-emerald-500' : 'text-navy-100 group-hover:text-navy-200',
                    )}
                  >
                    {p.index}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        'block text-[clamp(1.25rem,1.8vw,1.75rem)] font-black uppercase tracking-[-0.03em] transition-colors duration-300',
                        isActive ? 'text-navy-900' : 'text-navy-300 group-hover:text-navy-500',
                      )}
                    >
                      {p.title}
                    </span>
                    <span
                      className={cn(
                        'mt-1 block text-[11px] font-extrabold uppercase tracking-[2px] transition-colors duration-300',
                        isActive ? 'text-emerald-600' : 'text-navy-200',
                      )}
                    >
                      {p.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Sticky story plate ────────────────────────────────────── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-glass-lg">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={active}
                  src={PILLAR_MEDIA[active].src}
                  alt={PILLAR_MEDIA[active].alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: EASE_PREMIUM }}
                  className="will-transform absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-extrabold tracking-[2px] text-navy-800">
                {pillar.index} — {pillar.title}
              </span>
            </div>

            <motion.div
              key={`story-${active}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
              className="mt-6 flex items-start gap-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                <ActiveIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-body-fluid text-navy-500">{pillar.description}</p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
