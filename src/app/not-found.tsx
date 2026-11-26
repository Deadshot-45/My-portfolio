import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07070a] text-white flex flex-col items-center justify-center px-4 selection:bg-[#9bf35a] selection:text-black">
      <div className="relative max-w-md w-full text-center space-y-6">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          HTTP 404 &bull; Missing Route
        </div>

        {/* Display title */}
        <h1 className="font-grotesk text-5xl sm:text-6xl font-light tracking-tight text-white m-0">
          Page Not
          <span className="inline-flex items-baseline ml-2">
            Found
            <i
              className="inline-block w-2.5 h-2.5 rounded-full bg-[#9bf35a] ml-1.5 shadow-[0_0_10px_#9bf35a]"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p className="font-grotesk text-zinc-400 text-sm sm:text-base leading-relaxed">
          The page or resource you are looking for doesn&apos;t exist, has been archived, or was moved to another location.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-colors shadow-lg"
          >
            Return to Home
          </Link>
          <Link
            href="/cms/login"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-semibold text-sm hover:bg-white/10 hover:text-white transition-colors"
          >
            CMS Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
