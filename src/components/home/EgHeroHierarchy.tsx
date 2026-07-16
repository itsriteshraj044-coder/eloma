import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const GREEN = '#3CB98C'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* A duplicate of the hero laid out just below it: full-bleed background
   video with the hero copy on the left, over a legibility scrim. */
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
          min-height: 100vh; min-height: 100svh;
          display: flex; align-items: center;
          padding: clamp(56px, 8vh, 110px) clamp(20px, 3.5vw, 56px);
        }
        /* full-bleed background video - own compositor layer to avoid
           scroll repaints, matching the primary hero */
        .eg-heroh-bg {
          position: absolute; inset: 0; width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0; pointer-events: none;
          transform: translateZ(0); backface-visibility: hidden;
          will-change: transform;
          filter: contrast(1.07) saturate(1.1) brightness(1.03);
          image-rendering: -webkit-optimize-contrast;
        }
        /* subtle black scrim only on the left where the copy sits, so the
           text stays legible while the rest of the video shows at full clarity */
        .eg-heroh-scrim {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0) 55%);
        }
        .eg-heroh-inner {
          position: relative; z-index: 2;
          width: 100%; max-width: none; margin: 0;
        }
        .eg-heroh-copy { position: relative; z-index: 2; max-width: 54%; margin-top: clamp(40px, 9vh, 130px); }
        .eg-heroh-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(11px, 1vw, 15px); letter-spacing: 2.6px;
          color: rgba(255,255,255,0.82); margin: 0 0 clamp(18px, 2.4vw, 30px);
        }
        .eg-heroh-eyebrow::before { content: ''; width: clamp(26px, 4vw, 54px); height: 1px;
          background: linear-gradient(90deg, ${GREEN}, transparent); }
        .eg-heroh-h1 {
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: clamp(48px, 6.3vw, 108px); line-height: 1.02; letter-spacing: -0.02em;
          margin: 0; color: #fff; text-shadow: 0 2px 40px rgba(0,0,0,0.45);
        }
        .eg-heroh-h1 .l1 { color: #ffffff; }
        .eg-heroh-h1 .l2 { color: rgba(255,255,255,0.66); }
        .eg-heroh-rule {
          width: clamp(180px, 26vw, 380px); height: 1px;
          background: linear-gradient(to right, rgba(255,255,255,0.55), transparent);
          margin: clamp(22px, 2.6vw, 34px) 0;
        }
        .eg-heroh-p {
          font-family: 'Inter', sans-serif;
          font-size: clamp(16px, 1.5vw, 23px); line-height: 1.72;
          color: rgba(255,255,255,0.82); max-width: 620px; margin: 0 0 clamp(30px, 3.6vw, 44px);
          text-shadow: 0 2px 20px rgba(0,0,0,0.4);
        }
        .eg-heroh-btn {
          display: inline-flex; align-items: center; gap: 14px;
          cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; font-size: clamp(13px, 1vw, 15px); color: #fff;
          background: none; border: 1.5px solid rgba(255,255,255,0.4); border-radius: 8px;
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

        @media (max-width: 900px) {
          .eg-heroh { min-height: 78svh; }
          .eg-heroh-inner { display: flex; flex-direction: column; }
          .eg-heroh-copy { max-width: 100%; }
          .eg-heroh-p { max-width: 100%; }
        }
        @media (min-width: 1920px) {
          .eg-heroh-rule { width: 440px; margin: 40px 0; }
          .eg-heroh-p { max-width: 620px; }
          .eg-heroh-btn { font-size: 14px; padding: 18px 34px; }
        }
      `}</style>

      {reduce ? (
        <img className="eg-heroh-bg" src="/images/hero-poster.jpg" alt="" aria-hidden decoding="async" />
      ) : (
        <video
          className="eg-heroh-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          disablePictureInPicture
          aria-hidden
        >
          <source src="/images/hero-page.mp4" type="video/mp4" />
        </video>
      )}
      <span className="eg-heroh-scrim" aria-hidden />

      <div className="eg-heroh-inner">
        <div className="eg-heroh-copy">
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
      </div>
    </section>
  )
}
