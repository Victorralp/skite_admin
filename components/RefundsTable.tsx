'use client';

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
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
    Declined: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Declined',
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
      className="flex items-center justify-center px-1.5 py-0.5 gap-0.5 rounded w-fit h-[14px]"
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
        <div className="grid grid-cols-[repeat(8,minmax(0,1fr))_24px] items-center px-6 py-2 gap-4 w-full h-[30px]">
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            TXN ID
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Date
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Product
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Product type
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Creator
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Buyer
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Amount
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary">
            Status
          </span>
          <div className="flex justify-end" />
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-border-primary rounded-lg">
          {filteredRefunds.map((refund, index) => (
            <div
              key={`${refund.id}-${index}`}
              className={cn(
                'grid grid-cols-[repeat(8,minmax(0,1fr))_24px] items-center px-6 py-3.5 gap-4 w-full h-[46px] bg-white',
                index < filteredRefunds.length - 1 && 'border-b border-border-primary'
              )}
            >
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {refund.id}
              </span>
              <span className="font-sans font-normal text-xs leading-none text-text-secondary truncate">
                {refund.date}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {refund.product}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {refund.productType}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {refund.creator}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {refund.buyer}
              </span>
              <span className="font-sans text-body-sm-regular text-text-primary truncate">
                {refund.amount}
              </span>
              <div>
                <StatusBadge status={refund.status} />
              </div>
              <div className="relative flex justify-end h-[18px]">
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
