import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { COMPANY_MEDIA } from '@/data/companiesMedia';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Company } from '@/types';

/**
 * "Companies Postcards" — five photographic cards: each company's world in a
 * real image, an icon medallion bridging photo and copy, clean white body.
 * Photo zooms a breath on hover; everything else stays put.
 */
function Postcard({ company, index }: { company: Company; index: number }) {
  const Icon = company.icon;
  const media = COMPANY_MEDIA[index];

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } } }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[1.25rem] border border-navy-100 bg-white shadow-glass transition-shadow duration-300 hover:shadow-glass-lg"
    >
      {/* Photo */}
      <div className="relative h-40 overflow-hidden sm:h-44">
        <img
          src={media.photo}
          alt={media.alt}
          width={1400}
          height={1050}
          decoding="async"
          loading="lazy"
          className="will-transform h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-[1.5px] text-navy-700">
          {company.index}
        </span>
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col px-5 pb-5">
        {/* Medallion bridging photo and copy */}
        <span
          style={{ backgroundColor: media.iconBg, color: media.accent }}
          className="relative z-10 -mt-6 grid h-12 w-12 place-items-center rounded-xl ring-4 ring-white transition-transform duration-400 ease-premium group-hover:scale-110"
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>

        <h3 className="mt-3.5 text-[15px] font-semibold capitalize leading-snug text-navy-900 3xl:text-base">
          {company.name}
        </h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-navy-500 3xl:text-[13px]">
          {company.description}
        </p>

        <a
          href="#contact"
          style={{ color: media.accent }}
          className="group/link mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-4 text-[12.5px] font-semibold"
        >
          Partner with us
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </motion.article>
  );
}

export function CompaniesPostcards() {
  return (
    <section
      id="companies-postcards"
      aria-label="Our companies — postcards"
      className="section-py relative overflow-hidden bg-white"
    >
      <Container>
        <SectionHeading
          eyebrow="Our Companies"
          title={
            <span>
              One group, <span className="text-navy">Five companies,</span>{' '}
              <span className="text-emerald-500">Our vision.</span>
            </span>
          }
          titleClassName="font-normal normal-case !text-[clamp(1.75rem,5vw,2.5rem)]"
          description={COMPANIES_SECTION.subheading}
        />

        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 xl:grid-cols-5"
        >
          {COMPANIES.map((company, i) => (
            <Postcard key={company.name} company={company} index={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
