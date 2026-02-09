'use client';

import { useState } from 'react';
import LiveSessionCard from './LiveSessionCard';
import UpcomingSessionCard from './UpcomingSessionCard';
import PastSessionsTable from './PastSessionsTable';

type SessionType = 'Live' | 'Upcoming' | 'Past';

export default function LiveSessionsGrid() {
  const [activeTab, setActiveTab] = useState<SessionType>('Upcoming');
  const [creatorFilterActive, setCreatorFilterActive] = useState(false);
  const [statusFilterActive, setStatusFilterActive] = useState(false);

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
            className={`flex-1 h-8 px-4 py-2 rounded-md font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] transition-colors ${
              activeTab === tab
                ? 'bg-white border border-[#5F2EFC] text-[#5F2EFC]'
                : 'bg-white border border-[#EBEBEB] text-[#5F5971]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Creator Filter (only show for Upcoming) */}
      {activeTab === 'Upcoming' && (
        <div className="flex items-center gap-2 relative">
          {/* Creator Filter Pill */}
          <div className="relative">
            <button 
              onClick={() => setCreatorFilterActive(!creatorFilterActive)}
              className={`flex items-center justify-center gap-1 h-[22px] px-[9px] py-1 border border-dashed rounded-full transition-colors ${
                creatorFilterActive ? 'border-[#5F2EFC]' : 'border-[#EBEBEB] hover:bg-gray-50'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" fill="none" className={creatorFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
                <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.2" className={creatorFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
              </svg>
              <span className={`text-xs font-medium leading-[14px] ${creatorFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'}`}>Creator</span>
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
        <div className="flex items-center gap-2">
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setStatusFilterActive(!statusFilterActive);
                setCreatorFilterActive(false);
              }}
              className={`flex items-center justify-center gap-1 h-[22px] px-[9px] py-1 border border-dashed rounded-full transition-colors ${
                statusFilterActive ? 'border-[#5F2EFC]' : 'border-[#EBEBEB] hover:bg-gray-50'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" fill="none" className={statusFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
                <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.2" className={statusFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
              </svg>
              <span className={`text-xs font-medium leading-[14px] ${statusFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'}`}>Status</span>
            </button>
            {statusFilterActive && (
              <FilterDropdown
                title="Filter by: Status"
                onApply={() => setStatusFilterActive(false)}
              />
            )}
          </div>

          {/* Creator Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setCreatorFilterActive(!creatorFilterActive);
                setStatusFilterActive(false);
              }}
              className={`flex items-center justify-center gap-1 h-[22px] px-[9px] py-1 border border-dashed rounded-full transition-colors ${
                creatorFilterActive ? 'border-[#5F2EFC]' : 'border-[#EBEBEB] hover:bg-gray-50'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" fill="none" className={creatorFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
                <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.2" className={creatorFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
              </svg>
              <span className={`text-xs font-medium leading-[14px] ${creatorFilterActive ? 'text-[#5F2EFC]' : 'text-[#5F5971]'}`}>Creator</span>
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

      {/* Content Container */}
      {activeTab === 'Past' ? (
        <PastSessionsTable />
      ) : (
        <div className="w-full bg-[#F9F9FB] rounded-lg p-1 flex flex-col gap-1">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1 gap-4 h-8">
            <span className="flex-1 font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">
              {activeTab}
            </span>
            {activeTab === 'Upcoming' && (
              <button className="flex items-center gap-1 h-6 px-2.5 py-1.5 bg-white border border-[#EBEBEB] rounded-lg shadow-[0px_1px_4.8px_rgba(0,0,0,0.03)]">
                <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
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
  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-[#5F2EFC] rounded-2xl flex flex-col justify-center items-start p-3 gap-[10px]"
      style={{
        boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      {/* Title */}
      <span className="text-[12px] font-medium text-[#2B2834] leading-[14px] font-['Neue_Montreal']">
        {title}
      </span>

      {/* Input Fields */}
      <div className="flex flex-col items-start gap-1 w-[161px] h-16">
        {/* From Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px]">
            From
          </span>
          <div className="flex-1 h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-md flex items-center justify-end px-2">
            <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal']">@</span>
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px]">
            To
          </span>
          <div className="flex-1 h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-md flex items-center justify-end px-2">
            <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal']">@</span>
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
          className="text-[13.5px] font-medium text-[#FFFCF8] leading-4 font-['Neue_Montreal']"
          style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
        >
          Apply
        </span>
      </button>
    </div>
  );
}
