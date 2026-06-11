/**
 * Accent palette + photography for the Global Capabilities design variants.
 * Photos are verified-live Unsplash shots matched per capability.
 */
const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export interface CapTheme {
  accent: string;
  bg: string;
  photo: string;
  alt: string;
}

/** In CAPABILITIES order: Footprint, Industries, Network, Growth. */
export const CAP_THEMES: CapTheme[] = [
  {
    accent: '#1d6ef5',
    bg: '#eff6ff',
    photo: U('photo-1506973035872-a4ec16b8e8d9'),
    alt: 'City skyline across the water — a global footprint',
  },
  {
    accent: '#8b3cf7',
    bg: '#faf5ff',
    photo: U('photo-1494412651409-8963ce7935a7'),
    alt: 'Container terminal from above — industries connected',
  },
  {
    accent: '#c07a0a',
    bg: '#fffbeb',
    photo: U('photo-1522071820081-009f0129c71c'),
    alt: 'A team collaborating around one desk — the network at work',
  },
  {
    accent: '#0d9a6a',
    bg: '#f0fdf8',
    photo: U('photo-1500382017468-9049fed747ef'),
    alt: 'Golden field under a wide sky — growth with responsibility',
  },
];
