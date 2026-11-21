import { requireSession } from '@/lib/auth';
import { ServiceForm } from '@/components/cms/ServiceForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CreateServicePage() {
  await requireSession();
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
        <h1 className="text-2xl font-bold text-zinc-100">Add Service</h1>
        <p className="text-zinc-400 text-sm">Register a new service offering.</p>
      </div>
      <ServiceForm mode="create" />
    </div>
  );
}
