import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { COMPANY_MEDIA } from '@/data/companiesMedia';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Companies Showreel" — the awwwards list-with-image-reveal pattern: an
 * editorial index of names on the left; gliding down the rows crossfades a
 * tall photograph on the sticky right panel. Mobile gets inline thumbnails.
 */
export function CompaniesShowreel() {
  const [active, setActive] = useState(0);
  const activeMedia = COMPANY_MEDIA[active];

  return (
    <section
      id="companies-showreel"
      aria-label="Our companies — showreel"
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
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14"
        >

          {/* ── Index rows ── */}
          <ul className="list-none border-t border-navy-100 lg:col-span-7">
            {COMPANIES.map((company, i) => {
              const Icon = company.icon;
              const media = COMPANY_MEDIA[i];
              const isActive = i === active;
              return (
                <li key={company.name} className="border-b border-navy-100">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group flex w-full cursor-pointer items-center gap-4 py-6 text-left sm:gap-6 lg:py-7"
                  >
                    {/* Mobile thumbnail (sticky panel hidden below lg) */}
                    <span className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg lg:hidden">
                      <img
                        src={media.photo}
                        alt=""
                        width={1400}
                        height={1050}
                        decoding="async"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </span>

                    <span
                      style={isActive ? { color: media.accent } : undefined}
                      className={cn(
                        'hidden w-9 shrink-0 text-[11px] font-semibold tracking-[2px] transition-colors duration-300 sm:block',
                        !isActive && 'text-navy-300',
                      )}
                    >
                      {company.index}
                    </span>

                    <span
                      className={cn(
                        'flex-1 text-[clamp(1.2rem,2.4vw,1.9rem)] font-light capitalize leading-tight transition-colors duration-300',
                        isActive ? 'text-navy-900' : 'text-navy-300 group-hover:text-navy-600',
                      )}
                    >
                      {company.name}
                    </span>

                    <span
                      style={isActive ? { backgroundColor: media.iconBg, color: media.accent } : undefined}
                      className={cn(
                        'grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-300',
                        !isActive && 'text-navy-300',
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </button>

                  {/* Active row unfolds the description */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap items-end justify-between gap-3 pb-6 sm:pl-[3.75rem]">
                          <p className="max-w-[52ch] text-[13.5px] leading-relaxed text-navy-500 3xl:text-sm">
                            {company.description}
                          </p>
                          <a
                            href="#contact"
                            style={{ color: media.accent }}
                            className="group/link inline-flex min-h-[44px] shrink-0 items-center gap-1.5 text-[13px] font-semibold"
                          >
                            Partner with us
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* ── Sticky photo reveal (lg+) ── */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-glass-lg">
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
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-premium',
                      i === active ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                ))}
                <span
                  className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-[12px] font-semibold tracking-[1.5px] shadow-glass"
                  style={{ color: activeMedia.accent }}
                >
                  {COMPANIES[active].index} / 05
                </span>
              </div>
            </div>
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
