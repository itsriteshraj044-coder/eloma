import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Company } from '@/types';

/**
 * "Our Companies" — re-imagined as a descending zig-zag process staircase.
 * Cards alternate left/right down the page, joined by dashed arrow connectors
 * that draw in with scroll and attach to the middle of each card; the card
 * crossing the viewport centre lights up with a soft gradient.
 *
 * Same content as the original (eyebrow, title, subheading, the five EG
 * companies and the closing CTA) — only the design changes. Palette stays on
 * brand: white + navy + a single emerald accent, no per-item colour worlds.
 */

const LINE = '#9fb6cf';
const ARROW = '#7d9abb';

interface Geo {
  d: string; // dashed elbow path, card-mid → card-top (arrowhead via marker-end)
}

/* ── A single dashed elbow that draws in over its slice of the scroll ──── */
function Connector({
  i,
  total,
  geo,
  progress,
}: {
  i: number;
  total: number;
  geo?: Geo;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const start = i * seg;
  const end = start + seg;
  // Mask reveal grows along the path as this connector scrolls through.
  const reveal = useTransform(progress, [start, end], [0, 1], { clamp: true });

  if (!geo) return null;
  const maskId = `conn-mask-${i}`;
  const markerId = `conn-arrow-${i}`;

  return (
    <g aria-hidden="true">
      <defs>
        {/* Reveal mask — a fat round-capped stroke that grows along the path
            with scroll; its round cap also covers the arrowhead at the tip. */}
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <motion.path
            d={geo.d}
            fill="none"
            stroke="#fff"
            strokeWidth={26}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: reveal }}
          />
        </mask>
        {/* Standard arrowhead — points right in marker space, auto-orients to
            the path's end direction (straight down into the next card). */}
        <marker
          id={markerId}
          viewBox="0 0 12 12"
          refX="9"
          refY="6"
          markerWidth="11"
          markerHeight="11"
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M1 1 L11 6 L1 11 Z" fill={ARROW} />
        </marker>
      </defs>

      {/* Dashed elbow + arrowhead, revealed together by the growing mask */}
      <g mask={`url(#${maskId})`}>
        <path
          d={geo.d}
          fill="none"
          stroke={LINE}
          strokeWidth={1.5}
          strokeDasharray="5 6"
          strokeLinecap="round"
          markerEnd={`url(#${markerId})`}
        />
      </g>
    </g>
  );
}

/* ── A simple dashed drop for the stacked mobile layout ──────────────── */
function MobileConnector() {
  return (
    <div aria-hidden="true" className="relative h-12 pl-[1.6rem] md:hidden">
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
        className="absolute inset-y-1 left-[1.6rem] block w-px origin-top border-l border-dashed border-navy-200"
      />
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="absolute bottom-0 left-[1.6rem] -translate-x-1/2 text-navy-300"
      >
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </motion.span>
    </div>
  );
}

/* ── One company = one step on the staircase ─────────────────────────── */
function ProcessStep({
  company,
  index,
  active,
  onActivate,
  register,
}: {
  company: Company;
  index: number;
  active: boolean;
  onActivate: (i: number) => void;
  register: (i: number, el: HTMLElement | null) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const Icon = company.icon;
  const isRight = index % 2 === 1; // step 1 left, 2 right, 3 left, …
  const isNavy = index % 2 === 0; // alternate card tint: navy, green, navy, …

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      ref.current = el;
      register(index, el);
    },
    [register, index],
  );

  // Fires when the card crosses the middle band of the viewport → it becomes
  // the "in focus" step. IntersectionObserver under the hood.
  const inView = useInView(ref, { margin: '-45% 0px -45% 0px' });
  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <div className={cn('flex w-full', isRight ? 'md:justify-end' : 'md:justify-start')}>
      <motion.article
        ref={setRef}
        variants={{
          hidden: { opacity: 0, y: 28 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } },
        }}
        initial="hidden"
        whileInView="visible"
        whileHover={{ y: -6, scale: 1.012 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        viewport={VIEWPORT_ONCE}
        className={cn(
          'group relative w-full cursor-default rounded-[1.6rem] p-1 shadow-glass transition-shadow duration-500 ease-premium hover:shadow-glass-lg md:w-[clamp(20rem,48vw,34rem)] 3xl:rounded-[2rem]',
          active && 'shadow-glass-lg',
        )}
      >
        {/* Soft tinted box — always visible, alternating navy / green light shade.
            Deepens on focus or hover. */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 rounded-[1.6rem] bg-gradient-to-br ring-1 ring-inset transition-all duration-500 ease-premium 3xl:rounded-[2rem]',
            isNavy
              ? cn(
                  'from-navy-50 via-white to-navy-100',
                  !active && 'group-hover:from-navy-100 group-hover:to-navy-200/80',
                  active ? 'ring-navy-300' : 'ring-navy-200/80 group-hover:ring-navy-300',
                )
              : cn(
                  'from-emerald-50 via-white to-emerald-100',
                  !active && 'group-hover:from-emerald-100 group-hover:to-emerald-200/80',
                  active ? 'ring-emerald-300' : 'ring-emerald-200/80 group-hover:ring-emerald-300',
                ),
          )}
        />

        {/* Subtle sheen sweeping across on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.6rem] 3xl:rounded-[2rem]"
        >
          <span className="absolute -inset-y-8 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-700 ease-premium group-hover:left-[120%] group-hover:opacity-100" />
        </span>

        <div className="relative flex items-stretch gap-4 p-4 sm:gap-5 sm:p-5 3xl:gap-6 3xl:p-6">
          {/* Vertical pill — branch label, tinted to match the card */}
          <span
            className={cn(
              'flex w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b py-3 transition-transform duration-300 ease-premium group-hover:scale-y-[1.04] sm:w-10 3xl:w-12',
              isNavy
                ? 'from-navy-400 to-navy-600 shadow-[0_8px_24px_-8px_rgba(8,33,60,0.45)]'
                : 'from-emerald-400 to-emerald-500 shadow-glow-emerald',
            )}
          >
            <span
              style={{ writingMode: 'vertical-rl' }}
              className="rotate-180 text-[10px] font-bold uppercase tracking-[2px] text-white 3xl:text-xs"
            >
              Branch {company.index}
            </span>
          </span>

          {/* Body */}
          <div className="min-w-0 flex-1 py-1">
            <div className="flex items-center gap-3 sm:gap-3.5">
              {/* Circular icon badge — tinted to match the card, lifts on hover */}
              <span
                className={cn(
                  'grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-sm transition-all duration-300 ease-premium group-hover:scale-110 sm:h-11 sm:w-11 3xl:h-12 3xl:w-12',
                  isNavy ? 'bg-navy-500' : 'bg-emerald-500',
                )}
              >
                <Icon className="h-[18px] w-[18px] 3xl:h-5 3xl:w-5" aria-hidden="true" />
              </span>
              <h3 className="flex min-w-0 items-baseline gap-2 text-[clamp(1.05rem,1.6vw,1.4rem)] font-semibold leading-tight text-navy-800">
                <span
                  className={cn(
                    'transition-colors duration-300',
                    isNavy ? 'text-navy-300 group-hover:text-navy-500' : 'text-emerald-300 group-hover:text-emerald-500',
                  )}
                >
                  {company.index}
                </span>
                <span className="truncate capitalize">{company.name}</span>
              </h3>
            </div>
            <p className="mt-3 max-w-md text-[clamp(0.82rem,1vw,0.95rem)] leading-relaxed text-navy-500 text-pretty">
              {company.description}
            </p>
            <a
              href="#contact"
              style={{ color: '#0B2B4F' }}
              className="group/link mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-normal 3xl:text-base"
            >
              Partner with us
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 3xl:h-5 3xl:w-5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────── */
export function CompaniesProcess() {
  const [active, setActive] = useState(0);
  const stairRef = useRef<HTMLDivElement>(null);
  const cardEls = useRef<(HTMLElement | null)[]>([]);
  const [geos, setGeos] = useState<(Geo | undefined)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const register = useCallback((i: number, el: HTMLElement | null) => {
    cardEls.current[i] = el;
  }, []);

  // Draw progress for the whole staircase — each connector reveals over its slice.
  const { scrollYProgress } = useScroll({
    target: stairRef,
    offset: ['start 0.8', 'end 0.65'],
  });

  // Measure real card geometry so connectors attach to each card's middle.
  useLayoutEffect(() => {
    const measure = () => {
      const c = stairRef.current;
      if (!c) return;
      const cr = c.getBoundingClientRect();
      setSize({ w: cr.width, h: cr.height });

      const next: (Geo | undefined)[] = [];
      for (let i = 0; i < COMPANIES.length - 1; i += 1) {
        const ue = cardEls.current[i];
        const le = cardEls.current[i + 1];
        if (!ue || !le) {
          next.push(undefined);
          continue;
        }
        const u = ue.getBoundingClientRect();
        const l = le.getBoundingClientRect();
        const upperIsLeft = i % 2 === 0;

        const sx = (upperIsLeft ? u.right : u.left) - cr.left; // inner side of upper card
        const sy = u.top - cr.top + u.height / 2; // its vertical middle
        const cx = l.left - cr.left + l.width / 2; // lower card horizontal centre
        const ey = l.top - cr.top - 3; // stop just above the card; marker tip lands on it

        const dir = cx > sx ? 1 : -1;
        const r = Math.min(12, Math.abs(cx - sx) / 2, Math.max(0, (ey - sy) / 2));
        const hx = cx - dir * r;
        const d = `M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${hx.toFixed(1)} ${sy.toFixed(1)} Q ${cx.toFixed(1)} ${sy.toFixed(1)} ${cx.toFixed(1)} ${(sy + r).toFixed(1)} L ${cx.toFixed(1)} ${ey.toFixed(1)}`;
        next.push({ d });
      }
      setGeos(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (stairRef.current) ro.observe(stairRef.current);
    cardEls.current.forEach((el) => el && ro.observe(el));
    window.addEventListener('resize', measure);
    const t = window.setTimeout(measure, 350); // re-measure after fonts settle
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section
      id="companies-process"
      aria-label="Our companies"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
        <SectionHeading
          eyebrow="Our Companies"
          title={
            <span>
              One group, <span className="text-navy">Five companies,</span>{' '}
              <span className="text-emerald-500">Our vision.</span>
            </span>
          }
          titleClassName="font-normal normal-case !text-[clamp(1.75rem,5vw,2.5rem)]"
          description={COMPANIES_SECTION.subheading}
        />

        {/* ── The staircase ── */}
        <div
          ref={stairRef}
          className="relative mx-auto mt-14 w-full max-w-[min(100%,72rem)] sm:mt-16 lg:mt-20"
        >
          {/* Scroll-drawn dashed arrow connectors (md+, measured to card mids) */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full overflow-visible md:block"
            viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
            preserveAspectRatio="none"
          >
            {geos.map((g, i) => (
              <Connector key={i} i={i} total={COMPANIES.length - 1} geo={g} progress={scrollYProgress} />
            ))}
          </svg>

          {/* Cards */}
          <div className="relative z-10 flex flex-col">
            {COMPANIES.map((company, i) => (
              <div key={company.name}>
                {i > 0 && <MobileConnector />}
                <ProcessStep
                  company={company}
                  index={i}
                  active={active === i}
                  onActivate={setActive}
                  register={register}
                />
                {/* Desktop rhythm between steps (mobile uses the connector's height) */}
                {i < COMPANIES.length - 1 && (
                  <div aria-hidden="true" className="hidden h-[clamp(3rem,7vw,6rem)] md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA — the journey resolves into one vision */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mt-14 flex justify-center sm:mt-16 lg:mt-20"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-normal text-white shadow-glow-emerald transition-transform duration-300 ease-premium hover:scale-[1.04] active:scale-[0.98] 3xl:px-8 3xl:py-4 3xl:text-base"
          >
            <Sparkles className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:rotate-90 3xl:h-5 3xl:w-5" aria-hidden="true" />
            One shared vision
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
