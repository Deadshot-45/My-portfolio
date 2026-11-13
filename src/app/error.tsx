'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log unexpected runtime crashes for diagnosis
    console.error('[ErrorBoundary caught error]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#07070a] text-white flex flex-col items-center justify-center px-4 selection:bg-[#9bf35a] selection:text-black">
      <div className="relative max-w-lg w-full text-center space-y-6">
        {/* Error pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          Application Error Detected
        </div>

        {/* Headline */}
        <h1 className="font-grotesk text-4xl sm:text-5xl font-light tracking-tight text-white m-0">
          Something went
          <span className="inline-flex items-baseline ml-2">
            wrong
            <i
              className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 ml-1.5 shadow-[0_0_10px_#f43f5e]"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p className="font-grotesk text-zinc-400 text-sm sm:text-base leading-relaxed">
          An unexpected runtime exception was encountered while rendering this view. Your session and data remain safe.
        </p>

        {error.digest && (
          <p className="font-mono text-xs text-zinc-600 bg-white/[0.02] border border-white/5 py-1 px-3 rounded-md max-w-xs mx-auto truncate">
            Digest: {error.digest}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#9bf35a] text-black font-semibold text-sm hover:bg-[#8ae04b] transition-all shadow-[0_0_20px_rgba(155,243,90,0.3)] cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 font-semibold text-sm hover:bg-white/10 hover:text-white transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
