'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  getAdminDashboardRevenueTrend,
  type RevenueTrendFilter
} from '@/lib/api';
import { getDashboardUiState, setDashboardUiState } from '@/lib/dashboardUiState';
import { cn } from '@/lib/utils';

type RevenueTrendPoint = {
  _id: string;
  revenue: number;
};

const FILTER_OPTIONS: Array<{ label: string; value: RevenueTrendFilter }> = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'week' },
  { label: 'Last 30 days', value: 'month' },
  { label: 'Last 6 months', value: 'six_months' }
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`;
  }
  return `₦${(value / 1000).toFixed(0)}K`;
};

const formatDateLabel = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-NG', {
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const formatTooltipDate = (dateString: string) => {
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat('en-NG', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

type RevenueTrendProps = {
  onLoadingChange?: (isLoading: boolean) => void;
  filter?: RevenueTrendFilter;
  onFilterChange?: (filter: RevenueTrendFilter) => void;
};

export default function RevenueTrend({ onLoadingChange, filter, onFilterChange }: RevenueTrendProps = {}) {
  const [internalFilter, setInternalFilter] = useState<RevenueTrendFilter>(
    () => getDashboardUiState('revenueTrendFilter')
  );
  const selectedFilter = filter ?? internalFilter;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [revenueData, setRevenueData] = useState<RevenueTrendPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedFilterLabel = useMemo(
    () => FILTER_OPTIONS.find((option) => option.value === selectedFilter)?.label ?? 'Today',
    [selectedFilter]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchRevenueTrend = async () => {
      setIsLoading(true);
      try {
        const response = await getAdminDashboardRevenueTrend(selectedFilter);
        if (!isMounted) return;

        const normalized = response
          .map((point) => ({
            _id: point._id,
            revenue: Number(point.revenue ?? 0)
          }))
          .sort((a, b) => a._id.localeCompare(b._id));

        setRevenueData(normalized);
        setHasError(false);
      } catch {
        if (!isMounted) return;
        setRevenueData([]);
        setHasError(true);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          onLoadingChange?.(false);
        }
      }
    };

    onLoadingChange?.(true);
    fetchRevenueTrend();

    return () => {
      isMounted = false;
      onLoadingChange?.(false);
    };
  }, [selectedFilter]);

  return (
    <section className="w-full">
      <Card className="w-full min-h-[285px] rounded-lg p-0 bg-white border-none shadow-none">
        <CardContent className="p-4 flex flex-col gap-2 h-full">
          <div className="w-full h-[30px] flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1 truncate font-sans text-xs font-medium leading-none tracking-normal text-text-main">
              Daily Revenue
            </div>

            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="h-[30px] inline-flex items-center justify-between py-[5px] pl-2.5 pr-[7px] bg-white border border-border-subtle rounded-lg shadow-button-soft cursor-pointer gap-1 w-fit"
              >
                <span className="font-sans font-normal text-xs leading-[14px] text-text-muted whitespace-nowrap">
                  {selectedFilterLabel}
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-[34px] z-50 rounded-lg flex flex-col overflow-hidden bg-white border border-border-subtle shadow-dropdown p-0 w-[130px]">
                  {FILTER_OPTIONS.map((item, i) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setDashboardUiState('revenueTrendFilter', item.value);
                        if (onFilterChange) {
                          onFilterChange(item.value);
                        } else {
                          setInternalFilter(item.value);
                        }
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
                Loading revenue trend...
              </div>
            )}

            {!isLoading && revenueData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6ac19a" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#6ac19a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="_id"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={(value) => formatDateLabel(String(value))}
                    minTickGap={24}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickFormatter={formatCurrency}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: 4 }}
                    formatter={(value) => [formatCurrency(Number(value) || 0), 'Revenue']}
                    labelFormatter={(label) => formatTooltipDate(String(label))}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6ac19a"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {!isLoading && revenueData.length === 0 && (
              <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                {hasError ? 'Revenue trend unavailable.' : 'No revenue trend data available.'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
