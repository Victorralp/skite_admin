'use client';

import { recentTransactions } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'Success') {
    return (
      <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-success-soft h-[14px] w-fit">
        <CheckCircle2 className="w-[10px] h-[10px] text-success-text" />
        <span className="font-medium text-[10px] leading-[12px] text-success-text">Success</span>
      </div>
    );
  }
  if (status === 'Pending') {
    return (
      <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-warning-soft h-[14px] w-fit">
        <AlertCircle className="w-[10px] h-[10px] text-warning-text" />
        <span className="font-medium text-[10px] leading-[12px] text-warning-text">Pending</span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-danger-soft h-[14px] w-fit">
      <AlertTriangle className="w-[10px] h-[10px] text-danger-text" />
      <span className="font-medium text-[10px] leading-[12px] text-danger-text">Flagged</span>
    </div>
  );
};

export default function RecentTransactionsTable() {
  return (
    <div className="w-full h-[366px] flex flex-col gap-3 font-sans">
      {/* Header */}
      <div className="w-full h-6 flex justify-between items-center">
        <h2 className="font-bold text-xl leading-6 -tracking-[0.01em] text-[#2B2834]">Recent Transactions</h2>
        <button className="font-medium text-[13.5px] leading-4 underline text-[#5F2EFC]">See All</button>
      </div>

      {/* Table Wrapper */}
      <div className="w-full h-[330px] p-1 gap-1 bg-[#F9F9FB] rounded-lg flex flex-col overflow-x-auto">
        {/* Table Header Row */}
        <div className="min-w-[900px] w-full h-[30px] flex items-center px-6 gap-4 py-2">
          <div className="w-[100px] shrink-0 font-medium text-xs text-[#2B2834]">TXN ID</div>
          <div className="flex-1 font-medium text-xs text-[#2B2834]">Product</div>
          <div className="flex-1 font-medium text-xs text-[#2B2834]">Creator</div>
          <div className="flex-1 font-medium text-xs text-[#2B2834]">Buyer</div>
          <div className="w-[100px] shrink-0 font-medium text-xs text-[#2B2834]">Amount</div>
          <div className="w-[120px] shrink-0 font-medium text-xs text-[#2B2834]">Date</div>
          <div className="w-[80px] shrink-0 font-medium text-xs text-[#2B2834]">Status</div>
        </div>

        {/* Rows Container */}
        <div className="min-w-[900px] w-full h-[288px] bg-white border border-[#EBEBEB] rounded-lg flex flex-col overflow-hidden">
          {recentTransactions.map((txn, index) => (
            <div
              key={`${txn.id}-${index}`}
              className={cn(
                "w-full h-[52px] flex items-center px-6 gap-4 bg-white",
                index !== recentTransactions.length - 1 && "border-b border-[#EBEBEB]"
              )}
            >
              <div className="w-[100px] shrink-0 font-normal text-[13.5px] text-[#2B2834]">{txn.id}</div>
              <div className="flex-1 font-normal text-xs leading-[14px] text-[#2B2834] whitespace-nowrap overflow-hidden text-ellipsis">{txn.product}</div>
              <div className="flex-1 font-normal text-[13.5px] text-[#2B2834]">{txn.creator}</div>
              <div className="flex-1 font-normal text-[13.5px] text-[#2B2834]">{txn.buyer}</div>
              <div className="w-[100px] shrink-0 font-normal text-[13.5px] text-[#2B2834]">{txn.amount}</div>
              <div className="w-[120px] shrink-0 font-normal text-[13.5px] text-[#2B2834]">{txn.date}</div>
              <div className="w-[80px] shrink-0">
                <StatusBadge status={txn.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
