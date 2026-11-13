import { getCollection, generateId, serializeDoc } from '@/lib/mongodb';

export interface CmsProfile {
  id: string;
  name: string;
  headline: string | null;
  introduction: string | null;
  biography: string | null;
  profileImage: string | null;
  location: string | null;
  availability: string | null;
  email: string | null;
  socialLinks: string | null;
  resumeUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getProfile(): Promise<CmsProfile | null> {
  const profileCol = await getCollection('profiles');
  const profile = await profileCol.findOne({}, { sort: { updatedAt: -1 } });
  return profile ? serializeDoc<CmsProfile>(profile) : null;
}

export interface UpdateProfileInput {
  id: string;
  name?: string;
  headline?: string;
  introduction?: string;
  biography?: string;
  profileImage?: string;
  location?: string;
  availability?: string;
  email?: string;
  socialLinks?: string;
  resumeUrl?: string;
}

export async function updateProfile(data: UpdateProfileInput): Promise<CmsProfile | null> {
  const { id, ...rest } = data;
  const profileCol = await getCollection('profiles');

  await profileCol.updateOne(
    { id },
    {
      $set: {
        ...rest,
        updatedAt: new Date(),
      },
    }
  );

  const updated = await profileCol.findOne({ id });
  return updated ? serializeDoc<CmsProfile>(updated) : null;
}

export async function createProfile(data: {
  name: string;
  headline?: string;
  introduction?: string;
  biography?: string;
  profileImage?: string;
  location?: string;
  availability?: string;
  email?: string;
  socialLinks?: string;
  resumeUrl?: string;
}): Promise<CmsProfile> {
  const profileCol = await getCollection('profiles');
  const now = new Date();
  const id = generateId();

  const newProfile = {
    id,
    name: data.name,
    headline: data.headline ?? null,
    introduction: data.introduction ?? null,
    biography: data.biography ?? null,
    profileImage: data.profileImage ?? null,
    location: data.location ?? null,
    availability: data.availability ?? null,
    email: data.email ?? null,
    socialLinks: data.socialLinks ?? null,
    resumeUrl: data.resumeUrl ?? null,
    createdAt: now,
    updatedAt: now,
  };

  await profileCol.insertOne(newProfile as any);
  return serializeDoc<CmsProfile>(newProfile);
}
