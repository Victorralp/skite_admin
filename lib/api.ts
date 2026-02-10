import { FRONTEND_SESSION_COOKIE_NAME } from '@/lib/backendSession';
import { auth } from '@/lib/firebaseClient';

type LoginResponse = {
  message?: string;
  user?: {
    id: string;
    email?: string;
    name?: string;
    role?: string;
    avatar?: string;
  };
};

export type PermissionLevel = 'none' | 'read' | 'write' | 'both';

export type AdminRole = 'Super Admin' | 'Admin' | 'Moderator' | 'Viewer' | 'User';

export type AdminPermissions = {
  live_tools?: PermissionLevel;
  payout?: PermissionLevel;
  products?: PermissionLevel;
  revenue_view?: PermissionLevel;
  dashboard?: PermissionLevel;
  global_settings?: PermissionLevel;
  logs?: PermissionLevel;
  creators?: PermissionLevel;
  users?: PermissionLevel;
  events?: PermissionLevel;
  support_center?: PermissionLevel;
  notifications?: PermissionLevel;
  settings?: PermissionLevel;
};

export type CreateAdminPayload = {
  email: string;
  first_name: string;
  last_name: string;
  role: AdminRole;
  permissions?: AdminPermissions;
};

export type DashboardMetricTrend = 'up' | 'down' | 'no_change' | 'increase' | 'decrease';

export type DashboardMetricValue = {
  value: number;
  percentage_change: number;
  trend: DashboardMetricTrend | string;
};

export type AdminDashboardMetricsResponse = {
  currency: string;
  total_platform_revenue: DashboardMetricValue;
  processed_revenue: DashboardMetricValue;
  active_creators: DashboardMetricValue;
  total_users: DashboardMetricValue;
  total_products: DashboardMetricValue;
};

function baseUrl() {
  // In client bundles, Next.js only inlines statically referenced NEXT_PUBLIC_* env vars.
  const value = process.env.NEXT_PUBLIC_BASE_URL;
  if (!value) {
    throw new Error(
      'Missing env var: NEXT_PUBLIC_BASE_URL (set it in .env.local and restart dev server)'
    );
  }
  return value.replace(/\/+$/, '');
}

function setFrontendSessionMarker() {
  if (typeof document === 'undefined') return;
  document.cookie = `${FRONTEND_SESSION_COOKIE_NAME}=1; Path=/; Max-Age=604800; SameSite=Lax`;
}

function clearFrontendSessionMarker() {
  if (typeof document === 'undefined') return;
  document.cookie = `${FRONTEND_SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export async function loginWithBackend(params: {
  idToken: string;
  platform?: 'web' | 'ios' | 'android';
  deviceToken?: string;
}) {
  const response = await fetch(`${baseUrl()}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      idToken: params.idToken,
      platform: params.platform ?? 'web',
      deviceToken: params.deviceToken ?? ''
    }),
    // Cookie notes:
    // - Backend must return: Access-Control-Allow-Credentials: true
    // - Access-Control-Allow-Origin must be the exact frontend origin (not "*")
    // - If API domain differs from frontend domain, cookie likely needs SameSite=None; Secure
    // - Secure cookies require HTTPS (localhost HTTP may not store them)
    credentials: 'include'
  });

  const json = (await response.json().catch(() => null)) as LoginResponse | null;

  if (!response.ok) {
    const message = (json as any)?.message ?? (json as any)?.error ?? 'LOGIN_FAILED';
    throw new Error(message);
  }

  setFrontendSessionMarker();
  return json;
}

export async function getMe() {
  const response = await fetch(`${baseUrl()}/auth/whoami`, {
    credentials: 'include'
  });

  const json = (await response.json().catch(() => null)) as any;
  if (!response.ok) {
    if (response.status === 401) clearFrontendSessionMarker();
    const message = json?.message ?? json?.error ?? 'UNAUTHENTICATED';
    throw new Error(message);
  }
  return json;
}

export async function logoutFromBackend() {
  try {
    const response = await fetch(`${baseUrl()}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });

    const json = (await response.json().catch(() => null)) as any;
    if (!response.ok) {
      const message = json?.message ?? json?.error ?? 'LOGOUT_FAILED';
      throw new Error(message);
    }
    return json;
  } finally {
    clearFrontendSessionMarker();
  }
}

export async function createAdmin(payload: CreateAdminPayload) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('UNAUTHORIZED: Sign in again to create an admin.');
  }

  const idToken = await currentUser.getIdToken();

  const response = await fetch(`${baseUrl()}/auth/create-admin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({
      email: payload.email.trim().toLowerCase(),
      first_name: payload.first_name.trim(),
      last_name: payload.last_name.trim(),
      role: payload.role,
      ...(payload.permissions ? { permissions: payload.permissions } : {})
    })
  });

  const json = (await response.json().catch(() => null)) as any;
  if (!response.ok) {
    const message = json?.message ?? json?.error ?? 'CREATE_ADMIN_FAILED';
    throw new Error(message);
  }

  return json;
}

export async function getAdminDashboardMetrics() {
  let idToken: string | null = null;
  try {
    idToken = (await auth.currentUser?.getIdToken()) ?? null;
  } catch {
    idToken = null;
  }

  const headers: HeadersInit = {};
  if (idToken) {
    headers.authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(`${baseUrl()}/admin-dashboard/metric`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers
  });

  const json = (await response
    .json()
    .catch(() => null)) as AdminDashboardMetricsResponse | { message?: string; error?: string } | null;

  if (!response.ok) {
    const errorPayload = json as { message?: string; error?: string } | null;
    const message = errorPayload?.message ?? errorPayload?.error ?? 'DASHBOARD_METRICS_FAILED';
    throw new Error(message);
  }

  if (!json) {
    throw new Error('DASHBOARD_METRICS_EMPTY_RESPONSE');
  }

  return json as AdminDashboardMetricsResponse;
}
