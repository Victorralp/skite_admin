'use client';

import { useState, useEffect, useRef } from 'react';
import StatsCard from '@/components/StatsCard';
import UserDetailModal from '@/components/UserDetailModal';
import ActionMenu from '@/components/ActionMenu';
import { MoreVertical } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { User } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import {
  banAdminUser,
  getAdminUserMetrics,
  getAdminUsers,
  unbanAdminUser,
  type AdminUserListingItem,
  type AdminUserMetricsData
} from '@/lib/api';

const FilterPlusIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4.09998 5.8501H7.59998M5.84998 4.1001V7.6001M0.599976 5.8501C0.599976 6.53954 0.735771 7.22223 0.999608 7.85919C1.26345 8.49614 1.65016 9.0749 2.13766 9.56241C2.62517 10.0499 3.20393 10.4366 3.84089 10.7005C4.47785 10.9643 5.16054 11.1001 5.84998 11.1001C6.53942 11.1001 7.2221 10.9643 7.85906 10.7005C8.49602 10.4366 9.07478 10.0499 9.56229 9.56241C10.0498 9.0749 10.4365 8.49614 10.7003 7.85919C10.9642 7.22223 11.1 6.53954 11.1 5.8501C11.1 4.45771 10.5469 3.12235 9.56229 2.13779C8.57772 1.15322 7.24236 0.600098 5.84998 0.600098C4.45759 0.600098 3.12223 1.15322 2.13766 2.13779C1.1531 3.12235 0.599976 4.45771 0.599976 5.8501Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SlidersHorizontalIcon = ({ className }: { className?: string }) => (
  <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M7.5 7.5V0.5M7.5 0.5L9.83333 2.90625M7.5 0.5L5.16667 2.90625M2.83333 0.5V7.5M2.83333 7.5L5.16667 5.09375M2.83333 7.5L0.5 5.09375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function UsersPage() {
  const [dateJoinedFilterActive, setDateJoinedFilterActive] = useState(false);
  const [purchaseCountFilterActive, setPurchaseCountFilterActive] = useState(false);
  const [spendFilterActive, setSpendFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [dateJoinedFrom, setDateJoinedFrom] = useState('');
  const [dateJoinedTo, setDateJoinedTo] = useState('');
  const [appliedDateJoinedFrom, setAppliedDateJoinedFrom] = useState('');
  const [appliedDateJoinedTo, setAppliedDateJoinedTo] = useState('');
  const [purchaseCountValue, setPurchaseCountValue] = useState('');
  const [appliedPurchaseCountValue, setAppliedPurchaseCountValue] = useState('');
  const [spendMinValue, setSpendMinValue] = useState('');
  const [spendMaxValue, setSpendMaxValue] = useState('');
  const [appliedSpendMinValue, setAppliedSpendMinValue] = useState('');
  const [appliedSpendMaxValue, setAppliedSpendMaxValue] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [hasUsersError, setHasUsersError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  });
  const [stats, setStats] = useState<Array<{
    title: string;
    value: string;
    trend: string;
    trendDirection: 'up' | 'down' | 'neutral';
  }>>([]);
  const [isMetricsLoading, setIsMetricsLoading] = useState(true);
  const [hasMetricsError, setHasMetricsError] = useState(false);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const snackbarTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const dateJoinedFilterRef = useRef<HTMLDivElement>(null);
  const purchaseCountFilterRef = useRef<HTMLDivElement>(null);
  const spendFilterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateJoinedFilterRef.current && !dateJoinedFilterRef.current.contains(event.target as Node)) {
        setDateJoinedFilterActive(false);
      }
      if (purchaseCountFilterRef.current && !purchaseCountFilterRef.current.contains(event.target as Node)) {
        setPurchaseCountFilterActive(false);
      }
      if (spendFilterRef.current && !spendFilterRef.current.contains(event.target as Node)) {
        setSpendFilterActive(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const formatCount = (value: number) =>
      new Intl.NumberFormat('en-NG').format(Number.isFinite(value) ? value : 0);

    const resolveDirection = (value: number): 'up' | 'down' | 'neutral' => {
      if (value > 0) return 'up';
      if (value < 0) return 'down';
      return 'neutral';
    };

    const formatPercentTrend = (value: number, suffix: string) => {
      const normalized = Number.isFinite(value) ? value : 0;
      const prefix = normalized > 0 ? '+' : '';
      return `${prefix}${normalized}% ${suffix}`;
    };

    const mapMetrics = (data: AdminUserMetricsData) => [
      {
        title: 'Total Users',
        value: formatCount(data.total_users?.count ?? 0),
        trend: formatPercentTrend(data.total_users?.percentage_change ?? 0, 'from last month'),
        trendDirection: resolveDirection(data.total_users?.percentage_change ?? 0)
      },
      {
        title: 'Active Users (Last 30 Days)',
        value: formatCount(data.active_users_30_days?.count ?? 0),
        trend: formatPercentTrend(
          data.active_users_30_days?.percentage_change ?? 0,
          'from previous 30 days'
        ),
        trendDirection: resolveDirection(data.active_users_30_days?.percentage_change ?? 0)
      },
      {
        title: 'Paying Users',
        value: formatCount(data.paying_users?.count ?? 0),
        trend: formatPercentTrend(data.paying_users?.percentage_change ?? 0, 'from last month'),
        trendDirection: resolveDirection(data.paying_users?.percentage_change ?? 0)
      },
      {
        title: 'Flagged Users',
        value: formatCount(data.flagged_users?.total_inactive ?? 0),
        trend: `+${Number(data.flagged_users?.flagged_today ?? 0)} today`,
        trendDirection: 'down' as const
      },
      {
        title: 'Yet To Signup Users',
        value: formatCount(data.yet_to_signup_users?.count ?? 0),
        trend: formatPercentTrend(
          data.yet_to_signup_users?.percentage_change_vs_yesterday ?? 0,
          'vs yesterday'
        ),
        trendDirection: resolveDirection(
          data.yet_to_signup_users?.percentage_change_vs_yesterday ?? 0
        )
      }
    ];

    const fetchMetrics = async () => {
      try {
        const response = await getAdminUserMetrics();
        if (!isMounted) return;
        setStats(mapMetrics(response));
        setHasMetricsError(false);
      } catch {
        if (!isMounted) return;
        setStats([]);
        setHasMetricsError(true);
      } finally {
        if (isMounted) {
          setIsMetricsLoading(false);
        }
      }
    };

    fetchMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  const showSnackbar = (type: 'success' | 'error', message: string) => {
    setSnackbar({ type, message });
    if (snackbarTimeoutRef.current) {
      clearTimeout(snackbarTimeoutRef.current);
    }
    snackbarTimeoutRef.current = setTimeout(() => {
      setSnackbar(null);
      snackbarTimeoutRef.current = null;
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (snackbarTimeoutRef.current) {
        clearTimeout(snackbarTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const parseNumber = (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return undefined;
      const parsed = Number(trimmed);
      return Number.isFinite(parsed) ? parsed : undefined;
    };

    const normalizeStatus = (value?: string): User['status'] => {
      const normalized = String(value ?? '').trim().toLowerCase();
      if (normalized === 'inactive' || normalized === 'banned' || normalized === 'suspended') {
        return 'Inactive';
      }
      if (normalized === 'pending') return 'Pending';
      return 'Active';
    };

    const formatDate = (value?: string) => {
      if (!value) return '—';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '—';
      return date.toLocaleDateString('en-NG');
    };

    const formatDateTime = (value?: string) => {
      if (!value) return '—';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '—';
      return date.toLocaleString('en-NG', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    const mapUser = (entry: AdminUserListingItem, index: number): User => {
      const fallbackId = `${entry.name ?? 'user'}-${entry.joined_at ?? index}-${index}`;
      return {
        id: String(entry.id ?? entry._id ?? fallbackId),
        name: entry.name ?? 'Unknown User',
        username: entry.username ?? (entry.email ? `@${entry.email.split('@')[0]}` : '@unknown'),
        email: entry.email ?? '',
        avatar: entry.avatar ?? '',
        joined: formatDate(entry.joined_at),
        purchases: Number(entry.purchases_count ?? 0),
        spent: Number(entry.total_spent ?? 0),
        subscriptions: Number(entry.subscriptions_count ?? 0),
        lastActive: formatDateTime(entry.last_active),
        status: normalizeStatus(entry.status)
      };
    };

    const fetchUsers = async () => {
      setIsUsersLoading(true);
      try {
        const response = await getAdminUsers({
          page: currentPage,
          limit: 10,
          startDate: appliedDateJoinedFrom || undefined,
          endDate: appliedDateJoinedTo || undefined,
          purchases: parseNumber(appliedPurchaseCountValue),
          minSpend: parseNumber(appliedSpendMinValue),
          maxSpend: parseNumber(appliedSpendMaxValue),
          status: statusFilter === 'all' ? undefined : statusFilter
        });
        if (!isMounted) return;
        setUsers(response.users.map(mapUser));
        setPagination(response.pagination);
        setHasUsersError(false);
      } catch {
        if (!isMounted) return;
        setUsers([]);
        setPagination({
          total: 0,
          page: currentPage,
          limit: 10,
          totalPages: 1,
          hasNext: false,
          hasPrev: currentPage > 1
        });
        setHasUsersError(true);
      } finally {
        if (isMounted) {
          setIsUsersLoading(false);
        }
      }
    };

    void fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [
    appliedDateJoinedFrom,
    appliedDateJoinedTo,
    appliedPurchaseCountValue,
    appliedSpendMaxValue,
    appliedSpendMinValue,
    currentPage,
    statusFilter
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    appliedDateJoinedFrom,
    appliedDateJoinedTo,
    appliedPurchaseCountValue,
    appliedSpendMaxValue,
    appliedSpendMinValue,
    statusFilter
  ]);

  const handleViewUserDetails = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleToggleBanUser = async (user: User) => {
    if (pendingUserId) return;

    const isInactive = user.status === 'Inactive';
    const isActive = user.status === 'Active';
    if (!isInactive && !isActive) {
      showSnackbar('error', 'Only active users can be banned');
      return;
    }

    setPendingUserId(user.id);
    setOpenMenuId(null);
    try {
      const message = isInactive
        ? await unbanAdminUser(user.id)
        : await banAdminUser(user.id);
      const nextStatus = (isInactive ? 'Active' : 'Inactive') as User['status'];
      setUsers((previous) =>
        previous.map((entry) =>
          entry.id === user.id ? { ...entry, status: nextStatus } : entry
        )
      );
      setSelectedUser((previous) =>
        previous && previous.id === user.id ? { ...previous, status: nextStatus } : previous
      );
      showSnackbar('success', message);
    } catch (error) {
      const fallback = isInactive ? 'Unable to unban user right now' : 'Unable to ban user right now';
      const message =
        error instanceof Error && error.message.trim().length > 0
          ? error.message
          : fallback;
      showSnackbar('error', message);
    } finally {
      setPendingUserId(null);
    }
  };

  return (
    <>
      <PageContainer>
        {(isUsersLoading || isMetricsLoading) && (
          <div className="fixed inset-0 z-[80] bg-white/75 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-2 border-border-primary border-t-transparent animate-spin" />
              <span className="font-sans text-caption-lg text-text-secondary">Loading users...</span>
            </div>
          </div>
        )}
        {/* Stats Section */}
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="flex items-center justify-between w-full">
            <h1 className="m-0 text-heading-lg-bold text-text-primary">Users</h1>
            {(isMetricsLoading || hasMetricsError) && (
              <span className="text-caption-sm text-text-secondary">
                {isMetricsLoading ? 'Loading user metrics…' : 'Metrics unavailable'}
              </span>
            )}
          </div>

          {/* Cards stretch to available width; wrap on smaller screens. */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 w-full">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
            {!isMetricsLoading && stats.length === 0 && (
              <div className="text-caption-sm text-text-secondary px-2 py-3">
                No user metrics to display.
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <div className="flex flex-col gap-2">
          {/* Filters and Sort */}
          <div className="flex justify-between items-center h-6">
            <div className="flex gap-[6px] items-center relative overflow-visible">
              <div className="relative overflow-visible" ref={dateJoinedFilterRef}>
                <FilterPill
                  label="Date Joined"
                  active={dateJoinedFilterActive || appliedDateJoinedFrom.length > 0 || appliedDateJoinedTo.length > 0}
                  onClick={() => {
                    setDateJoinedFilterActive(!dateJoinedFilterActive);
                    setPurchaseCountFilterActive(false);
                    setSpendFilterActive(false);
                  }}
                />
                {dateJoinedFilterActive && (
                  <FilterDropdown
                    title="Filter by: Date Joined"
                    showCalendar={true}
                    fromValue={dateJoinedFrom}
                    toValue={dateJoinedTo}
                    onFromChange={setDateJoinedFrom}
                    onToChange={setDateJoinedTo}
                    onApply={() => {
                      setAppliedDateJoinedFrom(dateJoinedFrom);
                      setAppliedDateJoinedTo(dateJoinedTo);
                      setDateJoinedFilterActive(false);
                    }}
                    onClear={() => {
                      setDateJoinedFrom('');
                      setDateJoinedTo('');
                    }}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={purchaseCountFilterRef}>
                <FilterPill
                  label="Purchase Count"
                  active={purchaseCountFilterActive || appliedPurchaseCountValue.length > 0}
                  onClick={() => {
                    setPurchaseCountFilterActive(!purchaseCountFilterActive);
                    setDateJoinedFilterActive(false);
                    setSpendFilterActive(false);
                  }}
                />
                {purchaseCountFilterActive && (
                  <SingleValueFilterDropdown
                    title="Filter by: Purchase Count"
                    value={purchaseCountValue}
                    onChange={setPurchaseCountValue}
                    onApply={() => {
                      setAppliedPurchaseCountValue(purchaseCountValue);
                      setPurchaseCountFilterActive(false);
                    }}
                    onClear={() => {
                      setPurchaseCountValue('');
                    }}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={spendFilterRef}>
                <FilterPill
                  label="Spend"
                  active={spendFilterActive || appliedSpendMinValue.length > 0 || appliedSpendMaxValue.length > 0}
                  onClick={() => {
                    setSpendFilterActive(!spendFilterActive);
                    setDateJoinedFilterActive(false);
                    setPurchaseCountFilterActive(false);
                  }}
                />
                {spendFilterActive && (
                  <FilterDropdown
                    title="Filter by: Spend"
                    showCurrency={true}
                    fromValue={spendMinValue}
                    toValue={spendMaxValue}
                    onFromChange={setSpendMinValue}
                    onToChange={setSpendMaxValue}
                    onApply={() => {
                      setAppliedSpendMinValue(spendMinValue);
                      setAppliedSpendMaxValue(spendMaxValue);
                      setSpendFilterActive(false);
                    }}
                    onClear={() => {
                      setSpendMinValue('');
                      setSpendMaxValue('');
                    }}
                  />
                )}
              </div>

              <button
                onClick={() => {
                  setStatusFilter(
                    statusFilter === 'all' ? 'active' :
                      statusFilter === 'active' ? 'inactive' :
                        statusFilter === 'inactive' ? 'pending' : 'all'
                  );
                }}
                className={cn(
                  "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
                  statusFilter !== 'all' ? "border-brand-primary" : "border-border-primary hover:bg-gray-50"
                )}
              >
                <FilterPlusIcon className={cn("w-2.5 h-2.5", statusFilter !== 'all' ? "text-brand-primary" : "text-text-secondary")} />
                <span className={cn("text-[11px] leading-[13px] font-sans", statusFilter !== 'all' ? "text-brand-primary" : "text-text-secondary")}>
                  {statusFilter === 'all' ? 'Status' :
                    statusFilter === 'active' ? 'Active' :
                      statusFilter === 'inactive' ? 'Inactive' : 'Pending'}
                </span>
              </button>
            </div>
            <button className="flex items-center gap-[2px] pl-[7px] pr-[10px] py-[5px] h-[24px] bg-white border border-border-primary rounded-lg shadow-button hover:bg-gray-50 transition-colors box-border">
              <SlidersHorizontalIcon className="h-[14px] w-[14px] text-text-secondary" />
              <span className="text-[12px] font-normal text-text-secondary leading-[14px] font-sans">Sort</span>
            </button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border-primary flex flex-col w-full shadow-none p-1 gap-1 bg-surface-secondary overflow-x-auto">
            {/* Table Header */}
            <div className="flex items-center h-8 shrink-0 px-6 gap-4 min-w-[600px]">
              <div className="w-[200px] sm:w-[240px] lg:w-[266px] text-caption-lg font-medium text-text-primary">User</div>
              <div className="hidden sm:block w-[80px] md:w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Joined</div>
              <div className="w-[70px] sm:w-[80px] md:w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Purchases</div>
              <div className="w-[80px] sm:w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Total Spent</div>
              <div className="hidden md:block w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Subscriptions</div>
              <div className="hidden lg:block w-[120px] text-caption-lg font-medium text-text-primary">Last Active</div>
              <div className="w-[50px] text-caption-lg font-medium text-text-primary">Status</div>
              <div className="flex-1 min-w-[18px] flex justify-end opacity-0">•</div>
            </div>

            {/* Table Body */}
            <div className="bg-white border border-border-primary rounded-lg overflow-hidden">
              {isUsersLoading && (
                <div className="p-4 text-caption-sm text-text-secondary">Loading users…</div>
              )}
              {hasUsersError && !isUsersLoading && (
                <div className="p-4 text-caption-sm text-text-secondary">Unable to load users.</div>
              )}
              {!isUsersLoading && !hasUsersError && users.length === 0 && (
                <div className="p-4 text-caption-sm text-text-secondary">No users found.</div>
              )}
              {!isUsersLoading && !hasUsersError && users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isPending={pendingUserId === user.id}
                  isMenuOpen={openMenuId === user.id}
                  onMenuToggle={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                  onViewDetails={() => handleViewUserDetails(user)}
                  onToggleBanUser={() => void handleToggleBanUser(user)}
                  menuRef={openMenuId === user.id ? menuRef : null}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center pl-6 h-8">
              <span className="text-caption-lg text-text-tertiary">
                {pagination.total === 0
                  ? 'Showing 0 results'
                  : `Showing ${(pagination.page - 1) * pagination.limit + 1} to ${Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )} of ${pagination.total} results`}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={cn(
                    "w-[87.5px] h-8 bg-surface-secondary rounded-md shadow-button p-0.5",
                    pagination.hasPrev ? 'cursor-pointer hover:opacity-90 transition-opacity' : 'opacity-30'
                  )}
                  onClick={pagination.hasPrev ? () => setCurrentPage((prev) => Math.max(1, prev - 1)) : undefined}
                >
                  <div className="flex items-center justify-center bg-white rounded shadow-button-inset h-7 px-3.5">
                    <span className="text-caption-md font-medium text-text-secondary">Previous</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={cn(
                    "w-[87.5px] h-8 bg-surface-secondary rounded-md shadow-button p-0.5",
                    pagination.hasNext ? 'cursor-pointer hover:opacity-90 transition-opacity' : 'opacity-30'
                  )}
                  onClick={pagination.hasNext ? () => setCurrentPage((prev) => prev + 1) : undefined}
                >
                  <div className="flex items-center justify-center bg-white rounded shadow-button-inset h-7 px-3.5">
                    <span className="text-caption-md font-medium text-text-secondary">Next</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
      {snackbar && (
        <div className="fixed bottom-4 right-4 z-[120]">
          <div
            className={cn(
              "min-w-[260px] max-w-[360px] rounded-lg border px-4 py-3 shadow-lg",
              snackbar.type === 'success'
                ? "border-[#C7E8DA] bg-[#EAF8F1] text-[#1F7A5A]"
                : "border-[#F2C3C1] bg-[#FCEDEC] text-[#A42520]"
            )}
            role="status"
            aria-live="polite"
          >
            <p className="text-[13px] leading-5 font-medium">{snackbar.message}</p>
          </div>
        </div>
      )}
    </>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
        active ? "border-brand-primary" : "border-border-primary hover:bg-gray-50"
      )}
    >
      <FilterPlusIcon className={cn("w-2.5 h-2.5", active ? "text-brand-primary" : "text-text-secondary")} />
      <span className={cn("text-[11px] leading-[13px] font-sans", active ? "text-brand-primary" : "text-text-secondary")}>{label}</span>
    </button>
  );
}

function FilterDropdown({
  title,
  showCalendar,
  showCurrency,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  onApply,
  onClear
}: {
  title: string;
  showCalendar?: boolean;
  showCurrency?: boolean;
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-brand-primary rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px] shadow-dropdown z-50"
    >
      {/* Title */}
      <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
        {title}
      </span>

      {/* Input Fields */}
      <div className="flex flex-col items-start gap-1 w-[161px] h-16">
        {/* From Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            From
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type={showCalendar ? "date" : "number"}
              value={fromValue}
              onChange={(e) => onFromChange(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
              placeholder=""
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">₦</span>
            )}
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            To
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type={showCalendar ? "date" : "number"}
              value={toValue}
              onChange={(e) => onToChange(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
              placeholder=""
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">₦</span>
            )}
          </div>
        </div>
      </div>

      <div className="w-[161px] flex items-center gap-2">
        <button
          onClick={onClear}
          className="w-full h-8 flex items-center justify-center rounded-[9px] border border-border-primary bg-white"
        >
          <span className="text-[13px] font-medium text-text-secondary leading-4 font-sans">Clear</span>
        </button>
        <button
          onClick={onApply}
          className="w-full h-8 flex items-center justify-center rounded-[9px] bg-gradient-to-b from-brand-primary to-brand-purple shadow-button-inset"
        >
          <span className="text-[13px] font-medium text-white leading-4 font-sans">
            Apply
          </span>
        </button>
      </div>
    </div>
  );
}

function SingleValueFilterDropdown({
  title,
  value,
  onChange,
  onApply,
  onClear
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className="absolute left-[-0.75px] top-[27px] w-[185px] bg-white border border-brand-primary rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px] shadow-dropdown z-50">
      <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
        {title}
      </span>

      <div className="w-full h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center px-2 overflow-hidden">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none"
        />
      </div>

      <div className="w-full flex items-center gap-2">
        <button
          onClick={onClear}
          className="w-full h-8 flex items-center justify-center rounded-[9px] border border-border-primary bg-white"
        >
          <span className="text-[13px] font-medium text-text-secondary leading-4 font-sans">Clear</span>
        </button>
        <button
          onClick={onApply}
          className="w-full h-8 flex items-center justify-center rounded-[9px] bg-gradient-to-b from-brand-primary to-brand-purple shadow-button-inset"
        >
          <span className="text-[13px] font-medium text-white leading-4 font-sans">
            Apply
          </span>
        </button>
      </div>
    </div>
  );
}

function UserRow({ user, isPending, isMenuOpen, onMenuToggle, onViewDetails, onToggleBanUser, menuRef }: { user: any; isPending: boolean; isMenuOpen: boolean; onMenuToggle: () => void; onViewDetails: () => void; onToggleBanUser: () => void; menuRef: React.RefObject<HTMLDivElement> | null }) {
  const statusConfig = {
    Active: {
      bg: 'bg-surface-success',
      color: 'text-text-success',
      label: 'Active',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.25 5C1.25 5.49246 1.347 5.98009 1.53545 6.43506C1.72391 6.89003 2.00013 7.30343 2.34835 7.65165C2.69657 7.99987 3.10997 8.27609 3.56494 8.46455C4.01991 8.653 4.50754 8.75 5 8.75C5.49246 8.75 5.98009 8.653 6.43506 8.46455C6.89003 8.27609 7.30343 7.99987 7.65165 7.65165C7.99987 7.30343 8.27609 6.89003 8.46455 6.43506C8.653 5.98009 8.75 5.49246 8.75 5C8.75 4.50754 8.653 4.01991 8.46455 3.56494C8.27609 3.10997 7.99987 2.69657 7.65165 2.34835C7.30343 2.00013 6.89003 1.72391 6.43506 1.53545C5.98009 1.347 5.49246 1.25 5 1.25C4.50754 1.25 4.01991 1.347 3.56494 1.53545C3.10997 1.72391 2.69657 2.00013 2.34835 2.34835C2.00013 2.69657 1.72391 3.10997 1.53545 3.56494C1.347 4.01991 1.25 4.50754 1.25 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.75 5.00033L4.58333 5.83366L6.25 4.16699" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    Pending: {
      bg: 'bg-surface-warning',
      color: 'text-text-warning',
      label: 'Pending',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16667 8.65694C3.80411 8.57433 3.45585 8.43826 3.13333 8.25319M5.83333 1.34277C6.66173 1.53197 7.40135 1.99681 7.9311 2.66119C8.46086 3.32557 8.74935 4.15013 8.74935 4.99986C8.74935 5.84959 8.46086 6.67414 7.9311 7.33852C7.40135 8.0029 6.66173 8.46774 5.83333 8.65694M1.90792 7.12194C1.68087 6.79158 1.50826 6.42695 1.39667 6.04194M1.30167 4.37486C1.36833 3.97902 1.49667 3.60402 1.67667 3.26027L1.74708 3.13319M2.87792 1.90777C3.268 1.63981 3.70528 1.4481 4.16667 1.34277M5 3.33319V4.99986M5 6.66652V6.67069" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    Inactive: {
      bg: 'bg-surface-danger',
      color: 'text-text-danger',
      label: 'Inactive',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3.74975V5.41642M5 6.66642H5.00417M4.31792 1.496L0.940416 7.13517C0.870789 7.25575 0.833944 7.39245 0.833545 7.53169C0.833146 7.67092 0.869208 7.80784 0.938143 7.92881C1.00708 8.04978 1.10648 8.1506 1.22647 8.22123C1.34646 8.29187 1.48286 8.32986 1.62208 8.33142H8.37792C8.51708 8.32981 8.6534 8.29182 8.77334 8.22121C8.89327 8.15059 8.99263 8.04983 9.06156 7.92892C9.13048 7.808 9.16656 7.67116 9.16621 7.53199C9.16587 7.39281 9.12911 7.25615 9.05958 7.13559L5.68208 1.49559C5.61102 1.3783 5.51092 1.28131 5.39144 1.214C5.27196 1.14669 5.13714 1.11133 5 1.11133C4.86286 1.11133 4.72804 1.14669 4.60856 1.214C4.48908 1.28131 4.38898 1.3783 4.31792 1.49559V1.496Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  };

  const status = statusConfig[user.status as keyof typeof statusConfig] || statusConfig.Active;

  return (
    <div className="flex items-center h-[50px] bg-white border-b border-border-primary last:border-0 hover:bg-gray-50/50 transition-colors px-6 gap-4 min-w-[600px]">
      {/* User */}
      <div className="flex items-center gap-1.5 w-[200px] sm:w-[240px] lg:w-[266px]">
        <div className="w-avatar-sm h-avatar-sm rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <span className="text-body-sm font-medium text-text-primary leading-4 truncate">{user.name}</span>
          <span className="text-caption-lg text-text-secondary leading-[14px] truncate">{user.username}</span>
        </div>
      </div>

      {/* Joined - Hidden on mobile */}
      <div className="hidden sm:block w-[80px] md:w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">{user.joined}</div>

      {/* Purchases */}
      <div className="w-[70px] sm:w-[80px] md:w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">{user.purchases}</div>

      {/* Total Spent */}
      <div className="w-[80px] sm:w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">₦{user.spent.toLocaleString()}</div>

      {/* Subscriptions - Hidden on mobile and small tablets */}
      <div className="hidden md:block w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">{user.subscriptions}</div>

      {/* Last Active - Hidden on mobile and tablets */}
      <div className="hidden lg:block w-[120px] text-caption-lg text-text-secondary leading-[14px] truncate">{user.lastActive}</div>

      {/* Status */}
      <div className="w-[50px]">
        <span className={cn(
          "inline-flex items-center gap-0.5 px-[6px] py-[1px] pl-[3px] rounded text-caption-sm h-[14px] w-fit",
          status.bg,
          status.color
        )}>
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Actions */}
      <div className="relative flex-1 min-w-[18px] flex justify-end items-center" ref={menuRef}>
        <button
          onClick={onMenuToggle}
          className="w-[18px] h-[18px] flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical className="h-[18px] w-[18px] text-text-secondary" />
        </button>

        {isMenuOpen && (
          <ActionMenu
            simpleMode
            option1Label="View User Details"
            option2Label={user.status === 'Inactive' ? 'Unban User' : 'Ban User'}
            onOption1={onViewDetails}
            onOption2={() => {
              if (isPending) return;
              onToggleBanUser();
            }}
          />
        )}
      </div>
    </div>
  );
}
