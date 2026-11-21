import { requireSession } from '@/lib/auth';
import { ProjectForm } from '@/components/cms/ProjectForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CreateProjectPage() {
  const { user } = await requireSession();
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
        <h1 className="text-2xl font-bold text-zinc-100">Add Project</h1>
        <p className="text-zinc-400 text-sm">Create a new portfolio project. Slug is generated from the title.</p>
      </div>
      <ProjectForm mode="create" />
    </div>
  );
}
