import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Our Companies" — second section, redesigned as a premium interactive
 * "index ledger".
 *
 * Inspired by the bold, editorial showcase pattern used on modern Australian
 * freight / digital-agency sites (bivry.com.au, egdigital.com.au): oversized
 * uppercase row names, a single emerald accent, and full-width rows that expand
 * on hover to reveal each company's detail beside a topical photograph of the
 * branch (icon chip + ghosted index numeral overlaid).
 *
 * Same content as the other variants — eyebrow, title, subheading, the five EG
 * companies with Branch label / icon / copy / "Partner with us" link, and the
 * closing CTA. Auto-advances; hover or click selects. Reduced-motion users get a
 * clean static grid.
 */

const N = COMPANIES.length;
const AUTOPLAY_MS = 4800;

/* One topical photo per branch (downloaded to /public/companies). */
const IMAGES: Record<string, string> = {
  'EG Digital Australia': '/companies/digital.jpg',
  'EG Foundations': '/companies/foundations.jpg',
  'EG Imports': '/companies/imports.jpg',
  'EG Transport': '/companies/transport.jpg',
  'EG Travels': '/companies/travels.jpg',
};

/* Static, dependency-free grid for reduced-motion users. */
function StaticGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
      {COMPANIES.map((company, i) => {
        const isEmerald = i % 2 === 1;
        const Icon = company.icon;
        return (
          <div key={company.name} className={cn(i < 2 ? 'lg:col-span-3' : 'lg:col-span-2')}>
            <span
              className={cn(
                'block h-[2px] w-full rounded-full bg-gradient-to-r',
                isEmerald ? 'from-emerald-300 to-transparent' : 'from-navy-200 to-transparent',
              )}
            />
            <div className="flex items-start justify-between pt-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy-300">
                Branch {company.index}
              </span>
              <span
                className={cn(
                  'grid h-12 w-12 place-items-center rounded-2xl text-white shadow-glass',
                  isEmerald ? 'bg-emerald-500' : 'bg-navy-600',
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            <h3 className="mt-4 text-xl font-semibold capitalize text-navy-900">{company.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-navy-500">{company.description}</p>
            <a
              href="#contact"
              style={{ color: '#0B2B4F' }}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium"
            >
              Partner with us <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export function Companies3D() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ledgerRef, { margin: '150px' });
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  // Auto-advance — pauses on hover / interaction or while off-screen.
  useEffect(() => {
    if (reduce || !onScreen) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, onScreen]);

  // Subtle parallax for the giant background numeral.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="companies-3d"
      aria-label="Our companies"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Ambient depth */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-light" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      {/* Giant ghosted index numeral, drifting on scroll */}
      <motion.span
        aria-hidden="true"
        style={{ y: ghostY }}
        className="pointer-events-none absolute -right-[2vw] top-[34%] select-none text-[34vw] font-black leading-none tracking-[-0.06em] text-navy-900/[0.025] lg:text-[24vw]"
      >
        {COMPANIES[active].index}
      </motion.span>

      <Container className="relative">
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

        {reduce ? (
          <StaticGrid />
        ) : (
          <div
            ref={ledgerRef}
            onMouseLeave={() => (pausedRef.current = false)}
            className="mt-10 border-t border-navy-100 lg:mt-16"
          >
            {COMPANIES.map((company, i) => {
              const isActive = i === active;
              const isEmerald = i % 2 === 1;
              const Icon = company.icon;
              return (
                <div
                  key={company.name}
                  onMouseEnter={() => {
                    setActive(i);
                    pausedRef.current = true;
                  }}
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  className="group/row relative border-b border-navy-100"
                >
                  {/* Sliding accent rail */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute left-0 top-0 h-full w-[3px] origin-top rounded-full bg-gradient-to-b transition-transform duration-500 ease-premium',
                      isActive ? 'scale-y-100' : 'scale-y-0',
                      isEmerald ? 'from-emerald-400 to-emerald-200' : 'from-navy-600 to-navy-300',
                    )}
                  />

                  {/* Row header */}
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center gap-5 py-6 pl-5 pr-2 text-left sm:gap-8 sm:py-7 lg:py-8"
                  >
                    <span
                      className={cn(
                        'shrink-0 text-[clamp(0.75rem,1vw,0.875rem)] font-bold tabular-nums tracking-[0.2em] transition-colors duration-300',
                        isActive ? 'text-emerald-500' : 'text-navy-300',
                      )}
                    >
                      {company.index}
                    </span>
                    <h3
                      className={cn(
                        'flex-1 text-[clamp(1.35rem,4vw,2.75rem)] font-semibold capitalize leading-[1.05] tracking-[-0.03em] transition-colors duration-300',
                        isActive ? 'text-navy-900' : 'text-navy-400 group-hover/row:text-navy-700',
                      )}
                    >
                      {company.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-premium 3xl:h-12 3xl:w-12',
                        isActive
                          ? 'rotate-45 border-transparent bg-navy-900 text-white'
                          : 'border-navy-100 bg-white/70 text-navy-400 group-hover/row:border-navy-200',
                      )}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </button>

                  {/* Expanding detail */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                        className="overflow-hidden"
                      >
                        <div className="grid items-center gap-6 pb-8 pl-5 pr-2 sm:gap-10 lg:grid-cols-[1.4fr_1fr] lg:pb-10">
                          {/* Copy + CTA */}
                          <div className="order-2 lg:order-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy-300 3xl:text-xs">
                              Branch {company.index}
                            </span>
                            <p className="mt-3 max-w-xl text-[clamp(0.95rem,1.25vw,1.1875rem)] leading-relaxed text-navy-500 text-pretty">
                              {company.description}
                            </p>
                            <a
                              href="#contact"
                              style={{ color: '#0B2B4F' }}
                              className="group/link mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium 3xl:text-base"
                            >
                              Partner with us
                              <ArrowUpRight
                                className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 3xl:h-5 3xl:w-5"
                                aria-hidden="true"
                              />
                            </a>
                          </div>

                          {/* Branch photo tile */}
                          <div className="order-1 lg:order-2">
                            <div className="group/media relative flex h-[clamp(9rem,17vw,13rem)] items-end overflow-hidden rounded-3xl text-white shadow-glass">
                              <img
                                src={IMAGES[company.name]}
                                alt={`${company.name} — ${company.description}`}
                                width={1400}
                                height={933}
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover/media:scale-[1.06]"
                              />
                              {/* Scrim */}
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/75 via-navy-900/15 to-navy-900/5"
                              />
                              {/* Icon chip */}
                              <span
                                className={cn(
                                  'relative m-6 grid h-12 w-12 place-items-center rounded-2xl ring-1 ring-inset ring-white/25 backdrop-blur-sm 3xl:h-14 3xl:w-14',
                                  isEmerald ? 'bg-emerald-500/85' : 'bg-navy-700/65',
                                )}
                              >
                                <Icon className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="mt-14 flex justify-center sm:mt-16 lg:mt-20"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-normal text-white shadow-glow-emerald transition-transform duration-300 ease-premium hover:scale-[1.04] active:scale-[0.98] 3xl:px-8 3xl:py-4 3xl:text-base"
          >
            <Sparkles
              className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:rotate-90 3xl:h-5 3xl:w-5"
              aria-hidden="true"
            />
            One shared vision
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
