import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Globe2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CAPABILITIES, GLOBAL_PRESENCE } from '@/data/content';
import { cn } from '@/lib/cn';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/* ── Region groupings ────────────────────────────────────────────────── */
const REGIONS = [
  {
    name: 'Asia-Pacific',
    shortCode: 'APAC',
    countries: ['Australia', 'India', 'Singapore', 'China'],
    color: 'from-navy-800 to-navy-600',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
  {
    name: 'Americas',
    shortCode: 'AMR',
    countries: ['USA', 'Canada'],
    color: 'from-navy-700 to-navy-500',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
  {
    name: 'Europe',
    shortCode: 'EUR',
    countries: ['UK'],
    color: 'from-navy-700 to-navy-500',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
  {
    name: 'Middle East',
    shortCode: 'MEA',
    countries: ['UAE'],
    color: 'from-navy-700 to-navy-500',
    bgColor: 'bg-white',
    borderColor: 'border-navy-100',
    textColor: 'text-navy-500',
  },
] as const;

/* ── Office locations plotted on the rotating globe ──────────────────── */
const LOCATIONS = [
  { name: 'Australia', flag: '🇦🇺', region: 'Asia-Pacific', lon: 0, lat: -28 },
  { name: 'Singapore', flag: '🇸🇬', region: 'Asia-Pacific', lon: 45, lat: 2 },
  { name: 'China', flag: '🇨🇳', region: 'Asia-Pacific', lon: 90, lat: 30 },
  { name: 'India', flag: '🇮🇳', region: 'Asia-Pacific', lon: 135, lat: 18 },
  { name: 'UAE', flag: '🇦🇪', region: 'Middle East', lon: 180, lat: 22 },
  { name: 'UK', flag: '🇬🇧', region: 'Europe', lon: 225, lat: 48 },
  { name: 'Canada', flag: '🇨🇦', region: 'Americas', lon: 270, lat: 46 },
  { name: 'USA', flag: '🇺🇸', region: 'Americas', lon: 315, lat: 34 },
] as const;

/** A single location pin orbiting the rotating globe surface. */
function GlobeMarker({
  loc,
  index,
  rotation,
  sizeRef,
}: {
  loc: (typeof LOCATIONS)[number];
  index: number;
  rotation: MotionValue<number>;
  sizeRef: React.RefObject<number>;
}) {
  const latRad = (loc.lat * Math.PI) / 180;
  const cosLat = Math.cos(latRad);
  const sinLat = Math.sin(latRad);
  const radius = 0.42;

  const x = useTransform(rotation, (r) => {
    const angle = ((loc.lon + r) * Math.PI) / 180;
    const size = sizeRef.current ?? 0;
    return size * (0.5 + radius * Math.sin(angle) * cosLat);
  });
  const y = useTransform(rotation, () => {
    const size = sizeRef.current ?? 0;
    return size * (0.5 - radius * sinLat * 0.95);
  });
  const depth = useTransform(rotation, (r) => {
    const angle = ((loc.lon + r) * Math.PI) / 180;
    return Math.cos(angle) * cosLat;
  });
  const scale = useTransform(depth, (d) => 0.55 + 0.45 * ((d + 1) / 2));
  const opacity = useTransform(depth, (d) => 0.3 + 0.7 * ((d + 1) / 2));
  const zIndex = useTransform(depth, (d) => (d > 0 ? 30 : 5));

  return (
    <motion.div className="will-transform pointer-events-none absolute left-0 top-0" style={{ x, y, zIndex }}>
      <motion.div
        style={{ x: '-50%', y: '-50%', scale, opacity }}
        className="group pointer-events-auto relative"
      >
        <motion.span
          className="will-transform absolute inset-0 rounded-full bg-emerald-400/40"
          animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: index * 0.3 }}
          aria-hidden="true"
        />
        <span className="relative grid h-8 w-8 place-items-center rounded-full border border-white/50 bg-white text-sm shadow-glass sm:h-10 sm:w-10 sm:text-base 3xl:h-11 3xl:w-11">
          {loc.flag}
        </span>
        <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-glass transition-opacity duration-200 group-hover:opacity-100">
          {loc.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

/** A continuously rotating globe with every market location pinned to its surface. */
function GlobeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeRef = useRef(0);
  const rotation = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => { sizeRef.current = el.offsetWidth; };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    rotation.set(rotation.get() + delta * 0.012);
  });

  return (
    <motion.div
      ref={containerRef}
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="relative mx-auto aspect-square w-full max-w-[clamp(20rem,46vw,32rem)]"
    >
      {/* Sphere */}
      <div
        className="absolute inset-[6%] overflow-hidden rounded-full shadow-glass-lg"
        style={{ background: 'radial-gradient(circle at 32% 28%, #2c4f74 0%, #15324f 45%, #08213c 80%, #051320 100%)' }}
      >
        <div
          className="globe-shine will-transform absolute -inset-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 55%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: 'inset -16px -16px 50px rgba(0,0,0,0.5), inset 14px 14px 36px rgba(255,255,255,0.06)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/10" aria-hidden="true" />
      </div>

      {/* Ambient glow */}
      <motion.div
        className="will-transform pointer-events-none absolute inset-[6%] rounded-full bg-emerald-400/15 blur-2xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      {/* Hub label */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-1.5 text-white">
          <Globe2 className="h-6 w-6 text-emerald-300 sm:h-8 sm:w-8 3xl:h-10 3xl:w-10" aria-hidden="true" />
          <span className="text-eyebrow-fluid uppercase tracking-[0.2em] text-emerald-300">
            Eloma Group
          </span>
        </div>
      </div>

      {/* Location markers orbiting the globe */}
      {LOCATIONS.map((loc, i) => (
        <GlobeMarker key={loc.name} loc={loc} index={i} rotation={rotation} sizeRef={sizeRef} />
      ))}
    </motion.div>
  );
}

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

/** Global Presence — regional footprint + global capabilities. */
export function GlobalPresence() {
  return (
    <section
      id="global"
      aria-label="Global presence"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Ambient */}
      <div
        className="will-transform pointer-events-none absolute -top-24 right-0 aspect-[6/5] w-[clamp(320px,38vw,600px)] rounded-full bg-navy-50/40 blur-[100px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Global Presence"
          description={GLOBAL_PRESENCE.body}
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto mt-3 max-w-2xl text-center text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 3xl:text-base"
        >
          {GLOBAL_PRESENCE.subheading}
        </motion.p>

        {/* ── Rotating globe — every market pinned to its surface ──────── */}
        <div className="mt-12 3xl:mt-14">
          <GlobeMap />

          {/* Region legend */}
          <motion.div
            variants={staggerParent(0.08, 0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {REGIONS.map((region) => (
              <motion.span
                key={region.name}
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-sm font-semibold text-navy-700 shadow-glass 3xl:px-5 3xl:py-2.5 3xl:text-base"
              >
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br ${region.color}`}
                  aria-hidden="true"
                />
                {region.name}
                <span className="text-navy-300" aria-hidden="true">·</span>
                <span className="text-navy-400">
                  {region.countries.length} {region.countries.length === 1 ? 'market' : 'markets'}
                </span>
              </motion.span>
            ))}
          </motion.div>

          {/* Total markets badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="mt-6 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 shadow-glass 3xl:px-7 3xl:py-3 3xl:text-base">
              <span
                className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-100"
                aria-hidden="true"
              />
              Operating across 8 global markets
            </span>
          </motion.div>
        </div>

        {/* ── Capabilities ──────────────────────────────────────────── */}
        <div className="mt-20 3xl:mt-24">
          <SectionHeading
            title={
              <>
                <span className="text-emerald-500">Global</span> Capabilities
              </>
            }
          />
          <CapabilitiesShowcase />
        </div>
      </Container>
    </section>
  );
}
