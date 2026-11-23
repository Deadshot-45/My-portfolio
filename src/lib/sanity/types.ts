export interface SanityImageAsset {
  _type?: string;
  asset?: {
    _ref?: string;
    url?: string;
  };
  url?: string;
}

export interface SanityMetric {
  label: string;
  value: string;
}

export interface SanityDeliverable {
  title: string;
  description?: string;
}

export interface SanityProject {
  _id: string;
  _createdAt?: string;
  title: string;
  slug?: { current: string } | string;
  clientName?: string;
  location?: string;
  year?: string;
  category?: 'websites' | 'ecommerce' | 'threejs' | 'ai' | string;
  categoryLabel?: string;
  shortDescription?: string;
  description?: string;
  technologies?: string[] | string;
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  accentColor?: string;
  featured?: boolean;
  coverImage?: SanityImageAsset | string;
  coverImageUrl?: string;
  headline?: string;
  badge?: string;
  metrics?: SanityMetric[];
  deliverables?: string[] | SanityDeliverable[];
  displayOrder?: number;
}

export interface SanityProfile {
  _id: string;
  name?: string;
  headline?: string;
  bio?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatar?: SanityImageAsset | string;
  resumeUrl?: string;
  statusText?: string;
  availableForWork?: boolean;
  socialLinks?: Array<{
    platform: string;
    url: string;
    label?: string;
  }>;
}

export interface SanityService {
  _id: string;
  number?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  tags?: string[];
  deliverables?: Array<string | { title: string; description?: string }>;
  techStack?: string[];
  icon?: string;
  displayOrder?: number;
}

export interface SanityTestimonial {
  _id: string;
  clientName: string;
  company?: string;
  clientDesignation?: string;
  content: string;
  rating?: number;
  avatar?: SanityImageAsset | string;
  displayOrder?: number;
}

export interface SanityClient {
  _id: string;
  name: string;
  city?: string;
  country?: string;
  category?: string;
  description?: string;
  websiteUrl?: string;
  logo?: SanityImageAsset | string;
  displayOrder?: number;
}

export interface SanityExperience {
  _id: string;
  title: string;
  company: string;
  employmentType?: string;
  location?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
  technologies?: string[] | string;
  displayOrder?: number;
}

export interface SanitySkill {
  _id: string;
  category: string;
  skills: string[];
  displayOrder?: number;
}

export interface SanitySeoSettings {
  _id: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: SanityImageAsset | string;
  ogImageUrl?: string;
  twitterHandle?: string;
  robotsIndex?: boolean;
}

export interface SanitySiteSettings {
  _id: string;
  siteName?: string;
  tagline?: string;
  primaryEmail?: string;
  phone?: string;
  location?: string;
  availableForWork?: boolean;
  availabilityText?: string;
  defaultSkyMode?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}
