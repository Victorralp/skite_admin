'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, CircleCheck, AlertTriangle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import HoldTransactionModal from './HoldTransactionModal';
import TransactionDetailsModal from './TransactionDetailsModal';

type Transaction = {
  id: string;
  date: string;
  creator: string;
  buyer: string;
  product: string;
  amount: string;
  fee: string;
  creatorNet: string;
  status: 'Success' | 'Pending' | 'Failed';
};

const transactions: Transaction[] = [
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Titi Oladipo',
    buyer: 'Halima Zubair',
    product: 'Digital Course',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Chidi Nwachukwu',
    buyer: 'Mohammed Garba',
    product: 'Digital Course',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Pending'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Oluchi Nnamdi',
    buyer: 'Abimbola Adefemi',
    product: 'Template',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Failed'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Idowu Akinyele',
    buyer: 'Aminu Bello',
    product: 'Template',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Mohammed Garba',
    buyer: 'Bukky Alabi',
    product: 'Digital Course',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Salihu Idris',
    buyer: 'Bashir Lawal',
    product: 'Digital Course',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Pending'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Zubairu Sani',
    buyer: 'Adaeze Obi',
    product: 'Template',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Aminu Bello',
    buyer: 'Rita Chukwuma',
    product: 'Digital Course',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Failed'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Tosin Aluko',
    buyer: 'Amaka Okoro',
    product: 'Template',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Adaeze Obi',
    buyer: 'Tochukwu Anene',
    product: 'Digital Course',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Bashir Lawal',
    buyer: 'Emeka Onwudiwe',
    product: 'Template',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  },
  {
    id: 'TXN12IUD',
    date: '12.03.2025 00:23',
    creator: 'Yetunde Bakare',
    buyer: 'Obinna Okeke',
    product: 'Digital Course',
    amount: '₦12,920.99',
    fee: '₦430',
    creatorNet: '₦12,920.99',
    status: 'Success'
  }
];
const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
  const config = {
    Success: {
      bg: '#E7F3EF',
      color: '#239B73',
      label: 'Active',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="4.5" stroke="#239B73" strokeWidth="1"/>
          <path d="M3.75 5L4.375 5.625L6.25 3.75" stroke="#239B73" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Pending: {
      bg: '#FFF3EB',
      color: '#FB6A00',
      label: 'Pending',
      icon: (
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.36512 7.81417C3.00256 7.73156 2.65431 7.59549 2.33179 7.41042M5.03179 0.5C5.86019 0.689197 6.59981 1.15404 7.12956 1.81842C7.65931 2.4828 7.9478 3.30735 7.9478 4.15708C7.9478 5.00681 7.65931 5.83137 7.12956 6.49575C6.59981 7.16013 5.86019 7.62497 5.03179 7.81417M1.10637 6.27917C0.879327 5.94881 0.70672 5.58418 0.595122 5.19917M0.500122 3.53208C0.566789 3.13625 0.695122 2.76125 0.875122 2.4175L0.945539 2.29042M2.07637 1.065C2.46645 0.797033 2.90374 0.605325 3.36512 0.5M4.19846 2.49042V4.15708M4.19846 5.82375V5.82792" stroke="#FB6A00" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    Failed: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Failed',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 1.25L8.125 8.75H1.875L5 1.25Z" stroke="#CD110A" strokeWidth="1"/>
          <path d="M5 4V6" stroke="#CD110A" strokeWidth="1"/>
          <circle cx="5" cy="7.5" r="0.5" fill="#CD110A"/>
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
    className={cn(
      "flex items-center justify-center px-2 py-1 gap-1 rounded-full border font-sans font-medium text-xs leading-none h-[22px]",
      active
        ? "bg-brand-primary border-border-brand text-white"
        : "bg-white border-dashed border-border-primary text-text-secondary"
    )}
  >
    {!active && (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="6" r="5.25" stroke="#5F5971" strokeWidth="1.2"/>
        <path d="M6 3.5V8.5M3.5 6H8.5" stroke="#5F5971" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    )}
    {label}
  </button>
);
const FilterDropdown = ({ title, onApply }: { title: string; onApply: () => void }) => (
  <div
    className="absolute left-[-0.75px] top-[27px] w-[185px] bg-white border border-border-brand rounded-2xl flex flex-col justify-center items-start p-3 gap-[10px]"
    style={{
      boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
      zIndex: 10
    }}
  >
    <span className="font-sans font-medium text-xs leading-none text-text-primary">
      {title}
    </span>
    <div className="flex flex-col items-start gap-2 w-full">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-3 h-3" />
        <span className="font-sans font-normal text-xs leading-none text-text-secondary">
          Option 1
        </span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" className="w-3 h-3" />
        <span className="font-sans font-normal text-xs leading-none text-text-secondary">
          Option 2
        </span>
      </label>
    </div>
    <button
      onClick={onApply}
      className="w-full py-2 bg-brand-primary text-white rounded-lg font-sans font-medium text-xs"
    >
      Apply
    </button>
  </div>
);
const ActionMenu = ({ onClose, isLastRows, onHold, onView }: { onClose: () => void; isLastRows?: boolean; onHold: () => void; onView: () => void }) => (
  <div
    className={cn(
      "absolute right-0 w-[83px] h-[111px] bg-white border border-border-primary rounded-xl flex flex-col items-center p-0 overflow-hidden",
      isLastRows ? "bottom-[22px]" : "top-[22px]"
    )}
    onClick={(e) => e.stopPropagation()}
    style={{
      boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
      zIndex: 2
    }}
  >
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClose();
        onView();
      }}
      className="flex items-center w-[83px] h-[37px] px-4 py-2.5 bg-white border-b-[0.5px] border-border-primary"
    >
      <span className="font-sans text-body-sm text-text-primary">
        View
      </span>
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        console.log('Refund transaction');
        onClose();
      }}
      className="flex items-center w-[83px] h-[37px] px-4 py-2.5 bg-white border-b-[0.5px] border-border-primary"
    >
      <span className="font-sans text-body-sm text-text-primary">
        Refund
      </span>
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClose();
        onHold();
      }}
      className="flex items-center w-[83px] h-[37px] px-4 py-2.5 bg-white"
    >
      <span className="font-sans text-body-sm text-text-danger">
        Hold
      </span>
    </button>
  </div>
);
export default function TransactionsTable() {
  const [paymentMethodFilterActive, setPaymentMethodFilterActive] = useState(false);
  const [productTypeFilterActive, setProductTypeFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'Success' | 'Pending' | 'Failed'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTransactionData, setSelectedTransactionData] = useState<Transaction | null>(null);
  const [activeModal, setActiveModal] = useState<'none' | 'details' | 'hold'>('none');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
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

  // Filter transactions based on status
  const filteredTransactions = statusFilter === 'all'
    ? transactions
    : transactions.filter(txn => txn.status === statusFilter);

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* Filter Bar */}
      <div className="flex justify-between items-center w-full h-6">
        <div className="flex items-center justify-center gap-1.5 relative">
          <div className="relative">
            <FilterPill
              label="Payment Method"
              active={paymentMethodFilterActive}
              onClick={() => {
                setPaymentMethodFilterActive(!paymentMethodFilterActive);
                setProductTypeFilterActive(false);
              }}
            />
            {paymentMethodFilterActive && (
              <FilterDropdown
                title="Filter by: Payment Method"
                onApply={() => setPaymentMethodFilterActive(false)}
              />
            )}
          </div>

          <div className="relative">
            <FilterPill
              label="Product Type"
              active={productTypeFilterActive}
              onClick={() => {
                setProductTypeFilterActive(!productTypeFilterActive);
                setPaymentMethodFilterActive(false);
              }}
            />
            {productTypeFilterActive && (
              <FilterDropdown
                title="Filter by: Product Type"
                onApply={() => setProductTypeFilterActive(false)}
              />
            )}
          </div>

          <div className="relative">
            <FilterPill
              label={statusFilter === 'all' ? 'Status' : statusFilter}
              active={statusFilter !== 'all'}
              onClick={() => {
                setStatusFilter(
                  statusFilter === 'all' ? 'Success' :
                    statusFilter === 'Success' ? 'Pending' :
                      statusFilter === 'Pending' ? 'Failed' : 'all'
                );
              }}
            />
          </div>
        </div>
        <button className="flex items-center gap-0.5 px-2.5 py-1.25 bg-white border border-border-primary rounded-lg shadow-button-soft h-6">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.33337 10.5V3.5M9.33337 3.5L11.6667 5.90625M9.33337 3.5L7.00004 5.90625M4.66671 3.5V10.5M4.66671 10.5L7.00004 8.09375M4.66671 10.5L2.33337 8.09375" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round" />
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
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[72.67px] whitespace-nowrap">
            TXN ID
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[98.88px] whitespace-nowrap">
            Date
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[129.05px] whitespace-nowrap flex-grow">
            Creator
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[129.05px] whitespace-nowrap flex-grow">
            Buyer
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[129.05px] whitespace-nowrap flex-grow">
            Product/Service
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[82.12px] whitespace-nowrap">
            Amount
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[54.77px] whitespace-nowrap">
            Fee
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[81.39px] whitespace-nowrap">
            Creator Net
          </span>
          <span className="font-sans font-medium text-xs leading-none text-text-primary w-[59px] whitespace-nowrap">
            Status
          </span>
          <div className="w-[18px]" />
        </div>
        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-border-primary rounded-lg">
          {filteredTransactions.map((txn, index) => {
            const isLastRows = index >= filteredTransactions.length - 3;
            return (
              <div
                key={`${txn.id}-${index}`}
                onClick={() => {
                  setSelectedTransactionData(txn);
                  setActiveModal('details');
                  setIsDetailsModalOpen(true);
                }}
                className={cn(
                  'flex items-center px-6 py-3.5 gap-4 w-full h-[46px] bg-white cursor-pointer hover:bg-gray-50 transition-colors',
                  index < filteredTransactions.length - 1 && 'border-b border-border-primary'
                )}
              >
                <span className="font-sans text-body-sm-regular text-text-primary w-[72.67px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.id}
                </span>
                <span className="font-sans font-normal text-xs leading-none text-text-secondary w-[98.88px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.date}
                </span>
                <span className="font-sans text-body-sm-regular text-text-primary w-[129.05px] whitespace-nowrap overflow-hidden text-ellipsis flex-grow">
                  {txn.creator}
                </span>
                <span className="font-sans text-body-sm-regular text-text-primary w-[129.05px] whitespace-nowrap overflow-hidden text-ellipsis flex-grow">
                  {txn.buyer}
                </span>
                <span className="font-sans text-body-sm-regular text-text-primary w-[129.05px] whitespace-nowrap overflow-hidden text-ellipsis flex-grow">
                  {txn.product}
                </span>
                <span className="font-sans text-body-sm-regular text-text-primary w-[82.12px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.amount}
                </span>
                <span className="font-sans text-body-sm-regular text-text-primary w-[54.77px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.fee}
                </span>
                <span className="font-sans text-body-sm-regular text-text-primary w-[81.39px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.creatorNet}
                </span>
                <div className="w-[59px] flex items-center">
                  <StatusBadge status={txn.status} />
                </div>
                <div className="relative w-[18px] h-[18px]" ref={openMenuId === `${txn.id}-${index}` ? menuRef : null}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === `${txn.id}-${index}` ? null : `${txn.id}-${index}`);
                    }}
                    className="w-[18px] h-[18px] flex items-center justify-center"
                  >
                    <MoreVertical size={18} className="text-text-secondary" />
                  </button>
                  {openMenuId === `${txn.id}-${index}` && (
                    <ActionMenu
                      onClose={() => setOpenMenuId(null)}
                      isLastRows={isLastRows}
                      onHold={() => {
                        setOpenMenuId(null);
                        setActiveModal('hold');
                        setIsDetailsModalOpen(false);
                        setSelectedTransactionData(null);
                        setSelectedTransaction(`${txn.id}-${index}`);
                        setIsHoldModalOpen(true);
                      }}
                      onView={() => {
                        setOpenMenuId(null);
                        setActiveModal('details');
                        setSelectedTransactionData(txn);
                        setIsDetailsModalOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Hold Transaction Modal */}
      <HoldTransactionModal
        isOpen={isHoldModalOpen}
        onClose={() => {
          setIsHoldModalOpen(false);
          setSelectedTransaction(null);
          setActiveModal('none');
        }}
        onConfirm={(reason) => {
          console.log('Hold transaction:', selectedTransaction, 'Reason:', reason);
          setIsHoldModalOpen(false);
          setSelectedTransaction(null);
          setActiveModal('none');
        }}
      />

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen && activeModal === 'details'}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTransactionData(null);
          setActiveModal('none');
        }}
        transaction={selectedTransactionData ? {
          id: selectedTransactionData.id,
          date: selectedTransactionData.date.split(' ')[0],
          time: selectedTransactionData.date.split(' ')[1],
          creator: selectedTransactionData.creator,
          buyer: selectedTransactionData.buyer,
          product: selectedTransactionData.product,
          productType: selectedTransactionData.product,
          amount: selectedTransactionData.amount,
          fee: selectedTransactionData.fee,
          paymentMethod: 'Paystack Card',
          status: selectedTransactionData.status
        } : undefined}
      />
    </div>
  );
}
