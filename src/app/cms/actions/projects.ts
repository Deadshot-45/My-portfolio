'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/auth';
import {
  createProject,
  deleteProject,
  getProjectById,
  setProjectStatus,
  slugExists,
  updateProject,
} from '@/lib/cms/projects';

function formString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' ? value : undefined;
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get('title') || '').trim();
  const slug = String(formData.get('slug') || '').trim();

  if (!title || !slug) {
    return { error: 'Title and slug are required.' };
  }

  if (await slugExists(slug)) {
    return { error: 'A project with this slug already exists.' };
  }

  await createProject({
    title,
    slug,
    shortDescription: formString(formData, 'shortDescription'),
    description: formString(formData, 'description'),
    coverImage: formString(formData, 'coverImage'),
    category: formString(formData, 'category'),
    technologies: formString(formData, 'technologies'),
    liveUrl: formString(formData, 'liveUrl'),
    githubUrl: formString(formData, 'githubUrl'),
    clientName: formString(formData, 'clientName'),
    duration: formString(formData, 'duration'),
    featured: formData.get('featured') === 'on',
    seoTitle: formString(formData, 'seoTitle'),
    seoDescription: formString(formData, 'seoDescription'),
    status: (() => {
      const s = String(formData.get('status') || 'DRAFT');
      return s === 'PUBLISHED' || s === 'ARCHIVED' ? s : 'DRAFT';
    })(),
  });

  revalidatePath('/cms/projects');
  revalidatePath('/');
  redirect('/cms/projects');
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get('id') || '');
  const slug = String(formData.get('slug') || '').trim();
  const title = String(formData.get('title') || '').trim();

  if (!id || !title || !slug) {
    return { error: 'Title, slug and id are required.' };
  }

  const existing = await getProjectById(id);
  if (!existing) {
    return { error: 'Project not found.' };
  }

  if (slug !== existing.slug && (await slugExists(slug, id))) {
    return { error: 'A project with this slug already exists.' };
  }

  await updateProject({
    id,
    title,
    slug,
    shortDescription: formString(formData, 'shortDescription'),
    description: formString(formData, 'description'),
    coverImage: formString(formData, 'coverImage'),
    category: formString(formData, 'category'),
    technologies: formString(formData, 'technologies'),
    liveUrl: formString(formData, 'liveUrl'),
    githubUrl: formString(formData, 'githubUrl'),
    clientName: formString(formData, 'clientName'),
    duration: formString(formData, 'duration'),
    featured: formData.get('featured') === 'on',
    seoTitle: formString(formData, 'seoTitle'),
    seoDescription: formString(formData, 'seoDescription'),
    status: (String(formData.get('status') || 'DRAFT') as any),
  });

  revalidatePath('/cms/projects');
  revalidatePath(`/cms/projects/${existing.slug}`);
  revalidatePath('/');
  redirect('/cms/projects');
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const project = await getProjectById(id);
  if (!project) return;
  await deleteProject(id);
  revalidatePath('/cms/projects');
  revalidatePath('/');
}

export async function setProjectStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '');
  const project = await getProjectById(id);
  if (!project) return;
  await setProjectStatus(id, status as any);
  revalidatePath('/cms/projects');
  revalidatePath('/');
}
