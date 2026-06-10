import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EXPERIENCE } from '@/data/content';
import { fadeUp, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Experience Eloma" — a wide cinematic media panel with a gentle parallax.
 * Doubles as the `#about` anchor (group introduction).
 */
export function ExperienceEloma() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="about" aria-label="Experience Eloma" className="section-py bg-white">
      <Container className="relative">
        <SectionHeading eyebrow="Experience Eloma" title={EXPERIENCE.title} description={EXPERIENCE.subtitle} />

        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative mt-14 overflow-hidden rounded-[2rem] border border-navy-100 shadow-premium 3xl:rounded-[3rem] 4xl:rounded-[4rem]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[16/8] 3xl:aspect-[21/9]">
            <motion.video
              style={{ y }}
              className="absolute inset-0 h-[112%] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              width={1920}
              height={1080}
              aria-hidden="true"
            >
              <source src={EXPERIENCE.videoSrc} type="video/mp4" />
            </motion.video>
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(8,33,60,0.55)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

            {/* Play affordance + caption */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center sm:gap-5">
              <motion.button
                type="button"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Play the Eloma story"
                className="grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md sm:h-20 sm:w-20 3xl:h-28 3xl:w-28 4xl:h-36 4xl:w-36 5xl:h-44 5xl:w-44"
              >
                <span className="absolute inset-0 animate-pulse-glow rounded-full bg-emerald-400/30 blur-xl" />
                <Play className="relative h-5 w-5 translate-x-0.5 fill-white sm:h-7 sm:w-7 3xl:h-10 3xl:w-10 4xl:h-12 4xl:w-12 5xl:h-14 5xl:w-14" aria-hidden="true" />
              </motion.button>
              <p className="max-w-md text-base font-medium text-white text-balance sm:text-lg 3xl:text-2xl 3xl:max-w-xl 4xl:text-3xl 4xl:max-w-2xl 5xl:text-4xl 5xl:max-w-3xl">
                One root, branching into worlds.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
