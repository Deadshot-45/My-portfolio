import type { MetadataRoute } from 'next';
import { getRobotsConfig, DEFAULT_SITE_URL } from '@/utils/seoUtils';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return getRobotsConfig(siteUrl);
}
