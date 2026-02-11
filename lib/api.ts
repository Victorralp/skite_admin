import { FRONTEND_SESSION_COOKIE_NAME } from '@/lib/backendSession';
import { clearDashboardUiState } from '@/lib/dashboardUiState';
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

export type RevenueTrendFilter =
  | 'today'
  | 'yesterday'
  | 'week'
  | 'month'
  | 'six_months';

export type AdminDashboardRevenueTrendPoint = {
  _id: string;
  revenue: number;
};

export type AdminDashboardTransactionVolumePoint = {
  _id: {
    day: string;
    hour: number;
  };
  totalValue: number;
};

export type AdminDashboardRevenueBreakdownPoint = {
  item_type: string;
  revenue: number;
  percentage: number;
};

const adminDashboardSessionCache = new Map<string, unknown>();
const adminDashboardInFlightRequests = new Map<string, Promise<unknown>>();

function getSessionUserKey() {
  return auth.currentUser?.uid ?? 'anonymous';
}

function getDashboardCacheKey(scope: string) {
  return `${getSessionUserKey()}:${scope}`;
}

async function withAdminDashboardSessionCache<T>(
  cacheKey: string,
  fetcher: () => Promise<T>
): Promise<T> {
  if (adminDashboardSessionCache.has(cacheKey)) {
    return adminDashboardSessionCache.get(cacheKey) as T;
  }

  const inFlight = adminDashboardInFlightRequests.get(cacheKey) as Promise<T> | undefined;
  if (inFlight) {
    return inFlight;
  }

  const request = fetcher()
    .then((result) => {
      adminDashboardSessionCache.set(cacheKey, result);
      adminDashboardInFlightRequests.delete(cacheKey);
      return result;
    })
    .catch((error) => {
      adminDashboardInFlightRequests.delete(cacheKey);
      throw error;
    });

  adminDashboardInFlightRequests.set(cacheKey, request as Promise<unknown>);
  return request;
}

export function clearAdminDashboardSessionCache() {
  adminDashboardSessionCache.clear();
  adminDashboardInFlightRequests.clear();
}

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

  clearAdminDashboardSessionCache();
  clearDashboardUiState();
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

  const root = json && typeof json === 'object' ? json : {};
  const nestedData = root.data && typeof root.data === 'object' ? root.data : {};
  const nestedUser = root.user && typeof root.user === 'object' ? root.user : {};

  const merged = { ...root, ...nestedData, ...nestedUser } as any;
  const firstName = merged.first_name ?? merged.firstName ?? '';
  const lastName = merged.last_name ?? merged.lastName ?? '';
  const fullName =
    merged.name ??
    [firstName, lastName].filter((part: string) => Boolean(part && String(part).trim())).join(' ').trim();

  return {
    ...merged,
    id: merged.id ?? merged._id ?? merged.user_id ?? merged.uid ?? null,
    name: fullName || null,
    email: merged.email ?? null,
    username: merged.username ?? null,
    phone: merged.phone ?? merged.phone_number ?? null,
    avatar: merged.avatar ?? merged.picture ?? merged.photoUrl ?? merged.photo_url ?? null
  };
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
    clearAdminDashboardSessionCache();
    clearDashboardUiState();
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
  const cacheKey = getDashboardCacheKey('metrics');
  return withAdminDashboardSessionCache(cacheKey, async () => {
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
  });
}

export async function getAdminDashboardRevenueTrend(
  filter: RevenueTrendFilter = 'today'
) {
  const cacheKey = getDashboardCacheKey(`revenue-trend:${filter}`);
  return withAdminDashboardSessionCache(cacheKey, async () => {
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

    const params = new URLSearchParams({ filter });
    const response = await fetch(
      `${baseUrl()}/admin-dashboard/revenue-trend?${params.toString()}`,
      {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers
      }
    );

    const json = (await response
      .json()
      .catch(() => null)) as
      | AdminDashboardRevenueTrendPoint[]
      | { message?: string; error?: string }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'REVENUE_TREND_FAILED';
      throw new Error(message);
    }

    if (!Array.isArray(json)) {
      throw new Error('REVENUE_TREND_INVALID_RESPONSE');
    }

    return json as AdminDashboardRevenueTrendPoint[];
  });
}

export async function getAdminDashboardTransactionVolume(
  filter: RevenueTrendFilter = 'today'
) {
  const cacheKey = getDashboardCacheKey(`transaction-volume:${filter}`);
  return withAdminDashboardSessionCache(cacheKey, async () => {
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

    const params = new URLSearchParams({ filter });
    const response = await fetch(
      `${baseUrl()}/admin-dashboard/transaction-volume?${params.toString()}`,
      {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers
      }
    );

    const json = (await response
      .json()
      .catch(() => null)) as
      | AdminDashboardTransactionVolumePoint[]
      | { message?: string; error?: string }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'TRANSACTION_VOLUME_FAILED';
      throw new Error(message);
    }

    if (!Array.isArray(json)) {
      throw new Error('TRANSACTION_VOLUME_INVALID_RESPONSE');
    }

    return json as AdminDashboardTransactionVolumePoint[];
  });
}

export async function getAdminDashboardRevenueBreakdown(
  filter: RevenueTrendFilter = 'today'
) {
  const cacheKey = getDashboardCacheKey(`revenue-breakdown:${filter}`);
  return withAdminDashboardSessionCache(cacheKey, async () => {
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

    const params = new URLSearchParams({ filter });
    const response = await fetch(
      `${baseUrl()}/admin-dashboard/revenue-breakdown?${params.toString()}`,
      {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers
      }
    );

    const json = (await response
      .json()
      .catch(() => null)) as
      | AdminDashboardRevenueBreakdownPoint[]
      | { message?: string; error?: string }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'REVENUE_BREAKDOWN_FAILED';
      throw new Error(message);
    }

    if (!Array.isArray(json)) {
      throw new Error('REVENUE_BREAKDOWN_INVALID_RESPONSE');
    }

    return json as AdminDashboardRevenueBreakdownPoint[];
  });
}
