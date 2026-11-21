import { requireSession } from '@/lib/auth';
import { getProfile } from '@/lib/cms/profile';
import { updateProfileAction } from '@/app/cms/actions/about';
import { ImagePickerInput } from '@/components/cms/ImagePickerInput';

export default async function AboutPage() {
  await requireSession();
  const profile = await getProfile();

  let socialLinks: { github?: string; linkedin?: string; twitter?: string } = {};
  if (profile?.socialLinks) {
    try {
      socialLinks = JSON.parse(profile.socialLinks);
    } catch {
      socialLinks = {};
    }
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">About & Profile</h1>
        <p className="text-zinc-400 text-sm">
          Manage your personal brand bio, contact details, headline, and public profile data.
        </p>
      </div>

      <form
        action={updateProfileAction}
        className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-6 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              defaultValue={profile?.name || ''}
              placeholder="e.g. Mayank Sahu"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Headline
            </label>
            <input
              type="text"
              name="headline"
              defaultValue={profile?.headline || ''}
              placeholder="e.g. Creative Full-Stack Developer & Designer"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Hero Introduction
          </label>
          <input
            type="text"
            name="introduction"
            defaultValue={profile?.introduction || ''}
            placeholder="e.g. Websites That Sell. AI That Never Sleeps."
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Biography
          </label>
          <textarea
            name="biography"
            rows={5}
            defaultValue={profile?.biography || ''}
            placeholder="Detailed background, philosophy, and expertise..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={profile?.location || ''}
              placeholder="e.g. Indore, Madhya Pradesh, India"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Availability Status
            </label>
            <input
              type="text"
              name="availability"
              defaultValue={profile?.availability || ''}
              placeholder="e.g. Open for new projects"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={profile?.email || ''}
              placeholder="e.g. mayanksahu8179@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <ImagePickerInput
            label="Profile Image"
            name="profileImage"
            defaultValue={profile?.profileImage || ''}
            placeholder="e.g. /images/hero-sunset.jpg or https://..."
            accept="image/*"
            modalTitle="Select Profile Image from Storage"
          />

          <ImagePickerInput
            label="Resume / CV File or URL"
            name="resumeUrl"
            defaultValue={profile?.resumeUrl || ''}
            placeholder="e.g. /resume.pdf or https://..."
            accept="application/pdf,image/*"
            hint="PDF or Document link"
            modalTitle="Select Resume / Document from Storage"
          />
        </div>

        <div className="border-t border-zinc-800/80 pt-5 space-y-4">
          <h2 className="text-sm font-semibold text-zinc-300">Social & Professional Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">GitHub URL</label>
              <input
                type="url"
                name="github"
                defaultValue={socialLinks.github || ''}
                placeholder="https://github.com/Deadshot-45"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                defaultValue={socialLinks.linkedin || ''}
                placeholder="https://linkedin.com/in/mayank-sahu-ou"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Twitter / X URL</label>
              <input
                type="url"
                name="twitter"
                defaultValue={socialLinks.twitter || ''}
                placeholder="https://x.com/username"
                className="w-full px-3.5 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-zinc-800/80">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}
