'use client';

import { useState, useEffect, useRef } from 'react';
import StatsCard from '@/components/StatsCard';
import UserDetailModal from '@/components/UserDetailModal';
import ActionMenu from '@/components/ActionMenu';
import { MoreVertical } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { allUsers, User } from '@/data/dashboard';
import { cn } from '@/lib/utils';

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

export default function UsersPage() {
  const [dateJoinedFilterActive, setDateJoinedFilterActive] = useState(false);
  const [purchaseCountFilterActive, setPurchaseCountFilterActive] = useState(false);
  const [spendFilterActive, setSpendFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const dateJoinedFilterRef = useRef<HTMLDivElement>(null);
  const purchaseCountFilterRef = useRef<HTMLDivElement>(null);
  const spendFilterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dateJoinedFilterRef.current && !dateJoinedFilterRef.current.contains(event.target as Node)) {
        setDateJoinedFilterActive(false);
      }
      if (purchaseCountFilterRef.current && !purchaseCountFilterRef.current.contains(event.target as Node)) {
        setPurchaseCountFilterActive(false);
      }
      if (spendFilterRef.current && !spendFilterRef.current.contains(event.target as Node)) {
        setSpendFilterActive(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const stats = [
    { title: 'Total Users', value: '129,813', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Active Users (Last 30 Days)', value: '98,328', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Paying Users', value: '41,382', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Flagged Users', value: '223', trend: '+2 today', trendDirection: 'down' as const },
  ];

  // Use centralized user data and filter by status
  const filteredUsers = allUsers.filter(user => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') return user.status === 'Active';
    if (statusFilter === 'inactive') return user.status === 'Inactive';
    if (statusFilter === 'pending') return user.status === 'Pending';
    return true;
  });

  const handleViewUserDetails = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <PageContainer>
        {/* Stats Section */}
        <div className="flex flex-col items-start gap-2 w-full">
          <h1 className="m-0 text-heading-lg-bold text-text-primary">
            Users
          </h1>

          {/* Cards stretch to available width; wrap on smaller screens. */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 w-full">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="flex flex-col gap-2">
          {/* Filters and Sort */}
          <div className="flex justify-between items-center h-6">
            <div className="flex gap-[6px] items-center relative overflow-visible">
              <div className="relative overflow-visible" ref={dateJoinedFilterRef}>
                <FilterPill
                  label="Date Joined"
                  active={dateJoinedFilterActive}
                  onClick={() => {
                    setDateJoinedFilterActive(!dateJoinedFilterActive);
                    setPurchaseCountFilterActive(false);
                    setSpendFilterActive(false);
                  }}
                />
                {dateJoinedFilterActive && (
                  <FilterDropdown
                    title="Filter by: Date Joined"
                    showCalendar={true}
                    onApply={() => setDateJoinedFilterActive(false)}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={purchaseCountFilterRef}>
                <FilterPill
                  label="Purchase Count"
                  active={purchaseCountFilterActive}
                  onClick={() => {
                    setPurchaseCountFilterActive(!purchaseCountFilterActive);
                    setDateJoinedFilterActive(false);
                    setSpendFilterActive(false);
                  }}
                />
                {purchaseCountFilterActive && (
                  <FilterDropdown
                    title="Filter by: Purchase Count"
                    showCalendar={false}
                    onApply={() => setPurchaseCountFilterActive(false)}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={spendFilterRef}>
                <FilterPill
                  label="Spend"
                  active={spendFilterActive}
                  onClick={() => {
                    setSpendFilterActive(!spendFilterActive);
                    setDateJoinedFilterActive(false);
                    setPurchaseCountFilterActive(false);
                  }}
                />
                {spendFilterActive && (
                  <FilterDropdown
                    title="Filter by: Spend"
                    showCurrency={true}
                    onApply={() => setSpendFilterActive(false)}
                  />
                )}
              </div>

              <button
                onClick={() => {
                  setStatusFilter(
                    statusFilter === 'all' ? 'active' :
                      statusFilter === 'active' ? 'inactive' :
                        statusFilter === 'inactive' ? 'pending' : 'all'
                  );
                }}
                className={cn(
                  "flex items-center gap-[4px] pl-[7px] pr-[9px] py-[4px] h-[22px] rounded-full border border-dashed transition-colors box-border",
                  statusFilter !== 'all' ? "border-brand-primary" : "border-border-primary hover:bg-gray-50"
                )}
              >
                <FilterPlusIcon className={cn(statusFilter !== 'all' ? "text-brand-primary" : "text-text-secondary")} />
                <span className={cn("text-caption-lg font-sans", statusFilter !== 'all' ? "text-brand-primary" : "text-text-secondary")}>
                  {statusFilter === 'all' ? 'Status' :
                    statusFilter === 'active' ? 'Active' :
                      statusFilter === 'inactive' ? 'Inactive' : 'Pending'}
                </span>
              </button>
            </div>
            <button className="flex items-center gap-[2px] pl-[7px] pr-[10px] py-[5px] h-[24px] bg-white border border-border-primary rounded-lg shadow-button hover:bg-gray-50 transition-colors box-border">
              <SlidersHorizontalIcon className="h-[14px] w-[14px] text-text-secondary" />
              <span className="text-[12px] font-normal text-text-secondary leading-[14px] font-sans">Sort</span>
            </button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border-primary flex flex-col w-full shadow-none p-1 gap-1 bg-surface-secondary overflow-x-auto">
            {/* Table Header */}
            <div className="flex items-center h-8 shrink-0 px-6 gap-4 min-w-[600px]">
              <div className="w-[200px] sm:w-[240px] lg:w-[266px] text-caption-lg font-medium text-text-primary">User</div>
              <div className="hidden sm:block w-[80px] md:w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Joined</div>
              <div className="w-[70px] sm:w-[80px] md:w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Purchases</div>
              <div className="w-[80px] sm:w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Total Spent</div>
              <div className="hidden md:block w-[100px] lg:w-[120px] text-caption-lg font-medium text-text-primary">Subscriptions</div>
              <div className="hidden lg:block w-[120px] text-caption-lg font-medium text-text-primary">Last Active</div>
              <div className="w-[50px] text-caption-lg font-medium text-text-primary">Status</div>
              <div className="flex-1 min-w-[18px] flex justify-end opacity-0">•</div>
            </div>

            {/* Table Body */}
            <div className="bg-white border border-border-primary rounded-lg overflow-hidden">
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isMenuOpen={openMenuId === user.id}
                  onMenuToggle={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                  onViewDetails={() => handleViewUserDetails(user)}
                  menuRef={openMenuId === user.id ? menuRef : null}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center pl-6 h-8">
              <span className="text-caption-lg text-text-tertiary">Showing 1 to {filteredUsers.length} of {filteredUsers.length} results</span>
              <div className="flex gap-2">
                <div className="w-[87.5px] h-8 bg-surface-secondary rounded-md shadow-button p-0.5 opacity-30">
                  <div className="flex items-center justify-center bg-white rounded shadow-button-inset h-7 px-3.5">
                    <span className="text-caption-md font-medium text-text-secondary">Previous</span>
                  </div>
                </div>
                <div className="w-[87.5px] h-8 bg-surface-secondary rounded-md shadow-button p-0.5 cursor-pointer hover:opacity-90 transition-opacity">
                  <div className="flex items-center justify-center bg-white rounded shadow-button-inset h-7 px-3.5">
                    <span className="text-caption-md font-medium text-text-secondary">Next</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-[4px] pl-[7px] pr-[9px] py-[4px] h-[22px] rounded-full border border-dashed transition-colors box-border",
        active ? "border-brand-primary" : "border-border-primary hover:bg-gray-50"
      )}
    >
      <FilterPlusIcon className={cn(active ? "text-brand-primary" : "text-text-secondary")} />
      <span className={cn("text-caption-lg font-sans", active ? "text-brand-primary" : "text-text-secondary")}>{label}</span>
    </button>
  );
}

function FilterDropdown({ title, showCalendar, showCurrency, onApply }: { title: string; showCalendar?: boolean; showCurrency?: boolean; onApply: () => void }) {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-brand-primary rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px] shadow-dropdown z-50"
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
        className="w-[161px] h-8 flex items-center justify-center px-6 py-[14px] rounded-[9px] bg-gradient-to-b from-brand-primary to-brand-purple shadow-button-inset"
      >
        <span className="text-[13.5px] font-medium text-white leading-4 font-sans">
          Apply
        </span>
      </button>
    </div>
  );
}

function UserRow({ user, isMenuOpen, onMenuToggle, onViewDetails, menuRef }: { user: any; isMenuOpen: boolean; onMenuToggle: () => void; onViewDetails: () => void; menuRef: React.RefObject<HTMLDivElement> | null }) {
  const statusConfig = {
    Active: {
      bg: 'bg-surface-success',
      color: 'text-text-success',
      label: 'Active',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.25 5C1.25 5.49246 1.347 5.98009 1.53545 6.43506C1.72391 6.89003 2.00013 7.30343 2.34835 7.65165C2.69657 7.99987 3.10997 8.27609 3.56494 8.46455C4.01991 8.653 4.50754 8.75 5 8.75C5.49246 8.75 5.98009 8.653 6.43506 8.46455C6.89003 8.27609 7.30343 7.99987 7.65165 7.65165C7.99987 7.30343 8.27609 6.89003 8.46455 6.43506C8.653 5.98009 8.75 5.49246 8.75 5C8.75 4.50754 8.653 4.01991 8.46455 3.56494C8.27609 3.10997 7.99987 2.69657 7.65165 2.34835C7.30343 2.00013 6.89003 1.72391 6.43506 1.53545C5.98009 1.347 5.49246 1.25 5 1.25C4.50754 1.25 4.01991 1.347 3.56494 1.53545C3.10997 1.72391 2.69657 2.00013 2.34835 2.34835C2.00013 2.69657 1.72391 3.10997 1.53545 3.56494C1.347 4.01991 1.25 4.50754 1.25 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.75 5.00033L4.58333 5.83366L6.25 4.16699" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    Pending: {
      bg: 'bg-surface-warning',
      color: 'text-text-warning',
      label: 'Pending',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16667 8.65694C3.80411 8.57433 3.45585 8.43826 3.13333 8.25319M5.83333 1.34277C6.66173 1.53197 7.40135 1.99681 7.9311 2.66119C8.46086 3.32557 8.74935 4.15013 8.74935 4.99986C8.74935 5.84959 8.46086 6.67414 7.9311 7.33852C7.40135 8.0029 6.66173 8.46774 5.83333 8.65694M1.90792 7.12194C1.68087 6.79158 1.50826 6.42695 1.39667 6.04194M1.30167 4.37486C1.36833 3.97902 1.49667 3.60402 1.67667 3.26027L1.74708 3.13319M2.87792 1.90777C3.268 1.63981 3.70528 1.4481 4.16667 1.34277M5 3.33319V4.99986M5 6.66652V6.67069" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    Inactive: {
      bg: 'bg-surface-danger',
      color: 'text-text-danger',
      label: 'Inactive',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3.74975V5.41642M5 6.66642H5.00417M4.31792 1.496L0.940416 7.13517C0.870789 7.25575 0.833944 7.39245 0.833545 7.53169C0.833146 7.67092 0.869208 7.80784 0.938143 7.92881C1.00708 8.04978 1.10648 8.1506 1.22647 8.22123C1.34646 8.29187 1.48286 8.32986 1.62208 8.33142H8.37792C8.51708 8.32981 8.6534 8.29182 8.77334 8.22121C8.89327 8.15059 8.99263 8.04983 9.06156 7.92892C9.13048 7.808 9.16656 7.67116 9.16621 7.53199C9.16587 7.39281 9.12911 7.25615 9.05958 7.13559L5.68208 1.49559C5.61102 1.3783 5.51092 1.28131 5.39144 1.214C5.27196 1.14669 5.13714 1.11133 5 1.11133C4.86286 1.11133 4.72804 1.14669 4.60856 1.214C4.48908 1.28131 4.38898 1.3783 4.31792 1.49559V1.496Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  };

  const status = statusConfig[user.status as keyof typeof statusConfig] || statusConfig.Active;

  return (
    <div className="flex items-center h-[50px] bg-white border-b border-border-primary last:border-0 hover:bg-gray-50/50 transition-colors px-6 gap-4 min-w-[600px]">
      {/* User */}
      <div className="flex items-center gap-1.5 w-[200px] sm:w-[240px] lg:w-[266px]">
        <div className="w-avatar-sm h-avatar-sm rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex flex-col flex-1 overflow-hidden">
          <span className="text-body-sm font-medium text-text-primary leading-4 truncate">{user.name}</span>
          <span className="text-caption-lg text-text-secondary leading-[14px] truncate">{user.username}</span>
        </div>
      </div>

      {/* Joined - Hidden on mobile */}
      <div className="hidden sm:block w-[80px] md:w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">{user.joined}</div>

      {/* Purchases */}
      <div className="w-[70px] sm:w-[80px] md:w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">{user.purchases}</div>

      {/* Total Spent */}
      <div className="w-[80px] sm:w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">₦{user.spent.toLocaleString()}</div>

      {/* Subscriptions - Hidden on mobile and small tablets */}
      <div className="hidden md:block w-[100px] lg:w-[120px] text-body-sm text-text-primary leading-4 truncate">{user.subscriptions}</div>

      {/* Last Active - Hidden on mobile and tablets */}
      <div className="hidden lg:block w-[120px] text-caption-lg text-text-secondary leading-[14px] truncate">{user.lastActive}</div>

      {/* Status */}
      <div className="w-[50px]">
        <span className={cn(
          "inline-flex items-center gap-0.5 px-[6px] py-[1px] pl-[3px] rounded text-caption-sm h-[14px] w-fit",
          status.bg,
          status.color
        )}>
          {status.icon}
          {status.label}
        </span>
      </div>

      {/* Actions */}
      <div className="relative flex-1 min-w-[18px] flex justify-end items-center" ref={menuRef}>
        <button
          onClick={onMenuToggle}
          className="w-[18px] h-[18px] flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <MoreVertical className="h-[18px] w-[18px] text-text-secondary" />
        </button>

        {isMenuOpen && (
          <ActionMenu
            status="Active"
            showViewOption={true}
            viewLabel="View User Details"
            messageLabel="Suspend User"
            suspendLabel="Ban User"
            onView={onViewDetails}
            onMessage={() => {
              console.log('Suspend user');
              onMenuToggle();
            }}
            onSuspend={() => {
              console.log('Ban user');
              onMenuToggle();
            }}
          />
        )}
      </div>
    </div>
  );
}
