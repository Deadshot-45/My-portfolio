import { requireSession } from '@/lib/auth';
import { getSeoSettings } from '@/lib/cms/settings';
import { updateSeoSettingsAction } from '@/app/cms/actions/settings';
import { ImagePickerInput } from '@/components/cms/ImagePickerInput';
import { CmsSelect } from '@/components/cms/CmsSelect';

export default async function SeoPage() {
  await requireSession();
  const rawSettings = await getSeoSettings();
  const map: Record<string, string> = {};
  for (const s of rawSettings) {
    if (s.value) map[s.key] = s.value;
  }

  const metaTitle = map['seo:meta_title'] || 'Mayank Sahu — Full-Stack Developer & Designer';
  const metaDescription =
    map['seo:meta_description'] ||
    'Creative full-stack developer and UI designer crafting high-converting web apps, 3D interactive experiences, online stores, and autonomous AI systems.';
  const keywords = map['seo:keywords'] || 'Full-Stack Developer, Next.js, React, TypeScript, 3D Web, WebGL, AI';
  const ogImage = map['seo:og_image'] || '/images/hero-sunset.jpg';
  const canonicalUrl = map['seo:canonical_url'] || 'https://mayank-sahu-dev.vercel.app';
  const twitterCard = map['seo:twitter_card'] || 'summary_large_image';
  const robots = map['seo:robots'] || 'index, follow';

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">SEO & Social Metadata</h1>
        <p className="text-zinc-400 text-sm">
          Optimize search engine discoverability, Open Graph cards, crawler policies, and social previews.
        </p>
      </div>

      <form
        action={updateSeoSettingsAction}
        className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-6 space-y-6"
      >
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Default Meta Title *
          </label>
          <input
            type="text"
            name="seo:meta_title"
            required
            defaultValue={metaTitle}
            placeholder="e.g. Mayank Sahu — Full-Stack Developer & Designer"
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
          />
          <p className="text-xs text-zinc-500 mt-1">Recommended length: 50–60 characters.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Default Meta Description *
          </label>
          <textarea
            name="seo:meta_description"
            required
            rows={3}
            defaultValue={metaDescription}
            placeholder="Search engine snippet summary..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm leading-relaxed"
          />
          <p className="text-xs text-zinc-500 mt-1">Recommended length: 150–160 characters.</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Target Keywords (comma-separated)
          </label>
          <input
            type="text"
            name="seo:keywords"
            defaultValue={keywords}
            placeholder="Full-Stack, Next.js, React, WebGL, AI"
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Canonical URL
            </label>
            <input
              type="url"
              name="seo:canonical_url"
              defaultValue={canonicalUrl}
              placeholder="https://mayank-sahu-dev.vercel.app"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <ImagePickerInput
            label="Open Graph Image"
            name="seo:og_image"
            defaultValue={ogImage}
            placeholder="/images/hero-sunset.jpg or https://..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Twitter Card Format
            </label>
            <CmsSelect
              name="seo:twitter_card"
              defaultValue={twitterCard}
              options={[
                { value: 'summary_large_image', label: 'summary_large_image (Recommended)' },
                { value: 'summary', label: 'summary' },
              ]}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Robots Tag
            </label>
            <CmsSelect
              name="seo:robots"
              defaultValue={robots}
              options={[
                { value: 'index, follow', label: 'index, follow (Allow Indexing)' },
                { value: 'noindex, follow', label: 'noindex, follow' },
                { value: 'noindex, nofollow', label: 'noindex, nofollow (Block Indexing)' },
              ]}
            />
          </div>
        </div>

        {/* Live Search Engine Simulation Card */}
        <div className="border-t border-zinc-800/80 pt-6">
          <h2 className="text-sm font-semibold text-zinc-300 mb-3">Google Snippet Preview</h2>
          <div className="rounded-lg border border-zinc-800 bg-[#0c0d12] p-4 font-sans text-left max-w-xl">
            <div className="text-xs text-zinc-400 truncate mb-1">
              {canonicalUrl}
            </div>
            <div className="text-blue-400 font-medium text-base hover:underline truncate cursor-pointer">
              {metaTitle}
            </div>
            <div className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
              {metaDescription}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-zinc-800/80">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
          >
            Save SEO Settings
          </button>
        </div>
      </form>
    </div>
  );
}
