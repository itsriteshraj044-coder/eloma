import { useState } from 'react';
import { motion, type TargetAndTransition, type Transition } from 'framer-motion';
import { ArrowUpRight, RotateCw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BUSINESS_UNIVERSE, BUSINESSES } from '@/data/content';
import { scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
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

function BusinessCard({ business }: { business: Business }) {
  const Icon = business.icon;
  const iconAnimation = ICON_ANIMATIONS[business.id] ?? DEFAULT_ICON_ANIMATION;
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full min-h-[clamp(22rem,40vw,28rem)] cursor-pointer select-none [perspective:1600px]"
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${business.title} — tap to flip card`}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <div
        className="will-transform relative h-full w-full transition-transform duration-700 ease-premium [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
        style={flipped ? { transform: 'rotateY(180deg)' } : undefined}
      >
        {/* ── Front face ─────────────────────────────────────────── */}
        <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-glass transition-colors duration-300 group-hover:border-emerald-200 [backface-visibility:hidden] 3xl:rounded-[2rem]">
          {/* Top accent bar */}
          <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-emerald-400/0 via-emerald-400 to-emerald-400/0" />

          {/* Ghost index */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-4 select-none text-[clamp(3rem,8vw,7.5rem)] font-black leading-none text-navy-900/[0.04]"
          >
            {business.index}
          </span>

          <div className="relative flex h-full flex-col p-6 sm:p-7 3xl:p-9 4xl:p-12">
            {/* Icon row */}
            <div className="flex items-start justify-between">
              <div className="relative">
                <div className="absolute -inset-1.5 rounded-2xl bg-emerald-400/20 blur-md opacity-60" />
                <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-600 text-white shadow-glow-emerald 3xl:h-20 3xl:w-20 3xl:rounded-3xl 4xl:h-24 4xl:w-24">
                  <motion.span
                    className="will-transform grid place-items-center"
                    animate={iconAnimation.animate}
                    transition={iconAnimation.transition}
                  >
                    <Icon className="h-8 w-8 3xl:h-10 3xl:w-10 4xl:h-12 4xl:w-12" aria-hidden="true" />
                  </motion.span>
                </span>
              </div>
              <span className="text-eyebrow-fluid text-navy-200">
                {business.index}
              </span>
            </div>

            {/* Text */}
            <h3 className="mt-5 text-[clamp(1.75rem,2vw,2.1875rem)] font-bold capitalize text-navy-900">
              {business.title}
            </h3>
            <p className="mt-1 text-body-fluid font-semibold text-emerald-600">
              {business.tagline}
            </p>
            <p className="mt-3 text-body-fluid text-navy-500">
              {business.description}
            </p>

            {/* Flip hint */}
            <div className="mt-auto flex items-center gap-1.5 pt-5 text-base font-semibold text-navy-400 3xl:text-lg">
              <motion.span
                className="will-transform grid place-items-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <RotateCw className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
              </motion.span>
              Hover to explore
            </div>
          </div>
        </div>

        {/* ── Back face ──────────────────────────────────────────── */}
        <div className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] 3xl:rounded-[2rem]">
          {/* Ambient glow */}
          <div className="will-transform pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden="true" />

          <div className="relative flex h-full flex-col p-6 sm:p-7 3xl:p-9 4xl:p-12">
            <span className="text-eyebrow-fluid text-emerald-300">
              {business.index}
            </span>
            <h3 className="mt-3 text-[clamp(1.75rem,2vw,2.1875rem)] font-bold capitalize">
              {business.title}
            </h3>
            <p className="mt-3 text-body-fluid text-navy-100">
              {business.description}
            </p>

            <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {business.features.map((f) => (
                <span
                  key={f}
                  className="flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-white/5 px-3 py-1.5 text-xs font-semibold text-emerald-200 3xl:px-4 3xl:py-2 3xl:text-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                  {f}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto flex items-center gap-1.5 pt-5 text-base font-semibold text-emerald-300 3xl:text-lg">
              Discover more
              <ArrowUpRight className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BusinessUniverse() {
  return (
    <section
      id="businesses"
      aria-label="Our businesses"
      className="section-py relative overflow-hidden"
    >
      {/* Section background */}
      <div className="absolute inset-0 bg-white" aria-hidden="true" />

      {/* Abstract animated blob shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="bg-blob will-transform absolute -right-[15%] -top-[20%] aspect-square w-[clamp(420px,55vw,900px)] bg-gradient-to-br from-navy-100/70 via-navy-50/60 to-transparent"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-blob will-transform absolute -bottom-[25%] -left-[10%] aspect-square w-[clamp(380px,48vw,780px)] bg-gradient-to-tr from-navy-50/80 via-navy-100/40 to-transparent"
          animate={{ x: [0, 30, 0], y: [0, -40, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="bg-blob will-transform absolute right-[15%] top-[35%] aspect-square w-[clamp(220px,26vw,420px)] bg-gradient-to-bl from-emerald-50/60 via-navy-50/30 to-transparent"
          animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

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
              <span className="text-emerald-500">Four Worlds.</span>{' '}
              <span className="text-navy-900">One Universe.</span>
            </>
          }
          description={BUSINESS_UNIVERSE.description}
        />

        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 3xl:gap-8 4xl:gap-10"
        >
          {BUSINESSES.map((business, i) => {
            const isLastOdd = i === BUSINESSES.length - 1 && BUSINESSES.length % 2 === 1;
            return (
              <motion.div
                key={business.id}
                variants={scaleIn}
                className={isLastOdd ? 'sm:col-span-2 xl:col-span-1' : ''}
              >
                <BusinessCard business={business} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
