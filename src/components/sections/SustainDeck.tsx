import { useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

const COUNT = PILLARS.length;

/** Resting pose for each stack slot (0 = front card). */
const SLOT_ROTATE = [0, 3.5, -2.5, 5];
const slotPose = (p: number) => ({
  x: p * 18,
  y: p * -14,
  rotate: SLOT_ROTATE[p],
  scale: 1 - p * 0.045,
});

const SPRING = { type: 'spring', stiffness: 260, damping: 28 } as const;

/**
 * "Deck" — the four pillars as a held stack of photographs. The front card
 * can be dragged aside (or advanced with the arrows); it sweeps out and
 * tucks behind the stack with spring physics while the next pillar's story
 * slides into the reading panel. Tactile, photographic, no scroll-jacking.
 */
export function SustainDeck() {
  const [active, setActive] = useState(0);

  const advance = (dir: 1 | -1) => setActive((a) => (a + dir + COUNT) % COUNT);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) advance(1);
  };

  const pillar = PILLARS[active];
  const Icon = pillar.icon;

  return (
    <section
      id="sustain-deck"
      aria-label="Why we exist — deck"
      className="section-py relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white"
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
          titleClassName="normal-case font-normal tracking-normal"
          description={SUSTAINABILITY.body}
        />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 xl:gap-20"
        >
          {/* Reading panel — the active pillar's story */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
              >
                <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-600">
                  {pillar.index}
                  <span className="h-px w-8 bg-emerald-400/70" aria-hidden="true" />
                  {pillar.subtitle}
                </span>
                <h3 className="mt-3 text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-tight text-navy-900">
                  {pillar.title}
                </h3>
                <p className="mt-4 max-w-xl text-body-fluid text-navy-500">{pillar.description}</p>
                <span className="mt-7 inline-grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-9 flex items-center gap-5">
              <button
                type="button"
                onClick={() => advance(-1)}
                aria-label="Previous pillar"
                className="grid h-11 w-11 place-items-center rounded-full border border-navy-200 text-navy-700 transition-colors duration-300 hover:border-emerald-400 hover:text-emerald-600"
              >
                <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => advance(1)}
                aria-label="Next pillar"
                className="grid h-11 w-11 place-items-center rounded-full border border-navy-200 text-navy-700 transition-colors duration-300 hover:border-emerald-400 hover:text-emerald-600"
              >
                <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
              <div className="flex items-center gap-2" aria-hidden="true">
                {PILLARS.map((p, i) => (
                  <span
                    key={p.index}
                    className={
                      i === active
                        ? 'h-1.5 w-7 rounded-full bg-emerald-500 transition-all duration-500'
                        : 'h-1.5 w-1.5 rounded-full bg-navy-200 transition-all duration-500'
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* The deck — drag the front card to shuffle */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px]">
              <div className="relative aspect-[4/5]">
                {PILLARS.map((p, i) => {
                  const pos = (i - active + COUNT) % COUNT;
                  const isFront = pos === 0;
                  return (
                    <motion.div
                      key={p.index}
                      animate={slotPose(pos)}
                      transition={SPRING}
                      drag={isFront ? 'x' : false}
                      dragSnapToOrigin
                      dragMomentum={false}
                      onDragEnd={isFront ? onDragEnd : undefined}
                      style={{ zIndex: COUNT - pos, willChange: 'transform' }}
                      className={
                        'absolute inset-0 overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_-24px_rgba(10,26,51,0.35)] ring-1 ring-navy-900/5' +
                        (isFront ? ' cursor-grab active:cursor-grabbing' : '')
                      }
                    >
                      <img
                        src={PILLAR_MEDIA[i].src}
                        alt={PILLAR_MEDIA[i].alt}
                        width={1400}
                        height={1050}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      />
                      {/* Caption scrim */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-900/10 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-7">
                        <div>
                          <span className="text-[12px] font-bold tracking-[2px] text-emerald-300">
                            {p.index}
                          </span>
                          <p className="mt-1 text-[clamp(1.1rem,1.4vw,1.35rem)] font-semibold text-white">
                            {p.title}
                          </p>
                        </div>
                        {isFront && (
                          <span className="hidden items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-white backdrop-blur-sm sm:inline-flex">
                            <MoveHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                            Drag
                          </span>
                        )}
                      </div>
                      {/* Veil pushes resting cards back */}
                      <motion.div
                        animate={{ opacity: pos * 0.22 }}
                        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                        className="pointer-events-none absolute inset-0 bg-white"
                        aria-hidden="true"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
