import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

const CHAPTER_MS = 6000;

/** Text that rises out of an overflow mask — one line at a time. */
function MaskedReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="will-transform block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: EASE_PREMIUM, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * "Showcase" — a cinematic chapter player. One widescreen stage where the
 * four pillars play as film chapters: slow Ken Burns drift on the
 * photography, copy rising through line masks, and a timed progress bar on
 * each chapter tab. Auto-advances; hover pauses; click any chapter to jump.
 */
export function SustainShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pillar = PILLARS[active];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PILLARS.length), CHAPTER_MS);
    return () => clearInterval(t);
  }, [paused, active]);

  return (
    <section
      id="sustain-showcase"
      aria-label="Why we exist — showcase"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container>
        <SectionHeading
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth
              <br />
              <span className="text-emerald-500">and Responsible Business</span>
            </>
          }
          description={SUSTAINABILITY.body}
        />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mt-12 overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-glass-lg lg:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Stage ─────────────────────────────────────────────────── */}
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE_PREMIUM }}
              >
                {/* Ken Burns drift */}
                <motion.img
                  src={PILLAR_MEDIA[active].src}
                  alt={PILLAR_MEDIA[active].alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.09 }}
                  transition={{ duration: CHAPTER_MS / 1000 + 1.2, ease: 'linear' }}
                  className="will-transform h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Scrim for legibility */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/25 to-transparent"
              aria-hidden="true"
            />

            {/* Chapter copy — line-mask reveals, re-run per chapter */}
            <div key={`copy-${active}`} className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <MaskedReveal delay={0.15}>
                <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-300">
                  Chapter {pillar.index}
                  <span className="h-px w-8 bg-emerald-300/70" aria-hidden="true" />
                  {pillar.subtitle}
                </span>
              </MaskedReveal>
              <MaskedReveal delay={0.28}>
                <span className="mt-3 block text-card-heading uppercase text-white">
                  {pillar.title}
                </span>
              </MaskedReveal>
              <MaskedReveal delay={0.42}>
                <span className="mt-3 block max-w-2xl text-body-fluid text-white/85">
                  {pillar.description}
                </span>
              </MaskedReveal>
            </div>
          </div>

          {/* ── Chapter tabs with timed progress ──────────────────────── */}
          <div className="grid grid-cols-2 border-t border-navy-100 lg:grid-cols-4" role="tablist" aria-label="Chapters">
            {PILLARS.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group relative min-h-[44px] border-navy-100 px-5 py-4 text-left transition-colors duration-300 lg:px-6 lg:py-5',
                    'odd:border-r lg:odd:border-r-0 lg:[&:not(:last-child)]:border-r',
                    isActive ? 'bg-white' : 'bg-navy-50/50 hover:bg-white',
                  )}
                >
                  {/* Progress hairline */}
                  <span className="absolute inset-x-0 top-0 h-[2.5px] overflow-hidden bg-navy-100/70" aria-hidden="true">
                    {isActive && (
                      <motion.span
                        key={`progress-${active}-${paused ? 'p' : 'r'}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{ duration: paused ? 0.3 : CHAPTER_MS / 1000, ease: 'linear' }}
                        className="will-transform block h-full w-full origin-left bg-emerald-400"
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      'block text-[11px] font-extrabold tracking-[2px] transition-colors duration-300',
                      isActive ? 'text-emerald-600' : 'text-navy-300',
                    )}
                  >
                    {p.index}
                  </span>
                  <span
                    className={cn(
                      'mt-1 block text-[clamp(0.85rem,1vw,1rem)] font-extrabold uppercase tracking-[-0.01em] transition-colors duration-300',
                      isActive ? 'text-navy-900' : 'text-navy-400 group-hover:text-navy-700',
                    )}
                  >
                    {p.title}
                  </span>
                  <span className="mt-0.5 hidden text-[11px] font-semibold text-navy-300 sm:block">
                    {p.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
