import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'portfolio_cms_session';

/**
 * Next.js 16 Proxy runs on the edge before route rendering.
 * Real authorization is enforced server-side in every route/action via `requireSession`.
 * The edge proxy only redirects unauthenticated requests on protected CMS routes.
 *
 * CRITICAL: We NEVER redirect from `/cms/login` to `/cms/dashboard` here based
 * solely on cookie presence, because an expired or invalid cookie will trigger
 * an infinite redirect loop (ERR_TOO_MANY_REDIRECTS) between /cms/login and /cms/dashboard.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Search engine indexing shield for all API endpoints
  if (pathname.startsWith('/api')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  const isCms = pathname.startsWith('/cms');
  const isLogin = pathname === '/cms/login';
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (!isCms) return NextResponse.next();

  // If visiting /cms/login, ALWAYS allow the login page to render.
  if (isLogin) {
    return NextResponse.next();
  }

  // Unauthenticated user accessing any CMS route other than login -> login.
  if (!hasSession) {
    return NextResponse.redirect(new URL('/cms/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*', '/api/:path*'],
};
