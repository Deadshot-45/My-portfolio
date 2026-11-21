import { listTestimonials } from "@/lib/cms/testimonials";
import { requireSession } from "@/lib/auth";
import {
  createTestimonialAction,
  deleteTestimonialAction,
  setTestimonialStatusAction,
} from "@/app/cms/actions/testimonials";
import { DeleteButton } from "@/components/cms/DeleteButton";
import { FilterBar } from "@/components/cms/FilterBar";
import { CmsSelect } from "@/components/cms/CmsSelect";

const items = [
  { label: "All", value: "all" },
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireSession();
  const sp = await searchParams;
  const search = String(sp.search || "");
  const status = String(sp.status || "");
  const page = Math.max(parseInt(String(sp.page || "1"), 10), 1);

  const { testimonials, total, totalPages } = await listTestimonials({
    search: search || undefined,
    status: status && status !== "all" ? status : undefined,
    page,
    pageSize: 15,
  });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            Testimonials & Reviews
          </h1>
          <p className="text-zinc-400 text-sm">
            Manage client recommendations, social proof, quotes, and star
            ratings.
          </p>
        </div>
      </div>

      {/* Add New Testimonial Section */}
      <details className="group rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
        <summary className="px-6 py-4 cursor-pointer font-semibold text-sm text-emerald-400 hover:text-emerald-300 flex items-center justify-between select-none bg-zinc-900/20 group-open:border-b group-open:border-zinc-800">
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Testimonial
          </span>
          <span className="text-xs text-zinc-500 font-normal">
            Click to expand form
          </span>
        </summary>
        <form action={createTestimonialAction} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="clientName"
                required
                placeholder="e.g. Marcus Vance"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Title / Designation
              </label>
              <input
                type="text"
                name="clientDesignation"
                placeholder="e.g. Founder & CEO"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Company / Organization
              </label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Brass Knuckles Fight Klub"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Testimonial Quote / Content *
            </label>
            <textarea
              name="content"
              required
              rows={3}
              placeholder="The client's recommendation and feedback on working with you..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Rating (1–5 Stars)
              </label>
              <CmsSelect
                name="rating"
                defaultValue="5"
                options={[
                  { value: '5', label: '★★★★★ (5 Stars)' },
                  { value: '4', label: '★★★★☆ (4 Stars)' },
                  { value: '3', label: '★★★☆☆ (3 Stars)' },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Publication Status
              </label>
              <CmsSelect
                name="status"
                defaultValue="PUBLISHED"
                options={[
                  { value: 'PUBLISHED', label: 'Published (Visible)' },
                  { value: 'DRAFT', label: 'Draft' },
                ]}
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
                  name="featured"
                  defaultChecked
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 h-4 w-4 bg-[#09090b]"
                />
                Featured Quote
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
            >
              Add Testimonial
            </button>
          </div>
        </form>
      </details>

      {/* Responsive Filter Bar */}
      <FilterBar
        initialSearch={search}
        initialActive={status || "all"}
        filterKey="status"
        placeholder="Search by client name, company, or text..."
        selectPlaceholder="All Statuses"
        items={[
          { label: "All Statuses", value: "all" },
          { label: "Published", value: "PUBLISHED" },
          { label: "Draft", value: "DRAFT" },
        ]}
      />

      {/* Testimonials Container */}
      {testimonials.length === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No testimonials found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden shadow-sm">
          {/* Mobile Card Layout (< md) */}
          <div className="block md:hidden divide-y divide-zinc-900/50">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-4 space-y-3 hover:bg-zinc-900/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-zinc-100">
                      {t.clientName}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {t.clientDesignation ? `${t.clientDesignation}, ` : ""}
                      {t.company || ""}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      t.status === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-zinc-800/50 text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 italic line-clamp-3 bg-zinc-900/30 p-2.5 rounded border border-zinc-800/60">
                  “{t.content}”
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                  <span className="text-amber-400 font-medium">
                    {"★".repeat(t.rating || 5)}
                  </span>
                  <span className="font-mono text-zinc-500">
                    Order: #{t.displayOrder}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-900/40">
                  <form action={setTestimonialStatusAction} className="inline">
                    <input type="hidden" name="id" defaultValue={t.id} />
                    <input
                      type="hidden"
                      name="status"
                      defaultValue={
                        t.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
                      }
                    />
                    <button
                      type="submit"
                      className="px-2.5 py-1.5 rounded-md border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors text-xs font-medium"
                      title={t.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                    >
                      {t.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                    </button>
                  </form>
                  <DeleteButton
                    action={deleteTestimonialAction}
                    id={t.id}
                    itemTitle={`${t.clientName}'s review`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-900/50 bg-zinc-900/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Client / Company
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">
                    Feedback
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500">
                    Rating
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500">
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
                {testimonials.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-zinc-900/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-zinc-200">
                        {t.clientName}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {t.clientDesignation ? `${t.clientDesignation}, ` : ""}
                        {t.company || ""}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-zinc-300 max-w-md">
                      <p className="line-clamp-2 italic">“{t.content}”</p>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-amber-400 font-medium">
                      {"★".repeat(t.rating || 5)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.status === "PUBLISHED"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-800/50 text-zinc-400 border border-zinc-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-zinc-300 text-xs">
                      {t.displayOrder}
                    </td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <form
                        action={setTestimonialStatusAction}
                        className="inline"
                      >
                        <input type="hidden" name="id" defaultValue={t.id} />
                        <input
                          type="hidden"
                          name="status"
                          defaultValue={
                            t.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
                          }
                        />
                        <button
                          type="submit"
                          className="p-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors text-xs"
                          title={
                            t.status === "PUBLISHED" ? "Unpublish" : "Publish"
                          }
                        >
                          {t.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <DeleteButton
                        action={deleteTestimonialAction}
                        id={t.id}
                        itemTitle={`${t.clientName}'s review`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 border-t border-zinc-900/50">
              <p>
                Page {page} of {totalPages} ({total} total)
              </p>
              <div className="flex items-center gap-1">
                {page > 1 && (
                  <a
                    href={`?search=${encodeURIComponent(search)}&status=${status}&page=${page - 1}`}
                    className="px-3 py-1 rounded border border-zinc-800 hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    Prev
                  </a>
                )}
                {page < totalPages && (
                  <a
                    href={`?search=${encodeURIComponent(search)}&status=${status}&page=${page + 1}`}
                    className="px-3 py-1 rounded border border-zinc-800 hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 transition-colors"
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
