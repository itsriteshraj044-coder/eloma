import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CAPABILITIES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Capabilities Blueprint" — now identical to the refined schematic design:
 * a denser wireframe globe, leader lines that draw in and light up emerald
 * when their callout is hovered, pulse dots riding every line, a
 * corner-ticked frame. Mono navy + emerald — no multi-colour accents.
 */

/**
 * Callout anchor (% of canvas) and the matching SVG leader-line path.
 * Exact geometry (cards are 24% of canvas width = 192 of the 800 viewBox
 * units, half = 96, so % positions and px sizes can never drift apart):
 *  - tail y 120 / 300 (→ top 28.57% / 71.43%) = the card's vertical centre
 *  - left cards centred at x 114 (14.25%): near edge at 210, tail ends at
 *    206 → tucks 4 units under the card
 *  - right cards centred at x 686 (85.75%): near edge at 590, tail ends at
 *    594 → tucks 4 units under the card
 *  - both sides sit 18 units from the frame — perfectly symmetric
 */
/**
 * Anchors sit exactly ON the globe outline (r=100 around 400,210), so the
 * circle stays a clean unbroken ring with four node beads on it. Leader
 * lines start just outside each bead so they never pierce its ring.
 */
const CALLOUTS = [
  { left: 14.25, top: 28.57, path: 'M 306 157 L 240 120 L 206 120' },
  { left: 85.75, top: 28.57, path: 'M 494 157 L 560 120 L 594 120' },
  { left: 14.25, top: 71.43, path: 'M 306 263 L 240 300 L 206 300' },
  { left: 85.75, top: 71.43, path: 'M 494 263 L 560 300 L 594 300' },
];

const ANCHORS = [
  { x: 313, y: 161 },
  { x: 487, y: 161 },
  { x: 313, y: 259 },
  { x: 487, y: 259 },
];

export function CapabilitiesBlueprint() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="capabilities-blueprint"
      aria-label="Global capabilities — blueprint"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container className="relative">
        <SectionHeading
          title={
            <>
              <span className="text-emerald-500">Global</span> Capabilities
            </>
          }
          titleClassName="!text-[2rem] !font-normal !normal-case"
        />

        {/* ── Schematic (lg+) ── */}
        <div className="relative mx-auto mt-10 hidden aspect-[2/1] w-full max-w-5xl lg:block">

          {/* Drawing frame — corner ticks */}
          {(['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'left-0 bottom-0 border-l-2 border-b-2', 'right-0 bottom-0 border-r-2 border-b-2'] as const).map((corner) => (
            <span
              key={corner}
              aria-hidden="true"
              className={cn('pointer-events-none absolute h-5 w-5 border-navy-200', corner)}
            />
          ))}

          {/* Signal ripple — a slow expanding ring breathing out of the globe */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[47.6%] -translate-x-1/2 -translate-y-1/2 motion-reduce:hidden"
          >
            <span className="absolute inset-0 animate-ping rounded-full border border-emerald-300/50 [animation-duration:3.6s]" />
          </div>

          <svg aria-hidden="true" viewBox="0 0 800 420" className="absolute inset-0 h-full w-full">
            {/* Globe outline — drawn in via dash-offset so the ring always
                ends perfectly closed (pathLength leaves a seam notch) */}
            <motion.circle
              cx="400" cy="210" r="100" fill="none" stroke="#9fb6cf" strokeWidth="1.2"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              initial={{ strokeDashoffset: 100 }}
              whileInView={{ strokeDashoffset: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />

            {/* Leader lines — light up when their callout is hovered */}
            {CALLOUTS.map((c, i) => (
              <motion.path
                key={c.path}
                d={c.path}
                fill="none"
                stroke={hovered === i ? '#3CB98C' : '#9fb6cf'}
                strokeWidth={hovered === i ? 1.8 : 1.1}
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: hovered === i ? 1 : 0.75 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, delay: 0.7 + i * 0.15, ease: 'easeInOut' }}
                style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
              />
            ))}

            {/* Pulse dots riding the leader lines */}
            <g className="motion-reduce:hidden">
              {CALLOUTS.map((c, i) => (
                <circle key={`pulse-${c.path}`} r="3" fill="#3CB98C" opacity="0.85">
                  <animateMotion dur="3.2s" begin={`${1.2 + i * 0.8}s`} repeatCount="indefinite" path={c.path} />
                </circle>
              ))}
            </g>

            {/* Anchor beads on the globe outline — grow gently when their
                callout is hovered */}
            {ANCHORS.map((a, i) => (
              <motion.circle
                key={`${a.x}-${a.y}`}
                cx={a.x} cy={a.y}
                fill="#ffffff"
                stroke={hovered === i ? '#3CB98C' : '#6b8db3'}
                strokeWidth="2.5"
                initial={{ opacity: 0, r: 5 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT_ONCE}
                animate={{ r: hovered === i ? 7 : 5 }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.7 + i * 0.15 },
                  r: { duration: 0.25, ease: 'easeOut' },
                }}
                style={{ transition: 'stroke 0.3s' }}
              />
            ))}
          </svg>

          {/* Hub — Eloma Group logo at the centre of the globe.
              Outer div positions, middle div floats (CSS), inner img handles
              the framer entrance — transforms never fight each other. */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[40%] -translate-x-1/2 -translate-y-1/2">
            <div className="will-transform h-full w-full animate-float [animation-duration:8s] motion-reduce:animate-none">
              <motion.img
                src="/Eloma Group Logo-02.png"
                alt="Eloma Group logo"
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.7, delay: 0.5, ease: EASE_PREMIUM }}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Annotated callouts */}
          {CAPABILITIES.map((capability, i) => {
            const Icon = capability.icon;
            const pos = CALLOUTS[i];
            const isHovered = hovered === i;
            return (
              // Positioning wrapper — keeps the CSS centering transform away
              // from Framer (which overwrites `transform` while animating).
              <div
                key={capability.index}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                className="absolute w-[24%] -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.15, ease: EASE_PREMIUM }}
                >
                <div
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    'will-transform group cursor-default rounded-2xl border bg-white/95 p-4 transition-[border-color,box-shadow,transform] duration-300 ease-premium 3xl:p-5',
                    isHovered
                      ? '-translate-y-1 border-emerald-200 shadow-glass-lg'
                      : 'border-navy-100 shadow-glass',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        'grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300',
                        isHovered ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600',
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[2px] text-emerald-600">
                        Fig. {capability.index}
                      </p>
                      <h3 className="text-[14px] font-semibold capitalize leading-tight text-navy-900">
                        {capability.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2.5 text-[12px] leading-relaxed text-navy-500">
                    {capability.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-3 block h-0.5 w-8 origin-left rounded-full bg-emerald-300 transition-transform duration-300 ease-premium',
                      isHovered && 'scale-x-[1.75]',
                    )}
                  />
                </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── Mobile/tablet — annotated index cards ── */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {CAPABILITIES.map((capability) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={capability.index}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } },
                }}
                className="relative overflow-hidden rounded-2xl border border-navy-100 bg-white p-5 shadow-glass"
              >
                <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-emerald-300/80" />
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[2px] text-emerald-600">
                      Fig. {capability.index}
                    </p>
                    <h3 className="text-[15px] font-semibold capitalize text-navy-900">
                      {capability.title}
                    </h3>
                  </div>
                </div>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-500">
                  {capability.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
