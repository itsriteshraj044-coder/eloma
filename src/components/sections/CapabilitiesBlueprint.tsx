import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CAPABILITIES } from '@/data/content';
import { CAP_THEMES } from '@/data/capabilitiesMedia';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/** Callout anchor (% of canvas) and the matching SVG leader-line path. */
const CALLOUTS = [
  { left: 13, top: 18, path: 'M 320 175 L 220 120 L 150 120' },
  { left: 87, top: 18, path: 'M 480 175 L 580 120 L 650 120' },
  { left: 13, top: 82, path: 'M 320 245 L 220 300 L 150 300' },
  { left: 87, top: 82, path: 'M 480 245 L 580 300 L 650 300' },
];

/**
 * "Capabilities Blueprint" — the group drawn as a technical schematic: a
 * wireframe globe at centre, dashed leader lines sketching out to four
 * annotated callouts, all drawn in as the section enters view. Engineering
 * precision as the aesthetic. Stacked annotations on mobile.
 */
export function CapabilitiesBlueprint() {
  return (
    <section
      id="capabilities-blueprint"
      aria-label="Global capabilities — blueprint"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Blueprint grid backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-30" />

      <Container className="relative">
        <SectionHeading
          title={
            <>
              <span className="text-emerald-500">Global</span> Capabilities
            </>
          }
        />

        {/* ── Schematic (lg+) ── */}
        <div className="relative mx-auto mt-10 hidden aspect-[2/1] w-full max-w-5xl lg:block">
          <svg aria-hidden="true" viewBox="0 0 800 420" className="absolute inset-0 h-full w-full">
            {/* Wireframe globe */}
            <motion.circle
              cx="400" cy="210" r="100" fill="none" stroke="#9fb6cf" strokeWidth="1"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT_ONCE}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="400" cy="210" rx="100" ry="38" fill="none" stroke="#9fb6cf" strokeWidth="0.8"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT_ONCE}
              transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
            />
            <motion.ellipse
              cx="400" cy="210" rx="38" ry="100" fill="none" stroke="#9fb6cf" strokeWidth="0.8"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT_ONCE}
              transition={{ duration: 1.2, delay: 0.35, ease: 'easeInOut' }}
            />
            <motion.line
              x1="300" y1="210" x2="500" y2="210" stroke="#9fb6cf" strokeWidth="0.8"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.9, delay: 0.45, ease: 'easeInOut' }}
            />
            {/* Dashed leader lines to the callouts */}
            {CALLOUTS.map((c, i) => (
              <motion.path
                key={c.path}
                d={c.path}
                fill="none"
                stroke={CAP_THEMES[i].accent}
                strokeWidth="1.1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.8, delay: 0.7 + i * 0.15, ease: 'easeInOut' }}
              />
            ))}
            {/* Anchor dots on the globe */}
            {['320 175', '480 175', '320 245', '480 245'].map((pt, i) => {
              const [x, y] = pt.split(' ');
              return (
                <motion.circle
                  key={pt}
                  cx={x} cy={y} r="4"
                  fill={CAP_THEMES[i].accent}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={VIEWPORT_ONCE}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
                />
              );
            })}
          </svg>

          {/* Hub label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-navy-900">Eloma</p>
            <p className="text-[9px] font-semibold uppercase tracking-[2px] text-emerald-600">Group</p>
          </div>

          {/* Annotated callouts */}
          {CAPABILITIES.map((capability, i) => {
            const Icon = capability.icon;
            const t = CAP_THEMES[i];
            const pos = CALLOUTS[i];
            return (
              <motion.div
                key={capability.index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.15, ease: EASE_PREMIUM }}
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                className="absolute w-[240px] -translate-x-1/2 -translate-y-1/2 3xl:w-[270px]"
              >
                <div className="rounded-2xl border border-navy-100 bg-white/95 p-4 shadow-glass">
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ backgroundColor: t.bg, color: t.accent }}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p style={{ color: t.accent }} className="text-[9px] font-semibold uppercase tracking-[2px]">
                        Fig. {capability.index}
                      </p>
                      <h3 className="text-[13.5px] font-semibold capitalize leading-tight text-navy-900">
                        {capability.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-navy-500">
                    {capability.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile/tablet — stacked annotations ── */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden"
        >
          {CAPABILITIES.map((capability, i) => {
            const Icon = capability.icon;
            const t = CAP_THEMES[i];
            return (
              <motion.div
                key={capability.index}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } } }}
                className="rounded-2xl border border-navy-100 bg-white p-5 shadow-glass"
              >
                <div className="flex items-center gap-3">
                  <span
                    style={{ backgroundColor: t.bg, color: t.accent }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p style={{ color: t.accent }} className="text-[9px] font-semibold uppercase tracking-[2px]">
                      Fig. {capability.index}
                    </p>
                    <h3 className="text-[15px] font-semibold capitalize text-navy-900">{capability.title}</h3>
                  </div>
                </div>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-navy-500">{capability.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
