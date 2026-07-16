import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { takePending } from '../../utils/sectionLink'

/* ═══════════════════════════════════════════════════
   OUR COMPANIES - golden orbital constellation.
   The parent mark sits at the centre, rendered as a 3D
   gold crest (the transparent kangaroo-G masked with a
   metallic gradient + bevel shadows), ringed by faint
   concentric orbits and a corner node-mesh. Five company
   cards orbit around it - each a marbled gold-framed panel
   with a photo, name and blurb. Below tablet the arena
   collapses to a stacked/2-col grid. Deep-links (eg:company)
   scroll here and glow the matching card.
   ══════════════════════════════════════════════════ */

const NAVY     = '#13293D'
const MUTED    = 'rgba(19,41,61,0.56)'
const GOLD_HI  = '#F1E2BE'   // champagne highlight (not lemon)
const GOLD      = '#C6A24E'   // antique gold
const GOLD_MID  = '#A9843A'   // warm bronze-gold
const GOLD_DEEP = '#7E5F24'   // deep bronze
const RING_RGB  = '166,132,58' // muted bronze-gold for orbit rings
const LOGO      = '/images/eg-logo-mark.png'

/* header/footer slug → index in COMPANIES (deep-link wiring, unchanged) */
const COMPANY_INDEX: Record<string, number> = {
  digital: 0, foundations: 1, imports: 2, transport: 3, travels: 4,
}

type Slot = 'top' | 'ul' | 'ur' | 'll' | 'lr'

type Company = {
  slug: string
  title: string
  blurb: string
  id: string             // Unsplash photo id
  slot: Slot             // position around the centre
  to: string
}

const COMPANIES: Company[] = [
  { slug: 'digital', title: 'EG Digital Australia',
    blurb: 'Modern digital experiences and IT infrastructure, engineered for growth.',
    id: 'photo-1550751827-4bd374c3f58b', slot: 'top', to: '/companies/eg-digital' },
  { slug: 'foundations', title: 'Eloma Group',
    blurb: 'The parent group and shared-services backbone behind every business.',
    id: 'photo-1486406146926-c627a92ad1ab', slot: 'ul', to: '/companies/eloma-group' },
  { slug: 'imports', title: 'EG Imports',
    blurb: 'Global sourcing and cross-border trade, delivered with precision.',
    id: 'photo-1494412574643-ff11b0a5c1c3', slot: 'ur', to: '/companies/eg-imports' },
  { slug: 'transport', title: 'EG Transport - BIVRY',
    blurb: 'Freight and road logistics that arrive on time, every time.',
    id: 'photo-1591768793355-74d04bb6608f', slot: 'll', to: '/companies/bivry' },
  { slug: 'travels', title: 'EG Travels',
    blurb: 'Corporate and leisure journeys designed around people.',
    id: 'photo-1506973035872-a4ec16b8e8d9', slot: 'lr', to: '/companies/eg-travels' },
]

const img = (id: string, w: number) => {
  const host = id.startsWith('premium_photo') ? 'https://plus.unsplash.com' : 'https://images.unsplash.com'
  return `${host}/${id}?auto=format&fit=crop&w=${w}&q=80`
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* entrance offset per slot - each card starts pulled toward the centre crest
   and springs outward into its orbit position */
const OFFSETS: Record<Slot, { x: number; y: number }> = {
  top: { x: 0, y: 90 },
  ul:  { x: 96, y: 10 },
  ur:  { x: -96, y: 10 },
  ll:  { x: 78, y: -78 },
  lr:  { x: -78, y: -78 },
}

/* ── one orbiting company card ── */
function Card({
  c, i, anim, lit, onOpen,
}: {
  c: Company
  i: number
  anim: boolean
  lit: boolean
  onOpen: () => void
}) {
  return (
    // Outer div owns the positioning transform (translateX/Y -50%). The entrance
    // animation lives on the inner motion wrapper so framer's inline transform
    // never clobbers the centering.
    <div
      className={`eg-oc-card p-${c.slot}${lit ? ' lit' : ''}`}
      id={`eg-co-card-${i}`}
      role="link"
      tabIndex={0}
      aria-label={c.title}
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
    >
      <motion.div
        className="eg-oc-enter"
        initial={anim ? { opacity: 0, x: OFFSETS[c.slot].x, y: OFFSETS[c.slot].y, scale: 0.78 } : false}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.3 + i * 0.08 }}
      >
        <div className="eg-oc-inner">
          <div className="eg-oc-thumb">
            <img
              className="eg-oc-img"
              src={img(c.id, 900)}
              alt={c.title}
              loading="lazy"
              decoding="async"
              width={900}
              height={506}
            />
            <span className="eg-oc-thumb-frame" aria-hidden />
          </div>
          <h3 className="eg-oc-name">{c.title}</h3>
          <p className="eg-oc-blurb">{c.blurb}</p>
          <span className="eg-oc-go" aria-hidden>
            <ArrowUpRight size={15} strokeWidth={2.6} />
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export function EgCompanies() {
  const reduce = useReducedMotion() ?? false
  const navigate = useNavigate()
  const sectionRef = useRef<HTMLElement>(null)
  const [lit, setLit] = useState<number | null>(null)
  const anim = !reduce

  // Deep-link from header/footer → scroll here + glow the matching card
  useEffect(() => {
    let clear: ReturnType<typeof setTimeout>
    const focus = (id: string) => {
      const idx = COMPANY_INDEX[id]
      if (idx == null) return
      setLit(idx)
      requestAnimationFrame(() => {
        const el = document.getElementById(`eg-co-card-${idx}`) ?? sectionRef.current
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
      clearTimeout(clear)
      clear = setTimeout(() => setLit(null), 2600)
    }
    const pending = takePending('company')
    if (pending) setTimeout(() => focus(pending), 350)
    const handler = (e: Event) => { const id = (e as CustomEvent).detail?.id; if (id) focus(id) }
    window.addEventListener('eg:company', handler)
    return () => { window.removeEventListener('eg:company', handler); clearTimeout(clear) }
  }, [])

  const openCompany = (i: number) => navigate(COMPANIES[i].to)

  return (
    <section className="eg-oc" id="our-companies" aria-label="Our companies" ref={sectionRef}>
      <style>{`
        .eg-oc {
          position: relative; overflow-x: clip;
          padding: clamp(56px, 8vw, 130px) clamp(24px, 4vw, 64px) clamp(64px, 9vw, 150px);
          background:
            radial-gradient(52% 46% at 50% 48%, rgba(198,162,78,0.09), transparent 64%),
            radial-gradient(120% 80% at 50% 0%, rgba(233,222,196,0.10), transparent 58%),
            linear-gradient(180deg, #ffffff 0%, #fcfbf8 55%, #f8f5ef 100%);
        }
        /* fine grain so the whites read as paper, not flat fill */
        .eg-oc::before {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 140px 140px; opacity: 0.05; mix-blend-mode: multiply;
        }
        /* soft vignette so the gold reads as metal on a lit surface */
        .eg-oc::after {
          content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(125% 90% at 50% 42%, transparent 52%, rgba(120,95,40,0.07) 100%);
        }
        .eg-oc-wrap { position: relative; z-index: 1; max-width: 1560px; margin: 0 auto; }

        /* ── header ── */
        .eg-oc-head { text-align: center; margin: 0 auto clamp(30px, 4vw, 60px); max-width: 40ch; }
        .eg-oc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Inter', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(10px, 0.8vw, 13px); letter-spacing: 2.4px;
          color: ${GOLD_MID}; margin: 0 0 clamp(12px, 1.4vw, 18px);
        }
        .eg-oc-eyebrow::before, .eg-oc-eyebrow::after {
          content: ''; width: clamp(20px, 3vw, 46px); height: 1px;
          background: linear-gradient(90deg, transparent, ${GOLD});
        }
        .eg-oc-eyebrow::after { background: linear-gradient(90deg, ${GOLD}, transparent); }
        .eg-oc-title {
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          font-size: clamp(30px, 4.4vw, 64px); line-height: 0.98; letter-spacing: -0.035em;
          color: ${NAVY}; margin: 0;
        }
        .eg-oc-title em { font-style: normal; font-weight: 800;
          background: linear-gradient(120deg, ${GOLD_DEEP}, ${GOLD_MID} 30%, ${GOLD} 55%, ${GOLD_HI} 78%, ${GOLD_MID});
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .eg-oc-sub {
          font-family: 'Inter', sans-serif; color: ${MUTED};
          font-size: clamp(14px, 1.1vw, 17px); line-height: 1.6;
          margin: clamp(12px, 1.4vw, 18px) auto 0; max-width: 52ch;
        }

        /* ── orbital arena ── */
        .eg-oc-arena {
          position: relative; margin: 0 auto;
          width: min(calc(100vw - 120px), 1480px);
          aspect-ratio: 1.28 / 1; min-height: 840px;
        }

        /* decorative rings + mesh (all non-interactive, compositor-only) */
        .eg-oc-deco { position: absolute; inset: 0; pointer-events: none; overflow: visible; z-index: 0; }

        /* concentric orbit rings - beveled so they read as raised metal, not flat strokes */
        .eg-oc-ring {
          position: absolute; left: 50%; top: 50%; border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 1.5px solid rgba(${RING_RGB},0.30);
          box-shadow:
            0 2px 6px -2px rgba(${RING_RGB},0.28),
            inset 0 1px 1px rgba(255,255,255,0.65),
            inset 0 -1px 2px rgba(${RING_RGB},0.20);
        }
        .eg-oc-ring.r1 { width: 27%; aspect-ratio: 1; border-color: rgba(${RING_RGB},0.52); }
        .eg-oc-ring.r2 { width: 47%; aspect-ratio: 1; border-color: rgba(${RING_RGB},0.40); }
        .eg-oc-ring.r3 { width: 67%; aspect-ratio: 1; border-style: dashed; border-color: rgba(${RING_RGB},0.28); box-shadow: none; }
        .eg-oc-ring.r4 { width: 89%; aspect-ratio: 1; border-color: rgba(${RING_RGB},0.18); box-shadow: none; }

        /* a slow, soft band of light drifting around the orbit rings - reads as
           polished metal catching the light, not a spinning gadget */
        @keyframes eg-oc-rotate { to { transform: translate(-50%, -50%) rotate(360deg); } }
        .eg-oc-sheen {
          position: absolute; left: 50%; top: 50%; aspect-ratio: 1; border-radius: 50%;
          transform: translate(-50%, -50%); will-change: transform;
          -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
          mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
        }
        .eg-oc-sheen.h1 { width: 27%;
          background: conic-gradient(from 0deg, transparent 0 70%, rgba(255,247,224,0.95) 84%, rgba(198,162,78,0.5) 90%, transparent 100%);
          animation: eg-oc-rotate 26s linear infinite; }
        .eg-oc-sheen.h2 { width: 47%;
          background: conic-gradient(from 150deg, transparent 0 74%, rgba(255,247,224,0.8) 86%, rgba(198,162,78,0.4) 92%, transparent 100%);
          animation: eg-oc-rotate 40s linear infinite reverse; }
        .eg-oc-sheen.h3 { width: 67%;
          background: conic-gradient(from 280deg, transparent 0 80%, rgba(255,247,224,0.6) 89%, transparent 100%);
          animation: eg-oc-rotate 62s linear infinite; }

        /* pulsing central halo */
        .eg-oc-glow {
          position: absolute; left: 50%; top: 50%; width: 42%; aspect-ratio: 1;
          transform: translate(-50%, -50%); border-radius: 50%;
          background: radial-gradient(circle, rgba(241,226,190,0.55), rgba(198,162,78,0.12) 55%, transparent 72%);
          filter: blur(6px); will-change: transform, opacity;
          animation: eg-oc-pulse 5.5s ease-in-out infinite;
        }
        @keyframes eg-oc-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1.09); opacity: 1; }
        }
        .eg-oc-mesh { position: absolute; inset: -6% -3%; opacity: 0.55;
          will-change: opacity; animation: eg-oc-twinkle 6s ease-in-out infinite; }
        @keyframes eg-oc-twinkle { 0%, 100% { opacity: 0.42; } 50% { opacity: 0.62; } }
        .eg-oc-mesh svg { width: 100%; height: 100%; }

        /* ── centre crest ── */
        /* core box shrink-wraps the crest, so translate(-50%,-50%) centres the
           LOGO MARK exactly on the ring centre; the wordmark hangs below it */
        .eg-oc-core {
          position: absolute; left: 50%; top: 50%; z-index: 3;
          transform: translate(-50%, -50%);
        }
        .eg-oc-core-in {
          position: relative; display: flex; flex-direction: column; align-items: center;
          text-align: center; will-change: transform, opacity;
        }
        .eg-oc-brand {
          position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; text-align: center;
          white-space: nowrap; margin-top: clamp(44px, 5.2vh, 74px);
        }

        /* crest = logo + milled ring */
        .eg-oc-crest { position: relative; display: inline-flex; align-items: center; justify-content: center; }
        .eg-oc-crest-ring {
          position: absolute; top: 50%; left: 50%; width: clamp(150px, 14.5vw, 226px); aspect-ratio: 1;
          transform: translate(-50%, -50%); border-radius: 50%; pointer-events: none;
          border: 1.5px solid rgba(${RING_RGB},0.55);
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.8),
            inset 0 -2px 4px rgba(${RING_RGB},0.28),
            0 6px 18px -6px rgba(${RING_RGB},0.45);
        }
        .eg-oc-logo {
          position: relative; z-index: 2; width: clamp(96px, 9vw, 148px); aspect-ratio: 1;
          filter: drop-shadow(0 10px 20px rgba(19,41,61,0.26));
          will-change: transform; animation: eg-oc-breathe 6.5s ease-in-out infinite;
        }
        @keyframes eg-oc-breathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.02); }
        }
        .eg-oc-logo-img {
          width: 100%; height: 100%; object-fit: contain; display: block;
        }
        .eg-oc-brand-name {
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          letter-spacing: -0.02em; line-height: 1; font-size: clamp(20px, 1.8vw, 30px);
          color: #A6B0B9; -webkit-text-fill-color: #A6B0B9;
          text-shadow: 0 1px 0 rgba(255,255,255,0.6);
        }
        .eg-oc-brand-tag {
          margin-top: clamp(6px, 0.7vw, 10px);
          font-family: 'Inter', sans-serif; font-weight: 700; text-transform: uppercase;
          letter-spacing: 2.2px; font-size: clamp(9px, 0.72vw, 12px); color: ${NAVY}; opacity: 0.62;
        }

        /* ── company card ── */
        .eg-oc-cards { display: contents; }
        .eg-oc-card {
          position: absolute; z-index: 2; width: clamp(248px, 21vw, 336px);
          cursor: pointer; outline: none;
        }
        .eg-oc-enter { display: block; will-change: transform, opacity; }
        .eg-oc-card.p-top { left: 50%; top: 0; transform: translateX(-50%); }
        .eg-oc-card.p-ul  { left: 0;    top: 50%; transform: translateY(-50%); }
        .eg-oc-card.p-ur  { right: 0;   top: 50%; transform: translateY(-50%); }
        .eg-oc-card.p-ll  { left: 15%;  bottom: 0; }
        .eg-oc-card.p-lr  { right: 15%; bottom: 0; }

        .eg-oc-inner {
          position: relative; padding: clamp(8px, 0.6vw, 11px);
          border-radius: clamp(13px, 1vw, 18px);
          background:
            linear-gradient(158deg, #fffefb, #f7f1e4) padding-box,
            linear-gradient(140deg, ${GOLD_HI} 6%, ${GOLD} 34%, ${GOLD_DEEP} 52%, ${GOLD_MID} 74%, ${GOLD_HI}) border-box;
          border: 1.5px solid transparent;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.9),
            0 12px 28px -18px rgba(120,88,18,0.42),
            0 0 0 3px rgba(217,180,91,0.08);
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease;
        }
        .eg-oc-card:hover .eg-oc-inner,
        .eg-oc-card:focus-visible .eg-oc-inner {
          transform: translateY(-6px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,1),
            0 26px 48px -22px rgba(120,88,18,0.5),
            0 0 0 3px rgba(217,180,91,0.20);
        }
        .eg-oc-card.lit .eg-oc-inner {
          transform: translateY(-4px);
          box-shadow: 0 26px 48px -22px rgba(184,136,30,0.65), 0 0 0 2.5px ${GOLD};
        }

        .eg-oc-thumb {
          position: relative; border-radius: clamp(9px, 0.7vw, 13px); overflow: hidden;
          aspect-ratio: 16 / 10; background: #0e1b28;
          box-shadow: 0 6px 16px -8px rgba(19,41,61,0.5);
        }
        .eg-oc-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transform: scale(1.02); transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-oc-card:hover .eg-oc-img { transform: scale(1.08); }
        .eg-oc-thumb-frame {
          position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(246,231,174,0.6);
          background:
            /* gold L-corners */
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) left 8px top 8px / 16px 2px no-repeat,
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) left 8px top 8px / 2px 16px no-repeat,
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) right 8px top 8px / 16px 2px no-repeat,
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) right 8px top 8px / 2px 16px no-repeat,
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) left 8px bottom 8px / 16px 2px no-repeat,
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) left 8px bottom 8px / 2px 16px no-repeat,
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) right 8px bottom 8px / 16px 2px no-repeat,
            linear-gradient(${GOLD_HI}, ${GOLD_HI}) right 8px bottom 8px / 2px 16px no-repeat,
            linear-gradient(180deg, rgba(10,18,28,0) 55%, rgba(10,18,28,0.42) 100%);
        }
        .eg-oc-name {
          margin: clamp(10px, 0.8vw, 14px) 0 clamp(5px, 0.4vw, 8px);
          font-family: 'Poppins', sans-serif; font-weight: 800; text-transform: uppercase;
          letter-spacing: -0.01em; line-height: 1.06; color: ${NAVY};
          font-size: clamp(14px, 1vw, 18px);
          padding-right: 24px;
        }
        .eg-oc-blurb {
          margin: 0 0 clamp(2px, 0.3vw, 5px);
          font-family: 'Inter', sans-serif; color: ${MUTED};
          font-size: clamp(11px, 0.74vw, 13px); line-height: 1.48;
        }
        .eg-oc-go {
          position: absolute; right: clamp(12px, 1vw, 18px); top: clamp(12px, 1vw, 18px);
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 50%; color: #fff;
          background: linear-gradient(150deg, ${GOLD}, ${GOLD_DEEP});
          box-shadow: 0 4px 10px -3px rgba(120,90,20,0.6), inset 0 1px 0 rgba(255,255,255,0.5);
          opacity: 0; transform: translateY(-4px) scale(0.9);
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .eg-oc-card:hover .eg-oc-go,
        .eg-oc-card:focus-visible .eg-oc-go { opacity: 1; transform: translateY(0) scale(1); }

        /* ═══ responsive: collapse orbit → grid below tablet-landscape ═══ */
        @media (max-width: 1023px) {
          .eg-oc-arena {
            width: 100%; aspect-ratio: auto; min-height: 0;
            display: flex; flex-direction: column; align-items: center;
            gap: clamp(26px, 4vw, 40px);
          }
          .eg-oc-deco { position: absolute; inset: 0; }
          .eg-oc-mesh, .eg-oc-ring.r3, .eg-oc-ring.r4, .eg-oc-sheen { display: none; }
          .eg-oc-ring.r1, .eg-oc-ring.r2, .eg-oc-glow {
            top: clamp(90px, 16vw, 150px); left: 50%;
          }
          .eg-oc-ring.r1 { width: 180px; }
          .eg-oc-ring.r2 { width: 300px; }
          .eg-oc-glow { width: 240px; }
          .eg-oc-core {
            position: static; transform: none; width: 100%;
            display: flex; justify-content: center;
            margin-bottom: clamp(6px, 2vw, 16px);
          }
          /* stacked layout: brand back into flow */
          .eg-oc-brand { position: static; transform: none; margin-top: clamp(14px, 3vw, 20px); }
          .eg-oc-cards {
            display: grid; width: 100%;
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(16px, 2.5vw, 26px);
          }
          .eg-oc-card { position: static; width: 100%; transform: none !important; }
        }
        @media (max-width: 620px) {
          .eg-oc-cards { grid-template-columns: 1fr; max-width: 460px; }
          .eg-oc-go { opacity: 1; transform: none; }
        }

        /* ═══ large screens ═══ */
        @media (min-width: 1920px) { .eg-oc-wrap { max-width: 1780px; } .eg-oc-arena { max-width: 1560px; } }
        @media (min-width: 2560px) { .eg-oc-wrap { max-width: 2320px; } .eg-oc-arena { max-width: 1720px; } }

        @media (prefers-reduced-motion: reduce) {
          .eg-oc-sheen, .eg-oc-glow, .eg-oc-mesh,
          .eg-oc-logo { animation: none; }
          .eg-oc-inner, .eg-oc-img, .eg-oc-go { transition: none; }
        }
      `}</style>

      <div className="eg-oc-wrap">
        <motion.div
          className="eg-oc-head"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="eg-oc-eyebrow">Our Companies</p>
          <h2 className="eg-oc-title">One group. <em>Many industries.</em></h2>
          <p className="eg-oc-sub">
            Five specialist companies orbit a single mark - united by shared services,
            standards and the drive to build reliable solutions at scale.
          </p>
        </motion.div>

        <div className="eg-oc-arena">
          <div className="eg-oc-deco" aria-hidden>
            <div className="eg-oc-mesh">
              <svg viewBox="0 0 1200 740" preserveAspectRatio="none">
                <g stroke="rgba(166,132,58,0.30)" strokeWidth="1" fill="none">
                  <path d="M40 90 L150 150 L120 260 L30 300" />
                  <path d="M150 150 L260 110 L300 210 L120 260" />
                  <path d="M1160 640 L1050 590 L1080 480 L1170 440" />
                  <path d="M1050 590 L940 630 L900 530 L1080 480" />
                  <path d="M60 660 L170 620 L210 700" />
                  <path d="M1140 100 L1030 150 L1060 40" />
                </g>
                <g fill="rgba(166,132,58,0.60)">
                  <circle cx="40" cy="90" r="3" /><circle cx="150" cy="150" r="3.4" />
                  <circle cx="260" cy="110" r="3" /><circle cx="120" cy="260" r="3" />
                  <circle cx="30" cy="300" r="2.6" /><circle cx="300" cy="210" r="2.6" />
                  <circle cx="1160" cy="640" r="3" /><circle cx="1050" cy="590" r="3.4" />
                  <circle cx="940" cy="630" r="3" /><circle cx="1080" cy="480" r="3" />
                  <circle cx="1170" cy="440" r="2.6" /><circle cx="900" cy="530" r="2.6" />
                  <circle cx="60" cy="660" r="2.6" /><circle cx="170" cy="620" r="3" />
                  <circle cx="210" cy="700" r="2.6" /><circle cx="1140" cy="100" r="2.6" />
                  <circle cx="1030" cy="150" r="3" /><circle cx="1060" cy="40" r="2.6" />
                </g>
              </svg>
            </div>
            <span className="eg-oc-ring r4" />
            <span className="eg-oc-ring r3" />
            <span className="eg-oc-ring r2" />
            <span className="eg-oc-glow" />
            <span className="eg-oc-ring r1" />
            <span className="eg-oc-sheen h3" />
            <span className="eg-oc-sheen h2" />
            <span className="eg-oc-sheen h1" />
          </div>

          <div className="eg-oc-core">
            <motion.div
              className="eg-oc-core-in"
              initial={anim ? { opacity: 0, scale: 0.9 } : false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <div className="eg-oc-crest">
                <span className="eg-oc-crest-ring" aria-hidden />
                <div className="eg-oc-logo">
                  <img
                    className="eg-oc-logo-img"
                    src={LOGO}
                    alt="Eloma Group"
                    width={148}
                    height={148}
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="eg-oc-cards">
            {COMPANIES.map((c, i) => (
              <Card
                key={c.slug}
                c={c}
                i={i}
                anim={anim}
                lit={lit === i}
                onOpen={() => openCompany(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
