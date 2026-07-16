import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDown, Mail, Rocket, Users, GraduationCap, Globe2, Scale, Heart, FileText, MessageSquare, Sparkles, Award } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { FlyFooter } from '../components/FlyFooter'
import { NAVY, GREEN, MUTED, EASE } from '../components/PageKit'

const CAREERS_EMAIL = 'connect@elomagroup.com.au'

const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

type Role = { title: string; co: string; loc: string; type: string; desc: string }

function applyMailto(role?: Role) {
  const subject = role ? `Application - ${role.title} (${role.co})` : 'Career enquiry - Eloma Group'
  const body = role
    ? `Hi Eloma team,\n\nI'd like to apply for the ${role.title} role at ${role.co} (${role.loc} · ${role.type}).\n\nI've attached my CV. A little about me:\n\n`
    : `Hi Eloma team,\n\nI'd love to explore opportunities across the Eloma group. A little about me:\n\n`
  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const PERKS = [
  { Icon: Rocket, title: 'Real ownership', text: 'Work on things that ship and matter - across a group that moves fast and trusts its people.' },
  { Icon: Globe2, title: 'Global exposure', text: 'Collaborate across eight markets and five companies, from technology to logistics to travel.' },
  { Icon: GraduationCap, title: 'Grow with us', text: 'Mentorship, learning budgets and clear paths - we invest in people for the long term.' },
  { Icon: Scale, title: 'Fair & flexible', text: 'Balanced ways of working, fair pay and a culture that respects your time and your craft.' },
  { Icon: Users, title: 'One team', text: 'Independent companies, one shared standard - supportive, ambitious and down to earth.' },
  { Icon: Heart, title: 'Purpose-driven', text: 'Build a business ecosystem designed to create lasting, responsible impact.' },
]

const ROLES: Role[] = [
  { title: 'Software Engineer', co: 'EG Digital', loc: 'Melbourne · Hybrid', type: 'Full-time', desc: 'Ship web and product work across the group’s digital practice.' },
  { title: 'Customer Experience Lead', co: 'Call Center', loc: 'Remote · APAC', type: 'Full-time', desc: 'Lead a team delivering standout, always-on customer support.' },
  { title: 'Supply Chain Analyst', co: 'EG Imports', loc: 'Sydney', type: 'Full-time', desc: 'Turn trade and logistics data into smart, fast decisions.' },
  { title: 'IT Infrastructure Engineer', co: 'Eloma Group', loc: 'Melbourne', type: 'Full-time', desc: 'Keep the systems behind every company secure and running.' },
  { title: 'Travel Operations Specialist', co: 'EG Travels', loc: 'Brisbane', type: 'Full-time', desc: 'Craft seamless managed-travel experiences end to end.' },
  { title: 'Brand & Growth Marketer', co: 'EG Digital', loc: 'Remote · Australia', type: 'Contract', desc: 'Grow the brands and pipelines across the Eloma group.' },
]

const HIRING = [
  { n: '01', Icon: FileText, t: 'Apply by email', s: 'Send your CV and a short note - no long forms, no logins.' },
  { n: '02', Icon: MessageSquare, t: 'Intro conversation', s: 'A relaxed chat to understand your goals and answer your questions.' },
  { n: '03', Icon: Sparkles, t: 'Meet the team', s: 'A focused interview with the people you’d actually work with.' },
  { n: '04', Icon: Award, t: 'Offer & welcome', s: 'A fair offer, a clear plan, and a warm welcome to the group.' },
]

const DEPTS = ['All', ...Array.from(new Set(ROLES.map(r => r.co)))]

export function CareersPage() {
  const [dept, setDept] = useState('All')
  const roles = useMemo(() => (dept === 'All' ? ROLES : ROLES.filter(r => r.co === dept)), [dept])

  const rise = (d = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.7, delay: d, ease: EASE },
  })

  return (
    <div style={{ overflowX: 'hidden', background: '#fff' }}>
      <Header />

      {/* ── 1 · Hero — split: copy + framed photo with glass metric ── */}
      <section className="cx-hero">
        <div className="cx-wrap cx-hero-in">
          <motion.div className="cx-hero-l" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASE }}>
            <p className="cx-eyebrow"><span className="cx-eyebrow-dot" />Careers at Eloma</p>
            <h1 className="cx-hero-h1">Build your future<br /><span className="g">across the group.</span></h1>
            <p className="cx-hero-lead">Join a multi-industry group where ambitious people build real businesses - technology, customer experience, logistics, travel and security - united by one vision.</p>
            <div className="cx-hero-btns">
              <a href="#roles" className="cx-btn cx-btn-primary">View open roles <ArrowDown size={17} strokeWidth={2.2} /></a>
              <a href={applyMailto()} className="cx-btn cx-btn-ghost">Apply by email <Mail size={16} strokeWidth={2} /></a>
            </div>
          </motion.div>

          <motion.div className="cx-hero-r" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}>
            <div className="cx-hero-frame">
              <img src={img('photo-1552664730-d307ca884978', 1200)} alt="Team collaborating at Eloma Group" decoding="async" />
            </div>
            <div className="cx-hero-metric">
              <div className="cx-metric-row"><span className="cx-metric-n">5</span><span className="cx-metric-l">companies<br />hiring now</span></div>
              <span className="cx-metric-div" />
              <div className="cx-metric-row"><span className="cx-metric-n">8</span><span className="cx-metric-l">global<br />markets</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2 · Perks — sticky split with numbered rows ── */}
      <section className="cx-perks-sec">
        <div className="cx-wrap cx-perks-split">
          <motion.aside className="cx-perks-aside" {...rise()}>
            <p className="cx-eyebrow"><span className="cx-eyebrow-dot" />Life at Eloma</p>
            <h2 className="cx-h2">Great people, real ownership,<br /><span className="g">room to grow.</span></h2>
            <p className="cx-perks-intro">Independent companies, one shared standard - ambitious, fair and made to last. Here you’ll do work that ships and matters.</p>
            <div className="cx-perks-badge">
              <span className="cx-perks-badge-n">6</span>
              <span className="cx-perks-badge-l">reasons people<br />build here</span>
            </div>
          </motion.aside>

          <div className="cx-perks-list">
            {PERKS.map((p, i) => (
              <motion.div key={p.title} className="cx-prow"
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE }}>
                <span className="cx-prow-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="cx-prow-ic"><p.Icon size={22} strokeWidth={1.7} /></span>
                <div className="cx-prow-body">
                  <h3 className="cx-prow-t">{p.title}</h3>
                  <p className="cx-prow-x">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · Culture image band ── */}
      <section className="cx-culture">
        <div className="cx-culture-media">
          <img src={img('photo-1521737604893-d14cc237f11d', 1600)} alt="Eloma Group team at work" decoding="async" loading="lazy" />
          <span className="cx-culture-veil" aria-hidden />
        </div>
        <motion.div className="cx-culture-copy" {...rise()}>
          <p className="cx-eyebrow lt"><span className="cx-eyebrow-dot" />One team, many disciplines</p>
          <h2 className="cx-culture-h">Independent companies.<br /><span className="g">One shared standard.</span></h2>
          <p className="cx-culture-p">Ambitious, fair and made to last - we bring together technology, logistics, travel and customer experience under a single culture built on trust and craft.</p>
        </motion.div>
      </section>

      {/* ── 4 · Open roles ── */}
      <section id="roles" className="cx-roles-sec">
        <div className="cx-wrap">
          <div className="cx-roles-head">
            <motion.div {...rise()}>
              <p className="cx-eyebrow"><span className="cx-eyebrow-dot" />Open positions</p>
              <h2 className="cx-h2">Find your <span className="g">role.</span></h2>
            </motion.div>
            <motion.div className="cx-filter" {...rise(0.05)} role="tablist" aria-label="Filter roles by company">
              {DEPTS.map(d => (
                <button key={d} role="tab" aria-selected={dept === d} className={`cx-pill${dept === d ? ' on' : ''}`} onClick={() => setDept(d)}>{d}</button>
              ))}
            </motion.div>
          </div>

          <div className="cx-roles">
            {roles.map((r, i) => (
              <motion.a key={r.title} href={applyMailto(r)} className="cx-role"
                initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE }}>
                <span className="cx-role-accent" aria-hidden />
                <div className="cx-role-top">
                  <span className="cx-role-co">{r.co}</span>
                  <span className="cx-role-type">{r.type}</span>
                </div>
                <h3 className="cx-role-title">{r.title}</h3>
                <p className="cx-role-desc">{r.desc}</p>
                <div className="cx-role-foot">
                  <span className="cx-role-loc">{r.loc}</span>
                  <span className="cx-apply">Apply <ArrowUpRight size={16} strokeWidth={2.3} /></span>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="cx-note">
            Don’t see your role? We’re always meeting great people -{' '}
            <a href={applyMailto()} className="cx-note-link">introduce yourself →</a>
          </p>
        </div>
      </section>

      {/* ── 5 · How we hire — horizontal steps ── */}
      <section className="cx-hire-sec">
        <div className="cx-wrap">
          <motion.div className="cx-head center" {...rise()}>
            <p className="cx-eyebrow lt center"><span className="cx-eyebrow-dot" />How we hire</p>
            <h2 className="cx-h2 lt">Four steps, <span className="g">no maze.</span></h2>
          </motion.div>
          <div className="cx-steps">
            <span className="cx-steps-line" aria-hidden />
            {HIRING.map((h, i) => (
              <motion.div key={h.n} className="cx-step"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}>
                <span className="cx-step-node"><h.Icon size={22} strokeWidth={1.7} /></span>
                <span className="cx-step-n">{h.n}</span>
                <h3 className="cx-step-t">{h.t}</h3>
                <p className="cx-step-x">{h.s}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 · CTA ── */}
      <section className="cx-cta">
        <span className="cx-cta-glow" aria-hidden />
        <motion.div className="cx-wrap cx-cta-in" {...rise()}>
          <h2 className="cx-cta-h">Your next chapter<br /><span className="g">starts with a hello.</span></h2>
          <p className="cx-cta-p">Tell us where you’d make an impact - send your CV and a short note and we’ll be in touch.</p>
          <a href={applyMailto()} className="cx-btn cx-btn-primary lg">Apply by email <Mail size={18} strokeWidth={2} /></a>
          <span className="cx-cta-mail">{CAREERS_EMAIL}</span>
        </motion.div>
      </section>

      <FlyFooter />

      <style>{`
        .cx-wrap { max-width:1760px; margin:0 auto; }
        .g { color:${GREEN}; }
        .cx-eyebrow { display:inline-flex; align-items:center; gap:10px; margin:0; font-family:'Inter',sans-serif; font-weight:700; font-size:clamp(10px,0.8vw,12px); letter-spacing:2.5px; text-transform:uppercase; color:${GREEN}; }
        .cx-eyebrow.lt { color:#8fe3c4; }
        .cx-eyebrow.center { justify-content:center; }
        .cx-eyebrow-dot { width:7px; height:7px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 4px rgba(60,185,140,0.16); flex-shrink:0; }
        .cx-h2 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,4.4vw,64px); letter-spacing:-0.035em; line-height:1.06; color:${NAVY}; margin:16px 0 0; }
        .cx-h2.lt { color:#fff; }
        .cx-head { margin-bottom:clamp(30px,4vw,54px); max-width:38ch; }
        .cx-head.center { max-width:none; text-align:center; }

        .cx-btn { display:inline-flex; align-items:center; gap:10px; text-decoration:none; border-radius:14px; padding:15px 28px; min-height:48px; font-family:'Poppins',sans-serif; font-weight:500; font-size:clamp(14px,1.05vw,16px); cursor:pointer; transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, color 0.25s ease; }
        .cx-btn-primary { background:${GREEN}; color:#fff; border:1px solid ${GREEN}; box-shadow:0 16px 34px -14px rgba(60,185,140,0.75); }
        .cx-btn-primary:hover { transform:translateY(-2px); background:#34ab80; }
        .cx-btn-primary.lg { padding:17px 38px; font-size:clamp(15px,1.1vw,18px); }
        .cx-btn-ghost { background:#fff; color:${NAVY}; border:1px solid rgba(26,43,60,0.18); }
        .cx-btn-ghost:hover { transform:translateY(-2px); border-color:${GREEN}; color:${GREEN}; }

        /* 1 · Hero */
        .cx-hero { position:relative; overflow:hidden; background:linear-gradient(180deg,#ffffff 0%,#f3faf7 100%);
          padding: clamp(120px,14vw,200px) clamp(24px,5vw,80px) clamp(60px,7vw,110px); }
        .cx-hero-in { display:grid; grid-template-columns:1.05fr 0.95fr; gap:clamp(32px,5vw,80px); align-items:center; }
        .cx-hero-h1 { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(44px,6.4vw,104px); line-height:0.98; letter-spacing:-0.04em; color:${NAVY}; margin:clamp(18px,2.2vw,28px) 0 0; }
        .cx-hero-lead { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; max-width:52ch; margin:clamp(20px,2.4vw,30px) 0 clamp(26px,3vw,38px); }
        .cx-hero-btns { display:flex; flex-wrap:wrap; gap:12px; }
        .cx-hero-r { position:relative; }
        .cx-hero-frame { position:relative; overflow:hidden; border-radius:28px; aspect-ratio:4/3.4; box-shadow:0 50px 100px -50px rgba(19,41,61,0.5); }
        .cx-hero-frame img { width:100%; height:100%; object-fit:cover; display:block; transform:scale(1.02); transition:transform 1.2s cubic-bezier(0.16,1,0.3,1); }
        .cx-hero-r:hover .cx-hero-frame img { transform:scale(1.08); }
        .cx-hero-metric { position:absolute; left:-18px; bottom:-22px; display:flex; align-items:center; gap:clamp(14px,1.6vw,22px); padding:clamp(16px,1.6vw,22px) clamp(20px,2vw,28px); background:rgba(255,255,255,0.85); backdrop-filter:blur(14px); border:1px solid rgba(255,255,255,0.7); border-radius:20px; box-shadow:0 30px 60px -30px rgba(19,41,61,0.4); }
        .cx-metric-row { display:flex; align-items:center; gap:10px; }
        .cx-metric-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(30px,3vw,44px); letter-spacing:-0.04em; color:${GREEN}; line-height:1; }
        .cx-metric-l { font-family:'Inter',sans-serif; font-size:11.5px; font-weight:600; line-height:1.25; color:${NAVY}; }
        .cx-metric-div { width:1px; height:38px; background:rgba(19,41,61,0.14); }

        /* 2 · Perks — sticky split with rows */
        .cx-perks-sec { background:#fff; padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .cx-perks-split { display:grid; grid-template-columns:0.82fr 1.18fr; gap:clamp(32px,5vw,88px); align-items:start; }
        .cx-perks-aside { position:sticky; top:104px; max-width:none; }
        .cx-perks-intro { font-family:'Inter',sans-serif; font-size:clamp(14.5px,1.1vw,17px); line-height:1.8; color:${MUTED}; margin:clamp(18px,2vw,26px) 0 clamp(24px,3vw,34px); max-width:42ch; }
        .cx-perks-badge { display:inline-flex; align-items:center; gap:14px; padding:14px 20px 14px 16px; border-radius:18px; background:linear-gradient(158deg,#f3faf7,#e9f6f0); border:1px solid rgba(60,185,140,0.24); }
        .cx-perks-badge-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,3.4vw,48px); line-height:1; letter-spacing:-0.04em; color:${GREEN}; }
        .cx-perks-badge-l { font-family:'Inter',sans-serif; font-size:12.5px; font-weight:600; line-height:1.3; color:${NAVY}; }

        .cx-perks-list { display:flex; flex-direction:column; }
        .cx-prow { position:relative; display:grid; grid-template-columns:auto 54px 1fr; gap:clamp(16px,2vw,28px); align-items:flex-start; padding:clamp(22px,2.6vw,34px) clamp(6px,1vw,14px); border-top:1px solid rgba(26,43,60,0.12); transition:padding-left 0.45s cubic-bezier(0.16,1,0.3,1); }
        .cx-prow:last-child { border-bottom:1px solid rgba(26,43,60,0.12); }
        .cx-prow::before { content:''; position:absolute; left:0; top:-1px; width:0; height:2px; background:${GREEN}; transition:width 0.5s cubic-bezier(0.16,1,0.3,1); }
        .cx-prow:hover { padding-left:clamp(14px,1.6vw,24px); }
        .cx-prow:hover::before { width:100%; }
        .cx-prow-no { font-family:'Inter',sans-serif; font-weight:700; font-size:13px; letter-spacing:1px; color:${GREEN}; padding-top:16px; }
        .cx-prow-ic { display:inline-flex; align-items:center; justify-content:center; width:54px; height:54px; border-radius:15px; background:rgba(60,185,140,0.1); color:${GREEN}; transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, color 0.4s ease; }
        .cx-prow:hover .cx-prow-ic { transform:rotate(-6deg); background:${GREEN}; color:#fff; }
        .cx-prow-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(19px,1.7vw,26px); color:${NAVY}; letter-spacing:-0.02em; margin:0 0 8px; }
        .cx-prow-x { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15.5px); line-height:1.72; color:${MUTED}; margin:0; max-width:56ch; }

        /* 3 · Culture band */
        .cx-culture { position:relative; overflow:hidden; min-height:clamp(420px,52vw,600px); display:flex; align-items:center; padding:clamp(56px,8vw,120px) clamp(24px,5vw,80px); }
        .cx-culture-media { position:absolute; inset:0; }
        .cx-culture-media img { width:100%; height:100%; object-fit:cover; display:block; transform:scale(1.04); animation:cxzoom 20s ease-in-out infinite alternate; }
        @keyframes cxzoom { to { transform:scale(1.12); } }
        .cx-culture-veil { position:absolute; inset:0; background:linear-gradient(100deg, rgba(11,26,38,0.92) 0%, rgba(11,26,38,0.72) 42%, rgba(11,26,38,0.28) 100%); }
        .cx-culture-copy { position:relative; z-index:1; max-width:640px; }
        .cx-culture-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(28px,3.8vw,56px); line-height:1.06; letter-spacing:-0.03em; color:#fff; margin:16px 0 18px; }
        .cx-culture-p { font-family:'Inter',sans-serif; font-size:clamp(14px,1.15vw,17px); line-height:1.82; color:rgba(255,255,255,0.72); margin:0; max-width:52ch; }

        /* 4 · Roles */
        .cx-roles-sec { background:linear-gradient(180deg,#ffffff,#f3faf7); padding:clamp(56px,7vw,120px) clamp(24px,5vw,80px); }
        .cx-roles-head { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; margin-bottom:clamp(28px,3.4vw,46px); }
        .cx-filter { display:flex; flex-wrap:wrap; gap:9px; }
        .cx-pill { font-family:'Inter',sans-serif; font-size:13px; font-weight:600; color:${NAVY}; background:#fff; border:1px solid rgba(26,43,60,0.14); border-radius:99px; padding:11px 18px; min-height:44px; cursor:pointer; transition:transform 0.25s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, border-color 0.25s ease, color 0.25s ease; }
        .cx-pill:hover { transform:translateY(-2px); border-color:${GREEN}; color:${GREEN}; }
        .cx-pill.on { background:${NAVY}; border-color:${NAVY}; color:#fff; }
        .cx-pill.on:hover { color:#fff; }
        .cx-roles { display:grid; grid-template-columns:1fr 1fr; gap:clamp(16px,1.6vw,22px); }
        .cx-role { position:relative; overflow:hidden; display:flex; flex-direction:column; text-decoration:none; background:#fff; border:1px solid rgba(26,43,60,0.1); border-radius:20px; padding:clamp(26px,2.8vw,40px); transition:transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, border-color 0.45s ease; }
        .cx-role-accent { position:absolute; top:0; left:0; bottom:0; width:3px; background:${GREEN}; transform:scaleY(0); transform-origin:top; transition:transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .cx-role:hover { transform:translateY(-6px); border-color:rgba(60,185,140,0.5); box-shadow:0 36px 70px -40px rgba(19,41,61,0.32); }
        .cx-role:hover .cx-role-accent { transform:scaleY(1); }
        .cx-role-top { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:clamp(14px,1.6vw,18px); }
        .cx-role-co { font-family:'Inter',sans-serif; font-size:11px; font-weight:800; letter-spacing:1.5px; text-transform:uppercase; color:${GREEN}; }
        .cx-role-type { font-family:'Inter',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; color:${NAVY}; background:rgba(26,43,60,0.06); padding:6px 12px; border-radius:99px; }
        .cx-role-title { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(20px,1.9vw,28px); line-height:1.18; letter-spacing:-0.02em; color:${NAVY}; margin:0 0 10px; }
        .cx-role-desc { font-family:'Inter',sans-serif; font-size:clamp(13.5px,1vw,15px); line-height:1.7; color:${MUTED}; margin:0 0 clamp(22px,2.4vw,30px); flex:1; }
        .cx-role-foot { display:flex; align-items:center; justify-content:space-between; gap:12px; padding-top:clamp(16px,1.8vw,20px); border-top:1px solid rgba(26,43,60,0.1); }
        .cx-role-loc { font-family:'Inter',sans-serif; font-size:13px; color:${MUTED}; font-weight:500; }
        .cx-apply { display:inline-flex; align-items:center; gap:7px; font-family:'Poppins',sans-serif; font-size:13.5px; font-weight:500; color:${GREEN}; transition:gap 0.3s ease; }
        .cx-role:hover .cx-apply { gap:11px; }
        .cx-note { font-family:'Inter',sans-serif; font-size:14.5px; color:${MUTED}; margin-top:clamp(24px,3vw,36px); }
        .cx-note-link { color:${GREEN}; font-weight:600; text-decoration:none; }
        .cx-note-link:hover { text-decoration:underline; }

        /* 5 · How we hire */
        .cx-hire-sec { position:relative; overflow:hidden; background:linear-gradient(165deg,${NAVY} 0%,#16334a 100%); padding:clamp(64px,8vw,130px) clamp(24px,5vw,80px); }
        .cx-steps { position:relative; display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(20px,2.4vw,36px); margin-top:clamp(40px,5vw,64px); }
        .cx-steps-line { position:absolute; top:30px; left:12%; right:12%; height:1px; background:linear-gradient(90deg, transparent, rgba(60,185,140,0.5) 12%, rgba(60,185,140,0.5) 88%, transparent); }
        .cx-step { position:relative; text-align:center; display:flex; flex-direction:column; align-items:center; }
        .cx-step-node { position:relative; z-index:1; display:inline-flex; align-items:center; justify-content:center; width:60px; height:60px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(60,185,140,0.4); color:${GREEN}; margin-bottom:18px; }
        .cx-step-n { font-family:'Poppins',sans-serif; font-weight:700; font-size:12.5px; letter-spacing:2px; color:${GREEN}; }
        .cx-step-t { font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(17px,1.5vw,22px); color:#fff; letter-spacing:-0.01em; margin:8px 0 8px; }
        .cx-step-x { font-family:'Inter',sans-serif; font-size:clamp(13px,1vw,14.5px); line-height:1.7; color:rgba(255,255,255,0.6); margin:0; max-width:26ch; }

        /* 6 · CTA */
        .cx-cta { position:relative; overflow:hidden; background:linear-gradient(180deg,#f3faf7,#ffffff); padding:clamp(72px,9vw,140px) clamp(24px,5vw,80px); text-align:center; }
        .cx-cta-glow { position:absolute; top:-140px; left:50%; transform:translateX(-50%); width:600px; height:400px; border-radius:50%; background:radial-gradient(circle, rgba(60,185,140,0.14), transparent 64%); pointer-events:none; }
        .cx-cta-in { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; }
        .cx-cta-h { font-family:'Poppins',sans-serif; font-weight:700; font-size:clamp(34px,5.4vw,84px); letter-spacing:-0.035em; line-height:1.05; color:${NAVY}; margin:0; }
        .cx-cta-p { font-family:'Inter',sans-serif; font-size:clamp(15px,1.2vw,18px); line-height:1.8; color:${MUTED}; max-width:520px; margin:clamp(20px,2.4vw,28px) 0 clamp(28px,3.2vw,38px); }
        .cx-cta-mail { font-family:'Inter',sans-serif; font-size:13px; font-weight:600; letter-spacing:1px; color:${MUTED}; margin-top:18px; }

        /* responsive */
        @media (max-width:980px){
          .cx-hero-in { grid-template-columns:1fr; }
          .cx-hero-r { max-width:520px; }
          .cx-perks-split { grid-template-columns:1fr; gap:clamp(24px,5vw,40px); }
          .cx-perks-aside { position:static; }
          .cx-steps { grid-template-columns:1fr 1fr; row-gap:clamp(34px,6vw,48px); }
          .cx-steps-line { display:none; }
        }
        @media (max-width:680px){
          .cx-roles { grid-template-columns:1fr; }
          .cx-hero-metric { left:0; }
          .cx-prow { grid-template-columns:54px 1fr; }
          .cx-prow-no { display:none; }
        }
        @media (max-width:480px){
          .cx-steps { grid-template-columns:1fr; }
        }
        @media (min-width:1920px){
          .cx-wrap { max-width:1900px; }
          .cx-hero-h1 { font-size:116px; }
          .cx-h2, .cx-cta-h { font-size:76px; }
          .cx-hero-lead, .cx-cta-p { font-size:19px; }
        }
        @media (prefers-reduced-motion: reduce){
          .cx-culture-media img { animation:none; }
        }
      `}</style>
    </div>
  )
}
