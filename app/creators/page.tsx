'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Creator } from '@/data/dashboard';
import CreatorFilters from '@/components/CreatorFilters';
import CreatorsTable from '@/components/CreatorsTable';
import StatsCard from '@/components/StatsCard';
import PageContainer from '@/components/layout/PageContainer';
import {
  getAdminCreatorMetrics,
  getAdminCreators,
  banAdminCreatorHub,
  unbanAdminCreatorHub,
  type AdminCreatorListingItem,
  type AdminCreatorMetricsData
} from '@/lib/api';

type CreatorMetricCard = {
  title: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down' | 'neutral';
};

type CreatorStatusFilter = 'all' | 'active' | 'suspended' | 'banned';
type CreatorRow = Creator & { hubId?: string; hubIdCandidates: string[] };

export default function CreatorsPage() {
  const router = useRouter();
  const [searchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CreatorStatusFilter>('all');
  const [revenueMinValue, setRevenueMinValue] = useState('');
  const [revenueMaxValue, setRevenueMaxValue] = useState('');
  const [dateFromValue, setDateFromValue] = useState('');
  const [dateToValue, setDateToValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [metricCards, setMetricCards] = useState<CreatorMetricCard[]>([]);
  const [isMetricsLoading, setIsMetricsLoading] = useState(true);
  const [hasMetricsError, setHasMetricsError] = useState(false);
  const [creators, setCreators] = useState<CreatorRow[]>([]);
  const [isCreatorsLoading, setIsCreatorsLoading] = useState(true);
  const [hasCreatorsError, setHasCreatorsError] = useState(false);
  const [pendingHubId, setPendingHubId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [snackbarTimeout, setSnackbarTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1
  });

  const showSnackbar = (type: 'success' | 'error', message: string) => {
    setSnackbar({ type, message });
    if (snackbarTimeout) {
      clearTimeout(snackbarTimeout);
    }
    const timeout = setTimeout(() => {
      setSnackbar(null);
      setSnackbarTimeout(null);
    }, 4000);
    setSnackbarTimeout(timeout);
  };

  useEffect(() => {
    return () => {
      if (snackbarTimeout) {
        clearTimeout(snackbarTimeout);
      }
    };
  }, [snackbarTimeout]);

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

    const mapMetrics = (data: AdminCreatorMetricsData): CreatorMetricCard[] => [
      {
        title: 'Total Creators',
        value: formatCount(data.total_creators?.value ?? 0),
        trend: formatPercentTrend(data.total_creators?.percentage_change ?? 0, 'from last month'),
        trendDirection: resolveDirection(data.total_creators?.percentage_change ?? 0)
      },
      {
        title: 'Active Creators',
        value: formatCount(data.active_creators?.value ?? 0),
        trend: formatPercentTrend(data.active_creators?.percentage_change ?? 0, 'from last month'),
        trendDirection: resolveDirection(data.active_creators?.percentage_change ?? 0)
      },
      {
        title: 'Pending Verification',
        value: formatCount(data.pending_verifications?.value ?? 0),
        trend: `+${Number(data.pending_verifications?.created_today ?? 0)} today`,
        trendDirection: resolveDirection(data.pending_verifications?.created_today ?? 0)
      },
      {
        title: 'Flagged Creators',
        value: formatCount(data.flagged_creators?.value ?? 0),
        trend: `+${Number(data.flagged_creators?.flagged_today ?? 0)} today`,
        trendDirection: 'down'
      }
    ];

    const fetchMetrics = async () => {
      try {
        const response = await getAdminCreatorMetrics();
        if (!isMounted) return;
        setMetricCards(mapMetrics(response));
        setHasMetricsError(false);
      } catch {
        if (!isMounted) return;
        setMetricCards([]);
        setHasMetricsError(true);
      } finally {
        if (isMounted) {
          setIsMetricsLoading(false);
        }
      }
    };

    void fetchMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const parseOptionalNumber = (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return undefined;
      const parsed = Number(trimmed);
      return Number.isFinite(parsed) ? parsed : undefined;
    };

    const resolvePossibleId = (value: unknown): string | null => {
      if (!value) return null;
      if (typeof value === 'string') return value;
      if (typeof value === 'object') {
        const objectValue = value as Record<string, unknown>;
        return (
          resolvePossibleId(objectValue._id) ??
          resolvePossibleId(objectValue.id) ??
          resolvePossibleId(objectValue.hubId) ??
          resolvePossibleId(objectValue.hub_id) ??
          resolvePossibleId(objectValue.creatorId) ??
          resolvePossibleId(objectValue.creator_id) ??
          resolvePossibleId(objectValue.$oid)
        );
      }
      return null;
    };

    const normalizeStatus = (value: unknown): Creator['status'] => {
      const normalized = String(value ?? '').trim().toLowerCase();
      if (normalized === 'banned') return 'Banned';
      if (normalized === 'suspended' || normalized === 'inactive') return 'Suspended';
      return 'Active';
    };

    const formatCurrency = (amount: number) =>
      new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
      }).format(Number.isFinite(amount) ? amount : 0);

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

    const deriveUsername = (name?: string, hubName?: string) => {
      const source = hubName ?? name ?? 'creator';
      const normalized = source
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '')
        .slice(0, 16);
      return `@${normalized || 'creator'}`;
    };

    const mapCreator = (item: AdminCreatorListingItem, index: number): CreatorRow => {
      const collectIdCandidates = (values: unknown[]) => {
        const seen = new Set<string>();
        const results: string[] = [];
        values.forEach((value) => {
          const resolved = resolvePossibleId(value);
          if (!resolved || seen.has(resolved)) return;
          seen.add(resolved);
          results.push(resolved);
        });
        return results;
      };

      const revenueGenerated = Number(item.revenue_generated ?? 0);
      const fallbackId = `creator-${currentPage}-${index}`;
      const hubIdCandidates = collectIdCandidates([
        item.hubId,
        item.hub_id,
        item.hub,
        item._id,
        item.id
      ]);
      const creatorIdCandidates = collectIdCandidates([item.creatorId, item.creator_id]);
      const id =
        creatorIdCandidates[0] ??
        hubIdCandidates[0] ??
        fallbackId;

      return {
        id,
        name: item.name ?? 'Unknown Creator',
        username: deriveUsername(item.name, item.hub_name),
        email: item.email ?? '',
        avatar: item.avatar ?? '/image.png',
        revenue: formatCurrency(revenueGenerated),
        revenueNumeric: revenueGenerated,
        products: Number(item.active_products_count ?? 0),
        salesCount: Number(item.total_sales_count ?? item.total_transaction_count ?? 0),
        subscribers: Number(item.total_hub_participants ?? 0),
        hubViews: Number(item.hub_views ?? 0),
        lastActive: formatDateTime(item.last_active),
        status: normalizeStatus(item.hub_status ?? item.status),
        bio: '',
        joinedDate: item.createdAt ?? '',
        hubId: hubIdCandidates[0],
        hubIdCandidates
      };
    };

    const fetchCreators = async () => {
      setIsCreatorsLoading(true);
      try {
        const response = await getAdminCreators({
          page: currentPage,
          limit: 20,
          minRevenue: parseOptionalNumber(revenueMinValue),
          maxRevenue: parseOptionalNumber(revenueMaxValue),
          dateFrom: dateFromValue || undefined,
          dateTo: dateToValue || undefined,
          hubStatus:
            statusFilter === 'active' || statusFilter === 'banned'
              ? statusFilter
              : undefined
        });
        if (!isMounted) return;
        setCreators(response.data.map(mapCreator));
        setPagination(response.pagination);
        setHasCreatorsError(false);
      } catch {
        if (!isMounted) return;
        setCreators([]);
        setPagination({
          total: 0,
          page: currentPage,
          limit: 20,
          totalPages: 1
        });
        setHasCreatorsError(true);
      } finally {
        if (isMounted) {
          setIsCreatorsLoading(false);
        }
      }
    };

    void fetchCreators();

    return () => {
      isMounted = false;
    };
  }, [
    currentPage,
    statusFilter,
    revenueMinValue,
    revenueMaxValue,
    dateFromValue,
    dateToValue
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, revenueMinValue, revenueMaxValue, dateFromValue, dateToValue]);

  const filteredCreators = useMemo(() => {
    let filtered = creators;

    if (statusFilter === 'active') {
      filtered = filtered.filter((creator) => creator.status === 'Active');
    } else if (statusFilter === 'suspended') {
      filtered = filtered.filter((creator) => creator.status === 'Suspended');
    } else if (statusFilter === 'banned') {
      filtered = filtered.filter((creator) => creator.status === 'Banned');
    }

    if (!searchQuery.trim()) return filtered;

    const query = searchQuery.toLowerCase();
    return filtered.filter((creator) => {
      return (
        creator.name.toLowerCase().includes(query) ||
        creator.username.toLowerCase().includes(query) ||
        creator.email.toLowerCase().includes(query)
      );
    });
  }, [creators, searchQuery, statusFilter]);

  const handleCreatorClick = (creator: CreatorRow) => {
    router.push(`/creators/${creator.id}`);
  };

  const handleAction = async (action: 'view' | 'message' | 'suspend', creatorId: string) => {
    const creator = creators.find((entry) => entry.id === creatorId);
    if (!creator) return;

    if (action === 'view') {
      handleCreatorClick(creator);
    } else if (action === 'message') {
      console.log('Send message to creator:', creatorId);
    } else if (action === 'suspend') {
      const hubId = creator.hubId;
      const hubIdCandidates = creator.hubIdCandidates.length > 0
        ? creator.hubIdCandidates
        : hubId
          ? [hubId]
          : [];
      if (hubIdCandidates.length === 0) {
        showSnackbar('error', 'Hub ID is unavailable for this creator');
        return;
      }
      if (pendingHubId) return;

      setPendingHubId(creator.id);
      try {
        const isCurrentlyBanned = creator.status === 'Banned';
        let message = '';
        let resolvedHubId: string | null = null;
        let lastError: unknown = null;

        for (const candidateHubId of hubIdCandidates) {
          try {
            message = isCurrentlyBanned
              ? await unbanAdminCreatorHub(candidateHubId)
              : await banAdminCreatorHub(candidateHubId, 'Violation of terms');
            resolvedHubId = candidateHubId;
            break;
          } catch (error) {
            lastError = error;
            const errorMessage =
              error instanceof Error ? error.message.toLowerCase() : '';
            const isHubLookupFailure =
              errorMessage.includes('hub not found') || errorMessage.includes('not found');
            if (isHubLookupFailure) {
              continue;
            }
            throw error;
          }
        }

        if (!resolvedHubId) {
          throw (lastError instanceof Error ? lastError : new Error('HUB_NOT_FOUND'));
        }

        setCreators((previous) =>
          previous.map((entry) =>
            entry.id === creator.id
              ? { ...entry, status: isCurrentlyBanned ? 'Active' : 'Banned', hubId: resolvedHubId }
              : entry
          )
        );

        showSnackbar('success', message);
      } catch (error) {
        const fallback =
          creator.status === 'Banned'
            ? 'Unable to unban hub right now'
            : 'Unable to ban hub right now';
        const message =
          error instanceof Error && error.message.trim().length > 0
            ? error.message
            : fallback;
        showSnackbar('error', message);
      } finally {
        setPendingHubId(null);
      }
    }
  };

  return (
    <PageContainer>
      {(isCreatorsLoading || isMetricsLoading) && (
        <div className="fixed inset-0 z-[80] bg-white/75 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-border-primary border-t-transparent animate-spin" />
            <span className="font-sans text-caption-lg text-text-secondary">Loading creators...</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-heading-lg text-text-primary">Creators</h1>
          {(isMetricsLoading || hasMetricsError) && (
            <span className="text-caption-sm text-text-secondary">
              {isMetricsLoading ? 'Loading creator metrics…' : 'Metrics unavailable'}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
          {metricCards.map((card) => (
            <StatsCard
              key={card.title}
              title={card.title}
              value={card.value}
              trend={card.trend}
              trendDirection={card.trendDirection}
            />
          ))}
          {!isMetricsLoading && metricCards.length === 0 && (
            <div className="text-caption-sm text-text-secondary px-2 py-3">
              No creator metrics to display.
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <CreatorFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          revenueMinValue={revenueMinValue}
          revenueMaxValue={revenueMaxValue}
          dateFromValue={dateFromValue}
          dateToValue={dateToValue}
          onApplyRevenue={(min, max) => {
            setRevenueMinValue(min);
            setRevenueMaxValue(max);
          }}
          onClearRevenue={() => {
            setRevenueMinValue('');
            setRevenueMaxValue('');
          }}
          onApplyDateJoined={(from, to) => {
            setDateFromValue(from);
            setDateToValue(to);
          }}
          onClearDateJoined={() => {
            setDateFromValue('');
            setDateToValue('');
          }}
        />

        <CreatorsTable
          creators={filteredCreators}
          isLoading={isCreatorsLoading}
          hasError={hasCreatorsError}
          pagination={pagination}
          hasPreviousPage={pagination.page > 1}
          hasNextPage={pagination.page < pagination.totalPages}
          onPreviousPage={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          onNextPage={() => setCurrentPage((prev) => prev + 1)}
          onCreatorClick={handleCreatorClick}
          onAction={(action, creatorId) => {
            void handleAction(action, creatorId);
          }}
        />
      </div>

      {snackbar && (
        <div className="fixed bottom-4 right-4 z-[120]">
          <div
            className={
              snackbar.type === 'success'
                ? 'min-w-[260px] max-w-[360px] rounded-lg border border-[#C7E8DA] bg-[#EAF8F1] text-[#1F7A5A] px-4 py-3 shadow-lg'
                : 'min-w-[260px] max-w-[360px] rounded-lg border border-[#F2C3C1] bg-[#FCEDEC] text-[#A42520] px-4 py-3 shadow-lg'
            }
            role="status"
            aria-live="polite"
          >
            <p className="text-[13px] leading-5 font-medium">{snackbar.message}</p>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
