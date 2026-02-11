'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  getAdminDashboardRevenueBreakdown,
  getAdminDashboardRevenueTrend,
  getAdminDashboardTransactionVolume,
  type AdminDashboardRevenueBreakdownPoint,
  type RevenueTrendFilter
} from '@/lib/api';
import { getDashboardUiState, setDashboardUiState } from '@/lib/dashboardUiState';
import { cn } from '@/lib/utils';

type RevenueTrendPoint = {
  _id: string;
  revenue: number;
};

type TransactionVolumePoint = {
  bucket: string;
  day: string;
  hour: number;
  totalValue: number;
};

type TransactionVolumeBarPoint = {
  index: number;
  normalizedValue: number;
  actualValue: number;
};

const FILTER_OPTIONS: Array<{ label: string; value: RevenueTrendFilter }> = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'week' },
  { label: 'Last 30 days', value: 'month' },
  { label: 'Last 6 months', value: 'six_months' }
];

const TRANSACTION_FILTER_OPTIONS: Array<{ label: string; value: RevenueTrendFilter }> = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This week', value: 'week' },
  { label: 'This month', value: 'month' },
  { label: '6 months', value: 'six_months' }
];

const BREAKDOWN_COLORS = ['#FFBEDD', '#FF9A9A', '#9DAAFF', '#9AC3FF', '#FFD6A5', '#B7E4C7'];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₦${(value / 1000000).toFixed(1)}M`;
  }
  return `₦${(value / 1000).toFixed(0)}K`;
};

const formatCompactCurrency = (value: number) => {
  const numericValue = Number.isFinite(value) ? value : 0;
  if (numericValue >= 1000000000) {
    return `₦${(numericValue / 1000000000).toFixed(1)}B`;
  }
  if (numericValue >= 1000000) {
    return `₦${(numericValue / 1000000).toFixed(1)}M`;
  }
  if (numericValue >= 1000) {
    return `₦${(numericValue / 1000).toFixed(1)}K`;
  }
  return `₦${numericValue.toFixed(0)}`;
};

const formatPercentage = (value: number) => {
  const numericValue = Number.isFinite(value) ? value : 0;
  return Number.isInteger(numericValue)
    ? `${numericValue}%`
    : `${numericValue.toFixed(1)}%`;
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

export default function RevenueOverview() {
  const [selectedRevenueFilter, setSelectedRevenueFilter] =
    useState<RevenueTrendFilter>(() => getDashboardUiState('revenueOverviewRevenueFilter'));
  const [isRevenueDropdownOpen, setIsRevenueDropdownOpen] = useState(false);
  const [revenueData, setRevenueData] = useState<RevenueTrendPoint[]>([]);
  const [isRevenueLoading, setIsRevenueLoading] = useState(true);
  const [hasRevenueError, setHasRevenueError] = useState(false);

  const [selectedTransactionFilter, setSelectedTransactionFilter] =
    useState<RevenueTrendFilter>(() => getDashboardUiState('revenueOverviewTransactionFilter'));
  const [isTransactionDropdownOpen, setIsTransactionDropdownOpen] = useState(false);
  const [volumeData, setVolumeData] = useState<TransactionVolumePoint[]>([]);
  const [isVolumeLoading, setIsVolumeLoading] = useState(true);
  const [hasVolumeError, setHasVolumeError] = useState(false);

  const [selectedBreakdownFilter, setSelectedBreakdownFilter] =
    useState<RevenueTrendFilter>(() => getDashboardUiState('revenueOverviewBreakdownFilter'));
  const [isBreakdownDropdownOpen, setIsBreakdownDropdownOpen] = useState(false);
  const [breakdownData, setBreakdownData] = useState<AdminDashboardRevenueBreakdownPoint[]>([]);
  const [isBreakdownLoading, setIsBreakdownLoading] = useState(true);
  const [hasBreakdownError, setHasBreakdownError] = useState(false);

  const revenueDropdownRef = useRef<HTMLDivElement>(null);
  const transactionDropdownRef = useRef<HTMLDivElement>(null);
  const breakdownDropdownRef = useRef<HTMLDivElement>(null);

  const selectedRevenueLabel = useMemo(
    () => FILTER_OPTIONS.find((option) => option.value === selectedRevenueFilter)?.label ?? 'Today',
    [selectedRevenueFilter]
  );

  const selectedTransactionLabel = useMemo(
    () =>
      TRANSACTION_FILTER_OPTIONS.find((option) => option.value === selectedTransactionFilter)
        ?.label ?? 'Today',
    [selectedTransactionFilter]
  );

  const selectedBreakdownLabel = useMemo(
    () => FILTER_OPTIONS.find((option) => option.value === selectedBreakdownFilter)?.label ?? 'Today',
    [selectedBreakdownFilter]
  );

  const chartBreakdownData = useMemo(
    () =>
      breakdownData
        .map((entry, index) => ({
          name: entry.item_type || 'Unknown',
          value: Number(entry.percentage ?? 0),
          revenue: Number(entry.revenue ?? 0),
          color: BREAKDOWN_COLORS[index % BREAKDOWN_COLORS.length]
        }))
        .filter((entry) => Number.isFinite(entry.value) && entry.value >= 0),
    [breakdownData]
  );

  const transactionBarData = useMemo<TransactionVolumeBarPoint[]>(() => {
    if (volumeData.length === 0) return [];

    const maxBars = 15;
    const sampled =
      volumeData.length <= maxBars
        ? volumeData
        : Array.from({ length: maxBars }, (_, i) => {
            const sourceIndex = Math.floor((i * (volumeData.length - 1)) / (maxBars - 1));
            return volumeData[sourceIndex];
          });

    const maxValue = Math.max(...sampled.map((point) => point.totalValue), 1);
    const scale = 1200 / maxValue;

    return sampled.map((point, index) => ({
      index: index + 1,
      normalizedValue: Math.max(1, Math.round(point.totalValue * scale)),
      actualValue: point.totalValue
    }));
  }, [volumeData]);

  const transactionTickValues = useMemo(() => {
    if (transactionBarData.length === 0) return [];
    const last = transactionBarData.length;
    const middle = Math.max(1, Math.round(last / 2));
    return [1, middle, last];
  }, [transactionBarData]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (revenueDropdownRef.current && !revenueDropdownRef.current.contains(event.target as Node)) {
        setIsRevenueDropdownOpen(false);
      }
      if (
        transactionDropdownRef.current &&
        !transactionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTransactionDropdownOpen(false);
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

    const fetchRevenueTrend = async () => {
      setIsRevenueLoading(true);
      try {
        const response = await getAdminDashboardRevenueTrend(selectedRevenueFilter);
        if (!isMounted) return;

        const normalized = response
          .map((point) => ({
            _id: String(point._id ?? ''),
            revenue: Number(point.revenue ?? 0)
          }))
          .filter((point) => point._id.length > 0)
          .sort((a, b) => a._id.localeCompare(b._id));

        setRevenueData(normalized);
        setHasRevenueError(false);
      } catch {
        if (!isMounted) return;
        setRevenueData([]);
        setHasRevenueError(true);
      } finally {
        if (isMounted) {
          setIsRevenueLoading(false);
        }
      }
    };

    fetchRevenueTrend();

    return () => {
      isMounted = false;
    };
  }, [selectedRevenueFilter]);

  useEffect(() => {
    let isMounted = true;

    const fetchTransactionVolume = async () => {
      setIsVolumeLoading(true);
      try {
        const response = await getAdminDashboardTransactionVolume(selectedTransactionFilter);
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
        setHasVolumeError(false);
      } catch {
        if (!isMounted) return;
        setVolumeData([]);
        setHasVolumeError(true);
      } finally {
        if (isMounted) {
          setIsVolumeLoading(false);
        }
      }
    };

    fetchTransactionVolume();

    return () => {
      isMounted = false;
    };
  }, [selectedTransactionFilter]);

  useEffect(() => {
    let isMounted = true;

    const fetchRevenueBreakdown = async () => {
      setIsBreakdownLoading(true);
      try {
        const response = await getAdminDashboardRevenueBreakdown(selectedBreakdownFilter);
        if (!isMounted) return;

        const normalized = response
          .map((entry) => ({
            item_type: String(entry.item_type ?? 'Unknown'),
            revenue: Number(entry.revenue ?? 0),
            percentage: Number(entry.percentage ?? 0)
          }))
          .sort((a, b) => b.revenue - a.revenue);

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
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <h3 className="text-heading-sm text-text-primary w-full z-10">Revenue Trend</h3>

      <div className="flex flex-col items-start gap-1 w-full bg-surface-secondary rounded-xl p-1">
        <Card className="w-full min-h-[285px] rounded-lg bg-surface-primary border-none shadow-none">
          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center h-[30px]">
              <span className="text-caption-lg text-text-primary">Daily Revenue</span>
              <div className="relative" ref={revenueDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsRevenueDropdownOpen((prev) => !prev)}
                  className="w-[94px] h-[30px] flex items-center py-[5px] pl-2.5 pr-[7px] bg-white border border-border-primary rounded-lg shadow-button-soft cursor-pointer gap-1"
                >
                  <span className="text-caption-lg-regular text-text-secondary whitespace-nowrap">
                    {selectedRevenueLabel}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                  </svg>
                </button>

                {isRevenueDropdownOpen && (
                  <div className="absolute right-0 top-[34px] z-50 rounded-lg flex flex-col overflow-hidden bg-white w-[130px] border border-border-primary shadow-dropdown p-0">
                    {FILTER_OPTIONS.map((item, i) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setDashboardUiState('revenueOverviewRevenueFilter', item.value);
                          setSelectedRevenueFilter(item.value);
                          setIsRevenueDropdownOpen(false);
                        }}
                        className={cn(
                          'w-full h-[33px] flex items-center px-4 py-2 gap-2.5 bg-white cursor-pointer hover:bg-gray-50 text-left',
                          i < FILTER_OPTIONS.length - 1 && 'border-b border-border-primary',
                          selectedRevenueFilter === item.value && 'bg-gray-50'
                        )}
                      >
                        <span className="text-body-sm-regular text-text-secondary">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full h-0 border border-border-primary" />

            <div className="h-[207px] w-full">
              {isRevenueLoading && (
                <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                  Loading daily revenue...
                </div>
              )}

              {!isRevenueLoading && revenueData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradientOverview" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6ac19a" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#6ac19a" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" vertical={false} opacity={0.1} />
                    <XAxis
                      dataKey="_id"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                      tickFormatter={(value) => formatDateLabel(String(value))}
                      minTickGap={24}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                      tickFormatter={formatCurrency}
                      width={52}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #EBEBEB',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value: number | undefined) => [formatCurrency(value || 0), 'Revenue']}
                      labelFormatter={(label) => formatTooltipDate(String(label))}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#47A663"
                      strokeWidth={2}
                      fill="url(#revenueGradientOverview)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {!isRevenueLoading && revenueData.length === 0 && (
                <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                  {hasRevenueError ? 'Daily revenue unavailable.' : 'No daily revenue data available.'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-row items-center gap-1 w-full">
          <Card className="flex-[2_1_600px] h-[281px] rounded-lg bg-white border-none shadow-none">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center h-[30px]">
                <span className="font-sans font-medium text-xs leading-none text-text-primary">Transaction Volume</span>
                <div className="relative" ref={transactionDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsTransactionDropdownOpen((prev) => !prev)}
                    className="min-w-[105px] h-[30px] flex items-center py-[5px] pl-2.5 pr-[7px] bg-white border border-border-primary rounded-lg shadow-button-soft cursor-pointer gap-1"
                  >
                    <span className="text-caption-lg-regular text-text-secondary whitespace-nowrap">
                      {selectedTransactionLabel}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                    </svg>
                  </button>

                  {isTransactionDropdownOpen && (
                    <div className="absolute right-0 top-[34px] z-50 rounded-lg flex flex-col overflow-hidden bg-white w-[130px] border border-border-primary shadow-dropdown p-0">
                      {TRANSACTION_FILTER_OPTIONS.map((item, i) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setDashboardUiState('revenueOverviewTransactionFilter', item.value);
                            setSelectedTransactionFilter(item.value);
                            setIsTransactionDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full h-[33px] flex items-center px-4 py-2 gap-2.5 bg-white cursor-pointer hover:bg-gray-50 text-left',
                            i < TRANSACTION_FILTER_OPTIONS.length - 1 && 'border-b border-border-primary',
                            selectedTransactionFilter === item.value && 'bg-gray-50'
                          )}
                        >
                          <span className="text-body-sm-regular text-text-secondary">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-0 border border-border-primary" />
              <div className="h-[207px] w-full">
                {isVolumeLoading && (
                  <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                    Loading transaction volume...
                  </div>
                )}

                {!isVolumeLoading && transactionBarData.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transactionBarData} barGap={8} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="barGradientOverview" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(219, 216, 228, 0.3)" />
                          <stop offset="100%" stopColor="#DBD8E4" />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#D9D9D9" vertical={false} opacity={0.1} />
                      <XAxis
                        dataKey="index"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#A5A1AF', fontSize: 12 }}
                        ticks={transactionTickValues}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#A5A1AF', fontSize: 12 }}
                        domain={[0, 1200]}
                        ticks={[0, 600, 1200]}
                        width={28}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #EBEBEB',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(_value: number | undefined, _name, payload) => [
                          formatCurrency(Number(payload?.payload?.actualValue ?? 0)),
                          'Value'
                        ]}
                        labelFormatter={(label) => `Point ${label}`}
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      />
                      <Bar
                        dataKey="normalizedValue"
                        fill="url(#barGradientOverview)"
                        radius={[4, 4, 1, 1]}
                        maxBarSize={33}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {!isVolumeLoading && transactionBarData.length === 0 && (
                  <div className="h-full w-full flex items-center justify-center text-caption-sm text-text-secondary">
                    {hasVolumeError ? 'Transaction volume unavailable.' : 'No transaction volume data available.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="flex-[1_1_350px] h-[281px] rounded-lg bg-white border-none shadow-none">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center h-[30px]">
                <span className="font-sans font-medium text-xs leading-none text-text-primary">
                  Revenue Breakdown by Item Type
                </span>
                <div className="relative" ref={breakdownDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsBreakdownDropdownOpen((prev) => !prev)}
                    className="min-w-[105px] h-[30px] flex items-center py-[5px] pl-2.5 pr-[7px] bg-white border border-border-primary rounded-lg shadow-button-soft cursor-pointer gap-1"
                  >
                    <span className="font-sans font-normal text-xs leading-[14px] text-text-secondary whitespace-nowrap">
                      {selectedBreakdownLabel}
                    </span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.83337 7.5L10 11.6667L14.1667 7.5H5.83337Z" fill="#5F5971" />
                    </svg>
                  </button>

                  {isBreakdownDropdownOpen && (
                    <div className="absolute right-0 top-[34px] z-50 rounded-lg flex flex-col overflow-hidden bg-white w-[140px] border border-border-primary shadow-dropdown p-0">
                      {FILTER_OPTIONS.map((item, i) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => {
                            setDashboardUiState('revenueOverviewBreakdownFilter', item.value);
                            setSelectedBreakdownFilter(item.value);
                            setIsBreakdownDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full h-[33px] flex items-center px-4 py-2 gap-2.5 bg-white cursor-pointer hover:bg-gray-50 text-left',
                            i < FILTER_OPTIONS.length - 1 && 'border-b border-border-primary',
                            selectedBreakdownFilter === item.value && 'bg-gray-50'
                          )}
                        >
                          <span className="font-sans text-body-sm-regular text-text-secondary">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-0 border border-border-primary" />
              <div className="flex items-center justify-center gap-8 py-2 px-3 h-[203px]">
                {isBreakdownLoading && (
                  <div className="w-full h-full flex items-center justify-center text-xs text-text-secondary">
                    Loading revenue breakdown...
                  </div>
                )}

                {!isBreakdownLoading && chartBreakdownData.length > 0 && (
                  <>
                    <div className="w-[187px] h-[187px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartBreakdownData}
                            cx="50%"
                            cy="50%"
                            innerRadius={10}
                            outerRadius={93}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="#FFFFFF"
                            strokeWidth={1}
                          >
                            {chartBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #EBEBEB',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value: number | undefined, _name, payload) => {
                              const percentLabel = formatPercentage(Number(value ?? 0));
                              const revenue = Number(payload?.payload?.revenue ?? 0);
                              return [`${percentLabel} (${formatCompactCurrency(revenue)})`, ''];
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-[17px]">
                      {chartBreakdownData.map((item) => (
                        <div key={item.name} className="flex items-center gap-1">
                          <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: item.color }}
                          />
                          <div className="flex items-center gap-[5px]">
                            <span className="font-sans font-normal text-xs leading-none text-black">
                              {item.name}
                            </span>
                            <span className="font-sans font-normal text-xs leading-none text-black/40">
                              {formatPercentage(item.value)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {!isBreakdownLoading && chartBreakdownData.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center text-xs text-text-secondary">
                    {hasBreakdownError
                      ? 'Revenue breakdown unavailable.'
                      : 'No revenue breakdown data available.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
