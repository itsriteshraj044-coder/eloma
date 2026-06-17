import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import type { COBEOptions } from 'cobe';
import { cn } from '@/lib/cn';

/* ── Markets ────────────────────────────────────────────────────────────── */
const HQ: [number, number] = [-37.8136, 144.9631]; // Melbourne

// `labelOffset` (px) nudges a label's pill so nearby markers don't collide.
const MARKETS: { id: string; location: [number, number]; size: number; label: string; labelOffset?: [number, number] }[] = [
  { id: 'melbourne', location: HQ,                        size: 0.035, label: 'Australia' },
  { id: 'mumbai',    location: [19.076,   72.8777],       size: 0.035, label: 'India'     },
  { id: 'newyork',   location: [40.7128, -74.006],        size: 0.04, label: 'USA',     labelOffset: [34, 26] },
  { id: 'toronto',   location: [43.6532, -79.3832],       size: 0.03, label: 'Canada',  labelOffset: [-34, -22] },
  { id: 'shanghai',  location: [31.2304,  121.4737],      size: 0.035, label: 'China'     },
  { id: 'london',    location: [51.5074,  -0.1278],       size: 0.035, label: 'UK'        },
  { id: 'dubai',     location: [25.2048,  55.2708],       size: 0.03, label: 'UAE'       },
  { id: 'singapore', location: [ 1.3521, 103.8198],       size: 0.03, label: 'Singapore' },
];

/* ── Globe config ─────────────────────────────────────────────────────────
 *  dark: 0   → light globe (ocean is a cool blue-white, land slightly darker)
 *  Glow and markers in brand navy (#08213C and tints)
 * ─────────────────────────────────────────────────────────────────────── */
const INITIAL_PHI = 1.8; // starts near Asia-Pacific (Melbourne HQ in view)

const GLOBE_CONFIG: Omit<COBEOptions, 'width' | 'height'> = {
  devicePixelRatio: 2,
  phi:   INITIAL_PHI,
  theta: 0.28,
  dark:  0,                          // ← LIGHT globe
  diffuse:          0.55,
  mapSamples:       18000,
  mapBrightness:    8,
  mapBaseBrightness:0.04,
  baseColor:   [0.87, 0.91, 0.95],   // cool blue-white ocean (navy-50)
  markerColor: [0.90, 0.12, 0.12],   // red markers
  glowColor:   [0.62, 0.71, 0.81],   // soft navy halo (navy-200)
  markerElevation: 0.03,
  markers: MARKETS.map(({ id, location, size }) => ({ id, location, size })),
};

const SPIN_SPEED = 0.004;

/* ── Label styles injected into cobe's wrapper via DOM ─────────────────── */
const LABEL_CSS = [
  'position:absolute',
  'pointer-events:none',
  'opacity:0',
  'transition:opacity 0.35s ease',
  'white-space:nowrap',
  'z-index:10',
].join(';');

// Base offset lifts the pill above its marker; per-marker labelOffset (px) is added.
const labelTransform = (offset?: [number, number]) =>
  `translateX(calc(-50% + ${offset?.[0] ?? 0}px)) translateY(calc(-145% + ${offset?.[1] ?? 0}px))`;

// White text, navy background pill.
const BADGE_CSS = [
  'display:inline-flex',
  'align-items:center',
  'padding:3px 8px',
  'border-radius:9999px',
  'background:#08213C',
  'color:#ffffff',
  'font-size:clamp(11px, 0.85vw, 17px)',
  'font-weight:700',
  "font-family:Inter,system-ui,-apple-system,sans-serif",
  'letter-spacing:0.05em',
  'line-height:1.4',
  'box-shadow:0 2px 8px rgba(8,33,60,0.35),inset 0 1px 0 rgba(255,255,255,0.25)',
].join(';');

/* ── Component ─────────────────────────────────────────────────────────── */

/**
 * cobe v2 globe with:
 *  - Light color scheme (dark:0, blue-white ocean, navy markers/glow)
 *  - Auto-rotation driven by a manual RAF loop (cobe v2 has no internal loop)
 *  - City-name badges (white text, green bg) that follow marker positions
 *    via cobe's own 1×1 anchor divs — direct DOM, zero React re-renders
 *  - Drag to spin; rotation absorbed on release so there's no jump
 *  - prefers-reduced-motion: no auto-spin, still draggable
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // All rotation state in refs — no stale closure issues, no re-renders.
  const phiRef      = useRef(INITIAL_PHI);
  const rotRef      = useRef(0);      // extra rotation from current drag
  const isDragging  = useRef(false);
  const dragStartX  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = canvas.offsetWidth || 480;
    let raf   = 0;

    const globe = createGlobe(canvas, {
      ...GLOBE_CONFIG,
      width:  width * 2,
      height: width * 2,
    });

    // After createGlobe, cobe inserts a `position:relative` wrapper div and
    // moves the canvas into it. canvas.parentElement is now that wrapper.
    const cobeWrapper = canvas.parentElement as HTMLElement;

    // ── Inject label badge elements into cobe's wrapper ──────────────────────
    // We piggyback on the same coordinate system so left/top % are shared.
    const labelEls = new Map<string, HTMLElement>();
    MARKETS.forEach(m => {
      const el = document.createElement('div');
      el.style.cssText = LABEL_CSS;
      el.style.transform = labelTransform(m.labelOffset);
      el.innerHTML = `<span style="${BADGE_CSS}">${m.label}</span>`;
      cobeWrapper.appendChild(el);
      labelEls.set(m.id, el);
    });

    // ── Cache cobe's 1×1 anchor divs ─────────────────────────────────────────
    // cobe creates one per marker with id — style contains `anchor-name:--cobe-{id}`
    // and left/top set as percentages on every globe.update() call.
    const anchorEls = new Map<string, HTMLElement>();
    const cacheAnchors = () => {
      MARKETS.forEach(({ id }) => {
        if (anchorEls.has(id)) return;
        const el = cobeWrapper.querySelector(`[style*="--cobe-${id}"]`) as HTMLElement | null;
        if (el) anchorEls.set(id, el);
      });
    };
    cacheAnchors(); // anchor divs exist immediately after createGlobe

    // ── RAF loop — auto-rotate + label sync ──────────────────────────────────
    const frame = () => {
      if (!isDragging.current && !reducedMotion) phiRef.current += SPIN_SPEED;

      globe.update({ phi: phiRef.current + rotRef.current });

      // Retry anchor cache on the first few frames (shouldn't be needed, safety net).
      if (anchorEls.size < MARKETS.length) cacheAnchors();

      // Sync label position + visibility from cobe's injected state.
      // getComputedStyle on document.documentElement is cheap — browsers cache it
      // until the style sheet changes (which cobe does once per globe.update call).
      const rootStyle = getComputedStyle(document.documentElement);
      anchorEls.forEach((anchor, id) => {
        const label = labelEls.get(id);
        if (!label) return;
        label.style.left = anchor.style.left;
        label.style.top  = anchor.style.top;
        // cobe sets `--cobe-visible-{id}: N` on :root when the marker faces front.
        const vis = rootStyle.getPropertyValue(`--cobe-visible-${id}`).trim();
        label.style.opacity = vis ? '1' : '0';
      });

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // ── Resize ────────────────────────────────────────────────────────────────
    const observer = new ResizeObserver(() => {
      const next = canvas.offsetWidth;
      if (next && next !== width) {
        width = next;
        globe.update({ width: next * 2, height: next * 2 });
      }
    });
    observer.observe(canvas);

    // Fade canvas in once the first frame is painted.
    const fade = setTimeout(() => { canvas.style.opacity = '1'; }, 0);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      clearTimeout(fade);
      labelEls.forEach(el => el.remove());
      globe.destroy();
    };
  }, []);

  // ── Pointer handlers ───────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    rotRef.current     = 0;
    e.currentTarget.style.cursor = 'grabbing';
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Absorb accumulated drag rotation into phi — no jump on release.
    phiRef.current    += rotRef.current;
    rotRef.current     = 0;
    isDragging.current = false;
    e.currentTarget.style.cursor = 'grab';
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    rotRef.current = (e.clientX - dragStartX.current) / 200;
  };

  return (
    <div className={cn('relative aspect-square w-full', className)}>
      <canvas
        ref={canvasRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerOut={onPointerUp}
        onPointerMove={onPointerMove}
        aria-label="Interactive globe showing Eloma Group's 8 global markets"
        role="img"
        className="h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 [contain:layout_paint_size] [touch-action:pan-y]"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
