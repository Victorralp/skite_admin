'use client';

import { cn } from '@/lib/utils';

const mockTransactions = [
    {
        id: 1,
        timestamp: '2 min ago',
        buyer: 'Cora Forbes',
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
        product: 'Skit Business eBook',
        amount: '₦212,239',
        fee: '₦1 000',
        method: 'Paystack',
        status: 'Pending'
    },
    {
        id: 4,
        timestamp: '11 min ago',
        buyer: 'Quintas Everett',
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
        product: 'Skit Business eBook',
        amount: '₦212,239',
        fee: '₦1 000',
        method: 'Paystack',
        status: 'Paid'
    }
];

export default function TransactionsTab() {
    return (
        <div className="flex flex-col w-full bg-[#F9F9FB] rounded-b-[36px] p-6 gap-6">
            <div className="flex flex-col p-1 gap-1 bg-[#F9F9FB] rounded-xl">
                {/* Table Header */}
                <div className="flex items-center px-4 py-2 gap-4">
                    <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Timestamp</span>
                    <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Buyer</span>
                    <span className="w-[200px] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Product/Activity</span>
                    <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Amount</span>
                    <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Fee</span>
                    <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Method</span>
                    <span className="w-[63px] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Status</span>
                    <div className="w-[18px] opacity-0">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5C9.41421 4.5 9.75 4.16421 9.75 3.75C9.75 3.33579 9.41421 3 9 3C8.58579 3 8.25 3.33579 8.25 3.75C8.25 4.16421 8.58579 4.5 9 4.5Z" stroke="#5F5971" strokeWidth="2.25"/>
                            <path d="M9 10.5C9.41421 10.5 9.75 10.1642 9.75 9.75C9.75 9.33579 9.41421 9 9 9C8.58579 9 8.25 9.33579 8.25 9.75C8.25 10.1642 8.58579 10.5 9 10.5Z" stroke="#5F5971" strokeWidth="2.25"/>
                            <path d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z" stroke="#5F5971" strokeWidth="2.25"/>
                        </svg>
                    </div>
                </div>

                {/* Table Body */}
                <div className="bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
                    {mockTransactions.map((transaction, index) => (
                        <div
                            key={transaction.id}
                            className={cn(
                                "flex items-center px-4 py-3 gap-4 bg-white",
                                index !== mockTransactions.length - 1 && "border-b border-[#EBEBEB]"
                            )}
                        >
                            <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {transaction.timestamp}
                            </span>
                            <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {transaction.buyer}
                            </span>
                            <span className="w-[200px] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {transaction.product}
                            </span>
                            <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {transaction.amount}
                            </span>
                            <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {transaction.fee}
                            </span>
                            <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {transaction.method}
                            </span>
                            <div className="w-[63px]">
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
                                ) : (
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
                                )}
                            </div>
                            <button className="w-[18px] h-[18px] flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 4.5C9.41421 4.5 9.75 4.16421 9.75 3.75C9.75 3.33579 9.41421 3 9 3C8.58579 3 8.25 3.33579 8.25 3.75C8.25 4.16421 8.58579 4.5 9 4.5Z" stroke="#5F5971" strokeWidth="2.25"/>
                                    <path d="M9 10.5C9.41421 10.5 9.75 10.1642 9.75 9.75C9.75 9.33579 9.41421 9 9 9C8.58579 9 8.25 9.33579 8.25 9.75C8.25 10.1642 8.58579 10.5 9 10.5Z" stroke="#5F5971" strokeWidth="2.25"/>
                                    <path d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z" stroke="#5F5971" strokeWidth="2.25"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
