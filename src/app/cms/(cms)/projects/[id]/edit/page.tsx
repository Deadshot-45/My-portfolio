import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/auth';
import { getProjectById } from '@/lib/cms/projects';
import { ProjectForm } from '@/components/cms/ProjectForm';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-zinc-100">Edit Project</h1>
      <p className="text-zinc-400 text-sm">Editing "{project.title}". Changes are saved to the database.</p>
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
