import { notFound } from 'next/navigation';
import { requireSession } from '@/lib/auth';
import { getProjectById } from '@/lib/cms/projects';
import { ProjectForm } from '@/components/cms/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
    <div className="space-y-4 max-w-5xl">
      <div>
        <Link
          href="/cms/projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-emerald-400 transition-colors group mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Projects</span>
        </Link>
        <h1 className="text-2xl font-bold text-zinc-100">Edit Project</h1>
        <p className="text-zinc-400 text-sm">Editing &ldquo;{project.title}&rdquo;. Changes are saved to the database.</p>
      </div>
      <ProjectForm mode="edit" project={project} />
    </div>
  );
}
