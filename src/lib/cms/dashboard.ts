import { getCollection, serializeDocs } from '@/lib/mongodb';

export interface DashboardStats {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalServices: number;
  totalTestimonials: number;
  totalClients: number;
  recentUpdates: Array<{
    id: string;
    title: string;
    type: 'project' | 'service' | 'testimonial' | 'client';
    status: string;
    updatedAt: Date;
  }>;
}

/**
 * Fetch real dashboard statistics from persisted MongoDB CMS data.
 * No hardcoded or fake data.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const [projectCol, serviceCol, testimonialCol, clientCol] = await Promise.all([
    getCollection('projects'),
    getCollection('services'),
    getCollection('testimonials'),
    getCollection('clients'),
  ]);

  const [rawProjects, rawServices, rawTestimonials, rawClients] = await Promise.all([
    projectCol.find({}).toArray(),
    serviceCol.find({}).toArray(),
    testimonialCol.find({}).toArray(),
    clientCol.find({}).toArray(),
  ]);

  const projects = serializeDocs<any>(rawProjects);
  const services = serializeDocs<any>(rawServices);
  const testimonials = serializeDocs<any>(rawTestimonials);
  const clients = serializeDocs<any>(rawClients);

  const publishedProjects = projects.filter((p) => p.status === 'PUBLISHED').length;
  const draftProjects = projects.filter((p) => p.status === 'DRAFT').length;

  const recentUpdates = [
    ...projects.map((p) => ({
      id: p.id,
      title: p.title,
      type: 'project' as const,
      status: p.status,
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    })),
    ...services.map((s) => ({
      id: s.id,
      title: s.title,
      type: 'service' as const,
      status: s.active ? 'active' : 'inactive',
      updatedAt: s.updatedAt ? new Date(s.updatedAt) : new Date(),
    })),
    ...testimonials.map((t) => ({
      id: t.id,
      title: t.clientName,
      type: 'testimonial' as const,
      status: t.status,
      updatedAt: t.updatedAt ? new Date(t.updatedAt) : new Date(),
    })),
    ...clients.map((c) => ({
      id: c.id,
      title: c.name,
      type: 'client' as const,
      status: c.active ? 'active' : 'inactive',
      updatedAt: c.updatedAt ? new Date(c.updatedAt) : new Date(),
    })),
  ]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 8);

  return {
    totalProjects: projects.length,
    publishedProjects,
    draftProjects,
    totalServices: services.length,
    totalTestimonials: testimonials.length,
    totalClients: clients.length,
    recentUpdates,
  };
}
