'use client';

import { useState } from 'react';
import { MoreVertical, CircleCheck, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import RejectPayoutModal from './RejectPayoutModal';

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

const StatusBadge = ({ status }: { status: Payout['status'] }) => {
  const config = {
    Success: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Active'
    },
    Pending: {
      bg: '#FFF3EB',
      color: '#FB6A00',
      label: 'Pending'
    },
    Rejected: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Rejected'
    }
  };

  const { bg, color, label } = config[status];

  return (
    <div
      className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded"
      style={{ backgroundColor: bg }}
    >
      {status === 'Success' && (
        <CircleCheck size={10} style={{ color }} />
      )}
      {status === 'Pending' && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16676 8.65792C3.8042 8.57531 3.45595 8.43924 3.13342 8.25417M5.83342 1.34375C6.66182 1.53295 7.40144 1.99779 7.9312 2.66217C8.46095 3.32655 8.74944 4.1511 8.74944 5.00083C8.74944 5.85056 8.46095 6.67512 7.9312 7.3395C7.40144 8.00388 6.66182 8.46872 5.83342 8.65792M1.90801 7.12292C1.68096 6.79256 1.50836 6.42793 1.39676 6.04292M1.30176 4.37583C1.36842 3.98 1.49676 3.605 1.67676 3.26125L1.74717 3.13417M2.87801 1.90875C3.26809 1.64078 3.70537 1.44907 4.16676 1.34375M5.00009 3.33417V5.00083M5.00009 6.6675V6.67167" stroke="#FB6A00" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {status === 'Rejected' && (
        <AlertTriangle size={10} style={{ color }} />
      )}
      <span
        className="font-['Neue_Montreal'] font-medium text-[10px] leading-3"
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
    className={`flex items-center justify-center gap-1 px-[9px] py-1 border border-dashed rounded-full h-[22px] transition-colors ${
      active ? 'border-[#5F2EFC]' : 'border-[#EBEBEB] hover:bg-gray-50'
    }`}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" fill="none" className={active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
      <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.2" className={active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
    </svg>
    <span className={`text-xs font-medium leading-[14px] ${active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'}`}>{label}</span>
  </button>
);

const FilterDropdown = ({ title, onApply }: { title: string; onApply: () => void }) => (
  <div
    className="absolute left-[-0.75px] top-[27px] w-[185px] bg-white border border-[#5F2EFC] rounded-2xl flex flex-col justify-center items-start p-3 gap-[10px]"
    style={{
      boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
      zIndex: 50
    }}
  >
    <span className="text-[12px] font-medium text-[#2B2834] leading-[14px] font-['Neue_Montreal']">
      {title}
    </span>
    {title === 'Filter by: Status' ? (
      <div className="flex flex-col items-start gap-2 w-[161px]">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal']">Success</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal']">Pending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal']">Rejected</span>
        </label>
      </div>
    ) : (
      <div className="flex flex-col items-start gap-1 w-[161px] h-16">
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px]">
            From
          </span>
          <div className="flex-1 h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-md flex items-center justify-end px-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V2.5C10.5 1.94772 10.0523 1.5 9.5 1.5Z" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 0.5V2.5M4 0.5V2.5M1.5 4.5H10.5" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px]">
            To
          </span>
          <div className="flex-1 h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-md flex items-center justify-end px-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V2.5C10.5 1.94772 10.0523 1.5 9.5 1.5Z" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 0.5V2.5M4 0.5V2.5M1.5 4.5H10.5" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    )}
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

const ActionMenu = ({ onClose, isLastRows, onReject }: { onClose: () => void; isLastRows?: boolean; onReject: () => void }) => (
  <div
    className={cn(
      "absolute right-0 w-[89px] h-[74px] bg-white border border-[#EBEBEB] rounded-xl flex flex-col items-center p-0 overflow-hidden",
      isLastRows ? "bottom-[22px]" : "top-[22px]"
    )}
    style={{ 
      boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
      zIndex: 2
    }}
  >
    <button
      onClick={() => {
        console.log('Process payout');
        onClose();
      }}
      className="flex items-center w-[89px] h-[37px] px-4 py-2.5 bg-white border-b-[0.5px] border-[#EBEBEB]"
    >
      <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#2B2834]">
        Process
      </span>
    </button>
    <button
      onClick={() => {
        onReject();
        onClose();
      }}
      className="flex items-center w-[89px] h-[37px] px-4 py-2.5 bg-white"
    >
      <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#CD110A]">
        Reject
      </span>
    </button>
  </div>
);

export default function PayoutsTable() {
  const [paymentMethodFilterActive, setPaymentMethodFilterActive] = useState(false);
  const [productTypeFilterActive, setProductTypeFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Success' | 'Pending' | 'Rejected'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<string | null>(null);

  // Filter payouts based on status
  const filteredPayouts = statusFilter === 'all' 
    ? payouts 
    : payouts.filter(payout => payout.status === statusFilter);

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
        <button className="flex items-center gap-0.5 px-2 py-1 bg-white border border-[#EBEBEB] rounded-lg shadow-[0px_1px_4.8px_rgba(0,0,0,0.03)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33337 10.5V3.5M9.33337 3.5L11.6667 5.90625M9.33337 3.5L7.00004 5.90625M4.66671 3.5V10.5M4.66671 10.5L7.00004 8.09375M4.66671 10.5L2.33337 8.09375" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-['Neue_Montreal'] font-normal text-xs leading-none text-[#5F5971]">
            Sort
          </span>
        </button>
      </div>

      {/* Table Container */}
      <div className="flex flex-col items-start p-1 gap-1 w-full bg-[#F9F9FB] rounded-lg">
        {/* Table Header */}
        <div className="flex items-center px-6 py-2 gap-4 w-full h-[30px]">
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[64.46px]">
            Payout ID
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[157.05px]">
            Date
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] flex-1 min-w-[227.16px]">
            Creator
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] flex-1 min-w-[227.16px]">
            Balance
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[149.1px]">
            Payout Amount
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[59.08px]">
            Status
          </span>
          <div className="w-[18px]" />
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
          {filteredPayouts.map((payout, index) => {
            const isLastRows = index >= filteredPayouts.length - 3;
            return (
              <div
                key={`${payout.id}-${index}`}
                className={cn(
                  'flex items-center px-6 py-2.5 gap-4 w-full h-[50px] bg-white',
                  index < filteredPayouts.length - 1 && 'border-b border-[#EBEBEB]'
                )}
              >
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[64.46px]">
                  {payout.id}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[157.05px]">
                  {payout.date}
                </span>
                <div className="flex flex-col items-start flex-1 min-w-[227.16px] h-[30px]">
                  <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#2B2834] w-full">
                    {payout.creatorName}
                  </span>
                  <span className="font-['Neue_Montreal'] font-normal text-xs leading-none text-[#5F5971] w-full">
                    {payout.creatorHandle}
                  </span>
                </div>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[227.16px]">
                  {payout.balance}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[149.1px]">
                  {payout.payoutAmount}
                </span>
                <div className="w-[59.08px]">
                  <StatusBadge status={payout.status} />
                </div>
                <div className="relative w-[18px] h-[18px] flex-shrink-0">
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === `${payout.id}-${index}` ? null : `${payout.id}-${index}`)}
                    className="w-[18px] h-[18px] flex items-center justify-center"
                  >
                    <MoreVertical size={18} className="text-[#5F5971]" />
                  </button>
                  {openMenuId === `${payout.id}-${index}` && (
                    <ActionMenu 
                      onClose={() => setOpenMenuId(null)} 
                      isLastRows={isLastRows}
                      onReject={() => {
                        setSelectedPayout(`${payout.id}-${index}`);
                        setIsRejectModalOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 w-full h-[30px]">
          <span className="font-['Neue_Montreal'] font-normal text-xs leading-none text-black/50" style={{ textShadow: '0px 2px 20px rgba(0, 0, 0, 0.25)' }}>
            Showing 1 to 12 of 200 results
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center px-3.5 py-0.5 w-[87.5px] h-[30px] bg-[#F9F9FB] opacity-30 rounded-md shadow-[0px_2px_5.4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-center px-3.5 w-[85.5px] h-7 bg-white rounded-[5px] shadow-[0px_4px_27px_rgba(0,0,0,0.18)]">
                <span className="font-['Neue_Montreal'] font-medium text-[13px] leading-4 text-[#5F5971]" style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}>
                  Previous
                </span>
              </div>
            </button>
            <button className="flex items-center justify-center px-3.5 py-0.5 w-[87.5px] h-[30px] bg-[#F9F9FB] rounded-md shadow-[0px_2px_5.4px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-center px-3.5 w-[85.5px] h-7 bg-white rounded-[5px] shadow-[0px_4px_27px_rgba(0,0,0,0.18)]">
                <span className="font-['Neue_Montreal'] font-medium text-[13px] leading-4 text-[#5F5971]" style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}>
                  Next
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Reject Payout Modal */}
      <RejectPayoutModal
        isOpen={isRejectModalOpen}
        onClose={() => {
          setIsRejectModalOpen(false);
          setSelectedPayout(null);
        }}
        onConfirm={(reason) => {
          console.log('Reject payout:', selectedPayout, 'Reason:', reason);
          setIsRejectModalOpen(false);
          setSelectedPayout(null);
        }}
      />
    </div>
  );
}
