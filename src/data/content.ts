import {
  Headset,
  Ship,
  ServerCog,
  ShieldCheck,
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
  BlogPost,
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
  email: 'connect@elomagroup.com.au',
  tagline:
    'Powering businesses across logistics, digital innovation, security, travel, and customer solutions — driven by purpose and sustainability.',
} as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const NAV_LINKS: NavLink[] = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Businesses', href: '#businesses' },
  { label: 'Sustainability', href: '#sustainability' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact Us', href: '#contact' },
];

/** Rich nav items with mega-menu dropdowns for About Us, Our Businesses, Sustainability. */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'About Us',
    href: '/about-us',
    megaMenu: {
      eyebrow: 'About Us',
      heading: 'Who we are and how we lead',
      description: 'A unified group driven by innovation, scalability, and sustainable growth.',
      cta: { label: 'Explore Group', href: '/about-us' },
      linkGroups: [
        {
          links: [
            { label: 'About Us', href: '/about-us' },
            { label: 'Blog', href: '/blog' },
            { label: 'Newsroom', href: '#' },
            { label: 'Partners', href: '/partners' },
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
  {
    id: 'virtual-security',
    index: '06',
    title: 'Virtual Security',
    tagline: "Because peace of mind shouldn't end when you leave the office.",
    description:
      'From protecting sensitive information to keeping your systems safe from online threats, Virtual Security helps your business stay secure every day. With round-the-clock monitoring and smart protection measures, you can focus on growing your business while we take care of your digital safety.',
    features: ['24/7 Monitoring', 'Threat Protection', 'Data Privacy', 'Smart Safeguards'],
    icon: ShieldCheck,
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
/*  Blog                                                               */
/* ------------------------------------------------------------------ */
export const BLOG = {
  eyebrow: 'Blogs',
  heading: 'Industry Insights, Trends & Perspectives',
  subheading:
    'Explore expert viewpoints, emerging trends, business ideas, and thought-provoking articles designed to help organizations stay informed, adaptable, and future-ready.',
  introHeading: 'Ideas, Trends, and Industry Perspectives',
  introLead: 'The business world never stands still — and neither do we.',
  introBody:
    'Welcome to the Eloma Group Blog, where we share insights, industry trends, expert perspectives, and practical knowledge from the worlds of logistics, transportation, technology, business growth, and innovation.',
  topicsHeading: 'Blog Topics',
} as const;

/** Topic filter chips for the blog dashboard (derived order, "All" prepended in UI). */
export const BLOG_CATEGORIES = [
  'Strategy',
  'Leadership',
  'Technology',
  'Sustainability',
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'businesses-that-will-thrive-are-the-most-adaptable',
    title:
      "The Businesses That Will Thrive in the Next Decade Aren't the Biggest. They're the Most Adaptable.",
    excerpt:
      'Scale once meant safety. In a decade defined by volatility, the real advantage belongs to organizations that can sense change early and reshape themselves faster than the market moves.',
    category: 'Strategy',
    author: 'Eloma Group',
    authorRole: 'Group Strategy',
    date: 'June 2, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    featured: true,
    intro:
      'For most of the last century, size was the ultimate competitive moat. The largest companies enjoyed the best economies of scale, the deepest balance sheets, and the loudest voice in the market. That logic is quietly breaking down — and the next decade will belong to organizations built to adapt, not simply to dominate.',
    sections: [
      {
        heading: 'Scale is no longer a substitute for speed',
        paragraphs: [
          'Large organizations still command resources, but resources sitting inside slow decision structures rarely convert into advantage. When supply chains reroute overnight, customer expectations shift in a single product cycle, and a new technology rewrites an entire category, the question is no longer “how big are you?” but “how quickly can you respond?”',
          'Adaptable companies treat change as the operating condition rather than the exception. They build shorter feedback loops between the market and their leadership, and they reward teams for learning quickly instead of being right the first time.',
        ],
      },
      {
        heading: 'What adaptability actually looks like',
        paragraphs: [
          'Adaptability is not chaos or constant reinvention. It is a disciplined capability — a mix of clear strategy, modular operations, and a culture that is comfortable revising its own assumptions. Decisions are made closer to the customer, technology is built to be reconfigured rather than replaced, and leadership measures resilience alongside growth.',
        ],
        quote:
          'The goal is not to predict the future perfectly. It is to build an organization that stays useful no matter which future arrives.',
      },
      {
        heading: 'Building the adaptable enterprise',
        paragraphs: [
          'At Eloma Group, this principle runs through every vertical — from logistics and imports to technology and customer experience. Independent businesses share a common backbone, which lets each one move fast in its own market while drawing on the strength of the wider group.',
          'The companies that endure will be the ones that turn uncertainty into a habit of improvement. Adaptability, not scale, is becoming the most durable form of competitive advantage.',
        ],
      },
    ],
    takeaways: [
      'Speed of response now matters more than sheer size.',
      'Adaptability is a built capability, not a personality trait.',
      'Modular operations and decentralized decisions create resilience.',
      'Treat change as the default condition, not a crisis.',
    ],
  },
  {
    slug: 'hidden-cost-of-waiting-delayed-decisions',
    title: 'The Hidden Cost of Waiting: How Delayed Decisions Impact Business Growth.',
    excerpt:
      'Indecision feels safe, but it is rarely free. Every postponed call carries a compounding cost in lost momentum, missed markets, and eroded team confidence.',
    category: 'Leadership',
    author: 'Eloma Group',
    authorRole: 'Operations & Growth',
    date: 'May 21, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Most businesses are good at counting the cost of bad decisions. Very few measure the cost of decisions never made. Yet delay — the comfortable habit of waiting for more data, more certainty, or a better moment — is one of the most expensive choices an organization can make.',
    sections: [
      {
        heading: 'Why waiting feels rational',
        paragraphs: [
          'Postponing a decision rarely looks like a decision at all. It feels prudent — gathering more information, aligning more stakeholders, reducing risk. But while the organization waits, the environment keeps moving. Competitors act, customer expectations shift, and the window that was open slowly closes.',
        ],
      },
      {
        heading: 'The compounding cost of delay',
        paragraphs: [
          'Delayed decisions rarely fail loudly. They leak value quietly: a product that ships a quarter late into a saturated market, a hire deferred until the team is already stretched, an investment approved only after the opportunity has cooled. Each delay also trains the organization to hesitate, making the next decision slower still.',
        ],
        quote:
          'The most expensive line on the balance sheet is the one you can’t see — the value of the choices you postponed.',
      },
      {
        heading: 'Deciding well, deciding faster',
        paragraphs: [
          'Speed and quality are not opposites. High-performing teams distinguish between reversible and irreversible decisions, and they refuse to spend the same deliberation on both. They set a clear threshold for “enough information,” assign a single accountable owner, and treat a timely 80%-confident decision as better than a perfect one that arrives too late.',
          'Growth rewards organizations that move with conviction. The discipline is not recklessness — it is recognising that, in a fast market, waiting is itself a decision with a price tag.',
        ],
      },
    ],
    takeaways: [
      'Inaction is a decision — and it compounds.',
      'Separate reversible decisions from irreversible ones.',
      'Define what “enough information” means in advance.',
      'A timely good decision beats a late perfect one.',
    ],
  },
  {
    slug: 'digital-transformation-technology-alone-isnt-the-answer',
    title: "Digital Transformation: Why Technology Alone Isn't the Answer",
    excerpt:
      'New platforms do not transform a business on their own. Lasting change happens where technology meets the right people, processes, and purpose.',
    category: 'Technology',
    author: 'Eloma Group',
    authorRole: 'EG Digital',
    date: 'May 9, 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80',
    intro:
      'Every organization is investing in digital tools — cloud platforms, automation, analytics, AI. Yet many transformation programmes stall, not because the technology fails, but because technology was treated as the destination rather than the enabler. Real transformation is a human and operational shift that software merely accelerates.',
    sections: [
      {
        heading: 'The trap of buying capability',
        paragraphs: [
          'It is tempting to believe that adopting a powerful platform is the same as becoming a modern business. But software installed on top of outdated processes simply makes the old way faster — and sometimes more expensive. Technology amplifies whatever it is layered onto, including inefficiency.',
        ],
      },
      {
        heading: 'People and process come first',
        paragraphs: [
          'Successful transformation starts with a clear problem worth solving and the people who will own the new way of working. It means redesigning processes before automating them, investing in skills as heavily as in systems, and giving teams the authority to change how work actually happens.',
          'Data is only valuable when someone is empowered to act on it. Automation is only valuable when it removes friction people genuinely feel. The technology is the multiplier — the strategy, culture, and operating model are what get multiplied.',
        ],
        quote:
          'Technology changes what is possible. People decide whether anything actually changes.',
      },
      {
        heading: 'Transformation as a continuous practice',
        paragraphs: [
          'The most digitally mature organizations stop treating transformation as a one-off project with an end date. They build the muscle to keep evolving — adopting new tools deliberately, retiring what no longer serves, and keeping the customer at the centre of every decision.',
          'At Eloma Group, technology is the backbone that connects our businesses, but the real work is aligning people, process, and purpose around it. That is where transformation stops being a budget line and starts being an advantage.',
        ],
      },
    ],
    takeaways: [
      'Technology amplifies your processes — good and bad.',
      'Redesign the way work happens before automating it.',
      'Invest in skills and ownership as much as in systems.',
      'Treat transformation as an ongoing practice, not a project.',
    ],
  },
  {
    slug: 'sustainability-is-a-business-strategy',
    title: "Sustainability Is No Longer a Choice. It's a Business Strategy.",
    excerpt:
      'Sustainability has moved from corporate responsibility statement to core strategy — shaping cost, resilience, talent, and the right to operate in the markets of tomorrow.',
    category: 'Sustainability',
    author: 'Eloma Group',
    authorRole: 'Sustainability Office',
    date: 'April 27, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80',
    intro:
      'For years, sustainability lived in a separate report, championed by a separate team, measured against a separate set of goals. That era is ending. Across industries, sustainability is being absorbed into core strategy — because the forces driving it are now commercial, not just ethical.',
    sections: [
      {
        heading: 'From obligation to advantage',
        paragraphs: [
          'Regulation, customer expectation, investor scrutiny, and rising resource costs have converged. Efficient energy use lowers operating costs. Resilient, ethical supply chains reduce risk. Credible sustainability commitments increasingly determine which contracts a business can win and which talent it can attract.',
          'What was once framed as a cost of doing business is becoming a source of differentiation — and, in some markets, a precondition for participating at all.',
        ],
        quote:
          'Sustainability is no longer a department. It is a lens through which every serious business decision is now made.',
      },
      {
        heading: 'Embedding it into operations',
        paragraphs: [
          'Strategic sustainability is not about messaging. It shows up in the design of logistics networks, the efficiency of facilities, the choice of partners, and the metrics leadership actually reviews. The organizations getting it right set measurable targets, hold themselves accountable, and treat environmental performance as an operational KPI rather than a marketing claim.',
        ],
      },
      {
        heading: 'Building for the long term',
        paragraphs: [
          'At Eloma Group, sustainability is woven through every vertical — minimizing environmental impact, promoting ethical practices, and building solutions designed to last. We see responsible growth not as a constraint on the business, but as the foundation that makes long-term growth possible.',
          'The companies that treat sustainability as strategy today are simply building the businesses that will still have a licence to operate tomorrow.',
        ],
      },
    ],
    takeaways: [
      'Sustainability now drives cost, risk, and revenue — not just reputation.',
      'It belongs in core strategy, not a standalone report.',
      'Set measurable targets and treat them as operational KPIs.',
      'Responsible growth is what makes long-term growth durable.',
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'About',
    links: [
      { label: 'Group Overview', href: '/about-us' },
      { label: 'Our Partners', href: '/partners' },
      { label: 'Blog', href: '/blog' },
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
