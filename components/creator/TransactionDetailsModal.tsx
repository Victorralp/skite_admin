'use client';

import { useState } from 'react';

interface Transaction {
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
}

interface TransactionDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

export default function TransactionDetailsModal({ isOpen, onClose, transaction }: TransactionDetailsModalProps) {
    if (!isOpen || !transaction) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Success':
                return 'text-[#239B73] bg-[#E7F3EF]';
            case 'Pending':
                return 'text-[#FB6A00] bg-[#FFF3EB]';
            case 'Failed':
                return 'text-[#E53E3E] bg-[#FED7D7]';
            default:
                return 'text-[#5F5971] bg-[#F7F7F9]';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Success':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6" stroke="#239B73" strokeWidth="1.5"/>
                        <path d="M5.5 8L7 9.5L10.5 6" stroke="#239B73" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                );
            case 'Pending':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6" stroke="#FB6A00" strokeWidth="1.5"/>
                        <path d="M8 5V8.5" stroke="#FB6A00" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="8" cy="11" r="0.75" fill="#FB6A00"/>
                    </svg>
                );
            case 'Failed':
                return (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="6" stroke="#E53E3E" strokeWidth="1.5"/>
                        <path d="M6 6L10 10M10 6L6 10" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-['Neue_Montreal'] font-semibold text-lg text-[#2B2834]">
                        Transaction Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 5L5 15M5 5L15 15" stroke="#5F5971" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* Transaction Info */}
                <div className="space-y-4">
                    {/* Transaction ID */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Transaction ID</span>
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#2B2834]">{transaction.id}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Date & Time</span>
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#2B2834]">
                            {transaction.date} at {transaction.time}
                        </span>
                    </div>

                    {/* Creator */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Creator</span>
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#2B2834]">{transaction.creator}</span>
                    </div>

                    {/* Buyer */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Buyer</span>
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#2B2834]">{transaction.buyer}</span>
                    </div>

                    {/* Product */}
                    <div className="flex justify-between items-start">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Product</span>
                        <div className="text-right">
                            <div className="font-['Neue_Montreal'] font-medium text-sm text-[#2B2834]">{transaction.product}</div>
                            <div className="font-['Neue_Montreal'] font-normal text-xs text-[#5F5971]">{transaction.productType}</div>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Amount</span>
                        <span className="font-['Neue_Montreal'] font-semibold text-sm text-[#2B2834]">{transaction.amount}</span>
                    </div>

                    {/* Fee */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Transaction Fee</span>
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#2B2834]">{transaction.fee}</span>
                    </div>

                    {/* Payment Method */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Payment Method</span>
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#2B2834]">{transaction.paymentMethod}</span>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center">
                        <span className="font-['Neue_Montreal'] font-medium text-sm text-[#5F5971]">Status</span>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="font-['Neue_Montreal'] font-medium text-sm">
                                {transaction.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-[#EBEBEB] rounded-lg font-['Neue_Montreal'] font-medium text-sm text-[#5F5971] hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#6366F1] rounded-lg font-['Neue_Montreal'] font-medium text-sm text-white hover:bg-[#5856EB] transition-colors">
                        View Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}