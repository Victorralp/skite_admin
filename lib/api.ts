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

export type AdminProductMetricsResponse = {
  totalProducts: number;
  totalProductsPercentageChange: number;
  activeProducts: number;
  activeToday: number;
  inactiveProducts: number;
  inactiveToday: number;
  rejectedProducts: number;
  rejectedToday: number;
};

export type AdminUserMetricValue = {
  count: number;
  percentage_change: number;
};

export type AdminUserFlaggedUsersMetric = {
  total_inactive: number;
  flagged_today: number;
};

export type AdminUserYetToSignupMetric = {
  count: number;
  percentage_change_vs_yesterday: number;
};

export type AdminUserMetricsData = {
  total_users: AdminUserMetricValue;
  active_users_30_days: AdminUserMetricValue;
  paying_users: AdminUserMetricValue;
  flagged_users: AdminUserFlaggedUsersMetric;
  yet_to_signup_users: AdminUserYetToSignupMetric;
};

export type AdminUserMetricsResponse = {
  message?: string;
  data: AdminUserMetricsData;
};

export type AdminCreatorMetricValue = {
  value: number;
  percentage_change?: number;
};

export type AdminCreatorFlaggedMetric = {
  value: number;
  flagged_today: number;
};

export type AdminCreatorPendingVerificationMetric = {
  value: number;
  created_today: number;
};

export type AdminCreatorMetricsData = {
  total_creators: AdminCreatorMetricValue;
  active_creators: AdminCreatorMetricValue;
  flagged_creators: AdminCreatorFlaggedMetric;
  pending_verifications: AdminCreatorPendingVerificationMetric;
};

export type AdminCreatorMetricsResponse = {
  message?: string;
  data?: AdminCreatorMetricsData;
};

export type AdminCreatorListingParams = {
  page?: number;
  limit?: number;
  minRevenue?: number;
  maxRevenue?: number;
  dateFrom?: string;
  dateTo?: string;
  hubStatus?: string;
  hubId?: string;
};

export type AdminCreatorListingItem = {
  _id?: string;
  id?: string;
  hub?: string | { _id?: string; id?: string; hubId?: string; hub_id?: string };
  hubId?: string;
  hub_id?: string;
  creatorId?: string;
  creator_id?: string;
  name?: string;
  avatar?: string;
  hub_name?: string;
  revenue_generated?: number;
  total_sales_count?: number;
  total_hub_participants?: number;
  hub_views?: number;
  last_active?: string;
  createdAt?: string;
  total_transaction_count?: number;
  active_products_count?: number;
  total_sessions?: number;
  hub_status?: string;
  status?: string;
  email?: string;
};

export type AdminCreatorListingPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type AdminCreatorListingResponse = {
  data: AdminCreatorListingItem[];
  pagination: AdminCreatorListingPagination;
  message?: string;
};

export type AdminProductListingItem = {
  _id?: string;
  id?: string;
  product?: string;
  product_id?: string;
  productName: string;
  productCover: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'BANNED' | string;
  creatorName: string;
  hubName: string;
  productType: string;
  createdAt: string;
  price: number;
  sales: number;
  revenue: number;
  productId?: string;
};

export type AdminProductListingParams = {
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'BANNED';
  hubOwnerName?: string;
  productType?: string;
  minPrice?: number;
  maxPrice?: number;
  minRevenue?: number;
  maxRevenue?: number;
  page?: number;
  limit?: number;
};

export type AdminUserListingParams = {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  purchases?: number;
  minSpend?: number;
  maxSpend?: number;
  status?: string;
  userId?: string;
};

export type AdminUserListingItem = {
  _id?: string;
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  joined_at?: string;
  purchases_count?: number;
  total_spent?: number;
  status?: string;
  last_active?: string;
  subscriptions_count?: number;
};

export type AdminUserListingPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type AdminUserListingResponse = {
  message?: string;
  users: AdminUserListingItem[];
  pagination: AdminUserListingPagination;
};

export type UserLogItem = {
  _id: string;
  activity: string;
  createdAt: string;
  user?: {
    _id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  };
};

export type UserLogsMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type UserLogsResponse = {
  message?: string;
  data: UserLogItem[];
  meta: UserLogsMeta;
};

export type AdminUserTransactionItem = {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  payment_provider?: string;
  provider_txn_id?: string;
  txn_url?: string;
  transactionDate: string;
  narration?: string;
  user?: {
    _id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    status?: string;
  };
  customer_email?: string;
  customer_first_name?: string;
  customer_last_name?: string;
  hub_name?: string;
};

export type AdminUserTransactionsPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export async function banAdminProduct(productId: string) {
  if (!productId) {
    throw new Error('PRODUCT_ID_REQUIRED');
  }

  let idToken: string | null = null;
  try {
    idToken = (await auth.currentUser?.getIdToken()) ?? null;
  } catch {
    idToken = null;
  }

  const headers: HeadersInit = { 'content-type': 'application/json' };
  if (idToken) {
    headers.authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(`${baseUrl()}/admin-product/${productId}/ban`, {
    method: 'PATCH',
    credentials: 'include',
    cache: 'no-store',
    headers
  });

  const json = (await response
    .json()
    .catch(() => null)) as { message?: string; error?: string } | null;

  if (!response.ok) {
    const message = json?.message ?? json?.error ?? 'PRODUCT_BAN_FAILED';
    throw new Error(message);
  }

  // Ban affects product listing caches; clear so next fetch is fresh.
  clearAdminDashboardSessionCache();

  return json?.message ?? 'Product banned successfully';
}

export async function banAdminUser(userId: string) {
  if (!userId) {
    throw new Error('USER_ID_REQUIRED');
  }

  let idToken: string | null = null;
  try {
    idToken = (await auth.currentUser?.getIdToken()) ?? null;
  } catch {
    idToken = null;
  }

  const headers: HeadersInit = { 'content-type': 'application/json' };
  if (idToken) {
    headers.authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(`${baseUrl()}/admin-user/${userId}/ban`, {
    method: 'PATCH',
    credentials: 'include',
    cache: 'no-store',
    headers
  });

  const json = (await response
    .json()
    .catch(() => null)) as { message?: string; error?: string } | null;

  if (!response.ok) {
    const message = json?.message ?? json?.error ?? 'USER_BAN_FAILED';
    throw new Error(message);
  }

  clearAdminDashboardSessionCache();

  return json?.message ?? 'User banned successfully';
}

export async function unbanAdminProduct(productId: string) {
  if (!productId) {
    throw new Error('PRODUCT_ID_REQUIRED');
  }

  let idToken: string | null = null;
  try {
    idToken = (await auth.currentUser?.getIdToken()) ?? null;
  } catch {
    idToken = null;
  }

  const headers: HeadersInit = { 'content-type': 'application/json' };
  if (idToken) {
    headers.authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(`${baseUrl()}/admin-product/${productId}/unban`, {
    method: 'PATCH',
    credentials: 'include',
    cache: 'no-store',
    headers
  });

  const json = (await response
    .json()
    .catch(() => null)) as { message?: string; error?: string } | null;

  if (!response.ok) {
    const message = json?.message ?? json?.error ?? 'PRODUCT_UNBAN_FAILED';
    throw new Error(message);
  }

  clearAdminDashboardSessionCache();

  return json?.message ?? 'Product unbanned successfully';
}

export async function unbanAdminUser(userId: string) {
  if (!userId) {
    throw new Error('USER_ID_REQUIRED');
  }

  let idToken: string | null = null;
  try {
    idToken = (await auth.currentUser?.getIdToken()) ?? null;
  } catch {
    idToken = null;
  }

  const headers: HeadersInit = { 'content-type': 'application/json' };
  if (idToken) {
    headers.authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(`${baseUrl()}/admin-user/${userId}/unban`, {
    method: 'PATCH',
    credentials: 'include',
    cache: 'no-store',
    headers
  });

  const json = (await response
    .json()
    .catch(() => null)) as { message?: string; error?: string } | null;

  if (!response.ok) {
    const message = json?.message ?? json?.error ?? 'USER_UNBAN_FAILED';
    throw new Error(message);
  }

  clearAdminDashboardSessionCache();

  return json?.message ?? 'User unbanned successfully';
}

export async function banAdminCreatorHub(hubId: string, reason: string) {
  if (!hubId) {
    throw new Error('HUB_ID_REQUIRED');
  }

  if (!reason || reason.trim().length === 0) {
    throw new Error('BAN_REASON_REQUIRED');
  }

  let idToken: string | null = null;
  try {
    idToken = (await auth.currentUser?.getIdToken()) ?? null;
  } catch {
    idToken = null;
  }

  const headers: HeadersInit = { 'content-type': 'application/json' };
  if (idToken) {
    headers.authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(`${baseUrl()}/admin-creator/ban`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers,
    body: JSON.stringify({ hubId, reason: reason.trim() })
  });

  const json = (await response
    .json()
    .catch(() => null)) as { success?: boolean; message?: string; error?: string } | null;

  if (!response.ok || json?.success === false) {
    const message = json?.message ?? json?.error ?? 'HUB_BAN_FAILED';
    throw new Error(message);
  }

  clearAdminDashboardSessionCache();

  return json?.message ?? 'Hub banned successfully';
}

export async function unbanAdminCreatorHub(hubId: string) {
  if (!hubId) {
    throw new Error('HUB_ID_REQUIRED');
  }

  let idToken: string | null = null;
  try {
    idToken = (await auth.currentUser?.getIdToken()) ?? null;
  } catch {
    idToken = null;
  }

  const headers: HeadersInit = { 'content-type': 'application/json' };
  if (idToken) {
    headers.authorization = `Bearer ${idToken}`;
  }

  const response = await fetch(`${baseUrl()}/admin-creator/unban`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-store',
    headers,
    body: JSON.stringify({ hubId })
  });

  const json = (await response
    .json()
    .catch(() => null)) as { success?: boolean; message?: string; error?: string } | null;

  if (!response.ok || json?.success === false) {
    const message = json?.message ?? json?.error ?? 'HUB_UNBAN_FAILED';
    throw new Error(message);
  }

  clearAdminDashboardSessionCache();

  return json?.message ?? 'Hub unbanned successfully';
}

export type ProductReviewItem = {
  _id: string;
  product: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  rating: number;
  review: string;
  createdAt: string;
};

export type ProductReviewDistribution = Record<string, number>;

export type ProductReviewPagination = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export type ProductReviewsResponse = {
  pagination: ProductReviewPagination;
  averageRating: number;
  distribution: ProductReviewDistribution;
  items: ProductReviewItem[];
};

export type ProductDetailResponse = {
  _id: string;
  product_name: string;
  product_description: string;
  product_cover: string;
  is_paid: boolean;
  exclusive_access?: boolean;
  currency: string;
  product_price: number;
  status: string;
  hub: string;
  product_category?: string;
  group_Id?: string;
  createdAt?: string;
  updatedAt?: string;
  creator?: string;
  contents?: Array<
    | string
    | {
        original?: string;
        type?: string;
        key?: string;
        status?: string;
      }
  >;
  sections?: Array<{
    name?: string;
    contents?: Array<{
      title?: string;
      type?: string;
      body?: string;
      fileData?: {
        original?: string;
        mp4?: string;
        m3u8?: string;
        type?: string;
        key?: string;
        status?: string;
      };
      file_data?: {
        original?: string;
        mp4?: string;
        m3u8?: string;
        type?: string;
        key?: string;
        status?: string;
      };
    }>;
  }>;
  averageRating?: number;
  ratingCount?: number;
  product_media?: string[];
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
const productDetailInFlightRequests = new Map<string, Promise<ProductDetailResponse>>();
const productDetailSessionCache = new Map<string, ProductDetailResponse>();
const productReviewsInFlightRequests = new Map<string, Promise<ProductReviewsResponse>>();

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
  productDetailSessionCache.clear();
  productDetailInFlightRequests.clear();
  productReviewsInFlightRequests.clear();
}

export function clearProductDetailCache(id?: string, currency?: 'NGN' | 'USD') {
  if (id && currency) {
    const key = `${id}:${currency}`;
    productDetailSessionCache.delete(key);
    productDetailInFlightRequests.delete(key);
    return;
  }

  productDetailSessionCache.clear();
  productDetailInFlightRequests.clear();
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

export async function getAdminProductMetrics() {
  const cacheKey = getDashboardCacheKey('product-metrics');
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

    const response = await fetch(`${baseUrl()}/admin-product/metrics`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers
    });

    const json = (await response
      .json()
      .catch(() => null)) as
      | AdminProductMetricsResponse
      | { message?: string; error?: string }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'PRODUCT_METRICS_FAILED';
      throw new Error(message);
    }

    if (!json || typeof json !== 'object') {
      throw new Error('PRODUCT_METRICS_INVALID_RESPONSE');
    }

    return json as AdminProductMetricsResponse;
  });
}

export async function getAdminUserMetrics() {
  const cacheKey = getDashboardCacheKey('user-metrics');
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

    const response = await fetch(`${baseUrl()}/admin-user/metric`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers
    });

    const json = (await response
      .json()
      .catch(() => null)) as
      | AdminUserMetricsResponse
      | AdminUserMetricsData
      | { message?: string; error?: string; data?: AdminUserMetricsData }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'USER_METRICS_FAILED';
      throw new Error(message);
    }

    if (!json || typeof json !== 'object') {
      throw new Error('USER_METRICS_INVALID_RESPONSE');
    }

    if ('data' in json && json.data && typeof json.data === 'object') {
      return json.data as AdminUserMetricsData;
    }

    return json as AdminUserMetricsData;
  });
}

export async function getAdminCreatorMetrics() {
  const cacheKey = getDashboardCacheKey('creator-metrics');
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

    const response = await fetch(`${baseUrl()}/admin-creator/creators/metrics`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers
    });

    const json = (await response
      .json()
      .catch(() => null)) as
      | AdminCreatorMetricsResponse
      | AdminCreatorMetricsData
      | { message?: string; error?: string; data?: AdminCreatorMetricsData }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'CREATOR_METRICS_FAILED';
      throw new Error(message);
    }

    if (!json || typeof json !== 'object') {
      throw new Error('CREATOR_METRICS_INVALID_RESPONSE');
    }

    if ('data' in json && json.data && typeof json.data === 'object') {
      return json.data as AdminCreatorMetricsData;
    }

    return json as AdminCreatorMetricsData;
  });
}

export async function getAdminCreators(params: AdminCreatorListingParams = {}) {
  const cacheKey = getDashboardCacheKey(`creators:${JSON.stringify(params)}`);
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

    const searchParams = new URLSearchParams();
    if (params.page !== undefined) searchParams.set('page', String(params.page));
    if (params.limit !== undefined) searchParams.set('limit', String(params.limit));
    if (params.minRevenue !== undefined) searchParams.set('minRevenue', String(params.minRevenue));
    if (params.maxRevenue !== undefined) searchParams.set('maxRevenue', String(params.maxRevenue));
    if (params.dateFrom) searchParams.set('dateFrom', params.dateFrom);
    if (params.dateTo) searchParams.set('dateTo', params.dateTo);
    if (params.hubStatus) searchParams.set('hubStatus', params.hubStatus);
    if (params.hubId) searchParams.set('hubId', params.hubId);

    const queryString = searchParams.toString();
    const response = await fetch(
      `${baseUrl()}/admin-creator/creators${queryString ? `?${queryString}` : ''}`,
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
      | AdminCreatorListingResponse
      | {
          data?: AdminCreatorListingItem[];
          pagination?: Partial<AdminCreatorListingPagination>;
          message?: string;
          error?: string;
        }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'CREATOR_LISTING_FAILED';
      throw new Error(message);
    }

    if (!json || typeof json !== 'object') {
      throw new Error('CREATOR_LISTING_INVALID_RESPONSE');
    }

    return {
      data: Array.isArray(json.data) ? json.data : [],
      pagination: {
        total: Number(json.pagination?.total ?? 0),
        page: Number(json.pagination?.page ?? params.page ?? 1),
        limit: Number(json.pagination?.limit ?? params.limit ?? 20),
        totalPages: Number(json.pagination?.totalPages ?? 1)
      }
    };
  });
}

export async function getAdminUsers(params: AdminUserListingParams = {}) {
  const cacheKey = getDashboardCacheKey(`users:${JSON.stringify(params)}`);
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

    const searchParams = new URLSearchParams();
    if (params.page !== undefined) searchParams.set('page', String(params.page));
    if (params.limit !== undefined) searchParams.set('limit', String(params.limit));
    if (params.startDate) searchParams.set('startDate', params.startDate);
    if (params.endDate) searchParams.set('endDate', params.endDate);
    if (params.purchases !== undefined) searchParams.set('purchases', String(params.purchases));
    if (params.minSpend !== undefined) searchParams.set('minSpend', String(params.minSpend));
    if (params.maxSpend !== undefined) searchParams.set('maxSpend', String(params.maxSpend));
    if (params.status) searchParams.set('status', params.status);
    if (params.userId) searchParams.set('userId', params.userId);

    const queryString = searchParams.toString();
    const response = await fetch(`${baseUrl()}/admin-user/list-users${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers
    });

    const json = (await response
      .json()
      .catch(() => null)) as
      | AdminUserListingResponse
      | { message?: string; error?: string; users?: AdminUserListingItem[]; pagination?: AdminUserListingPagination }
      | null;

    if (!response.ok) {
      const errorPayload = json as { message?: string; error?: string } | null;
      const message = errorPayload?.message ?? errorPayload?.error ?? 'USER_LISTING_FAILED';
      throw new Error(message);
    }

    if (!json || typeof json !== 'object') {
      throw new Error('USER_LISTING_INVALID_RESPONSE');
    }

    const users = Array.isArray(json.users) ? json.users : [];
    const pagination = json.pagination;
    if (!pagination || typeof pagination !== 'object') {
      throw new Error('USER_LISTING_PAGINATION_MISSING');
    }

    return {
      users,
      pagination: {
        total: Number((pagination as AdminUserListingPagination).total ?? 0),
        page: Number((pagination as AdminUserListingPagination).page ?? params.page ?? 1),
        limit: Number((pagination as AdminUserListingPagination).limit ?? params.limit ?? 10),
        totalPages: Number((pagination as AdminUserListingPagination).totalPages ?? 1),
        hasNext: Boolean((pagination as AdminUserListingPagination).hasNext),
        hasPrev: Boolean((pagination as AdminUserListingPagination).hasPrev)
      }
    };
  });
}

export async function getUserLogs(params: {
  user?: string;
  search?: string;
  page?: number;
  limit?: number;
} = {}) {
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

  const searchParams = new URLSearchParams();
  if (params.user) searchParams.set('user', params.user);
  if (params.search) searchParams.set('search', params.search);
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.limit !== undefined) searchParams.set('limit', String(params.limit));

  const queryString = searchParams.toString();
  const response = await fetch(`${baseUrl()}/user-logs${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers
  });

  const json = (await response
    .json()
    .catch(() => null)) as
    | UserLogsResponse
    | { message?: string; error?: string; data?: UserLogItem[]; meta?: Partial<UserLogsMeta> }
    | null;

  if (!response.ok) {
    const errorPayload = json as { message?: string; error?: string } | null;
    const message = errorPayload?.message ?? errorPayload?.error ?? 'USER_LOGS_FAILED';
    throw new Error(message);
  }

  if (!json || typeof json !== 'object') {
    throw new Error('USER_LOGS_INVALID_RESPONSE');
  }

  return {
    data: Array.isArray(json.data) ? json.data : [],
    meta: {
      total: Number(json.meta?.total ?? 0),
      page: Number(json.meta?.page ?? params.page ?? 1),
      limit: Number(json.meta?.limit ?? params.limit ?? 10),
      totalPages: Number(json.meta?.totalPages ?? 1)
    }
  };
}

export async function getAdminUserTransactions(params: {
  page?: number;
  limit?: number;
  customerId?: string;
  email?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
} = {}) {
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

  const searchParams = new URLSearchParams();
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.limit !== undefined) searchParams.set('limit', String(params.limit));
  if (params.customerId) searchParams.set('customerId', params.customerId);
  if (params.email) searchParams.set('email', params.email);
  if (params.status) searchParams.set('status', params.status);
  if (params.startDate) searchParams.set('startDate', params.startDate);
  if (params.endDate) searchParams.set('endDate', params.endDate);
  if (params.minAmount !== undefined) searchParams.set('minAmount', String(params.minAmount));
  if (params.maxAmount !== undefined) searchParams.set('maxAmount', String(params.maxAmount));

  const queryString = searchParams.toString();
  const response = await fetch(`${baseUrl()}/admin-user/transactions${queryString ? `?${queryString}` : ''}`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers
  });

  const json = (await response
    .json()
    .catch(() => null)) as
    | {
        transactions?: AdminUserTransactionItem[];
        pagination?: Partial<AdminUserTransactionsPagination>;
        message?: string;
        error?: string;
      }
    | null;

  if (!response.ok) {
    const message = json?.message ?? json?.error ?? 'USER_TRANSACTIONS_FAILED';
    throw new Error(message);
  }

  return {
    transactions: Array.isArray(json?.transactions) ? json.transactions : [],
    pagination: {
      total: Number(json?.pagination?.total ?? 0),
      page: Number(json?.pagination?.page ?? params.page ?? 1),
      limit: Number(json?.pagination?.limit ?? params.limit ?? 20),
      totalPages: Number(json?.pagination?.totalPages ?? 1),
      hasNext: Boolean(json?.pagination?.hasNext),
      hasPrev: Boolean(json?.pagination?.hasPrev)
    }
  };
}

export async function getAdminProductListing(
  params: AdminProductListingParams = {}
) {
  const cacheKey = getDashboardCacheKey(
    `product-listing:${JSON.stringify(params)}`
  );

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

    const buildSearchParams = (statusOverride?: string) => {
      const searchParams = new URLSearchParams();
      const statusValue = statusOverride ?? params.status;
      if (statusValue) searchParams.set('status', statusValue);
      if (params.hubOwnerName) searchParams.set('hubOwnerName', params.hubOwnerName);
      if (params.productType) searchParams.set('productType', params.productType);
      if (params.minPrice !== undefined) searchParams.set('minPrice', String(params.minPrice));
      if (params.maxPrice !== undefined) searchParams.set('maxPrice', String(params.maxPrice));
      if (params.minRevenue !== undefined) searchParams.set('minRevenue', String(params.minRevenue));
      if (params.maxRevenue !== undefined) searchParams.set('maxRevenue', String(params.maxRevenue));
      if (params.page !== undefined) searchParams.set('page', String(params.page));
      if (params.limit !== undefined) searchParams.set('limit', String(params.limit));
      return searchParams;
    };

    const extractList = (payload: unknown): AdminProductListingItem[] | null => {
      if (Array.isArray(payload)) return payload as AdminProductListingItem[];
      if (!payload || typeof payload !== 'object') return null;
      const obj = payload as Record<string, unknown>;
      if (Array.isArray(obj.items)) return obj.items as AdminProductListingItem[];
      if (Array.isArray(obj.data)) return obj.data as AdminProductListingItem[];
      if (Array.isArray(obj.results)) return obj.results as AdminProductListingItem[];
      return null;
    };

    const statusCandidates = params.status
      ? Array.from(new Set([params.status, params.status.toLowerCase()]))
      : [undefined];

    let lastErrorPayload: { message?: string; error?: string } | null = null;

    for (const statusCandidate of statusCandidates) {
      const queryString = buildSearchParams(statusCandidate).toString();
      const response = await fetch(
        `${baseUrl()}/admin-product/listing${queryString ? `?${queryString}` : ''}`,
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
        | AdminProductListingItem[]
        | { items?: AdminProductListingItem[]; data?: AdminProductListingItem[]; results?: AdminProductListingItem[]; message?: string; error?: string }
        | null;

      if (response.ok) {
        const extracted = extractList(json);
        if (!extracted) {
          throw new Error('PRODUCT_LISTING_INVALID_RESPONSE');
        }
        return extracted;
      }

      lastErrorPayload = json as { message?: string; error?: string } | null;
      // If first status format fails with validation-ish status, try alternate casing.
      if (response.status === 400 || response.status === 404 || response.status === 422) {
        continue;
      }
      const message = lastErrorPayload?.message ?? lastErrorPayload?.error ?? 'PRODUCT_LISTING_FAILED';
      throw new Error(message);
    }

    const message = lastErrorPayload?.message ?? lastErrorPayload?.error ?? 'PRODUCT_LISTING_FAILED';
    throw new Error(message);
  });
}

export async function getProductReviews(params: {
  product: string;
  page?: number;
  limit?: number;
}) {
  const { product, page = 1, limit = 10 } = params;
  if (!product) {
    throw new Error('PRODUCT_ID_REQUIRED');
  }

  const cacheKey = getDashboardCacheKey(
    `product-reviews:${product}:${page}:${limit}`
  );

  return withAdminDashboardSessionCache(cacheKey, async () => {
    const inFlightKey = `${product}:${page}:${limit}`;
    const existingRequest = productReviewsInFlightRequests.get(inFlightKey);
    if (existingRequest) {
      return existingRequest;
    }

    const request = (async () => {
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

    const searchParams = new URLSearchParams({
      product,
      page: String(page),
      limit: String(limit)
    });

    const reviewEndpoints = [
      `${baseUrl()}/product/list-product-reviews?${searchParams.toString()}`,
      `${baseUrl()}/product/list-reviews?${searchParams.toString()}`
    ];

    let lastErrorPayload: { message?: string; error?: string } | null = null;
    let successfulPayload: ProductReviewsResponse | null = null;

    for (const endpoint of reviewEndpoints) {
      const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
        headers
      });

      const json = (await response
        .json()
        .catch(() => null)) as ProductReviewsResponse | { message?: string; error?: string } | null;

      if (response.ok) {
        if (!json || typeof json !== 'object') {
          throw new Error('PRODUCT_REVIEWS_INVALID_RESPONSE');
        }
        successfulPayload = json as ProductReviewsResponse;
        break;
      }

      lastErrorPayload = json as { message?: string; error?: string } | null;
      if (response.status !== 404) {
        const message =
          lastErrorPayload?.message ?? lastErrorPayload?.error ?? 'PRODUCT_REVIEWS_FAILED';
        throw new Error(message);
      }
    }

    if (!successfulPayload) {
      const message =
        lastErrorPayload?.message ?? lastErrorPayload?.error ?? 'PRODUCT_REVIEWS_FAILED';
      throw new Error(message);
    }

    return successfulPayload;
    })();

    productReviewsInFlightRequests.set(inFlightKey, request);
    try {
      return await request;
    } finally {
      productReviewsInFlightRequests.delete(inFlightKey);
    }
  });
}

export async function getProductById(id: string, currency: 'NGN' | 'USD' = 'NGN') {
  if (!id) {
    throw new Error('PRODUCT_ID_REQUIRED');
  }

  const hasExpandedProductContent = (payload: ProductDetailResponse) =>
    (Array.isArray(payload.sections) && payload.sections.length > 0) ||
    (Array.isArray(payload.contents) && payload.contents.length > 0) ||
    (Array.isArray(payload.product_media) && payload.product_media.length > 0);

  const inFlightKey = `${id}:${currency}`;
  const cachedResponse = productDetailSessionCache.get(inFlightKey);
  // Revalidate sparse cached payloads to avoid sticking on a limited response shape.
  if (cachedResponse && hasExpandedProductContent(cachedResponse)) {
    return cachedResponse;
  }

  const existingRequest = productDetailInFlightRequests.get(inFlightKey);
  if (existingRequest) {
    return existingRequest;
  }

  const request = (async () => {
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

  const query = new URLSearchParams({ currency }).toString();
  const endpoints = [
    `${baseUrl()}/admin-product/${id}?${query}`,
    `${baseUrl()}/hub/product/${id}?${query}`,
    `${baseUrl()}/product/${id}?${query}`
  ];

  let successfulPayload: ProductDetailResponse | null = null;
  let lastErrorPayload: { message?: string; error?: string } | null = null;

  for (const endpoint of endpoints) {
    const response = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
      headers
    });

    const json = (await response.json().catch(() => null)) as
      | ProductDetailResponse
      | { message?: string; error?: string }
      | null;

    if (response.ok) {
      if (!json || typeof json !== 'object') {
        throw new Error('PRODUCT_FETCH_INVALID_RESPONSE');
      }
      const payload = json as ProductDetailResponse;
      successfulPayload = payload;
      if (hasExpandedProductContent(payload)) {
        break;
      }
      continue;
    }

    lastErrorPayload = json as { message?: string; error?: string } | null;
    if (response.status === 400 || response.status === 401 || response.status === 403 || response.status === 404 || response.status === 422) {
      continue;
    }
    const message = lastErrorPayload?.message ?? lastErrorPayload?.error ?? 'PRODUCT_FETCH_FAILED';
    throw new Error(message);
  }

  if (!successfulPayload) {
    const message = lastErrorPayload?.message ?? lastErrorPayload?.error ?? 'PRODUCT_FETCH_FAILED';
    throw new Error(message);
  }

  const payload = successfulPayload;
  productDetailSessionCache.set(inFlightKey, payload);
  return payload;
  })();

  productDetailInFlightRequests.set(inFlightKey, request);
  try {
    return await request;
  } finally {
    productDetailInFlightRequests.delete(inFlightKey);
  }
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
