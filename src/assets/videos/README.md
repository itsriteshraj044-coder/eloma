# Videos

Drop your hero background video here as `hero.mp4` (H.264, ~1080p, < 6 MB, muted-friendly loop).

Then point the hero to it in `src/data/content.ts`:

```ts
export const HERO = {
  // ...
  videoSrc: '/src/assets/videos/hero.mp4', // or import it as a module
};
```

Until you add one, the app streams a royalty-free sample clip referenced in
`content.ts` and falls back to the poster image if the network is unavailable.
