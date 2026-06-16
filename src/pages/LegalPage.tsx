import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { BRAND } from '@/data/content';
import { LEGAL_DOCS, type LegalSlug } from '@/data/legal';

/* ════════════════════════════════════════════════════════════════════════
   LegalPage — shared layout for the Privacy Policy, Terms of Use and
   Modern Slavery Statement. Same light typography system as the rest of the
   site: light-weight headings at homepage sizes, hairline rules, single
   emerald accent. Content comes from src/data/legal.ts.
   ════════════════════════════════════════════════════════════════════════ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-emerald-400 to-emerald-500"
    />
  );
}

export default function LegalPage({ doc: slug }: { doc: LegalSlug }) {
  const doc = LEGAL_DOCS[slug];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <main className={cn('overflow-x-clip')}>
      <ScrollProgress />

      {/* Hero */}
      <section
        aria-label={doc.title}
        className="relative isolate overflow-hidden bg-white pb-[clamp(1.5rem,3vw,2.5rem)] pt-[clamp(7rem,12vw,11rem)]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh-light" />
          <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_60%)]" />
        </div>

        <Container>
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Link
                to="/"
                className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-500 transition-colors duration-300 hover:text-emerald-600"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Back to home
              </Link>
            </motion.div>

            <motion.span variants={fadeUp} className="eyebrow mt-7">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {doc.eyebrow}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-[clamp(2rem,5.4vw,3.4rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
            >
              {doc.title}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 text-[13px] font-semibold uppercase tracking-[1.5px] text-navy-400">
              Last updated · {doc.updated}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Body */}
      <section aria-label={`${doc.title} content`} className="section-py bg-white">
        <Container>
          <div className="max-w-3xl">
            {/* Intro */}
            <motion.div
              variants={staggerParent(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="border-l-2 border-emerald-200 pl-6"
            >
              {doc.intro.map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-600 text-pretty [&:not(:first-child)]:mt-4"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Sections */}
            <div className="mt-12 flex flex-col gap-10 sm:mt-14 sm:gap-12">
              {doc.blocks.map((block, i) => (
                <motion.section
                  key={i}
                  variants={staggerParent(0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                >
                  {block.heading && (
                    <motion.h2
                      variants={fadeUp}
                      className="flex items-baseline gap-3 text-[clamp(1.25rem,2vw,1.6rem)] font-normal capitalize leading-tight text-navy-900"
                    >
                      <span className="text-[clamp(0.85rem,1vw,1rem)] font-semibold tabular-nums text-emerald-400">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {block.heading}
                    </motion.h2>
                  )}

                  {block.paragraphs?.map((para, j) => (
                    <motion.p
                      key={j}
                      variants={fadeUp}
                      className="mt-4 text-[clamp(0.95rem,1.15vw,1.08rem)] leading-[1.85] text-navy-500 text-pretty"
                    >
                      {para}
                    </motion.p>
                  ))}

                  {block.list && (
                    <motion.ul variants={fadeUp} className="mt-5 flex flex-col gap-3">
                      {block.list.map((item, k) => (
                        <li key={k} className="flex gap-3 text-[clamp(0.95rem,1.15vw,1.08rem)] leading-[1.8] text-navy-500">
                          <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                          <span className="text-pretty">{item}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </motion.section>
              ))}
            </div>

            {/* Contact footer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.6 }}
              className="mt-14 border-t border-navy-100 pt-8"
            >
              <a
                href={`mailto:${BRAND.email}`}
                className="group inline-flex items-center gap-2 text-[14px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
              >
                <Mail className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                {BRAND.email}
              </a>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
