import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';

export interface CmsExperience {
  id: string;
  title: string;
  company: string;
  employmentType: string | null;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  description: string | null;
  technologies: string | null;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListExperienceParams {
  search?: string;
  current?: boolean;
}

export async function listExperience(params: ListExperienceParams = {}): Promise<CmsExperience[]> {
  const { search, current } = params;
  const filter: any = {};
  if (search) {
    const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { title: { $regex: searchRegex } },
      { company: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ];
  }
  if (typeof current === 'boolean') filter.current = current;

  const experienceCol = await getCollection('experiences');
  const items = await experienceCol
    .find(filter)
    .sort({ displayOrder: 1, startDate: -1 })
    .toArray();

  return serializeDocs<CmsExperience>(items);
}

export async function getExperienceById(id: string): Promise<CmsExperience | null> {
  const experienceCol = await getCollection('experiences');
  const exp = await experienceCol.findOne({ id });
  return exp ? serializeDoc<CmsExperience>(exp) : null;
}

export interface CreateExperienceInput {
  title: string;
  company: string;
  employmentType?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  current?: boolean;
  description?: string;
  technologies?: string;
  displayOrder?: number;
}

export async function createExperience(data: CreateExperienceInput): Promise<CmsExperience> {
  const experienceCol = await getCollection('experiences');
  const now = new Date();
  const id = generateId();

  const newExp = {
    id,
    title: data.title,
    company: data.company,
    employmentType: data.employmentType ?? null,
    startDate: data.startDate ? new Date(data.startDate) : null,
    endDate: data.endDate ? new Date(data.endDate) : null,
    current: data.current ?? false,
    description: data.description ?? null,
    technologies: data.technologies ?? null,
    displayOrder: data.displayOrder ?? 0,
    createdAt: now,
    updatedAt: now,
  };

  await experienceCol.insertOne(newExp as any);
  return serializeDoc<CmsExperience>(newExp);
}

export interface UpdateExperienceInput extends Partial<CreateExperienceInput> {
  id: string;
}

export async function updateExperience(data: UpdateExperienceInput): Promise<CmsExperience | null> {
  const { id, ...rest } = data;
  const experienceCol = await getCollection('experiences');

  const updateFields: any = { ...rest, updatedAt: new Date() };
  if (rest.startDate !== undefined) {
    updateFields.startDate = rest.startDate ? new Date(rest.startDate) : null;
  }
  if (rest.endDate !== undefined) {
    updateFields.endDate = rest.endDate ? new Date(rest.endDate) : null;
  }

  await experienceCol.updateOne({ id }, { $set: updateFields });
  return getExperienceById(id);
}

export async function deleteExperience(id: string) {
  const experienceCol = await getCollection('experiences');
  return experienceCol.deleteOne({ id });
}

export async function getCurrentExperience(): Promise<CmsExperience[]> {
  const experienceCol = await getCollection('experiences');
  const items = await experienceCol
    .find({ current: true })
    .sort({ startDate: -1 })
    .toArray();
  return serializeDocs<CmsExperience>(items);
}
