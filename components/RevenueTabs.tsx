'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import RevenueOverview from './RevenueOverview';
import TransactionsTable from './TransactionsTable';
import PayoutsTable from './PayoutsTable';
import RefundsTable from './RefundsTable';

type TabType = 'Overview' | 'Transactions' | 'Payouts' | 'Refunds';

const tabs: TabType[] = ['Overview', 'Transactions', 'Payouts', 'Refunds'];

export default function RevenueTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');

  return (
    <div className="flex flex-col items-start w-full">
      {/* Tab Navigation */}
      <div className="flex flex-row items-center w-full h-[38px]">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 flex flex-col justify-center items-center pt-2.5 gap-3 h-[38px] cursor-pointer',
              'rounded-t-2xl',
              activeTab === tab ? 'bg-[#F9F9FB]' : ''
            )}
          >
            <span
              className={cn(
                "font-['Neue_Montreal'] font-medium text-[13.5px] leading-4",
                activeTab === tab ? 'text-[#2B2834]' : 'text-[#A5A1AF]'
              )}
            >
              {tab}
            </span>
            <div
              className={cn(
                'w-full h-0',
                activeTab === tab ? 'border-2 border-[#5F2EFC]' : 'border border-[#EBEBEB]'
              )}
            />
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full bg-[#F9F9FB] rounded-b-[36px] p-6">
        {activeTab === 'Overview' && <RevenueOverview />}
        {activeTab === 'Transactions' && <TransactionsTable />}
        {activeTab === 'Payouts' && <PayoutsTable />}
        {activeTab === 'Refunds' && <RefundsTable />}
      </div>
    </div>
  );
}
