import { motion, useReducedMotion } from 'framer-motion'
import { Parallax } from './egScroll'

const NAVY  = '#13293D'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.62)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const ABOUT  = '/images/about.png'
const FOUNDER = '/images/founder-rj.png'

export function EgAbout() {
  const reduce = useReducedMotion()
  const rise = (d = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-70px' },
    transition: { duration: 0.85, delay: d, ease: EASE },
  })

  return (
    <section className="eg-ab" aria-label="About us">
      <style>{`
        .eg-ab { background: #ffffff; padding: clamp(56px, 8vw, 120px) clamp(24px, 5vw, 80px) 0; overflow: hidden; }
        .eg-ab-inner { width: 100%; max-width: none; margin: 0 auto; }
        .eg-ab-eyebrow {
          text-align: center; font-family:'Poppins',sans-serif; font-weight:700; text-transform:uppercase;
          font-size: clamp(16px,2vw,26px); color:#000; letter-spacing:0.08em; margin: 0;
        }
        .eg-ab-tag { text-align:center; font-family:'Inter',sans-serif; font-size:clamp(11px,0.9vw,13px); letter-spacing:3px; text-transform:uppercase; color:${MUTED}; margin: 10px 0 clamp(6px,1.5vw,16px); }
        .eg-ab-script {
          text-align:center; font-family:'Dancing Script', cursive; font-weight:700;
          font-size: clamp(44px, 8vw, 104px); color:#717C86; line-height:1; margin: 0 0 clamp(36px,5vw,60px);
        }
        .eg-ab-grid { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(28px,4vw,64px); align-items:center; }

        /* ── top illustration with G-motif backdrop ── */
        .eg-ab-illus { position:relative; aspect-ratio: 4/3; }
        .eg-ab-illus-img {
          position:relative; z-index:2; width:100%; height:100%; object-fit:contain;
          will-change: transform;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-ab-illus:hover .eg-ab-illus-img { transform: scale(1.035); }
        /* G-motif squares - visible in the empty top-left, clear of the figures */
        .eg-gsq { position:absolute; border-radius:8px; pointer-events:none; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.6s ease, background 0.6s ease; }
        .eg-ab-illus .eg-gsq.a { z-index:0; left:3%;  top:1%;  width:30%; height:36%; background: rgba(19,41,61,0.07); animation: eg-ab-drift 9s ease-in-out infinite; }
        .eg-ab-illus .eg-gsq.b { z-index:0; left:11%; top:-5%; width:30%; height:38%; border:2px solid rgba(19,41,61,0.16); animation: eg-ab-drift 11s ease-in-out infinite reverse; }
        .eg-ab-illus .eg-gsq.c { z-index:0; right:1%; bottom:3%; width:20%; height:24%; border:2px solid rgba(60,185,140,0.20); animation: eg-ab-drift 7.5s ease-in-out infinite; }
        .eg-ab-illus:hover .eg-gsq.b { border-color: rgba(60,185,140,0.42); }
        .eg-ab-illus:hover .eg-gsq.c { border-color: rgba(60,185,140,0.5); }
        @keyframes eg-ab-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }

        .eg-ab-copy { display:flex; flex-direction:column; gap: clamp(16px,2vw,24px); }
        .eg-ab-p { font-family:'Inter',sans-serif; font-size:clamp(14px,1.1vw,17px); line-height:1.85; color:${MUTED}; margin:0; }
        .eg-ab-p .dc {
          float:left; font-family:'Poppins',sans-serif; font-weight:700; color:#6b7280;
          font-size: 2.9em; line-height:0.72; padding: 6px 10px 0 0;
        }

        /* ── diagonal mint-gradient band divider (brochure style: soft band hugging a clean slanted edge) ── */
        /* full-bleed: both dividers are direct children of the section, tilted the SAME way so they
           run parallel and visually frame the founder block like a highlighted band. */
        .eg-diag {
          --tilt: -2.4deg;
          position: relative; height: clamp(76px, 9vw, 138px); pointer-events: none;
          margin-top: clamp(58px, 8vw, 116px); margin-bottom: clamp(58px, 8vw, 116px);
          margin-left: calc(-1 * clamp(24px, 5vw, 80px));
          margin-right: calc(-1 * clamp(24px, 5vw, 80px));
        }
        /* the trailing divider sits at the seam with Why-We-Exist, which supplies its own top spacing */
        .eg-diag.seam { margin-bottom: clamp(6px, 1.5vw, 18px); }
        .eg-diag::before { /* soft golden band hugging the diagonal */
          content:''; position:absolute; left:-4%; right:-4%; top:50%;
          height: clamp(64px, 8vw, 120px); transform: translateY(-50%) rotate(var(--tilt));
          background: linear-gradient(180deg,
            rgba(212,175,55,0) 0%, rgba(212,175,55,0.06) 32%,
            rgba(212,175,55,0.2) 50%, rgba(212,175,55,0.06) 68%, rgba(212,175,55,0) 100%);
        }
        .eg-diag::after { /* crisp golden edge line along the diagonal, with glow */
          content:''; position:absolute; left:-4%; right:-4%; top:50%; height:1.6px;
          transform: translateY(-50%) rotate(var(--tilt));
          background: linear-gradient(90deg,
            rgba(212,175,55,0) 0%, rgba(212,175,55,0.5) 18%,
            rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.5) 82%, rgba(212,175,55,0) 100%);
          filter: drop-shadow(0 0 6px rgba(212,175,55,0.6)) drop-shadow(0 0 12px rgba(212,175,55,0.35));
        }

        /* ── founder block ── */
        .eg-fo-wrap { position: relative; }
        /* scattered decorative square outlines (brochure motif) */
        .eg-sq { position:absolute; border:1.5px solid rgba(19,41,61,0.12); border-radius:6px; pointer-events:none; z-index:0; }
        .eg-sq.mint { border-color: rgba(60,185,140,0.18); }
        .eg-sq.solid { border:none; background: rgba(19,41,61,0.045); }
        .eg-fo-wrap .tl1 { left:-0.5%; top:-7%; width: clamp(50px,5.6vw,88px); aspect-ratio:1; }
        .eg-fo-wrap .tl2 { left:2.6%;  top:-2%; width: clamp(50px,5.6vw,88px); aspect-ratio:1; }
        .eg-fo-wrap .tl3 { left:5.8%;  top:3%;  width: clamp(50px,5.6vw,88px); aspect-ratio:1; }
        .eg-fo-wrap .rr1 { right:1.5%; top:14%; width: clamp(46px,5vw,80px);  aspect-ratio:1; }
        .eg-fo-wrap .rr2 { right:4.2%; top:20%; width: clamp(46px,5vw,80px);  aspect-ratio:1; }
        .eg-fo-wrap .rsq { right:-0.5%; top:38%; width: clamp(56px,6vw,98px); aspect-ratio:1; }

        .eg-fo { position:relative; z-index:1; display:grid; grid-template-columns: 0.82fr 1.18fr; gap: clamp(28px,4vw,80px); align-items:center; }
        .eg-fo-photo { position: relative; display:flex; justify-content:center; }
        .eg-fo-stack { position:relative; width: clamp(284px, 33vw, 408px); aspect-ratio: 1 / 1.02; }
        /* faint mint square behind the photo */
        .eg-fo-mintsq { position:absolute; z-index:0; left:2%; top:13%; width:36%; height:44%; background: rgba(60,185,140,0.13); border-radius:4px; pointer-events:none; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), background 0.6s ease; }
        .eg-fo-photo:hover .eg-fo-mintsq { transform: translate(-8px,-8px); background: rgba(60,185,140,0.2); }
        /* EG "G" outline used as a picture frame - light, sharp (edgy) corners */
        .eg-fo-gframe { position:absolute; inset:0; z-index:1; color: rgba(19,41,61,0.16); pointer-events:none; transition: color 0.6s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .eg-fo-gframe svg { width:100%; height:100%; }
        /* only highlight the frame on hover - no vertical move, or the base line would drift off the waist */
        .eg-fo-photo:hover .eg-fo-gframe { color: rgba(60,185,140,0.34); }
        /* transparent founder cut-out - waist rests just ON TOP of the G's base stroke
           (bottom:8% = the line's top edge) so the base line stays fully visible with no gap.
           Box ratio kept > image ratio (0.724) so contain fits to height and the bottom stays
           anchored. Head is allowed to rise above the top of the G. */
        .eg-fo-frame {
          position:absolute; z-index:2; left:12%; bottom:8%; width:76%; height:100%;
          background:none; overflow:visible;
        }
        .eg-fo-frame img {
          width:100%; height:100%; object-fit:contain; object-position:bottom center;
          transform-origin: bottom center; /* scale grows up/out, waist stays on the base line */
          filter: drop-shadow(0 24px 30px rgba(19,41,61,0.22)); will-change: transform;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.7s ease;
        }
        .eg-fo-photo:hover .eg-fo-frame img { transform: scale(1.035); filter: drop-shadow(0 34px 44px rgba(19,41,61,0.32)); }
        .eg-fo-quote { font-family:'Inter',sans-serif; font-size:clamp(17px,1.55vw,24px); line-height:1.82; color:${NAVY}; font-weight:500; margin:0; letter-spacing:-0.01em; }
        .eg-fo-sign { font-family:'Dancing Script',cursive; font-weight:700; font-size: clamp(30px,3.2vw,48px); color:${GREEN}; margin: clamp(20px,2.4vw,32px) 0 6px; }
        .eg-fo-role { font-family:'Inter',sans-serif; font-size:clamp(14px,1.05vw,17px); color:${NAVY}; opacity:0.82; margin:0; }

        @media (max-width: 860px) {
          .eg-ab-grid { grid-template-columns: 1fr; }
          .eg-ab-illus { order:-1; }
          .eg-fo { grid-template-columns: 1fr; }
          .eg-fo-photo { margin-bottom: 28px; }
          .eg-fo-wrap .rr1, .eg-fo-wrap .rr2, .eg-fo-wrap .rsq { display:none; }
        }
      `}</style>

      <div className="eg-ab-inner">
        <motion.p className="eg-ab-eyebrow" {...rise()}>About Us - Driven By</motion.p>
        <motion.p className="eg-ab-tag" {...rise(0.05)}>Building businesses that create lasting impact</motion.p>
        <motion.h2 className="eg-ab-script" {...rise(0.1)}>Visionary Leadership</motion.h2>

        <div className="eg-ab-grid">
          <motion.div className="eg-ab-illus" {...rise()}>
            <span className="eg-gsq a" aria-hidden />
            <span className="eg-gsq b" aria-hidden />
            <span className="eg-gsq c" aria-hidden />
            <Parallax from={16} to={-16} style={{ height: '100%' }}>
              <img className="eg-ab-illus-img" src={ABOUT} alt="Team climbing together" decoding="async" />
            </Parallax>
          </motion.div>
          <motion.div className="eg-ab-copy" {...rise(0.1)}>
            <p className="eg-ab-p">
              <span className="dc">At</span>Eloma Group, our growth is guided by strong leadership, clear vision,
              and a commitment to building businesses that create lasting impact. Our
              leaders bring together industry expertise, innovation, and a forward-thinking
              mindset to shape a multi-business ecosystem built for the future.
            </p>
            <p className="eg-ab-p">
              Beyond business growth, we focus on creating a foundation for lasting success.
              By investing in people, embracing innovation, and maintaining strong governance,
              we strive to build organizations that are resilient, adaptable, and prepared for
              the opportunities of tomorrow. This commitment allows us to create value not only
              for our stakeholders but also for the communities in which we operate.
            </p>
          </motion.div>
        </div>
      </div>

      {/* full-bleed mint diagonal - above the founder, parallel to the one below it */}
      <div className="eg-diag" aria-hidden />

      {/* Founder - centered container; the two diagonals frame it edge-to-edge */}
      <div className="eg-ab-inner eg-fo-wrap">
        <span className="eg-sq tl1" aria-hidden />
        <span className="eg-sq tl2" aria-hidden />
        <span className="eg-sq tl3" aria-hidden />
        <span className="eg-sq rr1" aria-hidden />
        <span className="eg-sq mint rr2" aria-hidden />
        <span className="eg-sq solid rsq" aria-hidden />

        <div className="eg-fo">
          <motion.div className="eg-fo-photo" {...rise()}>
            <div className="eg-fo-stack">
              <span className="eg-fo-mintsq" aria-hidden />
              <div className="eg-fo-gframe" aria-hidden>
                <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="miter" strokeLinecap="butt" strokeMiterlimit="10">
                  <path d="M112,40 L112,8 L8,8 L8,112 L112,112 L112,64 L66,64" />
                </svg>
              </div>
              <div className="eg-fo-frame">
                {/* no parallax here - keeps the waist locked on the G base line (no gap) */}
                <img src={FOUNDER} alt="Founder, Eloma Group" decoding="async" />
              </div>
            </div>
          </motion.div>
          <motion.div {...rise(0.1)}>
            <p className="eg-fo-quote">
              Eloma Group was built with a vision to go beyond a single business - to create an
              ecosystem where innovation, efficiency, and sustainability come together to drive
              real impact across industries.
            </p>
            <p className="eg-fo-sign">RJ</p>
            <p className="eg-fo-role">Founder, Eloma Group</p>
          </motion.div>
        </div>
      </div>

      {/* full-bleed mint diagonal - seam into Why-We-Exist (parallel to the top one) */}
      <div className="eg-diag seam" aria-hidden />
    </section>
  )
}
