'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

type CreatorStatusFilter = 'all' | 'active' | 'suspended' | 'banned';

type CreatorFiltersProps = {
  statusFilter: CreatorStatusFilter;
  setStatusFilter: (status: CreatorStatusFilter) => void;
  revenueMinValue: string;
  revenueMaxValue: string;
  dateFromValue: string;
  dateToValue: string;
  onApplyRevenue: (min: string, max: string) => void;
  onClearRevenue: () => void;
  onApplyDateJoined: (from: string, to: string) => void;
  onClearDateJoined: () => void;
};

const FilterPlusIcon = ({ className }: { className?: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.09998 5.8501H7.59998M5.84998 4.1001V7.6001M0.599976 5.8501C0.599976 6.53954 0.735771 7.22223 0.999608 7.85919C1.26345 8.49614 1.65016 9.0749 2.13766 9.56241C2.62517 10.0499 3.20393 10.4366 3.84089 10.7005C4.47785 10.9643 5.16054 11.1001 5.84998 11.1001C6.53942 11.1001 7.2221 10.9643 7.85906 10.7005C8.49602 10.4366 9.07478 10.0499 9.56229 9.56241C10.0498 9.0749 10.4365 8.49614 10.7003 7.85919C10.9642 7.22223 11.1 6.53954 11.1 5.8501C11.1 4.45771 10.5469 3.12235 9.56229 2.13779C8.57772 1.15322 7.24236 0.600098 5.84998 0.600098C4.45759 0.600098 3.12223 1.15322 2.13766 2.13779C1.1531 3.12235 0.599976 4.45771 0.599976 5.8501Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SlidersHorizontalIcon = ({ className }: { className?: string }) => (
  <svg
    width="11"
    height="8"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M7.5 7.5V0.5M7.5 0.5L9.83333 2.90625M7.5 0.5L5.16667 2.90625M2.83333 0.5V7.5M2.83333 7.5L5.16667 5.09375M2.83333 7.5L0.5 5.09375"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type FilterDropdownProps = {
  title: string;
  showCalendar?: boolean;
  showCurrency?: boolean;
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
};

type StatusFilterDropdownProps = {
  selected: CreatorStatusFilter;
  onSelect: (value: CreatorStatusFilter) => void;
  onApply: () => void;
  onClear: () => void;
};

const FilterDropdown = ({
  title,
  showCalendar,
  showCurrency,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  onApply,
  onClear
}: FilterDropdownProps) => {
  const openNativeDatePicker = (input: HTMLInputElement & { showPicker?: () => void }) => {
    if (!showCalendar || typeof input.showPicker !== 'function') return;
    try {
      input.showPicker();
    } catch {
      // Ignore browsers/contexts that reject picker opening outside strict gestures.
    }
  };

  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] bg-white border border-border-brand rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px]"
      style={{
        boxShadow:
          '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
        {title}
      </span>

      <div className="flex flex-col items-start gap-1 w-[161px]">
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            From
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type={showCalendar ? 'date' : 'number'}
              value={fromValue}
              onChange={(event) => onFromChange(event.target.value)}
              onClick={(event) => openNativeDatePicker(event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                  event.preventDefault();
                  openNativeDatePicker(event.currentTarget);
                }
              }}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">
                ₦
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            To
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type={showCalendar ? 'date' : 'number'}
              value={toValue}
              onChange={(event) => onToChange(event.target.value)}
              onClick={(event) => openNativeDatePicker(event.currentTarget)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                  event.preventDefault();
                  openNativeDatePicker(event.currentTarget);
                }
              }}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">
                ₦
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-[161px] flex items-center gap-2">
        <button
          onClick={onClear}
          className="w-full h-8 flex items-center justify-center rounded-[9px] border border-border-primary bg-white"
        >
          <span className="text-[13px] font-medium text-text-secondary leading-4 font-sans">Clear</span>
        </button>
        <button
          onClick={onApply}
          className="w-full h-8 flex items-center justify-center rounded-[9px]"
          style={{
            background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)',
            boxShadow: 'inset 0px 1.5px 1px rgba(255, 255, 255, 0.11)'
          }}
        >
          <span
            className="text-[13px] font-medium text-white leading-4 font-sans"
            style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
          >
            Apply
          </span>
        </button>
      </div>
    </div>
  );
};

const StatusFilterDropdown = ({
  selected,
  onSelect,
  onApply,
  onClear
}: StatusFilterDropdownProps) => {
  const options: CreatorStatusFilter[] = ['active', 'suspended', 'banned'];

  const formatLabel = (value: CreatorStatusFilter) =>
    value === 'all'
      ? 'All'
      : value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[180px] bg-white border border-border-brand rounded-[16px] flex flex-col items-start p-2 gap-1"
      style={{
        boxShadow:
          '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      <button
        type="button"
        onClick={() => onSelect('all')}
        className={cn(
          "w-full h-8 px-2 rounded-md text-left text-[12px] leading-[14px] font-sans",
          selected === 'all'
            ? "text-text-brand bg-surface-secondary"
            : "text-text-secondary hover:bg-surface-secondary"
        )}
      >
        All
      </button>
      {options.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onSelect(status)}
          className={cn(
            "w-full h-8 px-2 rounded-md text-left text-[12px] leading-[14px] font-sans",
            selected === status
              ? "text-text-brand bg-surface-secondary"
              : "text-text-secondary hover:bg-surface-secondary"
          )}
        >
          {formatLabel(status)}
        </button>
      ))}
      <div className="w-full pt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          className="w-full h-8 rounded-[9px] border border-border-primary bg-white text-[13px] font-medium text-text-secondary leading-4 font-sans"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onApply}
          className="w-full h-8 rounded-[9px] text-[13px] font-medium text-white leading-4 font-sans"
          style={{
            background: 'linear-gradient(180deg, #5F2EFC 22.58%, #4E18FC 100%)',
            boxShadow: 'inset 0px 1.5px 1px rgba(255, 255, 255, 0.11)'
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default function CreatorFilters({
  statusFilter,
  setStatusFilter,
  revenueMinValue,
  revenueMaxValue,
  dateFromValue,
  dateToValue,
  onApplyRevenue,
  onClearRevenue,
  onApplyDateJoined,
  onClearDateJoined
}: CreatorFiltersProps) {
  const [revenueFilterActive, setRevenueFilterActive] = useState(false);
  const [dateJoinedFilterActive, setDateJoinedFilterActive] = useState(false);
  const [statusFilterActive, setStatusFilterActive] = useState(false);
  const [statusFilterDraft, setStatusFilterDraft] = useState<CreatorStatusFilter>(statusFilter);
  const [revenueMinDraft, setRevenueMinDraft] = useState(revenueMinValue);
  const [revenueMaxDraft, setRevenueMaxDraft] = useState(revenueMaxValue);
  const [dateFromDraft, setDateFromDraft] = useState(dateFromValue);
  const [dateToDraft, setDateToDraft] = useState(dateToValue);

  const revenueFilterRef = useRef<HTMLDivElement>(null);
  const dateJoinedFilterRef = useRef<HTMLDivElement>(null);
  const statusFilterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRevenueMinDraft(revenueMinValue);
    setRevenueMaxDraft(revenueMaxValue);
  }, [revenueMinValue, revenueMaxValue]);

  useEffect(() => {
    setDateFromDraft(dateFromValue);
    setDateToDraft(dateToValue);
  }, [dateFromValue, dateToValue]);

  useEffect(() => {
    setStatusFilterDraft(statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (revenueFilterRef.current && !revenueFilterRef.current.contains(event.target as Node)) {
        setRevenueFilterActive(false);
      }
      if (dateJoinedFilterRef.current && !dateJoinedFilterRef.current.contains(event.target as Node)) {
        setDateJoinedFilterActive(false);
      }
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setStatusFilterActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-[10px] items-center justify-between h-[24px]">
      <div className="flex items-center gap-[6px] relative overflow-visible">
        <div className="relative overflow-visible" ref={revenueFilterRef}>
          <button
            onClick={() => {
              setRevenueFilterActive(!revenueFilterActive);
              setDateJoinedFilterActive(false);
              setStatusFilterActive(false);
            }}
            className={cn(
              "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
              revenueFilterActive || revenueMinValue.trim().length > 0 || revenueMaxValue.trim().length > 0
                ? "border-border-brand"
                : "border-border-primary hover:bg-gray-50"
            )}
          >
            <FilterPlusIcon
              className={cn(
                "w-2.5 h-2.5",
                revenueFilterActive || revenueMinValue.trim().length > 0 || revenueMaxValue.trim().length > 0
                  ? "text-text-brand"
                  : "text-text-secondary"
              )}
            />
            <span
              className={cn(
                "text-[11px] leading-[13px] font-sans",
                revenueFilterActive || revenueMinValue.trim().length > 0 || revenueMaxValue.trim().length > 0
                  ? "text-text-brand"
                  : "text-text-secondary"
              )}
            >
              Revenue
            </span>
          </button>
          {revenueFilterActive && (
            <FilterDropdown
              title="Filter by: Revenue"
              showCurrency={true}
              fromValue={revenueMinDraft}
              toValue={revenueMaxDraft}
              onFromChange={setRevenueMinDraft}
              onToChange={setRevenueMaxDraft}
              onApply={() => {
                onApplyRevenue(revenueMinDraft, revenueMaxDraft);
                setRevenueFilterActive(false);
              }}
              onClear={() => {
                setRevenueMinDraft('');
                setRevenueMaxDraft('');
                onClearRevenue();
                setRevenueFilterActive(false);
              }}
            />
          )}
        </div>

        <div className="relative overflow-visible" ref={dateJoinedFilterRef}>
          <button
            onClick={() => {
              setDateJoinedFilterActive(!dateJoinedFilterActive);
              setRevenueFilterActive(false);
              setStatusFilterActive(false);
            }}
            className={cn(
              "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
              dateJoinedFilterActive || dateFromValue.trim().length > 0 || dateToValue.trim().length > 0
                ? "border-border-brand"
                : "border-border-primary hover:bg-gray-50"
            )}
          >
            <FilterPlusIcon
              className={cn(
                "w-2.5 h-2.5",
                dateJoinedFilterActive || dateFromValue.trim().length > 0 || dateToValue.trim().length > 0
                  ? "text-text-brand"
                  : "text-text-secondary"
              )}
            />
            <span
              className={cn(
                "text-[11px] leading-[13px] font-sans",
                dateJoinedFilterActive || dateFromValue.trim().length > 0 || dateToValue.trim().length > 0
                  ? "text-text-brand"
                  : "text-text-secondary"
              )}
            >
              Date Joined
            </span>
          </button>
          {dateJoinedFilterActive && (
            <FilterDropdown
              title="Filter by: Timeline"
              showCalendar={true}
              fromValue={dateFromDraft}
              toValue={dateToDraft}
              onFromChange={setDateFromDraft}
              onToChange={setDateToDraft}
              onApply={() => {
                onApplyDateJoined(dateFromDraft, dateToDraft);
                setDateJoinedFilterActive(false);
              }}
              onClear={() => {
                setDateFromDraft('');
                setDateToDraft('');
                onClearDateJoined();
                setDateJoinedFilterActive(false);
              }}
            />
          )}
        </div>

        <div className="relative overflow-visible" ref={statusFilterRef}>
          <button
            onClick={() => {
              setStatusFilterActive(!statusFilterActive);
              setRevenueFilterActive(false);
              setDateJoinedFilterActive(false);
            }}
            className={cn(
              "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
              statusFilterActive || statusFilter !== 'all'
                ? "border-border-brand"
                : "border-border-primary hover:bg-gray-50"
            )}
          >
            <FilterPlusIcon
              className={cn(
                "w-2.5 h-2.5",
                statusFilterActive || statusFilter !== 'all'
                  ? "text-text-brand"
                  : "text-text-secondary"
              )}
            />
            <span
              className={cn(
                "text-[11px] leading-[13px] font-sans",
                statusFilterActive || statusFilter !== 'all'
                  ? "text-text-brand"
                  : "text-text-secondary"
              )}
            >
              {statusFilter === 'all'
                ? 'Status'
                : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
            </span>
          </button>
          {statusFilterActive && (
            <StatusFilterDropdown
              selected={statusFilterDraft}
              onSelect={setStatusFilterDraft}
              onApply={() => {
                setStatusFilter(statusFilterDraft);
                setStatusFilterActive(false);
              }}
              onClear={() => {
                setStatusFilterDraft('all');
                setStatusFilter('all');
                setStatusFilterActive(false);
              }}
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-[2px] pl-[7px] pr-[10px] py-[5px] h-[24px] bg-white border border-border-primary rounded-lg shadow-button-soft hover:bg-gray-50 transition-colors box-border">
          <SlidersHorizontalIcon className="h-[14px] w-[14px] text-text-secondary" />
          <span className="text-[12px] font-normal text-text-secondary leading-[14px] font-sans">Sort</span>
        </button>
      </div>
    </div>
  );
}
