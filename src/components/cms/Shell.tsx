"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  UserCircle,
  Mail as MailIcon,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { NAV_ITEMS } from "./NavItems";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import { SignOutConfirmDialog } from "./SignOutConfirmDialog";

interface ShellProps {
  user: { name: string; email: string; role: string };
  children: React.ReactNode;
}

function getBreadcrumbs(path: string) {
  const segments = path.split("/").filter(Boolean);
  const cmsSegments = segments[0] === "cms" ? segments.slice(1) : segments;

  const map: Record<string, string> = {
    dashboard: "Dashboard",
    projects: "Projects",
    services: "Services",
    media: "Media",
    clients: "Clients",
    testimonials: "Testimonials",
    experience: "Experience",
    about: "About",
    skills: "Skills",
    seo: "SEO",
    settings: "Settings",
    create: "Create",
    edit: "Edit",
  };

  const items: { label: string; href: string }[] = [];
  let accumulated = "/cms";

  for (let i = 0; i < cmsSegments.length; i++) {
    const seg = cmsSegments[i];
    accumulated += `/${seg}`;

    // If segment is an ID and followed by 'edit', skip showing the raw ID in the breadcrumb
    const isId = seg.length > 15 || /^[0-9a-f-]{10,}$/i.test(seg);
    const nextIsEdit = cmsSegments[i + 1] === "edit";

    if (isId && nextIsEdit) {
      continue;
    }

    const label =
      map[seg.toLowerCase()] ||
      (isId ? "Item" : seg.charAt(0).toUpperCase() + seg.slice(1));
    items.push({ label, href: accumulated });
  }

  return items;
}

export function Shell(this: any, { user, children }: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const activePath = usePathname();
  const breadcrumbItems = getBreadcrumbs(activePath);
  const parentRoute =
    breadcrumbItems.length > 1
      ? breadcrumbItems[breadcrumbItems.length - 2]
      : null;
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const router = useRouter();

  const isSidebarOpen = isMobile ? mobileSidebarOpen : sidebarOpen;

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
  }, []);

  const isActive = (href: string) => activePath === href;

  const handleLogout = async () => {
    await fetch("/api/cms/logout", { method: "POST" });
    router.push("/cms/login");
  };

  return (
    <div className="relative flex min-h-[92dvh] bg-[#09090b] text-zinc-100">
      <aside
        className={`fixed h-screen left-0 top-0 bottom-0 w-64 border-r border-zinc-900/50 bg-[#07070a]/80 backdrop-blur z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:translate-x-0 lg:w-64`}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col">
          <div className="h-12 flex items-center justify-center lg:justify-start lg:px-4 lg:gap-3">
            <span className="font-bold text-xl tracking-tighter text-emerald-400">
              CMS
            </span>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-t border-zinc-900/50">
            <button
              onClick={() => setShowSignOutConfirm(true)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="h-5 w-5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      {mobileSidebarOpen && (
        <aside className="fixed h-[92dvh] left-0 top-0 bottom-0 w-64 border-r border-zinc-900/50 bg-[#07070a] z-50 lg:hidden">
          <div className="flex h-full flex-col">
            <div className="h-12 flex items-center justify-between px-4">
              <span className="font-bold text-xl tracking-tighter text-emerald-400">
                CMS
              </span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 text-zinc-400 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-zinc-900/50">
              <button
                onClick={() => setShowSignOutConfirm(true)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        </aside>
      )}

      <div className="flex-1 flex flex-col min-w-0 lg:pl-2 relative">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 px-4 py-2 border-b border-zinc-900/50 bg-[#09090b]/80 backdrop-blur-lg lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) setMobileSidebarOpen(true);
                else setSidebarOpen((prev) => !prev);
              }}
              className="p-2 lg:hidden text-zinc-400 hover:text-white"
              aria-label="Toggle navigation"
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            {parentRoute && (
              <Link
                href={parentRoute.href}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition-colors shrink-0"
                title={`Back to ${parentRoute.label}`}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">
                  Back to {parentRoute.label}
                </span>
                <span className="sm:hidden">Back</span>
              </Link>
            )}
            <nav
              aria-label="Breadcrumbs"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium"
            >
              <Link
                href="/cms/dashboard"
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                CMS
              </Link>
              {breadcrumbItems.map((crumb, idx) => {
                const isLast = idx === breadcrumbItems.length - 1;
                return (
                  <div key={crumb.href} className="flex items-center gap-1.5">
                    <ChevronRight
                      className="h-3 w-3 text-zinc-600 shrink-0"
                      aria-hidden="true"
                    />
                    {isLast ? (
                      <span className="text-zinc-200 font-semibold truncate max-w-[150px]">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-zinc-500 hover:text-zinc-300 transition-colors truncate max-w-[120px]"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-zinc-400 hover:text-white lg:hidden"
              aria-label="Notifications"
            >
              <MailIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-zinc-300 hover:bg-zinc-900/50 transition-colors focus:outline-none"
                aria-label="Open profile menu"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
              >
                <span className="hidden sm:inline">{user.name}</span>
                <UserCircle
                  className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700"
                  aria-hidden="true"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-800 bg-[#07070a] p-2 shadow-2xl z-50">
                  <div className="flex items-center gap-3 px-3 py-2 border-b border-zinc-900/50">
                    <div>
                      <p className="text-sm font-medium text-zinc-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <p className="px-2 text-xs text-zinc-500">Account</p>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setShowSignOutConfirm(true);
                      }}
                      className="w-full text-left text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg px-3 py-2 transition-colors cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>

      <SignOutConfirmDialog
        open={showSignOutConfirm}
        onOpenChange={setShowSignOutConfirm}
        onConfirm={handleLogout}
      />
    </div>
  );
}
