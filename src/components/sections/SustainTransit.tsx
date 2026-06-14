import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Why We Exist — the group line".
 * Exact same metro-line design as BusinessTransit, but conducting the four
 * sustainability pillars instead of the business divisions. The line draws
 * itself in on scroll and a small emerald "train" rides it on loop
 * (frame-driven along the path geometry). Whichever station the train last
 * reached is the pillar whose story is open under the map; clicking a station
 * calls the train straight there. Reduced motion parks the train; stations are
 * then click-only. Below lg the line turns vertical: a route timeline with
 * every pillar's details inline.
 */

const VIEW_W = 1200;
const VIEW_H = 290;
const DEPOT = { x: 42, y: 145 };
const STATIONS = [
  { x: 270, y: 198 },
  { x: 560, y: 96 },
  { x: 850, y: 198 },
  { x: 1140, y: 96 },
];

/** Smooth cubic route through depot + stations. */
function buildRoute(): string {
  const pts = [DEPOT, ...STATIONS];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const mid = (a.x + b.x) / 2;
    d += ` C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
}

const ROUTE_D = buildRoute();
const LOOP_MS = 22000; // one full run of the line

export function SustainTransit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const reducedMotion = useReducedMotion();

  // Train state — all refs, the RAF loop never re-renders React except on
  // station arrival (setActiveIndex).
  const routeRef = useRef<SVGPathElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const distRef = useRef(0);
  const totalLenRef = useRef(0);
  const stationLensRef = useRef<number[]>([]);
  const activeRef = useRef(0);

  const active = PILLARS[activeIndex];
  const ActiveIcon = active.icon;

  // Measure the route once: total length + each station's position along it.
  // Guarded — some browsers throw on geometry calls while the SVG is hidden
  // (below lg); in that case the train simply stays parked and the section
  // renders normally.
  useEffect(() => {
    const path = routeRef.current;
    if (!path) return;
    try {
      const total = path.getTotalLength();
      const best = STATIONS.map(() => ({ d: Infinity, len: 0 }));
      const samples = 900;
      for (let s = 0; s <= samples; s++) {
        const len = (s / samples) * total;
        const p = path.getPointAtLength(len);
        STATIONS.forEach((st, i) => {
          const d = (p.x - st.x) ** 2 + (p.y - st.y) ** 2;
          if (d < best[i].d) best[i] = { d, len };
        });
      }
      stationLensRef.current = best.map((b) => b.len);
      totalLenRef.current = total;
    } catch {
      totalLenRef.current = 0;
    }
  }, []);

  const setActive = (i: number) => {
    if (activeRef.current === i) return;
    activeRef.current = i;
    setActiveIndex(i);
  };

  // Drive the train along the line; arriving at a station opens its story.
  useAnimationFrame((_, delta) => {
    const path = routeRef.current;
    const total = totalLenRef.current;
    if (!path || !total || !inView || reducedMotion) return;

    let p: DOMPoint;
    try {
      distRef.current = (distRef.current + delta * (total / LOOP_MS)) % total;
      p = path.getPointAtLength(distRef.current);
    } catch {
      totalLenRef.current = 0; // park the train, never break the page
      return;
    }
    haloRef.current?.setAttribute('cx', String(p.x));
    haloRef.current?.setAttribute('cy', String(p.y));
    dotRef.current?.setAttribute('cx', String(p.x));
    dotRef.current?.setAttribute('cy', String(p.y));

    // Last station the train has reached on this run.
    let reached = -1;
    stationLensRef.current.forEach((len, i) => {
      if (distRef.current >= len - 1) reached = i;
    });
    if (reached >= 0) setActive(reached);
  });

  /** Clicking a station calls the train straight to it. */
  const select = (i: number) => {
    const len = stationLensRef.current[i];
    if (len !== undefined) distRef.current = len;
    setActive(i);
  };

  return (
    <section
      ref={sectionRef}
      id="sustain-transit"
      aria-label="Why we exist — the group line"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
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
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Why We Exist
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-navy-900">Committed to Sustainable Growth</span>
            <br />
            <span className="text-emerald-500">and Responsible Business.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl text-body-fluid text-navy-500">
            {SUSTAINABILITY.body}
          </motion.p>
        </motion.div>

        {/* ── Desktop route map ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="relative mt-10 hidden lg:block"
        >
          <div className="relative w-full" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {/* Base rail */}
              <path d={ROUTE_D} fill="none" stroke="#d3deea" strokeWidth="6" strokeLinecap="round" />
              {/* Emerald line draws in on scroll */}
              <motion.path
                d={ROUTE_D}
                fill="none"
                stroke="#3CB98C"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 1.8, ease: EASE_PREMIUM }}
              />
              {/* Invisible measuring copy of the route (geometry source for the train) */}
              <path ref={routeRef} d={ROUTE_D} fill="none" stroke="none" />
              {/* The train — frame-driven along the line, parked under reduced motion */}
              <g className="motion-reduce:hidden">
                <circle ref={haloRef} cx={DEPOT.x} cy={DEPOT.y} r="9" fill="#3CB98C" opacity="0.25" />
                <circle ref={dotRef} cx={DEPOT.x} cy={DEPOT.y} r="5" fill="#2c9d74" />
              </g>
            </svg>

            {/* Depot — the group HQ interchange */}
            <div
              style={{ left: `${(DEPOT.x / VIEW_W) * 100}%`, top: `${(DEPOT.y / VIEW_H) * 100}%` }}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border-4 border-navy-800 bg-white shadow-glass">
                <span className="h-2.5 w-2.5 rounded-full bg-navy-800" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap rounded-full bg-navy-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[1.5px] text-white">
                Eloma HQ
              </span>
            </div>

            {/* Stations */}
            {PILLARS.map((pillar, i) => {
              const pos = STATIONS[i];
              const isActive = i === activeIndex;
              const labelAbove = pos.y < VIEW_H / 2;
              return (
                <div
                  key={pillar.index}
                  style={{ left: `${(pos.x / VIEW_W) * 100}%`, top: `${(pos.y / VIEW_H) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={isActive}
                    aria-label={`${pillar.index}: ${pillar.title}`}
                    className={cn(
                      'group relative grid h-11 w-11 cursor-pointer place-items-center outline-none',
                      'focus-visible:rounded-full focus-visible:ring-2 focus-visible:ring-emerald-400',
                    )}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute h-9 w-9 animate-ping rounded-full bg-emerald-300/50 [animation-duration:2.4s]"
                      />
                    )}
                    <span
                      className={cn(
                        'will-transform relative grid h-7 w-7 place-items-center rounded-full border-4 bg-white transition-[border-color,transform] duration-300 ease-premium',
                        isActive
                          ? 'scale-110 border-emerald-500'
                          : 'border-navy-700 group-hover:scale-110 group-hover:border-emerald-400',
                      )}
                    />
                    {/* Station label */}
                    <span
                      className={cn(
                        'absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors duration-300',
                        labelAbove ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
                        isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-navy-500 group-hover:text-navy-800',
                      )}
                    >
                      <span className="mr-1.5 font-bold text-emerald-600">{pillar.index}</span>
                      {pillar.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── Active station story ── */}
          <div className="mx-auto mt-8 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                className="will-transform relative overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-6 shadow-glass sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-12 sm:items-start">
                  <div className="flex items-center gap-4 sm:col-span-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                      <ActiveIcon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                        {active.index} / 0{PILLARS.length}
                      </p>
                      <h3 className="mt-0.5 text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900">
                        {active.title}
                      </h3>
                      <p className="mt-0.5 text-[13px] font-normal text-emerald-600">{active.subtitle}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-sm leading-relaxed text-navy-500">{active.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="ml-auto inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-emerald-600 transition-colors duration-300 hover:text-emerald-700">
                        Discover more
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Mobile / tablet: vertical route timeline ── */}
        <motion.ul
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative mt-10 list-none lg:hidden"
        >
          {/* The vertical line */}
          <span aria-hidden="true" className="absolute bottom-4 left-[1.05rem] top-2 w-1.5 rounded-full bg-navy-100" />
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 1.6, ease: EASE_PREMIUM }}
            className="will-transform absolute bottom-4 left-[1.05rem] top-2 w-1.5 origin-top rounded-full bg-emerald-400/80"
          />

          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.li key={pillar.index} variants={fadeUp} className="relative pb-8 pl-12 last:pb-0">
                {/* Station dot */}
                <span
                  aria-hidden="true"
                  className="absolute left-[1.05rem] top-1 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border-4 border-navy-700 bg-white"
                />
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-navy-400">
                  {pillar.index} / 0{PILLARS.length}
                </p>
                <div className="mt-1 flex items-center gap-2.5">
                  <Icon className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <h3 className="text-[clamp(1.15rem,4vw,1.35rem)] font-normal capitalize leading-tight text-navy-900">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-1 text-[13px] font-normal text-emerald-600">{pillar.subtitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{pillar.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
