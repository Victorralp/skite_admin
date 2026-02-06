'use client';


import { topCreators } from '@/data/dashboard';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

import CustomDropdown from '@/components/ui/CustomDropdown';

export default function TopCreatorsTable() {
  return (
    <div className="w-full h-[346px] p-4 flex flex-col gap-3 bg-white border border-border-subtle rounded-lg box-border">
      {/* Header */}
      <div className="w-full h-[30px] flex justify-between items-center shrink-0">
        <h3 className="font-sans font-medium text-[13.5px] leading-4 text-text-main">Top Creators</h3>
        <CustomDropdown options={['Today', 'Yesterday', 'Last 7 days']} defaultLabel="Today" />
      </div>

      {/* Table Container */}
      <div className="w-full h-[272px] p-1 gap-1 bg-surface rounded-xl flex flex-col">

        {/* Table Headers */}
        <div className="w-full h-[30px] flex items-center px-6 py-2 gap-4">
          <div className="w-[27px] font-sans font-medium text-xs text-text-main">Rank</div>
          <div className="flex-1 font-sans font-medium text-xs text-text-main">Name</div>
          <div className="w-[166px] font-sans font-medium text-xs text-text-main">Username</div>
          <div className="flex-1 font-sans font-medium text-xs text-text-main">Email</div>
          <div className="w-[162px] font-sans font-medium text-xs text-text-main">Revenue Generated</div>
          <div className="w-11 font-sans font-medium text-xs text-text-main">Actions</div>
        </div>

        {/* Rows Container */}
        <div className="w-full h-[230px] bg-white border border-border-subtle rounded-lg flex flex-col overflow-hidden">
          {topCreators.map((creator, index) => (
            <div key={creator.rank} className={cn(
              "w-full h-[46px] flex items-center px-6 py-[14px] gap-4 bg-white",
              index !== topCreators.length - 1 && "border-b border-border-subtle"
            )}>
              <div className="w-[27px] font-sans font-normal text-[13.5px] text-text-main">{creator.rank}</div>
              <div className="flex-1 font-sans font-normal text-[13.5px] text-text-main">{creator.name}</div>
              <div className="w-[166px] font-sans font-normal text-[13.5px] text-text-main">{creator.username}</div>
              <div className="flex-1 font-sans font-normal text-[13.5px] text-text-main">{creator.email}</div>
              <div className="w-[162px] font-sans font-normal text-[13.5px] text-text-main">{creator.revenue}</div>
              <div className="w-11 flex justify-center">
                <Mail className="w-[18px] h-[18px] text-text-muted" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
