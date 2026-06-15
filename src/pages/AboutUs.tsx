import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Headset,
  HeartHandshake,
  Plane,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { ABOUT_MEDIA } from '@/data/aboutMedia';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/* ════════════════════════════════════════════════════════════════════════
   About Us — rebuilt around the official copy.
   One Team · Our Journey (timeline) · Mission/Vision/Values · Beyond Work ·
   Become an Elomian. Light theme only, single emerald accent, light-weight
   non-uppercase headings at homepage sizes, hairline rules instead of boxy
   cards. Motion respects prefers-reduced-motion.
   ════════════════════════════════════════════════════════════════════════ */

const H2 = 'text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance';
const H3 = 'text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900';

/* ── Content (from the official About Us copy) ───────────────────────────── */

const HERO_LEAD =
  'Driven by experience, precision, and a client-first approach, Eloma Group brings together diverse expertise across industries to deliver solutions that truly work.';

const INTRO = [
  'We are a diversified business group built on experience, innovation, and a shared vision for growth. Our team brings together professionals from multiple industries, working across transportation, digital solutions, security, travel and tourism and customer support to deliver impactful results.',
  'With a deep understanding of business operations and evolving market needs, we focus on creating solutions that are efficient, scalable, and future-ready. At Eloma Group, we don’t just support businesses — we build systems and services that help them grow, adapt, and succeed in a dynamic world.',
];

const INDUSTRIES: { icon: LucideIcon; name: string }[] = [
  { icon: Truck, name: 'Transportation' },
  { icon: ServerCog, name: 'Digital Solutions' },
  { icon: ShieldCheck, name: 'Security' },
  { icon: Plane, name: 'Travel & Tourism' },
  { icon: Headset, name: 'Customer Support' },
];

interface Milestone {
  year: string;
  title: string;
  body: string;
}

const JOURNEY: Milestone[] = [
  {
    year: '2013',
    title: 'The Idea Began',
    body: 'As businesses started growing, it became clear that many of them were facing common problems — lack of support, slow systems, and limited opportunities to scale. While working closely with different organizations, we saw how difficult it was for businesses to grow smoothly. These early experiences planted the idea of building something that could truly support businesses in a better and simpler way.',
  },
  {
    year: '2014',
    title: 'Learning from Global Environments',
    body: 'Working in fast-moving global environments gave a deeper understanding of how successful businesses operate. It showed the importance of strong systems, smart decisions, and the right support at the right time. At the same time, it also highlighted the gaps — where businesses struggle due to lack of proper guidance, tools, and reliable partners.',
  },
  {
    year: '2016',
    title: 'Understanding Business Systems',
    body: 'As industries evolved, it became clear that growth is not just about one service — it is about how everything connects. From operations to technology, every part of a business needs to work together. This phase helped build a strong understanding of how different business functions connect and why simple, integrated solutions are important for long-term success.',
  },
  {
    year: '2018',
    title: 'Real Market Experience',
    body: 'Working closely within the Australian market gave a real picture of everyday business challenges. Many businesses were facing issues like inconsistent services, lack of transparency, and limited growth support. These real-world experiences made one thing very clear — businesses needed a partner who understands their challenges and provides simple, reliable solutions.',
  },
  {
    year: '2020',
    title: 'The Entrepreneurial Vision',
    body: 'With years of learning and experience, the vision became stronger — to build not just one company, but a group of businesses that can support different needs. The idea was to create a platform where businesses can find solutions, support, and opportunities under one ecosystem. The focus was on trust, simplicity, and long-term value.',
  },
  {
    year: '2025',
    title: 'Eloma Group Was Born',
    body: 'This vision became reality with the launch of Eloma Group. It marked the beginning of building a multi-business ecosystem focused on innovation, growth, and real solutions. Eloma Group was created to support businesses across different industries, helping them grow with the right services, systems, and partnerships.',
  },
  {
    year: '2025',
    title: 'Expanding into Multiple Businesses',
    body: 'With a strong foundation in place, Eloma Group started building and launching different business units across industries. Each business was created with a clear purpose — to solve real problems and provide reliable services. This step marked the beginning of Eloma as a growing and diversified business group.',
  },
  {
    year: '2026',
    title: 'Growth with Purpose',
    body: 'Growth at Eloma Group is not just about expansion. It is about building responsibly and creating a positive impact. With a focus on ethical practices, inclusive values, and long-term sustainability, Eloma continues to grow as a company that supports people, businesses, and communities.',
  },
];

interface Pillar {
  icon: LucideIcon;
  label: string;
  body: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Target,
    label: 'Mission',
    body: 'Our mission at Eloma Group is to make business feel simple, clear, and possible for everyone. We aim to remove confusion, reduce stress, and give businesses the right support to grow with confidence. We focus on real solutions, real people, and real results — so every business, big or small, can move forward without feeling stuck or alone.',
  },
  {
    icon: Compass,
    label: 'Vision',
    body: 'Our vision is to build a strong and trusted business group that connects different industries across Australia. We want to create a space where businesses can find everything they need to grow, all in one place. We aim to keep growing with new ideas, better systems, and meaningful impact.',
  },
  {
    icon: HeartHandshake,
    label: 'Values',
    body: 'At Eloma Group, we believe in keeping things simple, honest, and reliable. We respect people, value hard work, and always focus on doing the right thing. We believe in growing together, supporting each other, and building long-term relationships based on trust.',
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

/* ── 1 · Hero ────────────────────────────────────────────────────────────── */

function PageHero() {
  return (
    <section
      aria-label="About Eloma Group"
      className="relative isolate overflow-hidden bg-white pb-[clamp(2rem,5vw,4rem)] pt-[clamp(7rem,12vw,11rem)]"
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
            About Eloma Group
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[clamp(2rem,5.4vw,3.4rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            One team. Multiple expertise.
            <br className="hidden sm:block" /> <span className="font-normal text-emerald-500">Shared vision.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            {HERO_LEAD}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button href="/#contact" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Start a conversation
            </Button>
            <a
              href="/#businesses"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              Explore our businesses
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 2 · Intro — "Hi, We're Eloma Group." ────────────────────────────────── */

function Intro() {
  return (
    <section aria-label="Who we are" className="section-py relative overflow-hidden bg-white">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left — heading (sticky on lg) */}
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Who we are
            </motion.span>
            <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
              Hi, we’re Eloma Group.
            </motion.h2>
            <motion.img
              variants={fadeUp}
              src="/Eloma Group Logo-01.png"
              alt="Eloma Group"
              width={2000}
              height={780}
              loading="lazy"
              decoding="async"
              className="mt-6 h-auto w-full max-w-[clamp(220px,22vw,340px)] object-contain"
            />
          </motion.div>

          {/* Right — paragraphs + industry tags */}
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

            <motion.ul variants={fadeUp} className="mt-9 flex flex-wrap gap-2.5">
              {INDUSTRIES.map(({ icon: Icon, name }) => (
                <li
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 text-[14px] font-medium text-navy-700 transition-colors duration-300 hover:border-emerald-200 hover:text-emerald-700"
                >
                  <Icon className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ── 3 · Our Journey — sticky scrollytelling (morphing year + focus story) ── */

/** One scrolling milestone story. Reveals once, and reports when it is centred
 *  so the sticky left panel can follow it; inactive stories gently dim. */
function StoryBlock({
  item,
  index,
  onActive,
}: {
  item: Milestone;
  index: number;
  onActive: (i: number) => void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const centred = useInView(ref, { amount: 0.6 });
  const revealed = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (centred) onActive(index);
  }, [centred, index, onActive]);

  const dim = reduced ? 1 : centred ? 1 : 0.35;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={revealed ? { opacity: dim, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: EASE_PREMIUM }}
      className="flex min-h-[62vh] flex-col justify-center border-b border-navy-100 py-10 last:border-0"
    >
      {/* Mobile-only year (desktop shows it in the sticky panel) */}
      <span className="text-[clamp(2.4rem,9vw,3.2rem)] font-extralight leading-none tracking-[-0.03em] text-emerald-500 tabular-nums lg:hidden">
        {item.year}
      </span>
      <span
        className={cn(
          'text-[11px] font-bold uppercase tracking-[2px] text-navy-300',
          'mt-4 lg:mt-0',
        )}
      >
        Chapter {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="mt-3 text-[clamp(1.35rem,2.2vw,1.9rem)] font-normal capitalize leading-snug text-navy-900">
        {item.title}
      </h3>
      <p className="mt-4 max-w-xl text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.9] text-navy-500 text-pretty">
        {item.body}
      </p>
    </motion.article>
  );
}

function JourneyStory() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = JOURNEY[active];
  const fraction = (active + 1) / JOURNEY.length;

  return (
    <section aria-label="Our journey" className="section-py overflow-x-clip bg-white">
      <Container>
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-2">
          {/* ── Sticky left panel — pins below the navbar, releases at section end ── */}
          <div className="lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-7rem)] lg:flex-col lg:justify-center lg:self-start lg:py-4">
            <motion.div
              variants={staggerParent(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="max-w-md"
            >
              <motion.span variants={fadeUp} className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Our Journey
              </motion.span>
              <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
                From a single idea to a diversified group
              </motion.h2>
            </motion.div>

            {/* Morphing year + active title (desktop only) */}
            <div className="mt-10 hidden lg:block">
              <div className="relative h-[clamp(5rem,9vw,8rem)]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={`${current.year}-${active}`}
                    initial={{ opacity: 0, y: reduced ? 0 : 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -36 }}
                    transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                    className="absolute inset-0 block select-none text-[clamp(5rem,9vw,8rem)] font-extralight leading-none tracking-[-0.04em] text-emerald-500 tabular-nums will-transform"
                  >
                    {current.year}
                  </motion.span>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${current.title}-${active}`}
                  initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                  transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                  className="mt-4 block text-[clamp(1.1rem,1.6vw,1.4rem)] font-normal capitalize text-navy-900"
                >
                  {current.title}
                </motion.span>
              </AnimatePresence>

              {/* Year list with a sliding marker */}
              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
                {JOURNEY.map((m, i) => (
                  <li key={`${m.year}-${m.title}-nav`} className="relative">
                    <span
                      className={cn(
                        'relative text-sm font-semibold tabular-nums transition-colors duration-300',
                        i === active ? 'text-navy-900' : 'text-navy-300',
                      )}
                    >
                      {i === active && (
                        <motion.span
                          layoutId="journey-active-dot"
                          className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-emerald-500"
                          transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                        />
                      )}
                      {m.year}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Progress bar */}
              <div className="mt-9 h-px w-full bg-navy-100">
                <motion.div
                  className="h-px origin-left bg-emerald-400 will-transform"
                  style={{ transformOrigin: 'left' }}
                  animate={{ scaleX: fraction }}
                  transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                />
              </div>
            </div>
          </div>

          {/* ── Scrolling stories ── */}
          <div className="flex flex-col">
            {JOURNEY.map((item, i) => (
              <StoryBlock key={`${item.year}-${item.title}`} item={item} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── 4 · Mission / Vision / Values (hairline grid) ───────────────────────── */

function Pillars() {
  return (
    <section aria-label="Mission, vision and values" className="section-py relative overflow-hidden bg-white">
      <Container>
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-12 max-w-3xl"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            What drives us
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
            Mission, vision &amp; values
          </motion.h2>
        </motion.div>

        <motion.ul
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid border-l border-t border-navy-100 lg:grid-cols-3"
        >
          {PILLARS.map(({ icon: Icon, label, body }) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="group relative border-b border-r border-navy-100 p-7 transition-colors duration-500 hover:bg-emerald-50/40 lg:p-9"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className={`mt-5 ${H3}`}>{label}</h3>
              <p className="mt-3 text-[14px] leading-[1.85] text-navy-500 text-pretty">{body}</p>
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

/* ── 5 · Beyond Work (image + text) ──────────────────────────────────────── */

function BeyondWork() {
  return (
    <section aria-label="Beyond work" className="section-py relative overflow-hidden bg-navy-50/40">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.span variants={fadeUp} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Culture
            </motion.span>
            <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
              Beyond work
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty"
            >
              At Eloma Group, we believe strong teams are built beyond the workplace. We regularly come
              together through team gatherings and shared experiences that foster connection,
              collaboration, and a positive work culture.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mt-5 text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty"
            >
              Whether it’s team lunches or informal outings, we value creating an environment where people
              enjoy working together just as much as they excel professionally.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE_PREMIUM }}
            className="relative"
          >
            <div className="grid grid-cols-5 grid-rows-5 gap-3 sm:gap-4">
              <img
                src={ABOUT_MEDIA.team.src}
                alt={ABOUT_MEDIA.team.alt}
                width={1400}
                height={1000}
                loading="lazy"
                decoding="async"
                className="col-span-3 row-span-5 h-full w-full rounded-3xl object-cover shadow-glass"
              />
              <img
                src={ABOUT_MEDIA.meeting.src}
                alt={ABOUT_MEDIA.meeting.alt}
                width={900}
                height={600}
                loading="lazy"
                decoding="async"
                className="col-span-2 row-span-3 h-full w-full rounded-3xl object-cover shadow-glass"
              />
              <img
                src={ABOUT_MEDIA.office.src}
                alt={ABOUT_MEDIA.office.alt}
                width={900}
                height={600}
                loading="lazy"
                decoding="async"
                className="col-span-2 row-span-2 h-full w-full rounded-3xl object-cover shadow-glass"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ── 6 · Become an Elomian (closing CTA) ─────────────────────────────────── */

function BecomeElomian() {
  return (
    <section aria-label="Careers at Eloma Group" className="section-py relative overflow-hidden bg-white">
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
            Careers
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-[clamp(1.9rem,4.5vw,3rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            Become an <span className="font-normal text-emerald-500">Elomian</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            Build a meaningful career across diverse industries at Eloma Group. Work alongside passionate
            professionals, collaborate across business verticals, and contribute to solutions that create real
            impact.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            We foster a culture of continuous learning, innovation, and growth — where your ideas are valued,
            your skills are developed, and your work drives progress across transportation, digital solutions,
            security, and beyond.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button href="/#careers" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              See open roles
            </Button>
            <a
              href="/#contact"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              Talk to our team
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function AboutUs() {
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
      <JourneyStory />
      <Pillars />
      <BeyondWork />
      <BecomeElomian />
    </main>
  );
}
