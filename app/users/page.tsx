'use client';

import { useState } from 'react';
import StatsCard from '@/components/StatsCard';
import UserDetailModal from '@/components/UserDetailModal';
import ActionMenu from '@/components/ActionMenu';
import { MoreVertical } from 'lucide-react';

export default function UsersPage() {
  const [dateJoinedFilterActive, setDateJoinedFilterActive] = useState(false);
  const [purchaseCountFilterActive, setPurchaseCountFilterActive] = useState(false);
  const [spendFilterActive, setSpendFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { title: 'Total Users', value: '129,813', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Active Users (Last 30 Days)', value: '98,328', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Paying Users', value: '41,382', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Flagged Users', value: '223', trend: '+2 today', trendDirection: 'down' as const },
  ];

  const users = [
    { id: 1, name: 'Temilade Odunsi', username: '@username', avatar: '', joined: '2 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 2, name: 'Emeka Onwudiwe', username: '@username', avatar: '', joined: '27 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 3, name: 'Blessing Okon', username: '@username', avatar: '', joined: '11 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 4, name: 'Yahaya Ibrahim', username: '@username', avatar: '', joined: '31 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 5, name: 'Fatima Musa', username: '@username', avatar: '', joined: '53 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'inactive' },
    { id: 6, name: 'Nnamdi Kalu', username: '@username', avatar: '', joined: '14 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 7, name: 'Iretiola Osho', username: '@username', avatar: '', joined: '35 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 8, name: 'Chidi Nwachukwu', username: '@username', avatar: '', joined: '23 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 9, name: 'Kayode Ajayi', username: '@username', avatar: '', joined: '46 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'active' },
    { id: 10, name: 'Tolulope Adebayo', username: '@username', avatar: '', joined: '5 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'pending' },
    { id: 11, name: 'Ishaya Tanko', username: '@username', avatar: '', joined: '49 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'pending' },
    { id: 12, name: 'Yetunde Bakare', username: '@username', avatar: '', joined: '3 min ago', purchases: 242, spent: 12090, subscriptions: 13, lastActive: '12.03.2025 00:23', status: 'inactive' },
  ];

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
    <div className="flex flex-col w-full bg-white px-16 py-6 gap-8">
        {/* Stats Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-[#2B2834]">Users</h1>
          <div className="grid grid-cols-4 gap-2">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="flex flex-col gap-2">
          {/* Filters and Sort */}
          <div className="flex justify-between items-center h-6">
            <div className="flex gap-1.5 items-center relative">
              <div className="relative">
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
              
              <div className="relative">
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
              
              <div className="relative">
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
              
              <FilterPill 
                label={statusFilter === 'all' ? 'Status' : 
                      statusFilter === 'active' ? 'Active' :
                      statusFilter === 'inactive' ? 'Inactive' : 'Pending'}
                active={statusFilter !== 'all'}
                onClick={() => {
                  setStatusFilter(
                    statusFilter === 'all' ? 'active' :
                    statusFilter === 'active' ? 'inactive' :
                    statusFilter === 'inactive' ? 'pending' : 'all'
                  );
                }}
              />
            </div>
            <button className="flex items-center gap-0.5 px-2.5 py-[5px] bg-white border border-[#EBEBEB] rounded-lg shadow-[0px_1px_4.8px_rgba(0,0,0,0.03)] h-6">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.33333 10.5V3.5M9.33333 3.5L11.6667 5.90625M9.33333 3.5L7 5.90625M4.66667 3.5V10.5M4.66667 10.5L7 8.09375M4.66667 10.5L2.33333 8.09375" stroke="#5F5971" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs text-[#5F5971]">Sort</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#F9F9FB] rounded-lg p-1 gap-1 flex flex-col">
            {/* Table Header */}
            <div className="flex items-center px-6 py-2 text-xs font-medium text-[#2B2834] gap-4 h-[30px]">
              <div className="flex-1 min-w-[266px]">User</div>
              <div className="w-[120px]">Joined</div>
              <div className="w-[120px]">Purchases</div>
              <div className="w-[120px]">Total Spent</div>
              <div className="w-[120px]">Subscriptions</div>
              <div className="w-[120px]">Last Active</div>
              <div className="w-[50px]">Status</div>
              <div className="w-[18px] opacity-0">1</div>
            </div>

            {/* Table Body */}
            <div className="bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
              {users.map((user) => (
                <UserRow 
                  key={user.id} 
                  user={user} 
                  isMenuOpen={openMenuId === user.id}
                  onMenuToggle={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                  onViewDetails={() => handleViewUserDetails(user)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center pl-6 h-[30px]">
              <span className="text-xs text-black/50">Showing 1 to 12 of 200 results</span>
              <div className="flex gap-2">
                <button className="p-[1px] bg-[#F9F9FB] rounded-md opacity-30 shadow-[0px_2px_5.4px_rgba(0,0,0,0.05)] h-[30px] w-[87.5px]">
                  <div className="flex items-center justify-center bg-white rounded-[5px] h-[28px] shadow-[0px_4px_27px_rgba(0,0,0,0.18)]">
                    <span className="text-[13px] font-medium text-[#5F5971] leading-4">Previous</span>
                  </div>
                </button>
                <button className="p-[1px] bg-[#F9F9FB] rounded-md shadow-[0px_2px_5.4px_rgba(0,0,0,0.05)] h-[30px] w-[87.5px]">
                  <div className="flex items-center justify-center bg-white rounded-[5px] h-[28px] shadow-[0px_4px_27px_rgba(0,0,0,0.18)]">
                    <span className="text-[13px] font-medium text-[#5F5971] leading-4">Next</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>

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
      className={`flex items-center justify-center gap-1 px-[9px] py-1 border border-dashed rounded-full h-[22px] transition-colors ${
        active ? 'border-[#5F2EFC]' : 'border-[#EBEBEB] hover:bg-gray-50'
      }`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" fill="none" className={active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
        <path d="M6 3V9M3 6H9" stroke="currentColor" strokeWidth="1.2" className={active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'} />
      </svg>
      <span className={`text-xs font-medium leading-[14px] ${active ? 'text-[#5F2EFC]' : 'text-[#5F5971]'}`}>{label}</span>
    </button>
  );
}

function FilterDropdown({ title, showCalendar, showCurrency, onApply }: { title: string; showCalendar?: boolean; showCurrency?: boolean; onApply: () => void }) {
  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-[#5F2EFC] rounded-2xl flex flex-col justify-center items-start p-3 gap-[10px]"
      style={{
        boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      {/* Title */}
      <span className="text-[12px] font-medium text-[#2B2834] leading-[14px] font-['Neue_Montreal']">
        {title}
      </span>

      {/* Input Fields */}
      <div className="flex flex-col items-start gap-1 w-[161px] h-16">
        {/* From Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px]">
            From
          </span>
          <div className="flex-1 h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-md flex items-center justify-end px-2">
            {showCurrency ? (
              <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal']">₦</span>
            ) : showCalendar ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V2.5C10.5 1.94772 10.0523 1.5 9.5 1.5Z" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 0.5V2.5M4 0.5V2.5M1.5 4.5H10.5" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal']">#</span>
            )}
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px]">
            To
          </span>
          <div className="flex-1 h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-md flex items-center justify-end px-2">
            {showCurrency ? (
              <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal']">₦</span>
            ) : showCalendar ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V2.5C10.5 1.94772 10.0523 1.5 9.5 1.5Z" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 0.5V2.5M4 0.5V2.5M1.5 4.5H10.5" stroke="#5F5971" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal']">#</span>
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
          className="text-[13.5px] font-medium text-[#FFFCF8] leading-4 font-['Neue_Montreal']"
          style={{ textShadow: '0px -1px 6px rgba(0, 0, 0, 0.25)' }}
        >
          Apply
        </span>
      </button>
    </div>
  );
}

function UserRow({ user, isMenuOpen, onMenuToggle, onViewDetails }: { user: any; isMenuOpen: boolean; onMenuToggle: () => void; onViewDetails: () => void }) {
  const statusConfig = {
    active: { 
      bg: '#E7F3EF', 
      color: '#239B73', 
      label: 'Active',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.25 5C1.25 5.49246 1.347 5.98009 1.53545 6.43506C1.72391 6.89003 2.00013 7.30343 2.34835 7.65165C2.69657 7.99987 3.10997 8.27609 3.56494 8.46455C4.01991 8.653 4.50754 8.75 5 8.75C5.49246 8.75 5.98009 8.653 6.43506 8.46455C6.89003 8.27609 7.30343 7.99987 7.65165 7.65165C7.99987 7.30343 8.27609 6.89003 8.46455 6.43506C8.653 5.98009 8.75 5.49246 8.75 5C8.75 4.50754 8.653 4.01991 8.46455 3.56494C8.27609 3.10997 7.99987 2.69657 7.65165 2.34835C7.30343 2.00013 6.89003 1.72391 6.43506 1.53545C5.98009 1.347 5.49246 1.25 5 1.25C4.50754 1.25 4.01991 1.347 3.56494 1.53545C3.10997 1.72391 2.69657 2.00013 2.34835 2.34835C2.00013 2.69657 1.72391 3.10997 1.53545 3.56494C1.347 4.01991 1.25 4.50754 1.25 5Z" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.75 5.00033L4.58333 5.83366L6.25 4.16699" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    pending: { 
      bg: '#FFF3EB', 
      color: '#FB6A00', 
      label: 'Pending',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16667 8.65694C3.80411 8.57433 3.45585 8.43826 3.13333 8.25319M5.83333 1.34277C6.66173 1.53197 7.40135 1.99681 7.9311 2.66119C8.46086 3.32557 8.74935 4.15013 8.74935 4.99986C8.74935 5.84959 8.46086 6.67414 7.9311 7.33852C7.40135 8.0029 6.66173 8.46774 5.83333 8.65694M1.90792 7.12194C1.68087 6.79158 1.50826 6.42695 1.39667 6.04194M1.30167 4.37486C1.36833 3.97902 1.49667 3.60402 1.67667 3.26027L1.74708 3.13319M2.87792 1.90777C3.268 1.63981 3.70528 1.4481 4.16667 1.34277M5 3.33319V4.99986M5 6.66652V6.67069" stroke="#FB6A00" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    inactive: { 
      bg: '#FBECEB', 
      color: '#CD110A', 
      label: 'Inactive',
      icon: (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3.74975V5.41642M5 6.66642H5.00417M4.31792 1.496L0.940416 7.13517C0.870789 7.25575 0.833944 7.39245 0.833545 7.53169C0.833146 7.67092 0.869208 7.80784 0.938143 7.92881C1.00708 8.04978 1.10648 8.1506 1.22647 8.22123C1.34646 8.29187 1.48286 8.32986 1.62208 8.33142H8.37792C8.51708 8.32981 8.6534 8.29182 8.77334 8.22121C8.89327 8.15059 8.99263 8.04983 9.06156 7.92892C9.13048 7.808 9.16656 7.67116 9.16621 7.53199C9.16587 7.39281 9.12911 7.25615 9.05958 7.13559L5.68208 1.49559C5.61102 1.3783 5.51092 1.28131 5.39144 1.214C5.27196 1.14669 5.13714 1.11133 5 1.11133C4.86286 1.11133 4.72804 1.14669 4.60856 1.214C4.48908 1.28131 4.38898 1.3783 4.31792 1.49559V1.496Z" stroke="#CD110A" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
  };

  const status = statusConfig[user.status as keyof typeof statusConfig];

  // Check if this is one of the last 3 rows to position menu upward
  const isLastRows = user.id >= 10;

  return (
    <div className="flex items-center px-6 py-2.5 gap-4 border-b border-[#EBEBEB] last:border-b-0 h-[50px]">
      <div className="flex items-center gap-1.5 flex-1 min-w-[266px]">
        <div className="w-[30px] h-[30px] rounded-full bg-gray-200 flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <span className="text-[13.5px] font-medium text-[#2B2834] leading-4">{user.name}</span>
          <span className="text-xs text-[#5F5971] leading-[14px]">{user.username}</span>
        </div>
      </div>
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4">{user.joined}</div>
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4">{user.purchases}</div>
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4">₦{user.spent.toLocaleString()}</div>
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4">{user.subscriptions}</div>
      <div className="w-[120px] text-xs text-[#5F5971] leading-[14px]">{user.lastActive}</div>
      <div className="w-[50px]">
        <span 
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium leading-3"
          style={{ backgroundColor: status.bg, color: status.color }}
        >
          {status.icon}
          {status.label}
        </span>
      </div>
      <div className="relative w-[18px] h-[18px] flex-shrink-0">
        <button 
          onClick={onMenuToggle}
          className="w-[18px] h-[18px] flex items-center justify-center"
        >
          <MoreVertical className="h-[18px] w-[18px] text-[#5F5971]" />
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
