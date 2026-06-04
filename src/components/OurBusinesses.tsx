import { motion } from 'framer-motion'
import {
  Headset, Ship, Server, Truck, Plane, ArrowUpRight,
} from 'lucide-react'

const NAVY  = '#1A2B3C'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.50)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const BUSINESSES = [
  { name: 'Call Centre',       tag: 'Customer Experience', Icon: Headset, href: '/businesses/call-centre',       g: ['#3CB98C', '#2A9B74'] },
  { name: 'Imports',           tag: 'Global Sourcing',     Icon: Ship,    href: '/businesses/imports',           g: ['#2F6E8F', '#1A2B3C'] },
  { name: 'IT Infrastructure', tag: 'Technology',          Icon: Server,  href: '/businesses/it-infrastructure', g: ['#3C7DB9', '#243B55'] },
  { name: 'Supply Chain',      tag: 'Logistics',           Icon: Truck,   href: '/businesses/supply-chain',      g: ['#2A9B74', '#13503A'] },
  { name: 'Travel',            tag: 'Journeys',            Icon: Plane,   href: '/businesses/travel',            g: ['#4FB39A', '#1A2B3C'] },
]

function BusinessCard({ b, i }: { b: typeof BUSINESSES[number]; i: number }) {
  const { Icon } = b
  return (
    <motion.a
      href={b.href}
      className="ob-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
      style={{ background: `linear-gradient(155deg, ${b.g[0]} 0%, ${b.g[1]} 100%)` }}
    >
      <span className="ob-card-sheen" aria-hidden />
      <span className="ob-card-icon"><Icon size={22} color="#fff" strokeWidth={1.8} /></span>
      <span className="ob-card-foot">
        <span>
          <span className="ob-card-tag">{b.tag}</span>
          <span className="ob-card-name">{b.name}</span>
        </span>
        <span className="ob-card-arrow"><ArrowUpRight size={18} color="#fff" strokeWidth={2.2} /></span>
      </span>
    </motion.a>
  )
}

export function OurBusinesses() {
  return (
    <section className="ob-root" id="our-businesses" aria-label="Our businesses">
      <div className="ob-inner">
        <motion.div
          className="ob-lead"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="ob-eyebrow">
            <span className="ob-eyebrow-dot" />
            <span>Our Businesses</span>
          </div>
          <h2 className="ob-lead-h">
            We help enterprises to{' '}
            <span className="ob-accent">succeed</span> across sectors like:
          </h2>
        </motion.div>

        <motion.div
          className="ob-head"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        >
          <h3 className="ob-cat">
            Five companies.<br /><span className="ob-accent">One vision.</span>
          </h3>
          <p className="ob-sub">
            Independent businesses, unified by shared values and a single
            Australian root — built to perform across every sector we touch.
          </p>
        </motion.div>

        <div className="ob-cards">
          {BUSINESSES.map((b, i) => <BusinessCard key={b.name} b={b} i={i} />)}
        </div>
      </div>

      <style>{`
        .ob-root { background: #FBFBF9; position: relative; overflow: hidden; }
        .ob-inner {
          max-width: 1760px; margin: 0 auto;
          padding: clamp(64px, 9vw, 130px) clamp(24px, 4vw, 64px) clamp(80px, 10vw, 160px);
        }
        .ob-lead { max-width: 1400px; margin: 0 auto clamp(56px, 8vw, 120px); }
        .ob-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          margin-bottom: clamp(16px, 2vw, 28px);
          font-size: clamp(11px, 0.85vw, 14px);
          font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: ${GREEN};
        }
        .ob-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 50%; background: ${GREEN};
          box-shadow: 0 0 0 4px ${GREEN}22;
        }
        .ob-lead-h {
          margin: 0;
          font-size: clamp(32px, 5.4vw, 96px);
          font-weight: 900; letter-spacing: -0.035em; line-height: 1.05; color: ${NAVY};
        }

        .ob-head { text-align: center; max-width: 780px; margin: 0 auto clamp(40px, 5vw, 72px); }
        .ob-cat {
          margin: 0 0 clamp(14px, 1.6vw, 22px);
          font-size: clamp(36px, 5vw, 84px);
          font-weight: 900; letter-spacing: -0.04em; line-height: 0.98; color: ${NAVY};
        }
        .ob-accent { color: ${GREEN}; }
        .ob-sub {
          margin: 0 auto; max-width: 540px;
          font-size: clamp(14px, 1.2vw, 17px); line-height: 1.78; color: ${MUTED};
        }

        .ob-cards { display: grid; grid-template-columns: repeat(5, 1fr); gap: clamp(12px, 1.3vw, 20px); }
        .ob-card {
          position: relative; aspect-ratio: 3 / 4; border-radius: 20px; overflow: hidden;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: clamp(16px, 1.4vw, 24px); text-decoration: none;
          box-shadow: 0 14px 40px rgba(26,43,60,0.16);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
          will-change: transform;
        }
        .ob-card:hover { transform: translateY(-8px); box-shadow: 0 26px 60px rgba(26,43,60,0.28); }
        .ob-card-sheen {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 60%);
        }
        .ob-card-icon {
          position: relative; width: 44px; height: 44px; border-radius: 12px;
          background: rgba(255,255,255,0.16); backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.22);
          display: flex; align-items: center; justify-content: center;
        }
        .ob-card-foot {
          position: relative; display: flex; align-items: flex-end; justify-content: space-between; gap: 10px;
        }
        .ob-card-tag {
          display: block; font-size: clamp(9px, 0.7vw, 11px);
          font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.72); margin-bottom: 5px;
        }
        .ob-card-name {
          display: block; font-size: clamp(15px, 1.3vw, 21px);
          font-weight: 800; letter-spacing: -0.02em; color: #fff; line-height: 1.1;
        }
        .ob-card-arrow {
          flex-shrink: 0; width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.28);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .ob-card:hover .ob-card-arrow { background: rgba(255,255,255,0.32); transform: rotate(45deg); }

        @media (min-width: 1920px) { .ob-inner { max-width: 1900px; } }
        @media (min-width: 2560px) { .ob-inner { max-width: 2400px; } }
        @media (max-width: 1024px) { .ob-cards { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 680px)  { .ob-cards { grid-template-columns: repeat(2, 1fr); } .ob-card { aspect-ratio: 4 / 5; } }
        @media (max-width: 400px)  { .ob-cards { grid-template-columns: 1fr; } .ob-card { aspect-ratio: 16 / 10; } }
      `}</style>
    </section>
  )
}
