'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Loader2, X } from 'lucide-react';

interface DebouncedSearchProps {
  placeholder?: string;
  paramKey?: string;
  debounceMs?: number;
}

export function DebouncedSearch({
  placeholder = 'Search title or description...',
  paramKey = 'search',
  debounceMs = 300,
}: DebouncedSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentParam = searchParams.get(paramKey) || '';
  const [prevParam, setPrevParam] = useState(currentParam);
  const [query, setQuery] = useState(currentParam);

  // Synchronize state if URL changes externally (during render per React docs)
  if (prevParam !== currentParam) {
    setPrevParam(currentParam);
    setQuery(currentParam);
  }

  useEffect(() => {
    // Only trigger if query actually differs from what is currently in URL
    const currentParam = searchParams.get(paramKey) || '';
    if (query === currentParam) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set(paramKey, query.trim());
      } else {
        params.delete(paramKey);
      }
      // Reset pagination to first page on search filter change
      params.delete('page');

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, paramKey, debounceMs, pathname, router, searchParams]);

  const handleClear = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramKey);
    params.delete('page');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative flex-1">
      {isPending ? (
        <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 animate-spin" />
      ) : (
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden="true" />
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm font-normal transition-colors"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors"
          title="Clear search"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
