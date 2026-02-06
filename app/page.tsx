import ActivityOverview from '@/components/ActivityOverview';
import ChartsRow from '@/components/ChartsRow';
import Overview from '@/components/Overview';
import RecentTransactionsTable from '@/components/RecentTransactionsTable';
import RevenueTrend from '@/components/RevenueTrend';
import Sidebar from '@/components/Sidebar';
import TopCreatorsTable from '@/components/TopCreatorsTable';
import { SearchBar } from '@/components/ui/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen flex bg-white font-['Neue_Montreal']">
      <Sidebar activePage="dashboard" />

      {/* Main scrolling container - Added overflow-x-hidden to prevent minor overflow glitches */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white" style={{ padding: 0 }}>
        {/* Content Centering Wrapper - Fluid width */}
        <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

          {/* Header Row: Search */}
          <div className="w-full h-[62px] bg-white flex items-center sticky top-0 z-10 px-4 py-4 md:px-12 box-border">
            <SearchBar placeholder="Search users, products, docs" />
          </div>

          {/* Main Content Area */}
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
        </div>
      </main>
    </div>
  );
}
