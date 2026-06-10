import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { LEADERSHIP } from '@/data/content';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/** "Driven by Visionary Leadership" + founder testimonial (light theme). */
export function Leadership() {
  const { testimonial } = LEADERSHIP;

  return (
    <section
      id="leadership"
      aria-label="Leadership"
      className="section-py bg-white"
    >

      <Container className="grid items-center gap-12 xl:grid-cols-12 xl:gap-14 3xl:gap-20 4xl:gap-28">
        {/* Copy */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="xl:col-span-7"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Leadership
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-section-h2 uppercase text-navy-900 text-balance"
          >
            {LEADERSHIP.heading}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-body-fluid font-semibold text-emerald-600"
          >
            {LEADERSHIP.subheading}
          </motion.p>

          <div className="mt-6 space-y-5 3xl:mt-8 3xl:space-y-6 4xl:space-y-8">
            {LEADERSHIP.body.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                variants={fadeUp}
                className="max-w-2xl text-body-fluid text-navy-500"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Card */}
        <motion.figure
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative xl:col-span-5"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-6 shadow-glass-lg sm:p-10 3xl:rounded-[3rem] 3xl:p-12 4xl:p-16 5xl:p-20">
            <Quote
              className="h-10 w-10 text-emerald-500 3xl:h-14 3xl:w-14 4xl:h-16 4xl:w-16 5xl:h-20 5xl:w-20"
              aria-hidden="true"
            />

            <blockquote className="relative mt-6 text-card-heading font-medium normal-case leading-snug text-navy-800 text-pretty">
              "{testimonial.quote}"
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-4 border-t border-navy-100 pt-5 sm:mt-8 sm:pt-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-meta-value font-bold text-white 3xl:h-16 3xl:w-16 4xl:h-20 4xl:w-20 5xl:h-24 5xl:w-24">
                {testimonial.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')}
              </span>

              <div>
                <p className="text-meta-value font-semibold text-navy-900">
                  {testimonial.name}
                </p>
                <p className="text-body-fluid text-navy-500">
                  {testimonial.role}
                </p>
              </div>
            </figcaption>
          </div>
        </motion.figure>
      </Container>
    </section>
  );
}