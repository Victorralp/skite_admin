'use client';

const StatPill = ({ label, value }: { label: string; value: string }) => (
  <span className="flex-1 inline-flex items-center justify-between" style={{ height: '28px', padding: '8px', borderRadius: '4px', background: '#F9F9FB' }}>
    <span style={{ height: '12px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '10px', lineHeight: '100%', letterSpacing: '0%', color: '#676767' }}>{label}</span>
    <span style={{ fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '10px', lineHeight: '100%', letterSpacing: '0%', color: '#2B2834' }}>{value}</span>
  </span>
);

const ActivityCard = ({ title, value, children }: { title: string; value: string; children: React.ReactNode }) => (
  <div className="bg-white" style={{ minWidth: '250px', flex: 1, height: '96px', padding: '4px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '8px', border: '1px solid #EBEBEB', boxSizing: 'border-box' }}>
    <div className="px-2.5 pt-2">
      <p className="mb-1" style={{ width: '100%', height: '14px', fontFamily: 'Neue Montreal', fontWeight: 400, fontSize: '12px', lineHeight: '100%', color: '#5F5971' }}>{title}</p>
      <p style={{ width: '100%', height: '22px', fontFamily: 'Neue Montreal', fontWeight: 500, fontSize: '18px', lineHeight: '100%', letterSpacing: '0%', color: '#2B2834' }}>{value}</p>
    </div>
    <div className="flex items-center w-full" style={{ gap: '4px' }}>
      {children}
    </div>
  </div>
);

export default function ActivityOverview() {
  return (
    <section style={{ width: '100%' }}>
      <h2 className="mb-4" style={{
        width: '100%',
        height: '24px',
        fontFamily: 'Neue Montreal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '100%',
        letterSpacing: '-1%',
        color: '#2B2834'
      }}>Activity Overview</h2>
      <div style={{ width: '100%', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>

        {/* Messages Card */}
        <ActivityCard title="Messages" value="12,635">
          <StatPill label="Text" value="67%" />
          <StatPill label="Files" value="18%" />
          <StatPill label="Links" value="12%" />
        </ActivityCard>

        {/* Live Sessions Card */}
        <ActivityCard title="Live Sessions" value="12">
          <StatPill label="1-1 Calls" value="3" />
          <StatPill label="Turnout" value="1,393" />
        </ActivityCard>

        {/* Sales Card */}
        <ActivityCard title="Sales" value="623">
          <div className="w-full flex">
            <StatPill label="Abandoned Carts" value="156 (12%)" />
          </div>
        </ActivityCard>

        {/* Pageviews Card */}
        <ActivityCard title="Pageviews" value="124,920">
          <div className="w-full flex">
            <StatPill label="Top Creator" value="@SkitMaster" />
          </div>
        </ActivityCard>

      </div>
    </section>
  );
}
