import { listProjects } from "@/lib/cms/projects";
import { requireSession } from "@/lib/auth";
import {
  setProjectStatusAction,
  deleteProjectAction,
} from "@/app/cms/actions/projects";
import { DeleteButton } from "@/components/cms/DeleteButton";
import {
  Pencil,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
} from "lucide-react";
import Link from "next/link";
import { FilterBar } from "@/components/cms/FilterBar";

const items = [
  { label: "All", value: "all" },
  {
    label: "Draft",
    value: "DRAFT",
  },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireSession();
  const sp = await searchParams;
  const search = String(sp.search || "");
  const status = String(sp.status || "");
  const page = Math.max(parseInt(String(sp.page || "1"), 10), 1);

  const { projects, total, pageSize, totalPages } = await listProjects({
    search: search || undefined,
    status: (status && status !== "all" ? status : undefined) as any,
    page,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Projects</h1>
          <p className="text-zinc-400 text-sm">
            Manage portfolio projects. Drafts are not visible publicly.
          </p>
        </div>
        <Link
          href="/cms/projects/create"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-sm shrink-0"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Responsive Filter Bar */}
      <FilterBar
        initialSearch={search}
        initialActive={status || "all"}
        filterKey="status"
        placeholder="Search by title, slug, or tech..."
        selectPlaceholder="All Status"
        items={items}
      />

      {/* Projects List Container */}
      {total === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No projects found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden shadow-sm">
          {/* Mobile Card Layout (< md) */}
          <div className="block md:hidden divide-y divide-zinc-900/50">
            {projects.map((p) => {
              const isPublished = p.status === "PUBLISHED";
              return (
                <div
                  key={p.id}
                  className="p-4 space-y-3 hover:bg-zinc-900/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-zinc-100 truncate">
                        {p.title}
                      </h3>
                      <p className="text-xs font-mono text-zinc-400 truncate mt-0.5">
                        {p.slug}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        isPublished
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : p.status === "DRAFT"
                            ? "bg-zinc-800/50 text-zinc-400 border border-zinc-700"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                    <span>
                      Client:{" "}
                      <strong className="text-zinc-300 font-normal">
                        {p.clientName || "—"}
                      </strong>
                    </span>
                    <span>
                      Category:{" "}
                      <strong className="text-zinc-300 font-normal">
                        {p.category || "—"}
                      </strong>
                    </span>
                    <span className="font-mono text-zinc-500">
                      Order: #{p.displayOrder}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-900/40">
                    <Link
                      href={`/cms/projects/${p.id}/edit`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
                    >
                      <Pencil className="w-3 h-3 text-emerald-400" />
                      <span>Edit</span>
                    </Link>
                    <form action={setProjectStatusAction} className="inline">
                      <input name="id" defaultValue={p.id} type="hidden" />
                      <input
                        name="status"
                        defaultValue={isPublished ? "DRAFT" : "PUBLISHED"}
                        type="hidden"
                      />
                      <button
                        type="submit"
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                          isPublished
                            ? "border-zinc-700 bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                        }`}
                        title={
                          isPublished ? "Unpublish to draft" : "Publish to live"
                        }
                      >
                        {isPublished ? (
                          <ArrowDownCircle className="w-3 h-3 text-amber-400" />
                        ) : (
                          <ArrowUpCircle className="w-3 h-3" />
                        )}
                        <span>{isPublished ? "Unpublish" : "Publish"}</span>
                      </button>
                    </form>
                    <DeleteButton
                      action={deleteProjectAction}
                      id={p.id}
                      itemTitle={p.title}
                      variant="button"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table Layout (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-900/50 bg-zinc-900/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Project
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Client
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Status
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
                {projects.map((p) => {
                  const isPublished = p.status === "PUBLISHED";
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-zinc-900/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-zinc-200">
                          {p.title}
                        </div>
                        <div className="text-xs text-zinc-500 truncate max-w-xs font-mono">
                          {p.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-300">
                        {p.clientName || "—"}
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-300">
                        {p.category || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            isPublished
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : p.status === "DRAFT"
                                ? "bg-zinc-800/50 text-zinc-400 border border-zinc-700"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-zinc-300 font-mono">
                        {p.displayOrder}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center justify-end gap-1">
                          <Link
                            href={`/cms/projects/${p.id}/edit`}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/60 transition-colors"
                            title={`Edit ${p.title}`}
                            aria-label={`Edit ${p.title}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <form
                            action={setProjectStatusAction}
                            className="inline"
                          >
                            <input
                              name="id"
                              defaultValue={p.id}
                              type="hidden"
                            />
                            <input
                              name="status"
                              defaultValue={isPublished ? "DRAFT" : "PUBLISHED"}
                              type="hidden"
                            />
                            <button
                              type="submit"
                              className={`p-1.5 rounded-md transition-colors ${
                                isPublished
                                  ? "text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/60"
                                  : "text-zinc-500 hover:text-emerald-400 hover:bg-zinc-800/60"
                              }`}
                              title={
                                isPublished
                                  ? "Unpublish to draft"
                                  : "Publish to live"
                              }
                              aria-label={isPublished ? "Unpublish" : "Publish"}
                            >
                              {isPublished ? (
                                <ArrowDownCircle className="h-4 w-4" />
                              ) : (
                                <ArrowUpCircle className="h-4 w-4" />
                              )}
                            </button>
                          </form>
                          <DeleteButton
                            action={deleteProjectAction}
                            id={p.id}
                            itemTitle={p.title}
                            variant="icon"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Responsive Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 border-t border-zinc-900/50 bg-zinc-950/40">
              <p>
                Page {page} of {totalPages} &bull; {total} total
              </p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`?search=${encodeURIComponent(search)}&status=${status}&page=${page - 1}`}
                    className="px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                  >
                    Prev
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`?search=${encodeURIComponent(search)}&status=${status}&page=${page + 1}`}
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
