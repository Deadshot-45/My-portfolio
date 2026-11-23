export interface SanityImageAsset {
  _type?: string;
  asset?: {
    _ref?: string;
    url?: string;
  };
  url?: string;
}

export interface SanityProject {
  _id: string;
  _createdAt?: string;
  title: string;
  slug?: { current: string } | string;
  clientName?: string;
  category?: 'websites' | 'ecommerce' | 'threejs' | 'ai' | string;
  categoryLabel?: string;
  shortDescription?: string;
  description?: string;
  technologies?: string[] | string;
  duration?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  coverImage?: SanityImageAsset | string;
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
  title: string;
  subtitle?: string;
  description?: string;
  deliverables?: string[];
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
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  highlights?: string[];
  technologies?: string[] | string;
  displayOrder?: number;
}
