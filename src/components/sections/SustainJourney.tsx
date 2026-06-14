import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PILLARS, SUSTAINABILITY } from '@/data/content';
import { PILLAR_MEDIA } from '@/data/sustainabilityMedia';
import { cn } from '@/lib/cn';

const N = PILLARS.length;
const SEG = 1 / N;

interface ChapterProps {
  progress: MotionValue<number>;
  index: number;
}

/** One photograph's life on the stage: emerge, settle, recede. */
function ChapterImage({ progress, index }: ChapterProps) {
  const a = index * SEG;
  const b = a + SEG;
  const first = index === 0;
  const last = index === N - 1;

  const opacity = useTransform(
    progress,
    first ? [0, 0.0001, b - 0.03, b + 0.03] : [a - 0.03, a + 0.03, b - 0.03, b + 0.03],
    last ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  // A slow settle while on stage, a gentle push back while leaving.
  const scale = useTransform(progress, [a - 0.03, b + 0.03], [1.14, 0.99]);

  return (
    <motion.div
      style={{ opacity, scale, willChange: 'transform, opacity' }}
      className="absolute inset-0"
    >
      <img
        src={PILLAR_MEDIA[index].src}
        alt={PILLAR_MEDIA[index].alt}
        width={1400}
        height={1050}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/15 to-navy-950/20"
        aria-hidden="true"
      />
    </motion.div>
  );
}

/** The chapter's words: masked title sweep, copy drifting in parallax. */
function ChapterText({ progress, index }: ChapterProps) {
  const pillar = PILLARS[index];
  const a = index * SEG;
  const b = a + SEG;
  const first = index === 0;
  const last = index === N - 1;

  const opacity = useTransform(
    progress,
    first ? [0, 0.02, b - 0.07, b - 0.01] : [a + 0.02, a + 0.08, b - 0.07, b - 0.01],
    last ? [0, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [a, a + SEG * 0.4, b],
    last ? [70, 0, 0] : [70, 0, -56],
  );
  // The title rises out of its own baseline — a scrubbed line-mask reveal.
  const titleY = useTransform(
    progress,
    first ? [0, 0.055] : [a + 0.015, a + 0.085],
    ['112%', '0%'],
  );

  return (
    <motion.div
      style={{ opacity, y, willChange: 'transform, opacity' }}
      className="absolute inset-x-0 bottom-[16vh] px-[clamp(24px,4vw,64px)] sm:bottom-[15vh] lg:px-[clamp(40px,6vw,120px)]"
    >
      <p className="text-eyebrow-fluid uppercase tracking-[3.5px] text-emerald-300">
        {pillar.subtitle}
      </p>
      <div className="mt-3 overflow-hidden pb-1">
        <motion.h3
          style={{ y: titleY, willChange: 'transform' }}
          className="text-[clamp(2.4rem,5vw,4.6rem)] font-light leading-[1.05] tracking-[-0.015em] text-white"
        >
          {pillar.title}
        </motion.h3>
      </div>
      <p className="mt-5 max-w-xl text-body-fluid text-white/85">{pillar.description}</p>
    </motion.div>
  );
}

/**
 * "Journey" — one pinned, scroll-scrubbed film. The viewport holds while
 * four scenes pass: each photograph emerges through a luminous white wash,
 * settles, and recedes; titles rise through a baseline mask; the words at
 * the foot mark the chapters and jump on request. Every movement is bound
 * to the scrollbar — play it forward, play it back.
 */
export function SustainJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(N - 1, Math.floor(v * N));
    setActive((prev) => (prev === next ? prev : next));
  });

  // The luminous wash — a breath of light at each scene change.
  const wash = useTransform(
    scrollYProgress,
    [0.22, 0.25, 0.28, 0.47, 0.5, 0.53, 0.72, 0.75, 0.78],
    [0, 0.85, 0, 0, 0.85, 0, 0, 0.85, 0],
  );

  const jumpTo = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + travel * (i / N) + travel * 0.04;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section
      id="sustain-journey"
      aria-label="Why we exist — journey"
      className="relative overflow-hidden bg-white pt-[clamp(32px,5vw,88px)]"
    >
      <Container>
        <SectionHeading
          eyebrow="Why We Exist"
          title={
            <>
              Committed to Sustainable Growth
              <br />
              <span className="text-emerald-500">and Responsible Business</span>
            </>
          }
          titleClassName="normal-case font-normal tracking-normal"
          description={SUSTAINABILITY.body}
        />
      </Container>

      <div ref={wrapRef} className="relative mt-10 h-[420vh] lg:mt-14">
        <div className="sticky top-0 h-screen overflow-hidden">
          {PILLARS.map((_, i) => (
            <ChapterImage key={PILLARS[i].title} progress={scrollYProgress} index={i} />
          ))}

          {/* The wash of light between scenes */}
          <motion.div
            style={{ opacity: wash }}
            className="pointer-events-none absolute inset-0 bg-white"
            aria-hidden="true"
          />

          {PILLARS.map((_, i) => (
            <ChapterText key={PILLARS[i].title} progress={scrollYProgress} index={i} />
          ))}

          {/* Overall progress — a quiet thread on the right */}
          <div
            className="absolute right-[clamp(20px,3vw,48px)] top-1/2 hidden h-44 w-px -translate-y-1/2 bg-white/25 md:block"
            aria-hidden="true"
          >
            <motion.span
              style={{ scaleY: scrollYProgress, willChange: 'transform' }}
              className="block h-full w-full origin-top bg-emerald-400"
            />
          </div>

          {/* Chapter words */}
          <div className="absolute inset-x-0 bottom-4 flex justify-center px-4 sm:bottom-7">
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 sm:gap-x-3">
              {PILLARS.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-pressed={i === active}
                  className="group relative px-2.5 py-2.5 sm:px-4"
                >
                  <span
                    className={cn(
                      'text-[clamp(0.78rem,0.95vw,1rem)] font-medium tracking-wide transition-colors duration-500',
                      i === active ? 'text-white' : 'text-white/50 hover:text-white/80',
                    )}
                  >
                    {p.title}
                  </span>
                  <span
                    className={cn(
                      'absolute inset-x-2.5 bottom-0.5 h-px origin-left bg-emerald-400 transition-transform duration-700 ease-premium sm:inset-x-4',
                      i === active ? 'scale-x-100' : 'scale-x-0',
                    )}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
