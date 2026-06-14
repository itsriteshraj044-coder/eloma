import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useCountUp } from '@/hooks/useCountUp';
import { CONNECTED, STATS } from '@/data/content';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { Globe } from '@/components/sections/hero/Globe';
import type { Stat } from '@/types';

function StatCell({ stat }: { stat: Stat }) {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.decimals });
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl px-4 py-6 text-center transition-colors duration-300 hover:bg-emerald-50/60 sm:px-6 sm:py-8 3xl:py-10"
    >
      <p className="text-display-md font-extrabold text-gradient">
        {stat.prefix}
        <span ref={ref}>{display}</span>
        {stat.suffix}
      </p>
      <p className="mt-2 text-body-fluid text-navy-500 3xl:mt-3">{stat.label}</p>
      <span
        aria-hidden="true"
        className="mx-auto mt-3 block h-0.5 w-6 rounded-full bg-emerald-300/80 transition-transform duration-300 ease-premium group-hover:scale-x-[1.8]"
      />
    </motion.div>
  );
}

/**
 * "Connected Globally" — interactive cobe v2 globe on the right, stats on the
 * left. The globe here is a natural fit: it visualises exactly what the copy
 * describes — Eloma's 8 global markets with animated connecting arcs.
 */
export function ConnectedGlobally() {
  return (
    <section
      id="connected"
      aria-label="Connected globally"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Ambient backdrop — faint grid fading out from centre + soft light washes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 [mask-image:radial-gradient(ellipse_75%_65%_at_60%_45%,black_25%,transparent_75%)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 xl:grid-cols-12 xl:gap-10 2xl:gap-12 3xl:gap-14 4xl:gap-20">

          {/* Left — heading + stats */}
          <div className="xl:col-span-5">
            <motion.div
              variants={staggerParent(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="flex flex-col gap-5"
            >
              <motion.span variants={fadeUp} className="eyebrow w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {CONNECTED.descriptor}
              </motion.span>

              <motion.h2 variants={fadeUp} className="text-[clamp(1.75rem,5vw,2.5rem)] leading-[1.15] font-normal capitalize text-navy-900 text-balance">
                <span className="text-emerald-500">Connected</span>{' '}
                <span className="text-navy-900">Globally</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="flex items-center gap-3 text-sm font-semibold capitalize tracking-[0.2em] text-emerald-600 3xl:text-base 4xl:text-lg"
              >
                <span aria-hidden="true" className="h-px w-8 shrink-0 bg-emerald-300" />
                {CONNECTED.caption}
              </motion.p>
            </motion.div>

            {/* Stats — frameless editorial grid with a hairline cross divider */}
            <motion.div
              variants={staggerParent(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="relative mt-8 grid grid-cols-2 sm:mt-10"
            >
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-4 left-1/2 w-px bg-navy-100" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-4 top-1/2 h-px bg-navy-100" />
              {STATS.map((stat) => (
                <StatCell key={stat.label} stat={stat} />
              ))}
            </motion.div>
          </div>

          {/* Right — interactive globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 32 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative xl:col-span-7"
          >
            <div className="relative mx-auto w-full max-w-[clamp(280px,40vw,860px)]">
              <div className="relative">
                {/* Soft halo behind the globe */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-100/50 blur-3xl"
                />

                <div className="relative">
                  <Globe />
                </div>
              </div>

              {/* "Operating across 8 markets" badge anchored below globe */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="mt-5 flex justify-center"
              >
                <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-white/90 px-5 py-2.5 text-[12px] font-normal tracking-[1.5px] text-navy-800 shadow-glass 3xl:px-6 3xl:py-3 3xl:text-sm">
                  <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 [animation-duration:2.4s]" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Operating across 8 global markets
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
