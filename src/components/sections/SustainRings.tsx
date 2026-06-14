import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM } from '@/lib/motion';

const RADII = [52, 94, 136, 178];
const ROTATE_MS = 5000;

/**
 * "Growth Rings" — the group as a living tree, read in cross-section. Four
 * concentric rings stand for the four pillars (root at the centre, horizon at
 * the rim); the active ring draws itself in emerald while its story is told
 * alongside. Auto-advances like rings forming, pauses on hover.
 */
export function SustainRings() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pillar = PILLARS[active];
  const ActiveIcon = pillar.icon;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PILLARS.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [paused, active]);

  return (
    <section
      id="sustain-rings"
      aria-label="Why we exist — growth rings"
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

        <div
          className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Rings visual ──────────────────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-[480px]">
            <div
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(60,185,140,0.08)_0%,transparent_70%)]"
              aria-hidden="true"
            />
            <svg viewBox="0 0 400 400" className="w-full" aria-hidden="true">
              {RADII.map((r, i) => (
                <circle
                  key={`base-${i}`}
                  cx="200"
                  cy="200"
                  r={r}
                  fill="none"
                  stroke={i < active ? '#a4e7cd' : '#d3deea'}
                  strokeWidth="1.25"
                />
              ))}
              {/* Active ring draws itself */}
              <motion.circle
                key={`draw-${active}`}
                cx="200"
                cy="200"
                r={RADII[active]}
                fill="none"
                stroke="#3CB98C"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform="rotate(-90 200 200)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: EASE_PREMIUM }}
              />
              {/* Centre core */}
              <circle cx="200" cy="200" r="7" fill="#3CB98C" />
              <circle cx="200" cy="200" r="13" fill="none" stroke="#a4e7cd" strokeWidth="1" />
            </svg>

            {/* Active marker on the ring */}
            <motion.span
              key={`chip-${active}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_PREMIUM }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-200 bg-white/95 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[2px] text-emerald-700 shadow-glass"
              style={{ marginTop: `calc(${(-RADII[active] / 400) * 100}% )` }}
            >
              {pillar.title}
            </motion.span>
          </div>

          {/* ── Pillar index + active story ───────────────────────────── */}
          <div className="flex flex-col">
            {PILLARS.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.index}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={cn(
                    'group min-h-[44px] border-l-2 py-4 pl-6 text-left transition-colors duration-300 sm:py-5',
                    isActive ? 'border-emerald-400' : 'border-navy-100 hover:border-navy-200',
                  )}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        'text-[13px] font-bold tracking-[2px] transition-colors duration-300',
                        isActive ? 'text-emerald-500' : 'text-navy-200',
                      )}
                    >
                      {p.index}
                    </span>
                    <span
                      className={cn(
                        'text-[clamp(1.1rem,1.5vw,1.4rem)] font-black uppercase tracking-[-0.02em] transition-colors duration-300',
                        isActive ? 'text-navy-900' : 'text-navy-300 group-hover:text-navy-500',
                      )}
                    >
                      {p.title}
                    </span>
                    <span
                      className={cn(
                        'hidden text-[11px] font-extrabold uppercase tracking-[1.5px] sm:inline',
                        isActive ? 'text-emerald-600' : 'text-navy-200',
                      )}
                    >
                      · {p.subtitle}
                    </span>
                  </span>

                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                      className="mt-3 flex items-start gap-3"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                        <ActiveIcon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="block text-body-fluid text-navy-500">{p.description}</span>
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
