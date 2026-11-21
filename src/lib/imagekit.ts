import ImageKit, { toFile } from '@imagekit/nodejs';
import { createHmac } from 'node:crypto';

// Initialize ImageKit instance with environment credentials
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || '';
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || '';
const urlEndpoint = process.env.IMGKIT
  ? `https://ik.imagekit.io/${process.env.IMGKIT}`
  : (process.env.IMAGEKIT_URL_ENDPOINT || '');

let imagekitInstance: ImageKit | null = null;

function getImageKitClient(): ImageKit | null {
  if (!privateKey) return null;
  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      privateKey,
    });
  }
  return imagekitInstance;
}

/** Check whether ImageKit credentials are configured in the environment. */
export function hasImagekitConfig(): boolean {
  return Boolean(process.env.IMAGEKIT_PRIVATE_KEY);
}

/** Generate a clean, unique file name for ImageKit storage. */
export function createFileName(orgName = 'upload'): string {
  const safeName = orgName.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '-');
  return `portfolio-${Date.now()}/${safeName}`;
}

export interface UploadResult {
  fileId: string;
  name: string;
  url: string;
  size?: number;
  width?: number;
  height?: number;
  mimeType?: string;
}

/**
 * Upload an image buffer to ImageKit under the portfolio_media folder.
 */
export async function uploadPortfolioMedia(params: {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  folder?: string;
}): Promise<UploadResult> {
  const ik = getImageKitClient();
  if (!ik) {
    throw new Error('ImageKit is not configured. Missing IMAGEKIT_PRIVATE_KEY.');
  }

  const fileName = createFileName(params.originalname);
  const file = await toFile(params.buffer, fileName, { type: params.mimetype });

  const response = await ik.files.upload({
    file,
    fileName,
    folder: params.folder || 'portfolio_media',
  });

  return {
    fileId: response.fileId || '',
    name: response.name || fileName,
    url: response.url || '',
    size: response.size,
    width: response.width,
    height: response.height,
    mimeType: params.mimetype,
  };
}

/**
 * Delete a file from ImageKit by its fileId.
 */
export async function deletePortfolioMedia(fileId: string): Promise<void> {
  const ik = getImageKitClient();
  if (!ik || !fileId) return;
  await ik.files.delete(fileId);
}

/**
 * Generates a short-lived auth signature for direct client-side ImageKit uploads.
 * Spec: https://imagekit.io/docs/upload-file#uploading-file-via-api
 */
export function getAuthParams() {
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const expire = Math.floor(Date.now() / 1000) + 300;
  const signature = createHmac('sha1', privateKey)
    .update(token + expire)
    .digest('hex');

  return {
    token,
    expire,
    signature,
    publicKey,
    urlEndpoint,
  };
}
