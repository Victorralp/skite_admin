'use client';

import { X, Copy } from 'lucide-react';
import { useEffect } from 'react';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: {
    id: string;
    date: string;
    time: string;
    creator: string;
    buyer: string;
    product: string;
    productType: string;
    amount: string;
    fee: string;
    paymentMethod: string;
    status: 'Success' | 'Pending' | 'Failed';
  };
}

export default function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !transaction) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(transaction.id);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50 overflow-hidden">
      <div className="w-[600px] h-full bg-white flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 h-[60px] border-b border-[#EBEBEB]">
          <h2 className="font-['Neue_Montreal'] font-medium text-base leading-[19px] tracking-[-0.01em] text-[#2B2834]">
            Transaction Details
          </h2>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-[#F9F9FB] rounded-md h-7"
          >
            <X size={16} className="text-[#5F2EFC]" />
            <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#5F2EFC]">
              Close
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-end p-6 gap-6 overflow-y-auto">
          {/* Transaction Summary Card */}
          <div className="flex items-center px-4 py-6 gap-3 w-full bg-white border border-[#EBEBEB] rounded-lg">
            {/* Product Icon */}
            <div className="flex items-center justify-center w-[38px] h-[38px] bg-black border border-[#EBEBEB] rounded-lg flex-shrink-0">
              <span className="text-white text-sm">📦</span>
            </div>

            {/* Transaction Info */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <span className="font-['Neue_Montreal'] font-normal text-base leading-[19px] text-[#5F5971]">
                  Purchase of
                </span>
                <span className="font-['Neue_Montreal'] font-medium text-base leading-[19px] text-[#2B2834]">
                  {transaction.product}
                </span>
              </div>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#E7F3EF] rounded w-fit">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="5" r="4.5" stroke="#239B73" strokeWidth="1"/>
                  <path d="M3.75 5L4.375 5.625L6.25 3.75" stroke="#239B73" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-['Neue_Montreal'] font-medium text-xs leading-none text-[#239B73]">
                  Success
                </span>
              </div>
            </div>

            {/* Amount */}
            <span className="font-['Neue_Montreal'] font-bold text-base leading-[19px] text-[#2B2834]">
              {transaction.amount}
            </span>
          </div>

          {/* Details Section */}
          <div className="flex flex-col items-start gap-4 w-full">
            <h3 className="font-['Neue_Montreal'] font-medium text-lg leading-[22px] text-[#2B2834]">
              Details
            </h3>

            <div className="flex flex-col justify-center items-start gap-4 w-full bg-white rounded">
              {/* Transaction ID */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Transaction ID
                </span>
                <div className="flex-1 flex justify-center items-center gap-1.5">
                  <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right text-[#2B2834]">
                    {transaction.id}
                  </span>
                  <button onClick={handleCopyId} className="flex-shrink-0">
                    <Copy size={16} className="text-[#5F2EFC]" />
                  </button>
                </div>
              </div>

              {/* Transaction Date */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Transaction Date
                </span>
                <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right text-[#2B2834]">
                  {transaction.date}
                </span>
              </div>

              {/* Transaction Time */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Transaction Time
                </span>
                <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right text-[#2B2834]">
                  {transaction.time}
                </span>
              </div>

              {/* Creator */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Creator
                </span>
                <div className="flex-1 flex justify-center items-center gap-1">
                  <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right underline text-[#2B2834] cursor-pointer">
                    {transaction.creator}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2447 1.75525L1.75049 12.25M11.6263 11.0361C11.1678 10.5776 10.9362 9.4395 10.8202 8.40525C10.6697 7.07408 10.7274 5.72192 11.0424 4.41875C11.2781 3.44283 11.6584 2.352 12.2499 1.7605M2.96382 2.37417C3.42232 2.83208 4.5604 3.06367 5.59466 3.17975C6.92582 3.33025 8.27799 3.2725 9.58116 2.9575C10.5571 2.72183 11.6479 2.3415 12.2394 1.75" stroke="#121212"/>
                  </svg>
                </div>
              </div>

              {/* Buyer */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Buyer
                </span>
                <div className="flex-1 flex justify-center items-center gap-1">
                  <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right underline text-[#2B2834] cursor-pointer">
                    {transaction.buyer}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2447 1.75525L1.75049 12.25M11.6263 11.0361C11.1678 10.5776 10.9362 9.4395 10.8202 8.40525C10.6697 7.07408 10.7274 5.72192 11.0424 4.41875C11.2781 3.44283 11.6584 2.352 12.2499 1.7605M2.96382 2.37417C3.42232 2.83208 4.5604 3.06367 5.59466 3.17975C6.92582 3.33025 8.27799 3.2725 9.58116 2.9575C10.5571 2.72183 11.6479 2.3415 12.2394 1.75" stroke="#121212"/>
                  </svg>
                </div>
              </div>

              {/* Amount Paid */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Amount Paid
                </span>
                <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right text-[#2B2834]">
                  {transaction.amount}
                </span>
              </div>

              {/* Fee */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Fee
                </span>
                <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right text-[#2B2834]">
                  {transaction.fee}
                </span>
              </div>

              {/* Product Title */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Product Title
                </span>
                <div className="flex-1 flex justify-center items-center gap-1">
                  <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right underline text-[#2B2834] cursor-pointer">
                    {transaction.product}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.2447 1.75525L1.75049 12.25M11.6263 11.0361C11.1678 10.5776 10.9362 9.4395 10.8202 8.40525C10.6697 7.07408 10.7274 5.72192 11.0424 4.41875C11.2781 3.44283 11.6584 2.352 12.2499 1.7605M2.96382 2.37417C3.42232 2.83208 4.5604 3.06367 5.59466 3.17975C6.92582 3.33025 8.27799 3.2725 9.58116 2.9575C10.5571 2.72183 11.6479 2.3415 12.2394 1.75" stroke="#121212"/>
                  </svg>
                </div>
              </div>

              {/* Product/Service */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Product/Service
                </span>
                <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right text-[#2B2834]">
                  {transaction.productType}
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex justify-end items-center w-full h-4">
                <span className="flex-1 font-['Neue_Montreal'] font-normal text-[13.5px] leading-4 text-[#5F5971]">
                  Payment Method
                </span>
                <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-right text-[#2B2834]">
                  Paystack Card ****1234
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-0 border-t border-[#EBEBEB]" />

          {/* Refund Button */}
          <button
            className="flex items-center justify-center px-6 py-3.5 w-[91px] h-8 bg-[#CD110A] border border-[rgba(251,236,235,0.2)] rounded-[9px] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)]"
          >
            <span
              className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-4 text-[#FFFCF8]"
              style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
            >
              Refund
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
