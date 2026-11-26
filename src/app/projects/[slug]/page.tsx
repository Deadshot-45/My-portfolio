import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Calendar, MapPin, CheckCircle2, Layers } from 'lucide-react';
import { getSiteUrl, seoConfig } from '@/lib/seo';
import { PROJECTS } from '@/data/portfolioData';
import { getPublishedProjects, getPublishedProjectBySlug } from '@/lib/cms/projects';
import { Project } from '@/types/index';

export const dynamic = 'force-static';
export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Helper to retrieve a published project by slug from CMS or authoritative fallback data.
 */
async function getProjectData(slug: string): Promise<Project | null> {
  

  // 2. Try direct MongoDB CMS query
  try {
    const cmsProject = await getPublishedProjectBySlug(slug);
    if (cmsProject) {
      const tags = cmsProject.technologies
        ? cmsProject.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [];
      return {
        id: cmsProject.slug || cmsProject.id,
        title: cmsProject.title,
        client: cmsProject.clientName || 'Mayank Sahu',
        location: 'Indore, India',
        year: cmsProject.createdAt ? new Date(cmsProject.createdAt).getFullYear().toString() : '2026',
        category: (cmsProject.category as any) || 'websites',
        categoryLabel: 'Case Study',
        description: cmsProject.shortDescription || cmsProject.description || '',
        longDescription: cmsProject.description || cmsProject.shortDescription || '',
        tags: tags.length > 0 ? tags : ['Full-Stack', 'Next.js', 'TypeScript'],
        metrics: [
          { label: 'Timeline', value: cmsProject.duration || 'Sprint' },
          { label: 'Category', value: cmsProject.category || 'Architecture' },
        ],
        deliverables: ['Full-Stack Architecture', 'Responsive UI & Polish'],
        liveUrl: cmsProject.liveUrl || undefined,
        githubUrl: cmsProject.githubUrl || undefined,
        accentColor: '#9bf35a',
        featured: !!cmsProject.featured,
        coverImage: cmsProject.coverImage || undefined,
        imagePlaceholder: {
          badge: 'Live Case Study',
          headline: cmsProject.title,
          gradientFrom: '#151719',
          gradientTo: '#0b0c0e',
        },
      };
    }
  } catch {
    // safe fallback to static data
  }

  // 3. Fallback to authoritative static data
  const staticFound = PROJECTS.find((p) => p.id === slug);
  return staticFound || null;
}

/**
 * Generate static params for build-time static generation on Vercel.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const cmsProjects = await getPublishedProjects();
    if (cmsProjects && cmsProjects.length > 0) {
      return cmsProjects.map((p) => ({
        slug: p.slug || p.id,
      }));
    }
  } catch {
    // fallback to static records
  }

  return PROJECTS.map((p) => ({
    slug: p.id,
  }));
}

/**
 * Generate dynamic OpenGraph, Twitter, and canonical metadata for the project case study.
 */
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectData(slug);
  const siteUrl = getSiteUrl();

  if (!project) {
    return {
      title: 'Project Case Study Not Found',
      description: 'The requested project case study could not be located in Mayank Sahu’s portfolio.',
    };
  }

  const title = `${project.title} — System Architecture & Case Study`;
  const description = project.description || project.longDescription || seoConfig.description;
  const canonicalUrl = `${siteUrl}/projects/${slug}`;
  const ogImageUrl = project.coverImage
    ? (project.coverImage.startsWith('http') ? project.coverImage : `${siteUrl}${project.coverImage}`)
    : `${siteUrl}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      title: `${project.title} | ${seoConfig.name}`,
      description,
      siteName: `${seoConfig.name} Portfolio`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} — Architecture and Case Study`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | ${seoConfig.name}`,
      description,
      images: [ogImageUrl],
      creator: '@Deadshot_45',
    },
    keywords: [
      project.title,
      project.categoryLabel,
      ...(project.tags || []),
      'Mayank Sahu',
      'Case Study',
      'Software Architecture',
    ],
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectData(slug);
  const siteUrl = getSiteUrl();

  if (!project) {
    notFound();
  }

  const projectUrl = `${siteUrl}/projects/${slug}`;
  const ogImageUrl = project.coverImage
    ? (project.coverImage.startsWith('http') ? project.coverImage : `${siteUrl}${project.coverImage}`)
    : `${siteUrl}/opengraph-image`;

  // Schema.org SoftwareApplication and CreativeWork JSON-LD
  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${projectUrl}/#software`,
    name: project.title,
    description: project.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser / Cloud',
    author: {
      '@type': 'Person',
      name: seoConfig.name,
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    keywords: project.tags?.join(', '),
    image: ogImageUrl,
    url: projectUrl,
  };

  return (
    <article className="min-h-screen bg-[#07070a] text-white selection:bg-[#9bf35a]/20 selection:text-[#9bf35a] relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_25%,#000_60%,transparent_100%)]"
      />

      {/* Layered Subtle Green Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#9bf35a]/5 rounded-full blur-[140px]"
      />

      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#9bf35a]" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#9bf35a]/15 text-[#9bf35a] border border-[#9bf35a]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9bf35a] animate-pulse" />
              <span>{project.categoryLabel}</span>
            </span>

            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{project.year}</span>
            </span>

            <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>{project.location}</span>
            </span>
          </div>

          <h1 className="font-grotesk text-[clamp(2.5rem,6vw,4.8rem)] font-light leading-[1.05] tracking-[-0.03em] text-white mb-6">
            {project.title}
          </h1>

          <p className="font-grotesk text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9bf35a] text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(155,243,90,0.4)] transition-all"
              >
                <span>Launch Live Application</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all"
              >
                <Github className="w-4 h-4 text-zinc-400" />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </header>

        {/* Project Cover Image Showcase Window */}
        <div className="mb-16 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0e0f12] shadow-2xl">
          {/* Browser Chrome Header */}
          <div className="h-10 px-4 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5 text-zinc-400 text-[11px] truncate max-w-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9bf35a] animate-pulse shrink-0" />
              <span className="truncate">
                {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : `${project.id}.prod`}
              </span>
            </div>

            <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
              {project.categoryLabel}
            </div>
          </div>

          {/* Cover Image Container */}
          <div className="relative aspect-video w-full overflow-hidden bg-[#07070a]">
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={`${project.title} Cover Showcase`}
                className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
              />
            ) : (
              <div
                className="w-full h-full p-8 flex flex-col justify-between"
                style={{
                  background: `linear-gradient(135deg, ${project.imagePlaceholder?.gradientFrom || '#09090b'}, ${project.imagePlaceholder?.gradientTo || '#18181b'})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-white/10 text-[#9bf35a]">
                    {project.categoryLabel}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">Production Live</span>
                </div>
                <h3 className="font-grotesk text-3xl font-light text-white">
                  {project.title}
                </h3>
              </div>
            )}

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Quantified Metrics Ribbon */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0e0f12] border border-white/10 shadow-lg"
              >
                <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1">
                  {metric.label}
                </p>
                <p className="font-grotesk text-2xl font-normal text-[#9bf35a]">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Deep Dive Architecture & Deliverables */}
        <section className="mb-16 p-8 rounded-3xl bg-[#0e0f12] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-[#9bf35a]" />
            <h2 className="font-grotesk text-2xl text-white font-normal tracking-tight">
              System Architecture & Core Engineering
            </h2>
          </div>

          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg mb-8">
            {project.longDescription}
          </p>

          {/* Deliverables List */}
          {project.deliverables && project.deliverables.length > 0 && (
            <div className="space-y-3 mb-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
                Key Technical Deliverables:
              </h3>
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#9bf35a] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          {project.tags && project.tags.length > 0 && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
                Technologies & Tools:
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 text-zinc-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Footer Contact CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-grotesk text-xl text-white font-medium mb-1">
              Interested in similar architecture?
            </h3>
            <p className="text-sm text-zinc-400">
              Let&apos;s build performant, high-converting digital products together.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9bf35a] text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(155,243,90,0.4)] transition-all shrink-0"
          >
            <span>Initiate Project Inquiry</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
