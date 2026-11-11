export type ThemeMode = 'dark' | 'light';

export type ProjectCategory = 'all' | 'fullstack' | 'realtime' | 'crm' | 'ecommerce';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: ProjectMetric[];
  deliverables: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  accentColor: string;
  imagePlaceholder?: {
    badge: string;
    headline: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface TechnicalSkillGroup {
  category: string;
  skills: string[];
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
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  projectType: string;
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
