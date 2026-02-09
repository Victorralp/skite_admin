'use client';

import { useState } from 'react';
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
      label: 'Active'
    },
    Pending: {
      bg: '#FFF3EB',
      color: '#FB6A00',
      label: 'Pending'
    },
    Failed: {
      bg: '#FBECEB',
      color: '#CD110A',
      label: 'Failed'
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
      {status === 'Failed' && (
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
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal']">Failed</span>
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

const ActionMenu = ({ onClose, isLastRows, onHold, onView }: { onClose: () => void; isLastRows?: boolean; onHold: () => void; onView: () => void }) => (
  <div
    className={cn(
      "absolute right-0 w-[83px] h-[111px] bg-white border border-[#EBEBEB] rounded-xl flex flex-col items-center p-0 overflow-hidden",
      isLastRows ? "bottom-[22px]" : "top-[22px]"
    )}
    style={{ 
      boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
      zIndex: 2
    }}
  >
    <button
      onClick={() => {
        onView();
        onClose();
      }}
      className="flex items-center w-[83px] h-[37px] px-4 py-2.5 bg-white border-b-[0.5px] border-[#EBEBEB]"
    >
      <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#2B2834]">
        View
      </span>
    </button>
    <button
      onClick={() => {
        console.log('Refund transaction');
        onClose();
      }}
      className="flex items-center w-[83px] h-[37px] px-4 py-2.5 bg-white border-b-[0.5px] border-[#EBEBEB]"
    >
      <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#2B2834]">
        Refund
      </span>
    </button>
    <button
      onClick={() => {
        onHold();
        onClose();
      }}
      className="flex items-center w-[83px] h-[37px] px-4 py-2.5 bg-white"
    >
      <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#CD110A]">
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
                setStatusFilterActive(false);
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
                setStatusFilterActive(false);
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
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[72.67px] whitespace-nowrap">
            TXN ID
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[98.88px] whitespace-nowrap">
            Date
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] flex-1 min-w-[129.05px] whitespace-nowrap">
            Creator
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] flex-1 min-w-[129.05px] whitespace-nowrap">
            Buyer
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] flex-1 min-w-[129.05px] whitespace-nowrap">
            Product/Service
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[82.12px] whitespace-nowrap">
            Amount
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[54.77px] whitespace-nowrap">
            Fee
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[81.39px] whitespace-nowrap">
            Creator Net
          </span>
          <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#2B2834] w-[59px] whitespace-nowrap">
            Status
          </span>
          <div className="w-[18px]" />
        </div>

        {/* Table Body */}
        <div className="flex flex-col items-start w-full bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
          {filteredTransactions.map((txn, index) => {
            const isLastRows = index >= filteredTransactions.length - 3;
            return (
              <div
                key={`${txn.id}-${index}`}
                className={cn(
                  'flex items-center px-6 py-3.5 gap-4 w-full h-[46px] bg-white',
                  index < filteredTransactions.length - 1 && 'border-b border-[#EBEBEB]'
                )}
              >
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[72.67px] whitespace-nowrap">
                  {txn.id}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-xs leading-none text-[#5F5971] w-[98.88px] whitespace-nowrap">
                  {txn.date}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[129.05px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.creator}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[129.05px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.buyer}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] flex-1 min-w-[129.05px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {txn.product}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[82.12px] whitespace-nowrap">
                  {txn.amount}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[54.77px] whitespace-nowrap">
                  {txn.fee}
                </span>
                <span className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#2B2834] w-[81.39px] whitespace-nowrap">
                  {txn.creatorNet}
                </span>
                <div className="w-[59px]">
                  <StatusBadge status={txn.status} />
                </div>
                <div className="relative w-[18px] h-[18px] flex-shrink-0">
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === `${txn.id}-${index}` ? null : `${txn.id}-${index}`)}
                    className="w-[18px] h-[18px] flex items-center justify-center"
                  >
                    <MoreVertical size={18} className="text-[#5F5971]" />
                  </button>
                  {openMenuId === `${txn.id}-${index}` && (
                    <ActionMenu 
                      onClose={() => setOpenMenuId(null)} 
                      isLastRows={isLastRows}
                      onHold={() => {
                        setSelectedTransaction(`${txn.id}-${index}`);
                        setIsHoldModalOpen(true);
                      }}
                      onView={() => {
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
        }}
        onConfirm={(reason) => {
          console.log('Hold transaction:', selectedTransaction, 'Reason:', reason);
          setIsHoldModalOpen(false);
          setSelectedTransaction(null);
        }}
      />

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTransactionData(null);
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
          paymentMethod: 'Card',
          status: selectedTransactionData.status
        } : undefined}
      />
    </div>
  );
}
