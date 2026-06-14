import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/** Vertical offset per pillar at lg+ — the staircase: root lowest, horizon highest. */
const STEP_OFFSETS = ['lg:mt-48', 'lg:mt-32', 'lg:mt-16', 'lg:mt-0'];

/** Station dots along the growth path (percent across / px down the path band). */
const STATIONS = [
  { left: '12.5%', top: 168 },
  { left: '37.5%', top: 116 },
  { left: '62.5%', top: 52 },
  { left: '96.6%', top: 4 },
];

/**
 * "Ascent" — the four pillars climb. Cards step upward across the stage
 * (root lowest, horizon highest) while a single emerald growth path draws
 * itself through the staircase void on scroll, station dots lighting up as
 * it passes. The layout itself tells the story: from root to horizon.
 */
export function SustainAscent() {
  return (
    <section
      id="sustain-ascent"
      aria-label="Why we exist — ascent"
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
          titleClassName="normal-case font-normal tracking-normal"
          description={SUSTAINABILITY.body}
        />

        <motion.div
          variants={staggerParent(0.16)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative mt-12 lg:mt-16"
        >
          {/* Growth path — drawn on scroll through the staircase void */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-48 lg:block"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1200 192"
              preserveAspectRatio="none"
              className="h-full w-full"
              fill="none"
            >
              {/* Faint guide the live path traces over */}
              <path
                d="M 40 186 C 110 182, 120 172, 150 168 C 250 154, 350 132, 450 116 C 550 100, 650 70, 750 52 C 850 34, 1050 10, 1160 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="3 9"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="text-navy-200"
              />
              <motion.path
                d="M 40 186 C 110 182, 120 172, 150 168 C 250 154, 350 132, 450 116 C 550 100, 650 70, 750 52 C 850 34, 1050 10, 1160 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="text-emerald-400"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 1.8, ease: EASE_PREMIUM, delay: 0.3 }}
              />
            </svg>
            {STATIONS.map((station, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{
                  duration: 0.5,
                  ease: EASE_PREMIUM,
                  delay: 0.3 + 0.45 * (i + 1),
                }}
                style={{ left: station.left, top: station.top }}
                className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"
              />
            ))}
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.article
                  key={pillar.index}
                  variants={fadeUp}
                  className={cn(
                    'group transition-transform duration-700 ease-premium hover:-translate-y-2',
                    STEP_OFFSETS[i],
                  )}
                >
                  <div className="relative overflow-hidden rounded-[1.5rem]">
                    <img
                      src={PILLAR_MEDIA[i].src}
                      alt={PILLAR_MEDIA[i].alt}
                      width={1400}
                      height={1050}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105 lg:aspect-[3/4]"
                    />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold tracking-[2px] text-navy-900">
                      {pillar.index}
                    </span>
                    <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-emerald-600">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mt-5 lg:mt-6">
                    <span className="flex items-center gap-3 text-eyebrow-fluid uppercase text-emerald-600">
                      {pillar.subtitle}
                      <span
                        className="h-px flex-1 max-w-10 bg-emerald-300/70"
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="mt-2 text-[clamp(1.25rem,1.6vw,1.6rem)] font-semibold text-navy-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-body-fluid text-navy-500">{pillar.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
