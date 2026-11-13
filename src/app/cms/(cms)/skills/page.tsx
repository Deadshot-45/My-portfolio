import { listSkills } from '@/lib/cms/skills';
import { requireSession } from '@/lib/auth';
import {
  createSkillAction,
  deleteSkillAction,
  setSkillActiveAction,
} from '@/app/cms/actions/skills';
import { DeleteButton } from '@/components/cms/DeleteButton';

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireSession();
  const sp = await searchParams;
  const search = String(sp.search || '');
  const category = String(sp.category || '');
  const active = String(sp.active || '');

  const skills = await listSkills({
    search: search || undefined,
    category: category && category !== 'all' ? category : undefined,
    active: active === 'true' ? true : active === 'false' ? false : undefined,
  });

  const categories = [
    'Frontend',
    'Backend',
    'Database & Storage',
    'Cloud & DevOps',
    '3D & Graphics',
    'AI & Automation',
    'Tools & Utilities',
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Skills & Tech Stack</h1>
          <p className="text-zinc-400 text-sm">
            Manage your languages, frameworks, developer tools, and domain proficiencies.
          </p>
        </div>
      </div>

      {/* Add New Skill Section */}
      <details className="group rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
        <summary className="px-6 py-4 cursor-pointer font-semibold text-sm text-emerald-400 hover:text-emerald-300 flex items-center justify-between select-none bg-zinc-900/20 group-open:border-b group-open:border-zinc-800">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Skill
          </span>
          <span className="text-xs text-zinc-500 font-normal">Click to expand form</span>
        </summary>
        <form action={createSkillAction} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Skill / Technology Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Next.js, Three.js, Docker"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                name="category"
                defaultValue="Frontend"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Proficiency Level
              </label>
              <select
                name="level"
                defaultValue="Advanced"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              >
                <option value="Expert">Expert</option>
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Familiar">Familiar</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Icon Key (optional)
              </label>
              <input
                type="text"
                name="icon"
                placeholder="e.g. SiReact, SiNextdotjs"
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
                Active (Visible on Portfolio)
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
            >
              Add Skill
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
            placeholder="Search skills by name..."
            className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
          />
        </div>
        <select
          name="category"
          defaultValue={category || 'all'}
          className="px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900/80 transition-colors text-sm font-medium"
        >
          Filter
        </button>
      </form>

      {/* Skills Table */}
      {skills.length === 0 ? (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-12 text-center">
          <p className="text-zinc-500 text-sm">No skills found.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-900/50 bg-zinc-900/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Skill</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-500">Level</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-500">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Order</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40">
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-zinc-200">
                    {skill.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-zinc-400">
                    <span className="inline-block px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/60">
                      {skill.category || 'General'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-emerald-400 font-medium">
                    {skill.level || 'Advanced'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        skill.active
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700'
                      }`}
                    >
                      {skill.active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-300 text-xs">
                    {skill.displayOrder}
                  </td>
                  <td className="px-4 py-3 text-right space-x-1">
                    <form action={setSkillActiveAction} className="inline">
                      <input type="hidden" name="id" defaultValue={skill.id} />
                      <input type="hidden" name="active" defaultValue={String(!skill.active)} />
                      <button
                        type="submit"
                        className="p-2 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors text-xs"
                        title={skill.active ? 'Hide skill' : 'Show skill'}
                      >
                        {skill.active ? 'Hide' : 'Show'}
                      </button>
                    </form>
                    <DeleteButton
                      action={deleteSkillAction}
                      id={skill.id}
                      itemTitle={skill.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
