import { requireSession } from '@/lib/auth';
import { listSiteSettings } from '@/lib/cms/settings';
import { updateGeneralSettingsAction } from '@/app/cms/actions/settings';

export default async function SettingsPage() {
  await requireSession();
  const settings = await listSiteSettings();
  const map: Record<string, string> = {};
  for (const s of settings) {
    if (s.value) map[s.key] = s.value;
  }

  const siteTitle = map['site_title'] || 'Mayank Sahu — Full-Stack Developer & Designer';
  const availability = map['availability_status'] || 'Open for new projects';
  const contactEmail = map['contact_email'] || 'mayanksahu8179@gmail.com';
  const phoneNumber = map['phone_number'] || '';
  const location = map['location'] || 'Indore, Madhya Pradesh, India';
  const github = map['github_url'] || 'https://github.com/Deadshot-45';
  const linkedin = map['linkedin_url'] || 'https://linkedin.com/in/mayank-sahu-ou';
  const twitter = map['twitter_url'] || '';
  const footerTagline = map['footer_tagline'] || 'Engineered with Next.js, WebGL & Tailwind CSS.';

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Website & Global Settings</h1>
        <p className="text-zinc-400 text-sm">
          Configure site-wide title, contact info, availability notice, and social profiles.
        </p>
      </div>

      <form
        action={updateGeneralSettingsAction}
        className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Website Brand Title *
            </label>
            <input
              type="text"
              name="site_title"
              required
              defaultValue={siteTitle}
              placeholder="e.g. Mayank Sahu — Full-Stack Developer & Designer"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Availability Badge Status
            </label>
            <input
              type="text"
              name="availability_status"
              defaultValue={availability}
              placeholder="e.g. Open for new projects"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Inquiry / Contact Email *
            </label>
            <input
              type="email"
              name="contact_email"
              required
              defaultValue={contactEmail}
              placeholder="contact@mayanksahu.dev"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Phone / WhatsApp
            </label>
            <input
              type="text"
              name="phone_number"
              defaultValue={phoneNumber}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Primary Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={location}
              placeholder="Indore, Madhya Pradesh, India"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        <div className="border-t border-zinc-800/80 pt-5 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-300">Social Accounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">GitHub Profile URL</label>
              <input
                type="url"
                name="github_url"
                defaultValue={github}
                placeholder="https://github.com/Deadshot-45"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">LinkedIn Profile URL</label>
              <input
                type="url"
                name="linkedin_url"
                defaultValue={linkedin}
                placeholder="https://linkedin.com/in/mayank-sahu-ou"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Twitter / X Handle or URL</label>
              <input
                type="text"
                name="twitter_url"
                defaultValue={twitter}
                placeholder="https://x.com/username"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Footer Tagline / Colophon
          </label>
          <input
            type="text"
            name="footer_tagline"
            defaultValue={footerTagline}
            placeholder="e.g. Built with Next.js, WebGL & Tailwind CSS."
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-zinc-800/80">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
