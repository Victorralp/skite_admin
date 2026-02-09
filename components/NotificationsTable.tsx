'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import ActionMenu from './ActionMenu';

type NotificationStatus = 'High' | 'Medium' | 'Low';
type NotificationType = 'System' | 'Operational' | 'Announcements' | 'Live';
type NotificationReadStatus = 'Action Required' | 'Read' | 'Unread' | 'Resolved';

type Notification = {
  id: string;
  subject: string;
  status: NotificationStatus;
  type: NotificationType;
  readStatus: NotificationReadStatus;
  date: string;
};

const notifications: Notification[] = [
  {
    id: '1',
    subject: 'Paystack balance <₦10M',
    status: 'High',
    type: 'System',
    readStatus: 'Action Required',
    date: '12.03.2025 00:23'
  },
  {
    id: '2',
    subject: 'Friday payout ₦8.7M complete',
    status: 'Medium',
    type: 'Operational',
    readStatus: 'Read',
    date: '12.03.2025 00:23'
  },
  {
    id: '3',
    subject: 'Platform upgrade complete',
    status: 'Low',
    type: 'Announcements',
    readStatus: 'Read',
    date: '12.03.2025 00:23'
  },
  {
    id: '4',
    subject: 'Session ended @EmekaEdits',
    status: 'High',
    type: 'Live',
    readStatus: 'Unread',
    date: '12.03.2025 00:23'
  },
  {
    id: '5',
    subject: 'Server load 87% (warning)',
    status: 'Medium',
    type: 'System',
    readStatus: 'Resolved',
    date: '12.03.2025 00:23'
  }
];

const StatusBadge = ({ status }: { status: NotificationStatus }) => {
  const config = {
    High: {
      bg: '#FBECEB',
      color: '#CD110A',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 0.833L8.333 8.333H1.667L5 0.833Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 3.333V5.833M5 7.5H5.004" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Medium: {
      bg: '#FFF3EB',
      color: '#FB6A00',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M4.16676 8.65792C3.8042 8.57531 3.45595 8.43924 3.13342 8.25417M5.83342 1.34375C6.66182 1.53295 7.40144 1.99779 7.9312 2.66217C8.46095 3.32655 8.74944 4.1511 8.74944 5.00083C8.74944 5.85056 8.46095 6.67512 7.9312 7.3395C7.40144 8.00388 6.66182 8.46872 5.83342 8.65792M1.90801 7.12292C1.68096 6.79256 1.50836 6.42793 1.39676 6.04292M1.30176 4.37583C1.36842 3.98 1.49676 3.605 1.67676 3.26125L1.74717 3.13417M2.87801 1.90875C3.26809 1.64078 3.70537 1.44907 4.16676 1.34375M5.00009 3.33417V5.00083M5.00009 6.6675V6.67167" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Low: {
      bg: '#E7F3EF',
      color: '#239B73',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="1"/>
          <path d="M3.5 5L4.5 6L6.5 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  };

  const { bg, color, icon } = config[status];

  return (
    <div
      className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded"
      style={{ backgroundColor: bg }}
    >
      <div style={{ color }}>
        {icon}
      </div>
      <span
        className="font-['Neue_Montreal'] font-medium text-[10px] leading-3"
        style={{ color }}
      >
        {status}
      </span>
    </div>
  );
};

const FilterPill = ({ 
  label, 
  active, 
  onClick 
}: { 
  label: string; 
  active: boolean; 
  onClick: () => void;
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center justify-center gap-1 px-[7px] py-1 border border-dashed rounded-full h-[22px] transition-colors",
      active ? "border-[#5F2EFC]" : "border-[#EBEBEB] hover:bg-gray-50"
    )}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle 
        cx="6" 
        cy="6" 
        r="5.25" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        fill="none" 
        className={active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} 
      />
      <path 
        d="M6 3V9M3 6H9" 
        stroke="currentColor" 
        strokeWidth="1.2" 
        className={active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} 
      />
    </svg>
    <span className={cn(
      "text-xs font-medium leading-[14px]",
      active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'
    )}>
      {label}
    </span>
  </button>
);

interface NotificationsTableProps {
  // No props needed for now
}

export default function NotificationsTable({}: NotificationsTableProps = {}) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Filter notifications based on active filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilters = activeFilters.length === 0 || 
      activeFilters.some(filter => {
        switch (filter) {
          case 'High':
            return notification.status === 'High';
          case 'Medium':
            return notification.status === 'Medium';
          case 'Low':
            return notification.status === 'Low';
          case 'System Alerts':
            return notification.type === 'System';
          case 'Operational':
            return notification.type === 'Operational';
          case 'Announcements':
            return notification.type === 'Announcements';
          case 'Live':
            return notification.type === 'Live';
          default:
            return false;
        }
      });

    return matchesFilters;
  });

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* Filter Bar */}
      <div className="flex justify-between items-center w-full h-6">
        <div className="flex items-center justify-center gap-1.5">
          <FilterPill 
            label="High" 
            active={activeFilters.includes('High')}
            onClick={() => toggleFilter('High')}
          />
          <FilterPill 
            label="Medium" 
            active={activeFilters.includes('Medium')}
            onClick={() => toggleFilter('Medium')}
          />
          <FilterPill 
            label="Low" 
            active={activeFilters.includes('Low')}
            onClick={() => toggleFilter('Low')}
          />
          <FilterPill 
            label="System Alerts" 
            active={activeFilters.includes('System Alerts')}
            onClick={() => toggleFilter('System Alerts')}
          />
          <FilterPill 
            label="Operational" 
            active={activeFilters.includes('Operational')}
            onClick={() => toggleFilter('Operational')}
          />
          <FilterPill 
            label="Announcements" 
            active={activeFilters.includes('Announcements')}
            onClick={() => toggleFilter('Announcements')}
          />
          <FilterPill 
            label="Live" 
            active={activeFilters.includes('Live')}
            onClick={() => toggleFilter('Live')}
          />
        </div>
        
        <button className="flex items-center gap-0.5 px-2.5 py-1 bg-white border border-[#EBEBEB] rounded-lg shadow-[0px_1px_4.8px_rgba(0,0,0,0.03)] h-6">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9.33337 10.5V3.5M9.33337 3.5L11.6667 5.90625M9.33337 3.5L7.00004 5.90625M4.66671 3.5V10.5M4.66671 10.5L7.00004 8.09375M4.66671 10.5L2.33337 8.09375" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#5F5971]">
            Sort
          </span>
        </button>
      </div>

      {/* Table Container */}
      <div className="flex flex-col items-start p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg">
        {/* Table Header */}
        <div className="flex items-center px-6 py-2 gap-4 w-full h-[30px]">
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] flex-1">
            Subject
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[57px]">
            Status
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[95px]">
            Type
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[120px]">
            Status
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-[14px] text-[#2B2834] w-[120px]">
            Date
          </span>
          <div className="w-[18px]" />
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
          {filteredNotifications.map((notification, index) => (
            <div
              key={notification.id}
              className={cn(
                'flex items-center px-6 py-3 gap-4 w-full h-[42px] bg-white',
                index < filteredNotifications.length - 1 && 'border-b border-[#EBEBEB]'
              )}
            >
              <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#2B2834] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {notification.subject}
              </span>
              
              <div className="w-[57px] flex justify-start">
                <StatusBadge status={notification.status} />
              </div>
              
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[95px]">
                {notification.type}
              </span>
              
              <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[120px]">
                {notification.readStatus}
              </span>
              
              <span className="font-['Neue_Montreal'] font-normal text-xs leading-[14px] text-[#5F5971] w-[120px]">
                {notification.date}
              </span>
              
              <div className="relative w-[18px] h-[18px] flex-shrink-0">
                <button 
                  onClick={() => setOpenMenuId(openMenuId === notification.id ? null : notification.id)}
                  className="w-[18px] h-[18px] flex items-center justify-center"
                >
                  <MoreVertical size={18} className="text-[#5F5971]" />
                </button>
                {openMenuId === notification.id && (
                  <div className="absolute right-0 top-[22px] z-50">
                    <ActionMenu
                      simpleMode={true}
                      option1Label="Mark as Read"
                      option2Label="Delete"
                      onOption1={() => {
                        console.log('Mark as read:', notification.id);
                        setOpenMenuId(null);
                      }}
                      onOption2={() => {
                        console.log('Delete notification:', notification.id);
                        setOpenMenuId(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}