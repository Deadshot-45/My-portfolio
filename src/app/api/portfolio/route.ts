import { NextResponse } from 'next/server';
import { getPublishedProjects, CmsProject } from '@/lib/cms/projects';
import { getActiveServices, CmsService } from '@/lib/cms/services';
import { getActiveClients, CmsClient } from '@/lib/cms/clients';
import { getPublishedTestimonials, CmsTestimonial } from '@/lib/cms/testimonials';
import { getProfile, CmsProfile } from '@/lib/cms/profile';
import { listExperience, CmsExperience } from '@/lib/cms/experience';
import { listSiteSettings, CmsSiteSetting } from '@/lib/cms/settings';
import { isSanityConfigured, sanityFetch } from '@/lib/sanity/client';
import {
  SANITY_PROJECTS_QUERY,
  SANITY_PROFILE_QUERY,
  SANITY_SERVICES_QUERY,
  SANITY_TESTIMONIALS_QUERY,
  SANITY_CLIENTS_QUERY,
  SANITY_EXPERIENCE_QUERY,
} from '@/lib/sanity/queries';
import {
  SanityProject,
  SanityProfile,
  SanityService,
  SanityTestimonial,
  SanityClient,
  SanityExperience,
} from '@/lib/sanity/types';
import {
  mapSanityProjectToFrontend,
  mapSanityProfileToFrontend,
  mapSanityServiceToFrontend,
  mapSanityTestimonialToFrontend,
  mapSanityClientToFrontend,
  mapSanityExperienceToFrontend,
} from '@/lib/sanity/mappers';
import {
  PROJECTS,
  SERVICES,
  CLIENT_MARKS,
  CLIENT_REVIEWS,
  USER_PROFILE,
  WORK_EXPERIENCE,
} from '@/data/portfolioData';
import { Project, ProjectCategory, ClientMark, ClientReview, ExperienceItem, UserProfile } from '@/types/index';

export const dynamic = 'force-dynamic';

function mapCmsProjectToFrontendProject(cms: CmsProject): Project {
  const tags = cms.technologies
    ? cms.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];
  const category = (['websites', 'ecommerce', 'threejs', 'ai'].includes(cms.category || '')
    ? cms.category
    : 'websites') as ProjectCategory;

  const categoryLabels: Record<ProjectCategory, string> = {
    all: 'All Work',
    websites: 'Full-Stack Website',
    ecommerce: 'E-Commerce Platform',
    threejs: '3D & Interactive WebGL',
    ai: 'AI Assistant & Automation',
  };

  return {
    id: cms.slug || cms.id,
    title: cms.title,
    client: cms.clientName || 'Mayank Sahu',
    location: 'Indore, India',
    year: cms.createdAt ? new Date(cms.createdAt).getFullYear().toString() : '2026',
    category,
    categoryLabel: categoryLabels[category] || 'Web Application',
    description: cms.shortDescription || cms.description || '',
    longDescription: cms.description || cms.shortDescription || '',
    tags: tags.length > 0 ? tags : ['Full-Stack', 'TypeScript', 'Next.js'],
    metrics: [
      { label: 'Timeline', value: cms.duration || 'Sprint' },
      { label: 'Category', value: categoryLabels[category] || 'Custom' },
    ],
    deliverables: ['Full-Stack Architecture', 'Responsive UI & Polish'],
    liveUrl: cms.liveUrl || undefined,
    githubUrl: cms.githubUrl || undefined,
    accentColor: '#9bf35a',
    featured: !!cms.featured,
    coverImage: cms.coverImage || (cms.images && cms.images[0]?.url) || undefined,
    imagePlaceholder: {
      badge: `${categoryLabels[category]} • Live`,
      headline: cms.title,
      gradientFrom: '#151719',
      gradientTo: '#0b0c0e',
    },
  };
}

function mapCmsClientToClientMark(c: CmsClient): ClientMark {
  return {
    name: c.name,
    city: 'Global',
    country: 'International',
    category: c.description || 'Client Partner',
  };
}

function mapCmsTestimonialToClientReview(t: CmsTestimonial): ClientReview {
  return {
    id: t.id,
    clientName: t.clientName,
    company: t.company || t.clientName,
    rating: t.rating ?? 5.0,
    serviceTag: t.clientDesignation || 'Client Review',
    quote: t.content,
  };
}

function mapCmsExperienceToFrontend(exp: CmsExperience): ExperienceItem {
  const highlights = exp.description
    ? exp.description.split('\n').map((l) => l.replace(/^[-*•]\s*/, '').trim()).filter(Boolean)
    : [];
  const technologies = exp.technologies
    ? exp.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const startYear = exp.startDate ? new Date(exp.startDate).getFullYear() : '2024';
  const endYear = exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear() : '2025';

  return {
    id: exp.id,
    period: `${startYear} – ${endYear}`,
    role: exp.title,
    company: exp.company,
    location: 'Indore, MP, India',
    type: exp.employmentType || 'Full-Time',
    description: exp.description || '',
    highlights: highlights.length > 0 ? highlights : [exp.description || 'Full-stack engineering.'],
    technologies: technologies.length > 0 ? technologies : ['Full-Stack', 'TypeScript'],
  };
}

export async function GET() {
  try {
    // 1. Sanity CMS Fetch (when NEXT_PUBLIC_SANITY_PROJECT_ID is provided)
    let sanityProjects: Project[] | null = null;
    let sanityProfile: UserProfile | null = null;
    let sanityClients: ClientMark[] | null = null;
    let sanityTestimonials: ClientReview[] | null = null;
    let sanityExperiences: ExperienceItem[] | null = null;

    if (isSanityConfigured()) {
      try {
        const [sProj, sProf, sClients, sTestim, sExp] = await Promise.all([
          sanityFetch<SanityProject[]>(SANITY_PROJECTS_QUERY),
          sanityFetch<SanityProfile>(SANITY_PROFILE_QUERY),
          sanityFetch<SanityClient[]>(SANITY_CLIENTS_QUERY),
          sanityFetch<SanityTestimonial[]>(SANITY_TESTIMONIALS_QUERY),
          sanityFetch<SanityExperience[]>(SANITY_EXPERIENCE_QUERY),
        ]);

        if (sProj && sProj.length > 0) sanityProjects = sProj.map(mapSanityProjectToFrontend);
        if (sProf) sanityProfile = mapSanityProfileToFrontend(sProf);
        if (sClients && sClients.length > 0) sanityClients = sClients.map(mapSanityClientToFrontend);
        if (sTestim && sTestim.length > 0) sanityTestimonials = sTestim.map(mapSanityTestimonialToFrontend);
        if (sExp && sExp.length > 0) sanityExperiences = sExp.map(mapSanityExperienceToFrontend);
      } catch (sanityErr: unknown) {
        console.warn('[API/portfolio] Sanity fetch error, falling back to database/static:', sanityErr);
      }
    }

    // 2. MongoDB & Local CMS Fetch (runs as local CMS or fallback)
    const [rawProjects, rawServices, rawClients, rawTestimonials, rawProfile, rawExperiences, rawSettings] =
      await Promise.all([
        getPublishedProjects().catch((err: unknown) => {
          console.warn('[API/portfolio] Failed to fetch projects:', err);
          return [] as CmsProject[];
        }),
        getActiveServices().catch((err: unknown) => {
          console.warn('[API/portfolio] Failed to fetch services:', err);
          return [] as CmsService[];
        }),
        getActiveClients().catch((err: unknown) => {
          console.warn('[API/portfolio] Failed to fetch clients:', err);
          return [] as CmsClient[];
        }),
        getPublishedTestimonials().catch((err: unknown) => {
          console.warn('[API/portfolio] Failed to fetch testimonials:', err);
          return [] as CmsTestimonial[];
        }),
        getProfile().catch((err: unknown) => {
          console.warn('[API/portfolio] Failed to fetch profile:', err);
          return null as CmsProfile | null;
        }),
        listExperience().catch((err: unknown) => {
          console.warn('[API/portfolio] Failed to fetch experience:', err);
          return [] as CmsExperience[];
        }),
        listSiteSettings().catch((err: unknown) => {
          console.warn('[API/portfolio] Failed to fetch settings:', err);
          return [] as CmsSiteSetting[];
        }),
      ]);

    // Priority: Sanity -> MongoDB -> Static Data
    const projects: Project[] =
      sanityProjects && sanityProjects.length > 0
        ? sanityProjects
        : rawProjects.length > 0
        ? rawProjects.map(mapCmsProjectToFrontendProject)
        : PROJECTS;

    const clients: ClientMark[] =
      sanityClients && sanityClients.length > 0
        ? sanityClients
        : rawClients.length > 0
        ? rawClients.map(mapCmsClientToClientMark)
        : CLIENT_MARKS;

    const testimonials: ClientReview[] =
      sanityTestimonials && sanityTestimonials.length > 0
        ? sanityTestimonials
        : rawTestimonials.length > 0
        ? rawTestimonials.map(mapCmsTestimonialToClientReview)
        : CLIENT_REVIEWS;

    const profile: UserProfile =
      sanityProfile ||
      (rawProfile
        ? {
            name: rawProfile.name || USER_PROFILE.name,
            role: rawProfile.headline || USER_PROFILE.role,
            location: rawProfile.location || USER_PROFILE.location,
            email: rawProfile.email || USER_PROFILE.email,
            phone: USER_PROFILE.phone,
            github: USER_PROFILE.github,
            linkedin: USER_PROFILE.linkedin,
            summary: rawProfile.introduction || rawProfile.biography || USER_PROFILE.summary,
          }
        : USER_PROFILE);

    const experiences: ExperienceItem[] =
      sanityExperiences && sanityExperiences.length > 0
        ? sanityExperiences
        : rawExperiences.length > 0
        ? rawExperiences.map(mapCmsExperienceToFrontend)
        : WORK_EXPERIENCE;

    const settingsRecord: Record<string, string> = {};
    for (const s of rawSettings) {
      if (s.key && s.value) {
        settingsRecord[s.key] = s.value;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        projects,
        services: rawServices.length > 0 ? rawServices : SERVICES,
        clients,
        testimonials,
        profile,
        experiences,
        settings: settingsRecord,
      },
    });
  } catch (error: unknown) {
    console.error('[API/portfolio] Critical error:', error);
    // Graceful fallback to static data
    return NextResponse.json({
      success: true,
      data: {
        projects: PROJECTS,
        services: SERVICES,
        clients: CLIENT_MARKS,
        testimonials: CLIENT_REVIEWS,
        profile: USER_PROFILE,
        experiences: WORK_EXPERIENCE,
        settings: {},
      },
    });
  }
}
