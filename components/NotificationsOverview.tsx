'use client';

import { useState } from 'react';
import StatsCard from './StatsCard';
import NotificationsTable from './NotificationsTable';

export default function NotificationsOverview() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col items-start p-6 gap-8 w-full max-w-[1230px]">
      {/* Page Title */}
      <h1 className="font-['Neue_Montreal'] font-bold text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
        Notifications
      </h1>

      {/* Stats Cards */}
      <div className="flex flex-row items-start gap-2 w-full">
        <StatsCard
          title="Unread"
          value="247"
          delta="+45 today"
          deltaType="positive"
        />
        <StatsCard
          title="System Alerts"
          value="156"
          trend="63%"
          trendDirection="neutral"
        />
        <StatsCard
          title="Operational"
          value="67"
          trend="27%"
          trendDirection="neutral"
        />
        <StatsCard
          title="Announcements"
          value="23"
          trend="9%"
          trendDirection="neutral"
        />
      </div>

      {/* Notifications Table */}
      <NotificationsTable />
    </div>
  );
}