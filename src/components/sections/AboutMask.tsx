import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LEADERSHIP } from '@/data/content';
import { ABOUT_MEDIA, FOUNDER_PHOTO } from '@/data/aboutMedia';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "About Mask" — photography living inside typography: the words VISIONARY
 * LEADERSHIP are cut from a photograph of the team at work, echoing the
 * hero's video-mask identity. The story flows in two newspaper columns
 * beneath, signed by the founder.
 */
export function AboutMask() {
  const { testimonial } = LEADERSHIP;

  return (
    <section
      id="about-mask"
      aria-label="About us — mask"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container>
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              About Us — Driven by
            </span>
          </motion.div>

          {/* Photo-masked display type */}
          <motion.h2
            variants={fadeUp}
            style={{ backgroundImage: `url(${ABOUT_MEDIA.team.src})` }}
            className="mt-8 select-none bg-cover bg-center bg-clip-text text-center text-[clamp(2.6rem,9.5vw,8.5rem)] font-black uppercase leading-[0.95] tracking-[-0.03em] text-transparent"
          >
            Visionary
            <br />
            Leadership
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-center text-body-fluid font-medium text-navy-600"
          >
            {LEADERSHIP.subheading}
          </motion.p>

          {/* Two-column story */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-12 max-w-5xl gap-12 lg:columns-2 [&>p+p]:mt-6 lg:[&>p+p]:mt-0"
          >
            {LEADERSHIP.body.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 28)}
                className="break-inside-avoid text-[14.5px] leading-[1.9] text-navy-500 text-pretty 3xl:text-base"
              >
                {i === 0 && (
                  <span
                    aria-hidden="true"
                    className="float-left mr-3 mt-1 font-black leading-[0.8] text-emerald-500 text-[3.2em]"
                  >
                    {paragraph.charAt(0)}
                  </span>
                )}
                {i === 0 ? paragraph.slice(1) : paragraph}
              </p>
            ))}
          </motion.div>

          {/* Founder sign-off strip */}
          <motion.figure
            variants={fadeUp}
            className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 border-t border-navy-100 pt-10 text-center"
          >
            <Quote className="h-5 w-5 text-emerald-500" aria-hidden="true" />
            <blockquote className="text-[15px] font-medium leading-relaxed text-navy-800 text-pretty 3xl:text-base">
              "{testimonial.quote}"
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <img
                src={FOUNDER_PHOTO.src}
                alt={FOUNDER_PHOTO.alt}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-20 w-20 rounded-full object-cover ring-4 ring-emerald-50 sm:h-24 sm:w-24 3xl:h-28 3xl:w-28"
              />
              <span className="text-left">
                <span className="block font-['Caveat',cursive] text-xl font-bold leading-none text-navy-900">
                  {testimonial.name}
                </span>
                <span className="mt-1 block text-[12px] text-navy-400">{testimonial.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      </Container>
    </section>
  );
}
