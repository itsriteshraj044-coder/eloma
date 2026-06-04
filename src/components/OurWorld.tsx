import { useRef } from 'react'
import {
  motion, useScroll, useTransform, useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { ArrowUpRight, Plus } from 'lucide-react'

const NAVY  = '#1A2B3C'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.50)'

/* ═══════════════════════════════════════════════════════════════
   3D FLOATING SHAPES — glassy / metallic objects that drift, grow
   to fill the screen mid-scroll, then recede. Navy / green palette.
   ═══════════════════════════════════════════════════════════════ */
type Shape = {
  kind: 'capsule' | 'sphere' | 'square' | 'pill' | 'triangle'
  tone: 'silver' | 'navy' | 'green'
  size: number; w?: number          // vw
  top: string; left: string
  rotate: number; rotX: number; rotY: number
  drift: number                     // px parallax over full scroll
  grow: number                      // peak scale multiplier mid-scroll
  icon?: 'arrow' | 'plus'
}

const SHAPES: Shape[] = [
  // big silver objects — these fill the screen at peak
  { kind: 'sphere',  tone: 'silver', size: 46,        top: '34%', left: '46%', rotate: 0,   rotX: 0,   rotY: 0,   drift: -420, grow: 1.35 },
  { kind: 'capsule', tone: 'silver', size: 26, w: 44, top: '50%', left: '16%', rotate: -24, rotX: 16,  rotY: -14, drift: -360, grow: 1.28 },
  { kind: 'sphere',  tone: 'silver', size: 30,        top: '12%', left: '72%', rotate: 0,   rotX: 0,   rotY: 0,   drift: -300, grow: 1.30 },
  { kind: 'sphere',  tone: 'silver', size: 22,        top: '64%', left: '74%', rotate: 0,   rotX: 0,   rotY: 0,   drift: -480, grow: 1.22 },
  // glass icon cards
  { kind: 'square',  tone: 'silver', size: 15, top: '60%', left: '6%',  rotate: -10, rotX: 18,  rotY: 16,  drift: -200, grow: 1.18, icon: 'arrow' },
  { kind: 'square',  tone: 'silver', size: 13, top: '18%', left: '14%', rotate: 9,   rotX: -14, rotY: 14,  drift: -150, grow: 1.15, icon: 'plus' },
  // green + navy accents
  { kind: 'sphere',  tone: 'green',  size: 8,  top: '70%', left: '60%', rotate: 0,   rotX: 0,   rotY: 0,   drift: -340, grow: 1.2 },
  { kind: 'capsule', tone: 'green',  size: 5,  w: 11, top: '28%', left: '40%', rotate: -18, rotX: 0, rotY: 0, drift: -260, grow: 1.2 },
  { kind: 'capsule', tone: 'navy',   size: 4,  w: 9,  top: '80%', left: '34%', rotate: 14,  rotX: 0, rotY: 0, drift: -180, grow: 1.1 },
  { kind: 'pill',    tone: 'green',  size: 3,  w: 8,  top: '46%', left: '88%', rotate: 0,   rotX: 0, rotY: 0, drift: -220, grow: 1.1 },
  { kind: 'triangle', tone: 'green', size: 12, top: '22%', left: '86%', rotate: 14, rotX: 0, rotY: 0, drift: -260, grow: 1.15 },
]

const SILVER  = 'linear-gradient(145deg, #FFFFFF 0%, #E9F0EC 42%, #C8D6CF 100%)'
const NAVY_G  = `linear-gradient(145deg, #2E465B 0%, ${NAVY} 100%)`
const GREEN_G = 'linear-gradient(145deg, #5BCBA3 0%, #2A9B74 100%)'

function toneBg(t: Shape['tone'])     { return t === 'silver' ? SILVER : t === 'navy' ? NAVY_G : GREEN_G }
function toneShadow(t: Shape['tone']) {
  if (t === 'green') return '0 22px 48px rgba(60,185,140,0.30)'
  if (t === 'navy')  return '0 22px 48px rgba(26,43,60,0.34)'
  return '0 34px 70px rgba(26,43,60,0.16), inset 0 3px 4px rgba(255,255,255,0.9), inset 0 -12px 24px rgba(26,43,60,0.07)'
}

function FloatingShape({ shape, progress, reduce }: {
  shape: Shape; progress: MotionValue<number>; reduce: boolean | null
}) {
  const y       = useTransform(progress, [0, 1], [0, reduce ? 0 : shape.drift])
  const rot     = useTransform(progress, [0, 1], [shape.rotate, reduce ? shape.rotate : shape.rotate + 10])
  const scale   = useTransform(progress, [0.12, 0.6, 1], [0.7, reduce ? 1 : shape.grow, shape.grow])
  // subtle behind the manifesto → bold once it clears → stay full to the end
  const opacity = useTransform(progress, [0, 0.12, 0.55, 1], [0.32, 0.62, 1, 1])

  if (shape.kind === 'triangle') {
    return (
      <motion.div aria-hidden style={{
        position: 'absolute', top: shape.top, left: shape.left,
        width: `${shape.size}vw`, height: `${shape.size}vw`,
        y, rotate: rot, scale, opacity, pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}>
        <svg viewBox="0 0 100 100" width="100%" height="100%" fill="none">
          <path d="M50 12 L88 80 L12 80 Z"
            stroke="rgba(60,185,140,0.5)" strokeWidth="3" strokeLinejoin="round" />
        </svg>
      </motion.div>
    )
  }

  if (shape.kind === 'pill') {
    return (
      <motion.div aria-hidden style={{
        position: 'absolute', top: shape.top, left: shape.left,
        width: `${shape.w}vw`, height: `${shape.size}vw`,
        y, rotate: rot, scale, opacity,
        background: GREEN, borderRadius: 999,
        boxShadow: '0 12px 26px rgba(60,185,140,0.4)',
        pointerEvents: 'none', willChange: 'transform, opacity',
      }} />
    )
  }

  const radius =
    shape.kind === 'sphere' ? '50%' :
    shape.kind === 'capsule' ? '999px' : '24%'
  const width  = shape.kind === 'capsule' ? `${shape.w}vw` : `${shape.size}vw`
  const height = `${shape.size}vw`

  return (
    <motion.div aria-hidden style={{
      position: 'absolute', top: shape.top, left: shape.left,
      width, height,
      y, rotate: rot, scale,
      rotateX: reduce ? 0 : shape.rotX,
      rotateY: reduce ? 0 : shape.rotY,
      opacity,
      background: toneBg(shape.tone),
      borderRadius: radius,
      boxShadow: toneShadow(shape.tone),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      pointerEvents: 'none', willChange: 'transform, opacity',
    }}>
      {shape.icon === 'arrow' && <ArrowUpRight color={NAVY} strokeWidth={2} style={{ width: '36%', height: '36%', opacity: 0.4 }} />}
      {shape.icon === 'plus'  && <Plus        color={NAVY} strokeWidth={2} style={{ width: '36%', height: '36%', opacity: 0.4 }} />}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN — long scroll-driven 3D experience
   Phase 1: manifesto  →  Phase 2/3: 3D shapes fill screen  →  Phase 4: closing line
   ═══════════════════════════════════════════════════════════════ */
export function OurWorld() {
  const ref    = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Opening manifesto — holds most of the scroll, then drifts up & fades near the end
  const introOpacity = useTransform(scrollYProgress, [0, 0.55, 0.82], [1, 1, 0])
  const introY       = useTransform(scrollYProgress, [0, 0.82], [0, reduce ? 0 : -160])
  const introScale   = useTransform(scrollYProgress, [0, 0.82], [1, reduce ? 1 : 0.93])

  // Scroll cue
  const cueOpacity   = useTransform(scrollYProgress, [0, 0.07], [1, 0])

  return (
    <section className="ow-root" aria-label="Eloma Group — one shared root">
      <div ref={ref} className="ow-stage">
        <div className="ow-sticky">

          {/* 3D floating shapes — present throughout, peak mid-scroll */}
          <div className="ow-shapes" aria-hidden>
            {SHAPES.map((s, i) => (
              <FloatingShape key={i} shape={s} progress={scrollYProgress} reduce={reduce} />
            ))}
          </div>

          {/* Manifesto */}
          <motion.div className="ow-layer ow-intro" style={{ opacity: introOpacity, y: introY, scale: introScale }}>
            <h2 className="ow-statement">
              Eloma Group unites{' '}
              <span className="ow-pill">travel</span>,{' '}
              <span className="ow-accent">technology</span>, customer
              experience &amp; <span className="ow-accent">logistics</span>.
            </h2>
            <p className="ow-subline">Independent businesses, growing from one shared root.</p>
          </motion.div>

          {/* Scroll cue */}
          <motion.div className="ow-cue" style={{ opacity: cueOpacity }} aria-hidden>
            <span>Scroll</span>
            <span className="ow-cue-line" />
          </motion.div>

        </div>
      </div>

      <style>{`
        .ow-root {
          background: linear-gradient(180deg, #FBFBF9 0%, #EEF3F0 50%, #FBFBF9 100%);
          position: relative;
          overflow: hidden;
        }

        /* Stage length tuned so shapes stay active the whole scroll — no dead space */
        .ow-stage  { height: 200vh; position: relative; }
        .ow-sticky {
          position: sticky; top: 0;
          height: 100vh;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          perspective: 1500px;
        }
        .ow-shapes {
          position: absolute; inset: 0;
          transform-style: preserve-3d;
          pointer-events: none;
        }

        .ow-layer {
          position: absolute;
          width: 100%;
          max-width: 1560px;
          padding: 0 clamp(24px, 6vw, 120px);
          box-sizing: border-box;
          z-index: 2;
          will-change: transform, opacity;
        }

        .ow-statement {
          margin: 0;
          font-size: clamp(32px, 5.4vw, 96px);
          font-weight: 900;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: ${NAVY};
        }
        .ow-accent { color: ${GREEN}; }
        .ow-pill {
          display: inline-block;
          background: ${GREEN};
          color: #fff;
          border-radius: 999px;
          padding: 0 clamp(12px, 1.8vw, 32px);
          line-height: 1.16;
          box-shadow: 0 14px 34px rgba(60,185,140,0.32);
        }
        .ow-subline {
          margin: clamp(20px, 2.4vw, 38px) 0 0;
          font-size: clamp(14px, 1.3vw, 19px);
          font-weight: 500;
          color: ${MUTED};
          letter-spacing: 0.2px;
        }

        .ow-eyebrow {
          display: inline-flex; align-items: center; gap: 9px;
          margin-bottom: clamp(16px, 2vw, 28px);
          font-size: clamp(11px, 0.85vw, 14px);
          font-weight: 800; letter-spacing: 3px; text-transform: uppercase;
          color: ${GREEN};
        }
        .ow-eyebrow-dot {
          width: 7px; height: 7px; border-radius: 50%; background: ${GREEN};
          box-shadow: 0 0 0 4px ${GREEN}22;
        }

        /* Scroll cue */
        .ow-cue {
          position: absolute;
          bottom: clamp(28px, 5vh, 56px);
          left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          font-size: 10px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: ${MUTED};
          z-index: 3;
        }
        .ow-cue-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, ${GREEN}, transparent);
          animation: ow-cue-pulse 1.8s ease-in-out infinite;
        }
        @keyframes ow-cue-pulse {
          0%, 100% { transform: scaleY(0.4); opacity: 0.4; transform-origin: top; }
          50%      { transform: scaleY(1);   opacity: 1;   transform-origin: top; }
        }

        @media (max-width: 680px) {
          .ow-stage { height: 180vh; }
          .ow-cue   { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ow-cue-line { animation: none; }
        }
      `}</style>
    </section>
  )
}
