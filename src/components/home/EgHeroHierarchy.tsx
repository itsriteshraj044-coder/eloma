import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const GREEN = '#3CB98C'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* A duplicate of the hero laid out just below it: no full-bleed background
   video — instead the original corporate-hierarchy clip sits on the right,
   with the hero copy on the left. */
export function EgHeroHierarchy() {
  const reduce = useReducedMotion() ?? false
  const navigate = useNavigate()
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay: d, duration: 0.9, ease: EASE },
  })

  return (
    <section className="eg-heroh" aria-label="Group structure">
      <style>{`
        .eg-heroh {
          position: relative; overflow: hidden;
          min-height: clamp(620px, 92vh, 1000px);
          display: flex; align-items: center;
          background: #ffffff;
          padding: clamp(56px, 8vh, 110px) clamp(20px, 3.5vw, 56px);
        }
        .eg-heroh-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: 1760px; margin: 0 auto;
        }
        .eg-heroh-copy { position: relative; z-index: 2; max-width: 42%; }
        .eg-heroh-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(10px, 0.85vw, 13px); letter-spacing: 2.6px;
          color: rgba(19,41,61,0.7); margin: 0 0 clamp(18px, 2.4vw, 30px);
        }
        .eg-heroh-eyebrow::before { content: ''; width: clamp(26px, 4vw, 54px); height: 1px;
          background: linear-gradient(90deg, ${GREEN}, transparent); }
        .eg-heroh-h1 {
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: clamp(38px, 5.4vw, 84px); line-height: 1.03; letter-spacing: -0.02em;
          margin: 0; color: #13293D;
        }
        .eg-heroh-h1 .l1 { color: #13293D; }
        .eg-heroh-h1 .l2 { color: rgba(19,41,61,0.5); }
        .eg-heroh-rule {
          width: clamp(180px, 26vw, 380px); height: 1px;
          background: linear-gradient(to right, rgba(19,41,61,0.35), transparent);
          margin: clamp(22px, 2.6vw, 34px) 0;
        }
        .eg-heroh-p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(15px, 1.4vw, 19px); line-height: 1.8;
          color: rgba(19,41,61,0.78); max-width: 480px; margin: 0 0 clamp(30px, 3.6vw, 44px);
        }
        .eg-heroh-btn {
          display: inline-flex; align-items: center; gap: 14px;
          cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; font-size: clamp(12px, 0.9vw, 13px); color: #000;
          background: none; border: 1.5px solid rgba(19,41,61,0.28); border-radius: 8px;
          padding: clamp(14px, 1.4vw, 18px) clamp(22px, 2vw, 30px);
          transition: background .4s ease, color .4s ease, border-color .4s ease, box-shadow .4s ease;
        }
        .eg-heroh-btn:hover {
          background: #B0894A; color: #fff; border-color: #B0894A;
          box-shadow: 0 16px 30px -12px rgba(176,137,74,0.55);
        }
        .eg-heroh-btn span.circ {
          position: relative; width: 26px; height: 26px; border-radius: 50%;
          background: rgba(176,137,74,0.14); display: flex; align-items: center; justify-content: center;
          transition: transform 0.4s ${'cubic-bezier(0.16,1,0.3,1)'}, background 0.4s ease;
        }
        .eg-heroh-btn:hover span.circ { transform: translateX(6px); background: rgba(255,255,255,0.25); }

        /* right-side clip: transparent cutout, fills the full section height */
        .eg-heroh-media {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: 54%; z-index: 1;
        }
        .eg-heroh-media video, .eg-heroh-media img {
          display: block; width: 100%; height: 100%;
          object-fit: contain; object-position: center;
        }

        @media (max-width: 900px) {
          .eg-heroh { min-height: 0; flex-direction: column; }
          .eg-heroh-inner { display: flex; flex-direction: column; }
          .eg-heroh-copy { max-width: 100%; }
          .eg-heroh-p { max-width: 100%; }
          .eg-heroh-media {
            position: relative; width: 100%; height: auto;
            order: -1; margin: 0 0 clamp(24px, 5vw, 40px);
          }
          .eg-heroh-media video, .eg-heroh-media img { height: auto; }
        }
        @media (min-width: 1920px) {
          .eg-heroh-rule { width: 440px; margin: 40px 0; }
          .eg-heroh-p { max-width: 620px; }
          .eg-heroh-btn { font-size: 14px; padding: 18px 34px; }
        }
      `}</style>

      <div className="eg-heroh-inner">
        <div className="eg-heroh-copy">
          <motion.p className="eg-heroh-eyebrow" {...fade(0.02)}>Eloma Group</motion.p>

          <motion.h1 className="eg-heroh-h1" {...fade(0.05)}>
            <span className="l1">Empowering</span><br />
            <span className="l2">Growth with</span><br />
            <span className="l2">Precision &amp; Agility</span>
          </motion.h1>

          <motion.div className="eg-heroh-rule" {...fade(0.18)} />

          <motion.p className="eg-heroh-p" {...fade(0.26)}>
            Eloma Group transforms and scales businesses with strategy, technology, and execution.
          </motion.p>

          <motion.button className="eg-heroh-btn" onClick={() => navigate('/about')} {...fade(0.36)}>
            Experience <span className="circ"><ArrowRight size={15} /></span>
          </motion.button>
        </div>

        <motion.div className="eg-heroh-media" {...fade(0.15)}>
          {reduce ? (
            <img src="/corporate-hierarchy-poster.jpg" alt="Eloma Group structure" decoding="async" />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/corporate-hierarchy-poster.jpg"
              disablePictureInPicture
              aria-label="Eloma Group corporate structure"
            >
              <source src="/corporate-hierarchy.mp4" type="video/mp4" />
            </video>
          )}
        </motion.div>
      </div>
    </section>
  )
}
