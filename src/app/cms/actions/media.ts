'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getMedia, deleteMediaRecord, deleteUploadFile, isMediaReferenced } from '@/lib/media';

export async function deleteMediaAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const media = await getMedia(id);
  if (!media) return;
  if (await isMediaReferenced(media.url)) return;
  await deleteMediaRecord(id);
  await deleteUploadFile(media.filename);
  revalidatePath('/cms/media');
}
