import { listServices } from "@/lib/cms/services";
import {
  setServiceActiveAction,
  deleteServiceAction,
} from "@/app/cms/actions/services";
import { DeleteButton } from "@/components/cms/DeleteButton";
import { FilterBar } from "@/components/cms/FilterBar";
import { Pencil, Plus, Power } from "lucide-react";
import Link from "next/link";

const items = [
  { value: "all", label: "All" },
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const search = String(sp.search || "");
  const active = String(sp.active || "");
  const page = Math.max(parseInt(String(sp.page || "1"), 10), 1);

  const { services, total, totalPages } = await listServices({
    search: search || undefined,
    active: active === "1" ? true : active === "0" ? false : undefined,
    page,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Services</h1>
          <p className="text-zinc-400 text-sm">
            Manage the services offered on the portfolio.
          </p>
        </div>
        <a
          href="/cms/services/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shrink-0 shadow-sm"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Add Service</span>
        </a>
      </div>

      {/* Responsive Filter Bar with Debounced Live Search */}
      <FilterBar
        initialSearch={search}
        initialActive={active}
        filterKey="active"
        placeholder="Search services by title or description..."
        selectPlaceholder="All Status"
        items={items}
      />

      {/* Services List / Table */}
      {total === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No services found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
          {/* Mobile Card Layout (< md) */}
          <div className="block md:hidden divide-y divide-zinc-900/50">
            {services.map((s) => (
              <div
                key={s.id}
                className="p-4 space-y-3 hover:bg-zinc-900/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-zinc-100 truncate">
                      {s.title}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 truncate mt-0.5">
                      {s.slug}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      s.active
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-zinc-800/50 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    {s.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-900/40">
                  <span className="font-mono">Order: #{s.displayOrder}</span>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/cms/services/${s.id}/edit`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                    >
                      <Pencil className="w-3 h-3 text-emerald-400" />
                      <span>Edit</span>
                    </Link>
                    <form action={setServiceActiveAction} className="inline">
                      <input name="id" defaultValue={s.id} type="hidden" />
                      <input
                        name="active"
                        defaultValue={String(!s.active)}
                        type="hidden"
                      />
                      <button
                        type="submit"
                        //onClick={(e) =>{ e.preventDefault()}}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                          s.active
                            ? "border-zinc-700 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                        title={
                          s.active ? "Deactivate service" : "Activate service"
                        }
                      >
                        <Power className="w-3 h-3" />
                        <span>{s.active ? "Pause" : "Activate"}</span>
                      </button>
                    </form>
                    <DeleteButton
                      action={deleteServiceAction}
                      id={s.id}
                      itemTitle={s.title}
                      variant="icon"
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
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Service
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Slug
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500">
                    Active
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">
                    Order
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/40">
                {services.map((s) => (
                  <tr
                    key={s.id}
                    className="hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-zinc-200">
                      {s.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-400 truncate max-w-xs font-mono">
                      {s.slug}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          s.active
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-800/50 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        {s.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-zinc-300 font-mono">
                      {s.displayOrder}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center justify-end gap-1">
                        <a
                          href={`/cms/services/${s.id}/edit`}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/60 transition-colors"
                          title="Edit Service"
                          aria-label={`Edit ${s.title}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </a>
                        <form
                          action={setServiceActiveAction}
                          className="inline"
                        >
                          <input name="id" defaultValue={s.id} type="hidden" />
                          <input
                            name="active"
                            defaultValue={String(!s.active)}
                            type="hidden"
                          />
                          <button
                            type="submit"
                            className={`p-1.5 rounded-md transition-colors ${
                              s.active
                                ? "text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/60"
                                : "text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800/60"
                            }`}
                            title={
                              s.active
                                ? "Deactivate Service"
                                : "Activate Service"
                            }
                            aria-label={
                              s.active
                                ? "Deactivate Service"
                                : "Activate Service"
                            }
                          >
                            <Power className="h-4 w-4" />
                          </button>
                        </form>
                        <DeleteButton
                          action={deleteServiceAction}
                          id={s.id}
                          itemTitle={s.title}
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
                  <a
                    href={`?search=${encodeURIComponent(search)}&active=${active}&page=${page - 1}`}
                    className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  >
                    Prev
                  </a>
                )}
                {page < totalPages && (
                  <a
                    href={`?search=${encodeURIComponent(search)}&active=${active}&page=${page + 1}`}
                    className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
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
