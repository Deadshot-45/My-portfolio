import { getDashboardStats } from '@/lib/cms/dashboard';

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Overview</h1>
        <p className="text-zinc-400 text-sm">Manage your portfolio content. All figures reflect live CMS data.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Projects" value={stats.totalProjects} subtitle={stats.publishedProjects > 0 ? `${stats.publishedProjects} published` : 'None published'} icon="project" />
        <StatCard title="Draft Projects" value={stats.draftProjects} subtitle="Not visible publicly" icon="draft" variant="warning" />
        <StatCard title="Services" value={stats.totalServices} subtitle={stats.totalServices > 0 ? 'Active services' : 'No services'} icon="service" />
        <StatCard title="Testimonials" value={stats.totalTestimonials} subtitle={stats.totalTestimonials > 0 ? 'Client reviews' : 'No testimonials'} icon="testimonial" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-6">
          <h2 className="text-sm font-semibold text-zinc-400 mb-4">Recent content updates</h2>
          {stats.recentUpdates.length === 0 ? (
            <p className="text-zinc-500 text-sm">No content updates yet.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentUpdates.map((u) => (
                <li key={u.id} className="flex items-center gap-3">
                  <span className="shrink-0 rounded-full border border-zinc-800 bg-zinc-900/50 p-1.5 text-xs text-zinc-400">{typeLabel(u.type)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-200 truncate">{u.title}</p>
                    <p className="text-xs text-zinc-500">{u.status} &bull; updated {relativeTime(u.updatedAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-6">
          <h2 className="text-sm font-semibold text-zinc-400 mb-4">Quick actions</h2>
          <div className="space-y-3">
            <QuickAction href="/cms/projects" label="Add Project" description="Create a new portfolio project" />
            <QuickAction href="/cms/services" label="Add Service" description="Register a new service offering" />
            <QuickAction href="/cms/testimonials" label="Add Testimonial" description="Publish a new client review" />
            <QuickAction href="/cms/about" label="Update About Section" description="Edit profile and bio" />
            <QuickAction href="/cms/settings" label="Website Settings" description="SEO and global site config" />
          </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, variant }: { title: string; value: number; subtitle: string; icon: string; variant?: 'default' | 'warning' }) {
  const isWarning = variant === 'warning';
  return (
    <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-5">
      <p className="text-xs font-medium text-zinc-500">{title}</p>
      <p className="text-2xl font-bold text-zinc-100">{value}</p>
      <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>
    </div>
  );
}

function QuickAction({ href, label, description }: { href: string; label: string; description: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-[#09090b]/60 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-900/60 hover:border-zinc-700 transition-colors"
    >
      <span className="text-zinc-500">{label.charAt(0)}</span>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
    </a>
  );
}

function typeLabel(type: string) {
  const labels: Record<string, string> = {
    project: 'Project',
    service: 'Service',
    testimonial: 'Testimonial',
    client: 'Client',
  };
  return labels[type] || type;
}

function relativeTime(date: Date) {
  const seconds = (Date.now() - new Date(date).getTime()) / 1000;
  if (seconds < 60) return 'just now';
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}m ago`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}h ago`;
  const days = hours / 24;
  return `${Math.floor(days)}d ago`;
}
