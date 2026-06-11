import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { COMPANY_MEDIA } from '@/data/companiesMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Company } from '@/types';

/** 6×6 vector dot matrix — the accent ornament tucked behind each photo. */
function DotMatrix({ color, className }: { color: string; className?: string }) {
  const dots = [];
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={6 + c * 18} cy={6 + r * 18} r={2.5} />);
    }
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 102 102"
      style={{ color }}
      className={cn('pointer-events-none absolute fill-current opacity-30', className)}
    >
      {dots}
    </svg>
  );
}

/**
 * "Companies Panorama" — magazine feature bands: each company pairs a real
 * photograph (with a vector dot ornament peeking out behind it) against
 * editorial copy, alternating sides down the page. Hairline rules, light only.
 */
function PanoramaBand({ company, index }: { company: Company; index: number }) {
  const Icon = company.icon;
  const media = COMPANY_MEDIA[index];
  const flip = index % 2 === 1;

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 44 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_PREMIUM } } }}
      className="grid items-center gap-8 border-t border-navy-100 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16"
    >
      {/* Photo with vector ornament */}
      <div className={cn('group relative lg:col-span-5', flip && 'lg:order-2')}>
        <DotMatrix
          color={media.accent}
          className={cn('h-24 w-24', flip ? '-right-5 -top-5' : '-left-5 -top-5')}
        />
        <div className="relative z-10 aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-glass">
          <img
            src={media.photo}
            alt={media.alt}
            width={1400}
            height={1050}
            decoding="async"
            loading="lazy"
            className="will-transform h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          />
        </div>
        {/* Index plate overlapping the photo's lower corner */}
        <span
          className={cn(
            'absolute -bottom-4 z-20 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold tracking-[1.5px] shadow-glass',
            flip ? 'right-6' : 'left-6',
          )}
          style={{ color: media.accent }}
        >
          {company.index}
        </span>
      </div>

      {/* Editorial copy */}
      <div className={cn('lg:col-span-7', flip && 'lg:order-1')}>
        <div className="flex items-center gap-3">
          <span
            style={{ backgroundColor: media.iconBg, color: media.accent }}
            className="grid h-11 w-11 place-items-center rounded-xl"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span
            style={{ color: media.accent }}
            className="text-[11px] font-semibold uppercase tracking-[2.5px]"
          >
            Company {company.index}
          </span>
        </div>

        <h3 className="mt-4 text-[clamp(1.5rem,2.6vw,2.2rem)] font-light capitalize leading-[1.12] text-navy-900 text-balance">
          {company.name}
        </h3>

        <p className="mt-3.5 max-w-[56ch] text-body-fluid text-navy-500">
          {company.description}
        </p>

        <a
          href="#contact"
          style={{ color: media.accent }}
          className="group mt-5 inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-semibold"
        >
          Partner with us
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </motion.article>
  );
}

export function CompaniesPanorama() {
  return (
    <section
      id="companies-panorama"
      aria-label="Our companies — panorama"
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
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 lg:mt-14"
        >
          {COMPANIES.map((company, i) => (
            <PanoramaBand key={company.name} company={company} index={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
