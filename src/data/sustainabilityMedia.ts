/**
 * Photography for the "Why We Exist" design variants (verified live).
 * Business/professional perspective on the four pillars: a shared vision at
 * the strategy table, teams as the branches, a global skyline as the canopy,
 * towers reaching upward for the horizon.
 */
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export interface PillarMedia {
  src: string;
  alt: string;
}

/** One photo per pillar, in PILLARS order. */
export const PILLAR_MEDIA: PillarMedia[] = [
  { src: U('photo-1521737711867-e3b97375f902'), alt: 'Team aligned around one strategy table — a single vision' },
  { src: U('photo-1522071820081-009f0129c71c'), alt: 'Teams collaborating side by side — branches of one trunk' },
  { src: U('photo-1506973035872-a4ec16b8e8d9'), alt: 'A global city skyline — an interconnected ecosystem' },
  { src: U('photo-1486406146926-c627a92ad1ab'), alt: 'Towers reaching skyward — built for generations' },
];
