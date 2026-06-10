import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Quote, Users, Globe2, LayoutGrid, Lightbulb, ArrowRight, X as Cross } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCountUp } from '@/hooks/useCountUp';
import { LEADERSHIP, STATS } from '@/data/content';
import { fadeUp, scaleIn, staggerParent, VIEWPORT_ONCE } from '@/lib/motion';
import type { Stat } from '@/types';

const STAT_ICONS = [Users, Globe2, LayoutGrid, Lightbulb] as const;

function StatItem({ stat, Icon }: { stat: Stat; Icon: (typeof STAT_ICONS)[number] }) {
  const { ref, display } = useCountUp(stat.value, { decimals: stat.decimals });
  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col items-center gap-2.5 text-center"
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-glow-emerald sm:h-14 sm:w-14 3xl:h-16 3xl:w-16 3xl:rounded-3xl">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 3xl:h-8 3xl:w-8" aria-hidden="true" />
      </span>
      <p className="text-display-md font-extrabold text-gradient">
        {stat.prefix}
        <span ref={ref}>{display}</span>
        {stat.suffix}
      </p>
      <p className="text-sm font-medium text-navy-500 3xl:text-base 4xl:text-lg">{stat.label}</p>
    </motion.div>
  );
}

/** About Us — company stats, leadership story, and founder testimonial. */
export function About() {
  const { testimonial } = LEADERSHIP;
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = figureRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      tl.from('.fc-quote', { y: 28, opacity: 0, duration: 0.7 })
        .from('.fc-bar', { scaleX: 0, transformOrigin: 'left center', duration: 0.5 }, '-=0.35')
        .from('.fc-meta', { y: 18, opacity: 0, duration: 0.5 }, '-=0.25')
        .from('.fc-dot', { scale: 0, opacity: 0, stagger: 0.08, duration: 0.35 }, '-=0.2')
        .from('.fc-cta', { y: 18, opacity: 0, duration: 0.5 }, '-=0.15')
        .from('.fc-photo', { scale: 0.82, opacity: 0, duration: 0.9, ease: 'back.out(1.5)' }, '-=0.7')
        .from('.fc-bars-deco span', { scaleX: 0, transformOrigin: 'left center', stagger: 0.06, duration: 0.4 }, '-=0.6')
        .from('.fc-dotgrid span', { scale: 0, stagger: 0.012, duration: 0.3 }, '-=0.5')
        .from('.fc-cross', { rotate: -90, opacity: 0, scale: 0, stagger: 0.05, duration: 0.4 }, '-=0.4');

      // Ambient looping motion
      gsap.to('.fc-dotgrid-inner', { y: -6, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.fc-dot-active', { opacity: 0.3, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.fc-photo', { y: -8, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });
      gsap.to('.fc-glow', { scale: 1.18, opacity: 0.55, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.fc-blob', { rotation: '+=4', duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.fc-cross', { rotation: '+=360', duration: 12, repeat: -1, ease: 'linear', stagger: { each: 0.4, from: 'random' } });
      gsap.to('.fc-bars-deco span', { x: 8, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.15 });
      gsap.to('.fc-tri', { rotation: '+=20', duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.fc-stripe', { backgroundPositionX: 24, duration: 1.5, repeat: -1, ease: 'linear' });
      gsap.to('.fc-dotgrid', { rotation: 360, duration: 40, repeat: -1, ease: 'linear', transformOrigin: 'center center' });

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            tl.play();
            io.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(el);

      // Subtle 3D tilt on pointer move
      const card = el.querySelector<HTMLElement>('.fc-tilt');
      let onMove: ((e: PointerEvent) => void) | undefined;
      let onLeave: (() => void) | undefined;
      if (card) {
        const rotateX = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const rotateY = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          rotateY(px * 6);
          rotateX(py * -6);
        };
        onLeave = () => {
          rotateX(0);
          rotateY(0);
        };
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
      }

      return () => {
        io.disconnect();
        if (card && onMove && onLeave) {
          card.removeEventListener('pointermove', onMove);
          card.removeEventListener('pointerleave', onLeave);
        }
      };
    }, figureRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      aria-label="About us"
      className="section-py relative overflow-hidden bg-white"
    >
      {/* ── Ambient — drifting grid + moving gradient blobs ─────────── */}
      <div
        className="bg-grid-drift pointer-events-none absolute inset-0 bg-grid-faint bg-grid-32 opacity-[0.35]"
        aria-hidden="true"
      />
      <motion.div
        className="will-transform pointer-events-none absolute -bottom-20 left-0 aspect-[5/4] w-[clamp(280px,32vw,500px)] rounded-full bg-navy-50/40 blur-[90px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="will-transform pointer-events-none absolute -top-24 right-0 aspect-square w-[clamp(240px,28vw,440px)] rounded-full bg-emerald-100/40 blur-[100px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="will-transform pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[clamp(200px,24vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-100/30 blur-[110px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="About Us"
          title={
            <>
              Driven by <span className="text-emerald-500">Visionary Leadership</span>
            </>
          }
          description={LEADERSHIP.subheading}
          descriptionClassName="max-w-none w-full"
        />

        {/* ── Stats row ───────────────────────────────────────────── */}
        <motion.div
          variants={staggerParent(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-14 grid grid-cols-2 gap-5 rounded-3xl border border-navy-100 bg-white px-5 py-8 shadow-glass sm:grid-cols-4 sm:gap-6 sm:px-10 sm:py-10 3xl:rounded-[2rem] 3xl:px-14 3xl:py-14 4xl:px-18 4xl:py-16"
        >
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} Icon={STAT_ICONS[i % STAT_ICONS.length]} />
          ))}
        </motion.div>

        {/* ── Leadership copy ──────────────────────────────────────── */}
        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-16 flex flex-col gap-5 3xl:mt-20"
        >
          {LEADERSHIP.body.map((paragraph) => (
            <motion.p
              key={paragraph.slice(0, 28)}
              variants={fadeUp}
              className="w-full max-w-none text-body-fluid text-navy-500 text-pretty"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* ── Founder quote ────────────────────────────────────────── */}
        <div className="mt-10 [perspective:1200px] 3xl:mt-12">
        <motion.figure
          ref={figureRef}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="fc-tilt fc-card-stroke relative rounded-3xl p-[2px] [transform-style:preserve-3d] 3xl:rounded-[2rem]"
        >
          <div className="relative overflow-hidden rounded-3xl bg-white p-8 sm:p-12 3xl:rounded-[2rem] 3xl:p-16">
          {/* Big corner triangles */}
          <div className="fc-tri will-transform pointer-events-none absolute -bottom-16 -left-16 z-0 h-48 w-48 rotate-45 bg-navy-50" aria-hidden="true" />
          <div className="fc-tri will-transform pointer-events-none absolute -right-12 -top-12 z-0 h-32 w-32 rotate-45 bg-navy-50" aria-hidden="true" />

          <div className="relative z-10 grid items-center gap-12 sm:grid-cols-2 sm:gap-10">
            {/* Left: quote + CTA, centered */}
            <div className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
              {/* Cross marks — top-left */}
              <div className="pointer-events-none absolute -left-1 -top-6 grid grid-cols-2 gap-1.5 sm:left-0" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Cross key={i} className="fc-cross h-3 w-3 text-navy-300" />
                ))}
              </div>

              <Quote
                className="h-8 w-8 text-emerald-500 3xl:h-10 3xl:w-10"
                aria-hidden="true"
              />
              <blockquote className="fc-quote mt-4 w-full text-[clamp(1.125rem,1.8vw,1.625rem)] font-medium leading-snug text-navy-900 text-pretty">
                "{testimonial.quote}"
              </blockquote>
              <span className="fc-bar will-transform mt-5 block h-1.5 w-20 rounded-full bg-navy-800" aria-hidden="true" />
              <figcaption className="fc-meta mt-5">
                <p className="text-meta-value font-bold text-navy-900">{testimonial.name}</p>
                <p className="mt-1 text-body-fluid italic text-navy-500">{testimonial.role}</p>
              </figcaption>

              {/* Dot pagination */}
              <div className="mt-6 flex items-center gap-2" aria-hidden="true">
                <span className="fc-dot fc-dot-active will-transform h-2 w-2 rounded-full bg-navy-900" />
                <span className="fc-dot will-transform h-2 w-2 rounded-full bg-navy-200" />
                <span className="fc-dot will-transform h-2 w-2 rounded-full bg-navy-200" />
                <span className="fc-dot will-transform h-2 w-2 rounded-full bg-navy-200" />
              </div>

              {/* CTA — animated gradient stroke, no fill */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="fc-cta fc-cta-stroke will-transform relative mt-7 inline-flex items-center justify-center gap-2 rounded-full p-[2px]"
              >
                <span className="relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-body-fluid font-bold uppercase tracking-wide text-navy-900 transition-colors duration-300 group-hover:text-emerald-600">
                  Contact Us
                  <motion.span
                    className="will-transform grid place-items-center"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                </span>
              </motion.a>
            </div>

            {/* Right: photo blob with decorative pattern */}
            <div className="relative mx-auto aspect-square w-full max-w-xs sm:max-w-md">
              {/* Horizontal bars */}
              <div className="fc-bars-deco pointer-events-none absolute -left-1 top-2 z-0 flex flex-col gap-1.5 sm:top-4" aria-hidden="true">
                {[1, 0.75, 0.55, 0.35].map((o, i) => (
                  <span key={i} className="will-transform h-1.5 w-16 rounded-full bg-navy-100 sm:w-20" style={{ opacity: o }} />
                ))}
              </div>

              {/* Dot grid — top-right, outside blob */}
              <div className="fc-dotgrid pointer-events-none absolute -right-2 -top-2 z-0 grid grid-cols-6 gap-1.5" aria-hidden="true">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-navy-200" />
                ))}
              </div>

              {/* Blob background */}
              <div className="fc-blob will-transform absolute inset-0 z-10 overflow-hidden rounded-[2rem] bg-navy-700 rotate-6 sm:rounded-[2.5rem]">
                {/* Dot pattern */}
                <div className="fc-dotgrid fc-dotgrid-inner will-transform pointer-events-none absolute right-3 top-3 z-20 grid grid-cols-5 gap-2 sm:right-4 sm:top-4 sm:grid-cols-6" aria-hidden="true">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="h-1 w-1 rounded-full bg-emerald-400/50" />
                  ))}
                </div>
              </div>

              {/* Glow pulse behind photo */}
              <div
                className="fc-glow will-transform pointer-events-none absolute inset-[6%] z-20 rounded-full bg-emerald-400/40 blur-2xl"
                aria-hidden="true"
              />

              {/* Circular photo */}
              <div className="fc-photo will-transform absolute inset-[6%] z-30 overflow-hidden rounded-full ring-[6px] ring-white sm:ring-8">
                <img
                  src="/Rj.png"
                  alt={testimonial.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Diagonal stripes */}
              <div
                className="fc-stripe will-transform pointer-events-none absolute -bottom-3 left-8 z-0 h-5 w-28 rounded-sm"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(135deg, #9fb6cf 0px, #9fb6cf 6px, transparent 6px, transparent 12px)',
                  backgroundSize: '24px 24px',
                }}
                aria-hidden="true"
              />

              {/* Dot grid — bottom */}
              <div className="fc-dotgrid pointer-events-none absolute -bottom-4 left-1/3 z-0 grid grid-cols-3 gap-1.5" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="h-1 w-1 rounded-full bg-navy-200" />
                ))}
              </div>

              {/* Cross marks — bottom-right */}
              <div className="pointer-events-none absolute -bottom-2 -right-1 grid grid-cols-2 gap-1.5" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Cross key={i} className="fc-cross h-3 w-3 text-navy-300" />
                ))}
              </div>
            </div>
          </div>
          </div>
        </motion.figure>
        </div>
      </Container>
    </section>
  );
}
