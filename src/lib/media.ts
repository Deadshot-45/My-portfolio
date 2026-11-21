import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';
import { hasImagekitConfig, uploadPortfolioMedia, deletePortfolioMedia } from '@/lib/imagekit';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB (supports PDFs and images)
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'application/pdf',
];

export interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  fileId?: string | null;
  mimeType: string | null;
  size: number | null;
  width: number | null;
  height: number | null;
  altText: string | null;
  uploadedBy: string | null;
  createdAt: Date;
}

/** Ensure the uploads directory exists. */
export async function ensureUploadDir(): Promise<void> {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch {
    // directory likely already exists
  }
}

/** Validate an uploaded File before storing it. */
export function validateUpload(file: File): { ok: true } | { ok: false; error: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { ok: false, error: 'Unsupported file type. Allowed: JPEG, PNG, WebP, GIF, AVIF, PDF.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB.` };
  }
  return { ok: true };
}

/** Generate a safe, unique filename. */
export function safeFilename(originalName: string): string {
  const sanitized = originalName
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[.-]+|[.-]+$/g, '');
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  const parts = sanitized.split('.');
  const ext = parts.length > 1 ? `.${parts.pop()}` : '';
  const base = parts.join('.') || 'file';
  return `${ts}-${rand}-${base}${ext}`;
}

export async function listMedia(): Promise<MediaItem[]> {
  await ensureUploadDir();
  const mediaCol = await getCollection<MediaItem>('media');
  const items = await mediaCol.find({}).sort({ createdAt: -1 }).toArray();
  return serializeDocs<MediaItem>(items);
}

export async function createMedia(data: {
  filename: string;
  originalName: string;
  url: string;
  fileId?: string | null;
  mimeType?: string;
  size?: number;
  width?: number;
  height?: number;
  altText?: string;
  uploadedBy?: string;
}) {
  const mediaCol = await getCollection<MediaItem>('media');
  const newMedia: MediaItem = {
    id: generateId(),
    filename: data.filename,
    originalName: data.originalName,
    url: data.url,
    fileId: data.fileId ?? null,
    mimeType: data.mimeType ?? null,
    size: data.size ?? null,
    width: data.width ?? null,
    height: data.height ?? null,
    altText: data.altText ?? null,
    uploadedBy: data.uploadedBy ?? null,
    createdAt: new Date(),
  };
  await mediaCol.insertOne(newMedia as any);
  return newMedia;
}

export async function getMedia(id: string) {
  const mediaCol = await getCollection<MediaItem>('media');
  const media = await mediaCol.findOne({ id });
  return media ? serializeDoc<MediaItem>(media) : null;
}

export async function deleteMediaRecord(id: string) {
  const mediaCol = await getCollection<MediaItem>('media');
  return mediaCol.deleteOne({ id });
}

export async function deleteUploadFile(filename: string): Promise<void> {
  try {
    await fs.unlink(join(UPLOAD_DIR, filename));
  } catch {
    // file may already be missing
  }
}

/**
 * Check whether a media URL is referenced by any published content.
 * Used to prevent deleting media still in use.
 */
export async function isMediaReferenced(url: string): Promise<boolean> {
  const projectCol = await getCollection('projects');
  const testimonialCol = await getCollection('testimonials');
  const clientCol = await getCollection('clients');
  const profileCol = await getCollection('profiles');
  const settingCol = await getCollection('site_settings');

  const [project, testimonial, client, profile, setting] = await Promise.all([
    projectCol.findOne({
      $or: [{ coverImage: url }, { 'images.url': url }],
    }),
    testimonialCol.findOne({ avatar: url }),
    clientCol.findOne({ logo: url }),
    profileCol.findOne({ profileImage: url }),
    settingCol.findOne({ value: url }),
  ]);

  return Boolean(project || testimonial || client || profile || setting);
}
