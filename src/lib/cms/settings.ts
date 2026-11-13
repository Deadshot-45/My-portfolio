import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';

export interface CmsSiteSetting {
  id: string;
  key: string;
  value: string | null;
}

export async function listSiteSettings(): Promise<CmsSiteSetting[]> {
  const settingCol = await getCollection('site_settings');
  const items = await settingCol.find({}).sort({ key: 1 }).toArray();
  return serializeDocs<CmsSiteSetting>(items);
}

export async function getSiteSetting(key: string): Promise<CmsSiteSetting | null> {
  const settingCol = await getCollection('site_settings');
  const item = await settingCol.findOne({ key });
  return item ? serializeDoc<CmsSiteSetting>(item) : null;
}

export async function setSiteSetting(key: string, value: string): Promise<CmsSiteSetting> {
  const settingCol = await getCollection('site_settings');
  const now = new Date();

  await settingCol.updateOne(
    { key },
    {
      $set: { value, updatedAt: now },
      $setOnInsert: { id: generateId(), createdAt: now },
    },
    { upsert: true }
  );

  const updated = await settingCol.findOne({ key });
  return serializeDoc<CmsSiteSetting>(updated!);
}

export async function deleteSiteSetting(key: string) {
  const settingCol = await getCollection('site_settings');
  return settingCol.deleteOne({ key });
}

export async function getSeoSettings(): Promise<CmsSiteSetting[]> {
  const settingCol = await getCollection('site_settings');
  const items = await settingCol.find({ key: { $regex: /^seo:/ } }).toArray();
  return serializeDocs<CmsSiteSetting>(items);
}
