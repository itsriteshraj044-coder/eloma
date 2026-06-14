import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Plane } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * Concept 13 — "Departures".
 * The divisions as flights on an airport departure board: flight number,
 * destination in split-flap lettering (rotateX char flips — transform
 * only), gate and live status. One flight is always "NOW BOARDING" — it
 * cycles automatically, and clicking a row calls that flight up. The boarding
 * flight's manifest (dossier) is presented under the board.
 */

const AUTO_MS = 4500;

/** Split-flap text: characters flip in with a stagger whenever `text` mounts. */
function FlapText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn('inline-flex [perspective:600px]', className)}>
      <span className="sr-only">{text}</span>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${text}-${i}`}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: i * 0.035, ease: EASE_PREMIUM }}
          className="will-transform inline-block whitespace-pre [backface-visibility:hidden]"
          aria-hidden="true"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function BusinessDepartures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoTour, setAutoTour] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const clock = useClock();

  const active = BUSINESSES[activeIndex];
  const ActiveIcon = active.icon;

  useEffect(() => {
    if (!autoTour || !inView) return;
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % BUSINESSES.length), AUTO_MS);
    return () => clearInterval(id);
  }, [autoTour, inView]);

  const select = (i: number) => {
    setActiveIndex(i);
    setAutoTour(false);
  };

  return (
    <section
      ref={sectionRef}
      id="business-departures"
      aria-label="Our businesses — departures board"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 right-[10%] h-72 w-72 rounded-full bg-emerald-50 blur-3xl" />
        <div className="absolute -bottom-24 left-[8%] h-80 w-80 rounded-full bg-navy-50/80 blur-3xl" />
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
            Concept 13 · Departures
          </motion.span>
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            The Business Universe
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-emerald-500">Now boarding:</span>{' '}
            <span className="text-navy-900">six destinations.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {BUSINESS_UNIVERSE.description}
          </motion.p>
        </motion.div>

        {/* ── The board ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="mx-auto mt-10 max-w-5xl"
        >
          <div className="overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white shadow-glass-lg">

            {/* Board masthead */}
            <div className="flex items-center justify-between gap-3 border-b border-navy-100 bg-navy-800 px-5 py-3.5 sm:px-7">
              <span className="flex items-center gap-2.5">
                <Plane className="h-4 w-4 text-emerald-300" aria-hidden="true" />
                <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-white sm:text-xs">
                  Eloma International · Departures
                </span>
              </span>
              <span className="text-xs font-bold tabular-nums tracking-[1.5px] text-emerald-300" aria-label="Current time">
                {clock}
              </span>
            </div>

            {/* Column headings */}
            <div
              aria-hidden="true"
              className="grid grid-cols-[4.5rem_1fr_5rem] items-center gap-3 border-b border-navy-100 bg-navy-50/60 px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-[2px] text-navy-400 sm:grid-cols-[5.5rem_1fr_4.5rem_7.5rem] sm:px-7"
            >
              <span>Flight</span>
              <span>Destination</span>
              <span className="hidden sm:block">Gate</span>
              <span className="text-right">Status</span>
            </div>

            {/* Flights */}
            <ul className="list-none">
              {BUSINESSES.map((business, i) => {
                const isBoarding = i === activeIndex;
                return (
                  <li key={business.id} className="border-b border-navy-50 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={isBoarding}
                      aria-label={`Flight EL-${business.index} to ${business.title}`}
                      className={cn(
                        'grid min-h-[3.25rem] w-full cursor-pointer grid-cols-[4.5rem_1fr_5rem] items-center gap-3 px-5 py-3 text-left outline-none transition-colors duration-300 focus-visible:bg-emerald-50/60 sm:grid-cols-[5.5rem_1fr_4.5rem_7.5rem] sm:px-7',
                        isBoarding ? 'bg-emerald-50/70' : 'hover:bg-navy-50/50',
                      )}
                    >
                      <span className="text-sm font-bold tabular-nums tracking-[1px] text-navy-500">
                        EL-{business.index}
                      </span>
                      <span
                        className={cn(
                          'truncate text-[clamp(0.95rem,1.3vw,1.15rem)] font-semibold uppercase tracking-[1.5px]',
                          isBoarding ? 'text-navy-900' : 'text-navy-600',
                        )}
                      >
                        {isBoarding ? (
                          <FlapText key={business.id} text={business.title} />
                        ) : (
                          business.title
                        )}
                      </span>
                      <span className="hidden text-sm font-semibold tabular-nums text-navy-400 sm:block">
                        G{Number(business.index)}
                      </span>
                      <span className="flex justify-end">
                        {isBoarding ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[1.5px] text-white">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 animate-ping rounded-full bg-white [animation-duration:1.6s]"
                            />
                            Boarding
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-navy-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-navy-400">
                            On time
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── Boarding pass / manifest for the active flight ── */}
          <AnimatePresence mode="wait">
            <motion.article
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE_PREMIUM }}
              className="will-transform relative mt-6 overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white shadow-glass"
            >
              {/* Boarding-pass perforation */}
              <span
                aria-hidden="true"
                className="absolute inset-y-4 left-[4.75rem] hidden border-l-2 border-dashed border-navy-100 sm:block"
              />
              <div className="grid gap-5 p-6 sm:grid-cols-12 sm:items-start sm:p-8 sm:pl-28">
                {/* Stub */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 hidden h-full w-[4.75rem] flex-col items-center justify-center gap-2 bg-emerald-50/60 sm:flex"
                >
                  <ActiveIcon className="h-6 w-6 text-emerald-600" />
                  <span className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-emerald-700 [writing-mode:vertical-rl]">
                    EL-{active.index} · Gate G{Number(active.index)}
                  </span>
                </span>

                <div className="flex items-center gap-4 sm:col-span-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 sm:hidden">
                    <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                      Flight EL-{active.index} manifest
                    </p>
                    <h3 className="mt-0.5 text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900">
                      {active.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] font-normal text-emerald-600">{active.tagline}</p>
                  </div>
                </div>
                <div className="sm:col-span-8">
                  <p className="text-sm leading-relaxed text-navy-500">{active.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {active.features.map((feature) => (
                      <span
                        key={feature}
                        className="flex items-center gap-1.5 rounded-full bg-navy-50/80 px-2.5 py-1 text-xs font-normal text-navy-600"
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        {feature}
                      </span>
                    ))}
                    <span className="ml-auto inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                      Discover more
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
