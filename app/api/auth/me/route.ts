import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/authCookies';
import { lookupAccount } from '@/lib/firebaseAuthRest';

export const runtime = 'nodejs';

function bearerToken(request: Request) {
  const header = request.headers.get('authorization') ?? '';
  if (!header.toLowerCase().startsWith('bearer ')) return null;
  return header.slice('bearer '.length).trim() || null;
}

export async function GET(request: Request) {
  try {
    const token = bearerToken(request);
    const cookieHeader = request.headers.get('cookie') ?? '';
    const match = cookieHeader.match(
      new RegExp(`(?:^|;\\s*)${SESSION_COOKIE_NAME}=([^;]+)`)
    );
    const sessionCookie = match?.[1] ? decodeURIComponent(match[1]) : null;

    const idToken = token ?? sessionCookie;
    if (!idToken) {
      return NextResponse.json(
        { ok: false, error: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    const user = await lookupAccount(idToken);
    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.localId,
          email: user.email ?? null,
          name: user.displayName ?? null,
          avatar: user.photoUrl ?? null,
          emailVerified: user.emailVerified ?? null
        }
      },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'UNAUTHENTICATED';
    const isMissingEnv = message.startsWith('Missing required environment variable:');
    const status = isMissingEnv ? 500 : 401;
    const safeMessage =
      isMissingEnv && process.env.NODE_ENV === 'production'
        ? 'SERVER_MISCONFIGURED'
        : message;
    return NextResponse.json({ ok: false, error: safeMessage }, { status });
  }
}
