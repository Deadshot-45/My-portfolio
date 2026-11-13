import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE = 'portfolio_cms_session';

/**
 * Middleware provides UX-level redirects for CMS routes.
 * Real authorization is enforced server-side in every route/action via `requireSession`.
 * The session cookie itself is validated against the database on each protected request,
 * so a stolen/expired cookie cannot bypass authorization.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isCms = pathname.startsWith('/cms');
  const isLogin = pathname === '/cms/login';
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (!isCms) return NextResponse.next();

  // Authenticated user trying to open the login page -> dashboard.
  if (isLogin && hasSession) {
    return NextResponse.redirect(new URL('/cms/dashboard', request.url));
  }

  // Unauthenticated user accessing any CMS route other than login -> login.
  if (!isLogin && !hasSession) {
    return NextResponse.redirect(new URL('/cms/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cms/:path*'],
};
