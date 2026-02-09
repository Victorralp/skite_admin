'use client';

import { creatorHubs } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { Eye, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import HubDetailModal from '@/components/HubDetailModal';

const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 6.5C0.5 7.28793 0.655194 8.06815 0.956723 8.7961C1.25825 9.52405 1.70021 10.1855 2.25736 10.7426C2.81451 11.2998 3.47595 11.7417 4.2039 12.0433C4.93185 12.3448 5.71207 12.5 6.5 12.5C7.28793 12.5 8.06815 12.3448 8.7961 12.0433C9.52405 11.7417 10.1855 11.2998 10.7426 10.7426C11.2998 10.1855 11.7417 9.52405 12.0433 8.7961C12.3448 8.06815 12.5 7.28793 12.5 6.5C12.5 5.71207 12.3448 4.93185 12.0433 4.2039C11.7417 3.47595 11.2998 2.81451 10.7426 2.25736C10.1855 1.70021 9.52405 1.25825 8.7961 0.956723C8.06815 0.655195 7.28793 0.5 6.5 0.5C5.71207 0.5 4.93185 0.655195 4.2039 0.956723C3.47595 1.25825 2.81451 1.70021 2.25736 2.25736C1.70021 2.81451 1.25825 3.47595 0.956723 4.2039C0.655194 4.93185 0.5 5.71207 0.5 6.5Z" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.5 6.50008L5.83333 7.83341L8.5 5.16675" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Active') {
        return (
            <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#E7F3EF] h-[14px] w-fit">
                <CheckIcon />
                <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#239B73]">Healthy</span>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#FBECEB] h-[14px] w-fit">
            <AlertTriangle className="w-[10px] h-[10px] text-[#CD110A]" />
            <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#CD110A]">Flagged</span>
        </div>
    );
};

export default function HubsTab() {
    const [selectedHub, setSelectedHub] = useState<any | null>(null);

    return (
        <>
            <div className="flex flex-col w-full bg-[#F9F9FB] rounded-b-[36px] p-6 gap-6">
            {/* Title */}
            <h3 className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">Managed Hubs</h3>

            {/* Table Container */}
            <div className="w-full bg-[#F9F9FB] rounded-xl p-1 flex flex-col">
                {/* Header Row */}
                <div className="flex items-center px-4 py-2 gap-6 h-[32px]">
                    <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Hub name</div>
                    <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">No. of members</div>
                    <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Posts today</div>
                    <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Status</div>
                    <div className="w-[18px]"></div>
                </div>

                {/* Table Body */}
                <div className="bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
                    {/* Rows */}
                    {creatorHubs.map((hub, index) => (
                        <div
                            key={hub.id}
                            className={cn(
                                "flex items-center px-4 py-3 gap-6 h-[48px] bg-white",
                                index !== creatorHubs.length - 1 && "border-b border-[#EBEBEB]"
                            )}
                        >
                            {/* Hub name with avatar */}
                            <div className="flex-1 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" />
                                <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate">
                                    {hub.name}
                                </span>
                            </div>

                            {/* No. of members */}
                            <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {hub.members.toLocaleString()}
                            </div>

                            {/* Posts today */}
                            <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                {hub.posts}
                            </div>

                            {/* Status */}
                            <div className="flex-1">
                                <StatusBadge status={hub.status} />
                            </div>

                            {/* Eye icon */}
                            <div className="w-[18px]">
                                <button 
                                    className="p-0 hover:opacity-70 transition-opacity"
                                    onClick={() => setSelectedHub(hub)}
                                >
                                    <Eye className="w-[18px] h-[18px] text-[#5F5971]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

            <HubDetailModal 
                hub={selectedHub} 
                onClose={() => setSelectedHub(null)} 
            />
        </>
    );
}
