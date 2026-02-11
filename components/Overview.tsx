'use client';

import { useEffect, useState } from 'react';
import {
  getAdminDashboardMetrics,
  type AdminDashboardMetricsResponse,
  type DashboardMetricValue
} from '@/lib/api';
import { cn } from '@/lib/utils';

type DeltaTone = 'up' | 'down' | 'neutral';

type OverviewMetricCard = {
  title: string;
  value: string;
  delta: string;
  tone: DeltaTone;
};

type DashboardMetricKey =
  | 'total_platform_revenue'
  | 'processed_revenue'
  | 'active_creators'
  | 'total_users'
  | 'total_products';

const OVERVIEW_METRIC_CONFIG: Array<{
  key: DashboardMetricKey;
  title: string;
  valueType: 'currency' | 'count';
}> = [
  {
    key: 'total_platform_revenue',
    title: 'Total Platform Revenue',
    valueType: 'currency'
  },
  {
    key: 'processed_revenue',
    title: 'Processed Revenue',
    valueType: 'currency'
  },
  {
    key: 'active_creators',
    title: 'Active Creators',
    valueType: 'count'
  },
  {
    key: 'total_users',
    title: 'Total Users',
    valueType: 'count'
  },
  {
    key: 'total_products',
    title: 'Total Products',
    valueType: 'count'
  }
];

function formatCurrency(value: number, currency: string) {
  const normalizedCurrency =
    typeof currency === 'string' && currency.length === 3
      ? currency.toUpperCase()
      : 'NGN';

  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: normalizedCurrency,
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(value);
  }
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-NG').format(value);
}

function formatDelta(percentageChange: number) {
  const numericChange = Number.isFinite(percentageChange) ? percentageChange : 0;
  const prefix = numericChange > 0 ? '+' : '';
  return `${prefix}${numericChange.toFixed(1)}% from last month`;
}

function resolveTone(metric: DashboardMetricValue): DeltaTone {
  const trend = String(metric.trend ?? '').toLowerCase();
  if (trend === 'up' || trend === 'increase') return 'up';
  if (trend === 'down' || trend === 'decrease') return 'down';
  if ((metric.percentage_change ?? 0) > 0) return 'up';
  if ((metric.percentage_change ?? 0) < 0) return 'down';
  return 'neutral';
}

function mapApiMetrics(
  response: AdminDashboardMetricsResponse
): OverviewMetricCard[] {
  return OVERVIEW_METRIC_CONFIG.map((metricConfig) => {
    const metric = response[metricConfig.key];
    const numericValue = Number(metric?.value ?? 0);

    return {
      title: metricConfig.title,
      value:
        metricConfig.valueType === 'currency'
          ? formatCurrency(numericValue, response.currency)
          : formatCount(numericValue),
      delta: formatDelta(Number(metric?.percentage_change ?? 0)),
      tone: metric ? resolveTone(metric) : 'neutral'
    };
  });
}

export default function Overview() {
  const [metrics, setMetrics] = useState<OverviewMetricCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMetrics = async () => {
      try {
        const response = await getAdminDashboardMetrics();
        if (!isMounted) return;
        setMetrics(mapApiMetrics(response));
        setHasError(false);
      } catch {
        if (!isMounted) return;
        setMetrics([]);
        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-2 items-start">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-heading-lg text-text-primary m-0">Overview</h2>
        {(isLoading || hasError) && (
          <span className="text-caption-sm text-text-secondary">
            {isLoading ? 'Loading metrics...' : 'Metrics unavailable'}
          </span>
        )}
      </div>

      <div className="w-full flex items-start gap-2 flex-wrap">
        {metrics.map((metric) => (
          <div key={metric.title} className="min-w-[214px] h-24 bg-surface-primary border border-border-primary rounded-lg box-border flex flex-col p-4 gap-3 grow">
            <div className="flex flex-col gap-1 w-[182px] h-10">
              <span className="text-caption-lg text-text-secondary">{metric.title}</span>
              <span className="text-heading-md text-text-primary">{metric.value}</span>
            </div>

            <span
              className={cn(
                'text-caption-sm',
                metric.tone === 'up' && 'text-text-success',
                metric.tone === 'down' && 'text-text-danger',
                metric.tone === 'neutral' && 'text-text-secondary'
              )}
            >
              {metric.delta}
            </span>
          </div>
        ))}
        {!isLoading && metrics.length === 0 && (
          <div className="text-caption-sm text-text-secondary">
            No overview metrics available.
          </div>
        )}
      </div>
    </div>
  );
}
