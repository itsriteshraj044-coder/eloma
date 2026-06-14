import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CAPABILITIES } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Capabilities Schematic" — the refined edition of the blueprint concept.
 * Same idea, executed to drawing-office standard: a denser wireframe globe,
 * leader lines that draw in and light up emerald when their callout is
 * hovered, pulse dots riding every line, a corner-ticked frame and an
 * engineer's title stamp. Mono navy + emerald — no multi-colour accents.
 * Content identical to the original section.
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
const CALLOUTS = [
  { left: 14.25, top: 28.57, path: 'M 320 175 L 240 120 L 206 120' },
  { left: 85.75, top: 28.57, path: 'M 480 175 L 560 120 L 594 120' },
  { left: 14.25, top: 71.43, path: 'M 320 245 L 240 300 L 206 300' },
  { left: 85.75, top: 71.43, path: 'M 480 245 L 560 300 L 594 300' },
];

const ANCHORS = [
  { x: 320, y: 175 },
  { x: 480, y: 175 },
  { x: 320, y: 245 },
  { x: 480, y: 245 },
];

/** Wireframe globe parts — denser than the original. */
const GLOBE_ELLIPSES: { rx: number; ry: number }[] = [
  { rx: 100, ry: 38 },
  { rx: 100, ry: 72 },
  { rx: 38, ry: 100 },
  { rx: 72, ry: 100 },
];

export function CapabilitiesSchematic() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="capabilities-schematic"
      aria-label="Global capabilities — refined schematic"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Blueprint grid backdrop, fading toward the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black_30%,transparent_80%)]"
      />

      <Container className="relative">
        <SectionHeading
          title={
            <>
              <span className="text-emerald-500">Global</span> Capabilities
            </>
          }
          titleClassName="!text-[2rem] !font-normal"
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

          <svg aria-hidden="true" viewBox="0 0 800 420" className="absolute inset-0 h-full w-full">
            {/* Wireframe globe — outline, meridians, parallels, equator */}
            <motion.circle
              cx="400" cy="210" r="100" fill="none" stroke="#9fb6cf" strokeWidth="1.1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT_ONCE}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            {GLOBE_ELLIPSES.map((e, i) => (
              <motion.ellipse
                key={`${e.rx}-${e.ry}`}
                cx="400" cy="210" rx={e.rx} ry={e.ry} fill="none" stroke="#9fb6cf" strokeWidth="0.7"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT_ONCE}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: 'easeInOut' }}
              />
            ))}
            <motion.line
              x1="300" y1="210" x2="500" y2="210" stroke="#9fb6cf" strokeWidth="0.7"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.9, delay: 0.55, ease: 'easeInOut' }}
            />
            {/* Centre cross-hair */}
            <motion.path
              d="M 400 198 L 400 222 M 388 210 L 412 210"
              stroke="#3CB98C" strokeWidth="0.9"
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.9 }} viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.5, delay: 0.7 }}
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

            {/* Anchor donuts on the globe */}
            {ANCHORS.map((a, i) => (
              <motion.circle
                key={`${a.x}-${a.y}`}
                cx={a.x} cy={a.y} r="5"
                fill="#ffffff"
                stroke={hovered === i ? '#3CB98C' : '#6b8db3'}
                strokeWidth="2.5"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
                style={{ transition: 'stroke 0.3s' }}
              />
            ))}
          </svg>

          {/* Hub label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pt-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-navy-900">Eloma</p>
            <p className="text-[9px] font-semibold uppercase tracking-[2px] text-emerald-600">Group</p>
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
