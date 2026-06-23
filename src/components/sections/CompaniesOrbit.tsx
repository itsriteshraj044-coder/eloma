import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';

/**
 * "Our Companies" — a 3D coverflow carousel.
 *
 * The five companies float as frameless panels on a perspective arc: the active
 * one sits front-and-centre while its neighbours rotate away and recede in Z,
 * dimming and softening with depth. It auto-advances, and can be driven by the
 * side arrows, the name rail, the dots, click-to-focus or the keyboard. On
 * scroll the deck assembles from deep space and the whole stage tilts (parallax).
 *
 * Same content as before — eyebrow, title, subheading, the five EG companies
 * with their Branch label / icon / copy / "Partner with us" link, and the
 * closing CTA. Palette stays on brand: white + navy + a single emerald accent.
 */

const N = COMPANIES.length;
const AUTOPLAY_MS = 4600;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function CompaniesOrbit() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);

  const go = useCallback((next: number) => setActive(((next % N) + N) % N), []);
  const prev = useCallback(() => go(active - 1), [active, go]);
  const next = useCallback(() => go(active + 1), [active, go]);

  // Auto-advance — pauses on hover/focus or when the user prefers reduced motion.
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  // Scroll parallax — the deck tilts a touch and the ghost index drifts.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const stageRotateX = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [0, 0, 0] : [7, 0, -7]);
  const smoothRotateX = useSpring(stageRotateX, { stiffness: 80, damping: 20 });
  const ghostY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);

  const activeCompany = COMPANIES[active];

  return (
    <section
      ref={sectionRef}
      id="companies-orbit"
      aria-label="Our companies"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* Ambient depth — faint mesh + masked grid, never boxed in. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-mesh-light" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
      />
      {/* Giant ghost index of the active company — parallax background read. */}
      <motion.span
        key={active}
        aria-hidden="true"
        style={{ y: ghostY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_PREMIUM }}
        className="pointer-events-none absolute left-1/2 top-[42%] -z-0 -translate-x-1/2 -translate-y-1/2 select-none font-black leading-none tracking-[-0.06em] text-navy-50 text-[clamp(16rem,40vw,34rem)]"
      >
        {activeCompany.index}
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

        {/* ── 3D coverflow stage ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE_PREMIUM }}
          className="relative mt-12 sm:mt-14 lg:mt-16"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onFocusCapture={() => (pausedRef.current = true)}
          onBlurCapture={() => (pausedRef.current = false)}
        >
          {/* Side arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous company"
            className="absolute left-0 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-navy-100 bg-white/80 text-navy-600 shadow-glass backdrop-blur transition-all duration-300 ease-premium hover:scale-110 hover:border-emerald-200 hover:text-emerald-600 sm:h-12 sm:w-12 lg:-left-2 3xl:h-14 3xl:w-14"
          >
            <ChevronLeft className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next company"
            className="absolute right-0 top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-navy-100 bg-white/80 text-navy-600 shadow-glass backdrop-blur transition-all duration-300 ease-premium hover:scale-110 hover:border-emerald-200 hover:text-emerald-600 sm:h-12 sm:w-12 lg:-right-2 3xl:h-14 3xl:w-14"
          >
            <ChevronRight className="h-5 w-5 3xl:h-6 3xl:w-6" aria-hidden="true" />
          </button>

          {/* Perspective viewport */}
          <div
            className="relative mx-auto h-[clamp(23rem,46vw,32rem)] w-full max-w-5xl [perspective:2200px]"
            style={{ transformStyle: 'preserve-3d' }}
            role="group"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prev();
              } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                next();
              }
            }}
          >
            <motion.div
              style={{ rotateX: reduce ? 0 : smoothRotateX, transformStyle: 'preserve-3d' }}
              className="will-transform absolute inset-0"
            >
              {COMPANIES.map((company, i) => {
                const offset = i - active;
                const dist = Math.abs(offset);
                const isActive = offset === 0;
                const Icon = company.icon;
                const isEmerald = i % 2 === 1;

                return (
                  <motion.div
                    key={company.name}
                    className="absolute inset-0 m-auto h-[clamp(20rem,40vw,28rem)] w-[clamp(17rem,40vw,26rem)]"
                    style={{ zIndex: 100 - dist }}
                    initial={false}
                    animate={{
                      x: `${offset * 58}%`,
                      z: -dist * 230,
                      rotateY: clamp(-offset * 38, -56, 56),
                      scale: Math.max(0.72, 1 - dist * 0.15),
                      opacity: dist > 2 ? 0 : isActive ? 1 : dist === 1 ? 0.62 : 0.26,
                    }}
                    transition={
                      reduce
                        ? { duration: 0.2 }
                        : { type: 'spring', stiffness: 110, damping: 20, mass: 0.6 }
                    }
                  >
                    <button
                      type="button"
                      onClick={() => !isActive && go(i)}
                      tabIndex={isActive ? 0 : -1}
                      aria-hidden={!isActive}
                      aria-label={isActive ? undefined : `Show ${company.name}`}
                      className={cn(
                        'group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-left transition-shadow duration-500 ease-premium sm:p-8 lg:p-10 3xl:rounded-[2.5rem] 3xl:p-12',
                        isActive ? 'cursor-default shadow-glass-lg' : 'cursor-pointer shadow-glass',
                      )}
                      style={{
                        // Soft frameless panel — gradient float, no hard border.
                        background:
                          'linear-gradient(160deg,#ffffff 0%,#ffffff 52%,#eef3f8 100%)',
                        // Side panels read as deeper / cooler via a subtle wash.
                        filter: isActive ? 'none' : 'saturate(0.9) brightness(0.99)',
                      }}
                    >
                      {/* Accent wash — alternates navy / emerald, intensifies when active */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500',
                          isEmerald ? 'bg-emerald-300/40' : 'bg-navy-300/30',
                          isActive ? 'opacity-100' : 'opacity-40',
                        )}
                      />
                      {/* Hover sheen on the active panel */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] 3xl:rounded-[2.5rem]"
                      >
                        <span className="absolute -inset-y-10 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 ease-premium group-hover:left-[130%] group-hover:opacity-100" />
                      </span>

                      {/* Top row — branch label + floating icon orb */}
                      <div className="relative flex items-start justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy-300 sm:text-xs">
                          Branch {company.index}
                        </span>
                        <span
                          className={cn(
                            'grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-glass transition-transform duration-500 ease-premium group-hover:-translate-y-1 sm:h-16 sm:w-16 3xl:h-20 3xl:w-20',
                            isEmerald
                              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                              : 'bg-gradient-to-br from-navy-500 to-navy-800',
                          )}
                        >
                          <Icon className="h-6 w-6 sm:h-7 sm:w-7 3xl:h-9 3xl:w-9" aria-hidden="true" />
                        </span>
                      </div>

                      {/* Index + name + description */}
                      <div className="relative">
                        <span
                          className={cn(
                            'block font-black leading-none tracking-[-0.04em] text-[clamp(2.75rem,6vw,4.5rem)]',
                            isEmerald ? 'text-emerald-100' : 'text-navy-100',
                          )}
                          aria-hidden="true"
                        >
                          {company.index}
                        </span>
                        <h3 className="mt-2 text-[clamp(1.35rem,2.4vw,2rem)] font-semibold capitalize leading-tight tracking-[-0.01em] text-navy-900">
                          {company.name}
                        </h3>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'mt-3 block h-[2px] w-16 rounded-full bg-gradient-to-r 3xl:w-20',
                            isEmerald ? 'from-emerald-400 to-emerald-200' : 'from-navy-500 to-navy-200',
                          )}
                        />
                        <p className="mt-4 max-w-md text-[clamp(0.85rem,1.05vw,1rem)] leading-relaxed text-navy-500 text-pretty">
                          {company.description}
                        </p>

                        <a
                          href="#contact"
                          tabIndex={isActive ? 0 : -1}
                          style={{ color: '#0B2B4F' }}
                          className={cn(
                            'mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium 3xl:text-base',
                            isActive ? 'pointer-events-auto' : 'pointer-events-none',
                          )}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Partner with us
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform duration-300 ease-premium hover:-translate-y-0.5 3xl:h-5 3xl:w-5"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Name rail — the spine that drives & reflects the active company ── */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:mt-12 sm:gap-x-3">
            {COMPANIES.map((company, i) => {
              const isActive = i === active;
              return (
                <button
                  key={company.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={isActive}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ease-premium 3xl:text-base',
                    isActive ? 'text-navy-900' : 'text-navy-400 hover:text-navy-700',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="orbit-active-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-emerald-50 ring-1 ring-inset ring-emerald-200"
                      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">
                    <span className={cn('mr-1.5', isActive ? 'text-emerald-500' : 'text-navy-300')}>
                      {company.index}
                    </span>
                    {company.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
            {COMPANIES.map((company, i) => (
              <button
                key={company.name}
                type="button"
                tabIndex={-1}
                onClick={() => go(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-400 ease-premium',
                  i === active ? 'w-7 bg-emerald-500' : 'w-1.5 bg-navy-200 hover:bg-navy-300',
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Closing CTA — the journey resolves into one vision */}
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
