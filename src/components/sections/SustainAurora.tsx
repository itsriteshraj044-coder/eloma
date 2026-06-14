import { useRef, type MouseEvent } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Pillar } from '@/types';

const SPRING = { stiffness: 160, damping: 20, mass: 0.6 };

function AuroraCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), SPRING);
  const rotateY = useSpring(useMotionValue(0), SPRING);
  const spotX = useMotionValue(50);
  const spotY = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${spotX}% ${spotY}%, rgba(60,185,140,0.14), transparent 70%)`;

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 7);
    rotateY.set((px - 0.5) * 7);
    spotX.set(px * 100);
    spotY.set(py * 100);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    spotX.set(50);
    spotY.set(50);
  }

  return (
    <motion.div variants={scaleIn} className="h-full [perspective:900px]">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY }}
        className="will-transform group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-7 shadow-glass transition-shadow duration-300 hover:shadow-glass-lg sm:p-8 3xl:p-10 [transform-style:preserve-3d]"
      >
        {/* Cursor spotlight */}
        <motion.div
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Index watermark */}
        <span
          className="pointer-events-none absolute -right-2 -top-5 text-[clamp(4rem,5.5vw,5.5rem)] font-black leading-none tracking-[-0.05em] text-navy-50 transition-colors duration-500 group-hover:text-emerald-50"
          aria-hidden="true"
        >
          {pillar.index}
        </span>

        <span className="relative grid h-[52px] w-[52px] place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-glow-emerald">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>

        <p className="relative mt-7 text-eyebrow-fluid uppercase text-emerald-600">{pillar.subtitle}</p>
        <h3 className="relative mt-2 text-[clamp(1.3rem,1.6vw,1.6rem)] font-black uppercase tracking-[-0.03em] text-navy-900">
          {pillar.title}
        </h3>
        <p className="relative mt-3 flex-1 text-[clamp(0.875rem,1vw,1rem)] leading-[1.75] text-navy-500">
          {pillar.description}
        </p>

        {/* Hairline that grows on hover */}
        <span className="relative mt-6 block h-[2px] w-full overflow-hidden rounded-full bg-navy-50" aria-hidden="true">
          <span className="will-transform block h-full w-full origin-left scale-x-0 bg-emerald-400 transition-transform duration-500 ease-premium group-hover:scale-x-100" />
        </span>
      </motion.div>
    </motion.div>
  );
}

/**
 * "Aurora" — four pillars as living glass plates. A soft emerald aurora
 * drifts behind the grid while each card tilts in 3D toward the cursor and
 * carries a spotlight that follows the pointer — calm at rest, alive in hand.
 */
export function SustainAurora() {
  return (
    <section
      id="sustain-aurora"
      aria-label="Why we exist — aurora"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Drifting aurora blobs */}
      <div
        className="pointer-events-none absolute -left-32 top-24 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] rounded-full bg-navy-50 blur-3xl animate-float [animation-delay:-3s]"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth
              <br />
              <span className="text-emerald-500">and Responsible Business</span>
            </>
          }
          description={SUSTAINABILITY.body}
        />

        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4 3xl:gap-8"
        >
          {PILLARS.map((pillar) => (
            <AuroraCard key={pillar.index} pillar={pillar} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
