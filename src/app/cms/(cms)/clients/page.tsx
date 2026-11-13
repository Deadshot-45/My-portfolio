import { listClients } from '@/lib/cms/clients';
import { requireSession } from '@/lib/auth';
import {
  createClientAction,
  deleteClientAction,
  setClientActiveAction,
} from '@/app/cms/actions/clients';
import { DeleteButton } from '@/components/cms/DeleteButton';

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireSession();
  const sp = await searchParams;
  const search = String(sp.search || '');
  const active = String(sp.active || '');
  const page = Math.max(parseInt(String(sp.page || '1'), 10), 1);

  const { clients, total, totalPages } = await listClients({
    search: search || undefined,
    active: active === 'true' ? true : active === 'false' ? false : undefined,
    page,
    pageSize: 15,
  });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Clients & Brand Marks</h1>
          <p className="text-zinc-400 text-sm">
            Manage partner logos, brand marks, studio clients, and trust ticker items.
          </p>
        </div>
      </div>

      {/* Add New Client Section */}
      <details className="group rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
        <summary className="px-6 py-4 cursor-pointer font-semibold text-sm text-emerald-400 hover:text-emerald-300 flex items-center justify-between select-none bg-zinc-900/20 group-open:border-b group-open:border-zinc-800">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Client
          </span>
          <span className="text-xs text-zinc-500 font-normal">Click to expand form</span>
        </summary>
        <form action={createClientAction} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Client / Brand Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Lijoi or Marianna Caliandro"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Slug (URL identifier)
              </label>
              <input
                type="text"
                name="slug"
                placeholder="e.g. lijoi"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Location / Tagline
              </label>
              <input
                type="text"
                name="description"
                placeholder="e.g. Rome, Italy or Streetwear Brand"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Website URL
              </label>
              <input
                type="url"
                name="websiteUrl"
                placeholder="https://clientwebsite.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="displayOrder"
                defaultValue="0"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 h-11">
              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  defaultChecked
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 h-4 w-4 bg-[#09090b]"
                />
                Active
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
            >
              Add Client
            </button>
          </div>
        </form>
      </details>

      {/* Filter Bar */}
      <form
        method="get"
        className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-4 grid grid-cols-1 sm:grid-cols-4 gap-3"
      >
        <div className="col-span-2">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by client name or description..."
            className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
          />
        </div>
        <select
          name="active"
          defaultValue={active || 'all'}
          className="px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
        >
          <option value="all">All</option>
          <option value="true">Active Only</option>
          <option value="false">Inactive Only</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900/80 transition-colors text-sm font-medium"
        >
          Filter
        </button>
      </form>

      {/* Clients Table */}
      {clients.length === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No clients found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-900/50 bg-zinc-900/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Client / Brand</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Website</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Order</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-zinc-200">{c.name}</div>
                    <div className="text-xs text-zinc-400">{c.description || '—'}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400 font-mono">
                    {c.slug}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400">
                    {c.websiteUrl ? (
                      <a
                        href={c.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline truncate max-w-xs block"
                      >
                        {c.websiteUrl}
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        c.active
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-300 text-xs">
                    {c.displayOrder}
                  </td>
                  <td className="px-4 py-3 text-right space-x-1">
                    <form action={setClientActiveAction} className="inline">
                      <input type="hidden" name="id" defaultValue={c.id} />
                      <input type="hidden" name="active" defaultValue={String(!c.active)} />
                      <button
                        type="submit"
                        className="p-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors text-xs"
                        title={c.active ? 'Deactivate' : 'Activate'}
                      >
                        {c.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </form>
                    <DeleteButton
                      action={deleteClientAction}
                      id={c.id}
                      itemTitle={c.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900/50">
              <p>
                Page {page} of {totalPages} ({total} total)
              </p>
              <div className="flex gap-1">
                {page > 1 && (
                  <a
                    href={`?search=${encodeURIComponent(search)}&active=${active}&page=${page - 1}`}
                    className="px-3 py-1 rounded hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200"
                  >
                    Prev
                  </a>
                )}
                {page < totalPages && (
                  <a
                    href={`?search=${encodeURIComponent(search)}&active=${active}&page=${page + 1}`}
                    className="px-3 py-1 rounded hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200"
                  >
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
