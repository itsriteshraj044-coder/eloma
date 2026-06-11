/**
 * Photography + colour world per company — shared by the Companies design
 * variants. Photos are curated Unsplash shots matched to each business
 * (verified live), accents follow the brand icon-tint palette.
 */
export interface CompanyMedia {
  accent: string;
  iconBg: string;
  photo: string;
  alt: string;
}

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const COMPANY_MEDIA: CompanyMedia[] = [
  {
    // EG Digital Australia — engineers building digital platforms
    accent: '#8b3cf7',
    iconBg: '#faf5ff',
    photo: U('photo-1551434678-e076c223a692'),
    alt: 'Software engineers collaborating on digital platforms',
  },
  {
    // EG Foundations — corporate governance backbone
    accent: '#c07a0a',
    iconBg: '#fffbeb',
    photo: U('photo-1486406146926-c627a92ad1ab'),
    alt: 'Modern corporate towers seen from below',
  },
  {
    // EG Imports — global sourcing and trade
    accent: '#1d6ef5',
    iconBg: '#eff6ff',
    photo: U('photo-1494412651409-8963ce7935a7'),
    alt: 'Shipping containers at a global trade port',
  },
  {
    // EG Transport — integrated logistics at scale
    accent: '#ea6f13',
    iconBg: '#fff7ed',
    photo: U('photo-1601584115197-04ecc0da31d7'),
    alt: 'Freight truck moving goods on a highway',
  },
  {
    // EG Travels — journeys across the world
    accent: '#0d9a6a',
    iconBg: '#f0fdf8',
    photo: U('photo-1436491865332-7a61a109cc05'),
    alt: 'Aircraft wing above the clouds at sunrise',
  },
];
