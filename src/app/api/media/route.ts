import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { ensureUploadDir, safeFilename, validateUpload, createMedia } from '@/lib/media';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { revalidatePath } from 'next/cache';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function GET() {
  const { user } = await getSession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  await ensureUploadDir();
  const { listMedia } = await import('@/lib/media');
  const media = await listMedia();
  return NextResponse.json({ media });
}

export async function POST(request: Request) {
  const { user } = await getSession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await ensureUploadDir();
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const validation = validateUpload(file);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const filename = safeFilename(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(join(UPLOAD_DIR, filename), buffer);

  const media = await createMedia({
    filename,
    originalName: file.name,
    url: `/uploads/${filename}`,
    mimeType: file.type,
    size: file.size,
    uploadedBy: user.id,
  });

  revalidatePath('/cms/media');
  return NextResponse.json({ media });
}
