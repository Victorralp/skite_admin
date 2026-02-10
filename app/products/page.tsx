'use client';

import { useState, useEffect, useRef } from 'react';
import StatsCard from '@/components/StatsCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import ActionMenu from '@/components/ActionMenu';
import { MoreVertical } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { allProducts, Product } from '@/data/dashboard';
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

export default function ProductsPage() {
  const [creatorFilterActive, setCreatorFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'rejected' | 'inactive'>('all');
  const [typeFilterActive, setTypeFilterActive] = useState(false);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [revenueFilterActive, setRevenueFilterActive] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const creatorFilterRef = useRef<HTMLDivElement>(null);
  const typeFilterRef = useRef<HTMLDivElement>(null);
  const priceFilterRef = useRef<HTMLDivElement>(null);
  const revenueFilterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (creatorFilterRef.current && !creatorFilterRef.current.contains(event.target as Node)) {
        setCreatorFilterActive(false);
      }
      if (typeFilterRef.current && !typeFilterRef.current.contains(event.target as Node)) {
        setTypeFilterActive(false);
      }
      if (priceFilterRef.current && !priceFilterRef.current.contains(event.target as Node)) {
        setPriceFilterActive(false);
      }
      if (revenueFilterRef.current && !revenueFilterRef.current.contains(event.target as Node)) {
        setRevenueFilterActive(false);
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
    { title: 'Total Products', value: '9,813', trend: '+12.3% from last month', trendDirection: 'up' as const },
    { title: 'Active Products', value: '8,328', trend: '+12 today', trendDirection: 'up' as const },
    { title: 'Inactive', value: '82', trend: '+2 today', trendDirection: 'neutral' as const },
    { title: 'Rejected Products', value: '23', trend: '+1 today', trendDirection: 'down' as const },
  ];

  // Use centralized product data
  const products = allProducts;

  const filteredProducts = statusFilter === 'all'
    ? products
    : products.filter((product) => product.status === statusFilter);

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setOpenMenuId(null);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <PageContainer>
        {/* Stats Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[20px] font-bold text-[#2B2834] leading-[100%] tracking-[-0.01em] font-['Neue_Montreal']">Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
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
              <div className="relative overflow-visible" ref={creatorFilterRef}>
                <FilterPill
                  label="Creator"
                  active={creatorFilterActive}
                  onClick={() => {
                    setCreatorFilterActive(!creatorFilterActive);
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

              {/* Status Filter - Toggle Button */}
              <button
                onClick={() => setStatusFilter(
                  statusFilter === 'all' ? 'active' :
                    statusFilter === 'active' ? 'rejected' :
                      statusFilter === 'rejected' ? 'inactive' :
                        'all'
                )}
                className={cn(
                  "flex items-center gap-[4px] pl-[7px] pr-[9px] py-[4px] h-[22px] rounded-full border border-dashed transition-colors box-border",
                  statusFilter !== 'all' ? "border-[#5F2EFC]" : "border-[#EBEBEB] hover:bg-gray-50"
                )}
              >
                <FilterPlusIcon className={cn(statusFilter !== 'all' ? "text-[#5F2EFC]" : "text-[#5F5971]")} />
                <span className={cn("text-[12px] font-medium leading-[14px] font-['Neue_Montreal']", statusFilter !== 'all' ? "text-[#5F2EFC]" : "text-[#5F5971]")}>
                  {statusFilter === 'all' ? 'Status' :
                    statusFilter === 'active' ? 'Active' :
                      statusFilter === 'rejected' ? 'Rejected' :
                        'Inactive'}
                </span>
              </button>

              <div className="relative overflow-visible" ref={typeFilterRef}>
                <FilterPill
                  label="Type"
                  active={typeFilterActive}
                  onClick={() => {
                    setTypeFilterActive(!typeFilterActive);
                    setCreatorFilterActive(false);
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

              <div className="relative overflow-visible" ref={priceFilterRef}>
                <FilterPill
                  label="Price"
                  active={priceFilterActive}
                  onClick={() => {
                    setPriceFilterActive(!priceFilterActive);
                    setCreatorFilterActive(false);
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

              <div className="relative overflow-visible" ref={revenueFilterRef}>
                <FilterPill
                  label="Revenue"
                  active={revenueFilterActive}
                  onClick={() => {
                    setRevenueFilterActive(!revenueFilterActive);
                    setCreatorFilterActive(false);
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
            <button className="flex items-center gap-[2px] pl-[7px] pr-[10px] py-[5px] h-[24px] bg-white border border-[#EBEBEB] rounded-lg shadow-[0px_1px_4.8px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors box-border">
              <SlidersHorizontalIcon className="h-[14px] w-[14px] text-[#5F5971]" />
              <span className="text-[12px] font-normal text-[#5F5971] leading-[14px] font-['Neue_Montreal']">Sort</span>
            </button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-[#EBEBEB] flex flex-col w-full shadow-none p-1 gap-1" style={{ backgroundColor: '#F9F9FB' }}>
            {/* Table Header */}
            <div className="flex items-center h-[30px] shrink-0" style={{ padding: '8px 24px', gap: '16px' }}>
              <div className="w-[240px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Product</div>
              <div className="w-[180px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Creator</div>
              <div className="w-[120px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Type</div>
              <div className="w-[120px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Date Created</div>
              <div className="w-[100px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Price</div>
              <div className="w-[80px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Sales</div>
              <div className="w-[120px] text-xs font-medium text-[#2B2834] font-['Neue_Montreal'] leading-[14px]">Revenue</div>
              <div className="flex-1 min-w-[18px] flex justify-end opacity-0">•</div>
            </div>

            {/* Table Body */}
            <div className="bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
              {filteredProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isMenuOpen={openMenuId === product.id}
                  onMenuToggle={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                  onViewDetails={() => handleViewProductDetails(product)}
                  menuRef={openMenuId === product.id ? menuRef : null}
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
      </PageContainer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}

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
        active ? "border-[#5F2EFC]" : "border-[#EBEBEB] hover:bg-gray-50"
      )}
    >
      <FilterPlusIcon className={cn(active ? "text-[#5F2EFC]" : "text-[#5F5971]")} />
      <span className={cn("text-[12px] font-medium leading-[14px] font-['Neue_Montreal']", active ? "text-[#5F2EFC]" : "text-[#5F5971]")}>{label}</span>
    </button>
  );
}

function FilterDropdown({ title, showCalendar, showCurrency, onApply }: { title: string; showCalendar?: boolean; showCurrency?: boolean; onApply: () => void }) {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-[#5F2EFC] rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px]"
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
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px] shrink-0">
            From
          </span>
          <div className="w-[118px] h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type={showCalendar ? "date" : "number"}
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-[#2B2834] leading-[14px] font-['Neue_Montreal'] outline-none border-none text-right"
              placeholder=""
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal'] shrink-0">₦</span>
            )}
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-[#2B2834] leading-[14px] font-['Neue_Montreal'] w-[32.91px] shrink-0">
            To
          </span>
          <div className="w-[118px] h-[30px] bg-[#F9F9FB] border border-[#EBEBEB] rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type={showCalendar ? "date" : "number"}
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-[#2B2834] leading-[14px] font-['Neue_Montreal'] outline-none border-none text-right"
              placeholder=""
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-[#5F5971] leading-[14px] font-['Neue_Montreal'] shrink-0">₦</span>
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

function ProductRow({ product, isMenuOpen, onMenuToggle, onViewDetails, menuRef }: { product: Product; isMenuOpen: boolean; onMenuToggle: () => void; onViewDetails: () => void; menuRef: React.RefObject<HTMLDivElement> | null }) {
  const statusConfig = {
    active: '#239B73',
    rejected: '#CD110A',
    inactive: '#5F5971',
  };

  const statusColor = statusConfig[product.status as keyof typeof statusConfig] || '#5F5971';
  return (
    <div className="flex items-center h-[50px] bg-white border-b border-[#EBEBEB] last:border-0" style={{ padding: '10px 24px', gap: '16px' }}>
      {/* Product */}
      <div className="flex items-center gap-1.5 w-[240px] relative">
        <div className="w-[30px] h-[30px] rounded bg-gray-200 flex-shrink-0" />
        <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 truncate">{product.name}</span>
        <div
          className="absolute left-[22.6px] top-[-1.38px] w-2.5 h-2.5 rounded-full border border-white"
          style={{ backgroundColor: statusColor }}
        />
      </div>

      {/* Creator */}
      <div className="flex flex-col w-[180px]">
        <span className="text-[13.5px] font-medium text-[#2B2834] leading-4 truncate">{product.creator?.name ?? '—'}</span>
        <span className="text-xs text-[#5F5971] leading-[14px] truncate">{product.creator?.username ?? ''}</span>
      </div>

      {/* Type */}
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4 truncate">{product.type}</div>

      {/* Date Created */}
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4">{product.dateCreated}</div>

      {/* Price */}
      <div className="w-[100px] text-[13.5px] text-[#2B2834] leading-4">₦{product.price.toLocaleString()}</div>

      {/* Sales */}
      <div className="w-[80px] text-[13.5px] text-[#2B2834] leading-4">{product.sales}</div>

      {/* Revenue */}
      <div className="w-[120px] text-[13.5px] text-[#2B2834] leading-4">₦{product.revenue.toLocaleString()}</div>

      {/* Actions */}
      <div className="flex-1 min-w-[18px] flex justify-end items-center" ref={isMenuOpen ? menuRef : null}>
        <button
          onClick={onMenuToggle}
          aria-label={`Open actions for ${product.name}`}
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
              onMenuToggle();
            }}
          />
        )}
      </div>
    </div>
  );
}
