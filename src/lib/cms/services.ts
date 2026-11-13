import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';

export interface CmsService {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  icon: string | null;
  features: string | null;
  displayOrder: number;
  active: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListServicesParams {
  search?: string;
  active?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ListServicesResult {
  services: CmsService[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listServices(params: ListServicesParams = {}): Promise<ListServicesResult> {
  const { search, active, page = 1, pageSize = 20 } = params;
  const skip = (page - 1) * pageSize;

  const filter: any = {};
  if (search) {
    const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { title: { $regex: searchRegex } },
      { shortDescription: { $regex: searchRegex } },
    ];
  }
  if (typeof active === 'boolean') filter.active = active;

  const serviceCol = await getCollection('services');

  const [rawServices, total] = await Promise.all([
    serviceCol
      .find(filter)
      .sort({ displayOrder: 1, updatedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray(),
    serviceCol.countDocuments(filter),
  ]);

  const services = serializeDocs<CmsService>(rawServices);

  return {
    services,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export async function getServiceById(id: string): Promise<CmsService | null> {
  const serviceCol = await getCollection('services');
  const service = await serviceCol.findOne({ id });
  return service ? serializeDoc<CmsService>(service) : null;
}

export async function getServiceBySlug(slug: string): Promise<CmsService | null> {
  const serviceCol = await getCollection('services');
  const service = await serviceCol.findOne({ slug });
  return service ? serializeDoc<CmsService>(service) : null;
}

export interface CreateServiceInput {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  icon?: string;
  features?: string;
  displayOrder?: number;
  active?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export async function createService(data: CreateServiceInput): Promise<CmsService> {
  const serviceCol = await getCollection('services');
  const now = new Date();
  const id = generateId();

  const newService = {
    id,
    title: data.title,
    slug: data.slug,
    shortDescription: data.shortDescription ?? null,
    description: data.description ?? null,
    icon: data.icon ?? null,
    features: data.features ?? null,
    displayOrder: data.displayOrder ?? 0,
    active: data.active ?? true,
    seoTitle: data.seoTitle ?? null,
    seoDescription: data.seoDescription ?? null,
    createdAt: now,
    updatedAt: now,
  };

  await serviceCol.insertOne(newService as any);
  return serializeDoc<CmsService>(newService);
}

export interface UpdateServiceInput extends Partial<CreateServiceInput> {
  id: string;
}

export async function updateService(data: UpdateServiceInput): Promise<CmsService | null> {
  const { id, ...rest } = data;
  const serviceCol = await getCollection('services');

  await serviceCol.updateOne(
    { id },
    {
      $set: {
        ...rest,
        updatedAt: new Date(),
      },
    }
  );

  return getServiceById(id);
}

export async function deleteService(id: string) {
  const serviceCol = await getCollection('services');
  return serviceCol.deleteOne({ id });
}

export async function setServiceActive(id: string, active: boolean) {
  const serviceCol = await getCollection('services');
  await serviceCol.updateOne({ id }, { $set: { active, updatedAt: new Date() } });
  return getServiceById(id);
}

export async function slugExistsService(slug: string, excludeId?: string) {
  const serviceCol = await getCollection('services');
  const filter: any = { slug };
  if (excludeId) {
    filter.id = { $ne: excludeId };
  }
  const existing = await serviceCol.findOne(filter);
  return !!existing;
}

export async function getActiveServices(): Promise<CmsService[]> {
  const serviceCol = await getCollection('services');
  const services = await serviceCol
    .find({ active: true })
    .sort({ displayOrder: 1, updatedAt: -1 })
    .toArray();
  return serializeDocs<CmsService>(services);
}
