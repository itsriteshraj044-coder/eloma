import type { LucideIcon } from 'lucide-react';

/** A single top-level navigation link. */
export interface NavLink {
  label: string;
  href: string;
}

/** A group of links inside a mega-menu (with optional column heading). */
export interface MegaMenuLinkGroup {
  heading?: string;
  links: NavLink[];
}

/** Full mega-menu descriptor for a nav item. */
export interface MegaMenu {
  eyebrow: string;
  heading: string;
  description: string;
  cta: NavLink;
  linkGroups: MegaMenuLinkGroup[];
}

/** A top-level nav item — plain link or with mega-menu. */
export interface NavItem {
  label: string;
  href: string;
  megaMenu?: MegaMenu;
}

/** A headline statistic (Connected Globally band). */
export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

/** A business vertical card (The Business Universe). */
export interface Business {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

/** A group company (Our Companies). */
export interface Company {
  index: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

/** A sustainability pillar (Why We Exist). */
export interface Pillar {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
}

/** A global capability (Global Presence). */
export interface Capability {
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/** An office location (Contact). */
export interface Office {
  city: string;
  primary?: boolean;
  address?: string;
  phone?: string;
  email?: string;
}

/** A footer link column. */
export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

/** A social media link. */
export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Official brand colour for hover/active state. */
  color: string;
}

/** Inquiry-type option for the contact form. */
export type InquiryType =
  | 'Partnership opportunity'
  | 'Logistics services'
  | 'Digital solutions'
  | 'Investor relations'
  | 'Media inquiry'
  | 'Careers'
  | 'Other';

/** A content block within a blog article body. */
export interface BlogSection {
  /** Optional sub-heading for the block. */
  heading?: string;
  /** One or more body paragraphs. */
  paragraphs: string[];
  /** Optional pull-quote rendered after the paragraphs. */
  quote?: string;
}

/** A single blog / insight article. */
export interface BlogPost {
  /** URL slug — `/blog/:slug`. */
  slug: string;
  title: string;
  /** Short card / list summary. */
  excerpt: string;
  /** Topic category (e.g. "Strategy", "Sustainability"). */
  category: string;
  author: string;
  authorRole: string;
  /** Human-readable publish date. */
  date: string;
  /** Estimated reading time, e.g. "6 min read". */
  readTime: string;
  /** Cover image URL. */
  image: string;
  /** Whether to surface as the lead/featured story. */
  featured?: boolean;
  /** Opening standfirst paragraph for the article page. */
  intro: string;
  /** Article body, in order. */
  sections: BlogSection[];
  /** Optional closing key-takeaway bullets. */
  takeaways?: string[];
}

/** Shape of the contact form state. */
export interface ContactFormState {
  fullName: string;
  workEmail: string;
  company: string;
  phone: string;
  inquiryType: InquiryType | '';
  message: string;
}
