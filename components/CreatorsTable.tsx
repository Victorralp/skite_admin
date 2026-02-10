'use client';

import { Creator } from '@/data/dashboard';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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
        <Card className="rounded-lg border border-border-primary flex flex-col w-full shadow-none p-1 gap-1 bg-surface-secondary">
            {/* Header Row - Outside white container */}
            <div className="flex items-center h-table-header shrink-0 px-table-padding-x gap-table-gap">
                <div className="flex-1 min-w-[200px] text-caption-lg text-text-primary">Creator</div>
                <div className="flex-1 min-w-[120px] text-caption-lg text-text-primary">Revenue</div>
                <div className="w-[100px] text-caption-lg text-text-primary">Products</div>
                <div className="w-[100px] text-caption-lg text-text-primary">Sales Count</div>
                <div className="w-[120px] text-caption-lg text-text-primary">Subscribers</div>
                <div className="w-[100px] text-caption-lg text-text-primary">Hub Views</div>
                <div className="flex-1 min-w-[120px] text-caption-lg text-text-primary">Last Active</div>
                <div className="w-action-button opacity-0">1</div>
            </div>

            {/* White container with border */}
            <div className="flex flex-col bg-white border border-border-primary rounded-lg">
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
                                className="flex items-center h-table-row bg-white border-b border-border-primary last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer px-table-padding-x gap-table-gap"
                                onClick={() => onCreatorClick(creator)}
                            >
                                <div className="flex-1 min-w-[200px] flex items-center gap-1.5 relative">
                                    <div className="relative">
                                        <img
                                            src={creator.avatar}
                                            alt={creator.name}
                                            className="h-avatar-sm w-avatar-sm rounded-full object-cover"
                                        />
                                        {/* Status Dot */}
                                        {creator.status === 'Active' && (
                                            <div className="absolute left-5 -top-0.5 h-status-dot w-status-dot rounded-full bg-green-600 border border-white box-border z-10" />
                                        )}
                                        {creator.status === 'Suspended' && (
                                            <div className="absolute left-5 -top-0.5 h-status-dot w-status-dot rounded-full bg-orange-500 border border-white box-border z-10" />
                                        )}
                                        {creator.status === 'Banned' && (
                                            <div className="absolute left-5 -top-0.5 h-status-dot w-status-dot rounded-full bg-red-500 border border-white box-border z-10" />
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-body-sm font-medium text-text-primary leading-4 truncate">
                                            {creator.name}
                                        </span>
                                        <span className="text-caption-lg text-text-secondary leading-[14px] font-normal truncate">
                                            {creator.username}
                                        </span>
                                    </div>
                                </div>

                                {/* Revenue Column */}
                                <div className="flex-1 min-w-[120px]">
                                    <span className="text-body-sm font-normal text-text-primary leading-4">
                                        {creator.revenue}
                                    </span>
                                </div>

                                {/* Products Column */}
                                <div className="w-[100px]">
                                    <span className="text-body-sm font-normal text-text-primary leading-4">
                                        {creator.products}
                                    </span>
                                </div>

                                {/* Sales Count Column */}
                                <div className="w-[100px]">
                                    <span className="text-body-sm font-normal text-text-primary leading-4">
                                        {creator.salesCount}
                                    </span>
                                </div>

                                {/* Subscribers Column */}
                                <div className="w-[120px]">
                                    <span className="text-body-sm font-normal text-text-primary leading-4">
                                        {creator.subscribers.toLocaleString()}
                                    </span>
                                </div>

                                {/* Hub Views Column */}
                                <div className="w-[100px]">
                                    <span className="text-body-sm font-normal text-text-primary leading-4">
                                        {creator.hubViews}
                                    </span>
                                </div>

                                {/* Last Active Column */}
                                <div className="flex-1 min-w-[120px]">
                                    <span className="text-caption-lg font-normal text-text-secondary leading-[14px]">
                                        {creator.lastActive}
                                    </span>
                                </div>

                                {/* Actions Column */}
                                <div
                                    id={`menu-container-${creator.id}`}
                                    className="w-action-button flex items-center justify-center relative"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className="p-0 hover:bg-gray-100 rounded-full transition-colors"
                                        onClick={() => setOpenMenuId(openMenuId === creator.id ? null : creator.id)}
                                    >
                                        <MoreVertical className="h-action-button w-action-button text-text-secondary" />
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
            <div className="flex items-center justify-between h-table-header shrink-0 pl-table-padding-x">
                <span className="text-caption-lg text-text-tertiary font-normal leading-[14px]">
                    Showing 1 to {creators.length} of 200 results
                </span>

                <div className="flex gap-2">
                    {/* Previous Button - Disabled */}
                    <div className="w-20 h-8 bg-surface-secondary rounded-md shadow-button p-0.5 opacity-30">
                        <div className="w-full h-full bg-white rounded shadow-button-inset flex items-center justify-center px-3">
                            <span className="text-caption-md font-medium text-text-secondary">Previous</span>
                        </div>
                    </div>
                    {/* Next Button - Active */}
                    <div className="w-20 h-8 bg-surface-secondary rounded-md shadow-button p-0.5 cursor-pointer hover:opacity-90 transition-opacity">
                        <div className="w-full h-full bg-white rounded shadow-button-inset flex items-center justify-center px-3">
                            <span className="text-caption-md font-medium text-text-secondary">Next</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
