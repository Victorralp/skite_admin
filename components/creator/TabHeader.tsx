'use client';

import { Search, Filter } from 'lucide-react';
import CustomDropdown from '@/components/ui/CustomDropdown';
import { cn } from '@/lib/utils';
import React from 'react';

interface TabHeaderProps {
    searchPlaceholder: string;
    onSearch?: (term: string) => void;
    showFilterButton?: boolean;
    onFilter?: () => void;
    statusOptions?: string[];
    defaultStatus?: string;
    statusDropdownPosition?: 'left' | 'right';
    onStatusChange?: (status: string) => void;
    actionLabel: string;
    ActionIcon?: React.ElementType;
    onAction?: () => void;
}

export default function TabHeader({
    searchPlaceholder,
    onSearch,
    showFilterButton = true,
    onFilter,
    statusOptions,
    defaultStatus = 'All Status',
    statusDropdownPosition = 'right',
    onStatusChange,
    actionLabel,
    ActionIcon,
    onAction
}: TabHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="pl-9 pr-4 py-2 w-[300px] h-[36px] bg-white border border-border-primary rounded-lg text-[13.5px] placeholder-[#A5A1AF] focus:outline-none focus:border-border-brand"
                        onChange={(e) => onSearch?.(e.target.value)}
                    />
                </div>
                {showFilterButton && (
                    <button
                        onClick={onFilter}
                        className="flex items-center gap-2 px-3 py-2 h-[36px] bg-white border border-border-primary rounded-lg text-[13.5px] font-medium text-text-primary hover:bg-gray-50"
                    >
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                )}
                {statusOptions && statusDropdownPosition === 'left' && (
                    <CustomDropdown
                        options={statusOptions}
                        defaultLabel={defaultStatus}
                    />
                )}
            </div>
            <div className="flex items-center gap-3">
                {statusOptions && statusDropdownPosition === 'right' && (
                    <CustomDropdown
                        options={statusOptions}
                        defaultLabel={defaultStatus}
                    />
                )}
                <button
                    onClick={onAction}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 h-[36px] rounded-lg text-[13.5px] font-medium transition-colors",
                        ActionIcon ? "bg-white border border-border-primary text-text-primary hover:bg-gray-50" : "bg-[#2B2834] text-white hover:bg-[#1a191f]"
                    )}
                >
                    {ActionIcon && <ActionIcon className="w-4 h-4" />}
                    {actionLabel}
                </button>
            </div>
        </div>
    );
}
