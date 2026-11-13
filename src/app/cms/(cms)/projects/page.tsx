import { listProjects } from '@/lib/cms/projects';
import { requireSession } from '@/lib/auth';
import { setProjectStatusAction, deleteProjectAction } from '@/app/cms/actions/projects';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user } = await requireSession();
  const sp = await searchParams;
  const search = String(sp.search || '');
  const status = String(sp.status || '');
  const page = Math.max(parseInt(String(sp.page || '1'), 10), 1);

  const { projects, total, pageSize, totalPages } = await listProjects({
    search: search || undefined,
    status: (status || undefined) as any,
    page,
  });

  const statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Projects</h1>
          <p className="text-zinc-400 text-sm">Manage portfolio projects. Drafts are not visible publicly.</p>
        </div>
        <a
          href="/cms/projects/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(155,243,90,0.25)]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
          Add Project
        </a>
      </div>
      <form method="get" className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="col-span-3 relative">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search title, client or slug..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" aria-hidden="true" /></svg>
        </div>
        <select
          name="status"
          defaultValue={status || 'all'}
          className="pl-3 pr-9 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900/80 hover:text-zinc-100 transition-colors">
          Filter
        </button>
      </form>

      {total === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No projects found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-900/50 bg-zinc-900/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Project</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Client</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Category</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Order</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-zinc-200">{p.title}</div>
                    <div className="text-xs text-zinc-500 truncate max-w-xs">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{p.clientName || '—'}</td>
                  <td className="px-4 py-3 text-sm text-zinc-300">{p.category || '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.status === 'PUBLISHED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : p.status === 'DRAFT'
                          ? 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-zinc-300 font-mono">{p.displayOrder}</td>
                  <td className="px-4 py-3 text-right">
                    <ProjectRowActions project={p} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between text-xs text-zinc-500">
              <p>Page {page} of {totalPages} &bull; {total} total</p>
              <div className="flex gap-1">
                {page > 1 && (
                  <a href={`?search=${encodeURIComponent(search)}&status=${status}&page=${page - 1}`} className="px-3 py-1 rounded hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200">
                    Prev
                  </a>
                )}
                {page < totalPages && (
                  <a href={`?search=${encodeURIComponent(search)}&status=${status}&page=${page + 1}`} className="px-3 py-1 rounded hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200">
                    Next
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProjectRowActions({ project }: { project: any }) {
  const isPublished = project.status === 'PUBLISHED';
  return (
    <div className="flex gap-2">
      <a
        href={`/cms/projects/${project.id}/edit`}
        className="p-2 text-zinc-400 hover:text-emerald-400 transition-colors"
        title="Edit"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" aria-hidden="true" /></svg>
      </a>
      <form action={setProjectStatusAction} method="POST" className="inline">
        <input name="id" value={project.id} hidden />
        <input name="status" value={isPublished ? 'DRAFT' : 'PUBLISHED'} hidden />
        <button type="submit" className="p-2 rounded-md text-zinc-400 hover:bg-zinc-800 transition-colors" title={isPublished ? 'Unpublish' : 'Publish'}>
          {isPublished ? '↓' : '↑'}
        </button>
      </form>
      <form action={deleteProjectAction} method="POST" className="inline" onSubmit={(e) => {
        if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) e.preventDefault();
      }}>
        <input name="id" value={project.id} hidden />
        <button type="submit" className="p-2 rounded-md text-zinc-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors" title="Delete">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" aria-hidden="true" /></svg>
        </button>
      </form>
    </div>
  );
}

