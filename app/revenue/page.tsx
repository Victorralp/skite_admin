'use client';

import StatsCard from '@/components/StatsCard';
import RevenueTabs from '@/components/RevenueTabs';
import { revenueStats } from '@/data/dashboard';

export default function RevenuePage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-start gap-8 box-border px-4 py-6 md:px-12">
      {/* Revenue Stats Section */}
      <div className="flex flex-col items-start gap-2 w-full">
        <h2 className="font-['Neue_Montreal'] font-bold text-xl leading-6 tracking-[-0.01em] text-[#2B2834]">
          Revenue
        </h2>
        <div className="flex flex-row items-start gap-2 w-full flex-wrap">
          {revenueStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              delta={stat.delta}
              deltaType={stat.deltaType}
            />
          ))}
        </div>
      </div>

      {/* Tabs and Charts Section */}
      <RevenueTabs />
    </div>
  );
}
