'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertTriangle, Loader2 } from 'lucide-react';
import { login as loginAction } from '@/app/cms/actions/auth';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '');

    setServerError(null);

    if (!email || !password) {
      setServerError('Email and password are required.');
      return;
    }

    setPending(true);
    try {
      // `loginAction` is a Server Action: redirects to dashboard on success,
      // returns { error } on failure (no redirect thrown).
      const result = await loginAction(formData);
      if (result && typeof result === 'object' && 'error' in result) {
        setServerError(String((result as { error: string }).error));
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-[92dvh] items-center justify-center bg-[#09090b] text-zinc-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Sign In</h1>
          <p className="text-zinc-400 text-sm mt-1">Portfolio CMS — secure access only</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#07070a]/80 p-6 shadow-2xl">
          {serverError && (
            <div className="mb-4 rounded-md bg-rose-500/10 border border-rose-500/20 px-4 py-3 text-sm text-rose-200" role="alert">
              <AlertTriangle className="mr-2 h-4 w-4" aria-hidden="true" />
              {serverError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-medium text-zinc-400">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  placeholder="you@domain.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-medium text-zinc-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full pl-9 pr-9 py-2.5 rounded-lg border border-zinc-700 bg-[#09090b] text-zinc-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-black bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(155,243,90,0.25)]"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              Sign In
            </button>
          </form>
         
        </div>
      </div>
    </div>
  );
}

