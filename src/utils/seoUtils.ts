import type { UserProfile } from '../types/index';

export const DEFAULT_SITE_URL = "https://mayank-sahu-dev.vercel.app/";

export interface SeoProfileOptions {
  baseUrl?: string;
  profile?: Partial<UserProfile>;
  skills?: string[];
}

export function generatePersonProfileJsonLd(options?: string | SeoProfileOptions) {
  const opts = typeof options === 'string' ? { baseUrl: options } : options || {};
  const cleanBaseUrl = (opts.baseUrl || DEFAULT_SITE_URL).replace(/\/+$/, '');
  const profile = opts.profile || {};
  const name = profile.name || 'Mayank Sahu';
  const role = profile.role || 'Creative Full-Stack Developer & Designer';
  const summary =
    profile.summary ||
    'Full-stack developer and creative designer crafting high-converting web apps, 3D interactive experiences, online stores, and autonomous AI systems.';
  const email = profile.email || 'mayanksahu8179@gmail.com';
  const phone = profile.phone || '+91 93019 09040';
  const github = profile.github || 'https://github.com/Deadshot-45';
  const linkedin = profile.linkedin || 'https://linkedin.com/in/mayank-sahu-ou';
  const skills = opts.skills && opts.skills.length > 0 ? opts.skills : [
    'React 19',
    'Next.js (App Router)',
    'TypeScript',
    'Node.js',
    'Express.js',
    'Socket.io',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Docker',
    'Tailwind CSS',
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${cleanBaseUrl}/#website`,
        url: cleanBaseUrl,
        name: `${name} Portfolio`,
        description: summary,
        inLanguage: 'en-US',
        publisher: {
          '@id': `${cleanBaseUrl}/#person`,
        },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${cleanBaseUrl}/#profilepage`,
        url: cleanBaseUrl,
        name: `${name} — Full-Stack Developer & Designer`,
        description: summary,
        inLanguage: 'en-US',
        isPartOf: {
          '@id': `${cleanBaseUrl}/#website`,
        },
        mainEntity: {
          '@id': `${cleanBaseUrl}/#person`,
        },
      },
      {
        '@type': 'Person',
        '@id': `${cleanBaseUrl}/#person`,
        name,
        alternateName: ['Mayank', 'Deadshot-45'],
        jobTitle: role,
        description: summary,
        url: cleanBaseUrl,
        image: `${cleanBaseUrl}/images/hero-sunset.jpg`,
        email: `mailto:${email}`,
        telephone: phone,
        sameAs: [github, linkedin].filter(Boolean),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Indore',
          addressRegion: 'Madhya Pradesh',
          addressCountry: 'IN',
        },
        knowsAbout: skills,
        mainEntityOfPage: {
          '@id': `${cleanBaseUrl}/#profilepage`,
        },
      },
    ],
  };
}

export function getRobotsConfig(baseUrl: string = DEFAULT_SITE_URL) {
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cms', '/cms/*', '/api/cms', '/api/cms/*'],
      },
    ],
    sitemap: `${cleanBaseUrl}/sitemap.xml`,
  };
}

export function getSitemapConfig(baseUrl: string = DEFAULT_SITE_URL, date: Date = new Date()) {
  const cleanBaseUrl = baseUrl.replace(/\/+$/, '');
  return [
    {
      url: `${cleanBaseUrl}/`,
      lastModified: date,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
  ];
}
