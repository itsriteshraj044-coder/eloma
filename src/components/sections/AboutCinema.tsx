import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LEADERSHIP } from '@/data/content';
import { ABOUT_MEDIA, FOUNDER_PHOTO } from '@/data/aboutMedia';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "About Cinema" — a cinematic band: the boardroom photograph drifts in slow
 * parallax behind a floating white story panel, like a film still with its
 * caption. Scroll-linked via Framer useScroll; transform-only animation.
 */
export function AboutCinema() {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  const { testimonial } = LEADERSHIP;

  return (
    <section
      id="about-cinema"
      aria-label="About us — cinema"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            About Us
          </span>
          <h2 className="mt-5 text-[clamp(1.75rem,5vw,2.5rem)] font-normal leading-[1.15] text-navy-900 text-balance">
            Driven by <span className="text-emerald-500">Visionary Leadership</span>
          </h2>
          <p className="mt-3 text-body-fluid font-medium text-navy-600">{LEADERSHIP.subheading}</p>
        </div>

        {/* Cinematic band */}
        <div
          ref={bandRef}
          className="relative mt-14 overflow-hidden rounded-[2rem] shadow-glass-lg lg:mt-20"
        >
          {/* Parallax photograph */}
          <motion.img
            src={ABOUT_MEDIA.boardroom.src}
            alt={ABOUT_MEDIA.boardroom.alt}
            width={1400}
            height={933}
            loading="lazy"
            decoding="async"
            style={{ y: photoY, scale: 1.16 }}
            className="will-transform absolute inset-0 h-full w-full object-cover"
          />
          {/* Soft white veil so the panel breathes */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/30 to-transparent"
          />

          {/* Story panel */}
          <div className="relative grid min-h-[480px] items-center px-5 py-12 sm:px-10 lg:min-h-[560px] lg:px-14">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.8, ease: EASE_PREMIUM }}
              className="max-w-xl rounded-[1.5rem] bg-white/95 p-7 shadow-glass-lg sm:p-9"
            >
              <span aria-hidden="true" className="block h-0.5 w-12 rounded-full bg-emerald-400" />

              {LEADERSHIP.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 28)}
                  className="mt-5 text-[13.5px] leading-[1.85] text-navy-600 text-pretty 3xl:text-sm"
                >
                  {paragraph}
                </p>
              ))}

              <figure className="mt-7 border-t border-navy-100 pt-6">
                <blockquote className="flex gap-3 text-[14px] font-medium leading-relaxed text-navy-900 text-pretty">
                  <Quote className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                  "{testimonial.quote}"
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <img
                    src={FOUNDER_PHOTO.src}
                    alt={FOUNDER_PHOTO.alt}
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-11 w-11 rounded-full object-cover ring-4 ring-emerald-50"
                  />
                  <span>
                    <span className="block font-['Caveat',cursive] text-lg font-bold leading-none text-navy-900">
                      {testimonial.name}
                    </span>
                    <span className="mt-1 block text-[11.5px] text-navy-400">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
