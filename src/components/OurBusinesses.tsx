import { motion } from 'framer-motion'
import {
  Headset, Ship, Server, Truck, Plane, ArrowUpRight,
} from 'lucide-react'

const NAVY  = '#1A2B3C'
const GREEN = '#3CB98C'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const BUSINESSES = [
  {
    name: 'Call Centre',
    tag: 'Customer Experience',
    Icon: Headset,
    href: '/businesses/call-centre',
    vid: '/images/vid1%20(1).mp4',
  },
  {
    name: 'Imports',
    tag: 'Global Sourcing',
    Icon: Ship,
    href: '/businesses/imports',
    vid: '/images/vid1%20(2).mp4',
  },
  {
    name: 'IT Infrastructure',
    tag: 'Technology',
    Icon: Server,
    href: '/businesses/it-infrastructure',
    vid: '/images/vid1%20(3).mp4',
  },
  {
    name: 'Supply Chain',
    tag: 'Logistics',
    Icon: Truck,
    href: '/businesses/supply-chain',
    vid: '/images/vid1%20(4).mp4',
  },
  {
    name: 'Travel',
    tag: 'Journeys',
    Icon: Plane,
    href: '/businesses/travel',
    vid: '/images/vid1%20(5).mp4',
  },
]

const COMPANIES = [
  { name: 'EG Digital AU',  tag: 'Technology',          Icon: Server,  href: '/companies/eg-digital-au'  },
  { name: 'EG Foundations', tag: 'Infrastructure',      Icon: Headset, href: '/companies/eg-foundations' },
  { name: 'EG Imports',     tag: 'Global Sourcing',     Icon: Ship,    href: '/companies/eg-imports'     },
  { name: 'EG Transport',   tag: 'Logistics',           Icon: Truck,   href: '/companies/eg-transport'   },
  { name: 'EG Travels',     tag: 'Journeys',            Icon: Plane,   href: '/companies/eg-travels'     },
]

function CompanyCard({ c, i }: { c: typeof COMPANIES[number]; i: number }) {
  const { Icon } = c
  return (
    <motion.a
      href={c.href}
      className="ob-card"
      initial={{ x: -90, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: EASE, delay: i * 0.13 }}
    >
      {/* Logo fills the card like a video */}
      <img
        className="ob-card-img"
        src="/images/BIVRY%20Icon%20Logo-Blue.jpg"
        alt=""
        aria-hidden
        draggable={false}
      />

      <span className="ob-card-icon">
        <Icon size={22} color="#fff" strokeWidth={1.8} />
      </span>
      <span className="ob-card-foot">
        <span>
          <span className="ob-card-tag">{c.tag}</span>
          <span className="ob-card-name">{c.name}</span>
        </span>
        <span className="ob-card-arrow">
          <ArrowUpRight size={18} color="#fff" strokeWidth={2.2} />
        </span>
      </span>
    </motion.a>
  )
}

function BusinessCard({ b, i }: { b: typeof BUSINESSES[number]; i: number }) {
  const { Icon } = b
  return (
    <motion.a
      href={b.href}
      className="ob-card"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
    >
      {/* Video background */}
      <video
        className="ob-card-img"
        src={b.vid}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />

      <span className="ob-card-icon">
        <Icon size={22} color="#fff" strokeWidth={1.8} />
      </span>
      <span className="ob-card-foot">
        <span>
          <span className="ob-card-tag">{b.tag}</span>
          <span className="ob-card-name">{b.name}</span>
        </span>
        <span className="ob-card-arrow">
          <ArrowUpRight size={18} color="#fff" strokeWidth={2.2} />
        </span>
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

        <div className="ob-cards">
          {BUSINESSES.map((b, i) => <BusinessCard key={b.name} b={b} i={i} />)}
        </div>

        {/* ── Company logo row ── */}
        <div className="ob-companies">
          {COMPANIES.map((c, i) => <CompanyCard key={c.name} c={c} i={i} />)}
        </div>
      </div>

      <style>{`
        .ob-root { background: #FBFBF9; position: relative; overflow: hidden; }
        .ob-inner {
          max-width: 1760px; margin: 0 auto;
          padding: clamp(40px, 5vw, 80px) clamp(24px, 4vw, 64px) clamp(80px, 10vw, 160px);
        }
        .ob-lead { max-width: 1400px; margin: 0 auto clamp(48px, 6vw, 96px); }
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
        .ob-accent { color: ${GREEN}; }

        .ob-cards {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(12px, 1.3vw, 20px);
          padding-bottom: 4px;
        }

        .ob-card {
          position: relative;
          aspect-ratio: 3 / 4;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(16px, 1.4vw, 24px);
          text-decoration: none;
          box-shadow: 0 14px 40px rgba(26,43,60,0.18);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease;
          will-change: transform;
          background: ${NAVY};
        }
        .ob-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 64px rgba(26,43,60,0.30);
        }

        /* Photo fills the card */
        .ob-card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ob-card:hover .ob-card-img { transform: scale(1.06); }

        /* Card content sits above video */
        .ob-card-icon {
          position: relative; z-index: 1;
          width: 44px; height: 44px; border-radius: 12px;
          background: rgba(255,255,255,0.16); backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.22);
          display: flex; align-items: center; justify-content: center;
        }
        .ob-card-foot {
          position: relative; z-index: 1;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 10px;
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
        .ob-card:hover .ob-card-arrow {
          background: rgba(255,255,255,0.32);
          transform: rotate(45deg);
        }

        /* ── Company logo row ── */
        .ob-companies {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(12px, 1.3vw, 20px);
          margin-top: clamp(14px, 1.6vw, 24px);
        }

        @media (min-width: 1920px) { .ob-inner { max-width: 1900px; } }
        @media (min-width: 2560px) { .ob-inner { max-width: 2400px; } }
        @media (max-width: 1024px) {
          .ob-cards     { grid-template-columns: repeat(3, 1fr); }
          .ob-companies { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 680px) {
          .ob-cards     { grid-template-columns: repeat(2, 1fr); }
          .ob-card      { aspect-ratio: 4 / 5; }
          .ob-companies { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 400px) {
          .ob-cards     { grid-template-columns: 1fr; }
          .ob-card      { aspect-ratio: 16 / 10; }
          .ob-companies { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) { .ob-muted { display: none; } }
      `}</style>
    </section>
  )
}
