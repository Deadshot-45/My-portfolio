import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/seo';
import { PROJECTS } from '@/data/portfolioData';
import { getPublishedProjects } from '@/lib/cms/projects';

export const dynamic = 'force-static';
export const revalidate = 3600;

interface ProjectSummary {
  slug: string;
  updatedAt?: Date | string;
}

/**
 * Safely fetches published project slugs for dynamic sitemap generation.
 * Supports external Express API endpoints if defined, with direct CMS and static fallbacks.
 */
async function fetchPublishedProjectSlugs(): Promise<ProjectSummary[]> {
  const expressBaseUrl =
    process.env.EXPRESS_API_URL ||
    process.env.NEXT_PUBLIC_EXPRESS_API_URL ||
    process.env.NEXT_PUBLIC_API_URL;

  // 1. Try Express API endpoint if configured
  if (expressBaseUrl) {
    try {
      const cleanUrl = expressBaseUrl.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/api/projects`, {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const json = await res.json();
        const items = Array.isArray(json) ? json : json?.data || json?.projects;
        if (Array.isArray(items) && items.length > 0) {
          return items
            .map((item: any) => ({
              slug: item.slug || item.id || (item._id ? String(item._id) : ''),
              updatedAt: item.updatedAt || item.createdAt,
            }))
            .filter((p: ProjectSummary) => Boolean(p.slug));
        }
      }
    } catch (err) {
      console.warn('[sitemap] Express endpoint unreachable during build, using fallback:', err);
    }
  }

  // 2. Try direct MongoDB CMS query
  try {
    const cmsProjects = await getPublishedProjects();
    if (cmsProjects && cmsProjects.length > 0) {
      return cmsProjects.map((p) => ({
        slug: p.slug || p.id,
        updatedAt: p.updatedAt,
      }));
    }
  } catch (err) {
    console.warn('[sitemap] Database query fallback triggered during build:', err);
  }

  // 3. Resilient static fallback ensures `next build` never fails during cold starts
  return PROJECTS.map((p) => ({
    slug: p.id,
    updatedAt: new Date(),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const currentDate = new Date();

  // Public static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Dynamic project routes
  const projectSlugs = await fetchPublishedProjectSlugs();
  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
