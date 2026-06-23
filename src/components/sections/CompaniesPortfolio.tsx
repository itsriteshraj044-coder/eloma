import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Our Companies" — third section, a portfolio showcase.
 *
 * Inspired by the "featured work + index rail" layout common to premium digital
 * studios (egdigital.com.au) and logistics brands (bivry.com.au): one large
 * cinematic preview of the selected branch (crossfade + slow Ken-Burns) sits
 * beside a vertical rail of image thumbnails. Hover, focus, click, or let it
 * auto-advance to browse the group's five companies like a portfolio.
 *
 * Same content as the other variants — the five EG companies with Branch label
 * / icon / copy / "Partner with us" link, one topical photo each. Transform /
 * opacity only; reduced-motion users get a static image grid.
 */

const N = COMPANIES.length;
const AUTOPLAY_MS = 6000;

/* One topical photo per branch (downloaded to /public/companies). */
const IMAGES: Record<string, string> = {
  'EG Digital Australia': '/companies/digital.jpg',
  'EG Foundations': '/companies/foundations.jpg',
  'EG Imports': '/companies/imports.jpg',
  'EG Transport': '/companies/transport.jpg',
  'EG Travels': '/companies/travels.jpg',
};

function StaticGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {COMPANIES.map((company) => (
        <div
          key={company.name}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-glass"
        >
          <img
            src={IMAGES[company.name]}
            alt={`${company.name} — ${company.description}`}
            width={1400}
            height={933}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
              Branch {company.index}
            </span>
            <h3 className="mt-1 text-lg font-semibold capitalize">{company.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CompaniesPortfolio() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const onScreen = useInView(rootRef, { margin: '150px' });
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  // Auto-advance — pauses on hover / off-screen.
  useEffect(() => {
    if (reduce || !onScreen) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, onScreen]);

  const company = COMPANIES[active];
  const Icon = company.icon;
  const isEmerald = active % 2 === 1;

  return (
    <section
      aria-label="Our companies — portfolio"
      className="section-py relative overflow-hidden bg-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-light" />

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
          <motion.div
            ref={rootRef}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            onMouseEnter={() => (pausedRef.current = true)}
            onMouseLeave={() => (pausedRef.current = false)}
            className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[1.65fr_1fr] lg:items-stretch lg:gap-8"
          >
            {/* ── Featured preview ── */}
            <div className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-glass sm:aspect-[16/11] lg:aspect-auto lg:min-h-[26rem]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE_PREMIUM }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={IMAGES[company.name]}
                    alt={`${company.name} — ${company.description}`}
                    width={1400}
                    height={933}
                    decoding="async"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1.15 }}
                    transition={{ duration: AUTOPLAY_MS / 1000 + 1.5, ease: 'linear' }}
                    className="h-full w-full object-cover will-change-transform"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-900/88 via-navy-900/30 to-navy-900/5"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9 3xl:p-11">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          'grid h-11 w-11 place-items-center rounded-2xl ring-1 ring-inset ring-white/25 backdrop-blur-sm 3xl:h-12 3xl:w-12',
                          isEmerald ? 'bg-emerald-500/85' : 'bg-navy-700/65',
                        )}
                      >
                        <Icon className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/75 3xl:text-xs">
                        Branch {company.index}
                      </span>
                    </div>
                    <h3 className="mt-4 text-[clamp(1.6rem,2.8vw,2.5rem)] font-semibold capitalize leading-[1.1] tracking-[-0.03em]">
                      {company.name}
                    </h3>
                    <p className="mt-3 max-w-lg text-[clamp(0.9rem,1.15vw,1.0625rem)] leading-relaxed text-white/85 text-pretty">
                      {company.description}
                    </p>
                    <a
                      href="#contact"
                      className="group/link mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-white 3xl:text-base"
                    >
                      Partner with us
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 ease-premium group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 3xl:h-5 3xl:w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Portfolio counter */}
              <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tabular-nums tracking-[0.15em] text-white ring-1 ring-inset ring-white/25 backdrop-blur-sm">
                {company.index}
                <span className="text-white/55"> / 0{N}</span>
              </span>
            </div>

            {/* ── Thumbnail rail ── */}
            <div className="flex flex-col gap-3">
              {COMPANIES.map((c, i) => {
                const selected = i === active;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onMouseEnter={() => {
                      setActive(i);
                      pausedRef.current = true;
                    }}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={selected}
                    className={cn(
                      'group/thumb relative flex flex-1 items-center gap-4 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 ease-premium',
                      selected
                        ? 'border-emerald-200 bg-emerald-50/70 shadow-glass'
                        : 'border-navy-100 bg-white/70 hover:border-navy-200 hover:bg-white',
                    )}
                  >
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl sm:w-24">
                      <img
                        src={IMAGES[c.name]}
                        alt=""
                        width={400}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          'h-full w-full object-cover transition-transform duration-500 ease-premium group-hover/thumb:scale-110',
                          selected ? 'saturate-100' : 'saturate-[0.85]',
                        )}
                      />
                      {!selected && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-white/20 transition-opacity duration-300 group-hover/thumb:opacity-0"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          'text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300',
                          selected ? 'text-emerald-500' : 'text-navy-300',
                        )}
                      >
                        Branch {c.index}
                      </span>
                      <p
                        className={cn(
                          'mt-0.5 truncate text-sm font-semibold capitalize transition-colors duration-300 sm:text-[0.95rem]',
                          selected ? 'text-navy-900' : 'text-navy-500 group-hover/thumb:text-navy-800',
                        )}
                      >
                        {c.name}
                      </p>
                    </div>

                    <span
                      aria-hidden="true"
                      className={cn(
                        'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ease-premium',
                        selected
                          ? 'rotate-45 bg-navy-900 text-white'
                          : 'bg-navy-50 text-navy-300 group-hover/thumb:bg-navy-100',
                      )}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
