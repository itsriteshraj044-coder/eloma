import { useLayoutEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, Mail, PenLine, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { BlogCard } from '@/components/blog/BlogCard';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { BLOG, BLOG_CATEGORIES, BLOG_POSTS } from '@/data/content';

/* ════════════════════════════════════════════════════════════════════════
   Blog — Industry Insights, Trends & Perspectives. Light theme, single
   emerald accent, light-weight non-uppercase headings matching Our Partners
   / About Us. A featured editorial lead, a filterable topic grid, and a
   newsletter close. Motion respects prefers-reduced-motion and only animates
   transform / opacity for 120fps scrolling.
   ════════════════════════════════════════════════════════════════════════ */

const H2 = 'text-[clamp(1.75rem,5vw,2.5rem)] font-normal normal-case leading-[1.15] text-navy-900 text-balance';

const FEATURED = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];

/* ── Reading-progress bar (shared pattern) ───────────────────────────────── */
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

/* ── 1 · Hero ─────────────────────────────────────────────────────────────── */
function PageHero() {
  return (
    <section
      aria-label="Eloma Group blog"
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
            {BLOG.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[clamp(2rem,5.4vw,3.4rem)] font-light normal-case leading-[1.12] tracking-[-0.01em] text-navy-900 text-balance"
          >
            Industry Insights, Trends &{' '}
            <span className="font-normal text-emerald-500">Perspectives</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            {BLOG.subheading}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Button href="#latest" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Read the latest
            </Button>
            <a
              href="#topics"
              className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              Browse topics
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 2 · Intro band ──────────────────────────────────────────────────────── */
function Intro() {
  return (
    <section aria-label="About the blog" className="section-py relative overflow-hidden bg-white">
      <Container>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {BLOG.introHeading}
            </motion.span>
            <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
              {BLOG.introLead}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:pt-2"
          >
            <motion.p
              variants={fadeUp}
              className="text-[clamp(1rem,1.25vw,1.18rem)] leading-[1.9] text-navy-500 text-pretty"
            >
              {BLOG.introBody}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ── 3 · Featured editorial lead ─────────────────────────────────────────── */
function Featured() {
  return (
    <section id="latest" aria-label="Featured article" className="section-py relative overflow-hidden bg-navy-50/40">
      <Container>
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-[clamp(1.5rem,3vw,2.5rem)] flex items-end justify-between gap-6"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Featured insight
          </motion.span>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="group grid overflow-hidden rounded-[2rem] border border-navy-100 bg-white shadow-glass lg:grid-cols-2"
        >
          <Link to={`/blog/${FEATURED.slug}`} className="relative block aspect-[16/11] overflow-hidden bg-navy-50 lg:aspect-auto">
            <img
              src={FEATURED.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={1600}
              height={1100}
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
            />
          </Link>

          <div className="flex flex-col justify-center p-[clamp(1.75rem,3.5vw,3.5rem)]">
            <div className="flex items-center gap-3 text-[12px] font-medium text-navy-400">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-700">
                {FEATURED.category}
              </span>
              <span>{FEATURED.date}</span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-navy-200" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {FEATURED.readTime}
              </span>
            </div>

            <h3 className="mt-5 text-[clamp(1.4rem,2.4vw,2rem)] font-normal leading-[1.2] text-navy-900 text-balance">
              <Link to={`/blog/${FEATURED.slug}`} className="transition-colors duration-300 hover:text-emerald-700">
                {FEATURED.title}
              </Link>
            </h3>

            <p className="mt-5 text-[clamp(0.95rem,1.15vw,1.1rem)] leading-[1.85] text-navy-500 text-pretty">
              {FEATURED.excerpt}
            </p>

            <Link
              to={`/blog/${FEATURED.slug}`}
              className="group/cta mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-[14px] font-bold text-white transition-colors duration-300 hover:bg-navy-700"
            >
              Read full article
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </Link>
          </div>
        </motion.article>
      </Container>
    </section>
  );
}

/* ── 4 · Topic grid with filter ──────────────────────────────────────────── */
function TopicGrid() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string>('All');
  const filters = useMemo(() => ['All', ...BLOG_CATEGORIES], []);

  const posts = useMemo(
    () => (active === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="topics" aria-label="Blog topics" className="section-py overflow-x-clip bg-white">
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
            {BLOG.topicsHeading}
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-5 ${H2}`}>
            Explore by what matters to your business
          </motion.h2>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          variants={staggerParent(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-9 flex flex-wrap gap-2.5"
        >
          {filters.map((f) => {
            const isActive = active === f;
            return (
              <motion.button
                key={f}
                variants={fadeUp}
                type="button"
                onClick={() => setActive(f)}
                aria-pressed={isActive}
                className={cn(
                  'relative rounded-full border px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-300',
                  isActive
                    ? 'border-navy-900 text-white'
                    : 'border-navy-100 text-navy-600 hover:border-emerald-200 hover:text-emerald-700',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="blog-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-navy-900"
                    transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                  />
                )}
                {f}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="mt-[clamp(2rem,4vw,3rem)] grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                key={post.slug}
                layout={!reduced}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 5 · Newsletter close ────────────────────────────────────────────────── */
function Newsletter() {
  return (
    <section aria-label="Subscribe" className="section-py relative overflow-hidden bg-navy-50/40">
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
            Stay future-ready
          </motion.span>
          <motion.h2 variants={fadeUp} className={`mt-6 ${H2}`}>
            Insights worth your inbox.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-body-fluid text-navy-500 text-pretty">
            Get new perspectives on logistics, technology, business growth, and sustainability —
            delivered occasionally, never noisily.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="blog-email" className="sr-only">
              Email address
            </label>
            <div className="relative flex-1">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300"
                aria-hidden="true"
              />
              <input
                id="blog-email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-full border border-navy-100 bg-white py-3.5 pl-11 pr-4 text-[14px] text-navy-900 placeholder:text-navy-300 focus:border-emerald-300"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
              Subscribe
            </Button>
          </motion.form>

          <motion.p variants={fadeUp} className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-navy-400">
            <PenLine className="h-3.5 w-3.5" aria-hidden="true" />
            No spam — just ideas, trends, and perspectives.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Blog() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-x-clip">
      <ScrollProgress />
      <PageHero />
      <Intro />
      <Featured />
      <TopicGrid />
      <Newsletter />
    </main>
  );
}
