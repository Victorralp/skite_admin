import { NextResponse } from 'next/server';
import { BACKEND_SESSION_COOKIE_NAME } from '@/lib/backendSession';
import { remoteUrl } from '@/lib/remoteApi';
import { cookies } from 'next/headers';

export const runtime = 'nodejs';

export async function GET() {
  const jar = await cookies();
  const backendSession = jar.get(BACKEND_SESSION_COOKIE_NAME)?.value;

  if (!backendSession) {
    return NextResponse.json({ error: 'UNAUTHENTICATED' }, { status: 401 });
  }

  const upstream = await fetch(remoteUrl('/auth/whoami'), {
    headers: {
      cookie: `skite_session=${encodeURIComponent(backendSession)}`
    }
  });

  const json = (await upstream.json().catch(() => null)) as any;
  return NextResponse.json(json ?? {}, { status: upstream.status });
}

