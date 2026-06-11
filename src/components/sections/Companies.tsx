import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPANIES, COMPANIES_SECTION } from '@/data/content';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, VIEWPORT_ONCE } from '@/lib/motion';
import type { Company } from '@/types';

/* ── Per-company color world — light gradients only, no dark surfaces ── */
interface BranchTheme {
  orb: string;     // icon orb gradient
  accent: string;  // index / link color
  glow: string;    // soft halo behind the orb
  node: string;    // spine node fill
}

const THEMES: BranchTheme[] = [
  { orb: 'from-violet-400 to-violet-600',  accent: 'text-violet-600',  glow: 'bg-violet-200/60',  node: 'from-violet-400 to-violet-600' },
  { orb: 'from-emerald-400 to-emerald-600', accent: 'text-emerald-600', glow: 'bg-emerald-200/60', node: 'from-emerald-400 to-emerald-600' },
  { orb: 'from-sky-400 to-sky-600',         accent: 'text-sky-600',     glow: 'bg-sky-200/60',     node: 'from-sky-400 to-sky-600' },
  { orb: 'from-amber-400 to-orange-500',    accent: 'text-amber-600',   glow: 'bg-amber-200/60',   node: 'from-amber-400 to-orange-500' },
  { orb: 'from-rose-400 to-rose-600',       accent: 'text-rose-600',    glow: 'bg-rose-200/60',    node: 'from-rose-400 to-rose-600' },
];

/* ── One company = one branch growing off the shared root ───────────── */
function CompanyBranch({ company, index }: { company: Company; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = company.icon;
  const theme = THEMES[index % THEMES.length];
  const isLeft = index % 2 === 0; // copy sits left of the spine on lg

  // Row-local scroll progress drives the parallax of the ghost numeral.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const ghostY = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const orbY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <div ref={ref} className="relative">
      {/* Node where this branch meets the root */}
      <div
        className="absolute left-4 top-8 z-10 md:left-1/2 md:top-1/2"
        aria-hidden="true"
      >
        <div className="-translate-x-1/2 md:-translate-y-1/2">
          <span className="relative block">
            <motion.span
              className="will-transform absolute inset-0 rounded-full bg-emerald-400"
              animate={{ scale: [1, 2.6], opacity: [0.45, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: index * 0.35 }}
            />
            <span className={cn('relative block h-3.5 w-3.5 rounded-full bg-gradient-to-br ring-4 ring-white', theme.node)} />
          </span>
        </div>
      </div>

      {/* Branch connector — grows out of the spine toward the copy (lg+) */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.8, ease: EASE_PREMIUM, delay: 0.15 }}
        aria-hidden="true"
        className={cn(
          'will-transform pointer-events-none absolute top-1/2 hidden h-px w-[clamp(2rem,5vw,7rem)] md:block',
          isLeft
            ? 'right-1/2 origin-right bg-gradient-to-l from-emerald-400/80 to-transparent'
            : 'left-1/2 origin-left bg-gradient-to-r from-emerald-400/80 to-transparent',
        )}
      />

      <div className="grid gap-6 pl-12 sm:pl-14 md:grid-cols-2 md:items-center md:gap-0 md:pl-0">
        {/* ── Visual: floating gradient orb + parallax ghost numeral ── */}
        <div
          className={cn(
            'relative flex items-center gap-6 sm:gap-8 md:gap-[clamp(1.75rem,4vw,4.5rem)]',
            isLeft
              ? 'md:order-2 md:justify-start md:pl-[clamp(2.75rem,7vw,9rem)]'
              : 'md:order-1 md:flex-row-reverse md:justify-start md:pr-[clamp(2.75rem,7vw,9rem)]',
          )}
        >
          {/* Orb — soft halo + slow orbiting dashed ring + breathing float */}
          <motion.div style={{ y: orbY }} className="will-transform relative">
            <div className={cn('pointer-events-none absolute -inset-5 rounded-full blur-2xl', theme.glow)} aria-hidden="true" />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="will-transform pointer-events-none absolute -inset-3 rounded-full border border-dashed border-navy-200/80"
              aria-hidden="true"
            />
            <span
              className={cn(
                'animate-float relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br text-white shadow-glass-lg sm:h-20 sm:w-20 3xl:h-24 3xl:w-24 4xl:h-28 4xl:w-28',
                theme.orb,
              )}
            >
              <Icon className="h-7 w-7 sm:h-9 sm:w-9 3xl:h-11 3xl:w-11 4xl:h-12 4xl:w-12" aria-hidden="true" />
            </span>
          </motion.div>

          {/* Outlined ghost numeral — in flow beside the orb, drifting at its own scroll speed */}
          <motion.span
            style={{ y: ghostY, WebkitTextStroke: '1.5px rgba(8,33,60,0.10)' }}
            aria-hidden="true"
            className="will-transform pointer-events-none select-none font-black leading-none text-transparent text-[clamp(4.5rem,12vw,11rem)]"
          >
            {company.index}
          </motion.span>
        </div>

        {/* ── Copy: open editorial block, slides in from its side ── */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: isLeft ? -48 : 48 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_PREMIUM } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className={cn(
            'will-transform relative flex flex-col',
            isLeft
              ? 'md:order-1 md:items-end md:pr-[clamp(2.75rem,7vw,9rem)] md:text-right'
              : 'md:order-2 md:items-start md:pl-[clamp(2.75rem,7vw,9rem)]',
          )}
        >
          <span className={cn('text-eyebrow-fluid font-normal uppercase', theme.accent)}>
            Branch {company.index}
          </span>
          <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] font-normal capitalize leading-tight text-navy-900 text-balance">
            {company.name}
          </h3>
          <p className="mt-3 max-w-md text-body-fluid text-navy-500 text-pretty">
            {company.description}
          </p>
          <a
            href="#contact"
            className={cn(
              'group mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-normal transition-colors duration-300 3xl:text-base',
              theme.accent,
            )}
          >
            Partner with us
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 3xl:h-5 3xl:w-5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Section: "five branches growing from one shared root" ──────────── */
export function Companies() {
  const listRef = useRef<HTMLDivElement>(null);

  // The root line draws itself in as the list scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.78', 'end 0.5'],
  });
  const rootProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });

  return (
    <section
      id="companies"
      aria-label="Our companies"
      className="section-py relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white"
    >
      {/* Ambient — drifting grid + morphing gradient blobs */}
      <div
        className="bg-grid-drift pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-25"
        aria-hidden="true"
      />
      <div
        className="bg-blob will-transform pointer-events-none absolute -left-28 top-40 aspect-square w-[clamp(220px,26vw,440px)] bg-emerald-100/50 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="bg-blob will-transform pointer-events-none absolute -right-28 bottom-32 aspect-square w-[clamp(200px,24vw,400px)] bg-sky-100/60 blur-[100px]"
        aria-hidden="true"
      />

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

        {/* ── The journey ── */}
        <div ref={listRef} className="relative mt-16 sm:mt-20 lg:mt-24">
          {/* Shared root — base line + scroll-drawn gradient overlay */}
          <div
            className="pointer-events-none absolute inset-y-0 left-4 w-[2px] -translate-x-1/2 rounded-full bg-navy-100 md:left-1/2"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleY: rootProgress }}
              className="will-transform h-full w-full origin-top rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-navy-600"
            />
          </div>

          <div className="flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-28">
            {COMPANIES.map((company, i) => (
              <CompanyBranch key={company.name} company={company} index={i} />
            ))}
          </div>

          {/* Closing node — the journey resolves into one vision */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="relative z-10 mt-16 flex justify-start pl-12 sm:pl-14 md:mt-20 md:justify-center md:pl-0 lg:mt-24"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 px-6 py-3 text-sm font-normal text-white shadow-glow-emerald transition-transform duration-300 ease-premium hover:scale-[1.04] active:scale-[0.98] 3xl:px-8 3xl:py-4 3xl:text-base"
            >
              <Sparkles className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:rotate-90 3xl:h-5 3xl:w-5" aria-hidden="true" />
              One shared vision
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
