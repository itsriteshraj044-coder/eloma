import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { LEADERSHIP } from '@/data/content';
import { FOUNDER_PHOTO } from '@/data/aboutMedia';

/** One word that illuminates as the reading zone passes over it. */
function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="will-transform">
      {word}{' '}
    </motion.span>
  );
}

/**
 * "About Kinetic" — the Linear/Apple scroll scrub: the leadership story is set
 * as one continuous large statement whose words light up one by one, driven
 * frame-by-frame by scroll. Scroll back and they dim again. The founder signs
 * off at the end.
 */
export function AboutKinetic() {
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.8', 'end 0.45'],
  });

  const { testimonial } = LEADERSHIP;
  const words = LEADERSHIP.body.join(' ').split(' ');

  return (
    <section
      id="about-kinetic"
      aria-label="About us — kinetic"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container>
        <div className="mx-auto max-w-5xl">
          <span className="eyebrow w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            About Us
          </span>

          <h2 className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal leading-[1.15] text-navy-900 text-balance">
            Driven by <span className="text-emerald-500">Visionary Leadership</span>
          </h2>
          <p className="mt-3 text-body-fluid font-medium text-navy-600">{LEADERSHIP.subheading}</p>

          {/* Scroll-scrubbed story */}
          <div ref={textRef} className="mt-12 lg:mt-16">
            <p className="text-[clamp(1.25rem,2.4vw,2rem)] font-light leading-[1.55] text-navy-900">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = (i + 1) / words.length;
                return (
                  <Word
                    key={`${word}-${i}`}
                    word={word}
                    progress={scrollYProgress}
                    range={[start, end]}
                  />
                );
              })}
            </p>
          </div>

          {/* Founder sign-off */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex items-center gap-5 border-t border-navy-100 pt-10"
          >
            <img
              src={FOUNDER_PHOTO.src}
              alt={FOUNDER_PHOTO.alt}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-emerald-50"
            />
            <div className="min-w-0">
              <blockquote className="max-w-[64ch] text-[14px] font-medium leading-relaxed text-navy-600 text-pretty 3xl:text-[15px]">
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-2.5 flex items-baseline gap-2.5">
                <span className="font-['Caveat',cursive] text-xl font-bold text-navy-900">
                  {testimonial.name}
                </span>
                <span className="text-[12px] text-navy-400">— {testimonial.role}</span>
              </figcaption>
            </div>
          </motion.figure>
        </div>
      </Container>
    </section>
  );
}
