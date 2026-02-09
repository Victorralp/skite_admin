import ActivityOverview from '@/components/ActivityOverview';
import ChartsRow from '@/components/ChartsRow';
import Overview from '@/components/Overview';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
import RevenueTrend from '@/components/RevenueTrend';
import TopCreatorsTable from '@/components/TopCreatorsTable';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-start gap-8 box-border px-4 py-6 md:px-12">
      <Overview />

      {/* Revenue Trend Section */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{
          fontFamily: 'Neue Montreal',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '24px',
          letterSpacing: '-0.01em',
          color: '#2B2834',
          margin: 0
        }}>Revenue Trend</h3>

        {/* Chart Container */}
        <div style={{
          width: '100%',
          backgroundColor: '#F9F9FB',
          borderRadius: '12px',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          boxSizing: 'border-box'
        }}>
          <RevenueTrend />
          <ChartsRow />
        </div>
      </div>

      <ActivityOverview />
      <TopCreatorsTable />
      <RecentTransactionsTable />
    </div>
  );
}
