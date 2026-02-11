'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

// Mock transaction data - in a real app, this would come from an API
const mockTransactionDetails = {
    'TXN0001': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Titi Oladipo',
        buyer: 'Halima Zubair',
        product: 'Digital Course',
        productType: 'Course',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Digital Course enrollment',
        reference: 'PSK_REF_TXN12IUD',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0002': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Chidi Nwachukwu',
        buyer: 'Mohammed Garba',
        product: 'Digital Course',
        productType: 'Course',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Pending' as const,
        description: 'Payment for Digital Course enrollment',
        reference: 'PSK_REF_TXN12IUD2',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0003': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Oluchi Nnamdi',
        buyer: 'Abimbola Adefemi',
        product: 'Template',
        productType: 'Digital Product',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Failed' as const,
        description: 'Failed payment for Template purchase',
        reference: 'PSK_REF_TXN12IUD3',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0004': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Idowu Akinyele',
        buyer: 'Aminu Bello',
        product: 'Template',
        productType: 'Digital Product',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Template purchase',
        reference: 'PSK_REF_TXN12IUD4',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0005': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Mohammed Garba',
        buyer: 'Bukky Alabi',
        product: 'Digital Course',
        productType: 'Course',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Digital Course enrollment',
        reference: 'PSK_REF_TXN12IUD5',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0006': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Salihu Idris',
        buyer: 'Bashir Lawal',
        product: 'Digital Course',
        productType: 'Course',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Pending' as const,
        description: 'Payment for Digital Course enrollment',
        reference: 'PSK_REF_TXN12IUD6',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0007': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Zubairu Sani',
        buyer: 'Adaeze Obi',
        product: 'Template',
        productType: 'Digital Product',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Template purchase',
        reference: 'PSK_REF_TXN12IUD7',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0008': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Aminu Bello',
        buyer: 'Rita Chukwuma',
        product: 'Digital Course',
        productType: 'Course',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Failed' as const,
        description: 'Failed payment for Digital Course enrollment',
        reference: 'PSK_REF_TXN12IUD8',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0009': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Tosin Aluko',
        buyer: 'Amaka Okoro',
        product: 'Template',
        productType: 'Digital Product',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Template purchase',
        reference: 'PSK_REF_TXN12IUD9',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0010': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Adaeze Obi',
        buyer: 'Tochukwu Anene',
        product: 'Digital Course',
        productType: 'Course',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Digital Course enrollment',
        reference: 'PSK_REF_TXN12IUD10',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0011': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Bashir Lawal',
        buyer: 'Emeka Onwudiwe',
        product: 'Template',
        productType: 'Digital Product',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Template purchase',
        reference: 'PSK_REF_TXN12IUD11',
        gateway: 'Paystack',
        currency: 'NGN'
    },
    'TXN0012': {
        id: 'TXN12IUD',
        date: '12/03/2025',
        time: '00:23',
        creator: 'Yetunde Bakare',
        buyer: 'Obinna Okeke',
        product: 'Digital Course',
        productType: 'Course',
        amount: '₦12,920.99',
        fee: '₦430',
        paymentMethod: 'Card',
        status: 'Success' as const,
        description: 'Payment for Digital Course enrollment',
        reference: 'PSK_REF_TXN12IUD12',
        gateway: 'Paystack',
        currency: 'NGN'
    }
};

interface TransactionDetailsPageProps {
    params: { id: string };
}

export default function TransactionDetailsPage({ params }: TransactionDetailsPageProps) {
    const router = useRouter();
    const transaction = mockTransactionDetails[params.id as keyof typeof mockTransactionDetails];

    if (!transaction) {
        return (
            <PageContainer>
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                    <h1 className="text-2xl font-bold text-text-primary">Transaction Not Found</h1>
                    <p className="text-text-secondary">The transaction you&apos;re looking for doesn&apos;t exist.</p>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#5856EB] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </PageContainer>
        );
    }

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
        <PageContainer>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 px-2 py-1.5 bg-surface rounded-md text-text-main hover:bg-muted w-fit transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-body-md font-sans">Go back</span>
                </button>

                <h1 className="text-heading-lg-bold text-text-main font-sans">
                    Transaction Details
                </h1>

                {/* Transaction Details Card */}
                <div className="bg-white rounded-2xl border border-border-primary p-6">
                    {/* Transaction ID and Status */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-primary">
                        <div>
                            <h2 className="font-sans font-semibold text-lg text-text-primary mb-1">
                                {transaction.id}
                            </h2>
                            <p className="font-sans font-normal text-sm text-text-secondary">
                                {transaction.description}
                            </p>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(transaction.status)}`}>
                            {getStatusIcon(transaction.status)}
                            <span className="font-sans font-medium text-sm">
                                {transaction.status}
                            </span>
                        </div>
                    </div>

                    {/* Transaction Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Date & Time</span>
                                <span className="font-sans font-medium text-sm text-text-primary">
                                    {transaction.date} at {transaction.time}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Creator</span>
                                <span className="font-sans font-medium text-sm text-text-primary">{transaction.creator}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Buyer</span>
                                <span className="font-sans font-medium text-sm text-text-primary">{transaction.buyer}</span>
                            </div>

                            <div className="flex justify-between items-start py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Product</span>
                                <div className="text-right">
                                    <div className="font-sans font-medium text-sm text-text-primary">{transaction.product}</div>
                                    <div className="font-sans font-normal text-xs text-text-secondary">{transaction.productType}</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Amount</span>
                                <span className="font-sans font-semibold text-sm text-text-primary">{transaction.amount}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Transaction Fee</span>
                                <span className="font-sans font-medium text-sm text-text-primary">{transaction.fee}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Payment Method</span>
                                <span className="font-sans font-medium text-sm text-text-primary">{transaction.paymentMethod}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                                <span className="font-sans font-medium text-sm text-text-secondary">Reference</span>
                                <span className="font-sans font-medium text-sm text-text-primary font-mono">{transaction.reference}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-8 pt-6 border-t border-border-primary">
                        <button
                            onClick={() => router.back()}
                            className="flex-1 px-4 py-2 border border-border-primary rounded-lg font-sans font-medium text-sm text-text-secondary hover:bg-gray-50 transition-colors"
                        >
                            Back to Transactions
                        </button>
                        <button className="flex-1 px-4 py-2 bg-[#6366F1] rounded-lg font-sans font-medium text-sm text-white hover:bg-[#5856EB] transition-colors">
                            Download Receipt
                        </button>
                        {transaction.status === 'Pending' && (
                            <button className="flex-1 px-4 py-2 bg-[#FB6A00] rounded-lg font-sans font-medium text-sm text-white hover:bg-[#E55A00] transition-colors">
                                Retry Payment
                            </button>
                        )}
                        {transaction.status === 'Failed' && (
                            <button className="flex-1 px-4 py-2 bg-[#E53E3E] rounded-lg font-sans font-medium text-sm text-white hover:bg-[#C53030] transition-colors">
                                Refund
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}