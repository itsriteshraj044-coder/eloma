import { motion } from 'framer-motion';
import { Quote, Users, Globe2, LayoutGrid, Lightbulb } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';
import { LEADERSHIP, STATS } from '@/data/content';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Stat } from '@/types';

const STAT_ICONS = [Users, Globe2, LayoutGrid, Lightbulb] as const;

function StatItem({ stat, Icon }: { stat: Stat; Icon: (typeof STAT_ICONS)[number] }) {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.decimals });
  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col items-center gap-2.5 text-center"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-glow-emerald sm:h-14 sm:w-14 3xl:h-16 3xl:w-16 3xl:rounded-3xl">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 3xl:h-8 3xl:w-8" aria-hidden="true" />
      </span>
      <p className="text-display-md font-extrabold text-gradient">
        {stat.prefix}
        <span ref={ref}>{display}</span>
        {stat.suffix}
      </p>
      <p className="text-sm font-medium text-navy-500 3xl:text-base 4xl:text-lg">{stat.label}</p>
    </motion.div>
  );
}

/** About Us — company stats, leadership story, and founder testimonial. */
export function About() {
  const { testimonial } = LEADERSHIP;

  return (
    <section
      id="about"
      aria-label="About us"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* ── Ambient ────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -bottom-20 left-0 h-[400px] w-[500px] rounded-full bg-navy-50/30 blur-[90px]"
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="About Us"
          title={
            <>
              Driven by <span style={{ color: '#08213c38' }}>Visionary Leadership</span>
            </>
          }
          description={LEADERSHIP.subheading}
          descriptionClassName="max-w-none w-full"
        />

        {/* ── Stats row ───────────────────────────────────────────── */}
        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-2 gap-5 rounded-3xl border border-navy-100 bg-white px-5 py-8 shadow-glass sm:grid-cols-4 sm:gap-6 sm:px-10 sm:py-10 3xl:rounded-[2rem] 3xl:px-14 3xl:py-14 4xl:px-18 4xl:py-16"
        >
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} Icon={STAT_ICONS[i % STAT_ICONS.length]} />
          ))}
        </motion.div>

        {/* ── Leadership copy ──────────────────────────────────────── */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-16 flex flex-col gap-5 3xl:mt-20"
        >
          {LEADERSHIP.body.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 28)}
              variants={fadeUp}
              className="w-full max-w-none text-base leading-relaxed text-navy-500 text-pretty sm:text-lg 3xl:text-xl 4xl:text-xl"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* ── Founder quote ────────────────────────────────────────── */}
        <motion.figure
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 grid items-center gap-8 rounded-3xl bg-navy-50/60 p-6 sm:grid-cols-[1.4fr_1fr] sm:gap-10 sm:p-10 3xl:mt-12 3xl:rounded-[2rem] 3xl:p-12"
        >
          <div>
            <Quote
              className="h-7 w-7 text-emerald-500 3xl:h-9 3xl:w-9"
              aria-hidden="true"
            />
            <blockquote className="mt-3 text-xl font-bold leading-snug text-navy-900 text-pretty sm:text-2xl 3xl:text-3xl">
              "{testimonial.quote}"
            </blockquote>
            <figcaption className="mt-4">
              <p className="font-bold text-navy-900 3xl:text-lg">{testimonial.name}</p>
              <p className="italic text-navy-500 3xl:text-base">{testimonial.role}</p>
            </figcaption>
          </div>
          <img
            src="https://i.pravatar.cc/600?img=12"
            alt={testimonial.name}
            className="h-48 w-full rounded-2xl object-cover sm:h-64 3xl:h-72"
            loading="lazy"
          />
        </motion.figure>
      </Container>
    </section>
  );
}
