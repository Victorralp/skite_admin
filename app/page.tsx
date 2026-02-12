'use client';

import ActivityOverview from '@/components/ActivityOverview';
import ChartsRow from '@/components/ChartsRow';
import Overview from '@/components/Overview';
import PageContainer from '@/components/layout/PageContainer';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
import RevenueTrend from '@/components/RevenueTrend';
import TopCreatorsTable from '@/components/TopCreatorsTable';
import { useState } from 'react';
import { getDashboardUiState } from '@/lib/dashboardUiState';
import { type RevenueTrendFilter } from '@/lib/api';

export default function Home() {
  const [isTrendLoading, setIsTrendLoading] = useState(true);
  const [isChartsLoading, setIsChartsLoading] = useState(true);
  const [sharedRevenueFilter, setSharedRevenueFilter] = useState<RevenueTrendFilter>(
    () => getDashboardUiState('revenueTrendFilter')
  );
  const isDashboardLoading = isTrendLoading || isChartsLoading;

  return (
    <PageContainer>
      {isDashboardLoading && (
        <div className="fixed inset-0 z-[80] bg-white/75 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-border-primary border-t-transparent animate-spin" />
            <span className="font-sans text-caption-lg text-text-secondary">Loading dashboard...</span>
          </div>
        </div>
      )}
      <Overview />

      {/* Revenue Trend Section */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-heading-lg text-text-primary m-0">
          Revenue Trend
        </h3>

        {/* Chart Container */}
        <div className="w-full bg-surface-secondary rounded-lg p-1 flex flex-col gap-1 box-border">
          <RevenueTrend
            onLoadingChange={setIsTrendLoading}
            filter={sharedRevenueFilter}
            onFilterChange={setSharedRevenueFilter}
          />
          <ChartsRow onLoadingChange={setIsChartsLoading} filter={sharedRevenueFilter} />
        </div>
      </div>

      <ActivityOverview />
      <TopCreatorsTable />
      <RecentTransactionsTable />
    </PageContainer>
  );
}
