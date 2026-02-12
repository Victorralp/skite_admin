'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, CircleCheck, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type Payout = {
  id: string;
  date: string;
  creatorName: string;
  creatorHandle: string;
  balance: string;
  payoutAmount: string;
  status: 'Success' | 'Pending' | 'Rejected';
};

const payouts: Payout[] = [
  {
    id: 'PO8274',
    date: '11.04.2020, 17:30',
    creatorName: 'Temilade Odunsi',
    creatorHandle: '@rubyred',
    balance: '₦12,920,090',
    payoutAmount: '₦12,174,700.00',
    status: 'Success'
  },
  {
    id: 'PO8274',
    date: '13.04.2020, 11:00',
    creatorName: 'Emeka Onwudiwe',
    creatorHandle: '@gracewong',
    balance: '₦12,920,090',
    payoutAmount: '₦174,700.00',
    status: 'Success'
  },
  {
    id: 'PO8274',
    date: '22.03.2020, 04:00',
    creatorName: 'Blessing Okon',
    creatorHandle: '@jadewong',
    balance: '₦12,920,090',
    payoutAmount: '₦8,174,700.00',
    status: 'Success'
  },
  {
    id: 'PO8274',
    date: '24.01.2020, 01:00',
    creatorName: 'Yahaya Ibrahim',
    creatorHandle: '@masongray',
    balance: '₦12,920,090',
    payoutAmount: '₦74,700.00',
    status: 'Success'
  },
  {
    id: 'PO8274',
    date: '22.05.2020, 13:00',
    creatorName: 'Fatima Musa',
    creatorHandle: '@bella',
    balance: '₦12,920,090',
    payoutAmount: '₦8,000.00',
    status: 'Rejected'
  },
  {
    id: 'PO8274',
    date: '14.04.2020, 10:00',
    creatorName: 'Nnamdi Kalu',
    creatorHandle: '@oliviajones',
    balance: '₦12,920,090',
    payoutAmount: '₦4,700.00',
    status: 'Success'
  },
  {
    id: 'PO8274',
    date: '14.02.2020, 18:00',
    creatorName: 'Tolulope Adebayo',
    creatorHandle: '@willowgreen',
    balance: '₦12,920,090',
    payoutAmount: '₦12,174,700.00',
    status: 'Pending'
  },
  {
    id: 'PO8274',
    date: '10.04.2020, 12:45',
    creatorName: 'Ishaya Tanko',
    creatorHandle: '@ellierose',
    balance: '₦12,920,090',
    payoutAmount: '₦34,174,700.00',
    status: 'Pending'
  },
  {
    id: 'PO8274',
    date: '18.02.2020, 13:00',
    creatorName: 'Yetunde Bakare',
    creatorHandle: '@jackwilson',
    balance: '₦12,920,090',
    payoutAmount: '₦1,000,000.00',
    status: 'Rejected'
  }
];

const StatusBadge = ({ status }: { status: 'Success' | 'Pending' | 'Rejected' }) => {
  const config = {
    Success: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Success',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="3.75" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.75 5.00033L4.58333 5.83366L6.25 4.16699" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Pending: {
      bg: '#FFF3EB',
      color: '#FB6A00',
      label: 'Pending',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16667 8.65694C3.80411 8.57433 3.45585 8.43826 3.13333 8.25319M5.83333 1.34277C6.66173 1.53197 7.40135 1.99681 7.9311 2.66119C8.46086 3.32557 8.74935 4.15013 8.74935 4.99986C8.74935 5.84959 8.46086 6.67414 7.9311 7.33852C7.40135 8.0029 6.66173 8.46774 5.83333 8.65694M1.90792 7.12194C1.68087 6.79158 1.50826 6.42695 1.39667 6.04194M1.30167 4.37486C1.36833 3.97902 1.49667 3.60402 1.67667 3.26027L1.74708 3.13319M2.87792 1.90777C3.268 1.63981 3.70528 1.4481 4.16667 1.34277M5 3.33319V4.99986M5 6.66652V6.67069" stroke="#FB6A00" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Rejected: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Rejected',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3.74975V5.41642M5 6.66642H5.00417M4.31792 1.496L0.940416 7.13517C0.870789 7.25575 0.833944 7.39245 0.833545 7.53169C0.833146 7.67092 0.869208 7.80784 0.938143 7.92881C1.00708 8.04978 1.10648 8.1506 1.22647 8.22123C1.34646 8.29187 1.48286 8.32986 1.62208 8.33142H8.37792C8.51708 8.32981 8.6534 8.29182 8.77334 8.22121C8.89327 8.15059 8.99263 8.04983 9.06156 7.92892C9.13048 7.808 9.16656 7.67116 9.16621 7.53199C9.16587 7.39281 9.12911 7.25615 9.05958 7.13559L5.68208 1.49559C5.61102 1.3783 5.51092 1.28131 5.39144 1.214C5.27196 1.14669 5.13714 1.11133 5 1.11133C4.86286 1.11133 4.72804 1.14669 4.60856 1.214C4.48908 1.28131 4.38898 1.3783 4.31792 1.49559V1.496Z" stroke="#CD110A" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  };
  
  const { bg, color, label, icon } = config[status];
  
  return (
    <div 
      className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded"
      style={{ backgroundColor: bg }}
    >
      {icon}
      <span 
        className="font-sans font-medium text-[10px] leading-3"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
};

const FilterPill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center justify-center gap-1.5 pl-2.5 pr-3 border border-dashed rounded-full h-5 transition-colors",
      active ? 'border-border-brand' : 'border-border-primary hover:bg-gray-50'
    )}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
      <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" fill="none" className={active ? 'text-text-brand' : 'text-text-secondary'} />
      <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.2" className={active ? 'text-text-brand' : 'text-text-secondary'} />
    </svg>
    <span className={cn("text-[11px] leading-[13px] font-medium font-sans", active ? 'text-text-brand' : 'text-text-secondary')}>{label}</span>
  </button>
);

export default function PayoutsTable() {
  const [paymentMethodFilterActive, setPaymentMethodFilterActive] = useState(false);
  const [productTypeFilterActive, setProductTypeFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Success' | 'Pending' | 'Rejected'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const filteredPayouts = payouts.filter(payout => 
    statusFilter === 'all' || payout.status === statusFilter
  );

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* Filter Bar */}
      <div className="flex justify-between items-center w-full h-6">
        <div className="flex items-center justify-center gap-1.5 relative">
          <FilterPill 
            label="Payment Method" 
            active={paymentMethodFilterActive}
            onClick={() => {
              setPaymentMethodFilterActive(!paymentMethodFilterActive);
              setProductTypeFilterActive(false);
            }}
          />
          <FilterPill 
            label="Product Type" 
            active={productTypeFilterActive}
            onClick={() => {
              setProductTypeFilterActive(!productTypeFilterActive);
              setPaymentMethodFilterActive(false);
            }}
          />
          <FilterPill 
            label={statusFilter === 'all' ? 'Status' : statusFilter}
            active={statusFilter !== 'all'}
            onClick={() => {
              setStatusFilter(
                statusFilter === 'all' ? 'Success' :
                statusFilter === 'Success' ? 'Pending' :
                statusFilter === 'Pending' ? 'Rejected' : 'all'
              );
            }}
          />
        </div>
        <button className="flex items-center gap-0.5 px-2 py-1 bg-white border border-border-primary rounded-lg shadow-button-soft">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33337 10.5V3.5M9.33337 3.5L11.6667 5.90625M9.33337 3.5L7.00004 5.90625M4.66671 3.5V10.5M4.66671 10.5L7.00004 8.09375M4.66671 10.5L2.33337 8.09375" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-sans font-normal text-xs leading-none text-text-secondary">
            Sort
          </span>
        </button>
      </div>

      {/* Table Container */}
      <div className="flex flex-col items-start p-1 gap-1 w-full bg-surface-secondary rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-[repeat(6,minmax(0,1fr))_24px] items-center px-6 py-2 gap-4 w-full h-[30px]">
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Payout ID
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Date
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Creator
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Balance
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Payout Amount
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Status
          </span>
          <div className="flex justify-end opacity-0">1</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-border-primary rounded-lg">
          {filteredPayouts.map((payout, index) => (
            <div
              key={`${payout.id}-${index}`}
              className={cn(
                'grid grid-cols-[repeat(6,minmax(0,1fr))_24px] items-center px-6 py-2.5 gap-4 w-full h-[50px] bg-white',
                index < filteredPayouts.length - 1 && 'border-b border-border-primary'
              )}
            >
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {payout.id}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {payout.date}
              </span>
              <div className="flex flex-col items-start min-w-0">
                <span className="font-sans text-body-sm text-text-primary truncate w-full">
                  {payout.creatorName}
                </span>
                <span className="font-sans font-normal text-xs leading-[14px] text-text-secondary truncate w-full">
                  {payout.creatorHandle}
                </span>
              </div>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {payout.balance}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {payout.payoutAmount}
              </span>
              <div className="flex items-center">
                <StatusBadge status={payout.status} />
              </div>
              <div className="relative flex justify-end h-[18px]" ref={openMenuId === `${payout.id}-${index}` ? menuRef : null}>
                <button 
                  onClick={() => setOpenMenuId(openMenuId === `${payout.id}-${index}` ? null : `${payout.id}-${index}`)}
                  className="w-[18px] h-[18px] flex items-center justify-center"
                >
                  <MoreVertical size={18} className="text-text-secondary" strokeWidth={2.25} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center pl-6 h-[30px] w-full">
          <span className="text-xs text-black/50 font-sans">
            Showing 1 to 12 of 200 results
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
    </div>
  );
}
