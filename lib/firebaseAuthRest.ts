import { requiredEnv } from '@/lib/env';

export type FirebasePasswordSignInResponse = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string; // seconds as string
  localId: string;
  registered?: boolean;
};

export async function signInWithEmailPassword(email: string, password: string) {
  const apiKey = requiredEnv('FIREBASE_WEB_API_KEY');

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    }
  );

  const json = (await response.json()) as unknown;

  if (!response.ok) {
    const message =
      typeof json === 'object' &&
      json !== null &&
      'error' in json &&
      typeof (json as any).error?.message === 'string'
        ? (json as any).error.message
        : 'AUTH_FAILED';
    throw new Error(message);
  }

  return json as FirebasePasswordSignInResponse;
}

export type FirebaseAccountsLookupResponse = {
  users?: Array<{
    localId: string;
    email?: string;
    displayName?: string;
    photoUrl?: string;
    emailVerified?: boolean;
    disabled?: boolean;
  }>;
};

export async function lookupAccount(idToken: string) {
  const apiKey = requiredEnv('FIREBASE_WEB_API_KEY');

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ idToken })
    }
  );

  const json = (await response.json()) as unknown;

  if (!response.ok) {
    const message =
      typeof json === 'object' &&
      json !== null &&
      'error' in json &&
      typeof (json as any).error?.message === 'string'
        ? (json as any).error.message
        : 'INVALID_TOKEN';
    throw new Error(message);
  }

  const data = json as FirebaseAccountsLookupResponse;
  const user = data.users?.[0] ?? null;
  if (!user) throw new Error('INVALID_TOKEN');
  return user;
}
