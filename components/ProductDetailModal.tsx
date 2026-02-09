'use client';

import { X, ArrowUpRight } from 'lucide-react';
import { Product } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProductDetailModalProps {
    product: Product | null;
    onClose: () => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

const StarIcon = ({ filled = true, className = "" }: { filled?: boolean; className?: string }) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M3.8269 10.6668C3.90023 10.3402 3.7669 9.8735 3.53356 9.64016L1.91356 8.02016C1.4069 7.5135 1.2069 6.9735 1.35356 6.50683C1.5069 6.04016 1.98023 5.72016 2.6869 5.60016L4.7669 5.2535C5.0669 5.20016 5.43356 4.9335 5.57356 4.66016L6.72023 2.36016C7.05356 1.70016 7.5069 1.3335 8.00023 1.3335C8.49356 1.3335 8.9469 1.70016 9.28023 2.36016L10.4269 4.66016C10.5136 4.8335 10.6936 5.00016 10.8869 5.1135L3.7069 12.2935C3.61356 12.3868 3.45356 12.3002 3.48023 12.1668L3.8269 10.6668Z" fill={filled ? "#FF8D28" : "#F1F1F1"}/>
        <path d="M12.4667 9.63977C12.2267 9.87977 12.0934 10.3398 12.1734 10.6664L12.6334 12.6731C12.8267 13.5064 12.7067 14.1331 12.2934 14.4331C12.1267 14.5531 11.9267 14.6131 11.6934 14.6131C11.3534 14.6131 10.9534 14.4864 10.5134 14.2264L8.56003 13.0664C8.25337 12.8864 7.7467 12.8864 7.44003 13.0664L5.4867 14.2264C4.7467 14.6598 4.11337 14.7331 3.7067 14.4331C3.55337 14.3198 3.44003 14.1664 3.3667 13.9664L11.4734 5.85977C11.78 5.5531 12.2134 5.4131 12.6334 5.48644L13.3067 5.59977C14.0134 5.71977 14.4867 6.03977 14.64 6.50644C14.7867 6.9731 14.5867 7.5131 14.08 8.01977L12.4667 9.63977Z" fill={filled ? "#FF8D28" : "#F1F1F1"}/>
    </svg>
);

const SmallStarIcon = ({ filled = true }: { filled?: boolean }) => (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.8269 10.6668C3.90023 10.3402 3.7669 9.8735 3.53356 9.64016L1.91356 8.02016C1.4069 7.5135 1.2069 6.9735 1.35356 6.50683C1.5069 6.04016 1.98023 5.72016 2.6869 5.60016L4.7669 5.2535C5.0669 5.20016 5.43356 4.9335 5.57356 4.66016L6.72023 2.36016C7.05356 1.70016 7.5069 1.3335 8.00023 1.3335C8.49356 1.3335 8.9469 1.70016 9.28023 2.36016L10.4269 4.66016C10.5136 4.8335 10.6936 5.00016 10.8869 5.1135L3.7069 12.2935C3.61356 12.3868 3.45356 12.3002 3.48023 12.1668L3.8269 10.6668Z" fill={filled ? "#DBD8E4" : "#DBD8E4"}/>
        <path d="M12.4667 9.63977C12.2267 9.87977 12.0934 10.3398 12.1734 10.6664L12.6334 12.6731C12.8267 13.5064 12.7067 14.1331 12.2934 14.4331C12.1267 14.5531 11.9267 14.6131 11.6934 14.6131C11.3534 14.6131 10.9534 14.4864 10.5134 14.2264L8.56003 13.0664C8.25337 12.8864 7.7467 12.8864 7.44003 13.0664L5.4867 14.2264C4.7467 14.6598 4.11337 14.7331 3.7067 14.4331C3.55337 14.3198 3.44003 14.1664 3.3667 13.9664L11.4734 5.85977C11.78 5.5531 12.2134 5.4131 12.6334 5.48644L13.3067 5.59977C14.0134 5.71977 14.4867 6.03977 14.64 6.50644C14.7867 6.9731 14.5867 7.5131 14.08 8.01977L12.4667 9.63977Z" fill={filled ? "#DBD8E4" : "#DBD8E4"}/>
    </svg>
);

const mockComments = [
    {
        id: 1,
        author: 'Jane Doe',
        time: '1 Month ago',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        text: 'Can someone please provide me with some examples of similar work that\'s been done before? I want to',
        isCreator: false
    },
    {
        id: 2,
        author: 'John Doe',
        time: '1 Month ago',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        text: 'Running behind schedule on this task, can someone please provide me with some help to catch up?',
        isCreator: false
    },
    {
        id: 3,
        author: 'Sarah Smith',
        time: '2 Months ago',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        text: 'This is exactly what I was looking for! Thank you for creating this course.',
        isCreator: true
    }
];

const mockReviews = [
    {
        id: 1,
        author: 'Annette Black',
        handle: '@evanlee',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        date: '1/15/12',
        text: 'They are a great partner on both Strategic and Implementation. They have proven to be fair and resp'
    },
    {
        id: 2,
        author: 'Jane Cooper',
        handle: '@lucyliu',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        date: '6/19/14',
        text: 'Very inspiring working experience with their representatives, responsible and active in communicati'
    },
    {
        id: 3,
        author: 'Arlene McCoy',
        handle: '@chloegrace',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        date: '8/30/14',
        text: 'The partner been progressing well with the business change environment, talents of new skill set mi'
    },
    {
        id: 4,
        author: 'Jacob Jones',
        handle: '@paigelee',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 4,
        date: '7/18/17',
        text: 'Incredible group of people and talented professionals. Focused on the development of flexible and i'
    }
];

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Overview');
    const [openContentMenuId, setOpenContentMenuId] = useState<number | null>(null);

    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [product]);

    if (!product) return null;

    const handleViewContent = () => {
        if (product?.id) {
            router.push(`/products/${product.id}`);
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed right-0 top-0 h-full w-[600px] bg-white z-50 flex flex-col shadow-2xl animate-slide-in">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 h-[60px] border-b border-[#F0EBF4]">
                    <h2 className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] tracking-[-0.01em] text-[#2B2834]">
                        Product Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-1.5 px-2 py-1.5 bg-[#F9F9FB] rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4 text-[#5F2EFC]" />
                        <span className="font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#5F2EFC]">
                            Close
                        </span>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {/* Product Info Section */}
                    <div className="px-6 py-6 flex flex-col gap-4">
                        {/* Product Image */}
                        <div className="relative w-full h-[304px] rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-10" />
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 z-20">
                                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-[#E7F3EF] rounded-[13px]">
                                    <svg width="16" height="16" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.5 6.5C0.5 7.28793 0.655194 8.06815 0.956723 8.7961C1.25825 9.52405 1.70021 10.1855 2.25736 10.7426C2.81451 11.2998 3.47595 11.7417 4.2039 12.0433C4.93185 12.3448 5.71207 12.5 6.5 12.5C7.28793 12.5 8.06815 12.3448 8.7961 12.0433C9.52405 11.7417 10.1855 11.2998 10.7426 10.7426C11.2998 10.1855 11.7417 9.52405 12.0433 8.7961C12.3448 8.06815 12.5 7.28793 12.5 6.5C12.5 5.71207 12.3448 4.93185 12.0433 4.2039C11.7417 3.47595 11.2998 2.81451 10.7426 2.25736C10.1855 1.70021 9.52405 1.25825 8.7961 0.956723C8.06815 0.655195 7.28793 0.5 6.5 0.5C5.71207 0.5 4.93185 0.655195 4.2039 0.956723C3.47595 1.25825 2.81451 1.70021 2.25736 2.25736C1.70021 2.81451 1.25825 3.47595 0.956723 4.2039C0.655194 4.93185 0.5 5.71207 0.5 6.5Z" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M4.5 6.50008L5.83333 7.83341L8.5 5.16675" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="font-['Neue_Montreal'] font-medium text-[13px] leading-[16px] text-[#239B73]">
                                        Approved
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col gap-3">
                            {/* Title and Action */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex flex-col gap-0.5">
                                        <h3 className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#2B2834]">
                                            Interior Design Course
                                        </h3>
                                        <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">
                                            Course
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#2B2834]">
                                            {formatCurrency(product.price)}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <StarIcon filled={true} />
                                            <span className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#2B2834]">
                                                4.3
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="flex items-center justify-center px-4 py-2 h-[32px] bg-[#CD110A] rounded-lg border border-[rgba(251,236,235,0.2)] shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)]">
                                    <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#FFFCF8]">
                                        Ban Product
                                    </span>
                                </button>
                            </div>

                            {/* Description */}
                            <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                                Ready to turn your passion for interior design into professional skill? The Edit Interior Design Course offers a hands-on, practical approach to learning the fundamentals of modern interior design.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-[#EBEBEB]" />

                        {/* Creator Info */}
                        <div className="flex flex-col gap-2">
                            <span className="font-['Neue_Montreal'] font-normal text-[10px] leading-[12px] text-[#A5A1AF] uppercase">
                                CREATOR
                            </span>
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                                    alt="John Doe"
                                    className="w-[34px] h-[35px] rounded-full object-cover"
                                />
                                <div className="flex-1 flex flex-col gap-0.5">
                                    <span className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">
                                        John Doe
                                    </span>
                                    <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#A5A1AF]">
                                        Content Creator/Entrepreneur
                                    </span>
                                </div>
                                <button className="flex items-center justify-center px-4 py-2 h-[32px] bg-white border border-[#EBEBEB] rounded-lg shadow-[inset_0px_1.5px_1px_rgba(255,255,255,0.11)] hover:bg-gray-50 transition-colors">
                                    <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#353A44]">
                                        View profile
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center border-b border-[#EBEBEB]">
                        {['Overview', 'Content', 'Reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "flex-1 flex flex-col items-center pt-2.5 gap-3 h-[38px] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] transition-colors",
                                    activeTab === tab ? "text-[#2B2834]" : "text-[#A5A1AF]"
                                )}
                            >
                                <span>{tab}</span>
                                <div className={cn(
                                    "w-full h-0",
                                    activeTab === tab ? "border-b-2 border-[#5F2EFC]" : "border-b border-[#EBEBEB]"
                                )} />
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="px-6 py-4 bg-[#F9F9FB] flex flex-col gap-4">
                        {activeTab === 'Overview' && (
                            <>
                                {/* Product Info Grid */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center px-4 h-[32px] bg-white border border-[#EBEBEB] rounded">
                                        <span className="w-[105px] font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
                                            Exclusive Access
                                        </span>
                                        <div className="w-px h-[32px] bg-[#EBEBEB] mx-4" />
                                        <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                            Active
                                        </span>
                                    </div>
                                    <div className="flex items-center px-4 h-[32px] bg-white border border-[#EBEBEB] rounded">
                                        <span className="w-[105px] font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
                                            Product Group Chat
                                        </span>
                                        <div className="w-px h-[32px] bg-[#EBEBEB] mx-4" />
                                        <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                            True
                                        </span>
                                        <a href="#" className="flex items-center gap-1 font-['Neue_Montreal'] font-medium text-[12px] leading-[14px] text-[#5F2EFC] underline">
                                            View Group Chat
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                    <div className="flex items-center px-4 h-[32px] bg-white border border-[#EBEBEB] rounded">
                                        <span className="w-[105px] font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
                                            Date Created
                                        </span>
                                        <div className="w-px h-[32px] bg-[#EBEBEB] mx-4" />
                                        <span className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                            {product.dateCreated}
                                        </span>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="flex flex-col gap-3">
                                    <h4 className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#1F1F1F]">
                                        Comments
                                    </h4>
                                    <div className="flex flex-col gap-4 p-4 bg-white border border-[#EBEBEB] rounded">
                                        {mockComments.map((comment, index) => (
                                            <div
                                                key={comment.id}
                                                className={cn(
                                                    "flex gap-2 pb-4",
                                                    index !== mockComments.length - 1 && "border-b border-[#EBEBEB]"
                                                )}
                                            >
                                                <img
                                                    src={comment.avatar}
                                                    alt={comment.author}
                                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                                />
                                                <div className="flex-1 flex flex-col gap-1.5">
                                                    <div className="flex items-center justify-between">
                                                        <span className={cn(
                                                            "font-['Neue_Montreal'] text-[13.5px] leading-[16px] text-[#1F1F1F]",
                                                            comment.isCreator ? "font-bold" : "font-medium"
                                                        )}>
                                                            {comment.author}
                                                        </span>
                                                        <span className="font-['Neue_Montreal'] font-normal text-[10px] leading-[12px] text-[#A5A1AF]">
                                                            {comment.time}
                                                        </span>
                                                    </div>
                                                    {comment.isCreator ? (
                                                        <div className="px-2 py-1 bg-[#F9F9FB] rounded-br-lg rounded-bl-lg rounded-tr-lg">
                                                            <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#1F1F1F]">
                                                                {comment.text}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                                                            {comment.text}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'Content' && (
                            <div className="flex flex-col gap-2">
                                {/* Content Module */}
                                <div className="flex flex-col p-4 gap-4 bg-white rounded-3xl">
                                    <div className="flex flex-col gap-4">
                                        <h4 className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#2B2834]">
                                            01 Introduction
                                        </h4>
                                        <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971]">
                                            Explore the fascinating realm of interior design with our comprehensive book! You'll discover inspiring projects and gain personalized insights to ignite your creativity.
                                        </p>
                                        
                                        {/* Content Items */}
                                        <div className="flex flex-col gap-2">
                                            {/* Reading Item */}
                                            <div className="flex items-center gap-2 p-3 bg-white border border-[#EAECF0] rounded-lg">
                                                <div className="w-8 h-8 bg-[#5838FC] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V14C4 13.4696 4.21071 12.9609 4.58579 12.5858C4.96086 12.2107 5.46957 12 6 12H14V2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M4 5H2.66667C2.48986 5 2.32029 5.07024 2.19526 5.19526C2.07024 5.32029 2 5.48986 2 5.66667V7.33333C2 7.51014 2.07024 7.67971 2.19526 7.80474C2.32029 7.92976 2.48986 8 2.66667 8H4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <div className="flex-1 flex flex-col gap-0.5">
                                                    <span className="font-['Neue_Montreal'] font-medium text-[14px] leading-[17px] text-[#2B2834]">
                                                        Introduction to Interior Design
                                                    </span>
                                                    <span className="font-['Neue_Montreal'] font-normal text-[11px] leading-[13px] text-[#A5A1AF]">
                                                        Reading • 2 min
                                                    </span>
                                                </div>
                                                <div className="relative">
                                                    <button 
                                                        className="p-1"
                                                        onClick={() => setOpenContentMenuId(openContentMenuId === 1 ? null : 1)}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="10" cy="10" r="1.5" fill="#5F5971"/>
                                                            <circle cx="10" cy="4" r="1.5" fill="#5F5971"/>
                                                            <circle cx="10" cy="16" r="1.5" fill="#5F5971"/>
                                                        </svg>
                                                    </button>
                                                    {openContentMenuId === 1 && (
                                                        <div
                                                            className="absolute right-[10px] top-[33px] w-[128px] bg-white border border-[#EBEBEB] rounded-[12px] flex flex-col p-0 overflow-hidden z-50"
                                                            style={{
                                                                boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)'
                                                            }}
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    handleViewContent();
                                                                    setOpenContentMenuId(null);
                                                                }}
                                                                className="w-[128px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                                                                style={{
                                                                    padding: '10px 24px 10px 16px',
                                                                    gap: '10px',
                                                                    border: '0.5px solid #EBEBEB',
                                                                    borderRadius: '0px'
                                                                }}
                                                            >
                                                                <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                                                    View
                                                                </span>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    console.log('Reject content');
                                                                    setOpenContentMenuId(null);
                                                                }}
                                                                className="w-[128px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                                                                style={{
                                                                    padding: '10px 24px 10px 16px',
                                                                    gap: '10px',
                                                                    border: '0.5px solid #EBEBEB',
                                                                    borderRadius: '0px'
                                                                }}
                                                            >
                                                                <span className="text-[13.5px] font-medium text-[#CD110A] leading-4 font-['Neue_Montreal']">
                                                                    Reject Content
                                                                </span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Video Item */}
                                            <div className="flex items-center gap-2 p-3 bg-white border border-[#EAECF0] rounded-lg">
                                                <div className="w-8 h-8 bg-[#5838FC] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M6.66666 5.33333L10.6667 8L6.66666 10.6667V5.33333Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                                <div className="flex-1 flex flex-col gap-0.5">
                                                    <span className="font-['Neue_Montreal'] font-medium text-[14px] leading-[17px] text-[#2B2834]">
                                                        Approaching Interior Design
                                                    </span>
                                                    <span className="font-['Neue_Montreal'] font-normal text-[11px] leading-[13px] text-[#A5A1AF]">
                                                        Video • 5 min
                                                    </span>
                                                </div>
                                                <div className="relative">
                                                    <button 
                                                        className="p-1"
                                                        onClick={() => setOpenContentMenuId(openContentMenuId === 2 ? null : 2)}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="10" cy="10" r="1.5" fill="#5F5971"/>
                                                            <circle cx="10" cy="4" r="1.5" fill="#5F5971"/>
                                                            <circle cx="10" cy="16" r="1.5" fill="#5F5971"/>
                                                        </svg>
                                                    </button>
                                                    {openContentMenuId === 2 && (
                                                        <div
                                                            className="absolute right-[10px] top-[33px] w-[128px] bg-white border border-[#EBEBEB] rounded-[12px] flex flex-col p-0 overflow-hidden z-50"
                                                            style={{
                                                                boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)'
                                                            }}
                                                        >
                                                            <button
                                                                onClick={() => {
                                                                    handleViewContent();
                                                                    setOpenContentMenuId(null);
                                                                }}
                                                                className="w-[128px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                                                                style={{
                                                                    padding: '10px 24px 10px 16px',
                                                                    gap: '10px',
                                                                    border: '0.5px solid #EBEBEB',
                                                                    borderRadius: '0px'
                                                                }}
                                                            >
                                                                <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                                                    View
                                                                </span>
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    console.log('Reject content');
                                                                    setOpenContentMenuId(null);
                                                                }}
                                                                className="w-[128px] h-[37px] flex items-center bg-white hover:bg-gray-50 transition-colors"
                                                                style={{
                                                                    padding: '10px 24px 10px 16px',
                                                                    gap: '10px',
                                                                    border: '0.5px solid #EBEBEB',
                                                                    borderRadius: '0px'
                                                                }}
                                                            >
                                                                <span className="text-[13.5px] font-medium text-[#CD110A] leading-4 font-['Neue_Montreal']">
                                                                    Reject Content
                                                                </span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Reviews' && (
                            <div className="flex flex-col gap-1 p-1">
                                {/* Rating Summary */}
                                <div className="flex items-center h-[100px] bg-white border border-[#EBEBEB] rounded">
                                    {/* Total Reviews */}
                                    <div className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-4 border-r border-[#EBEBEB]">
                                        <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
                                            Total Reviews
                                        </span>
                                        <span className="font-['Neue_Montreal'] font-medium text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
                                            10.0k
                                        </span>
                                    </div>

                                    {/* Average Rating */}
                                    <div className="flex-1 flex flex-col items-center justify-center gap-1 py-4 px-4 border-r border-[#EBEBEB]">
                                        <span className="font-['Neue_Montreal'] font-normal text-[12px] leading-[14px] text-[#5F5971]">
                                            Average Rating
                                        </span>
                                        <div className="flex items-center gap-2.5">
                                            <span className="font-['Neue_Montreal'] font-medium text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834]">
                                                4.0
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <StarIcon key={i} filled={true} />
                                                ))}
                                                <StarIcon filled={false} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Distribution */}
                                    <div className="flex-1 flex flex-col justify-center gap-2 py-4 px-4">
                                        {[
                                            { stars: 5, count: '2.1k', width: '100%', opacity: 1 },
                                            { stars: 4, count: '1.2k', width: '58%', opacity: 0.7 },
                                            { stars: 3, count: '230', width: '17%', opacity: 0.5 },
                                            { stars: 2, count: '0', width: '3%', opacity: 0.3 },
                                            { stars: 1, count: '0', width: '3%', opacity: 0.2 }
                                        ].map((item) => (
                                            <div key={item.stars} className="flex items-center gap-1.5">
                                                <div className="flex items-center gap-0.5 w-6">
                                                    <SmallStarIcon filled={true} />
                                                    <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#5F5971] flex-1 text-center">
                                                        {item.stars}
                                                    </span>
                                                </div>
                                                <div className="flex-1 h-[4px] bg-gray-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-[#FF8D28] rounded-full"
                                                        style={{ width: item.width, opacity: item.opacity }}
                                                    />
                                                </div>
                                                <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#2B2834] w-8 text-right">
                                                    {item.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Reviews List */}
                                <div className="flex flex-col bg-white border border-[#EBEBEB] rounded">
                                    {mockReviews.map((review, index) => (
                                        <div
                                            key={review.id}
                                            className={cn(
                                                "flex flex-col gap-2 p-4",
                                                index !== mockReviews.length - 1 && "border-b border-[#EBEBEB]"
                                            )}
                                        >
                                            {/* User Info */}
                                            <div className="flex items-start gap-3">
                                                <img
                                                    src={review.avatar}
                                                    alt={review.author}
                                                    className="w-[45px] h-[45px] rounded-full object-cover"
                                                />
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-['Neue_Montreal'] font-bold text-[18px] leading-[22px] text-[#2B2834]">
                                                        {review.author}
                                                    </span>
                                                    <span className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] tracking-[-0.02em] text-[#8E8E8D]">
                                                        {review.handle}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Rating and Date */}
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <StarIcon 
                                                            key={i} 
                                                            filled={i < review.rating}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="font-['Neue_Montreal'] font-normal text-[14px] leading-[17px] tracking-[-0.02em] text-[#8E8E8D]">
                                                    {review.date}
                                                </span>
                                            </div>

                                            {/* Review Text */}
                                            <p className="font-['Neue_Montreal'] font-normal text-[16px] leading-[19px] text-[#090A07]">
                                                {review.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
