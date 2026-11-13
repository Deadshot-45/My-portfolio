import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';

export interface CmsClient {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  websiteUrl: string | null;
  description: string | null;
  displayOrder: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListClientsParams {
  search?: string;
  active?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ListClientsResult {
  clients: CmsClient[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listClients(params: ListClientsParams = {}): Promise<ListClientsResult> {
  const { search, active, page = 1, pageSize = 20 } = params;
  const skip = (page - 1) * pageSize;

  const filter: any = {};
  if (search) {
    const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ];
  }
  if (typeof active === 'boolean') filter.active = active;

  const clientCol = await getCollection('clients');

  const [rawClients, total] = await Promise.all([
    clientCol
      .find(filter)
      .sort({ displayOrder: 1, updatedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray(),
    clientCol.countDocuments(filter),
  ]);

  const clients = serializeDocs<CmsClient>(rawClients);

  return {
    clients,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export async function getClientById(id: string): Promise<CmsClient | null> {
  const clientCol = await getCollection('clients');
  const client = await clientCol.findOne({ id });
  return client ? serializeDoc<CmsClient>(client) : null;
}

export interface CreateClientInput {
  name: string;
  slug: string;
  logo?: string;
  websiteUrl?: string;
  description?: string;
  displayOrder?: number;
  active?: boolean;
}

export async function createClient(data: CreateClientInput): Promise<CmsClient> {
  const clientCol = await getCollection('clients');
  const now = new Date();
  const id = generateId();

  const newClient = {
    id,
    name: data.name,
    slug: data.slug,
    logo: data.logo ?? null,
    websiteUrl: data.websiteUrl ?? null,
    description: data.description ?? null,
    displayOrder: data.displayOrder ?? 0,
    active: data.active ?? true,
    createdAt: now,
    updatedAt: now,
  };

  await clientCol.insertOne(newClient as any);
  return serializeDoc<CmsClient>(newClient);
}

export interface UpdateClientInput extends Partial<CreateClientInput> {
  id: string;
}

export async function updateClient(data: UpdateClientInput): Promise<CmsClient | null> {
  const { id, ...rest } = data;
  const clientCol = await getCollection('clients');

  await clientCol.updateOne(
    { id },
    {
      $set: {
        ...rest,
        updatedAt: new Date(),
      },
    }
  );

  return getClientById(id);
}

export async function deleteClient(id: string) {
  const clientCol = await getCollection('clients');
  return clientCol.deleteOne({ id });
}

export async function setClientActive(id: string, active: boolean) {
  const clientCol = await getCollection('clients');
  await clientCol.updateOne({ id }, { $set: { active, updatedAt: new Date() } });
  return getClientById(id);
}

export async function slugExistsClient(slug: string, excludeId?: string) {
  const clientCol = await getCollection('clients');
  const filter: any = { slug };
  if (excludeId) {
    filter.id = { $ne: excludeId };
  }
  const existing = await clientCol.findOne(filter);
  return !!existing;
}

export async function getActiveClients(): Promise<CmsClient[]> {
  const clientCol = await getCollection('clients');
  const clients = await clientCol
    .find({ active: true })
    .sort({ displayOrder: 1, updatedAt: -1 })
    .toArray();
  return serializeDocs<CmsClient>(clients);
}
