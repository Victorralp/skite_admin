import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/authCookies';
import {
  BACKEND_SESSION_COOKIE_NAME,
  FRONTEND_SESSION_COOKIE_NAME
} from '@/lib/backendSession';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login') return NextResponse.next();
  if (pathname.startsWith('/auth')) return NextResponse.next();

  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const backendSession = request.cookies.get(BACKEND_SESSION_COOKIE_NAME)?.value;
  const frontendSession = request.cookies.get(FRONTEND_SESSION_COOKIE_NAME)?.value;

  // If the API is on a different domain (typical in dev), the backend cookie will not be present on the
  // frontend domain. Use a frontend marker cookie for navigation gating in that case.
  const apiBase = process.env.NEXT_PUBLIC_BASE_URL;
  if (apiBase) {
    try {
      const apiHost = new URL(apiBase).host;
      if (apiHost && apiHost !== request.nextUrl.host) {
        if (frontendSession) return NextResponse.next();

        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('next', pathname);
        return NextResponse.redirect(url);
      }
    } catch {
      // ignore invalid base url; fall back to cookie gating
    }
  }

  if (session || backendSession || frontendSession) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('next', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
