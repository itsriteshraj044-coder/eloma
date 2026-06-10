import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useCountUp } from '@/hooks/useCountUp';
import { CONNECTED, STATS } from '@/data/content';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { Globe } from '@/components/sections/hero/Globe';
import type { Stat } from '@/types';

function StatCard({ stat }: { stat: Stat }) {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.decimals });
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-navy-100 bg-white px-4 py-5 text-center shadow-glass transition-shadow duration-300 hover:shadow-glass-lg sm:px-6 sm:py-7 3xl:rounded-[2rem] 3xl:px-8 3xl:py-9 4xl:px-10 4xl:py-10"
    >
      <p className="text-display-md font-extrabold text-gradient">
        {stat.prefix}
        <span ref={ref}>{display}</span>
        {stat.suffix}
      </p>
      <p className="mt-2 text-body-fluid text-navy-500 3xl:mt-3 4xl:mt-4">{stat.label}</p>
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
              <motion.span variants={fadeUp} className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {CONNECTED.descriptor}
              </motion.span>

              <motion.h2 variants={fadeUp} className="text-section-h2 uppercase text-navy-900 text-balance">
                {CONNECTED.heading}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 3xl:text-base 4xl:text-lg"
              >
                {CONNECTED.caption}
              </motion.p>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={staggerParent(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 3xl:gap-5 4xl:gap-6 5xl:gap-8"
            >
              {STATS.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
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
              <Globe />

              {/* "Operating across 8 markets" badge anchored below globe */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="mt-4 flex justify-center"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800 shadow-glass 3xl:px-6 3xl:py-3 3xl:text-base 4xl:px-8 4xl:py-4 4xl:text-lg 5xl:text-xl">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 3xl:h-2.5 3xl:w-2.5 4xl:h-3 4xl:w-3" />
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
