'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import {
  createExperience,
  deleteExperience,
  getExperienceById,
  updateExperience,
} from '@/lib/cms/experience';

function formString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

export async function createExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const title = String(formData.get('title') || '').trim();
  const company = String(formData.get('company') || '').trim();

  if (!title || !company) {
    throw new Error('Job title and company name are required.');
  }

  const startDateStr = formString(formData, 'startDate');
  const endDateStr = formString(formData, 'endDate');
  const current = formData.get('current') === 'on' || formData.get('current') === 'true';

  await createExperience({
    title,
    company,
    employmentType: formString(formData, 'employmentType') || 'Full-time',
    startDate: startDateStr ? new Date(startDateStr) : undefined,
    endDate: current ? undefined : (endDateStr ? new Date(endDateStr) : undefined),
    current,
    description: formString(formData, 'description'),
    technologies: formString(formData, 'technologies'),
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
  });

  revalidatePath('/cms/experience');
  revalidatePath('/');
  redirect('/cms/experience');
}

export async function updateExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const title = String(formData.get('title') || '').trim();
  const company = String(formData.get('company') || '').trim();

  if (!id || !title || !company) {
    throw new Error('ID, job title, and company are required.');
  }

  const existing = await getExperienceById(id);
  if (!existing) {
    throw new Error('Experience record not found.');
  }

  const startDateStr = formString(formData, 'startDate');
  const endDateStr = formString(formData, 'endDate');
  const current = formData.get('current') === 'on' || formData.get('current') === 'true';

  await updateExperience({
    id,
    title,
    company,
    employmentType: formString(formData, 'employmentType') || 'Full-time',
    startDate: startDateStr ? new Date(startDateStr) : undefined,
    endDate: current ? undefined : (endDateStr ? new Date(endDateStr) : undefined),
    current,
    description: formString(formData, 'description'),
    technologies: formString(formData, 'technologies'),
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
  });

  revalidatePath('/cms/experience');
  revalidatePath('/');
  redirect('/cms/experience');
}

export async function deleteExperienceAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  if (id) {
    await deleteExperience(id);
    revalidatePath('/cms/experience');
    revalidatePath('/');
  }
}
