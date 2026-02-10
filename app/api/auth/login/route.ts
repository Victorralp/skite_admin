import { NextResponse } from 'next/server';
import { lookupAccount, signInWithEmailPassword } from '@/lib/firebaseAuthRest';
import { SESSION_COOKIE_NAME } from '@/lib/authCookies';

export const runtime = 'nodejs';

type LoginBody =
  | { email?: string; password?: string; idToken?: never }
  | { idToken?: string; email?: never; password?: never };

export async function POST(request: Request) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  try {
    const idToken =
      'idToken' in body && body.idToken
        ? body.idToken
        : await (async () => {
            const email = (('email' in body ? body.email : '') ?? '').trim();
            const password = ('password' in body ? body.password : '') ?? '';

            if (!email || !password) {
              throw new Error('EMAIL_AND_PASSWORD_REQUIRED');
            }

            const signIn = await signInWithEmailPassword(email, password);
            return signIn.idToken;
          })();

    const user = await lookupAccount(idToken);

    const response = NextResponse.json(
      {
        ok: true,
        uid: user.localId,
        idToken,
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

    // Token-based mode: store Firebase idToken in the cookie so middleware can gate pages.
    // Note: idTokens expire quickly (~1h). For long-lived sessions, switch to Firebase Admin session cookies.
    response.cookies.set(SESSION_COOKIE_NAME, idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AUTH_FAILED';
    const isMissingEnv = message.startsWith('Missing required environment variable:');
    const status = isMissingEnv
      ? 500
      : message === 'EMAIL_AND_PASSWORD_REQUIRED'
        ? 400
        : 401;
    const safeMessage =
      isMissingEnv && process.env.NODE_ENV === 'production'
        ? 'SERVER_MISCONFIGURED'
        : message;
    return NextResponse.json({ error: safeMessage }, { status });
  }
}
