import { useLayoutEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, UserRound } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { NewsCard } from '@/components/news/NewsCard';
import { fadeUp, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import { NEWS_POSTS } from '@/data/content';

/* ════════════════════════════════════════════════════════════════════════
   Newsroom article — full reading view for a single press release / update
   (`/newsroom/:slug`). Mirrors the blog article layout exactly: light theme,
   single emerald accent, generous reading measure, cover hero, prose body with
   sub-headings and pull-quotes, key takeaways, and related updates.
   ════════════════════════════════════════════════════════════════════════ */

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

/* ── Not-found fallback ──────────────────────────────────────────────────── */
function NotFound() {
  return (
    <main className="overflow-x-clip">
      <section className="section-py bg-white pt-[clamp(8rem,14vw,12rem)]">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <span className="eyebrow mx-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Not found
            </span>
            <h1 className="mt-6 text-[clamp(1.75rem,4vw,2.5rem)] font-light text-navy-900">
              We couldn’t find that update.
            </h1>
            <p className="mt-5 text-body-fluid text-navy-500">
              It may have moved or been retired. Explore the latest news instead.
            </p>
            <div className="mt-8">
              <Button href="/newsroom" variant="primary" size="lg" iconRight={<ArrowRight className="h-4 w-4" />}>
                Back to the newsroom
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function NewsroomArticle() {
  const { slug } = useParams<{ slug: string }>();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = useMemo(() => NEWS_POSTS.find((p) => p.slug === slug), [slug]);
  const related = useMemo(
    () => (post ? NEWS_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3) : []),
    [post],
  );

  if (!post) return <NotFound />;

  const hasAside = !!post.takeaways && post.takeaways.length > 0;

  return (
    <main className="overflow-x-clip">
      <ScrollProgress />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        aria-label={post.title}
        className="relative isolate overflow-hidden bg-white pb-[clamp(2rem,4vw,3rem)] pt-[clamp(6.5rem,11vw,10rem)]"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh-light" />
          <div className="absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black_5%,transparent_55%)]" />
        </div>

        <Container>
          <motion.div
            variants={staggerParent(0.1)}
            initial="hidden"
            animate="visible"
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp}>
              <Link
                to="/newsroom"
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-navy-500 transition-colors duration-300 hover:text-emerald-600"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                All news
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[1.5px] text-emerald-700">
                {post.category}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-[clamp(1.85rem,4.2vw,3rem)] font-light normal-case leading-[1.14] tracking-[-0.01em] text-navy-900 text-balance"
            >
              {post.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13.5px] font-medium text-navy-500"
            >
              <span className="inline-flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-white">
                  <UserRound className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold text-navy-900">{post.author}</span>
                  <span className="text-[12px] text-navy-400">{post.authorRole}</span>
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                {post.readTime}
              </span>
            </motion.div>
          </motion.div>

          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-[clamp(2rem,4vw,3rem)] overflow-hidden rounded-[clamp(1rem,2vw,2rem)] border border-navy-100 bg-navy-50 shadow-glass"
          >
            <img
              src={post.image}
              alt=""
              decoding="async"
              width={2400}
              height={1000}
              className="aspect-[16/10] w-full object-cover sm:aspect-[16/9] lg:aspect-[21/9] 2xl:aspect-[24/8]"
            />
          </motion.div>
        </Container>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <article className="section-py bg-white">
        <Container>
          <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-12">
            {/* Main column */}
            <div className={hasAside ? 'lg:col-span-8' : 'lg:col-span-12'}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[68ch] text-[clamp(1.1rem,1.5vw,1.4rem)] font-light leading-[1.7] text-navy-700 text-pretty"
              >
                {post.intro}
              </motion.p>

              <div className="mt-10 flex flex-col gap-10">
                {post.sections.map((section, i) => (
                  <motion.section
                    key={section.heading ?? i}
                    variants={staggerParent(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                  >
                    {section.heading && (
                      <motion.h2
                        variants={fadeUp}
                        className="mb-4 text-[clamp(1.3rem,2vw,1.75rem)] font-semibold leading-[1.25] text-navy-900 text-balance"
                      >
                        {section.heading}
                      </motion.h2>
                    )}
                    {section.paragraphs.map((para, pi) => (
                      <motion.p
                        key={pi}
                        variants={fadeUp}
                        className="mb-5 max-w-[72ch] text-[clamp(1rem,1.2vw,1.18rem)] leading-[1.9] text-navy-600 text-pretty last:mb-0"
                      >
                        {para}
                      </motion.p>
                    ))}
                    {section.quote && (
                      <motion.blockquote
                        variants={fadeUp}
                        className="mt-7 max-w-[60ch] border-l-2 border-emerald-400 pl-6 text-[clamp(1.15rem,1.7vw,1.55rem)] font-light italic leading-[1.5] text-navy-800 text-balance"
                      >
                        “{section.quote}”
                      </motion.blockquote>
                    )}
                  </motion.section>
                ))}
              </div>
            </div>

            {/* Sidebar — sticky key highlights */}
            {hasAside && (
              <aside className="lg:col-span-4">
                <motion.div
                  variants={staggerParent(0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT_ONCE}
                  className="rounded-[1.5rem] border border-navy-100 bg-navy-50/50 p-[clamp(1.5rem,2.5vw,2.25rem)] lg:sticky lg:top-28"
                >
                  <motion.h2
                    variants={fadeUp}
                    className="text-[11px] font-extrabold uppercase tracking-[2px] text-emerald-700"
                  >
                    Key highlights
                  </motion.h2>
                  <ul className="mt-5 flex flex-col gap-3.5">
                    {post.takeaways!.map((t) => (
                      <motion.li key={t} variants={fadeUp} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-[clamp(0.95rem,1.1vw,1.08rem)] leading-[1.7] text-navy-700">
                          {t}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </aside>
            )}
          </div>

          {/* Foot CTA — full width */}
          <div className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-col items-start justify-between gap-5 border-t border-navy-100 pt-8 sm:flex-row sm:items-center">
            <Link
              to="/newsroom"
              className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to all news
            </Link>
            <Button href="/#contact" variant="primary" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
              Media enquiries
            </Button>
          </div>
        </Container>
      </article>

      {/* ── Related ───────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section aria-label="More news" className="section-py overflow-x-clip bg-navy-50/40">
          <Container>
            <motion.div
              variants={staggerParent(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="mb-[clamp(1.5rem,3vw,2.5rem)] flex items-end justify-between gap-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-[clamp(1.5rem,3vw,2rem)] font-normal leading-[1.15] text-navy-900"
              >
                More news
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link
                  to="/newsroom"
                  className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-navy-700 transition-colors duration-300 hover:text-emerald-600"
                >
                  View all
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerParent(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((p) => (
                <NewsCard key={p.slug} post={p} />
              ))}
            </motion.div>
          </Container>
        </section>
      )}
    </main>
  );
}
