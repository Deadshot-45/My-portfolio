import { requireSession } from '@/lib/auth';
import { ProjectForm } from '@/components/cms/ProjectForm';

export default async function CreateProjectPage() {
  const { user } = await requireSession();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Add Project</h1>
      <p className="text-zinc-400 text-sm">Create a new portfolio project. Slug is generated from the title.</p>
      <ProjectForm mode="create" />
    </div>
  );
}
