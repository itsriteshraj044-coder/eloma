import {
  Headset,
  Ship,
  ServerCog,
  Truck,
  Plane,
  Code2,
  Building2,
  Globe2,
  Network,
  Leaf,
  Sprout,
  GitBranch,
  TreePine,
  Sunrise,
  UserRound,
  Store,
  IdCard,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  AtSign,
  Music2,
} from 'lucide-react';
import type {
  Business,
  Capability,
  Company,
  FooterColumn,
  LoginOption,
  NavItem,
  NavLink,
  Office,
  Pillar,
  SocialLink,
  Stat,
  InquiryType,
} from '@/types';

/* ------------------------------------------------------------------ */
/*  Brand                                                              */
/* ------------------------------------------------------------------ */
export const BRAND = {
  name: 'Eloma Group',
  phonePrimary: '1800 054 555',
  phoneFooter: '1800 710 388',
  email: 'contact@elomagroup.com.au',
  tagline:
    'Powering businesses across logistics, digital innovation, security, travel, and customer solutions — driven by purpose and sustainability.',
} as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const NAV_LINKS: NavLink[] = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Businesses', href: '#businesses' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact Us', href: '#contact' },
];

/** Rich nav items with mega-menu dropdowns for About Us, Our Businesses, Sustainability. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'About Us',
    href: '#about',
    megaMenu: {
      eyebrow: 'About Us',
      heading: 'Who we are and how we lead',
      description: 'A unified group driven by innovation, scalability, and sustainable growth.',
      cta: { label: 'Explore Group', href: '#about' },
      linkGroups: [
        {
          links: [
            { label: 'About Us', href: '#about' },
            { label: 'Blog', href: '#' },
            { label: 'Newsroom', href: '#' },
            { label: 'Partners', href: '#' },
          ],
        },
      ],
    },
  },
  {
    label: 'Our Businesses',
    href: '#businesses',
    megaMenu: {
      eyebrow: 'Our Businesses',
      heading: 'Focused business verticals',
      description: 'Logistics, digital innovation, security, travel, and customer solutions working as one.',
      cta: { label: 'View Companies', href: '#companies' },
      linkGroups: [
        {
          heading: 'Business',
          links: [
            { label: 'Call Centre', href: '#businesses' },
            { label: 'Imports', href: '#businesses' },
            { label: 'IT Infrastructure', href: '#businesses' },
            { label: 'Supply Chain', href: '#businesses' },
            { label: 'Travel', href: '#businesses' },
            { label: 'Virtual Security', href: '#businesses' },
          ],
        },
        {
          heading: 'Companies',
          links: [
            { label: 'EG Digital Australia', href: '#companies' },
            { label: 'EG Foundations', href: '#companies' },
            { label: 'EG Imports', href: '#companies' },
            { label: 'EG Transport', href: '#companies' },
            { label: 'EG Travels', href: '#companies' },
            { label: 'Wee See You', href: '#companies' },
          ],
        },
      ],
    },
  },
  {
    label: 'Sustainability',
    href: '#sustainability',
    megaMenu: {
      eyebrow: 'Sustainability',
      heading: 'Responsible growth',
      description: 'Eco-conscious operations, ethical practices, and long-term impact.',
      cta: { label: 'Our ESG Focus', href: '#sustainability' },
      linkGroups: [
        {
          heading: 'Sustainability',
          links: [
            { label: 'Environmental Responsibility', href: '#sustainability' },
            { label: 'Sustainability Initiatives', href: '#sustainability' },
            { label: 'Reports & Updates', href: '#' },
          ],
        },
      ],
    },
  },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact Us', href: '#contact' },
];

export const LOGIN_OPTIONS: LoginOption[] = [
  {
    label: 'Customer Login',
    href: '#customer-login',
    description: 'Access your account & support portal',
    icon: UserRound,
  },
  {
    label: 'Vendor Login',
    href: '#vendor-login',
    description: 'Manage orders, invoices & supply',
    icon: Store,
  },
  {
    label: 'Employee Login',
    href: '#employee-login',
    description: 'Internal workspace & resources',
    icon: IdCard,
  },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export const HERO = {
  titleLines: ['The Living', 'Enterprise'],
  description:
    'Eloma Group unites travel, technology, customer experience and logistics — independent businesses growing from one shared root.',
  primaryCta: 'Explore',
  secondaryCta: 'Talk to us',
  trustLabel: 'Trusted across 8 markets worldwide',
  // Local asset served from /public.
  videoSrc: '/hero.mp4',
} as const;

/* ------------------------------------------------------------------ */
/*  Connected Globally — stats                                         */
/* ------------------------------------------------------------------ */
export const CONNECTED = {
  heading: 'Connected Globally',
  descriptor: 'Est. in Australia',
  caption: '04 Businesses · 1 Vision',
} as const;

export const STATS: Stat[] = [
  { value: 5, label: 'Companies under one group' },
  { value: 8, label: 'Countries of operation' },
  { value: 4, label: 'Industry verticals' },
  { value: 1, label: 'Shared vision' },
];

/* ------------------------------------------------------------------ */
/*  Experience Eloma                                                   */
/* ------------------------------------------------------------------ */
export const EXPERIENCE = {
  title: 'Experience Eloma',
  subtitle:
    'A single root, branching into worlds — see how one vision powers an entire ecosystem.',
  videoSrc: '/experience.mp4',
} as const;

/* ------------------------------------------------------------------ */
/*  The Business Universe                                              */
/* ------------------------------------------------------------------ */
export const BUSINESS_UNIVERSE = {
  heading: 'Four worlds. One universe.',
  description:
    'Each Eloma business is a universe of its own — distinct, ambitious, and best-in-class.',
} as const;

export const BUSINESSES: Business[] = [
  {
    id: 'call-centre',
    index: '01',
    title: 'Call Centre',
    tagline: 'Real People. Real Connections. Real Results.',
    description:
      'A people-first BPO division building relationships, not just answering calls — multi-channel customer experience engineered around trust and growth.',
    features: ['24/7 Support', 'Omnichannel CX', 'Customer Success', 'Inside Sales'],
    icon: Headset,
  },
  {
    id: 'imports',
    index: '02',
    title: 'Imports',
    tagline: 'Global Sourcing. Reliable Supply.',
    description:
      'Global sourcing and trade — connecting markets with dependable supply, customs expertise and end-to-end distribution across borders.',
    features: ['Global Sourcing', 'Customs & Trade', 'Quality Assurance', 'Distribution'],
    icon: Ship,
  },
  {
    id: 'it-infrastructure',
    index: '03',
    title: 'IT Infrastructure',
    tagline: 'Powering Performance. Building the Future.',
    description:
      'Robust, secure-by-design infrastructure that drives efficiency and innovation — the digital backbone powering every company in the group and beyond.',
    features: ['Cloud & DevOps', 'Cybersecurity', 'High Availability', 'Managed Services'],
    icon: ServerCog,
  },
  {
    id: 'supply-chain',
    index: '04',
    title: 'Supply Chain',
    tagline: 'Smarter. Stronger. More Sustainable.',
    description:
      'Resilient, technology-led logistics — freight, warehousing and distribution built on collaboration and sustainability for a moving world.',
    features: ['Freight & Logistics', 'Warehousing', 'Distribution', 'Sustainable Ops'],
    icon: Truck,
  },
  {
    id: 'travel',
    index: '05',
    title: 'Travel',
    tagline: 'Explore. Experience. Enjoy.',
    description:
      'A global travel division crafting seamless journeys — from corporate mobility to bespoke leisure — connecting people to places and unforgettable moments.',
    features: ['Corporate Mobility', 'Leisure & Luxury', 'Worldwide Network', 'Concierge Support'],
    icon: Plane,
  },
];

/* ------------------------------------------------------------------ */
/*  Our Companies                                                      */
/* ------------------------------------------------------------------ */
export const COMPANIES_SECTION = {
  heading: 'One group, five companies, one vision.',
  subheading:
    'Independent businesses growing from one shared root — each best-in-class in its field, united by a single standard of excellence.',
} as const;

export const COMPANIES: Company[] = [
  {
    index: '01',
    name: 'EG Digital Australia',
    description:
      'Digital platforms, cloud and product engineering powering the group and its clients.',
    icon: Code2,
  },
  {
    index: '02',
    name: 'EG Foundations',
    description:
      'The shared services backbone — governance, finance and people across every business.',
    icon: Building2,
  },
  {
    index: '03',
    name: 'EG Imports',
    description:
      'Global sourcing and trade, connecting markets with reliable supply and distribution.',
    icon: Ship,
  },
  {
    index: '04',
    name: 'EG Transport',
    description: 'Integrated transport and last-mile logistics built for scale and dependability.',
    icon: Truck,
  },
  {
    index: '05',
    name: 'EG Travels',
    description: 'Corporate and leisure travel, crafting seamless journeys across the world.',
    icon: Plane,
  },
];

/* ------------------------------------------------------------------ */
/*  Leadership                                                         */
/* ------------------------------------------------------------------ */
export const LEADERSHIP = {
  heading: 'Driven by Visionary Leadership',
  subheading: 'Building businesses that create lasting impact',
  body: [
    'At Eloma Group, our growth is guided by strong leadership, clear vision, and a commitment to building businesses that create lasting impact. Our leaders bring together industry expertise, innovation, and a forward-thinking mindset to shape a multi-business ecosystem built for the future.',
    'Beyond business growth, we focus on creating a foundation for lasting success. By investing in people, embracing innovation, and maintaining strong governance, we strive to build organizations that are resilient, adaptable, and prepared for the opportunities of tomorrow. This commitment allows us to create value not only for our stakeholders but also for the communities in which we operate.',
  ],
  testimonial: {
    quote:
      'Eloma Group was built with a vision to go beyond a single business — to create an ecosystem where innovation, efficiency, and sustainability come together to drive real impact across industries.',
    name: 'R J',
    role: 'Founder, Eloma Group',
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Why We Exist — Sustainability pillars                              */
/* ------------------------------------------------------------------ */
export const SUSTAINABILITY = {
  heading: 'Committed to Sustainable Growth and Responsible Business',
  body: 'At Eloma Group, sustainability is not just a commitment; it is a core part of how we operate and grow. Across all our business verticals, we strive to minimize environmental impact, promote ethical practices, and build solutions that contribute to a more responsible and resilient future.',
} as const;

export const PILLARS: Pillar[] = [
  {
    index: '01',
    title: 'The Root',
    subtitle: 'A single vision',
    description:
      'Eloma began with a conviction: that businesses grow strongest when they share roots — common values, shared infrastructure, and a long-term horizon.',
    icon: Sprout,
  },
  {
    index: '02',
    title: 'The Branches',
    subtitle: 'Four pillars, one trunk',
    description:
      'Travel, technology, customer experience and logistics grew as branches of one organism — independent in craft, united in standard.',
    icon: GitBranch,
  },
  {
    index: '03',
    title: 'The Canopy',
    subtitle: 'A global ecosystem',
    description:
      'Today the group spans markets and continents, an interconnected canopy where each company makes the others stronger.',
    icon: TreePine,
  },
  {
    index: '04',
    title: 'The Horizon',
    subtitle: 'Built for generations',
    description:
      "We don't build for the quarter. We build for the decade — investing in people, sustainability and ventures that outlast us.",
    icon: Sunrise,
  },
];

/* ------------------------------------------------------------------ */
/*  Global Presence                                                    */
/* ------------------------------------------------------------------ */
export const GLOBAL_PRESENCE = {
  heading: 'Global Presence',
  subheading: 'A growing presence across key global regions',
  body: 'We operate across multiple countries, connecting businesses and communities through trusted, scalable solutions.',
  capabilitiesHeading: 'Global Capabilities',
} as const;

export const COUNTRIES = [
  'Australia',
  'India',
  'USA',
  'Canada',
  'China',
  'UK',
  'UAE',
  'Singapore',
] as const;

export const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Global Footprint',
    description: 'Presence across Australia, India, USA, Canada, China, UK, UAE, and Singapore.',
    icon: Globe2,
  },
  {
    index: '02',
    title: 'Connected Industries',
    description:
      'A unified ecosystem serving logistics, technology, security, travel, and customer support.',
    icon: Network,
  },
  {
    index: '03',
    title: 'Collaborative Network',
    description: 'Partnership-driven operations that bring businesses closer together.',
    icon: Building2,
  },
  {
    index: '04',
    title: 'Responsible Growth',
    description: 'Focused on sustainable, ethical, and future-ready business practices.',
    icon: Leaf,
  },
];

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */
export const CONTACT = {
  heading: 'Connect with the Eloma Group',
  description:
    'Share your requirements and our executive team will respond within one business day.',
  consent:
    'By submitting this form, you agree to our privacy policy and consent to receive communications from Eloma Group.',
  submitLabel: 'Submit Inquiry',
} as const;

export const OFFICES: Office[] = [
  {
    city: 'Melbourne, Australia',
    primary: true,
    address: '71 Gipps Street, Collingwood, Melbourne, VIC 3066, Australia',
    phone: BRAND.phonePrimary,
    email: BRAND.email,
  },
  { city: 'Sydney' },
  { city: 'Brisbane' },
  { city: 'Adelaide' },
  { city: 'Perth' },
];

export const INQUIRY_TYPES: InquiryType[] = [
  'Partnership opportunity',
  'Logistics services',
  'Digital solutions',
  'Investor relations',
  'Media inquiry',
  'Careers',
  'Other',
];

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'About',
    links: [
      { label: 'Group Overview', href: '#about' },
      { label: 'Leadership', href: '#leadership' },
      { label: 'Milestones', href: '#about' },
      { label: 'Our Journey', href: '#about' },
      { label: 'Vision & Values', href: '#sustainability' },
    ],
  },
  {
    heading: 'Businesses',
    links: [
      { label: 'Customer Support', href: '#businesses' },
      { label: 'Digital & Technology', href: '#businesses' },
      { label: 'Logistics & Transportation', href: '#businesses' },
      { label: 'Travel & Tourism', href: '#businesses' },
      { label: 'Virtual Security', href: '#businesses' },
    ],
  },
  {
    heading: 'Companies',
    links: [
      { label: 'EG Digital Australia', href: '#companies' },
      { label: 'EG Foundations', href: '#companies' },
      { label: 'EG Imports', href: '#companies' },
      { label: 'EG Transport', href: '#companies' },
      { label: 'EG Travels', href: '#companies' },
      { label: 'Wee See You', href: '#companies' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
      { label: 'Leadership', href: '#leadership' },
      { label: 'News & Press', href: '#' },
      { label: 'Sustainability', href: '#sustainability' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Become a Partner', href: '#contact' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Customer Login', href: '#customer-login' },
      { label: 'FAQ', href: '#' },
      { label: 'Vendor Login', href: '#vendor-login' },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'LinkedIn', href: '#', icon: Linkedin, color: '#0A66C2' },
  { label: 'X (Twitter)', href: '#', icon: Twitter, color: '#000000' },
  { label: 'Instagram', href: '#', icon: Instagram, color: '#E1306C' },
  { label: 'Facebook', href: '#', icon: Facebook, color: '#1877F2' },
  { label: 'YouTube', href: '#', icon: Youtube, color: '#FF0000' },
  { label: 'Threads', href: '#', icon: AtSign, color: '#000000' },
  { label: 'TikTok', href: '#', icon: Music2, color: '#000000' },
];

export const LEGAL = {
  copyright: '© 2026 Eloma Group. All rights reserved. ABN: 69 683 543 713',
  madeBy: 'Made by EG Digital',
  links: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Cookie Settings', href: '#' },
    { label: 'Modern Slavery Statement', href: '#' },
  ] as NavLink[],
} as const;
