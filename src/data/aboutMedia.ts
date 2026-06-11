/**
 * Curated photography for the About Us design variants (verified live).
 * Subject-matched: leadership collaboration, the workplace, and the
 * Australian home market — never generic stock filler.
 */
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const ABOUT_MEDIA = {
  team: {
    src: U('photo-1522071820081-009f0129c71c'),
    alt: 'Leadership team collaborating around a laptop',
  },
  office: {
    src: U('photo-1497366216548-37526070297c'),
    alt: 'Bright modern office interior',
  },
  sydney: {
    src: U('photo-1506973035872-a4ec16b8e8d9'),
    alt: 'Sydney harbour skyline — Eloma Group’s home market',
  },
  meeting: {
    src: U('photo-1521737711867-e3b97375f902'),
    alt: 'Team aligned around a strategy table',
  },
  boardroom: {
    src: U('photo-1556761175-b413da4baf72'),
    alt: 'Executives reviewing plans in a boardroom',
  },
  horizon: {
    src: U('photo-1469474968028-56623f02e42e'),
    alt: 'Sunrise over a mountain horizon — a long-term vision',
  },
} as const;

export const FOUNDER_PHOTO = { src: '/Rj.png', alt: 'R J, Founder of Eloma Group' } as const;
