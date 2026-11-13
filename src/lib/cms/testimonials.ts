import { getCollection, generateId, serializeDoc, serializeDocs } from '@/lib/mongodb';

export interface CmsTestimonial {
  id: string;
  clientName: string;
  clientDesignation: string | null;
  company: string | null;
  content: string;
  avatar: string | null;
  rating: number | null;
  featured: boolean;
  displayOrder: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

export interface ListTestimonialsParams {
  search?: string;
  status?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ListTestimonialsResult {
  testimonials: CmsTestimonial[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listTestimonials(params: ListTestimonialsParams = {}): Promise<ListTestimonialsResult> {
  const { search, status, featured, page = 1, pageSize = 20 } = params;
  const skip = (page - 1) * pageSize;

  const filter: any = {};
  if (search) {
    const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    filter.$or = [
      { clientName: { $regex: searchRegex } },
      { company: { $regex: searchRegex } },
      { content: { $regex: searchRegex } },
    ];
  }
  if (status) filter.status = status;
  if (typeof featured === 'boolean') filter.featured = featured;

  const testimonialCol = await getCollection('testimonials');

  const [rawTestimonials, total] = await Promise.all([
    testimonialCol
      .find(filter)
      .sort({ displayOrder: 1, updatedAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .toArray(),
    testimonialCol.countDocuments(filter),
  ]);

  const testimonials = serializeDocs<CmsTestimonial>(rawTestimonials);

  return {
    testimonials,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}

export async function getTestimonialById(id: string): Promise<CmsTestimonial | null> {
  const testimonialCol = await getCollection('testimonials');
  const testimonial = await testimonialCol.findOne({ id });
  return testimonial ? serializeDoc<CmsTestimonial>(testimonial) : null;
}

export interface CreateTestimonialInput {
  clientName: string;
  clientDesignation?: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
  featured?: boolean;
  displayOrder?: number;
  status?: string;
}

export async function createTestimonial(data: CreateTestimonialInput): Promise<CmsTestimonial> {
  const testimonialCol = await getCollection('testimonials');
  const now = new Date();
  const id = generateId();

  const newTestimonial = {
    id,
    clientName: data.clientName,
    clientDesignation: data.clientDesignation ?? null,
    company: data.company ?? null,
    content: data.content,
    avatar: data.avatar ?? null,
    rating: data.rating ?? null,
    featured: data.featured ?? false,
    displayOrder: data.displayOrder ?? 0,
    status: data.status ?? 'DRAFT',
    createdAt: now,
    updatedAt: now,
  };

  await testimonialCol.insertOne(newTestimonial as any);
  return serializeDoc<CmsTestimonial>(newTestimonial);
}

export interface UpdateTestimonialInput extends Partial<CreateTestimonialInput> {
  id: string;
}

export async function updateTestimonial(data: UpdateTestimonialInput): Promise<CmsTestimonial | null> {
  const { id, ...rest } = data;
  const testimonialCol = await getCollection('testimonials');

  await testimonialCol.updateOne(
    { id },
    {
      $set: {
        ...rest,
        updatedAt: new Date(),
      },
    }
  );

  return getTestimonialById(id);
}

export async function deleteTestimonial(id: string) {
  const testimonialCol = await getCollection('testimonials');
  return testimonialCol.deleteOne({ id });
}

export async function setTestimonialStatus(id: string, status: string) {
  const testimonialCol = await getCollection('testimonials');
  await testimonialCol.updateOne({ id }, { $set: { status, updatedAt: new Date() } });
  return getTestimonialById(id);
}

export async function getPublishedTestimonials(): Promise<CmsTestimonial[]> {
  const testimonialCol = await getCollection('testimonials');
  const testimonials = await testimonialCol
    .find({ status: 'PUBLISHED' })
    .sort({ displayOrder: 1, updatedAt: -1 })
    .toArray();
  return serializeDocs<CmsTestimonial>(testimonials);
}
