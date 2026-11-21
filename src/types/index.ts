export type SkyMode = 'day' | 'sunset' | 'night';
export type ThemeMode = 'dark' | 'light';

export interface TechnicalSkillGroup {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  id?: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  summary?: string;
  highlights: string[];
  achievements?: string[];
  technologies: string[];
}

export type ProjectCategory = 'all' | 'websites' | 'ecommerce' | 'threejs' | 'ai';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  client: string;
  location: string;
  year: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: ProjectMetric[];
  deliverables: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  featured: boolean;
  coverImage?: string;
  imagePlaceholder: {
    badge: string;
    headline: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

export interface ClientReview {
  id: string;
  clientName: string;
  company: string;
  rating: number;
  serviceTag: string;
  quote: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  deliverables: { title: string; description: string }[];
  techStack: string[];
  badge: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string[];
}

export interface ClientMark {
  name: string;
  city: string;
  country: string;
  category: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  projectType: string;
  budgetRange?: string;
  timeline: string;
  message: string;
}

export interface UserProfile {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
}
