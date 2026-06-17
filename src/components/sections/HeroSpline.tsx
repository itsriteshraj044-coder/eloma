import { motion } from 'framer-motion';
import { SplineScene } from '@/components/ui/splite';
import { useVideoTextCanvas } from '@/components/sections/Hero';

/**
 * Duplicate hero variant placed directly below the primary wordmark hero.
 *
 * A calm, editorial split on pure white: the wordmark column (Experience /
 * Eloma video-text canvas / Group) sits left with generous whitespace and a
 * hairline rule, the interactive Spline model rests right as a quiet
 * centerpiece. Restrained, premium motion only. The text, canvas and model
 * themselves are unchanged.
 */
export function HeroSpline() {
  const elomaCanvasRef = useVideoTextCanvas('Eloma', 0.18, '/golden.mp4');

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
  };
  const rise = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      aria-label="Eloma Group hero"
      className="relative w-full overflow-x-hidden bg-white"
    >
      <div className="mx-auto grid min-h-screen w-full max-w-[1760px] grid-cols-1 items-center gap-[clamp(2rem,5vw,4rem)] px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2rem,5vw,4rem)] lg:grid-cols-[0.9fr_1.1fr]">
        {/* — Left: editorial wordmark column — */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Experience — quiet eyebrow */}
          <motion.p
            variants={rise}
            className="will-change-transform select-none text-[clamp(1.25rem,3.5vw,1.75rem)] font-extralight normal-case leading-[1.15] text-navy-900"
          >
            Experience
          </motion.p>

          {/* hairline accent that draws in */}
          <motion.span
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="will-change-transform my-[clamp(0.9rem,2vw,1.4rem)] h-px w-[clamp(56px,8vw,120px)] origin-left bg-gradient-to-r from-emerald-400 to-transparent"
          />

          {/* Eloma video-text canvas */}
          <motion.div
            variants={rise}
            className="will-change-transform aspect-[5/1] w-full max-w-[1400px] lg:w-[132%]"
          >
            <canvas ref={elomaCanvasRef} aria-hidden="true" className="h-full w-full" />
          </motion.div>

          {/* Group */}
          <motion.p
            variants={rise}
            className="will-change-transform mt-[clamp(0.6rem,1.6vw,1.1rem)] select-none text-[clamp(1.25rem,3.5vw,1.75rem)] font-extralight normal-case leading-[1.15] text-navy-900"
          >
            Group
          </motion.p>
        </motion.div>

        {/* — Right: Spline model centerpiece — */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[clamp(540px,90vh,1100px)] items-center justify-center lg:w-[115%] lg:translate-x-[clamp(1rem,4vw,5rem)]"
        >
          {/* static model (no float) */}
          <div className="relative h-full w-full scale-[1.35] lg:scale-[1.55]">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
          </div>

          {/* faint contact shadow grounding the model */}
          <div className="pointer-events-none absolute bottom-[7%] left-1/2 h-[5%] w-[48%] -translate-x-1/2 rounded-[50%] bg-navy-900/10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
