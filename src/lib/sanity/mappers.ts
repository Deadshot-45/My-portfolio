import type {
  SanityProject,
  SanityProfile,
  SanityService,
  SanityTestimonial,
  SanityClient,
  SanityExperience,
  SanitySkill,
  SanitySeoSettings,
  SanitySiteSettings,
} from './types';
import { urlForSanityImage } from './client';
import type {
  Project,
  ProjectCategory,
  ClientMark,
  ClientReview,
  ExperienceItem,
  UserProfile,
  ServiceItem,
  TechnicalSkillGroup,
} from '../../types/index';
import { USER_PROFILE } from '../../data/portfolioData';

const categoryLabels: Record<ProjectCategory, string> = {
  all: 'All Work',
  websites: 'Full-Stack Website',
  ecommerce: 'E-Commerce Platform',
  threejs: '3D & Interactive WebGL',
  ai: 'AI Assistant & Automation',
};

export function mapSanityProjectToFrontend(doc: SanityProject): Project {
  const slug = typeof doc.slug === 'string' ? doc.slug : doc.slug?.current || doc._id;
  const rawCategory = doc.category || 'websites';
  const category = (['websites', 'ecommerce', 'threejs', 'ai'].includes(rawCategory)
    ? rawCategory
    : 'websites') as ProjectCategory;

  let tags: string[] = [];
  if (Array.isArray(doc.technologies)) {
    tags = doc.technologies.filter(Boolean);
  } else if (typeof doc.technologies === 'string') {
    tags = doc.technologies.split(',').map((t) => t.trim()).filter(Boolean);
  }

  const coverUrl = doc.coverImageUrl || urlForSanityImage(doc.coverImage);

  const deliverables = doc.deliverables && doc.deliverables.length > 0
    ? doc.deliverables.map((d) => (typeof d === 'string' ? d : d.title || String(d)))
    : ['Full-Stack Architecture', 'Responsive UI & Polish'];

  const metrics = doc.metrics && doc.metrics.length > 0
    ? doc.metrics.map((m) => ({ label: m.label || '', value: m.value || '' }))
    : [
        { label: 'Timeline', value: doc.duration || 'Sprint' },
        { label: 'Category', value: categoryLabels[category] },
      ];

  return {
    id: slug,
    title: doc.title,
    client: doc.clientName || 'Client Project',
    location: doc.location || 'Indore, India',
    year: doc.year || (doc._createdAt ? new Date(doc._createdAt).getFullYear().toString() : '2026'),
    category,
    categoryLabel: doc.categoryLabel || categoryLabels[category] || 'Web Application',
    description: doc.shortDescription || doc.description || '',
    longDescription: doc.description || doc.shortDescription || '',
    tags: tags.length > 0 ? tags : ['Full-Stack', 'Next.js', 'TypeScript'],
    metrics,
    deliverables,
    liveUrl: doc.liveUrl,
    githubUrl: doc.githubUrl,
    accentColor: doc.accentColor || '#9bf35a',
    featured: Boolean(doc.featured),
    coverImage: coverUrl,
    imagePlaceholder: {
      badge: doc.badge || `${categoryLabels[category]} • Live`,
      headline: doc.headline || doc.title,
      gradientFrom: '#151719',
      gradientTo: '#0b0c0e',
    },
  };
}

export function mapSanityProfileToFrontend(doc: SanityProfile): UserProfile {
  const githubLink = doc.socialLinks?.find((s) => s.platform.toLowerCase().includes('github'))?.url;
  const linkedinLink = doc.socialLinks?.find((s) => s.platform.toLowerCase().includes('linkedin'))?.url;

  return {
    name: doc.name || USER_PROFILE.name,
    role: doc.headline || USER_PROFILE.role,
    location: doc.location || USER_PROFILE.location,
    email: doc.email || USER_PROFILE.email,
    phone: doc.phone || USER_PROFILE.phone,
    github: githubLink || USER_PROFILE.github,
    linkedin: linkedinLink || USER_PROFILE.linkedin,
    summary: doc.bio || USER_PROFILE.summary,
  };
}

export function mapSanityServiceToFrontend(doc: SanityService, index: number = 0): ServiceItem {
  return {
    id: doc._id.replace(/^service-/, ''),
    number: doc.number || `0${index + 1}`,
    title: doc.title,
    subtitle: doc.subtitle || '',
    description: doc.description || '',
    tags: Array.isArray(doc.tags) && doc.tags.length > 0 ? doc.tags : ['Full-Stack', 'Production'],
    deliverables: doc.deliverables && doc.deliverables.length > 0
      ? doc.deliverables.map((d) => (typeof d === 'string' ? { title: d, description: '' } : { title: d.title || '', description: d.description || '' }))
      : [],
    techStack: Array.isArray(doc.techStack) && doc.techStack.length > 0 ? doc.techStack : ['Next.js', 'TypeScript', 'Tailwind CSS'],
    badge: doc.badge || 'Production Grade',
  };
}

export function mapSanityClientToFrontend(doc: SanityClient): ClientMark {
  return {
    name: doc.name,
    city: doc.city || 'Global',
    country: doc.country || 'International',
    category: doc.category || doc.description || 'Client Partner',
  };
}

export function mapSanityTestimonialToFrontend(doc: SanityTestimonial): ClientReview {
  return {
    id: doc._id,
    clientName: doc.clientName,
    company: doc.company || doc.clientName,
    rating: doc.rating ?? 5.0,
    serviceTag: doc.clientDesignation || 'Client Review',
    quote: doc.content,
  };
}

export function mapSanityExperienceToFrontend(doc: SanityExperience): ExperienceItem {
  let technologies: string[] = [];
  if (Array.isArray(doc.technologies)) {
    technologies = doc.technologies.filter(Boolean);
  } else if (typeof doc.technologies === 'string') {
    technologies = doc.technologies.split(',').map((t) => t.trim()).filter(Boolean);
  }

  const startYear = doc.startDate ? new Date(doc.startDate).getFullYear().toString() : '2024';
  const endYear = doc.current ? 'Present' : doc.endDate ? new Date(doc.endDate).getFullYear().toString() : '2025';

  return {
    id: doc._id,
    period: doc.period || `${startYear} – ${endYear}`,
    role: doc.title,
    company: doc.company,
    location: doc.location || 'Indore, MP, India',
    type: doc.employmentType || 'Full-Time',
    description: doc.description || '',
    highlights: doc.highlights && doc.highlights.length > 0
      ? doc.highlights
      : [doc.description || 'Full-stack engineering.'],
    technologies: technologies.length > 0 ? technologies : ['Full-Stack', 'TypeScript'],
  };
}

export function mapSanitySkillToFrontend(doc: SanitySkill): TechnicalSkillGroup {
  return {
    category: doc.category,
    skills: Array.isArray(doc.skills) ? doc.skills : [],
  };
}

