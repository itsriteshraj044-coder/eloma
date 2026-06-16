import { useLayoutEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { EASE_PREMIUM, fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { NEWSROOM, NEWSROOM_CATEGORIES, NEWS_POSTS } from '@/data/content';
import type { BlogPost } from '@/types';

/* ════════════════════════════════════════════════════════════════════════
   Newsroom — official announcements, press releases & media resources.

   Design and behaviour mirror the Blog dashboard exactly: a tall centred hero
   with a huge two-line uppercase headline (second line in emerald) over a
   faint → watermark; a dark navy "Latest Release" band holding a white split
   card; a filterable 3-column grid of cards; and a subscribe band. Only the
   copy and the `/newsroom/:slug` link targets differ. Motion stays on
   transform/opacity only.
   ════════════════════════════════════════════════════════════════════════ */

/* Featured first, then the rest in source order. */
const ORDERED = [...NEWS_POSTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

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

/* ── Tiny dotted meta row: date · read time ──────────────────────────────── */
function MetaRow({ post, light = false }: { post: BlogPost; light?: boolean }) {
  const text = light ? 'text-white/45' : 'text-navy-400';
  const dot = light ? 'bg-white/30' : 'bg-navy-200';
  return (
    <div className={cn('flex flex-wrap items-center gap-2.5 text-[11px] font-semibold', text)}>
      <span>{post.date}</span>
      <span className={cn('h-[3px] w-[3px] shrink-0 rounded-full', dot)} aria-hidden="true" />
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {post.readTime}
      </span>
    </div>
  );
}

/* ── 1 · Hero ─────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      aria-label="Eloma Group newsroom"
      className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden bg-white px-6 pb-16 pt-[clamp(7rem,12vw,10rem)] text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-mesh-light" />
        <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_65%)]" />
        {/* Giant faint arrow watermark — bottom-right */}
        <span className="absolute -right-4 bottom-[4%] select-none text-[clamp(180px,26vw,360px)] font-black leading-none tracking-[-0.1em] text-navy-900/[0.022]">
          →
        </span>
      </div>

      <motion.div variants={staggerParent(0.12)} initial="hidden" animate="visible" className="flex flex-col items-center">
        <motion.span
          variants={fadeUp}
          className="mb-10 inline-flex items-center gap-2 rounded-full border-[1.5px] border-navy-900/15 px-[18px] py-[7px] text-[11px] font-extrabold uppercase tracking-[2.5px] text-navy-900"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#3CB98C]" />
          {NEWSROOM.eyebrow}
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[1.08] tracking-[0.01em] text-navy-900"
        >
          News, Announcements
          <br />
          <span className="text-emerald-500">&amp; Press Releases</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-[34rem] text-[clamp(14px,1.35vw,17px)] leading-[1.85] text-navy-500 text-pretty"
        >
          {NEWSROOM.subheading}
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="#topics"
          className="group mt-9 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[1.5px] text-navy-900 transition-colors duration-300 hover:text-emerald-600"
        >
          Browse all updates
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ── 2 · Latest Release — dark navy band, white split card ───────────────── */
function FeaturedPost() {
  const lead = ORDERED[0];
  return (
    <section
      id="latest"
      aria-label="Latest release"
      className="relative overflow-hidden bg-navy-800 py-[clamp(3.5rem,8vw,7rem)]"
    >
      {/* dotted texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* emerald glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-emerald-500/15 blur-3xl"
      />

      <Container className="relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-9 flex items-center gap-3"
        >
          <span className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-white/35">
            Latest Release
          </span>
          <span className="h-0.5 w-7 rounded-full bg-white/15" aria-hidden="true" />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="group grid overflow-hidden rounded-[1.75rem] bg-white shadow-glass-lg lg:grid-cols-[1fr_22rem]"
        >
          <div className="flex flex-col justify-center p-[clamp(2rem,4vw,3.5rem)]">
            <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[1.5px] text-emerald-700">
              {lead.category}
            </span>

            <h2 className="mt-5 text-[clamp(1.45rem,2.8vw,2.15rem)] font-semibold leading-[1.18] tracking-[0.01em] text-navy-900">
              <Link to={`/newsroom/${lead.slug}`} className="transition-colors duration-300 hover:text-emerald-700">
                {lead.title}
              </Link>
            </h2>

            <p className="mt-4 max-w-xl text-[clamp(13px,1vw,15px)] leading-[1.8] text-navy-500 text-pretty">
              {lead.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <MetaRow post={lead} />
              <Link
                to={`/newsroom/${lead.slug}`}
                className="group/cta inline-flex shrink-0 items-center gap-2 text-[13px] font-bold uppercase tracking-[1px] text-navy-900 transition-colors duration-300 hover:text-emerald-600"
              >
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                Read More
              </Link>
            </div>
          </div>

          <Link to={`/newsroom/${lead.slug}`} className="relative block min-h-[14rem] overflow-hidden bg-navy-50 lg:order-last">
            <img
              src={lead.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={880}
              height={760}
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
            />
          </Link>
        </motion.article>
      </Container>
    </section>
  );
}

/* ── Article row — editorial press-feed layout ───────────────────────────── */
function ArticleRow({ post, index }: { post: BlogPost; index: number }) {
  const to = `/newsroom/${post.slug}`;
  return (
    <article className="group relative">
      <Link
        to={to}
        aria-label={post.title}
        className="grid grid-cols-1 items-center gap-5 py-[clamp(1.5rem,3vw,2.5rem)] sm:grid-cols-[auto_1fr_auto] sm:gap-7 lg:gap-10"
      >
        {/* Index + thumbnail */}
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="hidden w-10 shrink-0 text-[13px] font-bold tabular-nums tracking-[1px] text-navy-300 transition-colors duration-300 group-hover:text-emerald-500 lg:block"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="relative h-[clamp(5rem,9vw,6.5rem)] w-[clamp(7.5rem,14vw,11rem)] shrink-0 overflow-hidden rounded-xl bg-navy-50">
            <img
              src={post.image}
              alt=""
              loading="lazy"
              decoding="async"
              width={640}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.07]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-700">
              {post.category}
            </span>
            <MetaRow post={post} />
          </div>
          <h3 className="mt-2.5 text-[clamp(1.15rem,2vw,1.6rem)] font-semibold leading-[1.2] tracking-[-0.01em] text-navy-900 transition-colors duration-300 group-hover:text-emerald-700 text-balance">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-[60ch] text-[clamp(13px,1vw,14.5px)] leading-[1.7] text-navy-500 text-pretty">
            {post.excerpt}
          </p>
        </div>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-navy-200 text-navy-900 transition-all duration-500 ease-premium group-hover:border-emerald-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 sm:grid"
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </article>
  );
}

/* ── 3 · Filterable grid ─────────────────────────────────────────────────── */
function ArticleGrid() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string>('All');
  const filters = useMemo(() => ['All', ...NEWSROOM_CATEGORIES], []);

  const posts = useMemo(
    () => (active === 'All' ? ORDERED : ORDERED.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="topics" aria-label="All updates" className="section-py overflow-x-clip bg-white">
      <Container>
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col gap-6 border-b border-navy-100 pb-7 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-emerald-700"
            >
              {NEWSROOM.topicsHeading}
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-[clamp(1.6rem,3.5vw,2.4rem)] font-bold uppercase leading-[1.1] tracking-[0.01em] text-navy-900"
            >
              All <span className="text-emerald-500">Updates</span>
            </motion.h2>
          </div>

          {/* Filter chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  aria-pressed={isActive}
                  className={cn(
                    'relative rounded-full border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[1px] transition-colors duration-300',
                    isActive
                      ? 'border-emerald-300 text-emerald-600'
                      : 'border-navy-200 text-navy-500 hover:border-emerald-300 hover:text-emerald-700',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="news-filter-pill"
                      className="absolute inset-0 rounded-full bg-emerald-50"
                      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="mt-[clamp(1rem,2.5vw,2rem)] flex flex-col divide-y divide-navy-100 border-b border-navy-100"
        >
          <AnimatePresence mode="popLayout">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                layout={!reduced}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                className="transition-colors duration-300 hover:bg-navy-50/40"
              >
                <ArticleRow post={post} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── 4 · Subscribe ───────────────────────────────────────────────────────── */
function Subscribe() {
  return (
    <section aria-label="Subscribe" className="relative overflow-hidden bg-navy-800 py-[clamp(3rem,7vw,6rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-[-8rem] h-[30rem] w-[30rem] rounded-full bg-emerald-500/15 blur-3xl"
      />
      <Container className="relative">
        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-extrabold uppercase tracking-[2.5px] text-emerald-300"
          >
            Stay in the loop
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold leading-[1.12] tracking-[0.01em] text-white"
          >
            Group news, straight to your inbox.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-lg text-[clamp(13px,1.1vw,15px)] leading-[1.8] text-white/55">
            Get our latest press releases, announcements, and milestones across logistics,
            technology, travel, and customer experience — delivered occasionally, never noisily.
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="news-email" className="sr-only">
              Email address
            </label>
            <div className="relative flex-1">
              <Mail
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                aria-hidden="true"
              />
              <input
                id="news-email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-full border border-white/15 bg-white/5 py-3.5 pl-11 pr-4 text-[14px] text-white placeholder:text-white/40 focus:border-emerald-400"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" iconRight={<ArrowUpRight className="h-4 w-4" />}>
              Subscribe
            </Button>
          </motion.form>
        </motion.div>
      </Container>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function Newsroom() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="overflow-x-clip">
      <ScrollProgress />
      <Hero />
      <FeaturedPost />
      <ArticleGrid />
      <Subscribe />
    </main>
  );
}
