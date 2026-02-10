'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import PageContainer from '@/components/layout/PageContainer';

const mockTransactions = [
    {
        id: 1,
        timestamp: '2 min ago',
        buyer: 'Cora Forbes',
        creator: 'John Doe',
        product: 'Skit Editing Masterclass',
        amount: '₦212,239',
        fee: '₦233',
        method: 'Paystack',
        status: 'Paid'
    },
    {
        id: 2,
        timestamp: '3 min ago',
        buyer: 'Winifred Bennett',
        creator: 'Jane Smith',
        product: 'WhatsApp Copy Templates',
        amount: '₦212,239',
        fee: '₦700',
        method: 'Paystack',
        status: 'Paid'
    },
    {
        id: 3,
        timestamp: '5 min ago',
        buyer: 'Uma Eng',
        creator: 'Mike Johnson',
        product: 'Skit Business eBook',
        amount: '₦212,239',
        fee: '₦1,000',
        method: 'Paystack',
        status: 'Pending'
    },
    {
        id: 4,
        timestamp: '11 min ago',
        buyer: 'Quintas Everett',
        creator: 'John Doe',
        product: 'Skit Editing Masterclass',
        amount: '₦212,239',
        fee: '₦233',
        method: 'Paystack',
        status: 'Paid'
    },
    {
        id: 5,
        timestamp: '14 min ago',
        buyer: 'Kirby Buck',
        creator: 'Sarah Wilson',
        product: 'WhatsApp Copy Templates',
        amount: '₦212,239',
        fee: '₦700',
        method: 'Paystack',
        status: 'Paid'
    },
    {
        id: 6,
        timestamp: '23 min ago',
        buyer: 'Vanessa Lee',
        creator: 'Mike Johnson',
        product: 'Skit Business eBook',
        amount: '₦212,239',
        fee: '₦1,000',
        method: 'Paystack',
        status: 'Failed'
    }
];

export default function TransactionsPage() {
    const router = useRouter();

    const handleTransactionClick = (transaction: any) => {
        const transactionId = `TXN${transaction.id.toString().padStart(4, '0')}`;
        router.push(`/transactions/${transactionId}`);
    };

    return (
        <PageContainer>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-[20px] font-bold leading-[24px] tracking-[-0.01em] text-text-main font-sans">
                        All Transactions
                    </h1>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 border border-[#EBEBEB] rounded-lg font-['Neue_Montreal'] font-medium text-sm text-[#5F5971] hover:bg-gray-50 transition-colors">
                            Export
                        </button>
                        <button className="px-4 py-2 bg-[#6366F1] rounded-lg font-['Neue_Montreal'] font-medium text-sm text-white hover:bg-[#5856EB] transition-colors">
                            Filter
                        </button>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white border border-[#EBEBEB] rounded-lg">
                    {/* Table Header */}
                    <div className="flex items-center px-6 py-4 gap-4 w-full border-b border-[#EBEBEB] bg-[#F9F9FB]">
                        <span className="w-[10%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Timestamp</span>
                        <span className="w-[15%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Buyer</span>
                        <span className="w-[15%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Creator</span>
                        <span className="w-[20%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Product/Activity</span>
                        <span className="w-[12%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Amount</span>
                        <span className="w-[10%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Fee</span>
                        <span className="w-[10%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Method</span>
                        <span className="w-[8%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Status</span>
                    </div>

                    {/* Table Body */}
                    <div>
                        {mockTransactions.map((transaction, index) => (
                            <div
                                key={transaction.id}
                                onClick={() => handleTransactionClick(transaction)}
                                className={cn(
                                    "flex items-center px-6 py-4 gap-4 bg-white w-full cursor-pointer hover:bg-gray-50 transition-colors",
                                    index !== mockTransactions.length - 1 && "border-b border-[#EBEBEB]"
                                )}
                            >
                                <span className="w-[10%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {transaction.timestamp}
                                </span>
                                <span className="w-[15%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {transaction.buyer}
                                </span>
                                <span className="w-[15%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {transaction.creator}
                                </span>
                                <span className="w-[20%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {transaction.product}
                                </span>
                                <span className="w-[12%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {transaction.amount}
                                </span>
                                <span className="w-[10%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {transaction.fee}
                                </span>
                                <span className="w-[10%] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {transaction.method}
                                </span>
                                <div className="w-[8%]">
                                    {transaction.status === 'Paid' ? (
                                        <div className="flex items-center justify-center gap-0.5 px-[6px] py-[1px] pl-[3px] bg-[#E7F3EF] rounded h-[14px] w-fit">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="5" cy="5" r="4" stroke="#239B73" strokeWidth="1"/>
                                                <path d="M3.5 5L4.5 6L6.5 4" stroke="#239B73" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#239B73]">
                                                Paid
                                            </span>
                                        </div>
                                    ) : transaction.status === 'Pending' ? (
                                        <div className="flex items-center justify-center gap-0.5 px-[6px] py-[1px] pl-[3px] bg-[#FFF3EB] rounded h-[14px] w-fit">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="5" cy="5" r="4" stroke="#FB6A00" strokeWidth="1"/>
                                                <path d="M5 3V5.5" stroke="#FB6A00" strokeWidth="1" strokeLinecap="round"/>
                                                <circle cx="5" cy="7" r="0.5" fill="#FB6A00"/>
                                            </svg>
                                            <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#FB6A00]">
                                                Pending
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-0.5 px-[6px] py-[1px] pl-[3px] bg-[#FED7D7] rounded h-[14px] w-fit">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="5" cy="5" r="4" stroke="#E53E3E" strokeWidth="1"/>
                                                <path d="M3.5 3.5L6.5 6.5M6.5 3.5L3.5 6.5" stroke="#E53E3E" strokeWidth="1" strokeLinecap="round"/>
                                            </svg>
                                            <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#E53E3E]">
                                                Failed
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}