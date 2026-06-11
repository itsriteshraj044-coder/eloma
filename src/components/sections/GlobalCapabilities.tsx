import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CAPABILITIES } from '@/data/content';
import { cn } from '@/lib/cn';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/** Interactive showcase: a tab-list of capabilities driving a large preview panel. */
function CapabilitiesShowcase() {
  const [active, setActive] = useState(0);
  const activeCapability = CAPABILITIES[active];
  const ActiveIcon = activeCapability.icon;

  return (
    <motion.div
      variants={staggerParent(0.1, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] 3xl:gap-10"
    >
      {/* ── Tab list ─────────────────────────────────────────────────── */}
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        {CAPABILITIES.map((capability, i) => {
          const Icon = capability.icon;
          const isActive = i === active;
          return (
            <button
              key={capability.index}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cn(
                'group relative flex items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-colors duration-300 sm:px-6 sm:py-5',
                isActive
                  ? 'border-emerald-200 bg-emerald-50/50 shadow-glass'
                  : 'border-navy-100 bg-white hover:border-emerald-100 hover:bg-navy-50/40',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="capabilities-active-bar"
                  className="will-transform absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-navy-700"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              <span
                className={cn(
                  'text-eyebrow-fluid shrink-0 font-black transition-colors duration-300',
                  isActive ? 'text-emerald-500' : 'text-navy-200',
                )}
              >
                {capability.index}
              </span>

              <span
                className={cn(
                  'grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors duration-300 3xl:h-14 3xl:w-14 3xl:rounded-2xl',
                  isActive ? 'bg-navy-900 text-emerald-400' : 'bg-navy-50 text-navy-400 group-hover:text-navy-600',
                )}
              >
                <Icon className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
              </span>

              <span
                className={cn(
                  'text-meta-value font-bold capitalize transition-colors duration-300',
                  isActive ? 'text-navy-900' : 'text-navy-600',
                )}
              >
                {capability.title}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Active preview panel ─────────────────────────────────────── */}
      <motion.div
        variants={scaleIn}
        className="relative min-h-[clamp(18rem,28vw,24rem)] overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-8 text-white sm:p-10 3xl:rounded-[2rem] 3xl:p-12"
      >
        {/* Ambient glow */}
        <div className="will-transform pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/15 blur-[80px]" aria-hidden="true" />

        {/* Orbiting dots — global network motif */}
        <motion.div
          className="will-transform pointer-events-none absolute -right-10 -top-10 h-40 w-40 [transform-style:preserve-3d]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-400" />
          <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-300/70" />
          <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/50" />
          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-300/50" />
          <div className="absolute inset-0 rounded-full border border-white/10" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="will-transform relative"
          >
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300 3xl:h-20 3xl:w-20 3xl:rounded-3xl">
              <ActiveIcon className="h-8 w-8 3xl:h-10 3xl:w-10" aria-hidden="true" />
            </span>
            <span className="mt-6 block text-eyebrow-fluid text-emerald-300">
              {activeCapability.index} / {String(CAPABILITIES.length).padStart(2, '0')}
            </span>
            <h4 className="mt-3 text-[clamp(1.75rem,2vw,2.1875rem)] font-bold capitalize">
              {activeCapability.title}
            </h4>
            <p className="mt-3 max-w-md text-body-fluid text-navy-100 text-pretty">
              {activeCapability.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/** Global Capabilities — what the group does everywhere it operates. */
export function GlobalCapabilities() {
  return (
    <section
      id="global"
      aria-label="Global capabilities"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
        <SectionHeading
          title={
            <>
              <span className="text-emerald-500">Global</span> Capabilities
            </>
          }
        />
        <CapabilitiesShowcase />
      </Container>
    </section>
  );
}
