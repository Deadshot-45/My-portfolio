import { Skeleton } from "@/components/ui/skeleton";

export default function CmsLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* CMS Sidebar Skeleton */}
      <aside className="w-64 border-r border-white/10 p-6 hidden md:flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="w-7 h-7 rounded-lg" />
            <Skeleton className="w-28 h-5" />
          </div>
          <div className="space-y-2 pt-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="w-full h-9 rounded-xl" />
            ))}
          </div>
        </div>
        <Skeleton className="w-full h-10 rounded-xl" />
      </aside>

      {/* Main CMS Content Skeleton */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="space-y-2">
            <Skeleton className="w-48 h-8 rounded-lg" />
            <Skeleton className="w-72 h-4" />
          </div>
          <Skeleton className="w-32 h-10 rounded-xl" />
        </div>

        {/* CMS Table / Card Skeletons */}
        <div className="space-y-4">
          <Skeleton className="w-full h-12 rounded-xl" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="w-full h-16 rounded-xl" />
          ))}
        </div>
      </main>
    </div>
  );
}
