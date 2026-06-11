import {
  motion,
  useMotionTemplate,
  useMotionValue,
  type TargetAndTransition,
  type Transition,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/ui/Container';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Business } from '@/types';

/** Per-business icon motion — each themed to suit the icon (boat bobbing on waves, plane banking, etc). */
const ICON_ANIMATIONS: Record<string, { animate: TargetAndTransition; transition: Transition }> = {
  'call-centre': {
    animate: { rotate: [-10, 10, -10], scale: [1, 1.08, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
  imports: {
    animate: { y: [0, -7, 0, 3, 0], rotate: [-5, 5, -5] },
    transition: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
  },
  'it-infrastructure': {
    animate: { rotate: 360 },
    transition: { duration: 6, repeat: Infinity, ease: 'linear' },
  },
  'supply-chain': {
    animate: { x: [0, 5, 0, -5, 0], y: [0, -2, 0, -2, 0] },
    transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
  },
  travel: {
    animate: { x: [0, 10, 0], y: [0, -5, 0], rotate: [0, 10, 0] },
    transition: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const DEFAULT_ICON_ANIMATION: { animate: TargetAndTransition; transition: Transition } = {
  animate: { y: [0, -5, 0], rotate: [-6, 6, -6] },
  transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
};

/** Soft color world per business — light gradients only, no dark surfaces. */
interface CardTheme {
  card: string;        // resting gradient + border
  hoverBorder: string; // border accent on hover
  orb: string;         // icon orb gradient
  accent: string;      // tagline / index color
  pill: string;        // feature pill border + text
  dot: string;         // feature pill dot
  glowRgb: string;     // cursor glow color (r, g, b)
}

const THEMES: Record<string, CardTheme> = {
  'call-centre': {
    card: 'border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white to-white',
    hoverBorder: 'hover:border-emerald-300',
    orb: 'from-emerald-400 to-emerald-600',
    accent: 'text-emerald-600',
    pill: 'border-emerald-200 bg-emerald-50/70 text-emerald-800',
    dot: 'bg-emerald-400',
    glowRgb: '60, 185, 140',
  },
  imports: {
    card: 'border-sky-100 bg-gradient-to-br from-sky-50/80 via-white to-white',
    hoverBorder: 'hover:border-sky-300',
    orb: 'from-sky-400 to-sky-600',
    accent: 'text-sky-600',
    pill: 'border-sky-200 bg-sky-50/70 text-sky-800',
    dot: 'bg-sky-400',
    glowRgb: '56, 152, 224',
  },
  'it-infrastructure': {
    card: 'border-violet-100 bg-gradient-to-br from-violet-50/80 via-white to-white',
    hoverBorder: 'hover:border-violet-300',
    orb: 'from-violet-400 to-violet-600',
    accent: 'text-violet-600',
    pill: 'border-violet-200 bg-violet-50/70 text-violet-800',
    dot: 'bg-violet-400',
    glowRgb: '139, 92, 246',
  },
  'supply-chain': {
    card: 'border-amber-100 bg-gradient-to-br from-amber-50/80 via-white to-white',
    hoverBorder: 'hover:border-amber-300',
    orb: 'from-amber-400 to-orange-500',
    accent: 'text-amber-600',
    pill: 'border-amber-200 bg-amber-50/70 text-amber-800',
    dot: 'bg-amber-400',
    glowRgb: '245, 158, 11',
  },
  travel: {
    card: 'border-rose-100 bg-gradient-to-br from-rose-50/80 via-white to-white',
    hoverBorder: 'hover:border-rose-300',
    orb: 'from-rose-400 to-rose-600',
    accent: 'text-rose-600',
    pill: 'border-rose-200 bg-rose-50/70 text-rose-800',
    dot: 'bg-rose-400',
    glowRgb: '244, 63, 94',
  },
};

const FALLBACK_THEME = THEMES['call-centre'];

/** Bento spans — 2 wide cards on top, 3 below (lg); 2-col with full-width last card (sm). */
const BENTO_SPANS = [
  'sm:col-span-2 lg:col-span-3',
  'sm:col-span-2 lg:col-span-3',
  'lg:col-span-2',
  'lg:col-span-2',
  'sm:col-span-2 lg:col-span-2',
];

function BentoCard({
  business,
  index,
}: {
  business: Business;
  index: number;
}) {
  const Icon = business.icon;
  const theme = THEMES[business.id] ?? FALLBACK_THEME;
  const iconAnimation = ICON_ANIMATIONS[business.id] ?? DEFAULT_ICON_ANIMATION;

  // Cursor-following glow.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(${theme.glowRgb}, 0.14), transparent 70%)`;

  return (
    <div className={BENTO_SPANS[index] ?? ''}>
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 56, scale: 0.96 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.7, ease: EASE_PREMIUM },
          },
        }}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - r.left);
          my.set(e.clientY - r.top);
        }}
        className={cn(
          'group will-transform relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-glass transition-[border-color,box-shadow] duration-300 hover:shadow-glass-lg sm:p-7 3xl:rounded-[2rem] 3xl:p-9',
          theme.card,
          theme.hoverBorder,
        )}
      >
        {/* Cursor glow — fades in under the pointer */}
        <motion.div
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Shine sweep — diagonal light strip crosses the card on hover */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl 3xl:rounded-[2rem]"
          aria-hidden="true"
        >
          <div className="will-transform absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-[350%]" />
        </div>

        {/* Icon row */}
        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              'will-transform grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-glass transition-transform duration-400 ease-premium group-hover:scale-110 group-hover:-rotate-3 3xl:h-20 3xl:w-20',
              theme.orb,
            )}
          >
            <motion.span
              className="will-transform grid place-items-center"
              animate={iconAnimation.animate}
              transition={iconAnimation.transition}
            >
              <Icon className="h-8 w-8 3xl:h-10 3xl:w-10" aria-hidden="true" />
            </motion.span>
          </span>
          <span className={cn('text-eyebrow-fluid font-normal uppercase', theme.accent)}>
            {business.index}
          </span>
        </div>

        {/* Text */}
        <h3 className="relative mt-5 text-[clamp(1.35rem,2vw,1.7rem)] font-normal capitalize leading-tight text-navy-900">
          {business.title}
        </h3>
        <p className={cn('relative mt-1.5 text-sm font-normal 3xl:text-base', theme.accent)}>
          {business.tagline}
        </p>
        <p className="relative mt-3 text-body-fluid text-navy-500">
          {business.description}
        </p>

        {/* Feature pills */}
        <div className="relative mt-5 flex flex-wrap gap-2">
          {business.features.map((feature) => (
            <span
              key={feature}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-normal transition-transform duration-300 ease-premium hover:scale-105 3xl:px-4 3xl:py-2 3xl:text-sm',
                theme.pill,
              )}
            >
              <span className={cn('h-1.5 w-1.5 shrink-0 rounded-full', theme.dot)} aria-hidden="true" />
              {feature}
            </span>
          ))}
        </div>

        {/* CTA — slides up into view on hover */}
        <div className="relative mt-auto pt-6">
          <span
            className={cn(
              'will-transform inline-flex translate-y-2 items-center gap-1.5 text-sm font-normal opacity-0 transition-[transform,opacity] duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 3xl:text-base',
              theme.accent,
            )}
          >
            Discover more
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </motion.article>
    </div>
  );
}

export function BusinessUniverse() {
  return (
    <section
      id="businesses"
      aria-label="Our businesses"
      className="section-py relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-20" aria-hidden="true" />

      <Container className="relative">
        {/* Counter badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-3 rounded-full border border-navy-100 bg-white px-5 py-2.5 text-sm font-semibold text-navy-600 shadow-glass 3xl:px-7 3xl:py-3 3xl:text-base">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-emerald-400">
              5
            </span>
            Business Verticals
          </span>
        </motion.div>

        <SectionHeading
          eyebrow="The Business Universe"
          title={
            <>
              <span className="text-emerald-500">Four worlds.</span>{' '}
              <span className="text-navy-900">One universe.</span>
            </>
          }
          titleClassName="font-normal normal-case"
          description={BUSINESS_UNIVERSE.description}
        />

        {/* ── Bento grid — staggered reveal on scroll ── */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid gap-6 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-6 3xl:gap-8"
        >
          {BUSINESSES.map((business, i) => (
            <BentoCard key={business.id} business={business} index={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
