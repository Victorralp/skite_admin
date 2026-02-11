'use client';

import { Plus, SlidersHorizontal, Download, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

type CreatorFiltersProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: 'all' | 'active' | 'suspended' | 'banned';
    setStatusFilter: (status: 'all' | 'active' | 'suspended' | 'banned') => void;
    onAddCreator: () => void;
};

const FilterPlusIcon = ({ className }: { className?: string }) => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4.09998 5.8501H7.59998M5.84998 4.1001V7.6001M0.599976 5.8501C0.599976 6.53954 0.735771 7.22223 0.999608 7.85919C1.26345 8.49614 1.65016 9.0749 2.13766 9.56241C2.62517 10.0499 3.20393 10.4366 3.84089 10.7005C4.47785 10.9643 5.16054 11.1001 5.84998 11.1001C6.53942 11.1001 7.2221 10.9643 7.85906 10.7005C8.49602 10.4366 9.07478 10.0499 9.56229 9.56241C10.0498 9.0749 10.4365 8.49614 10.7003 7.85919C10.9642 7.22223 11.1 6.53954 11.1 5.8501C11.1 4.45771 10.5469 3.12235 9.56229 2.13779C8.57772 1.15322 7.24236 0.600098 5.84998 0.600098C4.45759 0.600098 3.12223 1.15322 2.13766 2.13779C1.1531 3.12235 0.599976 4.45771 0.599976 5.8501Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SlidersHorizontalIcon = ({ className }: { className?: string }) => (
    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M7.5 7.5V0.5M7.5 0.5L9.83333 2.90625M7.5 0.5L5.16667 2.90625M2.83333 0.5V7.5M2.83333 7.5L5.16667 5.09375M2.83333 7.5L0.5 5.09375" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

type FilterDropdownProps = {
    title: string;
    showCalendar?: boolean;
    showCurrency?: boolean;
    onApply: () => void;
};

const FilterDropdown = ({ title, showCalendar, showCurrency, onApply }: FilterDropdownProps) => {
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    return (
        <div
            className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-border-brand rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px]"
            style={{
                boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
                zIndex: 50
            }}
        >
            {/* Title */}
            <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
                {title}
            </span>

            {/* Input Fields */}
            <div className="flex flex-col items-start gap-1 w-[161px] h-16">
                {/* From Field */}
                <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
                    <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
                        From
                    </span>
                    <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
                        <input
                            type={showCalendar ? "date" : "number"}
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}
                            className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
                            placeholder=""
                        />
                        {showCurrency && (
                            <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">₦</span>
                        )}
                    </div>
                </div>

                {/* To Field */}
                <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
                    <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
                        To
                    </span>
                    <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
                        <input
                            type={showCalendar ? "date" : "number"}
                            value={toValue}
                            onChange={(e) => setToValue(e.target.value)}
                            className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
                            placeholder=""
                        />
                        {showCurrency && (
                            <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">₦</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Apply Button */}
            <button
                onClick={onApply}
                className="w-[161px] h-8 flex items-center justify-center px-6 py-[14px] rounded-[9px]"
                style={{
                    background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)',
                    boxShadow: 'inset 0px 1.5px 1px rgba(255, 255, 255, 0.11)'
                }}
            >
                <span
                    className="text-[13.5px] font-medium text-white leading-4 font-sans"
                    style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
                >
                    Apply
                </span>
            </button>
        </div>
    );
};

export default function CreatorFilters({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    onAddCreator
}: CreatorFiltersProps) {
    const [revenueFilterActive, setRevenueFilterActive] = useState(false);
    const [dateJoinedFilterActive, setDateJoinedFilterActive] = useState(false);

    const revenueFilterRef = useRef<HTMLDivElement>(null);
    const dateJoinedFilterRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (revenueFilterRef.current && !revenueFilterRef.current.contains(event.target as Node)) {
                setRevenueFilterActive(false);
            }
            if (dateJoinedFilterRef.current && !dateJoinedFilterRef.current.contains(event.target as Node)) {
                setDateJoinedFilterActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col sm:flex-row gap-[10px] items-center justify-between h-[24px]">
            {/* Left: Filter Pills (Gap 6px) */}
            <div className="flex items-center gap-[6px] relative overflow-visible">
                {/* Revenue Filter */}
                <div className="relative overflow-visible" ref={revenueFilterRef}>
                    <button
                        onClick={() => {
                            setRevenueFilterActive(!revenueFilterActive);
                            setDateJoinedFilterActive(false);
                        }}
                        className={cn(
                            "flex items-center gap-[4px] pl-[7px] pr-[9px] py-[4px] h-[22px] rounded-full border border-dashed transition-colors box-border",
                            revenueFilterActive ? "border-border-brand" : "border-border-primary hover:bg-gray-50"
                        )}
                    >
                        <FilterPlusIcon className={cn(revenueFilterActive ? "text-text-brand" : "text-text-secondary")} />
                        <span className={cn("text-caption-lg font-sans", revenueFilterActive ? "text-text-brand" : "text-text-secondary")}>Revenue</span>
                    </button>
                    {revenueFilterActive && (
                        <FilterDropdown
                            title="Filter by: Revenue"
                            showCurrency={true}
                            onApply={() => setRevenueFilterActive(false)}
                        />
                    )}
                </div>

                {/* Date Joined Filter */}
                <div className="relative overflow-visible" ref={dateJoinedFilterRef}>
                    <button
                        onClick={() => {
                            setDateJoinedFilterActive(!dateJoinedFilterActive);
                            setRevenueFilterActive(false);
                        }}
                        className={cn(
                            "flex items-center gap-[4px] pl-[7px] pr-[9px] py-[4px] h-[22px] rounded-full border border-dashed transition-colors box-border",
                            dateJoinedFilterActive ? "border-border-brand" : "border-border-primary hover:bg-gray-50"
                        )}
                    >
                        <FilterPlusIcon className={cn(dateJoinedFilterActive ? "text-text-brand" : "text-text-secondary")} />
                        <span className={cn("text-caption-lg font-sans", dateJoinedFilterActive ? "text-text-brand" : "text-text-secondary")}>Date Joined</span>
                    </button>
                    {dateJoinedFilterActive && (
                        <FilterDropdown
                            title="Filter by: Timeline"
                            showCalendar={true}
                            onApply={() => setDateJoinedFilterActive(false)}
                        />
                    )}
                </div>

                {/* Status Filter */}
                <button
                    onClick={() => setStatusFilter(
                        statusFilter === 'all' ? 'active' :
                            statusFilter === 'active' ? 'suspended' :
                                statusFilter === 'suspended' ? 'banned' :
                                    'all'
                    )}
                    className={cn(
                        "flex items-center gap-[4px] pl-[7px] pr-[9px] py-[4px] h-[22px] rounded-full border border-dashed transition-colors box-border",
                        statusFilter !== 'all' ? "border-border-brand" : "border-border-primary hover:bg-gray-50"
                    )}
                >
                    <FilterPlusIcon className={cn(statusFilter !== 'all' ? "text-text-brand" : "text-text-secondary")} />
                    <span className={cn("text-caption-lg font-sans", statusFilter !== 'all' ? "text-text-brand" : "text-text-secondary")}>
                        {statusFilter === 'all' ? 'Status' :
                            statusFilter === 'active' ? 'Active' :
                                statusFilter === 'suspended' ? 'Suspended' :
                                    'Banned'}
                    </span>
                </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
                {/* Sort Button */}
                <button className="flex items-center gap-[2px] pl-[7px] pr-[10px] py-[5px] h-[24px] bg-white border border-border-primary rounded-lg shadow-button-soft hover:bg-gray-50 transition-colors box-border">
                    <SlidersHorizontalIcon className="h-[14px] w-[14px] text-text-secondary" />
                    <span className="text-[12px] font-normal text-text-secondary leading-[14px] font-sans">Sort</span>
                </button>
            </div>
        </div>
    );
}
