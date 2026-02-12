'use client';

import { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';

type PastSession = {
  id: string;
  sessionTitle: string;
  creator: string;
  username: string;
  date: string;
  time: string;
  attendees: number;
  duration: string;
  status: 'Success' | 'Failed' | 'Rejected';
};

const pastSessions: PastSession[] = [
  { id: '1', sessionTitle: 'Macmillan Publishers', creator: 'Temilade Odunsi', username: '@rubyred', date: '2 min ago', time: '12:23 pm', attendees: 607, duration: '4 min', status: 'Success' },
  { id: '2', sessionTitle: 'McGraw-Hill Education', creator: 'Emeka Onwudiwe', username: '@gracewong', date: '3 min ago', time: '07:13 pm', attendees: 891, duration: '9 min', status: 'Success' },
  { id: '3', sessionTitle: 'Macmillan Publishers', creator: 'Blessing Okon', username: '@jadewong', date: '5 min ago', time: '01:55 pm', attendees: 571, duration: '3 min', status: 'Success' },
  { id: '4', sessionTitle: 'Hachette Livre', creator: 'Yahaya Ibrahim', username: '@masongray', date: '11 min ago', time: '10:32 pm', attendees: 608, duration: '7 min', status: 'Success' },
  { id: '5', sessionTitle: 'HarperCollins', creator: 'Fatima Musa', username: '@bella', date: '14 min ago', time: '02:30 pm', attendees: 433, duration: '9 min', status: 'Failed' },
  { id: '6', sessionTitle: 'Scholastic Corporation', creator: 'Nnamdi Kalu', username: '@oliviajones', date: '23 min ago', time: '05:36 pm', attendees: 662, duration: '7 min', status: 'Success' },
  { id: '7', sessionTitle: 'HarperCollins', creator: 'Iretiola Osho', username: '@ivyjade', date: '27 min ago', time: '11:23 pm', attendees: 402, duration: '6 min', status: 'Success' },
  { id: '8', sessionTitle: 'Penguin Random House', creator: 'Chidi Nwachukwu', username: '@samwise', date: '31 min ago', time: '01:08 pm', attendees: 815, duration: '3 min', status: 'Success' },
  { id: '9', sessionTitle: 'Thomson Reuters', creator: 'Kayode Ajayi', username: '@rileybrown', date: '35 min ago', time: '07:38 am', attendees: 517, duration: '5 min', status: 'Success' },
  { id: '10', sessionTitle: 'Bertelsmann', creator: 'Tolulope Adebayo', username: '@willowgreen', date: '46 min ago', time: '11:49 pm', attendees: 191, duration: '7 min', status: 'Failed' },
  { id: '11', sessionTitle: 'Hachette Livre', creator: 'Ishaya Tanko', username: '@ellierose', date: '49 min ago', time: '03:48 am', attendees: 432, duration: '6 min', status: 'Failed' },
  { id: '12', sessionTitle: 'HarperCollins', creator: 'Yetunde Bakare', username: '@jackwilson', date: '53 min ago', time: '06:41 pm', attendees: 957, duration: '10 min', status: 'Rejected' },
];

export default function PastSessionsTable({ statusFilter = 'all' }: { statusFilter?: 'all' | 'Success' | 'Failed' | 'Rejected' }) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter sessions based on status
  const filteredSessions = statusFilter === 'all' 
    ? pastSessions 
    : pastSessions.filter(session => session.status === statusFilter);

  return (
    <div className="w-full bg-surface-secondary rounded-lg p-1 flex flex-col gap-1">
      {/* Table Header */}
      <div className="grid grid-cols-[repeat(7,minmax(0,1fr))_24px] items-center px-6 py-2 gap-4 h-[30px]">
        <div className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
          Session Title
        </div>
        <div className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
          Creator
        </div>
        <div className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
          Date
        </div>
        <div className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
          Time
        </div>
        <div className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
          Attendees
        </div>
        <div className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
          Duration
        </div>
        <div className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
          Status
        </div>
        <div className="flex justify-end opacity-0">1</div>
      </div>

      {/* Table Body */}
      <div className="bg-white border border-border-primary rounded-lg overflow-hidden">
        {filteredSessions.map((session) => (
          <SessionRow
            key={session.id}
            session={session}
            isMenuOpen={openMenuId === session.id}
            onMenuToggle={() => setOpenMenuId(openMenuId === session.id ? null : session.id)}
            menuRef={openMenuId === session.id ? menuRef : null}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pl-6 h-[30px]">
        <span className="text-[12px] text-black/50 font-sans">
          Showing 1 to {filteredSessions.length} of {filteredSessions.length} results
        </span>
        <div className="flex gap-2">
          <button className="p-[1px] bg-surface-secondary rounded-md opacity-30 shadow-segmented-outer h-[30px] w-[87.5px]">
            <div className="flex items-center justify-center bg-white rounded-[5px] h-[28px] shadow-segmented-inner">
              <span className="text-[13px] font-medium text-text-secondary leading-4 font-sans">
                Previous
              </span>
            </div>
          </button>
          <button className="p-[1px] bg-surface-secondary rounded-md shadow-segmented-outer h-[30px] w-[87.5px]">
            <div className="flex items-center justify-center bg-white rounded-[5px] h-[28px] shadow-segmented-inner">
              <span className="text-[13px] font-medium text-text-secondary leading-4 font-sans">
                Next
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function SessionRow({
  session,
  isMenuOpen,
  onMenuToggle,
  menuRef,
}: {
  session: PastSession;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  menuRef: React.RefObject<HTMLDivElement> | null;
}) {
  const statusConfig = {
    Success: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Success',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="3.75" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.75 5.00033L4.58333 5.83366L6.25 4.16699" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    Failed: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Failed',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3.74975V5.41642M5 6.66642H5.00417M4.31792 1.496L0.940416 7.13517C0.870789 7.25575 0.833944 7.39245 0.833545 7.53169C0.833146 7.67092 0.869208 7.80784 0.938143 7.92881C1.00708 8.04978 1.10648 8.1506 1.22647 8.22123C1.34646 8.29187 1.48286 8.32986 1.62208 8.33142H8.37792C8.51708 8.32981 8.6534 8.29182 8.77334 8.22121C8.89327 8.15059 8.99263 8.04983 9.06156 7.92892C9.13048 7.808 9.16656 7.67116 9.16621 7.53199C9.16587 7.39281 9.12911 7.25615 9.05958 7.13559L5.68208 1.49559C5.61102 1.3783 5.51092 1.28131 5.39144 1.214C5.27196 1.14669 5.13714 1.11133 5 1.11133C4.86286 1.11133 4.72804 1.14669 4.60856 1.214C4.48908 1.28131 4.38898 1.3783 4.31792 1.49559V1.496Z" stroke="#CD110A" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    Rejected: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Rejected',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3.74975V5.41642M5 6.66642H5.00417M4.31792 1.496L0.940416 7.13517C0.870789 7.25575 0.833944 7.39245 0.833545 7.53169C0.833146 7.67092 0.869208 7.80784 0.938143 7.92881C1.00708 8.04978 1.10648 8.1506 1.22647 8.22123C1.34646 8.29187 1.48286 8.32986 1.62208 8.33142H8.37792C8.51708 8.32981 8.6534 8.29182 8.77334 8.22121C8.89327 8.15059 8.99263 8.04983 9.06156 7.92892C9.13048 7.808 9.16656 7.67116 9.16621 7.53199C9.16587 7.39281 9.12911 7.25615 9.05958 7.13559L5.68208 1.49559C5.61102 1.3783 5.51092 1.28131 5.39144 1.214C5.27196 1.14669 5.13714 1.11133 5 1.11133C4.86286 1.11133 4.72804 1.14669 4.60856 1.214C4.48908 1.28131 4.38898 1.3783 4.31792 1.49559V1.496Z" stroke="#CD110A" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  };

  const status = statusConfig[session.status];

  return (
    <div className="grid grid-cols-[repeat(7,minmax(0,1fr))_24px] items-center px-6 py-2.5 gap-4 border-b border-border-primary last:border-b-0 h-[50px]">
      <div className="text-[13.5px] font-medium text-text-primary leading-4 font-sans overflow-hidden text-ellipsis whitespace-nowrap">
        {session.sessionTitle}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[13.5px] font-medium text-text-primary leading-4 font-sans overflow-hidden text-ellipsis whitespace-nowrap">
          {session.creator}
        </span>
        <span className="text-[12px] font-normal text-text-secondary leading-[14px] font-sans overflow-hidden text-ellipsis whitespace-nowrap">
          {session.username}
        </span>
      </div>
      <div className="text-[13.5px] font-normal text-text-primary leading-4 font-sans overflow-hidden text-ellipsis whitespace-nowrap">
        {session.date}
      </div>
      <div className="text-[13.5px] font-normal text-text-primary leading-4 font-sans overflow-hidden text-ellipsis whitespace-nowrap">
        {session.time}
      </div>
      <div className="text-[13.5px] font-normal text-text-primary leading-4 font-sans overflow-hidden text-ellipsis whitespace-nowrap">
        {session.attendees}
      </div>
      <div className="text-[13.5px] font-normal text-text-primary leading-4 font-sans overflow-hidden text-ellipsis whitespace-nowrap">
        {session.duration}
      </div>
      <div>
        <span
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium leading-3 font-sans"
          style={{ backgroundColor: status.bg, color: status.color }}
        >
          {status.icon}
          {status.label}
        </span>
      </div>
      <div className="relative flex justify-end h-[18px] flex-shrink-0" ref={menuRef}>
        <button onClick={onMenuToggle} className="w-[18px] h-[18px] flex items-center justify-center">
          <MoreVertical className="h-[18px] w-[18px] text-text-secondary" strokeWidth={2.25} />
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 top-[34px] w-[134px] bg-white border border-border-primary rounded-xl shadow-dropdown z-10">
            <button className="w-full h-[37px] px-4 py-2.5 text-left font-sans text-body-sm text-text-primary hover:bg-surface-secondary border-b border-border-primary">
              View Details
            </button>
            <button className="w-full h-[37px] px-4 py-2.5 text-left font-sans text-body-sm text-text-primary hover:bg-surface-secondary border-b border-border-primary">
              Creator Profile
            </button>
            <button className="w-full h-[37px] px-4 py-2.5 text-left font-sans text-body-sm text-text-danger hover:bg-surface-secondary">
              Delete Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


function FilterDropdown({ title, onApply }: { title: string; onApply: () => void }) {
  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-border-brand rounded-2xl flex flex-col justify-center items-start p-3 gap-[10px]"
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
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px]">
            From
          </span>
          <div className="flex-1 h-[30px] bg-surface-secondary border border-border-primary rounded-md flex items-center justify-end px-2">
            <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans">@</span>
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px]">
            To
          </span>
          <div className="flex-1 h-[30px] bg-surface-secondary border border-border-primary rounded-md flex items-center justify-end px-2">
            <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans">@</span>
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
