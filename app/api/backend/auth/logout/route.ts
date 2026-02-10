import { NextResponse } from 'next/server';
import { BACKEND_SESSION_COOKIE_NAME } from '@/lib/backendSession';
import { remoteUrl } from '@/lib/remoteApi';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from '@/lib/authCookies';

export const runtime = 'nodejs';

export async function POST() {
  const jar = await cookies();
  const backendSession = jar.get(BACKEND_SESSION_COOKIE_NAME)?.value ?? null;

  if (backendSession) {
    await fetch(remoteUrl('/auth/logout'), {
      method: 'POST',
      headers: {
        cookie: `skite_session=${encodeURIComponent(backendSession)}`
      }
    }).catch(() => null);
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(BACKEND_SESSION_COOKIE_NAME, '', { path: '/', maxAge: 0 });
  response.cookies.set(SESSION_COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return response;
}

