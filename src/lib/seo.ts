/**
 * Resolves the canonical site base URL with automated fallbacks for Vercel production and preview deployments.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
  }
  return 'https://mayank-sahu-dev.vercel.app';
}

export interface SeoConfig {
  siteUrl: string;
  name: string;
  shortName: string;
  role: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
    countryCode: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  keywords: string[];
  skills: string[];
  ogImage: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
}

export const seoConfig: SeoConfig = {
  siteUrl: getSiteUrl(),
  name: 'Mayank Sahu',
  shortName: 'Mayank',
  role: 'Creative Full-Stack Developer & Designer',
  title: 'Mayank Sahu | Creative Full-Stack Developer & Designer',
  description:
    'Full-stack developer and creative designer crafting high-converting web apps, 3D interactive experiences, online stores, and autonomous AI systems.',
  email: 'mayanksahu8179@gmail.com',
  phone: '+91 93019 09040',
  location: {
    city: 'Indore',
    state: 'Madhya Pradesh',
    country: 'India',
    countryCode: 'IN',
  },
  socials: {
    github: 'https://github.com/Deadshot-45',
    linkedin: 'https://linkedin.com/in/mayank-sahu-ou',
  },
  keywords: [
    'Mayank Sahu',
    'Mayank',
    'Deadshot-45',
    'Full-Stack Developer',
    'Creative Designer',
    'UI/UX Designer',
    'Next.js 16 Developer',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'Socket.io',
    'PostgreSQL',
    'MongoDB',
    'Three.js WebGL',
    'FinTech UI Architecture',
    'Autonomous AI Assistants',
    'Atomic Component Design',
    'Core Web Vitals Optimization',
    'Portfolio',
  ],
  skills: [
    'React 19',
    'Next.js (App Router)',
    'TypeScript',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'Socket.io',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Docker',
    'Three.js',
    'Zustand',
    'TanStack Query',
  ],
  ogImage: {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: 'Mayank Sahu — Creative Full-Stack Developer & Designer',
  },
};

/**
 * Helper to determine whether the current deployment is an active Vercel production environment.
 */
export function isProductionEnvironment(): boolean {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === 'production';
  }
  return process.env.NODE_ENV === 'production';
}
