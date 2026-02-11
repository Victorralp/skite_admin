'use client';

import StatsCard from '@/components/StatsCard';
import RevenueTabs from '@/components/RevenueTabs';
import PageContainer from '@/components/layout/PageContainer';
import { revenueStats } from '@/data/dashboard';

export default function RevenuePage() {
  return (
    <PageContainer>
      {/* Revenue Stats Section */}
      <div className="flex flex-col items-start gap-2 w-full h-32">
        <h1 className="font-sans text-heading-lg-bold text-text-primary w-[79px] h-6">
          Revenue
        </h1>
        <div className="flex flex-row items-start gap-2 w-full h-24">
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
    </PageContainer>
  );
}
