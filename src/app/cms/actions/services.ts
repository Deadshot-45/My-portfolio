'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/auth';
import {
  createService,
  deleteService,
  getServiceById,
  setServiceActive,
  slugExistsService,
  updateService,
} from '@/lib/cms/services';

function formString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' ? value : undefined;
}

export async function createServiceAction(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get('title') || '').trim();
  const slug = String(formData.get('slug') || '').trim();
  if (!title || !slug) return { error: 'Title and slug are required.' };
  if (await slugExistsService(slug)) return { error: 'A service with this slug already exists.' };
  await createService({
    title, slug,
    shortDescription: formString(formData, 'shortDescription'),
    description: formString(formData, 'description'),
    icon: formString(formData, 'icon'),
    features: formString(formData, 'features'),
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    active: formData.get('active') === 'on',
    seoTitle: formString(formData, 'seoTitle'),
    seoDescription: formString(formData, 'seoDescription'),
  });
  revalidatePath('/cms/services');
  revalidatePath('/');
  redirect('/cms/services');
}

export async function updateServiceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const slug = String(formData.get('slug') || '').trim();
  const title = String(formData.get('title') || '').trim();
  if (!id || !title || !slug) return { error: 'Title, slug and id are required.' };
  const existing = await getServiceById(id);
  if (!existing) return { error: 'Service not found.' };
  if (slug !== existing.slug && (await slugExistsService(slug, id))) return { error: 'A service with this slug already exists.' };
  await updateService({
    id, title, slug,
    shortDescription: formString(formData, 'shortDescription'),
    description: formString(formData, 'description'),
    icon: formString(formData, 'icon'),
    features: formString(formData, 'features'),
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    active: formData.get('active') === 'on',
    seoTitle: formString(formData, 'seoTitle'),
    seoDescription: formString(formData, 'seoDescription'),
  });
  revalidatePath('/cms/services');
  revalidatePath('/');
  redirect('/cms/services');
}

export async function deleteServiceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  await deleteService(id);
  revalidatePath('/cms/services');
  revalidatePath('/');
}

export async function setServiceActiveAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const active = String(formData.get('active') === 'true');
  await setServiceActive(id, active === 'true');
  revalidatePath('/cms/services');
  revalidatePath('/');
}
