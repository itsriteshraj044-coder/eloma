import { useLayoutEffect, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Gauge,
  HeartHandshake,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/* ════════════════════════════════════════════════════════════════════════
   Our Partners — built around the official copy. Light theme only, single
   emerald accent, light-weight non-uppercase headings at the same sizes as
   the homepage / About Us page, hairline rules instead of boxy cards. Real
   partner logos served locally from /public/partners. Motion respects
   prefers-reduced-motion and only animates transform / opacity.
   ════════════════════════════════════════════════════════════════════════ */

const H2 = 'text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance';
const H3 = 'text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900';

/* ── Content (from the official Our Partners copy) ───────────────────────── */

const HERO_LEAD =
  'Strong partnerships are at the heart of everything we do — relationships with leading global brands, technology providers, manufacturers, and industry specialists that help us deliver reliable solutions across logistics, transportation, digital transformation, and business services.';

const INTRO = [
  'Over the years, Eloma Group has built relationships with leading global brands, technology providers, manufacturers, and industry specialists who help us deliver reliable solutions across logistics, transportation, digital transformation, and business services.',
  'Our partners are more than vendors or collaborators — they are an extension of our commitment to quality, innovation, and long-term growth. Together, we work towards creating efficient systems, better customer experiences, and sustainable business outcomes.',
];

const ENABLERS: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: 'Deliver reliable and scalable solutions' },
  { icon: Gauge, label: 'Improve operational efficiency' },
  { icon: Cpu, label: 'Leverage the latest technologies' },
  { icon: Layers, label: 'Expand our capabilities across industries' },
  { icon: HeartHandshake, label: 'Create greater value for our customers' },
];

interface Partner {
  name: string;
  sector: string;
  logo: string;
  /** Per-logo height tuning — logos ship with very different aspect ratios. */
  logoClass: string;
  body: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'Microsoft',
    sector: 'Technology & Cloud',
    logo: '/partners/microsoft.svg',
    logoClass: 'h-[clamp(1.9rem,3vw,2.75rem)]',
    body: 'As one of the world’s leading technology companies, Microsoft supports businesses through innovative digital solutions, cloud technologies, productivity tools, and enterprise systems. Our association reflects our commitment to embracing technology that drives growth, efficiency, and innovation.',
  },
  {
    name: 'Tesla',
    sector: 'Innovation & Engineering',
    logo: '/partners/tesla.svg',
    logoClass: 'h-[clamp(3rem,5.5vw,4.75rem)]',
    body: 'Known for its innovation and forward-thinking approach, Tesla represents excellence in engineering, sustainability, and technological advancement. Partnerships with globally recognized brands like Tesla reinforce our focus on modern, future-ready business solutions.',
  },
  {
    name: 'Isuzu',
    sector: 'Commercial Transportation',
    logo: '/partners/isuzu.svg',
    logoClass: 'h-[clamp(1.5rem,2.4vw,2.1rem)]',
    body: 'A trusted name in commercial transportation, Isuzu is recognized worldwide for reliability, durability, and performance. Through collaborations with industry leaders such as Isuzu, we strengthen our transportation capabilities and support efficient movement across supply chains.',
  },
  {
    name: 'Amazon Web Services',
    sector: 'Cloud & Infrastructure',
    logo: '/partners/aws.svg',
    logoClass: 'h-[clamp(2.5rem,4.2vw,3.75rem)]',
    body: 'As the world’s most comprehensive and broadly adopted cloud platform, Amazon Web Services (AWS) powers businesses with secure, scalable infrastructure, advanced computing, storage, and intelligent data solutions. Our association with AWS reflects our commitment to building reliable, future-ready systems — enabling digital transformation, operational efficiency, and innovation at scale. Together, we deliver cloud-driven solutions that help businesses grow faster, operate smarter, and stay resilient across every industry we serve.',
  },
];

/* ── Reading-progress bar ────────────────────────────────────────────────── */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-emerald-400 to-emerald-500"
    />
  );
}

/* ── A single logo plate — hairline framed, lifts gently on hover ────────── */

function LogoPlate({
  partner,
  className,
}: {
  partner: Partner;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group/plate grid place-items-center rounded-2xl border border-navy-100 bg-white px-8 py-9 transition-all duration-500 ease-premium hover:border-emerald-200 hover:shadow-glass',
        className,
      )}
    >
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        loading="lazy"
        decoding="async"
        className={cn(
          'w-auto max-w-full object-contain transition-transform duration-500 ease-premium group-hover/plate:scale-[1.04]',
          partner.logoClass,
        )}
      />
    </div>
  );
}

/* ── 1 · Hero — headline + an infinite, GPU-only logo marquee ─────────────── */

function MarqueeRow() {
  const reduced = useReducedMotion();
  // Four copies → translating by exactly -25% shifts one full set: seamless
  // loop at any viewport width. Transform-only, so it never touches layout.
  const row = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div aria-hidden="true" className="pointer-events-none relative mt-[clamp(3rem,6vw,5rem)] overflow-hidden mask-fade-x">
      <motion.ul
        className="flex w-max items-center gap-[clamp(2.5rem,6vw,6rem)] will-transform"
        animate={reduced ? undefined : { x: ['0%', '-25%'] }}
        transition={reduced ? undefined : { duration: 26, ease: 'linear', repeat: Infinity }}
      >
        {row.map((p, i) => (
          <li key={`${p.name}-${i}`} className="flex shrink-0 items-center">
            <img
              src={p.logo}
              alt=""
              loading="lazy"
              decoding="async"
              className={cn('w-auto object-contain opacity-50 grayscale', p.logoClass)}
            />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

function PageHero() {
  return (
    <section
      aria-label="Our partners"
      className="relative isolate overflow-hidden bg-white pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(7rem,12vw,11rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh-light" />
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_60%)]" />
      </div>

      <Container>
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Our Partners
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[clamp(2rem,5.4vw,3.4rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            Trusted partnerships driving{' '}
            <span className="font-normal text-emerald-500">innovation</span>, logistics excellence
            <br className="hidden sm:block" /> and business growth.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            {HERO_LEAD}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button href="/#contact" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Become a partner
            </Button>
            <a
              href="#trusted-partners"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              Meet our partners
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>

        <MarqueeRow />
      </Container>
    </section>
  );
}

/* ── 2 · Intro — "Our Partners" (sticky heading + paragraphs) ─────────────── */

function Intro() {
  return (
    <section aria-label="About our partnerships" className="section-py relative overflow-hidden bg-white">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              The relationships behind our work
            </motion.span>
            <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
              Strong partnerships are at the heart of everything we do.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {INTRO.map((p) => (
              <motion.p
                key={p.slice(0, 24)}
                variants={fadeUp}
                className="mb-6 text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty last:mb-0"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ── 3 · Building Success Together — narrative + enabler grid ─────────────── */

function BuildingSuccess() {
  return (
    <section aria-label="Building success together" className="section-py relative overflow-hidden bg-navy-50/40">
      <Container>
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="max-w-3xl"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Building success together
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
            Every successful business journey is powered by the right partnerships.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty"
          >
            By collaborating with trusted organizations across different industries, we gain access to advanced
            technology, industry expertise, and global best practices that strengthen the services we provide to our
            clients. These partnerships enable us to:
          </motion.p>
        </motion.div>

        <motion.ul
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-12 grid border-l border-t border-navy-100 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ENABLERS.map(({ icon: Icon, label }) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="group relative flex items-start gap-4 border-b border-r border-navy-100 bg-white/70 p-7 transition-colors duration-500 hover:bg-emerald-50/50 lg:p-8"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-1 text-[clamp(0.98rem,1.2vw,1.1rem)] font-medium leading-snug text-navy-800">
                {label}
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-400 transition-all duration-500 ease-premium group-hover:w-full"
              />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

/* ── 4 · Our Trusted Partners — alternating logo / story rows ─────────────── */

function PartnerRow({ partner, index }: { partner: Partner; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Subtle, GPU-only parallax drift on the logo plate as the row scrolls.
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [28, -28]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid items-center gap-x-14 gap-y-8 border-b border-navy-100 py-[clamp(2.5rem,5vw,4.5rem)] last:border-0 lg:grid-cols-12"
    >
      {/* Logo plate */}
      <motion.div
        style={{ y }}
        className={cn('lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
        >
          <LogoPlate partner={partner} className="min-h-[clamp(8rem,16vw,12rem)]" />
        </motion.div>
      </motion.div>

      {/* Story */}
      <motion.div
        variants={staggerParent(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className={cn('lg:col-span-7', flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-6')}
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-navy-300 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-navy-200" aria-hidden="true" />
          <span className="text-[11px] font-extrabold uppercase tracking-[1.5px] text-emerald-600">
            {partner.sector}
          </span>
        </motion.div>
        <motion.h3 variants={fadeUp} className={`mt-4 ${H3}`}>
          {partner.name}
        </motion.h3>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.9] text-navy-500 text-pretty"
        >
          {partner.body}
        </motion.p>
      </motion.div>
    </div>
  );
}

function TrustedPartners() {
  return (
    <section
      id="trusted-partners"
      aria-label="Our trusted partners"
      className="section-py overflow-x-clip bg-white"
    >
      <Container>
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-[clamp(2rem,4vw,3.5rem)] max-w-3xl"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Our trusted partners
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
            The brands and specialists we build with
          </motion.h2>
        </motion.div>

        <div className="flex flex-col">
          {PARTNERS.map((partner, i) => (
            <PartnerRow key={partner.name} partner={partner} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ── 5 · Growing Through Collaboration (narrative band) ───────────────────── */

function GrowingTogether() {
  return (
    <section aria-label="Growing through collaboration" className="section-py relative overflow-hidden bg-navy-50/40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      </div>
      <Container className="relative">
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Growing through collaboration
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-6 ${H2}`}>
            Meaningful partnerships create lasting impact.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            By working with respected global organizations and industry leaders, we continue to expand our
            capabilities, strengthen our services, and deliver greater value to businesses around the world.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            As we grow, we remain committed to building relationships founded on trust, innovation, and shared
            success.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 6 · Become a Partner (closing CTA) ──────────────────────────────────── */

function BecomePartner() {
  return (
    <section aria-label="Partner with Eloma Group" className="section-py relative overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      </div>
      <Container className="relative">
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
            Partner with us
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-[clamp(1.9rem,4.5vw,3rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            Let’s build something{' '}
            <span className="font-normal text-emerald-500">together</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            Whether you’re a technology provider, manufacturer, or industry specialist, we’re always looking for
            partners who share our commitment to quality, innovation, and long-term growth.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button href="/#contact" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Start a partnership
            </Button>
            <a
              href="/about-us"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              Learn about Eloma Group
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function OurPartners() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // overflow-x-clip (not -hidden): clips horizontal overflow WITHOUT creating a
    // scroll container, so position:sticky panels inside still work.
    <main className={cn('overflow-x-clip')}>
      <ScrollProgress />
      <PageHero />
      <Intro />
      <BuildingSuccess />
      <TrustedPartners />
      <GrowingTogether />
      <BecomePartner />
    </main>
  );
}
