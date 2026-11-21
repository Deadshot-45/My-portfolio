import { listExperience } from '@/lib/cms/experience';
import { requireSession } from '@/lib/auth';
import { createExperienceAction, deleteExperienceAction } from '@/app/cms/actions/experience';
import { DeleteButton } from '@/components/cms/DeleteButton';
import { CmsSelect } from '@/components/cms/CmsSelect';
import { FilterBar } from '@/components/cms/FilterBar';

export default async function ExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireSession();
  const sp = await searchParams;
  const search = String(sp.search || '');
  const filterCurrent = sp.current === 'true' ? true : sp.current === 'false' ? false : undefined;

  const experiences = await listExperience({
    search: search || undefined,
    current: filterCurrent,
  });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Work Experience</h1>
          <p className="text-zinc-400 text-sm">
            Manage your employment history, career milestones, roles, and technical achievements.
          </p>
        </div>
      </div>

      {/* Add New Experience Section */}
      <details className="group rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
        <summary className="px-6 py-4 cursor-pointer font-semibold text-sm text-emerald-400 hover:text-emerald-300 flex items-center justify-between select-none bg-zinc-900/20 group-open:border-b group-open:border-zinc-800">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Position
          </span>
          <span className="text-xs text-zinc-500 font-normal">Click to expand form</span>
        </summary>
        <form action={createExperienceAction} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="company"
                required
                placeholder="e.g. Stratedgy Inc"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Employment Type
              </label>
              <CmsSelect
                name="employmentType"
                defaultValue="Full-time"
                options={[
                  { value: 'Full-time', label: 'Full-time' },
                  { value: 'Contract', label: 'Contract' },
                  { value: 'Freelance', label: 'Freelance' },
                  { value: 'Part-time', label: 'Part-time' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                End Date (leave blank if current)
              </label>
              <input
                type="date"
                name="endDate"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 h-11">
              <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="current"
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500 h-4 w-4 bg-[#09090b]"
                />
                Currently Working Here
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Key Responsibilities & Impact
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Highlight major achievements, architectural decisions, and metrics..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Technologies Used (comma-separated)
              </label>
              <input
                type="text"
                name="technologies"
                placeholder="React, Next.js, TypeScript, PostgreSQL, Docker"
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
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
            >
              Add Experience Record
            </button>
          </div>
        </form>
      </details>

      {/* Filter Bar */}
      <FilterBar
        initialSearch={search}
        placeholder="Search by title, company, or tech..."
      />

      {/* Positions Table */}
      {experiences.length === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No experience records found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden shadow-sm">
          {/* Mobile Card Layout (< md) */}
          <div className="block md:hidden divide-y divide-zinc-900/50">
            {experiences.map((exp) => {
              const startStr = exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A';
              const endStr = exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A';

              return (
                <div key={exp.id} className="p-4 space-y-3 hover:bg-zinc-900/20 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-zinc-200">{exp.title}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{exp.company}</p>
                    </div>
                    <span className="shrink-0 inline-block px-2 py-0.5 text-xs rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {exp.employmentType || 'Full-time'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
                    <span className="text-zinc-300">
                      {startStr} — {endStr}
                      {exp.current && (
                        <span className="ml-1.5 inline-block text-[10px] text-emerald-400 font-semibold uppercase">
                          • Current
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-zinc-500">Order: #{exp.displayOrder}</span>
                  </div>

                  {exp.technologies && (
                    <p className="text-xs text-zinc-400 bg-zinc-900/40 p-2 rounded border border-zinc-800/60 truncate">
                      {exp.technologies}
                    </p>
                  )}

                  <div className="flex items-center justify-end pt-2 border-t border-zinc-900/40">
                    <DeleteButton
                      action={deleteExperienceAction}
                      id={exp.id}
                      itemTitle={`${exp.title} at ${exp.company}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table (>= md) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-900/50 bg-zinc-900/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Position / Company</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Timeline</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Tech Stack</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Order</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/40">
                {experiences.map((exp) => {
                  const startStr = exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A';
                  const endStr = exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : 'N/A';

                  return (
                    <tr key={exp.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-zinc-200">{exp.title}</div>
                        <div className="text-xs text-zinc-400">{exp.company}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-400">
                        <span className="inline-block px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/60">
                          {exp.employmentType || 'Full-time'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-300">
                        {startStr} — {endStr}
                        {exp.current && (
                          <span className="ml-1.5 inline-block text-[10px] text-emerald-400 font-semibold uppercase">
                            • Current
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-zinc-400 max-w-xs truncate">
                        {exp.technologies || '—'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-zinc-300 text-xs">
                        {exp.displayOrder}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DeleteButton
                          action={deleteExperienceAction}
                          id={exp.id}
                          itemTitle={`${exp.title} at ${exp.company}`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
