import { useLayoutEffect, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  Briefcase,
  Check,
  Lightbulb,
  Mail,
  MapPin,
  Scale,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';

/* ════════════════════════════════════════════════════════════════════════
   Careers — built from the official "Careers Page" copy.
   Hero · Why Join · Who We're Looking For · Current Openings (accordion) ·
   Be Part of Our Journey. Same typography system as About Us: light-weight,
   normal-case headings at homepage sizes, hairline rules over boxy cards,
   single emerald accent. Motion respects prefers-reduced-motion.
   ════════════════════════════════════════════════════════════════════════ */

const H2 = 'text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance';
const H3 = 'text-[clamp(1.15rem,1.6vw,1.4rem)] font-normal capitalize leading-tight text-navy-900';

const CAREERS_EMAIL = 'connect@elomagroup.com.au';

/* ── Content (from the official Careers copy) ────────────────────────────── */

const HERO_LEAD =
  'At Eloma Group, we believe great businesses are built by great people. We are always looking for passionate, creative, and driven individuals who are ready to learn, grow, and make an impact.';

const HERO_SUB =
  'Whether you’re an experienced professional or just starting your career, Eloma Group offers a supportive environment where your ideas are valued, your skills are developed, and your growth is encouraged.';

interface Benefit {
  icon: LucideIcon;
  label: string;
  body: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: TrendingUp,
    label: 'Growth Opportunities',
    body: 'We invest in your professional development and provide opportunities to learn new skills, take on exciting challenges, and advance your career.',
  },
  {
    icon: Users,
    label: 'Collaborative Culture',
    body: 'Work alongside talented professionals in a positive and supportive environment where teamwork and innovation thrive.',
  },
  {
    icon: Lightbulb,
    label: 'Innovation-Driven Workplace',
    body: 'We encourage fresh ideas, creative thinking, and problem-solving that help us deliver exceptional results for our clients.',
  },
  {
    icon: Award,
    label: 'Recognition & Appreciation',
    body: 'Your hard work and contributions are valued and recognized — because your success is our success.',
  },
  {
    icon: Scale,
    label: 'Work-Life Balance',
    body: 'We believe in maintaining a healthy balance between work and personal life to help our employees perform at their best.',
  },
];

const TRAITS = [
  'Passionate about their work',
  'Eager to learn and grow',
  'Creative and solution-oriented',
  'Strong communicators and team players',
  'Committed to excellence',
];

interface Opening {
  title: string;
  experience: string;
  location?: string;
  skills: string[];
}

const OPENINGS: Opening[] = [
  {
    title: 'Digital Marketing Executive',
    experience: '1–3 Years',
    location: 'Australia / India',
    skills: ['SEO', 'Social Media Marketing', 'Google Ads', 'Content Marketing'],
  },
  {
    title: 'UI/UX Designer',
    experience: '2+ Years',
    skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'User Experience Design'],
  },
  {
    title: 'Web Developer',
    experience: '2+ Years',
    skills: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'PHP'],
  },
  {
    title: 'SEO Specialist',
    experience: '2+ Years',
    skills: ['On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Keyword Research'],
  },
  {
    title: 'Business Development Executive',
    experience: '1–3 Years',
    skills: ['Lead Generation', 'Client Communication', 'Sales & Relationship Management'],
  },
  {
    title: 'Key Account Manager',
    experience: '3+ Years',
    skills: ['Client Management', 'Strategic Planning', 'Account Growth'],
  },
  {
    title: 'Content Writer',
    experience: '1–3 Years',
    skills: ['Content Creation', 'Copywriting', 'SEO Writing'],
  },
  {
    title: 'Graphic Designer',
    experience: '2+ Years',
    skills: ['Adobe Photoshop', 'Illustrator', 'Canva', 'Branding'],
  },
];

const mailtoFor = (role: string) =>
  `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`For opening role ${role}`)}&body=${encodeURIComponent(
    `Hi Eloma Group team,\n\nI'd like to apply for the ${role} position. Please find my resume attached.\n\nThank you,`,
  )}`;

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
      aria-label="Careers at Eloma Group"
      className="relative isolate overflow-hidden bg-white pb-[clamp(2rem,5vw,4rem)] pt-[clamp(7rem,12vw,11rem)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh-light" />
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_60%)]" />
        {/* Soft floating orbs for depth */}
        <motion.div
          aria-hidden="true"
          className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl"
          animate={{ y: [0, 24, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl"
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
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
            Careers at Eloma Group
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[clamp(2rem,5.4vw,3.4rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            Build your future
            <br className="hidden sm:block" /> with <span className="font-normal text-emerald-500">Eloma Group</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            {HERO_LEAD}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            {HERO_SUB}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button href="#openings" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              View open roles
            </Button>
            <a
              href={`mailto:${CAREERS_EMAIL}`}
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              Send us your resume
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 2 · Why Join Eloma Group (hairline grid) ────────────────────────────── */

function WhyJoin() {
  return (
    <section aria-label="Why join Eloma Group" className="section-py relative overflow-hidden bg-white">
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
            Why join us
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
            Why join Eloma Group?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty"
          >
            We build a workplace where talented people do their best work — and grow while doing it.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid border-l border-t border-navy-100 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map(({ icon: Icon, label, body }) => (
            <motion.li
              key={label}
              variants={fadeUp}
              className="group relative border-b border-r border-navy-100 p-7 transition-colors duration-500 hover:bg-emerald-50/40 lg:p-9"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5">
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

/* ── 3 · Who We Are Looking For ──────────────────────────────────────────── */

function WhoWeWant() {
  return (
    <section aria-label="Who we are looking for" className="section-py relative overflow-hidden bg-navy-50/40">
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
              The right fit
            </motion.span>
            <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
              Who we’re looking for
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty"
            >
              We’re always excited to connect with individuals who bring energy, curiosity, and a
              commitment to doing great work.
            </motion.p>
          </motion.div>

          <motion.ul
            variants={staggerParent(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex flex-col"
          >
            {TRAITS.map((trait, i) => (
              <motion.li
                key={trait}
                variants={fadeUp}
                className="group flex items-center gap-5 border-b border-navy-100 py-5 first:border-t"
              >
                <span className="text-[clamp(0.85rem,1vw,1rem)] font-semibold tabular-nums text-navy-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-transform duration-500 ease-premium group-hover:scale-110">
                  <Check className="h-4 w-4" aria-hidden="true" strokeWidth={2.5} />
                </span>
                <span className="text-[clamp(1.05rem,1.6vw,1.4rem)] font-normal capitalize leading-snug text-navy-900">
                  {trait}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}

/* ── 4 · Current Openings — spotlight 3D-tilt card grid ──────────────────── */

/** A premium role card that tilts toward the cursor with a pointer-following
 *  emerald glow. The whole card is the apply link. Tilt is disabled under
 *  prefers-reduced-motion; only transform/opacity animate. */
function RoleCard({ job, index }: { job: Opening; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  // normalized pointer position (−0.5 … 0.5) drives the tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useTransform(py, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(px, [-0.5, 0.5], [-7, 7]);

  // raw pointer position (px) drives the glow translation
  const gx = useMotionValue(0);
  const gy = useMotionValue(0);

  const onMove = (e: ReactMouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.li variants={scaleIn} className="h-full [perspective:1000px]">
      <motion.a
        ref={ref}
        href={mailtoFor(job.title)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-navy-100 bg-white p-7 transition-shadow duration-500 ease-premium will-change-transform hover:border-emerald-200 hover:shadow-glass-lg sm:p-8"
      >
        {/* Pointer-following glow (transform-only) */}
        <motion.span
          aria-hidden="true"
          style={{ x: gx, y: gy }}
          className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-emerald-300/25 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Giant ghost index */}
        <span className="pointer-events-none absolute right-5 top-3 select-none text-[clamp(2.6rem,5vw,3.8rem)] font-extralight leading-none tracking-[-0.04em] text-navy-900/[0.05] tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5">
          <Briefcase className="h-6 w-6" aria-hidden="true" />
        </span>

        <h3 className="relative mt-5 text-[clamp(1.25rem,2vw,1.65rem)] font-normal capitalize leading-tight text-navy-900 transition-colors duration-300 group-hover:text-emerald-700">
          {job.title}
        </h3>

        <div className="relative mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-[12.5px] font-semibold text-navy-700">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
            {job.experience}
          </span>
          {job.location && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-[12.5px] font-semibold text-navy-700">
              <MapPin className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              {job.location}
            </span>
          )}
        </div>

        <p className="relative mt-6 text-[10px] font-bold uppercase tracking-[2px] text-navy-300">Key skills</p>
        <ul className="relative mt-2.5 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <li
              key={skill}
              className="inline-flex items-center rounded-full border border-navy-100 px-3 py-1.5 text-[12.5px] font-medium text-navy-600 transition-colors duration-300 group-hover:border-emerald-100"
            >
              {skill}
            </li>
          ))}
        </ul>

        <span className="relative mt-auto inline-flex items-center gap-2 pt-7 text-[14px] font-bold text-navy-900">
          Apply now
          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-50 text-emerald-600 transition-all duration-300 ease-premium group-hover:bg-emerald-500 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </span>

        {/* Accent line sweep on hover */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-400 transition-all duration-500 ease-premium group-hover:w-full"
        />
      </motion.a>
    </motion.li>
  );
}

function Openings() {
  return (
    <section id="openings" aria-label="Current openings" className="section-py relative overflow-hidden bg-white scroll-mt-24">
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
            Current openings
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
            Open positions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty"
          >
            We’re always looking for talented individuals to join our growing team. Explore our latest
            opportunities and find the role that’s right for you.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-5 sm:grid-cols-2 sm:gap-6"
        >
          {OPENINGS.map((job, i) => (
            <RoleCard key={job.title} job={job} index={i} />
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="mt-12 text-[14px] text-navy-500"
        >
          Don’t see your role?{' '}
          <a
            href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent('Open application')}`}
            className="font-semibold text-emerald-600 underline-offset-4 hover:underline"
          >
            Send us your resume
          </a>{' '}
          and we’ll keep you in mind.
        </motion.p>
      </Container>
    </section>
  );
}

/* ── 5 · Be Part of Our Journey (closing CTA) ────────────────────────────── */

function JoinCta() {
  return (
    <section aria-label="Join Eloma Group" className="section-py relative overflow-hidden bg-navy-50/40">
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
            Be part of our journey
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-6 text-[clamp(1.9rem,4.5vw,3rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            Let’s build something <span className="font-normal text-emerald-500">extraordinary</span> together
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            At Eloma Group, every team member plays an important role in shaping our future. If you’re looking
            for a workplace that values innovation, collaboration, and growth, we’d love to hear from you.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,1.2vw,1.15rem)] font-medium text-navy-700 text-pretty"
          >
            Explore opportunities. Grow your career. Make an impact.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button
              href={`mailto:${CAREERS_EMAIL}`}
              variant="primary"
              size="lg"
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Send your resume
            </Button>
            <a
              href="#openings"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              Browse open roles
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.a
            variants={fadeUp}
            href={`mailto:${CAREERS_EMAIL}`}
            className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-navy-500 transition-colors duration-300 hover:text-emerald-600"
          >
            <Mail className="h-4 w-4 text-emerald-500" aria-hidden="true" />
            {CAREERS_EMAIL}
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function Careers() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={cn('overflow-x-clip')}>
      <ScrollProgress />
      <PageHero />
      <WhyJoin />
      <WhoWeWant />
      <Openings />
      <JoinCta />
    </main>
  );
}
