import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Company } from '@/types';

function CompanyRow({ company }: { company: Company }) {
  const Icon = company.icon;
  return (
    <motion.a
      href="#contact"
      variants={fadeUp}
      whileHover={{ x: 6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center gap-5 rounded-3xl border border-navy-100 bg-white p-5 shadow-glass transition-all duration-300 hover:border-emerald-200 hover:shadow-glass-lg sm:p-6 3xl:rounded-[2rem] 3xl:gap-6 3xl:p-8 4xl:gap-8 4xl:p-10"
    >
      {/* Index */}
      <span className="shrink-0 text-sm font-bold tracking-widest text-emerald-500 3xl:text-base">
        {company.index}
      </span>

      {/* Icon */}
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-800 transition-all duration-300 group-hover:bg-navy-800 group-hover:text-emerald-400 3xl:h-14 3xl:w-14 3xl:rounded-2xl 4xl:h-16 4xl:w-16">
        <Icon className="h-6 w-6 3xl:h-7 3xl:w-7 4xl:h-8 4xl:w-8" aria-hidden="true" />
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold text-navy-900 sm:text-lg xl:text-xl 3xl:text-xl 4xl:text-2xl">
          {company.name}
        </h3>
        <p className="mt-0.5 text-body-fluid text-navy-500">
          {company.description}
        </p>
      </div>

      {/* Verified badge */}
      <div className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
        <CheckCircle2
          className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110 3xl:h-5 3xl:w-5"
          aria-hidden="true"
        />
        <span className="text-eyebrow-fluid uppercase text-navy-300">
          Verified
        </span>
      </div>

      <ArrowRight
        className="hidden h-5 w-5 shrink-0 text-navy-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-emerald-500 md:block 3xl:h-6 3xl:w-6"
        aria-hidden="true"
      />
    </motion.a>
  );
}

export function Companies() {
  return (
    <section
      id="companies"
      aria-label="Our companies"
      className="section-py relative bg-white"
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-20"
        aria-hidden="true"
      />

      <Container className="relative grid gap-10 xl:grid-cols-12 xl:gap-14 3xl:gap-20 4xl:gap-28">
        {/* ── Left: sticky heading ── */}
        <div className="xl:col-span-5">
          <div className="xl:sticky xl:top-24 3xl:top-28">
            <SectionHeading
              align="left"
              eyebrow="Our Companies"
              title={
                <span className="italic">
                  One Group, <span style={{ color: '#08213c38' }}>Five Companies,</span>{' '}
                  <span className="text-emerald-500">Our Vision.</span>
                </span>
              }
              description={COMPANIES_SECTION.subheading}
            />
          </div>
        </div>

        {/* ── Right: scrolling company rows ── */}
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col gap-4 xl:col-span-7 3xl:gap-5 4xl:gap-6"
        >
          {COMPANIES.map((company) => (
            <CompanyRow key={company.name} company={company} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
