'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { getMedia, deleteMediaRecord, deleteUploadFile, isMediaReferenced } from '@/lib/media';
import { hasImagekitConfig, deletePortfolioMedia } from '@/lib/imagekit';

export async function deleteMediaAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get('id') || '');
  const media = await getMedia(id);
  if (!media) return;
  if (await isMediaReferenced(media.url)) return;
  await deleteMediaRecord(id);
  if (media.fileId && hasImagekitConfig()) {
    try {
      await deletePortfolioMedia(media.fileId);
    } catch {
      // safe fallback
    }
  } else {
    await deleteUploadFile(media.filename);
  }
  revalidatePath('/cms/media');
}
