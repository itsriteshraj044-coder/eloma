import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Sprout, GitBranch, TreePine, Mountain, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LOGO = '/images/eg-logo-mark.png'

const GREEN = '#3CB98C'
const NAVY  = '#13293D'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const CARDS = [
  { icon: <Sprout size={22} />,    title: 'The Root',     tag: 'A simple vision',
    body: 'Eloma began with a conviction that businesses grow stronger when they share roots - common values, shared infrastructure, and a long-term horizon.' },
  { icon: <GitBranch size={22} />, title: 'The Branches', tag: 'Bold, agile, growing',
    body: 'Travel, technology, customer experience and logistics grow as branches of one organism - independent in craft, united in standard.' },
  { icon: <TreePine size={22} />,  title: 'The Canopy',   tag: 'A global ecosystem',
    body: 'Today the group spans markets and continents, an interconnected canopy where each company makes the others stronger.' },
  { icon: <Mountain size={22} />,  title: 'The Horizon',  tag: 'Built for generations',
    body: "We don't build for the quarter. We build for the decade - investing in people, sustainability and ventures that outlast us." },
]

export function EgWhyExist() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const secRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: secRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  return (
    <section className="eg-wy" aria-label="Why we exist" ref={secRef}>
      <style>{`
        .eg-wy { position: relative; overflow: hidden; }
        .eg-wy-bg { position:absolute; inset:0; z-index:0; overflow:hidden; }
        /* gently desaturate the forest so its green cast is muted (no golden tint) */
        .eg-wy-bg img { position:absolute; left:0; top:-12%; width:100%; height:124%; object-fit:cover; will-change: transform;
          filter: saturate(0.55) brightness(1.05); }
        /* neutral frosted-white overlay (glass look): opaque white at top (seamless with the section
           above) that fades away lower down so the image stays transparent / visible towards the
           bottom, with only a whisper of neutral settle at the very base. */
        .eg-wy-bg::after { content:''; position:absolute; inset:0; background:
          linear-gradient(180deg,
            #ffffff 0%, rgba(255,255,255,0.90) 9%, rgba(255,255,255,0.48) 26%,
            rgba(255,255,255,0.30) 52%, rgba(255,255,255,0.18) 76%, rgba(255,255,255,0.06) 90%, rgba(255,255,255,0) 100%),
          linear-gradient(180deg, rgba(24,30,28,0) 84%, rgba(24,30,28,0.10) 94%, rgba(20,26,24,0.24) 100%),
          linear-gradient(90deg, rgba(255,255,255,0) 58%, rgba(255,255,255,0.18) 100%);
        }
        .eg-wy-inner { position:relative; z-index:2; max-width: none; margin:0 auto; padding: clamp(56px,8vw,120px) clamp(24px,5vw,80px); }
        .eg-wy-head { text-align:center; margin-bottom: clamp(36px,5vw,60px); }
        .eg-wy-title { font-family:'Poppins',sans-serif; font-weight:700; text-transform:uppercase; font-size:clamp(26px,3.4vw,46px); color:#000; margin:0; letter-spacing:0.04em; }
        .eg-wy-sub { font-family:'Inter',sans-serif; font-size:clamp(11px,0.9vw,13px); letter-spacing:3px; text-transform:uppercase; color:rgba(19,41,61,0.55); margin:12px 0 0; }
        .eg-wy-rule { display:block; width:clamp(150px,18vw,250px); height:2px; margin:clamp(14px,2vw,22px) auto 0; position:relative;
          background: linear-gradient(90deg, rgba(19,41,61,0) 0%, rgba(19,41,61,0.18) 28%, rgba(19,41,61,0.18) 72%, rgba(19,41,61,0) 100%); }
        .eg-wy-rule::after { content:''; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:52px; height:8px; border-radius:6px; background:#D4AF37; }

        .eg-wy-grid { display:grid; grid-template-columns: 1.4fr 0.85fr; gap: clamp(18px,2.2vw,30px); align-items:stretch; }
        .eg-wy-cards { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(14px,1.8vw,24px); }
        .egw-card {
          position: relative; overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 46%),
            linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 100%);
          border: 1px solid rgba(200,170,118,0.48); border-radius: 20px;
          padding: clamp(20px,2.2vw,30px);
          box-shadow:
            0 18px 44px -20px rgba(10,26,22,0.5),
            inset 0 1px 0 rgba(255,255,255,0.7),
            inset 0 0 0 1px rgba(255,255,255,0.08);
          backdrop-filter: blur(18px) saturate(165%);
          -webkit-backdrop-filter: blur(18px) saturate(165%);
          transition: box-shadow 0.5s ease, border-color 0.5s ease, background 0.5s ease;
        }
        /* bottom two cards (The Canopy / The Horizon) - a touch more transparent and a
           whisper darker, so the deeper forest behind reads through (brochure look) */
        .egw-card.is-dark {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 52%),
            linear-gradient(135deg, rgba(16,34,28,0.10) 0%, rgba(10,24,19,0.18) 100%);
          border-color: rgba(200,170,118,0.42);
        }
        /* accent tab that grows from the top edge */
        .egw-card::before {
          content:''; position:absolute; left:clamp(20px,2.2vw,30px); top:0; height:3px; width:26px; border-radius:0 0 4px 4px;
          background: #D4AF37; transition: width 0.5s cubic-bezier(0.16,1,0.3,1); pointer-events:none;
        }
        /* soft accent bloom from the top-right corner */
        .egw-card::after {
          content:''; position:absolute; top:-45%; right:-30%; width:62%; height:82%; border-radius:50%;
          background: radial-gradient(circle, color-mix(in srgb, var(--accent, ${GREEN}) 16%, transparent), transparent 70%);
          opacity:0; transition: opacity 0.5s ease; pointer-events:none;
        }
        .egw-card:hover {
          box-shadow: 0 44px 76px -32px rgba(19,41,61,0.62), inset 0 1px 0 rgba(255,255,255,0.82);
          border-color: color-mix(in srgb, var(--accent, ${GREEN}) 45%, transparent);
        }
        .egw-card:hover::before { width:62px; }
        .egw-card:hover::after { opacity:1; }
        .egw-card-ic {
          position:relative; width:46px; height:46px; border-radius:13px; display:flex; align-items:center; justify-content:center;
          background:rgba(255,255,255,0.32); border:1px solid rgba(255,255,255,0.5);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6); color:#1b3850; margin-bottom:16px;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, color 0.4s ease, border-color 0.4s ease;
        }
        .egw-card-ic.is-green { background:rgba(60,185,140,0.20); border-color:rgba(60,185,140,0.42); color:${GREEN}; }
        .egw-card:hover .egw-card-ic { transform: translateY(-3px) scale(1.1) rotate(-5deg); }
        .egw-card-h { position:relative; font-family:'Poppins',sans-serif; font-weight:600; font-size:clamp(20px,1.95vw,28px); color:#13293D; margin:0; }
        .egw-card-tag { position:relative; font-family:'Inter',sans-serif; font-size:clamp(12.5px,1vw,15px); color:${GREEN}; font-weight:700; margin:5px 0 13px; letter-spacing:0.3px; }
        .egw-card-b { position:relative; font-family:'Inter',sans-serif; font-size:clamp(14px,1.12vw,16.5px); line-height:1.62; color:rgba(19,41,61,0.82); margin:0; }

        /* bottom two cards (The Canopy / The Horizon): text + icon all white, heading stays dark */
        .egw-card.is-dark .egw-card-ic { color:#fff; }
        .egw-card.is-dark .egw-card-tag { color:#fff; }
        .egw-card.is-dark .egw-card-b { color:rgba(255,255,255,0.90); }

        /* right panel - a tall frosted card matching the four cards, like the brochure */
        .eg-wy-panel {
          position: relative; overflow: hidden;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 46%),
            linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 100%);
          border: 1px solid rgba(200,170,118,0.48); border-radius: 20px;
          box-shadow:
            0 18px 44px -20px rgba(10,26,22,0.5),
            inset 0 1px 0 rgba(255,255,255,0.7),
            inset 0 0 0 1px rgba(255,255,255,0.08);
          backdrop-filter: blur(18px) saturate(165%);
          -webkit-backdrop-filter: blur(18px) saturate(165%);
          padding: clamp(24px,2.6vw,40px); display:flex; flex-direction:column;
          transition: box-shadow 0.5s ease, border-color 0.5s ease;
        }
        .eg-wy-panel:hover {
          box-shadow: 0 30px 60px -24px rgba(10,26,22,0.6), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 0 0 1px rgba(255,255,255,0.1);
          border-color: rgba(60,185,140,0.5);
        }
        .eg-wy-panel-logo { display:flex; justify-content:flex-end; }
        .eg-wy-panel-logo img { width: clamp(104px,12vw,168px); height:auto; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .eg-wy-panel:hover .eg-wy-panel-logo img { transform: scale(1.06) rotate(2deg); }
        .eg-wy-panel-p { font-family:'Inter',sans-serif; font-size:clamp(14px,1.18vw,18px); line-height:1.78; color:rgba(19,41,61,0.82); margin: clamp(20px,3vw,32px) 0 auto; }
        .eg-wy-btn {
          display:inline-flex; align-items:center; gap:14px; align-self:flex-start; margin-top: clamp(24px,3vw,32px);
          cursor:pointer; font-family:'Poppins',sans-serif; font-weight:700; letter-spacing:1.5px;
          text-transform:uppercase; font-size:clamp(12px,0.9vw,13px); color:#000;
          background:none; border:1.5px solid #fff; border-radius:8px;
          padding: clamp(14px,1.4vw,18px) clamp(22px,2vw,30px);
          transition: background .4s ease, color .4s ease, border-color .4s ease, box-shadow .4s ease;
        }
        .eg-wy-btn:hover {
          background:#B0894A; color:#fff; border-color:#B0894A;
          box-shadow: 0 16px 30px -12px rgba(176,137,74,0.55);
        }
        .eg-wy-btn span.circ { position:relative; width:26px; height:26px; border-radius:50%; background:rgba(176,137,74,0.14); display:flex; align-items:center; justify-content:center; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease; }
        .eg-wy-btn:hover span.circ { transform: translateX(6px); background:rgba(255,255,255,0.25); }

        @media (max-width: 1023px) { .eg-wy-grid { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .eg-wy-cards { grid-template-columns: 1fr; } }
      `}</style>

      <div className="eg-wy-bg" aria-hidden>
        <motion.img src="/images/forest.jpg" alt="" decoding="async" style={reduce ? undefined : { y: bgY }} />
      </div>

      <div className="eg-wy-inner">
        <motion.div className="eg-wy-head"
          initial={reduce ? false : { opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:'-80px' }} transition={{ duration:0.8, ease:EASE }}>
          <h2 className="eg-wy-title">Why We Exist</h2>
          <p className="eg-wy-sub">Committed to sustainable growth and responsible business</p>
          <span className="eg-wy-rule" aria-hidden />
        </motion.div>

        <div className="eg-wy-grid">
          <div className="eg-wy-cards">
            {CARDS.map((c, i) => (
              <motion.div key={c.title} className={`egw-card${i >= 2 ? ' is-dark' : ''}`}
                style={{ ['--accent' as string]: i >= 2 ? GREEN : NAVY }}
                initial={reduce ? false : { opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }}
                whileHover={reduce ? undefined : { y:-8 }}
                viewport={{ once:true, margin:'-50px' }} transition={{ duration:0.7, delay:0.08*i, ease:EASE }}>
                <div className={`egw-card-ic${i >= 2 ? ' is-green' : ''}`}>{c.icon}</div>
                <h3 className="egw-card-h">{c.title}</h3>
                <p className="egw-card-tag">{c.tag}</p>
                <p className="egw-card-b">{c.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="eg-wy-panel"
            initial={reduce ? false : { opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }}
            whileHover={reduce ? undefined : { y:-6 }}
            viewport={{ once:true, margin:'-50px' }} transition={{ duration:0.8, delay:0.2, ease:EASE }}>
            <div className="eg-wy-panel-logo"><img src={LOGO} alt="Eloma Group" decoding="async" /></div>
            <p className="eg-wy-panel-p">
              At Eloma Group, sustainability is not just a commitment; it is a core part of how we
              operate and grow. Across all our business verticals, we strive to minimize environmental
              impact, promote ethical practices, and build solutions that contribute to a more
              responsible and resilient future.
            </p>
            <button className="eg-wy-btn" onClick={() => navigate('/contact#contact-form')}>
              Discover More <span className="circ"><ArrowRight size={15} /></span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
