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
                return 'text-text-success bg-surface-success';
            case 'Pending':
                return 'text-text-warning bg-surface-warning';
            case 'Failed':
                return 'text-[#E53E3E] bg-[#FED7D7]';
            default:
                return 'text-text-secondary bg-[#F7F7F9]';
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
                    <h2 className="font-sans font-semibold text-lg text-text-primary">
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
                        <span className="font-sans font-medium text-sm text-text-secondary">Transaction ID</span>
                        <span className="font-sans font-medium text-sm text-text-primary">{transaction.id}</span>
                    </div>

                    {/* Date & Time */}
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-medium text-sm text-text-secondary">Date & Time</span>
                        <span className="font-sans font-medium text-sm text-text-primary">
                            {transaction.date} at {transaction.time}
                        </span>
                    </div>

                    {/* Creator */}
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-medium text-sm text-text-secondary">Creator</span>
                        <span className="font-sans font-medium text-sm text-text-primary">{transaction.creator}</span>
                    </div>

                    {/* Buyer */}
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-medium text-sm text-text-secondary">Buyer</span>
                        <span className="font-sans font-medium text-sm text-text-primary">{transaction.buyer}</span>
                    </div>

                    {/* Product */}
                    <div className="flex justify-between items-start">
                        <span className="font-sans font-medium text-sm text-text-secondary">Product</span>
                        <div className="text-right">
                            <div className="font-sans font-medium text-sm text-text-primary">{transaction.product}</div>
                            <div className="font-sans font-normal text-xs text-text-secondary">{transaction.productType}</div>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-medium text-sm text-text-secondary">Amount</span>
                        <span className="font-sans font-semibold text-sm text-text-primary">{transaction.amount}</span>
                    </div>

                    {/* Fee */}
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-medium text-sm text-text-secondary">Transaction Fee</span>
                        <span className="font-sans font-medium text-sm text-text-primary">{transaction.fee}</span>
                    </div>

                    {/* Payment Method */}
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-medium text-sm text-text-secondary">Payment Method</span>
                        <span className="font-sans font-medium text-sm text-text-primary">{transaction.paymentMethod}</span>
                    </div>

                    {/* Status */}
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-medium text-sm text-text-secondary">Status</span>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="font-sans font-medium text-sm">
                                {transaction.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 border border-border-primary rounded-lg font-sans font-medium text-sm text-text-secondary hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                    <button className="flex-1 px-4 py-2 bg-[#6366F1] rounded-lg font-sans font-medium text-sm text-white hover:bg-[#5856EB] transition-colors">
                        View Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}