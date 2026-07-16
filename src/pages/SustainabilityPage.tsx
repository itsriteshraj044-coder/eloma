import { motion } from 'framer-motion'
import {
  Gauge, Recycle, Droplets, TreePine, Sun, Truck, FileText,
  ShieldCheck, Users, FileBarChart, Leaf, ArrowUpRight, Sprout,
} from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const STATS = [
  { n: '-30%', l: 'Emissions reduction target' },
  { n: '100%', l: 'Renewable energy ambition' },
  { n: '5', l: 'Companies aligned' },
  { n: '2040', l: 'Net-zero horizon' },
]

const PILLARS = [
  { Icon: Gauge, title: 'Carbon reduction', text: 'Measuring and cutting emissions across Scope 1, 2 and 3, with clear milestones toward net zero.' },
  { Icon: Recycle, title: 'Waste & circularity', text: 'Reuse, recycling and packaging redesign that keeps materials in productive use for longer.' },
  { Icon: Droplets, title: 'Resource efficiency', text: 'Less water, energy and raw material per unit of output through smarter, modern processes.' },
  { Icon: TreePine, title: 'Nature & biodiversity', text: 'Protecting ecosystems near our sites and backing reforestation and habitat projects.' },
]

const INITIATIVES = [
  { no: '01', Icon: Sun, title: 'Renewable energy transition', text: 'Moving our facilities to solar and certified green electricity, with on-site generation where it is feasible.' },
  { no: '02', Icon: Truck, title: 'Green fleet & logistics', text: 'Route optimisation, low-emission vehicles and shipment consolidation to cut the emissions behind every delivery.' },
  { no: '03', Icon: FileText, title: 'Paperless operations', text: 'Digitising documents, invoicing and workflows to remove paper across all five companies in the group.' },
  { no: '04', Icon: ShieldCheck, title: 'Responsible sourcing', text: 'Partnering with suppliers who meet ethical and environmental standards and favour recycled, responsible inputs.' },
  { no: '05', Icon: TreePine, title: 'Community & tree planting', text: 'Local clean-ups, tree-planting drives and education programs that give back to the communities we operate in.' },
  { no: '06', Icon: Droplets, title: 'Water stewardship', text: 'Rainwater harvesting, leak monitoring and efficient fixtures to conserve water across our sites and offices.' },
]

const REPORTS = [
  { Icon: FileBarChart, title: 'Annual Sustainability Report', meta: '2024 - Coming soon', text: 'A full account of our environmental and social performance, targets and year-on-year progress across the entire group - published in one place, in plain language.' },
  { Icon: ShieldCheck, title: 'ESG & Governance Statement', meta: 'Updated yearly', text: 'How ethics, transparency and accountability are embedded into the way every company operates.' },
  { Icon: Gauge, title: 'Carbon Footprint Disclosure', meta: 'In progress', text: 'Our measured emissions baseline across Scope 1, 2 and 3, and the reduction pathway we have committed to.' },
  { Icon: Users, title: 'Community Impact Update', meta: 'Quarterly', text: 'Stories and figures from the programs, partnerships and volunteering that support the communities we serve.' },
]

export function SustainabilityPage() {
  const [featured, ...rest] = REPORTS

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── 1 · Full-bleed nature hero ── */}
      <section className="sg-hero">
        <img className="sg-hero-bg" src="/images/forest.jpg" alt="" aria-hidden decoding="async" />
        <span className="sg-hero-veil" aria-hidden />
        <div className="sg-hero-in">
          <motion.p className="sg-eyebrow lt" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <span className="sg-eyebrow-dot" />Sustainability
          </motion.p>
          <motion.h1 className="sg-hero-h1" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE, delay: 0.08 }}>
            Responsible<br /><span className="g">by design.</span>
          </motion.h1>
          <motion.p className="sg-hero-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}>
            At Eloma Group, sustainability isn't a department - it's how we operate and grow. Across every vertical we work to minimise our impact, act ethically and build a more resilient future.
          </motion.p>
          <motion.div className="sg-hero-stats" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.28 }}>
            {STATS.map((s) => (
              <div className="sg-stat" key={s.l}>
                <span className="sg-stat-n">{s.n}</span>
                <span className="sg-stat-l">{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2 · Environmental Responsibility — organic bento w/ image tile ── */}
      <section className="sg-sec sg-sec-mint">
        <span className="sg-orb sg-orb-a" aria-hidden />
        <div className="sg-in">
          <div className="sg-lead">
            <div>
              <p className="sg-eyebrow"><span className="sg-eyebrow-dot" />01 - Environmental Responsibility</p>
              <h2 className="sg-h">Treading lightly on <span className="g">the planet.</span></h2>
            </div>
            <p className="sg-lead-p">We treat the environment as a stakeholder in every decision. From the energy that powers our offices to the way goods move across our network, we measure our impact, cut what we can and take responsibility for the rest.</p>
          </div>

          <div className="sg-bento">
            <motion.div className="sg-feature" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
              <span className="sg-feature-ic"><Sprout size={26} strokeWidth={1.7} /></span>
              <h3 className="sg-feature-h">Every decision, weighed against the planet.</h3>
              <p className="sg-feature-x">Impact is designed in from the start - not bolted on later. We set targets, report openly and improve them year on year across all five companies.</p>
              <div className="sg-prog">
                <div className="sg-prog-top"><span>Net-zero pathway</span><span className="sg-prog-yr">2040</span></div>
                <div className="sg-prog-track"><span className="sg-prog-fill" /></div>
              </div>
            </motion.div>

            <motion.div className="sg-photo" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.06, ease: EASE }}>
              <img src={img('photo-1466611653911-95081537e5b7', 1100)} alt="Renewable energy — wind turbines at sunset" decoding="async" loading="lazy" />
              <span className="sg-photo-tag">Powered by renewables</span>
            </motion.div>

            {PILLARS.map((p, i) => (
              <motion.div key={p.title} className="sg-pill" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.06 * (i + 1), ease: EASE }}>
                <span className="sg-pill-ic"><p.Icon size={21} strokeWidth={1.7} /></span>
                <h3 className="sg-pill-t">{p.title}</h3>
                <p className="sg-pill-x">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Initiatives — zig-zag timeline ── */}
      <section className="sg-sec" style={{ background: '#fff' }}>
        <div className="sg-in">
          <div className="sg-lead">
            <div>
              <p className="sg-eyebrow"><span className="sg-eyebrow-dot" />02 - Sustainability Initiatives</p>
              <h2 className="sg-h">Turning intent into <span className="g">action.</span></h2>
            </div>
            <p className="sg-lead-p">Real programs, running today across the group - each one measured, reviewed and improved so our commitments show up in practice, not just on paper.</p>
          </div>

          <div className="sg-zig">
            <span className="sg-zig-line" aria-hidden />
            {INITIATIVES.map((it, i) => (
              <motion.div key={it.no} className={`sg-znode${i % 2 ? ' r' : ' l'}`}
                initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, ease: EASE }}>
                <span className="sg-zdot" aria-hidden />
                <div className="sg-zcard">
                  <span className="sg-zbig">{it.no}</span>
                  <span className="sg-zic"><it.Icon size={22} strokeWidth={1.7} /></span>
                  <h3 className="sg-zt">{it.title}</h3>
                  <p className="sg-zx">{it.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · Reports — featured + list ── */}
      <section className="sg-sec sg-sec-mint2">
        <span className="sg-orb sg-orb-b" aria-hidden />
        <div className="sg-in" style={{ position: 'relative', zIndex: 1 }}>
          <div className="sg-lead">
            <div>
              <p className="sg-eyebrow"><span className="sg-eyebrow-dot" />03 - Reports & Updates</p>
              <h2 className="sg-h">Progress, in <span className="g">the open.</span></h2>
            </div>
            <p className="sg-lead-p">Accountability means sharing the numbers - the wins and the work still ahead. Our reporting brings together performance, governance and community impact across all five companies.</p>
          </div>

          <div className="sg-rep-wrap">
            <motion.div className="sg-rep-feature" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
              <div className="sg-rep-feature-top">
                <span className="sg-rep-feature-ic"><featured.Icon size={26} strokeWidth={1.7} /></span>
                <span className="sg-report-meta">{featured.meta}</span>
              </div>
              <h3 className="sg-rep-feature-t">{featured.title}</h3>
              <p className="sg-rep-feature-x">{featured.text}</p>
              <span className="sg-rep-link">Request a copy <ArrowUpRight size={17} strokeWidth={2.2} /></span>
            </motion.div>

            <div className="sg-rep-list">
              {rest.map((r, i) => (
                <motion.div key={r.title} className="sg-report" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.06 * i, ease: EASE }}>
                  <span className="sg-report-ic"><r.Icon size={20} strokeWidth={1.7} /></span>
                  <div className="sg-report-body">
                    <div className="sg-report-top">
                      <h4 className="sg-report-t">{r.title}</h4>
                      <span className="sg-report-meta">{r.meta}</span>
                    </div>
                    <p className="sg-report-x">{r.text}</p>
                  </div>
                  <span className="sg-report-go"><ArrowUpRight size={17} strokeWidth={2.2} /></span>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="sg-note">
            <Leaf size={15} strokeWidth={2.2} style={{ color: GREEN, flexShrink: 0 }} />
            Reports are published as they are finalised. Reach out to our team for the latest figures and documentation.
          </p>
        </div>
      </section>

      <FlyFooter />

      <style>{`
        .g { color:${GREEN}; }
        .sg-in { max-width:1760px; margin:0 auto; }
        @media (min-width:1920px){ .sg-in { max-width:1900px; } }
        .sg-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .sg-eyebrow.lt { color:#bff0dc; }
        .sg-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); flex-shrink:0; }
        .sg-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,60px); color:${NAVY}; letter-spacing:-0.03em; line-height:1.04; margin:16px 0 0; }

        /* 1 · Hero */
        .sg-hero { position:relative; overflow:hidden; min-height:clamp(560px,82vh,880px); display:flex; align-items:flex-end; padding:clamp(120px,14vw,200px) clamp(24px,5vw,80px) clamp(40px,5vw,72px); }
        .sg-hero-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transform:scale(1.05); animation:sgzoom 18s ease-in-out infinite alternate; }
        @keyframes sgzoom { to { transform:scale(1.14); } }
        .sg-hero-veil { position:absolute; inset:0; background:linear-gradient(180deg, rgba(9,32,24,0.55) 0%, rgba(9,32,24,0.35) 40%, rgba(6,24,18,0.92) 100%); }
        .sg-hero-in { position:relative; z-index:2; max-width:1760px; width:100%; margin:0 auto; }
        .sg-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(46px,8vw,120px); line-height:0.98; letter-spacing:-0.04em; color:#fff; margin:clamp(16px,2vw,24px) 0 0; text-shadow:0 20px 50px rgba(0,0,0,0.4); }
        .sg-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:rgba(255,255,255,0.82); max-width:62ch; margin:clamp(18px,2.4vw,28px) 0 clamp(30px,4vw,48px); }
        .sg-hero-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(10px,1.4vw,18px); max-width:1000px; }
        .sg-stat { padding:clamp(16px,1.8vw,24px); border-radius:18px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); backdrop-filter:blur(10px); }
        .sg-stat-n { display:block; font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(26px,3.2vw,48px); line-height:0.95; letter-spacing:-0.04em; color:#fff; }
        .sg-stat-l { display:block; font-family:'Inter',sans-serif; font-size:clamp(11px,0.85vw,13px); color:rgba(255,255,255,0.7); margin-top:8px; }

        /* shared section + lead */
        .sg-sec { position:relative; overflow:hidden; padding:clamp(64px,8vw,128px) clamp(24px,5vw,80px); }
        .sg-sec-mint { background:linear-gradient(180deg,#ffffff,#eef8f3); }
        .sg-sec-mint2 { background:linear-gradient(180deg,#eef8f3,#ffffff); }
        .sg-orb { position:absolute; border-radius:50%; pointer-events:none; z-index:0; filter:blur(12px); }
        .sg-orb-a { top:-140px; right:-100px; width:520px; height:520px; background:radial-gradient(circle, rgba(60,185,140,0.16), transparent 62%); }
        .sg-orb-b { bottom:-160px; left:-120px; width:560px; height:560px; background:radial-gradient(circle, rgba(19,41,61,0.06), transparent 62%); }
        .sg-lead { position:relative; z-index:1; display:grid; grid-template-columns:1.05fr 0.95fr; gap:clamp(24px,4vw,72px); align-items:end; margin-bottom:clamp(40px,5vw,60px); }
        .sg-lead-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.15vw,18px); line-height:1.8; color:${MUTED}; margin:0; max-width:58ch; }

        /* bento */
        .sg-bento { position:relative; z-index:1; display:grid; grid-template-columns:1.3fr 1fr 1fr; grid-auto-rows:1fr; gap:16px; }
        .sg-feature { grid-row:span 2; position:relative; overflow:hidden; display:flex; flex-direction:column; padding:clamp(30px,3vw,48px); border-radius:28px; border:1px solid rgba(60,185,140,0.22); background:linear-gradient(158deg,#f3fbf7,#e0f3e9); box-shadow:0 40px 80px -46px rgba(60,185,140,0.5), inset 0 1px 0 rgba(255,255,255,0.7); }
        .sg-feature-ic { display:inline-flex; align-items:center; justify-content:center; width:60px; height:60px; border-radius:18px; background:${GREEN}; color:#fff; box-shadow:0 14px 26px -12px rgba(60,185,140,0.8); margin-bottom:clamp(18px,2vw,26px); }
        .sg-feature-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(24px,2.4vw,34px); color:${NAVY}; letter-spacing:-0.02em; line-height:1.12; margin:0 0 14px; }
        .sg-feature-x { font-family:'Inter',sans-serif; font-size:clamp(14px,1vw,16px); line-height:1.72; color:${MUTED}; margin:0 0 auto; max-width:40ch; }
        .sg-prog { margin-top:clamp(24px,3vw,36px); }
        .sg-prog-top { display:flex; justify-content:space-between; align-items:baseline; font-family:'Inter',sans-serif; font-size:13px; font-weight:600; color:${NAVY}; margin-bottom:10px; }
        .sg-prog-yr { font-family:'Poppins',sans-serif; font-weight:700; color:${GREEN}; }
        .sg-prog-track { height:9px; border-radius:99px; background:rgba(19,41,61,0.08); overflow:hidden; }
        .sg-prog-fill { display:block; height:100%; width:62%; border-radius:99px; background:linear-gradient(90deg,#3CB98C,#5fd3a8); box-shadow:0 2px 8px rgba(60,185,140,0.5); }
        .sg-photo { grid-column:span 2; position:relative; overflow:hidden; border-radius:28px; min-height:200px; }
        .sg-photo img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .sg-photo:hover img { transform:scale(1.06); }
        .sg-photo-tag { position:absolute; left:20px; bottom:18px; font-family:'Poppins',sans-serif; font-weight:600; font-size:14px; color:#fff; background:rgba(9,32,24,0.5); backdrop-filter:blur(6px); padding:9px 16px; border-radius:99px; }
        .sg-pill { position:relative; overflow:hidden; background:#fff; border:1px solid rgba(26,43,60,0.08); border-radius:24px; padding:clamp(24px,2.2vw,32px); transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.45s ease; }
        .sg-pill:hover { transform:translateY(-6px); border-color:${GREEN}; box-shadow:0 30px 60px -38px rgba(60,185,140,0.5); }
        .sg-pill-ic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:15px; background:rgba(60,185,140,0.1); color:${GREEN}; margin-bottom:16px; transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, color 0.4s ease; }
        .sg-pill:hover .sg-pill-ic { transform:translateY(-3px); background:${GREEN}; color:#fff; }
        .sg-pill-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(16px,1.4vw,20px); color:${NAVY}; letter-spacing:-0.01em; margin:0 0 8px; }
        .sg-pill-x { font-family:'Inter',sans-serif; font-size:14px; line-height:1.62; color:${MUTED}; margin:0; }

        /* zig-zag timeline */
        .sg-zig { position:relative; max-width:1080px; margin:0 auto; }
        .sg-zig-line { position:absolute; top:0; bottom:0; left:50%; width:2px; transform:translateX(-50%); background:repeating-linear-gradient(180deg, rgba(60,185,140,0.5) 0 8px, transparent 8px 16px); }
        .sg-znode { position:relative; width:50%; padding:clamp(14px,1.6vw,22px) 0; }
        .sg-znode.l { left:0; padding-right:clamp(30px,4vw,60px); text-align:right; }
        .sg-znode.r { left:50%; padding-left:clamp(30px,4vw,60px); }
        .sg-zdot { position:absolute; top:clamp(30px,4vw,44px); width:16px; height:16px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 6px rgba(60,185,140,0.16); }
        .sg-znode.l .sg-zdot { right:-8px; }
        .sg-znode.r .sg-zdot { left:-8px; }
        .sg-zcard { position:relative; overflow:hidden; background:#fff; border:1px solid rgba(26,43,60,0.1); border-radius:22px; padding:clamp(24px,2.6vw,36px); transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.45s ease; }
        .sg-zcard:hover { transform:translateY(-5px); border-color:rgba(60,185,140,0.5); box-shadow:0 34px 64px -40px rgba(60,185,140,0.45); }
        .sg-zbig { position:absolute; top:-6px; right:14px; font-family:'Poppins',sans-serif; font-weight:800; font-size:clamp(56px,7vw,96px); line-height:1; letter-spacing:-0.05em; color:rgba(60,185,140,0.1); }
        .sg-znode.l .sg-zcard { display:flex; flex-direction:column; align-items:flex-end; }
        .sg-zic { display:inline-flex; align-items:center; justify-content:center; width:52px; height:52px; border-radius:15px; background:rgba(60,185,140,0.1); color:${GREEN}; margin-bottom:14px; }
        .sg-zt { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(18px,1.7vw,25px); color:${NAVY}; letter-spacing:-0.02em; margin:0 0 8px; position:relative; }
        .sg-zx { font-family:'Inter',sans-serif; font-size:clamp(14px,1vw,15.5px); line-height:1.7; color:${MUTED}; margin:0; max-width:44ch; position:relative; }

        /* reports */
        .sg-rep-wrap { position:relative; z-index:1; display:grid; grid-template-columns:1.05fr 0.95fr; gap:16px; align-items:stretch; }
        .sg-rep-feature { position:relative; overflow:hidden; display:flex; flex-direction:column; padding:clamp(30px,3vw,48px); border-radius:28px; border:1px solid rgba(26,43,60,0.08); background:linear-gradient(158deg,#ffffff,#eef8f3); box-shadow:0 40px 80px -46px rgba(19,41,61,0.3); }
        .sg-rep-feature-top { display:flex; align-items:center; justify-content:space-between; gap:14px; margin-bottom:clamp(20px,3vw,32px); }
        .sg-rep-feature-ic { display:inline-flex; align-items:center; justify-content:center; width:60px; height:60px; border-radius:18px; background:rgba(60,185,140,0.12); color:${GREEN}; }
        .sg-rep-feature-t { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(24px,2.4vw,36px); color:${NAVY}; letter-spacing:-0.02em; line-height:1.1; margin:0 0 14px; }
        .sg-rep-feature-x { font-family:'Inter',sans-serif; font-size:clamp(14px,1vw,16px); line-height:1.74; color:${MUTED}; margin:0 0 auto; max-width:46ch; }
        .sg-rep-link { display:inline-flex; align-items:center; gap:8px; margin-top:clamp(24px,3vw,36px); font-family:'Poppins',sans-serif; font-weight:600; font-size:15px; color:${GREEN}; cursor:pointer; transition:gap 0.35s ease; width:fit-content; }
        .sg-rep-feature:hover .sg-rep-link { gap:14px; }
        .sg-rep-list { display:flex; flex-direction:column; gap:16px; }
        .sg-report { flex:1; display:flex; align-items:flex-start; gap:clamp(12px,1.4vw,18px); padding:clamp(18px,2vw,26px); border:1px solid rgba(26,43,60,0.08); border-radius:22px; background:#fff; cursor:pointer; transition:transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.4s ease; }
        .sg-report:hover { transform:translateY(-4px); border-color:${GREEN}; box-shadow:0 28px 54px -36px rgba(60,185,140,0.45); }
        .sg-report-ic { flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:14px; background:rgba(60,185,140,0.1); color:${GREEN}; transition:transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, color 0.4s ease; }
        .sg-report:hover .sg-report-ic { background:${GREEN}; color:#fff; transform:scale(1.06); }
        .sg-report-body { flex:1; min-width:0; }
        .sg-report-top { display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; margin-bottom:6px; }
        .sg-report-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(16px,1.3vw,20px); color:${NAVY}; letter-spacing:-0.01em; margin:0; }
        .sg-report-x { font-family:'Inter',sans-serif; font-size:13.5px; line-height:1.62; color:${MUTED}; margin:0; }
        .sg-report-meta { font-family:'Inter',sans-serif; font-weight:600; font-size:11px; letter-spacing:0.6px; text-transform:uppercase; color:${GREEN}; background:rgba(60,185,140,0.1); padding:5px 11px; border-radius:99px; white-space:nowrap; }
        .sg-report-go { flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; color:${NAVY}; background:rgba(26,43,60,0.05); transition:transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, color 0.4s ease; }
        .sg-report:hover .sg-report-go { background:${GREEN}; color:#fff; transform:translate(3px,-3px); }
        .sg-note { display:flex; align-items:center; gap:10px; justify-content:center; margin:clamp(32px,4vw,48px) auto 0; max-width:600px; text-align:center; font-family:'Inter',sans-serif; font-size:13.5px; line-height:1.6; color:${MUTED}; position:relative; z-index:1; }

        /* responsive */
        @media (max-width:1023px){
          .sg-lead { grid-template-columns:1fr; align-items:start; gap:20px; }
          .sg-bento { grid-template-columns:1fr 1fr; }
          .sg-feature { grid-row:auto; grid-column:1 / -1; }
          .sg-photo { grid-column:1 / -1; }
          .sg-rep-wrap { grid-template-columns:1fr; }
        }
        @media (max-width:720px){
          .sg-hero-stats { grid-template-columns:1fr 1fr; }
          .sg-zig-line { left:9px; }
          .sg-znode, .sg-znode.l, .sg-znode.r { width:100%; left:0; padding-left:34px; padding-right:0; text-align:left; }
          .sg-znode.l .sg-zcard { align-items:flex-start; }
          .sg-znode.l .sg-zdot, .sg-znode.r .sg-zdot { left:1px; right:auto; }
        }
        @media (max-width:560px){
          .sg-bento { grid-template-columns:1fr; }
        }
        @media (min-width:1920px){
          .sg-hero-h1 { font-size:132px; }
          .sg-h { font-size:70px; }
          .sg-hero-lead, .sg-lead-p { font-size:20px; }
        }
        @media (prefers-reduced-motion: reduce){
          .sg-hero-bg { animation:none; }
        }
      `}</style>
    </div>
  )
}
