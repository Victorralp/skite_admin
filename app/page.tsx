import ActivityOverview from '@/components/ActivityOverview';
import ChartsRow from '@/components/ChartsRow';
import Overview from '@/components/Overview';
import PageContainer from '@/components/layout/PageContainer';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
import RevenueTrend from '@/components/RevenueTrend';
import TopCreatorsTable from '@/components/TopCreatorsTable';

export default function Home() {
  return (
    <PageContainer>
      <Overview />

      {/* Revenue Trend Section */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-heading-lg text-text-primary m-0">
          Revenue Trend
        </h3>

        {/* Chart Container */}
        <div className="w-full bg-surface-secondary rounded-lg p-1 flex flex-col gap-1 box-border">
          <RevenueTrend />
          <ChartsRow />
        </div>
      </div>

      <ActivityOverview />
      <TopCreatorsTable />
      <RecentTransactionsTable />
    </PageContainer>
  );
}
