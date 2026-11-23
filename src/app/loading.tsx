import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white p-6 md:p-12 space-y-12 animate-pulse">
      {/* Top Navbar Skeleton */}
      <div className="flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-24 h-5" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-4 hidden sm:block" />
          <Skeleton className="w-16 h-4 hidden sm:block" />
          <Skeleton className="w-24 h-8 rounded-full" />
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="max-w-4xl mx-auto py-16 space-y-6">
        <Skeleton className="w-36 h-6 rounded-full" />
        <Skeleton className="w-full sm:w-3/4 h-16 sm:h-20 rounded-2xl" />
        <Skeleton className="w-full sm:w-2/3 h-6" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="w-36 h-12 rounded-full" />
          <Skeleton className="w-36 h-12 rounded-full" />
        </div>
      </div>

      {/* Selected Work Grid Skeleton */}
      <div className="max-w-6xl mx-auto space-y-8 pt-8">
        <div className="flex items-center justify-between">
          <Skeleton className="w-48 h-10 rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="w-20 h-8 rounded-full" />
            <Skeleton className="w-20 h-8 rounded-full" />
            <Skeleton className="w-20 h-8 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-3xl border border-white/10 bg-zinc-950/80 p-6 space-y-4">
              <Skeleton className="w-full aspect-[16/10] rounded-2xl" />
              <div className="space-y-2 pt-2">
                <Skeleton className="w-3/4 h-7 rounded-lg" />
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-2/3 h-4 rounded" />
              </div>
              <div className="flex gap-2 pt-3">
                <Skeleton className="w-16 h-6 rounded-md" />
                <Skeleton className="w-16 h-6 rounded-md" />
                <Skeleton className="w-16 h-6 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
