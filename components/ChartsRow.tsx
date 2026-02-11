'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
import { getDashboardUiState, setDashboardUiState } from '@/lib/dashboardUiState';
import { cn } from '@/lib/utils';

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

const FILTER_OPTIONS: Array<{ label: string; value: RevenueTrendFilter }> = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'week' },
  { label: 'Last 30 days', value: 'month' },
  { label: 'Last 6 months', value: 'six_months' }
];

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

export default function ChartsRow() {
  const [selectedFilter, setSelectedFilter] = useState<RevenueTrendFilter>(
    () => getDashboardUiState('chartsTransactionFilter')
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [volumeData, setVolumeData] = useState<TransactionVolumePoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [selectedBreakdownFilter, setSelectedBreakdownFilter] = useState<RevenueTrendFilter>(
    () => getDashboardUiState('chartsBreakdownFilter')
  );
  const [isBreakdownDropdownOpen, setIsBreakdownDropdownOpen] = useState(false);
  const [breakdownData, setBreakdownData] = useState<RevenueBreakdownSlice[]>([]);
  const [isBreakdownLoading, setIsBreakdownLoading] = useState(true);
  const [hasBreakdownError, setHasBreakdownError] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const breakdownDropdownRef = useRef<HTMLDivElement>(null);

  const selectedFilterLabel = useMemo(
    () => FILTER_OPTIONS.find((option) => option.value === selectedFilter)?.label ?? 'Today',
    [selectedFilter]
  );

  const selectedBreakdownFilterLabel = useMemo(
    () => FILTER_OPTIONS.find((option) => option.value === selectedBreakdownFilter)?.label ?? 'Today',
    [selectedBreakdownFilter]
  );

  const hasMultipleDays = useMemo(
    () => new Set(volumeData.map((point) => point.day)).size > 1,
    [volumeData]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }

      if (
        breakdownDropdownRef.current &&
        !breakdownDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBreakdownDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchTransactionVolume = async () => {
      setIsLoading(true);
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
      try {
        const response = await getAdminDashboardRevenueBreakdown(selectedBreakdownFilter);
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
        }
      }
    };

    fetchRevenueBreakdown();

    return () => {
      isMounted = false;
    };
  }, [selectedBreakdownFilter]);

  return (
    <div className="flex gap-1 flex-wrap w-full">
      <Card className="flex-[2_1_600px] h-[281px] rounded-lg bg-white p-0 border-none shadow-none">
        <CardContent className="pt-4 pr-4 pb-3 pl-4 flex flex-col gap-2 h-full">
          <div className="flex justify-between items-center">
            <h3 className="font-sans text-xs font-medium leading-none tracking-normal text-text-main">Transaction Volume</h3>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="min-w-[105px] h-[30px] flex items-center py-[5px] pl-2.5 pr-[7px] bg-white border border-border-subtle rounded-lg shadow-button-soft cursor-pointer gap-1"
              >
                <span className="font-sans font-normal text-xs leading-[14px] text-text-muted whitespace-nowrap">
                  {selectedFilterLabel}
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-[34px] z-50 rounded-lg flex flex-col overflow-hidden bg-white w-[130px] border border-border-subtle shadow-dropdown p-0">
                  {FILTER_OPTIONS.map((item, i) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setDashboardUiState('chartsTransactionFilter', item.value);
                        setSelectedFilter(item.value);
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        'w-full h-[33px] flex items-center px-4 py-2 gap-2.5 bg-white cursor-pointer hover:bg-surface text-left',
                        i < FILTER_OPTIONS.length - 1 && 'border-b border-border-subtle',
                        selectedFilter === item.value && 'bg-surface'
                      )}
                    >
                      <span className="font-sans text-body-sm-regular text-text-muted">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
          <div className="flex justify-between items-center">
            <h3 className="font-sans text-xs font-medium leading-none tracking-normal text-text-main">Revenue Breakdown by Item Type</h3>

            <div className="relative" ref={breakdownDropdownRef}>
              <button
                type="button"
                onClick={() => setIsBreakdownDropdownOpen((prev) => !prev)}
                className="min-w-[105px] h-[30px] flex items-center py-[5px] pl-2.5 pr-[7px] bg-white border border-border-subtle rounded-lg shadow-button-soft cursor-pointer gap-1"
              >
                <span className="font-sans font-normal text-xs leading-[14px] text-text-muted whitespace-nowrap">
                  {selectedBreakdownFilterLabel}
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                </svg>
              </button>

              {isBreakdownDropdownOpen && (
                <div className="absolute right-0 top-[34px] z-50 rounded-lg flex flex-col overflow-hidden bg-white w-[130px] border border-border-subtle shadow-dropdown p-0">
                  {FILTER_OPTIONS.map((item, i) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setDashboardUiState('chartsBreakdownFilter', item.value);
                        setSelectedBreakdownFilter(item.value);
                        setIsBreakdownDropdownOpen(false);
                      }}
                      className={cn(
                        'w-full h-[33px] flex items-center px-4 py-2 gap-2.5 bg-white cursor-pointer hover:bg-surface text-left',
                        i < FILTER_OPTIONS.length - 1 && 'border-b border-border-subtle',
                        selectedBreakdownFilter === item.value && 'bg-surface'
                      )}
                    >
                      <span className="font-sans text-body-sm-regular text-text-muted">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
