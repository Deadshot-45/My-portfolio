'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createProfile, getProfile, updateProfile } from '@/lib/cms/profile';

function formString(formData: FormData, name: string): string | undefined {
  const value = formData.get(name);
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const name = String(formData.get('name') || '').trim();
  if (!name) {
    throw new Error('Full name is required.');
  }

  const headline = formString(formData, 'headline');
  const introduction = formString(formData, 'introduction');
  const biography = formString(formData, 'biography');
  const profileImage = formString(formData, 'profileImage');
  const location = formString(formData, 'location');
  const availability = formString(formData, 'availability');
  const email = formString(formData, 'email');
  const resumeUrl = formString(formData, 'resumeUrl');

  // Handle social links
  const github = formString(formData, 'github');
  const linkedin = formString(formData, 'linkedin');
  const twitter = formString(formData, 'twitter');
  const socialLinksObj: Record<string, string> = {};
  if (github) socialLinksObj.github = github;
  if (linkedin) socialLinksObj.linkedin = linkedin;
  if (twitter) socialLinksObj.twitter = twitter;
  const socialLinks = Object.keys(socialLinksObj).length > 0 ? JSON.stringify(socialLinksObj) : undefined;

  const existingProfile = await getProfile();

  if (existingProfile) {
    await updateProfile({
      id: existingProfile.id,
      name,
      headline,
      introduction,
      biography,
      profileImage,
      location,
      availability,
      email,
      socialLinks,
      resumeUrl,
    });
  } else {
    await createProfile({
      name,
      headline,
      introduction,
      biography,
      profileImage,
      location,
      availability,
      email,
      socialLinks,
      resumeUrl,
    });
  }

  revalidatePath('/cms/about');
  revalidatePath('/');
}
