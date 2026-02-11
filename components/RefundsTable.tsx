'use client';

import { useState } from 'react';
import { MoreVertical, CircleCheck, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type Refund = {
  id: string;
  date: string;
  product: string;
  productType: string;
  creator: string;
  buyer: string;
  amount: string;
  status: 'Success' | 'Pending' | 'Declined';
};

const refunds: Refund[] = [
  {
    id: 'TXN7564',
    date: '2 hours 52 min ago',
    product: 'Skit Production Coaching',
    productType: 'eBook',
    creator: 'Mfonobong Essien',
    buyer: 'Mfonobong Essien',
    amount: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN4444',
    date: '7 hours 34 min ago',
    product: 'Skit Production Coaching',
    productType: 'eBook',
    creator: 'Tolulope Adebayo',
    buyer: 'Tolulope Adebayo',
    amount: '₦12,920.99',
    status: 'Pending'
  },
  {
    id: 'TXN1234',
    date: '3 min ago',
    product: 'Skit Production Coaching',
    productType: 'eBook',
    creator: 'Adesuwa Ighodaro',
    buyer: 'Adesuwa Ighodaro',
    amount: '₦12,920.99',
    status: 'Declined'
  },
  {
    id: 'TXN1904',
    date: '9 hours 29 min ago',
    product: 'Skit Production Coaching',
    productType: 'eBook',
    creator: 'Yetunde Bakare',
    buyer: 'Yetunde Bakare',
    amount: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN1802',
    date: '1 hour 24 min ago',
    product: 'Skit Production Coaching',
    productType: 'eBook',
    creator: 'Chidi Nwachukwu',
    buyer: 'Chidi Nwachukwu',
    amount: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN2020',
    date: '8 hours 15 min ago',
    product: 'Skit Production Coaching',
    productType: 'eBook',
    creator: 'Kelechi Uche',
    buyer: 'Kelechi Uche',
    amount: '₦12,920.99',
    status: 'Success'
  }
];

const StatusBadge = ({ status }: { status: Refund['status'] }) => {
  const config = {
    Success: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Success'
    },
    Pending: {
      bg: '#FFF3EB',
      color: '#FB6A00',
      label: 'Pending'
    },
    Declined: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Declined'
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
      {status === 'Declined' && (
        <AlertTriangle size={10} style={{ color }} />
      )}
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
    className={`flex items-center justify-center gap-1.5 pl-2.5 pr-3 border border-dashed rounded-full h-5 transition-colors ${
      active ? 'border-border-brand' : 'border-border-primary hover:bg-gray-50'
    }`}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
      <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" fill="none" className={active ? 'text-text-brand' : 'text-text-secondary'} />
      <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.2" className={active ? 'text-text-brand' : 'text-text-secondary'} />
    </svg>
    <span className={`text-[11px] leading-[13px] font-medium ${active ? 'text-text-brand' : 'text-text-secondary'}`}>{label}</span>
  </button>
);

const FilterDropdown = ({ title, onApply }: { title: string; onApply: () => void }) => (
  <div
    className="absolute left-[-0.75px] top-[27px] w-[185px] bg-white border border-border-brand rounded-2xl flex flex-col justify-center items-start p-3 gap-[10px]"
    style={{
      boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
      zIndex: 50
    }}
  >
    <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
      {title}
    </span>
    {title === 'Filter by: Status' ? (
      <div className="flex flex-col items-start gap-2 w-[161px]">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans">Success</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans">Pending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans">Declined</span>
        </label>
      </div>
    ) : (
      <div className="flex flex-col items-start gap-1 w-[161px] h-16">
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px]">
            From
          </span>
          <div className="flex-1 h-[30px] bg-surface-secondary border border-border-primary rounded-md flex items-center justify-end px-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V2.5C10.5 1.94772 10.0523 1.5 9.5 1.5Z" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 0.5V2.5M4 0.5V2.5M1.5 4.5H10.5" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px]">
            To
          </span>
          <div className="flex-1 h-[30px] bg-surface-secondary border border-border-primary rounded-md flex items-center justify-end px-2">
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
        className="text-[13.5px] font-medium text-white leading-4 font-sans"
        style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
      >
        Apply
      </span>
    </button>
  </div>
);

export default function RefundsTable() {
  const [paymentMethodFilterActive, setPaymentMethodFilterActive] = useState(false);
  const [productTypeFilterActive, setProductTypeFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Success' | 'Pending' | 'Declined'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Filter refunds based on status
  const filteredRefunds = statusFilter === 'all' 
    ? refunds 
    : refunds.filter(refund => refund.status === statusFilter);

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
                statusFilter === 'Pending' ? 'Declined' : 'all'
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
        <div className="flex items-center px-6 py-2 gap-4 w-full h-[30px]">
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[10%]">
            TXN ID
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[12%]">
            Date
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[18%]">
            Product
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[10%]">
            Product type
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[15%]">
            Creator
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[15%]">
            Buyer
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[12%]">
            Amount
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[8%]">
            Status
          </span>
          <div className="w-[4%]" />
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-border-primary rounded-lg">
          {filteredRefunds.map((refund, index) => (
            <div
              key={`${refund.id}-${index}`}
              className={cn(
                'flex items-center px-6 py-3.5 gap-4 w-full h-[46px] bg-white',
                index < filteredRefunds.length - 1 && 'border-b border-border-primary'
              )}
            >
              <span className="font-sans text-body-sm-regular text-text-primary w-[10%] truncate">
                {refund.id}
              </span>
              <span className="font-sans font-normal text-xs leading-none text-text-secondary w-[12%] truncate">
                {refund.date}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary w-[18%] truncate">
                {refund.product}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary w-[10%] truncate">
                {refund.productType}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary w-[15%] truncate">
                {refund.creator}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary w-[15%] truncate">
                {refund.buyer}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary w-[12%] truncate">
                {refund.amount}
              </span>
              <div className="w-[8%]">
                <StatusBadge status={refund.status} />
              </div>
              <div className="relative w-[4%] h-[18px]">
                <button 
                  onClick={() => setOpenMenuId(openMenuId === `${refund.id}-${index}` ? null : `${refund.id}-${index}`)}
                  className="w-[18px] h-[18px] flex items-center justify-center"
                >
                  <MoreVertical size={18} className="text-text-secondary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
