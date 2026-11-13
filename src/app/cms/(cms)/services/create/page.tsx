import { requireSession } from '@/lib/auth';
import { ServiceForm } from '@/components/cms/ServiceForm';

export default async function CreateServicePage() {
  const { user } = await requireSession();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Add Service</h1>
      <p className="text-zinc-400 text-sm">Register a new service offering.</p>
      <ServiceForm mode="create" />
    </div>
  );
}
