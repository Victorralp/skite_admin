'use client';

import { useState, useEffect, useRef } from 'react';
import LiveSessionCard from './LiveSessionCard';
import UpcomingSessionCard from './UpcomingSessionCard';
import PastSessionsTable from './PastSessionsTable';
import { cn } from '@/lib/utils';

type SessionType = 'Live' | 'Upcoming' | 'Past';

const FilterPlusIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4.09998 5.8501H7.59998M5.84998 4.1001V7.6001M0.599976 5.8501C0.599976 6.53954 0.735771 7.22223 0.999608 7.85919C1.26345 8.49614 1.65016 9.0749 2.13766 9.56241C2.62517 10.0499 3.20393 10.4366 3.84089 10.7005C4.47785 10.9643 5.16054 11.1001 5.84998 11.1001C6.53942 11.1001 7.2221 10.9643 7.85906 10.7005C8.49602 10.4366 9.07478 10.0499 9.56229 9.56241C10.0498 9.0749 10.4365 8.49614 10.7003 7.85919C10.9642 7.22223 11.1 6.53954 11.1 5.8501C11.1 4.45771 10.5469 3.12235 9.56229 2.13779C8.57772 1.15322 7.24236 0.600098 5.84998 0.600098C4.45759 0.600098 3.12223 1.15322 2.13766 2.13779C1.1531 3.12235 0.599976 4.45771 0.599976 5.8501Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function LiveSessionsGrid() {
  const [activeTab, setActiveTab] = useState<SessionType>('Upcoming');
  const [creatorFilterActive, setCreatorFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Success' | 'Failed' | 'Rejected'>('all');

  const creatorFilterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (creatorFilterRef.current && !creatorFilterRef.current.contains(event.target as Node)) {
        setCreatorFilterActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tabs: SessionType[] = ['Live', 'Upcoming', 'Past'];

  const liveSessions = [
    {
      id: '1',
      type: '1-1' as const,
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      time: '12:30 PM',
      duration: '30min',
      participants: 2
    },
    {
      id: '2',
      type: 'Class' as const,
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      time: '12:30 PM',
      duration: '30min',
      participants: 240
    },
    {
      id: '3',
      type: '1-1' as const,
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      time: '12:30 PM',
      duration: '30min',
      participants: 240
    },
    {
      id: '4',
      type: 'Class' as const,
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      time: '12:30 PM',
      duration: '30min',
      participants: 240
    },
    {
      id: '5',
      type: '1-1' as const,
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      time: '12:30 PM',
      duration: '30min',
      participants: 240
    },
    {
      id: '6',
      type: '1-1' as const,
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      time: '12:30 PM',
      duration: '30min',
      participants: 240
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '2',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '3',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '4',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '5',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '6',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '7',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '8',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '9',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '10',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '11',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    },
    {
      id: '12',
      title: 'Mentorship Session',
      creator: 'Noah Smith',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=100&h=100&fit=crop&crop=face',
      date: 'Today, Mar 26 2025',
      time: '12:30 PM',
      duration: '30min'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Tabs */}
      <div className="w-full flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 h-8 px-4 py-2 rounded-md font-sans text-body-sm transition-colors ${
              activeTab === tab
                ? 'bg-white border border-border-brand text-text-brand'
                : 'bg-white border border-border-primary text-text-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Creator Filter (only show for Upcoming) */}
      {activeTab === 'Upcoming' && (
        <div className="flex items-center gap-[6px] relative">
          {/* Creator Filter Pill */}
          <div className="relative overflow-visible" ref={creatorFilterRef}>
            <button 
              onClick={() => setCreatorFilterActive(!creatorFilterActive)}
              className={cn(
                "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
                creatorFilterActive ? "border-border-brand" : "border-border-primary hover:bg-gray-50"
              )}
            >
              <FilterPlusIcon className={cn("w-2.5 h-2.5", creatorFilterActive ? "text-text-brand" : "text-text-secondary")} />
              <span className={cn("text-[11px] leading-[13px] font-sans", creatorFilterActive ? "text-text-brand" : "text-text-secondary")}>Creator</span>
            </button>
            {creatorFilterActive && (
              <FilterDropdown
                title="Filter by: Creator"
                onApply={() => setCreatorFilterActive(false)}
              />
            )}
          </div>
        </div>
      )}

      {/* Filters for Past tab */}
      {activeTab === 'Past' && (
        <div className="flex items-center gap-[6px] relative overflow-visible">
          {/* Creator Filter */}
          <div className="relative overflow-visible" ref={creatorFilterRef}>
            <button
              onClick={() => setCreatorFilterActive(!creatorFilterActive)}
              className={cn(
                "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
                creatorFilterActive ? "border-border-brand" : "border-border-primary hover:bg-gray-50"
              )}
            >
              <FilterPlusIcon className={cn("w-2.5 h-2.5", creatorFilterActive ? "text-text-brand" : "text-text-secondary")} />
              <span className={cn("text-[11px] leading-[13px] font-sans", creatorFilterActive ? "text-text-brand" : "text-text-secondary")}>Creator</span>
            </button>
            {creatorFilterActive && (
              <FilterDropdown
                title="Filter by: Creator"
                onApply={() => setCreatorFilterActive(false)}
              />
            )}
          </div>

          {/* Status Filter - Toggle Button */}
          <button
            onClick={() => setStatusFilter(
              statusFilter === 'all' ? 'Success' :
                statusFilter === 'Success' ? 'Failed' :
                  statusFilter === 'Failed' ? 'Rejected' :
                    'all'
            )}
            className={cn(
              "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
              statusFilter !== 'all' ? "border-border-brand" : "border-border-primary hover:bg-gray-50"
            )}
          >
            <FilterPlusIcon className={cn("w-2.5 h-2.5", statusFilter !== 'all' ? "text-text-brand" : "text-text-secondary")} />
            <span className={cn("text-[11px] leading-[13px] font-sans", statusFilter !== 'all' ? "text-text-brand" : "text-text-secondary")}>
              {statusFilter === 'all' ? 'Status' : statusFilter}
            </span>
          </button>
        </div>
      )}

      {/* Content Container */}
      {activeTab === 'Past' ? (
        <PastSessionsTable statusFilter={statusFilter} />
      ) : (
        <div className="w-full bg-surface-secondary rounded-lg p-1 flex flex-col gap-1">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1 gap-4 h-8">
            <span className="flex-1 font-sans text-heading-sm text-text-primary">
              {activeTab}
            </span>
            {activeTab === 'Upcoming' && (
              <button className="flex items-center gap-1 h-6 px-2.5 py-1.5 bg-white border border-border-primary rounded-lg shadow-button-soft">
                <span className="font-sans text-caption-lg-regular text-text-secondary">
                  Today
                </span>
                <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 4L9 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="flex flex-wrap gap-1">
            {activeTab === 'Live' && liveSessions.map((session) => (
              <LiveSessionCard key={session.id} session={session} />
            ))}
            {activeTab === 'Upcoming' && upcomingSessions.map((session) => (
              <UpcomingSessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


function FilterDropdown({ title, onApply }: { title: string; onApply: () => void }) {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-border-brand rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px]"
      style={{
        boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      {/* Title */}
      <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
        {title}
      </span>

      {/* Input Fields */}
      <div className="flex flex-col items-start gap-1 w-[161px] h-16">
        {/* From Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            From
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type="text"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
              placeholder=""
            />
            <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">@</span>
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            To
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type="text"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
              placeholder=""
            />
            <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">@</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={onApply}
        className="w-[161px] h-8 flex items-center justify-center px-6 py-[14px] rounded-[9px]"
        style={{
          background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)',
          boxShadow: 'inset 0px 1.5px 1px rgba(255, 255, 255, 0.11)'
        }}
      >
        <span
          className="text-[13.5px] font-medium text-white leading-4 font-sans"
          style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
        >
          Apply
        </span>
      </button>
    </div>
  );
}
