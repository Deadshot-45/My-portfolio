import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/auth';
import { getServiceById } from '@/lib/cms/services';
import { ServiceForm } from '@/components/cms/ServiceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
    <div className="space-y-4 max-w-4xl">
      <div>
        <Link
          href="/cms/services"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors group mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Services</span>
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">Edit Service</h1>
        <p className="text-zinc-400 text-sm">Editing &ldquo;{service.title}&rdquo;.</p>
      </div>
      <ServiceForm mode="edit" service={service} />
    </div>
  );
}
