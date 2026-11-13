import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/auth';
import { getServiceById } from '@/lib/cms/services';
import { ServiceForm } from '@/components/cms/ServiceForm';

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;
  const service = await getServiceById(id);
  if (!service) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Edit Service</h1>
      <p className="text-zinc-400 text-sm">Editing "{service.title}".</p>
      <ServiceForm mode="edit" service={service} />
    </div>
  );
}
