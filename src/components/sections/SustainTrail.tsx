import { useRef, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

const SPRING = { stiffness: 140, damping: 18, mass: 0.5 };

/**
 * "Trail" — an editorial index where photography chases the cursor. Moving
 * across the four entries, a floating polaroid glides behind the pointer
 * with spring physics, swapping images as rows change; rows answer with an
 * emerald wash and a rising arrow. On touch screens the previews sit inline.
 */
export function SustainTrail() {
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <section
      id="sustain-trail"
      aria-label="Why we exist — trail"
      className="section-py relative overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-mesh-light"
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
          titleClassName="normal-case font-normal tracking-normal"
          description={SUSTAINABILITY.body}
          descriptionClassName="max-w-3xl"
        />

        <motion.div
          ref={listRef}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setHovered(null)}
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative mt-12 lg:mt-16"
        >
          {/* Cursor-chasing preview (pointer devices only) */}
          <motion.div
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
            aria-hidden="true"
          >
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                  className="will-transform absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-4 border-white shadow-glass-lg"
                >
                  <img
                    src={PILLAR_MEDIA[hovered].src}
                    alt=""
                    width={1400}
                    height={1050}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-60 object-cover 3xl:w-72"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            const isHovered = hovered === i;
            return (
              <motion.div
                key={pillar.index}
                variants={fadeUp}
                onMouseEnter={() => setHovered(i)}
                className={cn(
                  'group relative grid cursor-default gap-4 border-t border-navy-100 py-7 transition-colors duration-500 last:border-b sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 lg:py-9',
                )}
              >
                {/* Emerald wash sweeping in behind the row */}
                <span
                  className={cn(
                    'will-transform pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-emerald-50/80 transition-transform duration-500 ease-premium',
                    isHovered && 'scale-y-100',
                  )}
                  aria-hidden="true"
                />

                <span className="relative flex items-center gap-4 sm:w-28">
                  <span
                    className={cn(
                      'text-[13px] font-bold tracking-[2.5px] transition-colors duration-300',
                      isHovered ? 'text-emerald-600' : 'text-navy-300',
                    )}
                  >
                    {pillar.index}
                  </span>
                  <span
                    className={cn(
                      'grid h-10 w-10 place-items-center rounded-xl transition-colors duration-300',
                      isHovered ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600',
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                </span>

                <span className="relative min-w-0">
                  {/* Inline thumb for touch screens */}
                  <img
                    src={PILLAR_MEDIA[i].src}
                    alt={PILLAR_MEDIA[i].alt}
                    width={1400}
                    height={1050}
                    loading="lazy"
                    decoding="async"
                    className="mb-4 aspect-[16/7] w-full rounded-xl object-cover lg:hidden"
                  />
                  <span className="block text-[clamp(1.4rem,2.4vw,2.25rem)] font-medium leading-tight text-navy-900">
                    {pillar.title}
                    <span className="ml-3 align-middle text-[11px] font-extrabold uppercase tracking-[2px] text-emerald-600">
                      {pillar.subtitle}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-2xl text-[clamp(0.875rem,1vw,1rem)] leading-[1.7] text-navy-500">
                    {pillar.description}
                  </span>
                </span>

                <span
                  className={cn(
                    'relative hidden h-11 w-11 place-items-center rounded-full border transition-all duration-500 ease-premium sm:grid',
                    isHovered
                      ? 'border-emerald-400 bg-emerald-500 text-white [&>svg]:translate-x-0.5 [&>svg]:-translate-y-0.5'
                      : 'border-navy-100 text-navy-300',
                  )}
                  aria-hidden="true"
                >
                  <ArrowUpRight className="will-transform h-[18px] w-[18px] transition-transform duration-300" />
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
