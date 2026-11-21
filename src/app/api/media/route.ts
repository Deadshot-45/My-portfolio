import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { ensureUploadDir, safeFilename, validateUpload, createMedia } from '@/lib/media';
import { hasImagekitConfig, uploadPortfolioMedia } from '@/lib/imagekit';
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

  let mediaUrl = `/uploads/${filename}`;
  let fileId: string | null = null;
  let imgWidth: number | undefined;
  let imgHeight: number | undefined;

  // Use ImageKit cloud CDN when configured, otherwise fall back to local disk
  if (hasImagekitConfig()) {
    try {
      const ikResult = await uploadPortfolioMedia({
        buffer,
        originalname: file.name,
        mimetype: file.type,
      });
      mediaUrl = ikResult.url;
      fileId = ikResult.fileId;
      imgWidth = ikResult.width;
      imgHeight = ikResult.height;
    } catch (err) {
      console.error('[ImageKit Upload Error] Falling back to local storage:', err);
      await ensureUploadDir();
      await fs.writeFile(join(UPLOAD_DIR, filename), buffer);
    }
  } else {
    await ensureUploadDir();
    await fs.writeFile(join(UPLOAD_DIR, filename), buffer);
  }

  const media = await createMedia({
    filename,
    originalName: file.name,
    url: mediaUrl,
    fileId,
    mimeType: file.type,
    size: file.size,
    width: imgWidth,
    height: imgHeight,
    uploadedBy: user.id,
  });

  revalidatePath('/cms/media');
  return NextResponse.json({ media });
}
