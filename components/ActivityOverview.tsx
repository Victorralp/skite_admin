'use client';

const StatPill = ({ label, value }: { label: string; value: string }) => (
  <span className="flex-1 inline-flex items-center justify-between h-7 p-2 rounded bg-surface">
    <span className="h-3 font-sans font-normal text-[10px] leading-none tracking-normal text-text-muted">{label}</span>
    <span className="font-sans font-medium text-[10px] leading-none tracking-normal text-text-main">{value}</span>
  </span>
);

const ActivityCard = ({ title, value, children }: { title: string; value: string; children: React.ReactNode }) => (
  <div className="bg-white min-w-[250px] flex-1 h-24 p-1 flex flex-col justify-between rounded-lg border border-border-subtle box-border">
    <div className="px-2.5 pt-2">
      <p className="mb-1 w-full h-[14px] font-sans font-normal text-xs leading-none text-text-muted">{title}</p>
      <p className="w-full h-[22px] font-sans font-medium text-lg leading-none tracking-normal text-text-main">{value}</p>
    </div>
    <div className="flex items-center w-full gap-1">
      {children}
    </div>
  </div>
);

export default function ActivityOverview() {
  return (
    <section className="w-full">
      <h2 className="mb-4 w-full h-6 font-sans font-bold text-xl leading-none -tracking-[0.01em] text-text-main">Activity Overview</h2>
      <div className="w-full flex gap-2 flex-wrap">

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
