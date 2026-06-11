import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { COMPANY_MEDIA } from '@/data/companiesMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Company } from '@/types';

/** Mosaic spans — one tall hero, a wide tile, two squares, a full-width closer. */
const MOSAIC_SPANS = [
  'sm:col-span-2 sm:row-span-2', // 01 hero
  'sm:col-span-2',               // 02 wide
  'sm:col-span-1',               // 03 square
  'sm:col-span-1',               // 04 square
  'sm:col-span-4',               // 05 full-width
];

/**
 * "Companies Mosaic" — a photographic collage: real imagery fills an
 * asymmetric grid, each tile captioned by a floating white glass plate.
 * The hero tile carries the full story; photos breathe on hover.
 */
function MosaicTile({ company, index }: { company: Company; index: number }) {
  const Icon = company.icon;
  const media = COMPANY_MEDIA[index];
  const isHero = index === 0;

  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 36, scale: 0.97 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE_PREMIUM } } }}
      className={cn(
        'group relative min-h-[180px] cursor-pointer overflow-hidden rounded-[1.5rem] shadow-glass transition-shadow duration-300 hover:shadow-glass-lg',
        MOSAIC_SPANS[index] ?? '',
      )}
    >
      <img
        src={media.photo}
        alt={media.alt}
        width={1400}
        height={1050}
        decoding="async"
        loading="lazy"
        className="will-transform absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
      />

      {/* Glass caption plate */}
      <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
        <div className="inline-flex max-w-full flex-col rounded-2xl bg-white/90 p-4 shadow-glass sm:p-5">
          <div className="flex items-center gap-3">
            <span
              style={{ backgroundColor: media.iconBg, color: media.accent }}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p style={{ color: media.accent }} className="text-[9.5px] font-semibold uppercase tracking-[2px]">
                Company {company.index}
              </p>
              <h3 className="truncate text-[14.5px] font-semibold capitalize leading-snug text-navy-900">
                {company.name}
              </h3>
            </div>
            <ArrowUpRight
              style={{ color: media.accent }}
              className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
          {/* Full story on the hero tile only — other tiles stay visual */}
          {isHero && (
            <p className="mt-3 max-w-[44ch] text-[13px] leading-relaxed text-navy-600">
              {company.description}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function CompaniesMosaic() {
  return (
    <section
      id="companies-mosaic"
      aria-label="Our companies — mosaic"
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
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-4 lg:mt-20 lg:auto-rows-[210px] 3xl:gap-5"
        >
          {COMPANIES.map((company, i) => (
            <MosaicTile key={company.name} company={company} index={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
