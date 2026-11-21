import type { MetadataRoute } from 'next';
import { getSitemapConfig, DEFAULT_SITE_URL } from '@/utils/seoUtils';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return getSitemapConfig(siteUrl);
}
