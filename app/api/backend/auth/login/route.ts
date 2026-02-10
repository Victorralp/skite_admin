import { NextResponse } from 'next/server';
import { signInWithEmailPassword } from '@/lib/firebaseAuthRest';
import { BACKEND_SESSION_COOKIE_NAME } from '@/lib/backendSession';
import { SESSION_COOKIE_NAME } from '@/lib/authCookies';
import { extractCookieValue, remoteUrl } from '@/lib/remoteApi';

export const runtime = 'nodejs';

type LoginBody = { email?: string; password?: string; deviceToken?: string; platform?: string };

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  const email = (body.email ?? '').trim();
  const password = body.password ?? '';
  const deviceToken = body.deviceToken ?? '';
  const platform = body.platform ?? 'web';

  if (!email || !password) {
    return NextResponse.json(
      { error: 'EMAIL_AND_PASSWORD_REQUIRED' },
      { status: 400 }
    );
  }

  try {
    const signIn = await signInWithEmailPassword(email, password);

    const upstream = await fetch(remoteUrl('/auth/login'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        idToken: signIn.idToken,
        deviceToken,
        platform
      })
    });

    const json = (await upstream.json().catch(() => null)) as any;

    if (!upstream.ok) {
      return NextResponse.json(
        { error: json?.message ?? json?.error ?? 'UPSTREAM_LOGIN_FAILED' },
        { status: upstream.status }
      );
    }

    const upstreamSetCookie = upstream.headers.get('set-cookie');
    const backendSession = extractCookieValue(upstreamSetCookie, 'skite_session');

    const response = NextResponse.json(json ?? { ok: true }, { status: 200 });

    // Store Firebase idToken locally for middleware gating (short-lived).
    response.cookies.set(SESSION_COOKIE_NAME, signIn.idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: Number(signIn.expiresIn) || 3600
    });

    // Store backend session locally so subsequent proxy requests can forward it upstream.
    if (backendSession) {
      response.cookies.set(BACKEND_SESSION_COOKIE_NAME, backendSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60
      });
    }

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AUTH_FAILED';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

