'use client';

const StatPill = ({ label, value }: { label: string; value: string }) => (
  <span className="flex-1 inline-flex items-center justify-between h-7 p-2 rounded bg-surface-secondary">
    <span className="h-3 font-normal text-[10px] leading-3 tracking-normal text-[#676767] font-['Neue_Montreal']">{label}</span>
    <span className="font-medium text-[10px] leading-3 tracking-normal text-text-primary font-['Neue_Montreal']">{value}</span>
  </span>
);

const ActivityCard = ({ title, value, children }: { title: string; value: string; children: React.ReactNode }) => (
  <div className="bg-white flex-1 h-24 p-1 flex flex-col rounded-lg border border-border-primary box-border">
    <div className="p-2.5 flex flex-col gap-1">
      <p className="w-full h-[14px] font-normal text-xs leading-[14px] text-text-secondary font-['Neue_Montreal']">{title}</p>
      <p className="w-full h-[22px] font-medium text-lg leading-[22px] tracking-normal text-text-primary font-['Neue_Montreal']">{value}</p>
    </div>
    <div className="flex items-start w-full gap-1">
      {children}
    </div>
  </div>
);

export default function ActivityOverview() {
  return (
    <section className="w-full flex flex-col gap-2">
      <h2 className="w-full h-6 font-bold text-xl leading-6 -tracking-[0.01em] text-text-primary font-['Neue_Montreal']">Activity Overview</h2>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">

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
      </div>
    </section>
  );
}
