# Eloma Group — Project Rules (MANDATORY)

These rules apply to the entire website (every page, section, and component). They override any default behavior.

## Responsive Design (MANDATORY)

### Breakpoints

| Name       | Width           |
|------------|-----------------|
| Mobile S   | 320px – 374px   |
| Mobile     | 375px – 539px   |
| Mobile L   | 540px – 767px   |
| Tablet     | 768px – 1023px  |
| Tablet L   | 1024px – 1279px |
| Desktop    | 1280px – 1535px |
| Desktop L  | 1536px – 1919px |
| 2K         | 1920px – 2559px |
| 4K / Ultra | 2560px+         |

### Key rules

1. No hard pixel widths — use `clamp()`, `%`, `vw`, Grid/Flexbox.
2. Base `maxWidth`: 1760, override at 1920px and 2560px.
3. Wide content, minimal bezel (MOST IMPORTANT) — `clamp(24px, 4vw, 64px)` horizontal padding, max never exceeds 80px. Use `min(calc(100vw - 140px), 2400px)` for fluid containers.
4. Vertical section padding: `clamp(32px, 5vw, 88px)`.
5. Typography always uses `clamp()` — never fixed px on headings/body.
6. Grids collapse: 3-col → 1-col at ≤800px, 2-col → 1-col at ≤768px.
7. Images: `object-fit: cover` + `width: 100%`.
8. Touch targets: min 44×44px.
9. Every page wrapper: `overflowX: hidden`.

## Typography Scale (MANDATORY)

| Role               | clamp value                        |
|--------------------|-------------------------------------|
| Display / Wordmark | `clamp(30px, 2.4vw, 38px)`          |
| Hero H1            | `clamp(30px, 2.4vw, 38px)`          |
| Section H2         | `clamp(30px, 2.4vw, 38px)`          |
| Sub-heading        | `clamp(30px, 2.4vw, 38px)`          |
| Card heading       | `clamp(30px, 2.4vw, 38px)`          |
| Body               | `clamp(14px, 1.15–1.35vw, 17–19px)`|
| Meta value         | `clamp(15px, 1.2vw, 20px)`         |
| Eyebrow / label    | `clamp(10px, 0.75–0.85vw, 12–14px)`|

- All headings (Display/Wordmark, Hero H1, Section H2, Sub-heading, Card heading): responsive ~35px (`clamp(30px, 2.4vw, 38px)`), uppercase, `letterSpacing: -0.04em`, `fontWeight: 900`.
- Body: 14–19px, never below 14px.
- Eyebrows: `fontWeight: 800`, `letterSpacing: 2–2.5px`, uppercase.
- Heading line-height: 1.2 · Body line-height: 1.75–1.88.

## 120fps Scroll Smoothness (MANDATORY)

1. Animate only `transform` and `opacity` — never `top`/`left`/`width`/`height`/`margin`/`padding`.
2. `will-change: transform` on anything that animates on scroll.
3. No layout thrashing — batch DOM reads before writes.
4. Use Framer Motion `useTransform`/`useScroll` — never `addEventListener('scroll')`.
5. All pages run through the global Lenis instance — never bypass it.
6. CSS `@keyframes` only for looping ambient effects.
7. `pointer-events: none` on all decorative/ambient layers.
8. Avoid `backdrop-filter` on large/scroll-pinned surfaces.
9. All `<img>`/`<video>` need `decoding="async"` + explicit dimensions.
10. Max 3 overlapping GPU compositing layers.
