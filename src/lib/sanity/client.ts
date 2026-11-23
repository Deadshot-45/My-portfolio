import type { SanityImageAsset } from './types';

export interface SanityConfig {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  useCdn: boolean;
}

export function getSanityConfig(): SanityConfig | null {
  const projectId =
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset =
    process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
  const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2024-01-01';
  const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;

  if (!projectId) {
    return null;
  }

  return {
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: !token && process.env.NODE_ENV === 'production',
  };
}

export function isSanityConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
  );
}

/**
 * Resolves a Sanity image reference or asset object into a public CDN URL.
 */
export function urlForSanityImage(source?: SanityImageAsset | string | null): string | undefined {
  if (!source) return undefined;
  if (typeof source === 'string') return source;
  if (source.url) return source.url;

  const ref = source.asset?._ref;
  if (!ref) return source.asset?.url;

  const config = getSanityConfig();
  if (!config) return undefined;

  // Sanity image ref format: image-5b8d00392c68a0a8e5fa4e6720bf4859d04efba5-1200x800-png
  const parts = ref.split('-');
  if (parts.length >= 4 && parts[0] === 'image') {
    const id = parts[1];
    const dimensions = parts[2];
    const format = parts[3];
    return `https://cdn.sanity.io/images/${config.projectId}/${config.dataset}/${id}-${dimensions}.${format}`;
  }

  return undefined;
}

/**
 * Lightweight, zero-dependency Sanity GROQ fetcher using native fetch.
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, string | number>
): Promise<T | null> {
  const config = getSanityConfig();
  if (!config) {
    return null;
  }

  let finalQuery = query;
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      finalQuery = finalQuery.replace(new RegExp(`\\$${key}`, 'g'), JSON.stringify(val));
    }
  }

  const host = config.useCdn ? 'apicdn.sanity.io' : 'api.sanity.io';
  const endpoint = `https://${config.projectId}.${host}/v${config.apiVersion}/data/query/${config.dataset}?query=${encodeURIComponent(finalQuery)}`;

  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  if (config.token) {
    headers['Authorization'] = `Bearer ${config.token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
      signal: controller.signal,
      ...({ next: { revalidate: 60 } } as RequestInit),
    });

    if (!response.ok) {
      console.warn(`[Sanity] Query failed with status ${response.status}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return (data.result ?? null) as T | null;
  } catch (err: unknown) {
    console.warn('[Sanity] Error executing query:', err);
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
