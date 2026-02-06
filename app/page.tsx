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
        <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

          {/* Header Row: Search */}
          <div style={{
            width: '100%',
            height: '62px',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            // Reduced padding from 64px to 48px to accommodate scrollbar on 1440px screens (1230+210 > 1420ish)
            padding: '16px 48px',
            boxSizing: 'border-box',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <SearchBar placeholder="Search users, products, docs" />
          </div>

          {/* Main Content Area */}
          <div style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            // Reduced padding to match header
            padding: '24px 48px',
            gap: '32px',
            boxSizing: 'border-box'
          }}>

            <Overview />

            {/* Revenue Trend Section */}
            <div style={{ width: '100%', height: '614px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                height: '578px',
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
