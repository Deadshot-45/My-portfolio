'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import {
  createClient,
  deleteClient,
  getClientById,
  setClientActive,
  slugExistsClient,
  updateClient,
} from '@/lib/cms/clients';

function formString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

export async function createClientAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const name = String(formData.get('name') || '').trim();
  let slug = String(formData.get('slug') || '').trim();
  if (!slug && name) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  if (!name || !slug) {
    throw new Error('Client name and slug are required.');
  }

  if (await slugExistsClient(slug)) {
    throw new Error('A client with this slug already exists.');
  }

  await createClient({
    name,
    slug,
    logo: formString(formData, 'logo'),
    websiteUrl: formString(formData, 'websiteUrl'),
    description: formString(formData, 'description'),
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    active: formData.get('active') === 'on' || formData.get('active') === 'true',
  });

  revalidatePath('/cms/clients');
  revalidatePath('/');
  redirect('/cms/clients');
}

export async function updateClientAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const name = String(formData.get('name') || '').trim();
  const slug = String(formData.get('slug') || '').trim();

  if (!id || !name || !slug) {
    throw new Error('ID, client name and slug are required.');
  }

  const existing = await getClientById(id);
  if (!existing) {
    throw new Error('Client not found.');
  }

  if (slug !== existing.slug && (await slugExistsClient(slug, id))) {
    throw new Error('A client with this slug already exists.');
  }

  await updateClient({
    id,
    name,
    slug,
    logo: formString(formData, 'logo'),
    websiteUrl: formString(formData, 'websiteUrl'),
    description: formString(formData, 'description'),
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    active: formData.get('active') === 'on' || formData.get('active') === 'true',
  });

  revalidatePath('/cms/clients');
  revalidatePath('/');
  redirect('/cms/clients');
}

export async function deleteClientAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  if (id) {
    await deleteClient(id);
    revalidatePath('/cms/clients');
    revalidatePath('/');
  }
}

export async function setClientActiveAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const active = formData.get('active') === 'true';
  if (id) {
    await setClientActive(id, active);
    revalidatePath('/cms/clients');
    revalidatePath('/');
  }
}
