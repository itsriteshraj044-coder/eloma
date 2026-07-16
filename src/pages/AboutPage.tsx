import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Layers, Globe2, Sprout, Target, Cpu, Rocket, ShieldCheck } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { PageCTA, NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const META = [
  { k: 'Established', v: 'Australia' },
  { k: 'Model', v: 'Multi-industry' },
  { k: 'Horizon', v: 'Long-term' },
]

const CHAPTERS = [
  { no: '01', Icon: Compass, tag: 'Vision-led', img: 'photo-1470071459604-3b5ec3a7fe05', alt: 'A long road toward the horizon',
    title: 'Direction first, decades long.', text: 'Every company we hold is built on a clear, long-term horizon - measured in decades, not quarters. Direction comes first; everything else follows from it.' },
  { no: '02', Icon: Layers, tag: 'Shared strength', img: 'photo-1487958449943-2429e8be8625', alt: 'Modern architectural structure',
    title: 'Independent in craft, united in capability.', text: 'Common infrastructure, governance and people let each business move faster on a stronger foundation - independent in craft, united in capability.' },
  { no: '03', Icon: Globe2, tag: 'Global reach', img: 'photo-1451187580459-43490279c0fa', alt: 'Earth from space at night',
    title: 'One ecosystem across eight markets.', text: 'From Australia to Asia, Europe, the Middle East and North America - an interconnected ecosystem operating as one across eight markets.' },
  { no: '04', Icon: Sprout, tag: 'Responsible growth', img: 'photo-1518495973542-4542c06a5843', alt: 'A large tree with deep roots',
    title: 'We grow with intent.', text: 'Sustainable, ethical and built to create lasting value for the stakeholders and communities we serve - growth measured by what endures.' },
]

const FIGS = [
  { n: '5', l: 'Companies' },
  { n: '8', l: 'Countries' },
  { n: '4', l: 'Verticals' },
  { n: '1', l: 'Vision' },
]

const VALUES = [
  { no: '01', Icon: Target, t: 'Strategy', d: 'A clear direction set across every vertical, and held to.' },
  { no: '02', Icon: Cpu, t: 'Technology', d: 'Modern systems that scale with the group as it grows.' },
  { no: '03', Icon: Rocket, t: 'Execution', d: 'Real-world delivery - on the ground, on time, at scale.' },
  { no: '04', Icon: ShieldCheck, t: 'Trust', d: 'Relationships that compound in value over the long term.' },
]

export function AboutPage() {
  const reduce = useReducedMotion()
  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, delay: d, ease: EASE },
  })

  return (
    <div style={{ overflowX: 'clip', background: '#fff' }}>
      <Header />

      {/* ── 1 · Editorial hero — copy + framed portrait image ── */}
      <section className="ab-hero">
        <div className="ab-hero-in">
          <div className="ab-hero-copy">
            <motion.p className="ab-eyebrow" initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <span className="ab-eyebrow-dot" />About Eloma Group
            </motion.p>
            <motion.h1 className="ab-hero-h1" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
              A house of <span className="g">companies,</span><br />one shared horizon.
            </motion.h1>
            <motion.p className="ab-hero-lead" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}>
              Eloma Group is an Australian multi-industry holding company - building, supporting and scaling modern businesses across technology, logistics, customer experience, travel and security.
            </motion.p>
            <motion.ul className="ab-meta" initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}>
              {META.map((m) => (
                <li className="ab-meta-row" key={m.k}>
                  <span className="ab-meta-k">{m.k}</span>
                  <span className="ab-meta-v">{m.v}</span>
                </li>
              ))}
            </motion.ul>
          </div>
          <motion.div className="ab-hero-media" initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.95, ease: EASE, delay: 0.14 }}>
            <img src={img('photo-1431540015161-0bf868a2d407', 1100)} alt="Eloma Group boardroom" decoding="async" />
            <span className="ab-hero-badge"><span className="ab-hero-badge-n">EST.</span>Australia</span>
          </motion.div>
        </div>
      </section>

      {/* ── 2 · Manifesto ── */}
      <section className="ab-mani">
        <motion.p className="ab-mani-label" {...rise()}>Our belief</motion.p>
        <motion.p className="ab-mani-text" {...rise(0.08)}>
          Businesses grow stronger when they <span className="g">share roots.</span> Common values, shared infrastructure and a long view - so each company makes the others <span className="g">stronger.</span>
        </motion.p>
      </section>

      {/* ── 3 · Alternating image chapters ── */}
      <section className="ab-ch">
        <div className="ab-ch-in">
          <motion.div className="ab-ch-head" {...rise()}>
            <p className="ab-kicker"><span className="ab-kicker-no">/ 01</span> The approach</p>
            <h2 className="ab-ch-title">How the group <span className="g">works.</span></h2>
          </motion.div>
          <div className="ab-ch-rows">
            {CHAPTERS.map((c, i) => (
              <motion.article key={c.no} className={`ab-row${i % 2 ? ' rev' : ''}`}
                initial={reduce ? false : { opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: EASE }}>
                <div className="ab-row-media">
                  <img src={img(c.img, 1000)} alt={c.alt} decoding="async" loading="lazy" />
                  <span className="ab-row-no">{c.no}</span>
                </div>
                <div className="ab-row-copy">
                  <span className="ab-row-ic"><c.Icon size={22} strokeWidth={1.7} /></span>
                  <p className="ab-row-tag">{c.tag}</p>
                  <h3 className="ab-row-h">{c.title}</h3>
                  <p className="ab-row-p">{c.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · Editorial figures ── */}
      <section className="ab-figs-sec">
        <div className="ab-figs-in">
          <motion.p className="ab-kicker" {...rise()}><span className="ab-kicker-no">/ 02</span> At a glance</motion.p>
          <div className="ab-figs">
            {FIGS.map((f, i) => (
              <motion.div key={f.l} className="ab-fig"
                initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}>
                <span className="ab-fig-n">{f.n}</span>
                <span className="ab-fig-l">{f.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · Values with icons ── */}
      <section className="ab-val-sec">
        <div className="ab-val-in">
          <motion.div className="ab-val-head" {...rise()}>
            <p className="ab-kicker"><span className="ab-kicker-no">/ 03</span> What drives us</p>
            <h2 className="ab-val-h2">Four constants, <span className="g">held to.</span></h2>
          </motion.div>
          <div className="ab-vals">
            {VALUES.map((v, i) => (
              <motion.div key={v.t} className="ab-val"
                initial={reduce ? false : { opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}>
                <span className="ab-val-ic"><v.Icon size={22} strokeWidth={1.7} /></span>
                <span className="ab-val-no">{v.no}</span>
                <span className="ab-val-t">{v.t}</span>
                <span className="ab-val-d">{v.d}</span>
                <span className="ab-val-line" aria-hidden />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · Quote ── */}
      <section className="ab-quote-sec">
        <span className="ab-quote-glow" aria-hidden />
        <motion.blockquote className="ab-quote" initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, ease: EASE }}>
          <span className="ab-quote-mark" aria-hidden>“</span>
          We don’t chase the next quarter. We build businesses <span className="g">designed to last decades.</span>
          <footer className="ab-quote-by">Eloma Group - founding principle</footer>
        </motion.blockquote>
      </section>

      <PageCTA line1="Let's build" line2="something lasting." sub="Partner with a group engineered for the long term." buttonLabel="Get in Touch" />
      <FlyFooter />

      <style>{`
        .g { color:${GREEN}; }
        .ab-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .ab-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); }
        .ab-kicker { display:flex; align-items:center; gap:12px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${MUTED}; }
        .ab-kicker-no { color:${GREEN}; }

        /* 1 · Hero */
        .ab-hero { position:relative; overflow:hidden;
          background: radial-gradient(60% 60% at 92% 6%, rgba(60,185,140,0.1), transparent 58%), linear-gradient(180deg,#ffffff,#f3faf7);
          padding: clamp(112px,13vw,180px) clamp(24px,5vw,80px) clamp(56px,7vw,100px); }
        .ab-hero-in { position:relative; z-index:1; max-width:1760px; margin:0 auto; display:grid; grid-template-columns:1.02fr 0.98fr; gap:clamp(36px,5vw,80px); align-items:center; }
        .ab-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(40px,5.8vw,98px); line-height:1.0; letter-spacing:-0.04em; color:${NAVY}; margin:clamp(18px,2.2vw,28px) 0 0; }
        .ab-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.15vw,18px); color:${MUTED}; line-height:1.85; margin:clamp(20px,2.4vw,30px) 0 clamp(24px,3vw,34px); max-width:54ch; }
        .ab-meta { list-style:none; margin:0; padding:0; max-width:440px; }
        .ab-meta-row { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:clamp(11px,1.3vw,15px) 0; border-bottom:1px solid rgba(26,43,60,0.12); }
        .ab-meta-k { font-family:'Inter',sans-serif; font-size:12px; font-weight:600; letter-spacing:1px; text-transform:uppercase; color:${MUTED}; }
        .ab-meta-v { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(15px,1.3vw,19px); color:${NAVY}; letter-spacing:-0.01em; }
        .ab-hero-media { position:relative; }
        .ab-hero-media img { width:100%; aspect-ratio:4/3.5; object-fit:cover; display:block; border-radius:28px; box-shadow:0 50px 100px -52px rgba(19,41,61,0.55); }
        .ab-hero-badge { position:absolute; right:-14px; bottom:-18px; display:inline-flex; align-items:center; gap:8px; padding:14px 20px; background:${NAVY}; color:#fff; border-radius:16px; font-family:'Poppins',sans-serif; font-weight:600; font-size:14px; box-shadow:0 24px 44px -22px rgba(19,41,61,0.7); }
        .ab-hero-badge-n { font-family:'Inter',sans-serif; font-weight:800; font-size:11px; letter-spacing:1.5px; color:${GREEN}; }

        /* 2 · Manifesto */
        .ab-mani { background:#fff; max-width:1760px; margin:0 auto; padding: clamp(64px,9vw,150px) clamp(24px,5vw,80px); }
        .ab-mani-label { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; margin:0 0 clamp(22px,3vw,34px); }
        .ab-mani-text { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(26px,3.8vw,60px); line-height:1.28; letter-spacing:-0.025em; color:${NAVY}; margin:0; max-width:24ch; }

        /* 3 · Alternating chapters */
        .ab-ch { background:linear-gradient(180deg,#ffffff,#f3faf7); padding: clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .ab-ch-in { max-width:1760px; margin:0 auto; }
        .ab-ch-head { margin-bottom:clamp(36px,5vw,68px); }
        .ab-ch-title { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,58px); line-height:1.06; letter-spacing:-0.03em; color:${NAVY}; margin:16px 0 0; }
        .ab-ch-rows { display:flex; flex-direction:column; gap:clamp(40px,6vw,110px); }
        .ab-row { display:grid; grid-template-columns:1.05fr 0.95fr; gap:clamp(28px,4vw,80px); align-items:center; }
        .ab-row.rev .ab-row-media { order:2; }
        .ab-row-media { position:relative; overflow:hidden; border-radius:26px; box-shadow:0 44px 90px -50px rgba(19,41,61,0.5); }
        .ab-row-media img { width:100%; aspect-ratio:16/11; object-fit:cover; display:block; transition:transform 1s cubic-bezier(0.16,1,0.3,1); }
        .ab-row:hover .ab-row-media img { transform:scale(1.06); }
        .ab-row-no { position:absolute; left:20px; top:14px; font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(44px,5vw,84px); line-height:1; letter-spacing:-0.05em; color:rgba(255,255,255,0.9); text-shadow:0 10px 30px rgba(0,0,0,0.35); }
        .ab-row-ic { display:inline-flex; align-items:center; justify-content:center; width:54px; height:54px; border-radius:15px; background:rgba(60,185,140,0.12); color:${GREEN}; margin-bottom:18px; }
        .ab-row-tag { font-family:'Inter',sans-serif; font-weight:700; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:${GREEN}; margin:0 0 12px; }
        .ab-row-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(26px,3.2vw,46px); line-height:1.1; letter-spacing:-0.03em; color:${NAVY}; margin:0 0 clamp(12px,1.4vw,18px); max-width:18ch; }
        .ab-row-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.15vw,18px); line-height:1.82; color:${MUTED}; margin:0; max-width:52ch; }

        /* 4 · Figures */
        .ab-figs-sec { background:#fff; padding: clamp(56px,7vw,110px) clamp(24px,5vw,80px); }
        .ab-figs-in { max-width:1760px; margin:0 auto; }
        .ab-figs { display:grid; grid-template-columns:repeat(4,1fr); margin-top:clamp(28px,3.4vw,44px); border-top:1px solid rgba(26,43,60,0.14); }
        .ab-fig { padding:clamp(26px,3vw,46px) clamp(14px,1.6vw,28px) clamp(10px,1.4vw,18px) 0; }
        .ab-fig + .ab-fig { padding-left:clamp(18px,2vw,32px); border-left:1px solid rgba(26,43,60,0.1); }
        .ab-fig-n { display:block; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(54px,7vw,124px); line-height:0.84; letter-spacing:-0.05em; color:${NAVY}; }
        .ab-fig-l { display:block; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13px); letter-spacing:2px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(14px,1.6vw,22px); }

        /* 5 · Values */
        .ab-val-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding: clamp(56px,7vw,110px) clamp(24px,5vw,80px); }
        .ab-val-in { max-width:1760px; margin:0 auto; }
        .ab-val-head { margin-bottom:clamp(28px,3.4vw,44px); }
        .ab-val-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.2vw,58px); line-height:1.08; letter-spacing:-0.03em; color:${NAVY}; margin:16px 0 0; }
        .ab-vals { border-top:1px solid rgba(26,43,60,0.14); }
        .ab-val { position:relative; display:grid; grid-template-columns:64px 70px 0.5fr 1fr; gap:clamp(14px,2.2vw,36px); align-items:center; padding:clamp(22px,3vw,40px) clamp(8px,1.4vw,20px); border-bottom:1px solid rgba(26,43,60,0.12); transition:padding-left 0.45s cubic-bezier(0.16,1,0.3,1); }
        .ab-val:hover { padding-left:clamp(18px,2.4vw,40px); }
        .ab-val-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:14px; background:rgba(60,185,140,0.1); color:${GREEN}; transition:background 0.4s ease, color 0.4s ease; }
        .ab-val:hover .ab-val-ic { background:${GREEN}; color:#fff; }
        .ab-val-no { font-family:'Inter',sans-serif; font-weight:700; font-size:13px; letter-spacing:1px; color:${GREEN}; }
        .ab-val-t { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(22px,2.6vw,40px); letter-spacing:-0.03em; color:${NAVY}; line-height:1; transition:color 0.35s ease; }
        .ab-val:hover .ab-val-t { color:${GREEN}; }
        .ab-val-d { font-family:'Inter',sans-serif; font-size:clamp(14px,1.05vw,16.5px); line-height:1.7; color:${MUTED}; }
        .ab-val-line { position:absolute; left:0; bottom:-1px; height:2px; width:0; background:${GREEN}; transition:width 0.5s cubic-bezier(0.16,1,0.3,1); }
        .ab-val:hover .ab-val-line { width:100%; }

        /* 6 · Quote */
        .ab-quote-sec { position:relative; overflow:hidden; background: radial-gradient(60% 80% at 50% 0%, rgba(60,185,140,0.12), transparent 62%), linear-gradient(180deg,#ffffff,#f3faf7); padding: clamp(72px,10vw,150px) clamp(24px,6vw,120px); }
        .ab-quote-sec::before { content:''; position:absolute; inset:0; pointer-events:none; background-image: radial-gradient(rgba(19,41,61,0.05) 1px, transparent 1px); background-size:30px 30px; }
        .ab-quote-glow { position:absolute; bottom:-160px; right:-60px; width:440px; height:440px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.16), transparent 64%); pointer-events:none; }
        .ab-quote { position:relative; z-index:1; max-width:1100px; margin:0 auto; padding:0; font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(28px,4.2vw,68px); line-height:1.22; letter-spacing:-0.03em; color:${NAVY}; text-align:center; }
        .ab-quote-mark { display:block; font-size:1.6em; line-height:0.5; color:${GREEN}; opacity:0.55; }
        .ab-quote-by { font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(11px,0.9vw,13px); letter-spacing:2px; text-transform:uppercase; color:${MUTED}; margin-top:clamp(26px,3vw,40px); }

        /* responsive */
        @media (max-width:980px){
          .ab-hero-in { grid-template-columns:1fr; }
          .ab-hero-media { max-width:560px; }
          .ab-row, .ab-row.rev { grid-template-columns:1fr; gap:clamp(20px,4vw,30px); }
          .ab-row.rev .ab-row-media { order:0; }
        }
        @media (max-width:640px){
          .ab-figs { grid-template-columns:1fr 1fr; }
          .ab-fig:nth-child(3), .ab-fig:nth-child(4){ border-top:1px solid rgba(26,43,60,0.1); }
          .ab-fig:nth-child(3){ border-left:none; padding-left:0; }
          .ab-val { grid-template-columns:52px 1fr; row-gap:6px; }
          .ab-val-no { display:none; }
          .ab-val-d { grid-column:2; }
        }
        @media (min-width:1920px){
          .ab-hero-in, .ab-mani, .ab-ch-in, .ab-figs-in, .ab-val-in { max-width:1900px; }
          .ab-hero-h1 { font-size:112px; }
          .ab-mani-text { font-size:78px; }
          .ab-ch-title, .ab-val-h2 { font-size:68px; }
          .ab-row-h { font-size:56px; }
          .ab-fig-n { font-size:150px; }
          .ab-quote { font-size:84px; }
        }
      `}</style>
    </div>
  )
}
