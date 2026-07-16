/* ───────────────────────────────────────────────
   EgConnected - "Connected Globally".
   Premium animated world map (dotted map + connection arcs
   from the Australian HQ to every market) over a clean,
   restrained stat row. Built on the Aceternity world-map
   pattern via ./EgWorldMap.

   SAVED alternatives (not deleted):
     • cobe WebGL globe → ./EgConnectedCobe.tsx (+ ./EgGlobe.tsx)
     • CSS-podium globe → ./EgGlobeScene2.tsx
   ─────────────────────────────────────────────── */
import { motion, useReducedMotion } from 'framer-motion'
import { CountUp } from './egScroll'
import { EgWorldMap } from './EgWorldMap'
import type { Place, Arc } from './EgWorldMap'

const INK   = '#13293D'
const GREEN = '#3CB98C'
const MUTED = 'rgba(19,41,61,0.52)'
const EASE  = [0.16, 1, 0.3, 1] as [number, number, number, number]

const HUB: Place = { lat: -33.8688, lng: 151.2093, label: 'Australia', hub: true }
const MARKETS: Place[] = [
  HUB,
  { lat: 40.7128,  lng: -74.0060, label: 'US' },          // United States
  { lat: 50.4500,  lng: -97.1500, label: 'Canada' },      // nudged NW of US for arc spacing
  { lat: 51.5074,  lng: -0.1278,  label: 'UK' },          // London
  { lat: 47.0000,  lng: 16.0000,  label: 'Europe' },      // nudged SE of UK for arc spacing
  { lat: 25.2048,  lng: 55.2708,  label: 'Dubai' },       // UAE
  { lat: 19.0760,  lng: 72.8777,  label: 'India' },       // Mumbai
  { lat: 31.2304,  lng: 121.4737, label: 'China' },       // Shanghai
  { lat: 1.3521,   lng: 103.8198, label: 'Singapore' },
  { lat: 35.6762,  lng: 139.6503, label: 'Japan' },       // Tokyo
]
const ARCS: Arc[] = MARKETS.slice(1).map((to): Arc => ({ from: HUB, to }))

const STATS = [
  { n: 5, title: 'Companies', sub: 'UNITED UNDER ONE GROUP' },
  { n: 8, title: 'Countries', sub: 'ACTIVE OPERATIONS WORLDWIDE' },
  { n: 4, title: 'Verticals', sub: 'DISTINCT INDUSTRY SECTORS' },
  { n: 1, title: 'Vision',    sub: 'SHARED ACROSS EVERY TEAM' },
]

const rise = (reduce: boolean | null, d = 0) => ({
  initial: reduce ? false : { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: EASE },
})

export function EgConnected() {
  const reduce = useReducedMotion()
  return (
    <section className="cg" aria-label="Connected globally">
      <style>{`
        .cg { position:relative; overflow:hidden; background:
          radial-gradient(42% 58% at 2% 16%, rgba(74,134,210,0.10) 0%, transparent 55%),
          radial-gradient(46% 60% at 100% 84%, rgba(212,175,55,0.14) 0%, transparent 55%),
          radial-gradient(60% 50% at 50% -6%, rgba(212,175,55,0.07), transparent 60%),
          linear-gradient(180deg,#ffffff 0%, #faf7ee 100%);
          padding:clamp(64px,9vw,140px) clamp(24px,5vw,80px); }
        .cg-in { max-width:1640px; margin:0 auto; }
        .cg-top { display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap;
          margin:0 0 clamp(20px,3vw,38px); }
        .cg-head { text-align:center; max-width:60ch; margin:0 auto clamp(28px,4vw,52px); }
        .cg-ey { display:inline-flex; align-items:center; gap:11px; font-family:'Inter',sans-serif; font-weight:700;
          letter-spacing:3px; text-transform:uppercase; font-size:clamp(10px,0.8vw,12px); color:${GREEN}; margin:0; }
        .cg-ey i { width:6px; height:6px; border-radius:50%; background:${GREEN}; box-shadow:0 0 0 0 rgba(60,185,140,0.6); animation:cgp 2.4s ease-in-out infinite; }
        .cg-since { color:${INK}; }
        .cg-since i { animation:none; box-shadow:none; }
        @keyframes cgp { 0%,100%{box-shadow:0 0 0 0 rgba(60,185,140,0.5);} 50%{box-shadow:0 0 0 7px rgba(60,185,140,0);} }
        .cg-h { font-family:'Poppins',sans-serif; font-weight:600; letter-spacing:-0.03em; line-height:1.05;
          font-size:clamp(30px,4vw,60px); color:${INK}; margin:clamp(16px,2vw,24px) 0 0; }
        .cg-h em { color:#8B939F; font-style:normal; }
        .cg-p { font-family:'Inter',sans-serif; font-size:clamp(14px,1.05vw,17px); line-height:1.7; color:${MUTED}; margin:clamp(14px,1.6vw,20px) auto 0; max-width:54ch; }

        .cg-map { position:relative; margin:clamp(8px,2vw,28px) auto 0; max-width:1280px; }

        .cg-stats { display:grid; grid-template-columns:repeat(4,1fr); margin-top:clamp(24px,4vw,56px);
          border-top:1px solid rgba(19,41,61,0.14); }
        .cg-cell { padding:clamp(22px,2.6vw,38px) clamp(14px,1.6vw,28px) 0; text-align:center; }
        .cg-cell + .cg-cell { border-left:1px solid rgba(19,41,61,0.10); }
        .cg-n { font-family:'Poppins',sans-serif; font-weight:600; font-variant-numeric:tabular-nums; font-feature-settings:'tnum' 1;
          font-size:clamp(46px,5.2vw,84px); line-height:0.86; letter-spacing:-0.05em; color:${INK}; margin:0; }
        .cg-t { font-family:'Inter',sans-serif; font-weight:700; text-transform:uppercase; letter-spacing:2px;
          font-size:clamp(12px,0.92vw,14px); color:${INK}; margin:clamp(16px,1.8vw,24px) 0 6px; }
        .cg-s { font-family:'Inter',sans-serif; font-size:clamp(12.5px,0.9vw,14px); line-height:1.5; color:${MUTED}; margin:0 auto; max-width:22ch; }

        @media (max-width:760px){ .cg-stats{grid-template-columns:1fr 1fr;} .cg-cell:nth-child(3){border-left:none;} .cg-cell:nth-child(n+3){border-top:1px solid rgba(19,41,61,0.10);} }
        @media (max-width:430px){ .cg-stats{grid-template-columns:1fr;} .cg-cell + .cg-cell{border-left:none;border-top:1px solid rgba(19,41,61,0.10);} }
      `}</style>

      <div className="cg-in">
        <motion.div className="cg-top" {...rise(reduce)}>
          <p className="cg-ey"><i />Connected Globally</p>
          <p className="cg-ey cg-since"><i />Est. Australia</p>
        </motion.div>

        <motion.div className="cg-head" {...rise(reduce, 0.05)}>
          <h2 className="cg-h">One group, connected <em>across the world</em>.</h2>
        </motion.div>

        <motion.div className="cg-map" {...rise(reduce, 0.08)}>
          <EgWorldMap markers={MARKETS} arcs={ARCS} />
        </motion.div>

        <div className="cg-stats">
          {STATS.map((s, i) => (
            <motion.div className="cg-cell" key={s.title} {...rise(reduce, 0.06 * i)}>
              <p className="cg-n"><CountUp to={s.n} duration={1.2 + i * 0.12} /></p>
              <p className="cg-t">{s.title}</p>
              <p className="cg-s">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
