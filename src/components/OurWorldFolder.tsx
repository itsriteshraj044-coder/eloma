import { ArrowRight } from 'lucide-react'

const NAVY  = '#1A2B3C'
const GREEN = '#3CB98C'
const MUTED = 'rgba(26,43,60,0.50)'

const SILVER  = 'linear-gradient(145deg, #FFFFFF 0%, #E9F0EC 42%, #C8D6CF 100%)'
const NAVY_G  = `linear-gradient(145deg, #2E465B 0%, ${NAVY} 100%)`
const GREEN_G = 'linear-gradient(145deg, #5BCBA3 0%, #2A9B74 100%)'

const F_FRONT   = '#3B4EFF'
const F_BACK    = '#2232CC'
const F_DEEP    = '#1A28B0'
const ARROW_CLR = '#FF9F43'

/*
  SVG feTurbulence noise textures embedded as data-URIs.
  FOLDER_NOISE — coarser grain for the folder cardboard surface.
  PAPER_NOISE  — finer, lighter grain for the file-card paper.
*/
const FOLDER_NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.70' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`
const PAPER_NOISE  = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

export function OurWorldFolder() {
  const goToBusinesses = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('our-businesses')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="owf-root">
      {/* Ambient floating shapes */}
      <div className="owf-fsbg" aria-hidden>
        <span className="owf-fs owf-fs-1" />
        <span className="owf-fs owf-fs-2" />
        <span className="owf-fs owf-fs-3" />
        <span className="owf-fs owf-fs-4" />
        <span className="owf-fs owf-fs-5" />
      </div>

      {/* Background watermark */}
      <div className="owf-bgtext" aria-hidden>GROUP</div>

      <div className="owf-wrap">
        {/* Editorial heading */}
        <div className="owf-heading" aria-label="Eloma Group">
          <span className="owf-h-line owf-h-plain">ELOMA</span>
          <span className="owf-h-line owf-h-boxed">GROUP</span>
        </div>

        {/* ── Folder ── */}
        <a
          href="#our-businesses"
          onClick={goToBusinesses}
          className="owf-folder-link"
          aria-label="Open our businesses"
        >
          <div className="owf-folder">

            {/* Back body + tab */}
            <div className="owf-back">
              <div className="owf-tab" />
            </div>

            {/* File cards peeking above the flap */}
            <div className="owf-files" aria-hidden>
              {/* File 4 — orange, furthest back */}
              <div className="owf-file owf-file-4">
                <div className="owf-file-bar" style={{ background: 'linear-gradient(100deg,#FF6B35,#FF9055)' }} />
                <div className="owf-file-body">
                  <div className="owf-file-line" style={{ width: '72%', background: '#FF6B3530' }} />
                  <div className="owf-file-line owf-file-line--sm" style={{ width: '55%', background: '#FF6B351E' }} />
                  <div className="owf-file-thumb" style={{ background: 'linear-gradient(135deg,#FF9F43,#FF6B35)' }} />
                </div>
              </div>
              {/* File 3 — purple */}
              <div className="owf-file owf-file-3">
                <div className="owf-file-bar" style={{ background: 'linear-gradient(100deg,#7B68EE,#9D8FFF)' }} />
                <div className="owf-file-body">
                  <div className="owf-file-line" style={{ width: '65%', background: '#7B68EE30' }} />
                  <div className="owf-file-line owf-file-line--sm" style={{ width: '48%', background: '#7B68EE1E' }} />
                  <div className="owf-file-thumb" style={{ background: 'linear-gradient(135deg,#A78BFA,#7B68EE)' }} />
                </div>
              </div>
              {/* File 2 — coral */}
              <div className="owf-file owf-file-2">
                <div className="owf-file-bar" style={{ background: 'linear-gradient(100deg,#FF4757,#FF6B7A)' }} />
                <div className="owf-file-body">
                  <div className="owf-file-line" style={{ width: '80%', background: '#FF475730' }} />
                  <div className="owf-file-line owf-file-line--sm" style={{ width: '60%', background: '#FF47571E' }} />
                  <div className="owf-file-thumb" style={{ background: 'linear-gradient(135deg,#FF6B81,#FF4757)' }} />
                </div>
              </div>
              {/* File 1 — green, front-most */}
              <div className="owf-file owf-file-1">
                <div className="owf-file-bar" style={{ background: 'linear-gradient(100deg,#3CB98C,#5BCBA3)' }} />
                <div className="owf-file-body">
                  <div className="owf-file-line" style={{ width: '68%', background: '#3CB98C30' }} />
                  <div className="owf-file-line owf-file-line--sm" style={{ width: '50%', background: '#3CB98C1E' }} />
                  <div className="owf-file-thumb" style={{ background: 'linear-gradient(135deg,#5BCBA3,#2A9B74)' }} />
                </div>
              </div>
            </div>

            {/* Front flap */}
            <div className="owf-front">
              {/* Physical fold crease at the top edge */}
              <div className="owf-crease" aria-hidden />
              {/* Sheen highlight */}
              <div className="owf-sheen" aria-hidden />
              {/* ELOMA embossed badge */}
              <span className="owf-label">ELOMA</span>
              {/* Ghost watermark */}
              <span className="owf-watermark" aria-hidden>eloma</span>
              {/* Arrow CTA button */}
              <span className="owf-arrow">
                <ArrowRight size={22} color={NAVY} strokeWidth={2.4} />
              </span>
            </div>

          </div>
        </a>

        <p className="owf-hint">Click to explore our businesses</p>
      </div>

      <style>{`
        /* ── Root section ── */
        .owf-root {
          position: relative; z-index: 2;
          overflow: hidden;
          background: #EEF3F0;
          display: flex; align-items: center; justify-content: center;
          padding: clamp(56px, 7vh, 100px) clamp(24px, 4vw, 64px) clamp(80px, 11vw, 150px);
          margin-top: -50vh;
        }

        /* ── Floating ambient shapes ── */
        .owf-fsbg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
        .owf-fs   { position: absolute; display: block; will-change: transform; }
        .owf-fs-1 {
          width: clamp(300px, 42vw, 660px); aspect-ratio: 1; border-radius: 50%;
          top: -16%; left: -10%; background: ${SILVER}; opacity: 0.90;
          box-shadow: 0 34px 70px rgba(26,43,60,0.16), inset 0 3px 4px rgba(255,255,255,0.9),
                      inset 0 -12px 24px rgba(26,43,60,0.07);
          animation: owf-float-a 18s ease-in-out infinite;
        }
        .owf-fs-2 {
          width: clamp(260px, 36vw, 580px); aspect-ratio: 1.8 / 1; border-radius: 999px;
          bottom: -12%; right: -7%; background: ${SILVER}; opacity: 0.85;
          box-shadow: 0 34px 70px rgba(26,43,60,0.16), inset 0 3px 4px rgba(255,255,255,0.9),
                      inset 0 -12px 24px rgba(26,43,60,0.07);
          animation: owf-float-b 22s ease-in-out infinite;
        }
        .owf-fs-3 {
          width: clamp(72px, 8.5vw, 132px); aspect-ratio: 1; border-radius: 50%;
          top: 13%; right: 10%; background: ${GREEN_G}; opacity: 1;
          box-shadow: 0 22px 48px rgba(60,185,140,0.30);
          animation: owf-float-a 12s ease-in-out infinite;
        }
        .owf-fs-4 {
          width: clamp(104px, 13vw, 200px); aspect-ratio: 2.3 / 1; border-radius: 999px;
          bottom: 15%; left: 7%; background: ${NAVY_G}; opacity: 0.90;
          box-shadow: 0 22px 48px rgba(26,43,60,0.30);
          animation: owf-float-b 16s ease-in-out infinite;
        }
        .owf-fs-5 {
          width: clamp(140px, 17vw, 270px); aspect-ratio: 1; border-radius: 50%;
          top: 34%; left: 4%; background: ${SILVER}; opacity: 0.62;
          box-shadow: 0 34px 70px rgba(26,43,60,0.13), inset 0 3px 4px rgba(255,255,255,0.80);
          animation: owf-float-a 26s ease-in-out infinite;
        }
        @keyframes owf-float-a {
          0%, 100% { transform: translateY(0)    rotate(0deg); }
          50%      { transform: translateY(-24px) rotate(4deg); }
        }
        @keyframes owf-float-b {
          0%, 100% { transform: translateY(0)   rotate(0deg);  }
          50%      { transform: translateY(20px) rotate(-3deg); }
        }

        /* ── Layout wrapper ── */
        .owf-wrap {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(18px, 2vw, 28px);
        }

        /* ── Background watermark ── */
        .owf-bgtext {
          position: absolute; bottom: -6%; left: 50%;
          transform: translateX(-50%);
          font-size: clamp(140px, 24vw, 400px);
          font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase;
          color: rgba(26,43,60,0.07);
          white-space: nowrap; user-select: none; pointer-events: none; z-index: 0;
          font-family: "Helvetica Neue","Arial Black",Arial,sans-serif; line-height: 1;
        }

        /* ── Editorial heading ── */
        .owf-heading {
          display: flex; flex-direction: column; align-items: center;
          gap: 6px; line-height: 1;
        }
        .owf-h-line {
          display: block;
          font-size: clamp(36px, 5.5vw, 74px);
          font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase;
          font-family: "Helvetica Neue","Arial Black",Arial,sans-serif; line-height: 1.05;
        }
        .owf-h-plain { color: ${MUTED}; }
        .owf-h-boxed {
          color: ${NAVY}; border: 2.5px solid ${NAVY};
          padding: 2px 22px 5px; border-radius: 7px;
        }
        .owf-hint {
          font-size: clamp(12px, 0.95vw, 14px);
          font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
          color: ${GREEN}; margin: 0;
        }

        /* ── Folder container ── */
        .owf-folder-link {
          text-decoration: none; display: block;
          perspective: 1600px;
        }
        .owf-folder {
          position: relative;
          width: clamp(300px, 38vw, 500px);
          height: clamp(240px, 30vw, 400px);
          transform-style: preserve-3d;
          cursor: pointer;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        /* Whole folder tilts on hover to show 3-D depth */
        .owf-folder-link:hover .owf-folder {
          transform: rotateX(6deg) rotateY(-4deg);
        }

        /* ── Back body ──
           Three background layers (front→back):
           1. SVG fractal-noise for cardboard grain
           2. Radial key-light highlight (top-left)
           3. Multi-stop directional colour gradient
        */
        .owf-back {
          position: absolute; inset: 0;
          border-radius: 22px;
          background-color: ${F_DEEP};
          background-image:
            ${FOLDER_NOISE},
            radial-gradient(ellipse 110% 70% at 28% 18%, rgba(255,255,255,0.13) 0%, transparent 55%),
            linear-gradient(155deg, #2E46DD 0%, ${F_BACK} 45%, ${F_DEEP} 100%);
          background-size: 300px 300px, 100% 100%, 100% 100%;
          /* Ambient + key + deep + coloured glow + inner rim lights */
          box-shadow:
            0 2px  4px  rgba(26,43,60,0.07),
            0 8px  20px rgba(26,43,60,0.18),
            0 28px 56px rgba(26,43,60,0.32),
            0 52px 100px rgba(26,43,60,0.28),
            0 70px 140px rgba(34,50,204,0.20),
            inset 0  1px 0 rgba(255,255,255,0.22),
            inset 0 -1px 0 rgba(0,0,0,0.20);
          transform: translateZ(0);
        }

        /* Tab notch — same texture as back */
        .owf-tab {
          position: absolute;
          top: -9%; left: 8%; width: 30%; height: 20%;
          border-radius: 14px 14px 0 0;
          background-color: ${F_DEEP};
          background-image:
            ${FOLDER_NOISE},
            linear-gradient(155deg, #2A40D8 0%, ${F_BACK} 60%, ${F_DEEP} 100%);
          background-size: 300px 300px, 100% 100%;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), inset -1px 0 0 rgba(0,0,0,0.12);
        }

        /* ── File cards ──
           Paper texture: off-white base + SVG noise overlay.
        */
        .owf-files {
          position: absolute; left: 4%; right: 4%; top: 3%; height: 48%;
          transform: translateZ(18px);
          display: flex; flex-direction: column; justify-content: flex-start; gap: 0;
        }
        .owf-file {
          position: absolute; left: 0; right: 0; height: 88%;
          border-radius: 10px 10px 0 0; overflow: hidden;
          background-color: #F8FAFA;
          background-image: ${PAPER_NOISE};
          background-size: 200px 200px;
          /* Depth shadow + inner rule border */
          box-shadow:
            0 -2px  6px rgba(26,43,60,0.11),
            0 -8px 20px rgba(26,43,60,0.14),
            inset 0 0 0 1px rgba(26,43,60,0.06);
          transform-origin: bottom center;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .owf-file-4 { top: 0%; z-index: 1; transform: translateY(0) rotate(-2.5deg); }
        .owf-file-3 { top: 2%; z-index: 2; transform: translateY(0) rotate(1.5deg);  }
        .owf-file-2 { top: 4%; z-index: 3; transform: translateY(0) rotate(-1deg);   }
        .owf-file-1 { top: 6%; z-index: 4; transform: translateY(0) rotate(0.5deg);  }

        /* Files fan out AND pop forward in Z-space on hover */
        .owf-folder-link:hover .owf-file-4 { transform: translateY(-34px) translateZ(5px)  rotate(-6.5deg); }
        .owf-folder-link:hover .owf-file-3 { transform: translateY(-22px) translateZ(10px) rotate(5.5deg);  }
        .owf-folder-link:hover .owf-file-2 { transform: translateY(-40px) translateZ(7px)  rotate(-3deg);   }
        .owf-folder-link:hover .owf-file-1 { transform: translateY(-28px) translateZ(14px) rotate(3deg);    }

        /* Header colour bar — gradient, not flat */
        .owf-file-bar { height: 22%; width: 100%; }

        /* Body: ruled-paper horizontal lines via repeating gradient */
        .owf-file-body {
          padding: 8px 10px;
          display: flex; flex-direction: column; gap: 5px; position: relative;
          background-image: repeating-linear-gradient(
            0deg,
            transparent 0px, transparent 18px,
            rgba(26,43,60,0.055) 18px, rgba(26,43,60,0.055) 19px
          );
          background-size: 100% 19px;
          background-position: 0 24px;
        }
        .owf-file-line {
          height: 7px; border-radius: 4px;
          box-shadow: 0 1px 0 rgba(255,255,255,0.65);
        }
        .owf-file-line--sm { height: 5px; }
        .owf-file-thumb {
          position: absolute; right: 10px; top: 6px;
          width: 28px; height: 28px; border-radius: 6px; opacity: 0.85;
          box-shadow: 0 2px 6px rgba(0,0,0,0.18);
        }

        /* ── Front flap ──
           Three background layers (front→back):
           1. SVG fractal-noise for cardboard grain
           2. Radial sheen across the top edge
           3. Multi-stop directional colour gradient
        */
        .owf-front {
          position: absolute; left: 0; right: 0; bottom: 0;
          height: 78%; border-radius: 20px; overflow: hidden;
          background-color: ${F_FRONT};
          background-image:
            ${FOLDER_NOISE},
            radial-gradient(ellipse 90% 48% at 50% 4%, rgba(255,255,255,0.20) 0%, transparent 52%),
            linear-gradient(160deg, #5468FF 0%, ${F_FRONT} 38%, #2E42F8 72%, ${F_BACK} 100%);
          background-size: 300px 300px, 100% 100%, 100% 100%;
          transform: translateZ(36px);
          transform-origin: bottom center;
          /* Inner rim lights + coloured drop shadow stack */
          box-shadow:
            inset 0  2px 0 rgba(255,255,255,0.26),
            inset 0 -1px 0 rgba(0,0,0,0.22),
            0  8px 20px rgba(59,78,255,0.20),
            0 24px 48px rgba(59,78,255,0.30),
            0 48px 80px rgba(59,78,255,0.18);
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .owf-folder-link:hover .owf-front {
          transform: translateZ(36px) rotateX(-32deg);
        }

        /* Physical fold crease — dark pinch at the top edge of the flap */
        .owf-crease {
          position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0,0,0,0.20) 8%,
            rgba(0,0,0,0.35) 35%,
            rgba(0,0,0,0.40) 50%,
            rgba(0,0,0,0.35) 65%,
            rgba(0,0,0,0.20) 92%,
            transparent 100%
          );
          border-top:    1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.10);
        }

        /* Sheen highlight sweep */
        .owf-sheen {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 72% 44% at 50% 0%, rgba(255,255,255,0.22) 0%, transparent 58%);
          pointer-events: none;
        }

        /* ELOMA embossed badge */
        .owf-label {
          position: absolute;
          top: clamp(14px, 1.8vw, 22px); left: clamp(14px, 1.8vw, 22px);
          padding: 6px 16px; border-radius: 999px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.30);
          backdrop-filter: blur(10px);
          color: #fff;
          font-size: clamp(11px, 0.9vw, 13px); font-weight: 800;
          letter-spacing: 2px; text-transform: uppercase;
          /* Embossed: raised inner top highlight, sunken inner bottom shadow */
          text-shadow: 0 1px 2px rgba(0,0,0,0.28);
          box-shadow:
            inset 0  1px 0 rgba(255,255,255,0.30),
            inset 0 -1px 0 rgba(0,0,0,0.16),
            0 4px 14px rgba(0,0,0,0.24);
        }

        /* Ghost watermark */
        .owf-watermark {
          position: absolute; left: 50%; top: 54%;
          transform: translate(-50%, -50%);
          font-size: clamp(42px, 6vw, 88px);
          font-weight: 900; letter-spacing: -0.05em;
          color: rgba(255,255,255,0.09);
          user-select: none; text-transform: uppercase;
          font-family: "Helvetica Neue","Arial Black",Arial,sans-serif;
          text-shadow: 0 2px 4px rgba(0,0,0,0.08);
        }

        /* Orange arrow button — glossy */
        .owf-arrow {
          position: absolute;
          right: clamp(16px, 1.8vw, 24px); bottom: clamp(16px, 1.8vw, 24px);
          width: clamp(48px, 4.2vw, 62px); height: clamp(48px, 4.2vw, 62px);
          border-radius: 50%;
          background: radial-gradient(circle at 38% 32%, #FFB84D 0%, ${ARROW_CLR} 52%, #E0861A 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow:
            inset 0  1px 0 rgba(255,255,255,0.42),
            inset 0 -1px 0 rgba(0,0,0,0.18),
            0  4px  8px rgba(255,159,67,0.28),
            0 10px 28px rgba(255,159,67,0.50);
          transform: scale(0.92);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease;
        }
        .owf-folder-link:hover .owf-arrow {
          transform: scale(1.05) translateX(4px);
          box-shadow:
            inset 0  1px 0 rgba(255,255,255,0.48),
            inset 0 -1px 0 rgba(0,0,0,0.18),
            0  4px  8px rgba(255,159,67,0.32),
            0 14px 36px rgba(255,159,67,0.65);
        }

        @media (max-width: 680px) {
          .owf-folder { width: clamp(240px, 80vw, 380px); height: clamp(200px, 66vw, 310px); }
          .owf-file-4 { transform: translateY(-14px) rotate(-5deg); }
          .owf-file-3 { transform: translateY(-10px) rotate(4deg);  }
          .owf-file-2 { transform: translateY(-18px) rotate(-2deg); }
          .owf-file-1 { transform: translateY(-12px) rotate(2deg);  }
        }
      `}</style>
    </section>
  )
}
