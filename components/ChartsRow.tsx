'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  getAdminDashboardRevenueBreakdown,
  getAdminDashboardTransactionVolume,
  type RevenueTrendFilter
} from '@/lib/api';
import { getDashboardUiState } from '@/lib/dashboardUiState';

type TransactionVolumePoint = {
  bucket: string;
  day: string;
  hour: number;
  totalValue: number;
};

type RevenueBreakdownSlice = {
  name: string;
  value: number;
  percentage: number;
  revenue: number;
  color: string;
};

const PIE_COLORS = [
  '#4476a8',
  '#fa4d26',
  '#a7cf36',
  '#fccf03',
  '#fa8c05',
  '#f20574',
  '#6b4dff',
  '#50b5ff'
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`;
  }
  return `₦${(value / 1000).toFixed(0)}K`;
};

const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

const formatHour = (hour: number) => `${hour.toString().padStart(2, '0')}:00`;

const parseBucket = (bucket: string) => {
  const [day, hourStr] = bucket.split('|');
  const hour = Number(hourStr);
  return { day, hour };
};

const formatBucketTick = (bucket: string, multiDay: boolean) => {
  const { day, hour } = parseBucket(bucket);
  if (!day || !Number.isFinite(hour)) return bucket;

  if (!multiDay) {
    return formatHour(hour);
  }

  const date = new Date(`${day}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return `${day} ${formatHour(hour)}`;
  }

  const dateLabel = new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    day: 'numeric'
  }).format(date);

  return `${dateLabel} ${formatHour(hour)}`;
};

const formatBucketTooltip = (bucket: string) => {
  const { day, hour } = parseBucket(bucket);
  if (!day || !Number.isFinite(hour)) return bucket;

  const date = new Date(`${day}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return `${day} ${formatHour(hour)}`;
  }

  const dateLabel = new Intl.DateTimeFormat('en-NG', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);

  return `${dateLabel} ${formatHour(hour)}`;
};

type ChartsRowProps = {
  onLoadingChange?: (isLoading: boolean) => void;
  filter?: RevenueTrendFilter;
};

export default function ChartsRow({ onLoadingChange, filter }: ChartsRowProps = {}) {
  const selectedFilter = filter ?? getDashboardUiState('revenueTrendFilter');
  const [volumeData, setVolumeData] = useState<TransactionVolumePoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [breakdownData, setBreakdownData] = useState<RevenueBreakdownSlice[]>([]);
  const [isBreakdownLoading, setIsBreakdownLoading] = useState(true);
  const [hasBreakdownError, setHasBreakdownError] = useState(false);

  const hasMultipleDays = useMemo(
    () => new Set(volumeData.map((point) => point.day)).size > 1,
    [volumeData]
  );

  useEffect(() => {
    let isMounted = true;

    const fetchTransactionVolume = async () => {
      setIsLoading(true);
      onLoadingChange?.(true);
      try {
        const response = await getAdminDashboardTransactionVolume(selectedFilter);
        if (!isMounted) return;

        const normalized = response
          .map((point) => {
            const day = String(point?._id?.day ?? '');
            const hour = Number(point?._id?.hour ?? 0);
            return {
              day,
              hour,
              bucket: `${day}|${hour}`,
              totalValue: Number(point.totalValue ?? 0)
            };
          })
          .filter((point) => point.day.length > 0 && Number.isFinite(point.hour))
          .sort((a, b) => {
            const dayCompare = a.day.localeCompare(b.day);
            if (dayCompare !== 0) return dayCompare;
            return a.hour - b.hour;
          });

        setVolumeData(normalized);
        setHasError(false);
      } catch {
        if (!isMounted) return;
        setVolumeData([]);
        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          onLoadingChange?.(false);
        }
      }
    };

    fetchTransactionVolume();

    return () => {
      isMounted = false;
    };
  }, [selectedFilter]);

  useEffect(() => {
    let isMounted = true;

    const fetchRevenueBreakdown = async () => {
      setIsBreakdownLoading(true);
      onLoadingChange?.(true);
      try {
        const response = await getAdminDashboardRevenueBreakdown(selectedFilter);
        if (!isMounted) return;

        const normalized = response
          .map((item, index) => {
            const itemType = String(item.item_type ?? '').trim();
            const percentage = Number(item.percentage ?? 0);
            const revenue = Number(item.revenue ?? 0);

            return {
              name: itemType || 'Unknown',
              value: percentage,
              percentage,
              revenue,
              color: PIE_COLORS[index % PIE_COLORS.length]
            };
          })
          .filter((item) => Number.isFinite(item.value) && item.value >= 0)
          .sort((a, b) => b.value - a.value);

        setBreakdownData(normalized);
        setHasBreakdownError(false);
      } catch {
        if (!isMounted) return;
        setBreakdownData([]);
        setHasBreakdownError(true);
      } finally {
        if (isMounted) {
          setIsBreakdownLoading(false);
          onLoadingChange?.(false);
        }
      }
    };

    fetchRevenueBreakdown();

    return () => {
      isMounted = false;
    };
  }, [selectedFilter]);

  return (
    <div className="flex gap-1 flex-wrap w-full">
      <Card className="flex-[2_1_600px] h-[281px] rounded-lg bg-white p-0 border-none shadow-none">
        <CardContent className="pt-4 pr-4 pb-3 pl-4 flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between gap-2">
            <h3 className="min-w-0 flex-1 truncate font-sans text-xs font-medium leading-none tracking-normal text-text-main">
              Transaction Volume
            </h3>
          </div>

          <div className="w-full h-0 border border-border-subtle"></div>

          <div className="h-[207px] w-full">
            {isLoading && (
              <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                Loading transaction volume...
              </div>
            )}

            {!isLoading && volumeData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6b4dff" />
                      <stop offset="100%" stopColor="#cbbcff" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="bucket"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    tickFormatter={(value) => formatBucketTick(String(value), hasMultipleDays)}
                    minTickGap={24}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    tickFormatter={(value) => formatCurrency(Number(value) || 0)}
                    width={56}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                    formatter={(value) => [formatCurrency(Number(value) || 0), 'Value']}
                    labelFormatter={(label) => formatBucketTooltip(String(label))}
                  />
                  <Bar
                    dataKey="totalValue"
                    fill="url(#barGradient)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {!isLoading && volumeData.length === 0 && (
              <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                {hasError ? 'Transaction volume unavailable.' : 'No transaction volume data available.'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-[1_1_350px] h-[281px] rounded-lg p-0 border-none shadow-none">
        <CardContent className="p-4 flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between gap-2">
            <h3 className="min-w-0 flex-1 truncate font-sans text-xs font-medium leading-none tracking-normal text-text-main">
              Revenue Breakdown by Item Type
            </h3>
          </div>

          <div className="w-full h-0 border border-border-subtle"></div>

          <div className="flex items-center gap-6 h-full">
            {isBreakdownLoading && (
              <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                Loading revenue breakdown...
              </div>
            )}

            {!isBreakdownLoading && breakdownData.length > 0 && (
              <>
                <div className="w-[187px] h-[187px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={breakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={10}
                        outerRadius={90}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="#FFFFFF"
                        strokeWidth={1}
                        cornerRadius={4}
                      >
                        {breakdownData.map((entry, index) => (
                          <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value, _name, payload) => {
                          const slice = payload?.payload as RevenueBreakdownSlice | undefined;
                          const formatted = `${formatPercentage(Number(value) || 0)} (${formatCurrency(Number(slice?.revenue || 0))})`;
                          return [formatted, slice?.name ?? ''];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 space-y-3">
                  {breakdownData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span
                        className="flex-shrink-0 w-3 h-3 rounded"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="text-sm flex items-center">
                        <span className="mr-2 font-sans font-normal text-xs leading-none tracking-normal text-black">
                          {item.name}
                        </span>
                        <span className="text-[#989898]">{formatPercentage(item.percentage)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {!isBreakdownLoading && breakdownData.length === 0 && (
              <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                {hasBreakdownError ? 'Revenue breakdown unavailable.' : 'No revenue breakdown data available.'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
