'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { deleteSiteSetting, setSiteSetting } from '@/lib/cms/settings';

export async function updateGeneralSettingsAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const entries: [string, string][] = [
    ['site_title', String(formData.get('site_title') || '').trim()],
    ['availability_status', String(formData.get('availability_status') || '').trim()],
    ['contact_email', String(formData.get('contact_email') || '').trim()],
    ['phone_number', String(formData.get('phone_number') || '').trim()],
    ['location', String(formData.get('location') || '').trim()],
    ['github_url', String(formData.get('github_url') || '').trim()],
    ['linkedin_url', String(formData.get('linkedin_url') || '').trim()],
    ['twitter_url', String(formData.get('twitter_url') || '').trim()],
    ['footer_tagline', String(formData.get('footer_tagline') || '').trim()],
  ];

  for (const [key, value] of entries) {
    if (value !== undefined) {
      await setSiteSetting(key, value);
    }
  }

  revalidatePath('/cms/settings');
  revalidatePath('/');
}

export async function updateSeoSettingsAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const entries: [string, string][] = [
    ['seo:meta_title', String(formData.get('seo:meta_title') || '').trim()],
    ['seo:meta_description', String(formData.get('seo:meta_description') || '').trim()],
    ['seo:keywords', String(formData.get('seo:keywords') || '').trim()],
    ['seo:og_image', String(formData.get('seo:og_image') || '').trim()],
    ['seo:canonical_url', String(formData.get('seo:canonical_url') || '').trim()],
    ['seo:twitter_card', String(formData.get('seo:twitter_card') || 'summary_large_image').trim()],
    ['seo:robots', String(formData.get('seo:robots') || 'index, follow').trim()],
  ];

  for (const [key, value] of entries) {
    if (value !== undefined) {
      await setSiteSetting(key, value);
    }
  }

  revalidatePath('/cms/seo');
  revalidatePath('/');
}

export async function deleteSettingAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const key = String(formData.get('key') || '');
  if (key) {
    await deleteSiteSetting(key);
    revalidatePath('/cms/settings');
    revalidatePath('/cms/seo');
    revalidatePath('/');
  }
}
