import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  ArrowUpRight,
  Building2,
  Globe,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { cn } from '@/lib/cn';
import { fadeUp, scaleIn, staggerParent } from '@/lib/motion';

/** Re-triggering viewport: replays the reveal each time the section enters view. */
const VIEWPORT_REPEAT = { once: false, amount: 0.25 } as const;

/**
 * "Why We Exist" — bento-grid design.
 *
 * Same content as the SustainTransit map (the four sustainability pillars +
 * heading/body). The pillar icons are mapped to business terms here (scoped to
 * this section so the shared PILLARS data is untouched elsewhere). Four tiles
 * alternate navy-gradient / light surfaces; the tall closing tile features the
 * section body as a quote with a single sustainability icon on an orbiting ring.
 * Every tile has a pointer-tracked 3D tilt + cursor sheen — transform/opacity
 * only, ambient loops on CSS keyframes, pointer-events-none, per 120fps rules.
 */

/** Business-term icons keyed by pillar index (section-scoped override). */
const PILLAR_ICONS: Record<string, LucideIcon> = {
  '01': Target, // The Root — a single vision
  '02': Building2, // The Branches — the four business divisions
  '03': Globe, // The Canopy — a global ecosystem
  '04': TrendingUp, // The Horizon — built for generations
};

const DARK_TILES = new Set([0, 3]);

/** Shared pointer-tilt state for a card. */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 150,
    damping: 18,
  });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return { ref, mx, my, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/** Cursor-following sheen overlay (opacity + transform only). */
function Sheen({ mx, my, color }: { mx: MotionValue<number>; my: MotionValue<number>; color: string }) {
  const bg = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(240px circle at ${x * 100}% ${y * 100}%, ${color}, transparent 65%)`,
  );
  return (
    <motion.span
      aria-hidden="true"
      style={{ backgroundImage: bg }}
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    />
  );
}

function PillarTile({
  pillar,
  Icon,
  dark,
}: {
  pillar: (typeof PILLARS)[number];
  Icon: LucideIcon;
  dark: boolean;
}) {
  const { ref, mx, my, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(7);
  const iconX = useTransform(mx, [0, 1], [8, -8]);
  const iconY = useTransform(my, [0, 1], [8, -8]);

  return (
    <motion.article
      ref={ref}
      variants={scaleIn}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.03 }}
      style={{ rotateX, rotateY, transformPerspective: 900, willChange: 'transform' }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[1.5rem] p-6 shadow-glass transition-shadow duration-300 hover:shadow-glass-lg sm:p-7',
        dark
          ? 'bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 text-white'
          : 'border border-navy-100 bg-white text-navy-900',
      )}
    >
      <Sheen mx={mx} my={my} color={dark ? 'rgba(255,255,255,0.20)' : 'rgba(8,33,60,0.12)'} />

      {dark && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-navy-400/30 blur-3xl"
        />
      )}

      <div className="relative flex items-center justify-between">
        <motion.span
          style={{ x: iconX, y: iconY }}
          className={cn(
            'grid h-11 w-11 place-items-center rounded-xl transition-transform duration-300 ease-premium group-hover:scale-110',
            dark ? 'bg-white/10 text-emerald-300' : 'bg-emerald-50 text-emerald-600',
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.span>
        <span
          className={cn(
            'text-[11px] font-bold uppercase tracking-[2px]',
            dark ? 'text-white/40' : 'text-navy-300',
          )}
        >
          {pillar.index} / 0{PILLARS.length}
        </span>
      </div>

      <h3
        className={cn(
          'relative mt-5 text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight',
          dark ? 'text-white' : 'text-navy-900',
        )}
      >
        {pillar.title}
      </h3>
      <p
        className={cn(
          'relative mt-1 text-[13px] font-medium',
          dark ? 'text-emerald-300' : 'text-emerald-600',
        )}
      >
        {pillar.subtitle}
      </p>
      <p
        className={cn(
          'relative mt-3 text-sm leading-relaxed',
          dark ? 'text-white/70' : 'text-navy-500',
        )}
      >
        {pillar.description}
      </p>
    </motion.article>
  );
}

/** Tall closing tile — single sustainability icon on an orbiting ring + body quote + CTA. */
function StatementTile() {
  const { ref, mx, my, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5);

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ scale: 1.02 }}
      style={{ rotateX, rotateY, transformPerspective: 1100, willChange: 'transform' }}
      className="group relative flex min-h-[24rem] flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-7 text-white shadow-glass-lg sm:p-8 lg:col-span-4"
    >
      <Sheen mx={mx} my={my} color="rgba(255,255,255,0.16)" />

      {/* Dotted texture + ambient blobs */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:18px_18px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-12 h-56 w-56 rounded-full bg-navy-500/40 blur-3xl"
      />

      {/* ── Orbiting-ring icon (the single, content icon: sustainability) ── */}
      <div className="relative mx-auto grid h-32 w-32 place-items-center">
        {/* concentric rings */}
        <span aria-hidden="true" className="absolute h-32 w-32 rounded-full border border-white/10" />
        <span aria-hidden="true" className="absolute h-24 w-24 rounded-full border border-white/10" />
        {/* spinning accent arc */}
        <span
          aria-hidden="true"
          className="absolute h-32 w-32 rounded-full border-2 border-transparent border-t-emerald-400/90 [animation:sb-spin_6s_linear_infinite] motion-reduce:[animation:none]"
        />
        {/* orbiting dot */}
        <span
          aria-hidden="true"
          className="absolute h-24 w-24 [animation:sb-spin_9s_linear_infinite_reverse] motion-reduce:[animation:none]"
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-300 shadow-[0_0_12px_2px_rgba(60,185,140,0.7)]" />
        </span>
        {/* glow + center icon */}
        <span
          aria-hidden="true"
          className="absolute h-16 w-16 rounded-full bg-emerald-400/20 blur-xl [animation:sb-pulse_3.5s_ease-in-out_infinite] motion-reduce:[animation:none]"
        />
        <span className="relative grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
          <img
            src="/Eloma Group Logo-04.svg"
            alt="Eloma Group"
            width={40}
            height={40}
            decoding="async"
            className="h-10 w-10"
          />
        </span>
      </div>

      {/* ── Body as a quote ── */}
      <div className="relative mt-7">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-1 -top-7 select-none font-serif text-7xl leading-none text-white/10"
        >
          &ldquo;
        </span>
        <p className="relative text-[clamp(0.95rem,1vw,1.05rem)] font-normal leading-[1.7] text-white/85">
          {SUSTAINABILITY.body}
        </p>
      </div>

      {/* ── CTA ── */}
      <div className="relative mt-auto pt-6">
        <div className="mb-4 h-px w-full bg-white/10" />
        <a
          href="#sustain-bento"
          className="inline-flex items-center gap-2.5 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-emerald-400"
        >
          Discover more
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </motion.div>
  );
}

export function SustainBento() {
  return (
    <section
      id="sustain-bento"
      aria-label="Why we exist"
      className="section-py relative overflow-hidden bg-gradient-to-b from-white via-white to-navy-50"
    >
      <style>{`
        @keyframes sb-spin { to { transform: rotate(360deg) } }
        @keyframes sb-pulse { 0%,100% { opacity: 0.35 } 50% { opacity: 0.8 } }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(8,33,60,0.06),transparent_70%)]"
      />

      <Container className="relative">
        {/* ── Header ── */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REPEAT}
          className="flex flex-col items-center gap-4 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Why We Exist
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance"
          >
            <span className="text-navy-900">Committed to Sustainable Growth</span>
            <br />
            <span className="text-emerald-500">and Responsible Business.</span>
          </motion.h2>
        </motion.div>

        {/* ── Bento grid ── */}
        <motion.div
          variants={staggerParent(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_REPEAT}
          className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-12"
        >
          {/* Left: four pillar tiles in a 2×2 field */}
          <motion.div
            variants={staggerParent(0.09)}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-8"
          >
            {PILLARS.map((pillar, i) => (
              <PillarTile
                key={pillar.index}
                pillar={pillar}
                Icon={PILLAR_ICONS[pillar.index] ?? Target}
                dark={DARK_TILES.has(i)}
              />
            ))}
          </motion.div>

          {/* Right: tall statement + CTA tile */}
          <StatementTile />
        </motion.div>
      </Container>
    </section>
  );
}
