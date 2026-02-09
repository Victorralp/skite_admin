'use client';

import { useState } from 'react';
import StatsCard from '@/components/StatsCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import ActionMenu from '@/components/ActionMenu';
import { MoreVertical } from 'lucide-react';

export default function ProductsPage() {
  const [creatorFilterActive, setCreatorFilterActive] = useState(false);
  const [statusFilterActive, setStatusFilterActive] = useState(false);
  const [typeFilterActive, setTypeFilterActive] = useState(false);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [revenueFilterActive, setRevenueFilterActive] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { title: 'Total Products', value: '9,813', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Active Products', value: '8,328', trend: '+12 today', trendDirection: 'up' as const },
    { title: 'Inactive', value: '82', trend: '+2 today', trendDirection: 'neutral' as const },
    { title: 'Rejected Products', value: '23', trend: '+1 today', trendDirection: 'down' as const },
  ];

  const products = [
    { id: 1, name: 'Macmillan Publishers', image: '/image.png', status: 'active', creator: { name: 'Temilade Odunsi', username: '@rubyred' }, type: 'eBook', dateCreated: '2 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 2, name: 'McGraw-Hill Education', image: '/image.png', status: 'active', creator: { name: 'Emeka Onwudiwe', username: '@gracewong' }, type: 'eBook', dateCreated: '3 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 3, name: 'Macmillan Publishers', image: '/image.png', status: 'active', creator: { name: 'Blessing Okon', username: '@jadewong' }, type: 'eBook', dateCreated: '5 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 4, name: 'Hachette Livre', image: '/image.png', status: 'active', creator: { name: 'Yahaya Ibrahim', username: '@masongray' }, type: 'eBook', dateCreated: '11 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 5, name: 'HarperCollins', image: '/image.png', status: 'rejected', creator: { name: 'Fatima Musa', username: '@bella' }, type: 'eBook', dateCreated: '14 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 6, name: 'Scholastic Corporation', image: '/image.png', status: 'active', creator: { name: 'Nnamdi Kalu', username: '@oliviajones' }, type: 'eBook', dateCreated: '23 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 7, name: 'HarperCollins', image: '/image.png', status: 'active', creator: { name: 'Iretiola Osho', username: '@ivyjade' }, type: 'eBook', dateCreated: '27 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 8, name: 'Penguin Random House', image: '/image.png', status: 'active', creator: { name: 'Chidi Nwachukwu', username: '@samwise' }, type: 'eBook', dateCreated: '31 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 9, name: 'Thomson Reuters', image: '/image.png', status: 'active', creator: { name: 'Kayode Ajayi', username: '@rileybrown' }, type: 'eBook', dateCreated: '35 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 10, name: 'Bertelsmann', image: '/image.png', status: 'inactive', creator: { name: 'Tolulope Adebayo', username: '@willowgreen' }, type: 'eBook', dateCreated: '46 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 11, name: 'Hachette Livre', image: '/image.png', status: 'inactive', creator: { name: 'Ishaya Tanko', username: '@ellierose' }, type: 'eBook', dateCreated: '49 min ago', price: 12920, sales: 13, revenue: 12920090 },
    { id: 12, name: 'HarperCollins', image: '/image.png', status: 'rejected', creator: { name: 'Yetunde Bakare', username: '@jackwilson' }, type: 'eBook', dateCreated: '53 min ago', price: 12920, sales: 13, revenue: 12920090 },
  ];

  const handleViewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="flex flex-col w-full bg-white px-16 py-6 gap-8">
        {/* Stats Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold text-[#2B2834]">Products</h1>
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
                  label="Creator" 
                  active={creatorFilterActive}
                  onClick={() => {
                    setCreatorFilterActive(!creatorFilterActive);
                    setStatusFilterActive(false);
                    setTypeFilterActive(false);
                    setPriceFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {creatorFilterActive && (
                  <FilterDropdown
                    title="Filter by: Creator"
                    showCalendar={false}
                    onApply={() => setCreatorFilterActive(false)}
                  />
                )}
              </div>

              <div className="relative">
                <FilterPill 
                  label="Status" 
                  active={statusFilterActive}
                  onClick={() => {
                    setStatusFilterActive(!statusFilterActive);
                    setCreatorFilterActive(false);
                    setTypeFilterActive(false);
                    setPriceFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {statusFilterActive && (
                  <FilterDropdown
                    title="Filter by: Status"
                    showCalendar={false}
                    onApply={() => setStatusFilterActive(false)}
                  />
                )}
              </div>

              <div className="relative">
                <FilterPill 
                  label="Type" 
                  active={typeFilterActive}
                  onClick={() => {
                    setTypeFilterActive(!typeFilterActive);
                    setCreatorFilterActive(false);
                    setStatusFilterActive(false);
                    setPriceFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {typeFilterActive && (
                  <FilterDropdown
                    title="Filter by: Type"
                    showCalendar={false}
                    onApply={() => setTypeFilterActive(false)}
                  />
                )}
              </div>

              <div className="relative">
                <FilterPill 
                  label="Price" 
                  active={priceFilterActive}
                  onClick={() => {
                    setPriceFilterActive(!priceFilterActive);
                    setCreatorFilterActive(false);
                    setStatusFilterActive(false);
                    setTypeFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {priceFilterActive && (
                  <FilterDropdown
                    title="Filter by: Price"
                    showCurrency={true}
                    onApply={() => setPriceFilterActive(false)}
                  />
                )}
              </div>

              <div className="relative">
                <FilterPill 
                  label="Revenue" 
                  active={revenueFilterActive}
                  onClick={() => {
                    setRevenueFilterActive(!revenueFilterActive);
                    setCreatorFilterActive(false);
                    setStatusFilterActive(false);
                    setTypeFilterActive(false);
                    setPriceFilterActive(false);
                  }}
                />
                {revenueFilterActive && (
                  <FilterDropdown
                    title="Filter by: Revenue"
                    showCurrency={true}
                    onApply={() => setRevenueFilterActive(false)}
                  />
                )}
              </div>
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
              <div className="flex-1">Product</div>
              <div className="flex-1">Creator</div>
              <div className="w-20">Type</div>
              <div className="w-[102px]">Date Created</div>
              <div className="w-[100px]">Price</div>
              <div className="w-20">Sales</div>
              <div className="w-[120px]">Revenue</div>
              <div className="w-[18px] opacity-0">1</div>
            </div>

            {/* Table Body */}
            <div className="bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
              {products.map((product) => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  isMenuOpen={openMenuId === product.id}
                  onMenuToggle={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                  onViewDetails={() => handleViewProductDetails(product)}
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
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

function ProductRow({ product, isMenuOpen, onMenuToggle, onViewDetails }: { product: any; isMenuOpen: boolean; onMenuToggle: () => void; onViewDetails: () => void }) {
  const statusConfig = {
    active: '#239B73',
    rejected: '#CD110A',
    inactive: '#5F5971',
  };

  const statusColor = statusConfig[product.status as keyof typeof statusConfig];
  const isLastRows = product.id >= 10;

  return (
    <div className={`flex items-center px-6 py-2.5 gap-4 border-b border-[#EBEBEB] last:border-b-0 h-[50px] ${isLastRows ? 'opacity-30' : ''}`}>
      {/* Product */}
      <div className="flex items-center gap-1.5 flex-1 relative">
        <div className="w-[30px] h-[30px] rounded bg-gray-200 flex-shrink-0" />
        <span className="text-[13.5px] font-medium text-[#2B2834] leading-4">{product.name}</span>
        <div
          className="absolute left-[22.6px] top-[-1.38px] w-2.5 h-2.5 rounded-full border border-white"
          style={{ backgroundColor: statusColor }}
        />
      </div>

      {/* Creator */}
      <div className="flex flex-col flex-1">
        <span className="text-[13.5px] font-medium text-[#2B2834] leading-4">{product.creator.name}</span>
        <span className="text-xs text-[#5F5971] leading-[14px]">{product.creator.username}</span>
      </div>

      {/* Type */}
      <div className="w-20 text-[13.5px] text-[#2B2834] leading-4">{product.type}</div>

      {/* Date Created */}
      <div className="w-[102px] text-[13.5px] text-[#2B2834] leading-4">{product.dateCreated}</div>

      {/* Price */}
      <div className="w-[100px] text-[13.5px] text-[#2B2834] leading-4">₦{product.price.toLocaleString()}</div>

      {/* Sales */}
      <div className="w-20 text-[13.5px] text-[#2B2834] leading-4">{product.sales}</div>

      {/* Revenue */}
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4">₦{product.revenue.toLocaleString()}</div>

      {/* Actions */}
      <div className="relative w-[18px] h-[18px] flex-shrink-0">
        <button 
          onClick={onMenuToggle}
          className="w-[18px] h-[18px] flex items-center justify-center"
        >
          <MoreVertical className="h-[18px] w-[18px] text-[#5F5971]" />
        </button>
        
        {isMenuOpen && (
          <ActionMenu
            simpleMode={true}
            option1Label="View Product Details"
            option2Label="Ban Product"
            onOption1={onViewDetails}
            onOption2={() => {
              console.log('Ban product');
              onMenuToggle();
            }}
          />
        )}
      </div>
    </div>
  );
}
