'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import RevenueOverview from './RevenueOverview';
import TransactionsTable from './TransactionsTable';
import PayoutsTable from './PayoutsTable';
import RefundsTable from './RefundsTable';

type TabType = 'Overview' | 'Transactions' | 'Payouts' | 'Refunds';

const tabs: TabType[] = ['Overview', 'Transactions', 'Payouts', 'Refunds'];

export default function RevenueTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeTab !== 'Overview') {
      setIsLoading(false);
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col items-start w-full relative">
      {isLoading && (
        <div className="absolute inset-0 z-[60] bg-white/75 backdrop-blur-sm rounded-b-[36px] rounded-t-2xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-border-primary border-t-transparent animate-spin" />
            <span className="font-sans text-caption-lg text-text-secondary">Loading revenue...</span>
          </div>
        </div>
      )}
      {/* Tab Navigation */}
      <div className="flex flex-row items-center w-full h-[38px]">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 flex flex-col justify-center items-center pt-2.5 gap-3 h-[38px] cursor-pointer',
              'rounded-t-2xl',
              activeTab === tab ? 'bg-surface-secondary' : ''
            )}
          >
            <span
              className={cn(
                "font-sans text-body-sm",
                activeTab === tab ? 'text-text-primary' : 'text-text-tertiary'
              )}
            >
              {tab}
            </span>
            <div
              className={cn(
                'w-full h-0',
                activeTab === tab ? 'border-2 border-border-brand' : 'border border-border-primary'
              )}
            />
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full bg-surface-secondary rounded-b-[36px] p-6">
        {activeTab === 'Overview' && <RevenueOverview onLoadingChange={setIsLoading} />}
        {activeTab === 'Transactions' && <TransactionsTable />}
        {activeTab === 'Payouts' && <PayoutsTable />}
        {activeTab === 'Refunds' && <RefundsTable />}
      </div>
    </div>
  );
}
