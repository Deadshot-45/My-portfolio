import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';

export interface CmsSkill {
  id: string;
  name: string;
  category: string | null;
  icon: string | null;
  level: string | null;
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListSkillsParams {
  search?: string;
  category?: string;
  active?: boolean;
}

export async function listSkills(params: ListSkillsParams = {}): Promise<CmsSkill[]> {
  const { search, category, active } = params;
  const filter: any = {};
  if (search) {
    const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.name = { $regex: searchRegex };
  }
  if (category) filter.category = category;
  if (typeof active === 'boolean') filter.active = active;

  const skillCol = await getCollection('skills');
  const skills = await skillCol
    .find(filter)
    .sort({ displayOrder: 1, name: 1 })
    .toArray();

  return serializeDocs<CmsSkill>(skills);
}

export async function getSkillById(id: string): Promise<CmsSkill | null> {
  const skillCol = await getCollection('skills');
  const skill = await skillCol.findOne({ id });
  return skill ? serializeDoc<CmsSkill>(skill) : null;
}

export interface CreateSkillInput {
  name: string;
  category?: string;
  icon?: string;
  level?: string;
  displayOrder?: number;
  active?: boolean;
}

export async function createSkill(data: CreateSkillInput): Promise<CmsSkill> {
  const skillCol = await getCollection('skills');
  const now = new Date();
  const id = generateId();

  const newSkill = {
    id,
    name: data.name,
    category: data.category ?? null,
    icon: data.icon ?? null,
    level: data.level ?? null,
    displayOrder: data.displayOrder ?? 0,
    active: data.active ?? true,
    createdAt: now,
    updatedAt: now,
  };

  await skillCol.insertOne(newSkill as any);
  return serializeDoc<CmsSkill>(newSkill);
}

export interface UpdateSkillInput extends Partial<CreateSkillInput> {
  id: string;
}

export async function updateSkill(data: UpdateSkillInput): Promise<CmsSkill | null> {
  const { id, ...rest } = data;
  const skillCol = await getCollection('skills');

  await skillCol.updateOne(
    { id },
    {
      $set: {
        ...rest,
        updatedAt: new Date(),
      },
    }
  );

  return getSkillById(id);
}

export async function deleteSkill(id: string) {
  const skillCol = await getCollection('skills');
  return skillCol.deleteOne({ id });
}

export async function setSkillActive(id: string, active: boolean) {
  const skillCol = await getCollection('skills');
  await skillCol.updateOne({ id }, { $set: { active, updatedAt: new Date() } });
  return getSkillById(id);
}

export async function getActiveSkills(): Promise<CmsSkill[]> {
  const skillCol = await getCollection('skills');
  const skills = await skillCol
    .find({ active: true })
    .sort({ displayOrder: 1, name: 1 })
    .toArray();
  return serializeDocs<CmsSkill>(skills);
}
