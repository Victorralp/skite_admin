'use client';

import { Creator } from '@/data/dashboard';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';
import { useState, useEffect } from 'react';

type CreatorsTableProps = {
    creators: Creator[];
    onCreatorClick: (creator: Creator) => void;
    onAction: (action: 'view' | 'message' | 'suspend', creatorId: string) => void;
};

import ActionMenu from '@/components/ActionMenu';

export default function CreatorsTable({
    creators,
    onCreatorClick,
    onAction
}: CreatorsTableProps) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openMenuId) {
                const openMenu = document.getElementById(`menu-container-${openMenuId}`);
                if (openMenu && openMenu.contains(event.target as Node)) {
                    return;
                }
                setOpenMenuId(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openMenuId]);

    return (
        <Card className="rounded-lg border border-[#EBEBEB] flex flex-col w-full shadow-none p-1 gap-1" style={{ backgroundColor: '#F9F9FB' }}>
            {/* Header Row - Outside white container */}
            <div className="flex items-center h-[30px] shrink-0" style={{ padding: '8px 24px', gap: '16px' }}>
                <div className="w-[201.38px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Creator</div>
                <div className="w-[179.18px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px] flex-grow">Revenue</div>
                <div className="w-[91.81px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Products</div>
                <div className="w-[96.4px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Sales Count</div>
                <div className="w-[97.24px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Subscribers</div>
                <div className="w-[100px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Hub Views</div>
                <div className="w-[150px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Last Active</div>
                <div className="w-[18px] opacity-0">1</div>
            </div>

            {/* White container with border */}
            <div className="flex flex-col bg-white border border-[#EBEBEB] rounded-lg">
                {/* Table area */}
                <div className="">
                    {creators.length === 0 ? (
                        <div className="flex items-center justify-center py-12 text-muted-foreground">
                            No creators found
                        </div>
                    ) : (
                        creators.map((creator) => (
                            <div
                                key={creator.id}
                                className="flex items-center h-[50px] bg-white border-b border-[#EBEBEB] last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                                style={{ padding: '10px 24px', gap: '16px' }}
                                onClick={() => onCreatorClick(creator)}
                            >
                                <div className="w-[201.38px] flex items-center gap-1.5 relative">
                                    <div className="relative">
                                        <img
                                            src={creator.avatar}
                                            alt={creator.name}
                                            className="h-[30px] w-[30px] rounded-full object-cover"
                                        />
                                        {/* Status Dot */}
                                        {creator.status === 'Active' && (
                                            <div className="absolute left-[21.6px] -top-[1.38px] h-[9px] w-[9px] rounded-full bg-[#239B73] border border-white box-border z-10" />
                                        )}
                                        {creator.status === 'Suspended' && (
                                            <div className="absolute left-[21.6px] -top-[1.38px] h-[9px] w-[9px] rounded-full bg-[#FF8C00] border border-white box-border z-10" />
                                        )}
                                        {creator.status === 'Banned' && (
                                            <div className="absolute left-[21.6px] -top-[1.38px] h-[9px] w-[9px] rounded-full bg-[#FF4444] border border-white box-border z-10" />
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                            {creator.name}
                                        </span>
                                        <span className="text-xs text-[#5F5971] leading-[14px] font-normal font-['Neue_Montreal']">
                                            {creator.username}
                                        </span>
                                    </div>
                                </div>

                                {/* Revenue Column */}
                                <div className="w-[179.18px] flex-grow">
                                    <span className="text-[13.5px] font-normal text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                        {creator.revenue}
                                    </span>
                                </div>

                                {/* Products Column */}
                                <div className="w-[91.81px]">
                                    <span className="text-[13.5px] font-normal text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                        {creator.products}
                                    </span>
                                </div>

                                {/* Sales Count Column */}
                                <div className="w-[96.4px]">
                                    <span className="text-[13.5px] font-normal text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                        {creator.salesCount}
                                    </span>
                                </div>

                                {/* Subscribers Column */}
                                <div className="w-[97.24px]">
                                    <span className="text-[13.5px] font-normal text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                        {creator.subscribers.toLocaleString()}
                                    </span>
                                </div>

                                {/* Hub Views Column */}
                                <div className="w-[100px]">
                                    <span className="text-[13.5px] font-normal text-[#2B2834] leading-4 font-['Neue_Montreal']">
                                        {creator.hubViews}
                                    </span>
                                </div>

                                {/* Last Active Column */}
                                <div className="w-[150px]">
                                    <span className="text-xs font-normal text-[#5F5971] leading-[14px] font-['Neue_Montreal']">
                                        {creator.lastActive}
                                    </span>
                                </div>

                                {/* Actions Column */}
                                <div
                                    id={`menu-container-${creator.id}`}
                                    className="w-[18px] flex items-center justify-center relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className="p-0 hover:bg-gray-100 rounded-full transition-colors"

                                        onClick={() => setOpenMenuId(openMenuId === creator.id ? null : creator.id)}
                                    >
                                        <MoreVertical className="h-[18px] w-[18px] text-[#5F5971]" />
                                    </button>
                                    {openMenuId === creator.id && (
                                        <ActionMenu
                                            status={creator.status}
                                            onView={() => {
                                                onAction('view', creator.id);
                                                setOpenMenuId(null);
                                            }}
                                            onMessage={() => {
                                                onAction('message', creator.id);
                                                setOpenMenuId(null);
                                            }}
                                            onSuspend={() => {
                                                onAction('suspend', creator.id);
                                                setOpenMenuId(null);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Pagination Footer - Outside white container, matching header */}
            <div className="flex items-center justify-between h-[30px] shrink-0" style={{ padding: '0px 0px 0px 24px' }}>
                <span className="text-xs text-[rgba(0,0,0,0.5)] font-normal font-['Neue_Montreal'] leading-[14px]" style={{ textShadow: '0px 2px 20px rgba(0, 0, 0, 0.25)' }}>
                    Showing 1 to {creators.length} of 200 results
                </span>

                <div className="flex" style={{ gap: '8px' }}>
                    {/* Previous Button - Disabled */}
                    <div className="w-[87.5px] h-[30px] bg-[#F9F9FB] rounded-md shadow-[0px_2px_5.4px_rgba(0,0,0,0.05)] p-[1px] opacity-30">
                        <div className="w-full h-full bg-white rounded-[5px] shadow-[0px_4px_27px_rgba(0,0,0,0.18)] flex items-center justify-center px-[14px]">
                            <span className="text-[13px] font-medium text-[#5F5971] font-['Neue_Montreal'] leading-4" style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}>Previous</span>
                        </div>
                    </div>
                    {/* Next Button - Active */}
                    <div className="w-[87.5px] h-[30px] bg-[#F9F9FB] rounded-md shadow-[0px_2px_5.4px_rgba(0,0,0,0.05)] p-[1px] cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="w-full h-full bg-white rounded-[5px] shadow-[0px_4px_27px_rgba(0,0,0,0.18)] flex items-center justify-center px-[14px]">
                            <span className="text-[13px] font-medium text-[#5F5971] font-['Neue_Montreal'] leading-4" style={{ textShadow: '0px -1px 19.4px rgba(0, 0, 0, 0.25)' }}>Next</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
