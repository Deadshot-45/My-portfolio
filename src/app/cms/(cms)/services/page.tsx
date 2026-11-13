import { listServices } from "@/lib/cms/services";
import { requireSession } from "@/lib/auth";
import {
  setServiceActiveAction,
  deleteServiceAction,
} from "@/app/cms/actions/services";
import { DeleteButton } from "@/components/cms/DeleteButton";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { user } = await requireSession();
  const sp = await searchParams;
  const search = String(sp.search || "");
  const active = String(sp.active || "");
  const page = Math.max(parseInt(String(sp.page || "1"), 10), 1);

  const { services, total, totalPages } = await listServices({
    search: search || undefined,
    active: active === "true" ? true : active === "false" ? false : undefined,
    page,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Services</h1>
          <p className="text-zinc-400 text-sm">
            Manage the services offered on the portfolio.
          </p>
        </div>
        <a
          href="/cms/services/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Service
        </a>
      </div>
      <form
        method="get"
        className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-4 grid grid-cols-1 sm:grid-cols-4 gap-3"
      >
        <div className="col-span-3 relative">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search title or description..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <select
          name="active"
          defaultValue={active || "all"}
          className="pl-3 pr-9 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          <option value="all">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button className="px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900/80 transition-colors">
          Filter
        </button>
      </form>

      {total === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No services found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
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
                  <td className="px-4 py-3 text-sm text-zinc-300 truncate max-w-xs">
                    {s.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${s.active ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-zinc-800/50 text-zinc-400 border border-zinc-700"}`}
                    >
                      {s.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-sm text-zinc-300 font-mono">
                    {s.displayOrder}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <a
                      href={`/cms/services/${s.id}/edit`}
                      className="p-2 text-zinc-400 hover:text-emerald-400"
                      title="Edit"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                          aria-hidden="true"
                        />
                      </svg>
                    </a>
                    <form
                      action={setServiceActiveAction}
                      className="inline"
                    >
                      <input name="id" defaultValue={s.id} type="hidden" />
                      <input name="active" defaultValue={String(!s.active)} type="hidden" />
                      <button
                        type="submit"
                        className="p-2 rounded-md text-zinc-400 hover:bg-zinc-800 transition-colors"
                        title={s.active ? "Deactivate" : "Activate"}
                      >
                        {s.active ? "↓" : "↑"}
                      </button>
                    </form>
                    <DeleteButton
                      action={deleteServiceAction}
                      id={s.id}
                      itemTitle={s.title}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="px-4 py-3 flex items-center justify-between text-xs text-zinc-500">
              <p>
                Page {page} of {totalPages}
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
