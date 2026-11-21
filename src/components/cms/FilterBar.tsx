"use client";

import { useState, useEffect, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Loader2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterItem {
  value: string;
  label: string;
}

interface FilterBarProps {
  initialSearch?: string;
  initialActive?: string;
  items?: FilterItem[];
  filterKey?: string;
  placeholder?: string;
  selectPlaceholder?: string;
}

export function FilterBar({
  initialSearch = "",
  items = [],
  initialActive = "all",
  filterKey = "active",
  placeholder = "Search (live debounced)...",
  selectPlaceholder = "Filter",
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(
    searchParams.get("search") || initialSearch,
  );
  const active = searchParams.get(filterKey) || initialActive;

  // Synchronize state if URL search param changes externally (e.g. back/forward navigation)
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  // Debounced search effect (300ms)
  useEffect(() => {
    const currentParam = searchParams.get("search") || "";
    if (search === currentParam) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }
      params.delete("page"); // Reset to page 1

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [search, pathname, router, searchParams]);

  const handleActiveChange = (newActive: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newActive && newActive !== "all") {
      params.set(filterKey, newActive);
    } else {
      params.delete(filterKey);
    }
    params.delete("page");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleClearSearch = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="rounded-xl border border-zinc-900/50 bg-[#07070a]/80 p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shadow-sm">
      {/* Debounced Search Input */}
      <div className="relative flex-1">
        {isPending ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 animate-spin" />
        ) : (
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
            aria-hidden="true"
          />
        )}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm font-normal transition-colors"
        />
        {search && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors"
            title="Clear search"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Immediate Status/Category Filter using shadcn Select */}
      {items.length > 0 && (
        <div className="shrink-0">
          <Select
            value={active}
            onValueChange={(value) => handleActiveChange(value ?? "all")}
          >
            <SelectTrigger className="w-full sm:w-40 px-3.5 py-2">
              <SelectValue placeholder={selectPlaceholder} />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-sm transition-colors cursor-pointer">
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    className="text-zinc-200 hover:!text-white hover:bg-zinc-800 focus:!text-white focus:bg-zinc-800 data-[highlighted]:!text-white data-[highlighted]:bg-zinc-800 cursor-pointer"
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export { FilterBar as ServicesFilterBar };
