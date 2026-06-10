# Eloma Group — Premium Enterprise Homepage

A 2026-grade reimagining of the Eloma Group homepage. Same content, sections, and
information architecture as the reference — completely redesigned UI/UX with
glassmorphism, gradient-mesh backgrounds, a scroll-driven hero "unfold", and
Framer Motion micro-interactions throughout.

## Tech stack

- **React 18** + **TypeScript** (strict)
- **Vite** build tooling
- **Tailwind CSS** design system
- **React Router DOM** routing
- **Framer Motion** animation
- **Lucide React** icons

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Brand

| Token         | Value     |
| ------------- | --------- |
| Primary Blue  | `#08213C` |
| Primary Green | `#3CB98C` |

Configured in `tailwind.config.js` as the `navy` and `emerald` scales.

## Project structure

```
src/
├─ assets/          images · icons · videos (hero video drop-in)
├─ components/
│  ├─ layout/       Navbar · Footer · LoginDropdown
│  ├─ sections/     Hero (+ hero/FloatingCards), ConnectedGlobally,
│  │                ExperienceEloma, BusinessUniverse, Companies,
│  │                Leadership, Sustainability, GlobalPresence, Contact
│  └─ ui/           Button · Container · GlassCard · Logo · Reveal · SectionHeading
├─ data/            content.ts — all copy & IA in one typed source
├─ hooks/           useScrollAnimation · useCountUp
├─ lib/             cn · motion (shared variants/easing)
├─ pages/           Home.tsx
├─ routes/          AppRoutes.tsx
├─ types/           shared TypeScript interfaces
├─ App.tsx · main.tsx · index.css
```

## Highlights

- **Scroll-driven hero** — the background video starts as an 80% rounded card and
  unfolds to full-bleed (`useScroll` → `useSpring` → `useTransform`), GPU-only
  transforms for 60fps. Floating glass cards drift out as the copy fades.
- **Accessible Login dropdown** — Customer / Vendor / Employee, full keyboard
  support (arrows, Escape, focus return), glassmorphism panel.
- **Sticky navbar** with scroll-spy active states, backdrop blur, mobile drawer.
- **Animated counters**, scroll reveals, hover-lift cards (`translateY(-8px)`).
- **Reduced-motion aware**, semantic landmarks, focus-visible rings, SEO + OG/Twitter meta.

## Hero video

Add your own clip at `src/assets/videos/hero.mp4` and update `HERO.videoSrc`
in `src/data/content.ts`. A royalty-free sample is referenced by default.
# eloma
