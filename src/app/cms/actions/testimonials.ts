'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/auth';
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonialById,
  setTestimonialStatus,
  updateTestimonial,
} from '@/lib/cms/testimonials';

function formString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' ? value : undefined;
}

export async function createTestimonialAction(formData: FormData) {
  await requireAdmin();
  const clientName = String(formData.get('clientName') || '').trim();
  const content = String(formData.get('content') || '').trim();
  if (!clientName || !content) return { error: 'Client name and content are required.' };
  await createTestimonial({
    clientName,
    clientDesignation: formString(formData, 'clientDesignation'),
    company: formString(formData, 'company'),
    content,
    avatar: formString(formData, 'avatar'),
    rating: formData.get('rating') ? parseInt(String(formData.get('rating')), 10) : undefined,
    featured: formData.get('featured') === 'on',
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    status: (String(formData.get('status') || 'DRAFT') as any),
  });
  revalidatePath('/cms/testimonials');
  revalidatePath('/');
  redirect('/cms/testimonials');
}

export async function updateTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const clientName = String(formData.get('clientName') || '').trim();
  const content = String(formData.get('content') || '').trim();
  if (!id || !clientName || !content) return { error: 'Client name, content and id are required.' };
  const existing = await getTestimonialById(id);
  if (!existing) return { error: 'Testimonial not found.' };
  await updateTestimonial({
    id, clientName,
    clientDesignation: formString(formData, 'clientDesignation'),
    company: formString(formData, 'company'),
    content,
    avatar: formString(formData, 'avatar'),
    rating: formData.get('rating') ? parseInt(String(formData.get('rating')), 10) : undefined,
    featured: formData.get('featured') === 'on',
    displayOrder: parseInt(String(formData.get('displayOrder') || '0'), 10) || 0,
    status: (String(formData.get('status') || 'DRAFT') as any),
  });
  revalidatePath('/cms/testimonials');
  revalidatePath('/');
  redirect('/cms/testimonials');
}

export async function deleteTestimonialAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  await deleteTestimonial(id);
  revalidatePath('/cms/testimonials');
  revalidatePath('/');
}

export async function setTestimonialStatusAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '');
  await setTestimonialStatus(id, status);
  revalidatePath('/cms/testimonials');
  revalidatePath('/');
}
