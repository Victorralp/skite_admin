import { requiredEnv } from '@/lib/env';

export function remoteBaseUrl() {
  return requiredEnv('NEXT_PUBLIC_BASE_URL').replace(/\/+$/, '');
}

export function remoteUrl(pathname: string) {
  const base = remoteBaseUrl();
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function extractCookieValue(setCookieHeader: string | null, cookieName: string) {
  if (!setCookieHeader) return null;
  const needle = `${cookieName}=`;
  const idx = setCookieHeader.indexOf(needle);
  if (idx < 0) return null;
  const start = idx + needle.length;
  const end = setCookieHeader.indexOf(';', start);
  const value = (end >= 0 ? setCookieHeader.slice(start, end) : setCookieHeader.slice(start)).trim();
  return value || null;
}

