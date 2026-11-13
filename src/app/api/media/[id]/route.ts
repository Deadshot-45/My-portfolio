import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { deleteMediaRecord, getMedia, deleteUploadFile } from '@/lib/media';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { user } = await getSession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const media = await getMedia(id);
  if (!media) {
    return NextResponse.json({ error: 'Media not found.' }, { status: 404 });
  }

  // Prevent deletion if the media is referenced by published content.
  const { isMediaReferenced } = await import('@/lib/media');
  if (await isMediaReferenced(media.url)) {
    return NextResponse.json(
      { error: 'Cannot delete media that is referenced by published content.' },
      { status: 409 },
    );
  }

  await deleteMediaRecord(id);
  await deleteUploadFile(media.filename);
  revalidatePath('/cms/media');
  return NextResponse.json({ ok: true });
}
