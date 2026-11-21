import { listClients } from '@/lib/cms/clients';
import { requireSession } from '@/lib/auth';
import {
  createClientAction,
  deleteClientAction,
  setClientActiveAction,
} from '@/app/cms/actions/clients';
import { DeleteButton } from '@/components/cms/DeleteButton';
import { FilterBar } from '@/components/cms/FilterBar';
import { Plus, Power, Globe, ExternalLink, Search } from 'lucide-react';
import Link from 'next/link';

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
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Clients & Brand Marks</h1>
          <p className="text-zinc-400 text-sm">
            Manage partner logos, brand marks, studio clients, and trust ticker items.
          </p>
        </div>
      </div>

      {/* Add New Client Collapsible Card */}
      <details className="group rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden shadow-sm">
        <summary className="px-5 py-4 cursor-pointer font-semibold text-sm text-emerald-400 hover:text-emerald-300 flex items-center justify-between select-none bg-zinc-900/20 group-open:border-b group-open:border-zinc-800 transition-colors">
          <span className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Client
          </span>
          <span className="text-xs text-zinc-500 font-normal">Click to expand form</span>
        </summary>
        <form action={createClientAction} className="p-5 sm:p-6 space-y-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div className="sm:col-span-2">
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
            <div className="flex items-center gap-2 pt-2 sm:pt-6">
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
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-sm"
            >
              Add Client
            </button>
          </div>
        </form>
      </details>

      {/* Responsive Filter Bar */}
      <FilterBar
        initialSearch={search}
        initialActive={active || 'all'}
        filterKey="active"
        placeholder="Search by client name or description..."
        selectPlaceholder="All Status"
        items={[
          { value: 'all', label: 'All Status' },
          { value: 'true', label: 'Active Only' },
          { value: 'false', label: 'Inactive Only' },
        ]}
      />

      {/* Clients Container */}
      {clients.length === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No clients found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden shadow-sm">
          {/* Mobile Card Layout (< md) */}
          <div className="block md:hidden divide-y divide-zinc-900/50">
            {clients.map((c) => (
              <div key={c.id} className="p-4 space-y-3 hover:bg-zinc-900/20 transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-zinc-100 truncate">{c.name}</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">{c.description || '—'}</p>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">{c.slug}</p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.active
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {c.websiteUrl && (
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <a
                      href={c.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline truncate"
                    >
                      {c.websiteUrl}
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-900/40">
                  <span className="font-mono">Order: #{c.displayOrder}</span>
                  <div className="flex items-center gap-2">
                    <form action={setClientActiveAction} className="inline">
                      <input type="hidden" name="id" defaultValue={c.id} />
                      <input type="hidden" name="active" defaultValue={String(!c.active)} />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                          c.active
                            ? 'border-zinc-700 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                            : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                        title={c.active ? 'Deactivate' : 'Activate'}
                      >
                        <Power className="w-3 h-3" />
                        <span>{c.active ? 'Pause' : 'Activate'}</span>
                      </button>
                    </form>
                    <DeleteButton
                      action={deleteClientAction}
                      id={c.id}
                      itemTitle={c.name}
                      variant="button"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout (>= md) */}
          <div className="hidden md:block overflow-x-auto">
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
                          className="text-emerald-400 hover:underline truncate max-w-xs block inline-flex items-center gap-1"
                        >
                          <span className="truncate">{c.websiteUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center justify-end gap-1">
                        <form action={setClientActiveAction} className="inline">
                          <input type="hidden" name="id" defaultValue={c.id} />
                          <input type="hidden" name="active" defaultValue={String(!c.active)} />
                          <button
                            type="submit"
                            className={`p-1.5 rounded-md transition-colors ${
                              c.active
                                ? 'text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/60'
                                : 'text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800/60'
                            }`}
                            title={c.active ? 'Deactivate' : 'Activate'}
                            aria-label={c.active ? 'Deactivate' : 'Activate'}
                          >
                            <Power className="h-4 w-4" />
                          </button>
                        </form>
                        <DeleteButton
                          action={deleteClientAction}
                          id={c.id}
                          itemTitle={c.name}
                          variant="icon"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 border-t border-zinc-900/50 bg-zinc-950/40">
              <p>
                Page {page} of {totalPages} &bull; {total} total
              </p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`?search=${encodeURIComponent(search)}&active=${active}&page=${page - 1}`}
                    className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  >
                    Prev
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`?search=${encodeURIComponent(search)}&active=${active}&page=${page + 1}`}
                    className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
