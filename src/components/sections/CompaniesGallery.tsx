import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { COMPANY_MEDIA } from '@/data/companiesMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Companies Gallery" — a cinematic stage: one large photograph per company
 * crossfades on a rounded stage while the story plays beside it; a filmstrip
 * of thumbnails drives the show. Auto-advances, pauses on engagement.
 */
export function CompaniesGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const company = COMPANIES[active];
  const media = COMPANY_MEDIA[active];
  const Icon = company.icon;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % COMPANIES.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      id="companies-gallery"
      aria-label="Our companies — gallery"
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
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-14 grid items-center gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14"
        >

          {/* ── Story ── */}
          <div className="order-2 lg:order-1 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE_PREMIUM }}
              >
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

                <h3 className="mt-5 text-[clamp(1.6rem,2.8vw,2.4rem)] font-light capitalize leading-[1.1] text-navy-900 text-balance">
                  {company.name}
                </h3>

                <p className="mt-4 max-w-[50ch] text-body-fluid text-navy-500">
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
              </motion.div>
            </AnimatePresence>

            {/* Filmstrip */}
            <div className="mt-8 flex gap-2.5">
              {COMPANIES.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={`Show ${c.name}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  style={i === active ? { boxShadow: `0 0 0 2px ${COMPANY_MEDIA[i].accent}` } : undefined}
                  className={cn(
                    'relative h-12 w-[4.5rem] shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300',
                    i !== active && 'opacity-50 hover:opacity-90',
                  )}
                >
                  <img
                    src={COMPANY_MEDIA[i].photo}
                    alt=""
                    width={1400}
                    height={1050}
                    decoding="async"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Photo stage ── */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem] shadow-glass-lg">
              {COMPANIES.map((c, i) => (
                <img
                  key={c.name}
                  src={COMPANY_MEDIA[i].photo}
                  alt={COMPANY_MEDIA[i].alt}
                  width={1400}
                  height={1050}
                  decoding="async"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-premium',
                    i === active ? 'opacity-100' : 'opacity-0',
                  )}
                />
              ))}
              {/* Caption pill */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-full bg-white/90 py-2 pl-3 pr-5 shadow-glass">
                <span
                  style={{ backgroundColor: media.accent }}
                  className="h-2 w-2 rounded-full"
                  aria-hidden="true"
                />
                <span className="text-[13px] font-semibold text-navy-900">{company.name}</span>
                <span style={{ color: media.accent }} className="text-[11px] font-semibold tracking-[1.5px]">
                  {company.index}/05
                </span>
              </div>
            </div>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
