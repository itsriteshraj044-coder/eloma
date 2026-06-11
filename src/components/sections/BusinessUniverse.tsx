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
  'virtual-security': {
    animate: { scale: [1, 1.08, 1] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const DEFAULT_ICON_ANIMATION: { animate: TargetAndTransition; transition: Transition } = {
  animate: { y: [0, -5, 0], rotate: [-6, 6, -6] },
  transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
};

/** Soft color world per business — flat light color fields with one accent each. */
export interface CardTheme {
  accent: string;  // icon, tagline, hairline, CTA
  bg: string;      // card surface
  glowRgb: string; // cursor glow color (r, g, b)
}

export const BUSINESS_THEMES: Record<string, CardTheme> = {
  'call-centre':       { accent: '#0d9a6a', bg: '#f0fdf8', glowRgb: '13, 154, 106' },
  imports:             { accent: '#1d6ef5', bg: '#eff6ff', glowRgb: '29, 110, 245' },
  'it-infrastructure': { accent: '#8b3cf7', bg: '#faf5ff', glowRgb: '139, 60, 247' },
  'supply-chain':      { accent: '#c07a0a', bg: '#fffbeb', glowRgb: '192, 122, 10' },
  travel:              { accent: '#be185d', bg: '#fdf4ff', glowRgb: '190, 24, 93' },
  // Neutral surface by request — no colorful bg, steel-blue accent only.
  'virtual-security':  { accent: '#0284c7', bg: '#f7f9fc', glowRgb: '2, 132, 199' },
};

const FALLBACK_THEME = BUSINESS_THEMES['call-centre'];

/** Accent spectrum — used for the divider under the section heading. */
const SPECTRUM = 'linear-gradient(90deg, #0d9a6a, #1d6ef5, #8b3cf7, #c07a0a, #be185d)';

function BentoCard({ business }: { business: Business }) {
  const Icon = business.icon;
  const theme = BUSINESS_THEMES[business.id] ?? FALLBACK_THEME;
  const iconAnimation = ICON_ANIMATIONS[business.id] ?? DEFAULT_ICON_ANIMATION;

  // Cursor-following glow.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glow = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(${theme.glowRgb}, 0.10), transparent 70%)`;

  return (
    <div>
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
        style={{ backgroundColor: theme.bg }}
        className="group will-transform relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-5 transition-shadow duration-300 hover:shadow-glass-lg sm:p-6 3xl:rounded-[1.75rem] 3xl:p-7"
      >
        {/* Cursor glow — fades in under the pointer */}
        <motion.div
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Shine sweep — diagonal light strip crosses the card on hover */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem] 3xl:rounded-[2rem]"
          aria-hidden="true"
        >
          <div className="will-transform absolute inset-y-0 left-0 w-1/3 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-[350%]" />
        </div>

        {/* Ghost index numeral */}
        <span
          aria-hidden="true"
          style={{ color: theme.accent }}
          className="pointer-events-none absolute -top-3 right-4 select-none text-[clamp(3.25rem,4.5vw,4.5rem)] font-extrabold leading-none tracking-tighter opacity-[0.08]"
        >
          {business.index}
        </span>

        {/* Icon chip — white squircle, accent icon */}
        <div className="relative flex items-start justify-between">
          <span
            style={{ color: theme.accent }}
            className="will-transform grid h-12 w-12 place-items-center rounded-xl bg-white shadow-glass transition-transform duration-400 ease-premium group-hover:scale-110 group-hover:-rotate-3 3xl:h-14 3xl:w-14"
          >
            <motion.span
              className="will-transform grid place-items-center"
              animate={iconAnimation.animate}
              transition={iconAnimation.transition}
            >
              <Icon className="h-6 w-6 3xl:h-7 3xl:w-7" aria-hidden="true" />
            </motion.span>
          </span>
        </div>

        {/* Accent hairline */}
        <span
          aria-hidden="true"
          style={{ backgroundColor: theme.accent }}
          className="will-transform relative mt-4 block h-0.5 w-9 origin-left rounded-full transition-transform duration-400 ease-premium group-hover:scale-x-150"
        />

        {/* Text */}
        <h3 className="relative mt-2.5 text-[clamp(1.2rem,1.7vw,1.45rem)] font-normal capitalize leading-tight text-navy-900">
          {business.title}
        </h3>
        <p style={{ color: theme.accent }} className="relative mt-1 text-sm font-normal">
          {business.tagline}
        </p>
        <p className="relative mt-2 text-sm leading-relaxed text-navy-500 3xl:text-base">
          {business.description}
        </p>

        {/* Feature pills — quiet white chips on the tinted field */}
        <div className="relative mt-4 flex flex-wrap gap-1.5">
          {business.features.map((feature) => (
            <span
              key={feature}
              className="flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-xs font-normal text-navy-600 transition-transform duration-300 ease-premium hover:scale-105 3xl:px-3 3xl:py-1.5"
            >
              <span
                style={{ backgroundColor: theme.accent }}
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                aria-hidden="true"
              />
              {feature}
            </span>
          ))}
        </div>

        {/* CTA — slides up into view on hover */}
        <div className="relative mt-auto pt-4">
          <span
            style={{ color: theme.accent }}
            className="will-transform inline-flex translate-y-2 items-center gap-1.5 text-sm font-normal opacity-0 transition-[transform,opacity] duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 3xl:text-base"
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
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Ambient backdrop — faint grid + soft washes from the card palette */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-20" />
        <div className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-[#eff6ff] blur-3xl" />
        <div className="absolute right-[-5rem] top-1/3 h-80 w-80 rounded-full bg-[#faf5ff] blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#f0fdf8] blur-3xl" />
      </div>

      <Container className="relative">
        {/* Counter badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex justify-center"
        >
          <span className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy-600 shadow-glass 3xl:px-7 3xl:py-3 3xl:text-base">
            <span
              style={{ backgroundColor: '#0d9a6a' }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
            >
              6
            </span>
            Business Verticals
          </span>
        </motion.div>

        <SectionHeading
          eyebrow="The Business Universe"
          title={
            <>
              <span style={{ color: '#0d9a6a' }}>Four worlds.</span>{' '}
              <span className="text-navy-900">One universe.</span>
            </>
          }
          titleClassName="font-normal normal-case"
          description={BUSINESS_UNIVERSE.description}
        />

        {/* Palette spectrum divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.2 }}
          className="mt-7 flex justify-center"
        >
          <span aria-hidden="true" style={{ background: SPECTRUM }} className="h-1 w-24 rounded-full" />
        </motion.div>

        {/* ── Bento grid — staggered reveal on scroll ── */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-6 sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 3xl:gap-8"
        >
          {BUSINESSES.map((business) => (
            <BentoCard key={business.id} business={business} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
