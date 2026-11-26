import type { MetadataRoute } from 'next';
import { getSiteUrl, isProductionEnvironment } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const isProduction = isProductionEnvironment();

  // On Vercel preview environments, completely block indexing to prevent duplicate content
  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  // Production crawler directives: allow public portfolio pages, shield CMS & API endpoints
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cms',
          '/cms/*',
          '/api',
          '/api/*',
          '/api/cms',
          '/api/cms/*',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
