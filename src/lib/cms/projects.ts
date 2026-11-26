import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export type ProjectStatusValue = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface ProjectImage {
  id: string;
  projectId?: string;
  url: string;
  altText?: string | null;
  displayOrder: number;
  createdAt?: Date;
}

export interface CmsProject {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  coverImage: string | null;
  category: string | null;
  technologies: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  clientName: string | null;
  duration: string | null;
  featured: boolean;
  displayOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  status: ProjectStatusValue;
  createdAt: Date;
  updatedAt: Date;
  images: ProjectImage[];
  _count: { images: number };
}

export interface ListProjectsParams {
  search?: string;
  status?: ProjectStatusValue;
  category?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ListProjectsResult {
  projects: CmsProject[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function formatProjectDoc(doc: any): CmsProject {
  const serialized = serializeDoc<any>(doc);
  const images = (serialized.images || []).map((img: any) => ({
    ...img,
    id: img.id || generateId(),
    displayOrder: img.displayOrder ?? 0,
  }));
  return {
    ...serialized,
    images,
    _count: { images: images.length },
  };
}

/**
 * List CMS projects with search, filtering and pagination.
 * Used by the CMS dashboard. Public queries use getPublishedProjects instead.
 */
export async function listProjects(params: ListProjectsParams = {}): Promise<ListProjectsResult> {
  const {
    search,
    status,
    category,
    featured,
    page = 1,
    pageSize = 20,
  } = params;
  const skip = (page - 1) * pageSize;

  const filter: any = {};
  if (search) {
    const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { title: { $regex: searchRegex } },
      { clientName: { $regex: searchRegex } },
      { slug: { $regex: searchRegex } },
    ];
  }
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (typeof featured === 'boolean') filter.featured = featured;

  const projectCol = await getCollection('projects');

  const [rawProjects, total] = await Promise.all([
    projectCol
      .find(filter)
      .sort({ displayOrder: 1, updatedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray(),
    projectCol.countDocuments(filter),
  ]);

  const projects = rawProjects.map(formatProjectDoc);

  return {
    projects,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export async function getProjectById(id: string): Promise<CmsProject | null> {
  const projectCol = await getCollection('projects');
  const project = await projectCol.findOne({ _id: new ObjectId(id) });
  return project ? formatProjectDoc(project) : null;
}

export async function getProjectBySlug(slug: string): Promise<CmsProject | null> {
  const projectCol = await getCollection('projects');
  const project = await projectCol.findOne({ slug });
  return project ? formatProjectDoc(project) : null;
}

export interface CreateProjectInput {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  coverImage?: string;
  category?: string;
  technologies?: string;
  liveUrl?: string;
  githubUrl?: string;
  clientName?: string;
  duration?: string;
  featured?: boolean;
  displayOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
  status?: ProjectStatusValue;
  images?: ProjectImage[];
}

export async function createProject(data: CreateProjectInput) {
  const projectCol = await getCollection('projects');
  const now = new Date();
  const id = generateId();

  const newProject = {
    id,
    title: data.title,
    slug: data.slug,
    shortDescription: data.shortDescription ?? null,
    description: data.description ?? null,
    coverImage: data.coverImage ?? null,
    category: data.category ?? null,
    technologies: data.technologies ?? null,
    liveUrl: data.liveUrl ?? null,
    githubUrl: data.githubUrl ?? null,
    clientName: data.clientName ?? null,
    duration: data.duration ?? null,
    featured: data.featured ?? false,
    displayOrder: data.displayOrder ?? 0,
    seoTitle: data.seoTitle ?? null,
    seoDescription: data.seoDescription ?? null,
    status: data.status ?? 'DRAFT',
    images: data.images ?? [],
    createdAt: now,
    updatedAt: now,
  };

  await projectCol.insertOne(newProject as any);
  return formatProjectDoc(newProject);
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}

export async function updateProject(data: UpdateProjectInput) {
  const { id, ...rest } = data;
  const projectCol = await getCollection('projects');

  const updateFields: any = {
    ...rest,
    updatedAt: new Date(),
  };

  await projectCol.updateOne({ id }, { $set: updateFields });
  return getProjectById(id);
}

export async function deleteProject(id: string) {
  const projectCol = await getCollection('projects');
  return projectCol.deleteOne({ id });
}

export async function setProjectStatus(id: string, status: ProjectStatusValue) {
  const projectCol = await getCollection('projects');
  await projectCol.updateOne({ id }, { $set: { status, updatedAt: new Date() } });
  return getProjectById(id);
}

export async function slugExists(slug: string, excludeId?: string) {
  const projectCol = await getCollection('projects');
  const filter: any = { slug };
  if (excludeId) {
    filter.id = { $ne: excludeId };
  }
  const existing = await projectCol.findOne(filter);
  return !!existing;
}

/**
 * Public portfolio queries — return PUBLISHED records only.
 * Draft and archived content never leaks through these functions.
 */
export async function getPublishedProjects(): Promise<CmsProject[]> {
  const projectCol = await getCollection('projects');
  const rawProjects = await projectCol
    .find({ status: 'PUBLISHED' })
    .sort({ displayOrder: 1, updatedAt: -1 })
    .toArray();
  return rawProjects.map(formatProjectDoc);
}

export async function getPublishedProjectBySlug(slug: string): Promise<CmsProject | null> {
  const projectCol = await getCollection('projects');
  const orConditions: any[] = [{ slug }, { id: slug }];
  if (ObjectId.isValid(slug)) {
    orConditions.push({ _id: new ObjectId(slug) });
  }
  const project = await projectCol.findOne({
    status: 'PUBLISHED',
    $or: orConditions,
  });
  return project ? formatProjectDoc(project) : null;
}
