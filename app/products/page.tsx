'use client';

import { useState, useEffect, useRef } from 'react';
import StatsCard from '@/components/StatsCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import ActionMenu from '@/components/ActionMenu';
import { MoreVertical } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Product } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import {
  getAdminProductMetrics,
  getAdminProductListing,
  type AdminProductMetricsResponse,
  type AdminProductListingItem,
  type AdminProductListingParams
} from '@/lib/api';

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

type ProductMetricCard = {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
};

export default function ProductsPage() {
  const [creatorFilterActive, setCreatorFilterActive] = useState(false);
  const [statusFilterActive, setStatusFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [typeFilterActive, setTypeFilterActive] = useState(false);
  const [priceFilterActive, setPriceFilterActive] = useState(false);
  const [revenueFilterActive, setRevenueFilterActive] = useState(false);
  const [creatorFilterValue, setCreatorFilterValue] = useState('');
  const [typeFilterValue, setTypeFilterValue] = useState('');
  const [priceMinValue, setPriceMinValue] = useState('');
  const [priceMaxValue, setPriceMaxValue] = useState('');
  const [revenueMinValue, setRevenueMinValue] = useState('');
  const [revenueMaxValue, setRevenueMaxValue] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [metricCards, setMetricCards] = useState<ProductMetricCard[]>([]);
  const [isMetricsLoading, setIsMetricsLoading] = useState(true);
  const [hasMetricsError, setHasMetricsError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [hasProductsError, setHasProductsError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const creatorFilterRef = useRef<HTMLDivElement>(null);
  const statusFilterRef = useRef<HTMLDivElement>(null);
  const typeFilterRef = useRef<HTMLDivElement>(null);
  const priceFilterRef = useRef<HTMLDivElement>(null);
  const revenueFilterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (creatorFilterRef.current && !creatorFilterRef.current.contains(event.target as Node)) {
        setCreatorFilterActive(false);
      }
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setStatusFilterActive(false);
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

  useEffect(() => {
    let isMounted = true;

    const formatCount = (value: number) =>
      new Intl.NumberFormat('en-NG').format(Number.isFinite(value) ? value : 0);

    const formatDelta = (value: number, suffix: string) => {
      const numericValue = Number.isFinite(value) ? value : 0;
      const prefix = numericValue > 0 ? '+' : '';
      return `${prefix}${numericValue}${suffix}`;
    };

    const resolveDirection = (value: number): 'up' | 'down' | 'neutral' => {
      if (value > 0) return 'up';
      if (value < 0) return 'down';
      return 'neutral';
    };

    const mapMetrics = (data: AdminProductMetricsResponse): ProductMetricCard[] => {
      const totalChange = Number(data.totalProductsPercentageChange ?? 0);

      return [
        {
          title: 'Total Products',
          value: formatCount(data.totalProducts),
          trend: `${totalChange >= 0 ? '+' : ''}${totalChange.toFixed(2)}% from last month`,
          trendDirection: resolveDirection(totalChange)
        },
        {
          title: 'Active Products',
          value: formatCount(data.activeProducts),
          trend: formatDelta(data.activeToday, ' today'),
          trendDirection: resolveDirection(data.activeToday)
        },
        {
          title: 'Inactive',
          value: formatCount(data.inactiveProducts),
          trend: formatDelta(data.inactiveToday, ' today'),
          trendDirection: resolveDirection(data.inactiveToday)
        },
        {
          title: 'Rejected Products',
          value: formatCount(data.rejectedProducts),
          trend: formatDelta(data.rejectedToday, ' today'),
          trendDirection: resolveDirection(data.rejectedToday)
        }
      ];
    };

    const fetchMetrics = async () => {
      try {
        const response = await getAdminProductMetrics();
        if (!isMounted) return;
        setMetricCards(mapMetrics(response));
        setHasMetricsError(false);
      } catch {
        if (!isMounted) return;
        setMetricCards([]);
        setHasMetricsError(true);
      } finally {
        if (isMounted) {
          setIsMetricsLoading(false);
        }
      }
    };

    fetchMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const parseOptionalNumber = (value: string) => {
      const trimmed = value.trim();
      if (trimmed.length === 0) return undefined;
      const parsed = Number(trimmed);
      return Number.isFinite(parsed) ? parsed : undefined;
    };

    const mapListingToProduct = (item: AdminProductListingItem): Product => {
      const listingItem = item as AdminProductListingItem & {
        id?: string;
        product_id?: string;
      };

      const normalizePossibleId = (value: unknown): string | null => {
        if (!value) return null;
        if (typeof value === 'string') return value;
        if (typeof value === 'object') {
          const obj = value as Record<string, unknown>;
          return (
            normalizePossibleId(obj._id) ??
            normalizePossibleId(obj.id) ??
            normalizePossibleId(obj.productId) ??
            normalizePossibleId(obj.product_id) ??
            normalizePossibleId(obj.$oid)
          );
        }
        return null;
      };

      const resolvedId =
        normalizePossibleId(item._id) ??
        normalizePossibleId(item.productId) ??
        normalizePossibleId(item.product_id) ??
        normalizePossibleId(listingItem.id);

      const normalizedStatus = (() => {
        const status = (item.status ?? '').toUpperCase();
        if (status === 'PUBLISHED') return 'active';
        if (status === 'BANNED') return 'rejected';
        if (status === 'DRAFT' || status === 'ARCHIVED') return 'inactive';
        return 'inactive';
      })();

      const itemRecord = item as Record<string, unknown>;
      const productName =
        (itemRecord.productName as string | undefined) ??
        (itemRecord.product_name as string | undefined) ??
        'Untitled product';
      const productCover =
        (itemRecord.productCover as string | undefined) ??
        (itemRecord.product_cover as string | undefined) ??
        '/placeholder.png';
      const productType =
        (itemRecord.productType as string | undefined) ??
        (itemRecord.product_category as string | undefined) ??
        'Product';
      const createdAtRaw =
        (itemRecord.createdAt as string | undefined) ??
        (itemRecord.created_at as string | undefined) ??
        '';
      const creatorName =
        (itemRecord.creatorName as string | undefined) ??
        (itemRecord.creator_name as string | undefined) ??
        'Unknown Creator';
      const creatorHandle =
        (itemRecord.hubName as string | undefined) ??
        (itemRecord.hub_name as string | undefined) ??
        '';
      const priceValue =
        typeof itemRecord.price === 'number'
          ? itemRecord.price
          : typeof itemRecord.product_price === 'number'
            ? itemRecord.product_price
            : 0;
      const salesValue = typeof itemRecord.sales === 'number' ? itemRecord.sales : 0;
      const revenueValue = typeof itemRecord.revenue === 'number' ? itemRecord.revenue : 0;

      return {
        ...itemRecord,
        detailId: resolvedId ?? null,
        id: resolvedId ?? `${item.productName}-${item.createdAt}`,
        name: productName,
        thumbnail: productCover,
        price: priceValue,
        sales: salesValue,
        revenue: revenueValue,
        status: normalizedStatus as Product['status'],
        dateCreated: createdAtRaw ? new Date(createdAtRaw).toLocaleDateString('en-NG') : '—',
        creatorId: '',
        type: productType,
        creator: {
          name: creatorName,
          username: creatorHandle
        }
      };
    };

    const fetchProducts = async () => {
      setIsProductsLoading(true);
      try {
        const params: AdminProductListingParams = {
          status: statusFilter === 'all' ? undefined : (statusFilter as AdminProductListingParams['status']),
          hubOwnerName: creatorFilterValue.trim() || undefined,
          productType: typeFilterValue.trim() || undefined,
          minPrice: parseOptionalNumber(priceMinValue),
          maxPrice: parseOptionalNumber(priceMaxValue),
          minRevenue: parseOptionalNumber(revenueMinValue),
          maxRevenue: parseOptionalNumber(revenueMaxValue),
          page: 1,
          limit: 50
        };
        const response = await getAdminProductListing({
          ...params
        });
        if (!isMounted) return;
        const nextStatuses = response
          .map((entry) => String((entry.status ?? '')).trim())
          .filter((entry) => entry.length > 0);
        setStatusOptions((previous) =>
          Array.from(new Set([...previous, ...nextStatuses])).sort((a, b) =>
            a.localeCompare(b)
          )
        );
        setProducts(response.map(mapListingToProduct));
        setHasProductsError(false);
      } catch {
        if (!isMounted) return;
        setProducts([]);
        setHasProductsError(true);
      } finally {
        if (isMounted) {
          setIsProductsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [
    statusFilter,
    creatorFilterValue,
    typeFilterValue,
    priceMinValue,
    priceMaxValue,
    revenueMinValue,
    revenueMaxValue
  ]);

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
          <div className="flex items-center justify-between">
            <h1 className="text-[20px] font-bold text-text-primary leading-[100%] tracking-[-0.01em] font-sans">Products</h1>
            {(isMetricsLoading || hasMetricsError) && (
              <span className="text-caption-sm text-text-secondary">
                {isMetricsLoading ? 'Loading product metrics…' : 'Metrics unavailable'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
            {metricCards.map((card) => (
              <StatsCard
                key={card.title}
                title={card.title}
                value={card.value}
                trend={card.trend}
                trendDirection={card.trendDirection}
              />
            ))}
            {!isMetricsLoading && metricCards.length === 0 && (
              <div className="text-caption-sm text-text-secondary px-2 py-3">
                No product metrics to display.
              </div>
            )}
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
                  active={creatorFilterActive || creatorFilterValue.trim().length > 0}
                  onClick={() => {
                    setCreatorFilterActive(!creatorFilterActive);
                    setTypeFilterActive(false);
                    setPriceFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {creatorFilterActive && (
                  <TextFilterDropdown
                    title="Filter by: Creator"
                    value={creatorFilterValue}
                    placeholder="Hub owner name"
                    onChange={setCreatorFilterValue}
                    onApply={() => setCreatorFilterActive(false)}
                    onClear={() => {
                      setCreatorFilterValue('');
                      setCreatorFilterActive(false);
                    }}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={statusFilterRef}>
                <FilterPill
                  label={
                    statusFilter === 'all'
                      ? 'Status'
                      : statusFilter
                          .toLowerCase()
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (char) => char.toUpperCase())
                  }
                  active={statusFilterActive || statusFilter !== 'all'}
                  onClick={() => {
                    setStatusFilterActive(!statusFilterActive);
                    setCreatorFilterActive(false);
                    setTypeFilterActive(false);
                    setPriceFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {statusFilterActive && (
                  <StatusFilterDropdown
                    options={statusOptions}
                    selected={statusFilter}
                    onSelect={(value) => {
                      setStatusFilter(value);
                      setStatusFilterActive(false);
                    }}
                    onClear={() => {
                      setStatusFilter('all');
                      setStatusFilterActive(false);
                    }}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={typeFilterRef}>
                <FilterPill
                  label="Type"
                  active={typeFilterActive || typeFilterValue.trim().length > 0}
                  onClick={() => {
                    setTypeFilterActive(!typeFilterActive);
                    setCreatorFilterActive(false);
                    setPriceFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {typeFilterActive && (
                  <TextFilterDropdown
                    title="Filter by: Type"
                    value={typeFilterValue}
                    placeholder="COURSE, DIGITAL_PRODUCT..."
                    onChange={setTypeFilterValue}
                    onApply={() => setTypeFilterActive(false)}
                    onClear={() => {
                      setTypeFilterValue('');
                      setTypeFilterActive(false);
                    }}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={priceFilterRef}>
                <FilterPill
                  label="Price"
                  active={
                    priceFilterActive ||
                    priceMinValue.trim().length > 0 ||
                    priceMaxValue.trim().length > 0
                  }
                  onClick={() => {
                    setPriceFilterActive(!priceFilterActive);
                    setCreatorFilterActive(false);
                    setTypeFilterActive(false);
                    setRevenueFilterActive(false);
                  }}
                />
                {priceFilterActive && (
                  <RangeFilterDropdown
                    title="Filter by: Price"
                    fromValue={priceMinValue}
                    toValue={priceMaxValue}
                    onFromChange={setPriceMinValue}
                    onToChange={setPriceMaxValue}
                    showCurrency={true}
                    onApply={() => setPriceFilterActive(false)}
                    onClear={() => {
                      setPriceMinValue('');
                      setPriceMaxValue('');
                      setPriceFilterActive(false);
                    }}
                  />
                )}
              </div>

              <div className="relative overflow-visible" ref={revenueFilterRef}>
                <FilterPill
                  label="Revenue"
                  active={
                    revenueFilterActive ||
                    revenueMinValue.trim().length > 0 ||
                    revenueMaxValue.trim().length > 0
                  }
                  onClick={() => {
                    setRevenueFilterActive(!revenueFilterActive);
                    setCreatorFilterActive(false);
                    setTypeFilterActive(false);
                    setPriceFilterActive(false);
                  }}
                />
                {revenueFilterActive && (
                  <RangeFilterDropdown
                    title="Filter by: Revenue"
                    fromValue={revenueMinValue}
                    toValue={revenueMaxValue}
                    onFromChange={setRevenueMinValue}
                    onToChange={setRevenueMaxValue}
                    showCurrency={true}
                    onApply={() => setRevenueFilterActive(false)}
                    onClear={() => {
                      setRevenueMinValue('');
                      setRevenueMaxValue('');
                      setRevenueFilterActive(false);
                    }}
                  />
                )}
              </div>
            </div>
            <button className="flex items-center gap-[2px] pl-[7px] pr-[10px] py-[5px] h-[24px] bg-white border border-border-primary rounded-lg shadow-button-soft hover:bg-gray-50 transition-colors box-border">
              <SlidersHorizontalIcon className="h-[14px] w-[14px] text-text-secondary" />
              <span className="text-[12px] font-normal text-text-secondary leading-[14px] font-sans">Sort</span>
            </button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border-primary flex flex-col w-full shadow-none p-1 gap-1" style={{ backgroundColor: '#F9F9FB' }}>
            {/* Table Header */}
            <div className="flex items-center h-[30px] shrink-0" style={{ padding: '8px 24px', gap: '16px' }}>
              <div className="w-[240px] text-xs font-medium text-text-primary font-sans leading-[14px]">Product</div>
              <div className="w-[180px] text-xs font-medium text-text-primary font-sans leading-[14px]">Creator</div>
              <div className="w-[120px] text-xs font-medium text-text-primary font-sans leading-[14px]">Type</div>
              <div className="w-[120px] text-xs font-medium text-text-primary font-sans leading-[14px]">Date Created</div>
              <div className="w-[100px] text-xs font-medium text-text-primary font-sans leading-[14px]">Price</div>
              <div className="w-[80px] text-xs font-medium text-text-primary font-sans leading-[14px]">Sales</div>
              <div className="w-[120px] text-xs font-medium text-text-primary font-sans leading-[14px]">Revenue</div>
              <div className="w-[18px] ml-auto opacity-0">•</div>
            </div>

            {/* Table Body */}
            <div className="bg-white border border-border-primary rounded-lg overflow-visible">
              {isProductsLoading && (
                <div className="p-4 text-caption-sm text-text-secondary">Loading products…</div>
              )}
              {hasProductsError && !isProductsLoading && (
                <div className="p-4 text-caption-sm text-text-secondary">Unable to load products.</div>
              )}
              {!isProductsLoading && !hasProductsError && products.length === 0 && (
                <div className="p-4 text-caption-sm text-text-secondary">No products found.</div>
              )}
              {!isProductsLoading && !hasProductsError && products.map((product) => (
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
                <button className="p-[1px] bg-surface-secondary rounded-md opacity-30 shadow-segmented-outer h-[30px] w-[87.5px]">
                  <div className="flex items-center justify-center bg-white rounded-[5px] h-[28px] shadow-segmented-inner">
                    <span className="text-[13px] font-medium text-text-secondary leading-4">Previous</span>
                  </div>
                </button>
                <button className="p-[1px] bg-surface-secondary rounded-md shadow-segmented-outer h-[30px] w-[87.5px]">
                  <div className="flex items-center justify-center bg-white rounded-[5px] h-[28px] shadow-segmented-inner">
                    <span className="text-[13px] font-medium text-text-secondary leading-4">Next</span>
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
        "flex items-center gap-1.5 pl-2.5 pr-3 h-5 rounded-full border border-dashed transition-colors box-border",
        active ? "border-border-brand" : "border-border-primary hover:bg-gray-50"
      )}
    >
      <FilterPlusIcon className={cn("w-2.5 h-2.5", active ? "text-text-brand" : "text-text-secondary")} />
      <span className={cn("text-[11px] leading-[13px] font-sans", active ? "text-text-brand" : "text-text-secondary")}>{label}</span>
    </button>
  );
}

function TextFilterDropdown({
  title,
  value,
  placeholder,
  onChange,
  onApply,
  onClear
}: {
  title: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[220px] bg-white border border-border-brand rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px]"
      style={{
        boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      {/* Title */}
      <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
        {title}
      </span>

      <div className="w-full h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center px-2 overflow-hidden">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none"
          placeholder={placeholder}
        />
      </div>

      <div className="w-full flex items-center gap-2">
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
}

function RangeFilterDropdown({
  title,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  showCurrency,
  onApply,
  onClear
}: {
  title: string;
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  showCurrency?: boolean;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[185px] h-[154px] bg-white border border-border-brand rounded-[16px] flex flex-col justify-center items-start p-3 gap-[10px]"
      style={{
        boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      <span className="text-[12px] font-medium text-text-primary leading-[14px] font-sans">
        {title}
      </span>

      <div className="flex flex-col items-start gap-1 w-[161px] h-16">
        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            From
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type="number"
              value={fromValue}
              onChange={(e) => onFromChange(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
              placeholder=""
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">₦</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-[10px] w-[161px] h-[30px]">
          <span className="text-[12px] font-normal text-text-primary leading-[14px] font-sans w-[32.91px] shrink-0">
            To
          </span>
          <div className="w-[118px] h-[30px] bg-surface-secondary border border-border-primary rounded-[6px] flex items-center justify-end px-2 gap-[10px] overflow-hidden">
            <input
              type="number"
              value={toValue}
              onChange={(e) => onToChange(e.target.value)}
              className="w-full bg-transparent text-[12px] font-medium text-text-primary leading-[14px] font-sans outline-none border-none text-right"
              placeholder=""
            />
            {showCurrency && (
              <span className="text-[12px] font-medium text-text-secondary leading-[14px] font-sans shrink-0">₦</span>
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
}

function StatusFilterDropdown({
  options,
  selected,
  onSelect,
  onClear
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClear: () => void;
}) {
  const normalizedOptions = options.length > 0 ? options : ['PUBLISHED', 'DRAFT', 'ARCHIVED', 'BANNED'];
  const formatLabel = (value: string) =>
    value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div
      className="absolute left-[-0.75px] top-[27px] w-[180px] bg-white border border-border-brand rounded-[16px] flex flex-col items-start p-2 gap-1"
      style={{
        boxShadow: '0px 116px 46px rgba(0, 0, 0, 0.01), 0px 65px 39px rgba(0, 0, 0, 0.05), 0px 29px 29px rgba(0, 0, 0, 0.09), 0px 7px 16px rgba(0, 0, 0, 0.1)',
        zIndex: 50
      }}
    >
      <button
        type="button"
        onClick={() => onSelect('all')}
        className={cn(
          "w-full h-8 px-2 rounded-md text-left text-[12px] leading-[14px] font-sans",
          selected === 'all' ? "text-text-brand bg-surface-secondary" : "text-text-secondary hover:bg-surface-secondary"
        )}
      >
        All
      </button>
      {normalizedOptions.map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onSelect(status)}
          className={cn(
            "w-full h-8 px-2 rounded-md text-left text-[12px] leading-[14px] font-sans",
            selected === status ? "text-text-brand bg-surface-secondary" : "text-text-secondary hover:bg-surface-secondary"
          )}
        >
          {formatLabel(status)}
        </button>
      ))}
      <div className="w-full pt-1">
        <button
          type="button"
          onClick={onClear}
          className="w-full h-8 rounded-[9px] border border-border-primary bg-white text-[13px] font-medium text-text-secondary leading-4 font-sans"
        >
          Clear
        </button>
      </div>
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
    <div className="flex items-center h-[50px] bg-white border-b border-border-primary last:border-0" style={{ padding: '10px 24px', gap: '16px' }}>
      {/* Product */}
      <div className="flex items-center gap-1.5 w-[240px] relative">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-[30px] h-[30px] rounded object-cover flex-shrink-0 bg-gray-100"
          />
        ) : (
          <div className="w-[30px] h-[30px] rounded bg-gray-200 flex-shrink-0" />
        )}
        <span className="text-[13.5px] font-medium text-text-primary leading-4 truncate">{product.name}</span>
        <div
          className="absolute left-[22.6px] top-[-1.38px] w-2.5 h-2.5 rounded-full border border-white"
          style={{ backgroundColor: statusColor }}
        />
      </div>

      {/* Creator */}
      <div className="flex flex-col w-[180px]">
        <span className="text-[13.5px] font-medium text-text-primary leading-4 truncate">{product.creator?.name ?? '—'}</span>
        <span className="text-xs text-text-secondary leading-[14px] truncate">{product.creator?.username ?? ''}</span>
      </div>

      {/* Type */}
      <div className="w-[120px] text-[13.5px] text-text-primary leading-4 truncate">{product.type}</div>

      {/* Date Created */}
      <div className="w-[120px] text-[13.5px] text-text-primary leading-4">{product.dateCreated}</div>

      {/* Price */}
      <div className="w-[100px] text-[13.5px] text-text-primary leading-4">₦{product.price.toLocaleString()}</div>

      {/* Sales */}
      <div className="w-[80px] text-[13.5px] text-text-primary leading-4">{product.sales}</div>

      {/* Revenue */}
      <div className="w-[120px] text-[13.5px] text-text-primary leading-4">₦{product.revenue.toLocaleString()}</div>

      {/* Actions */}
      <div className="relative w-[18px] h-[18px] flex-shrink-0 ml-auto" ref={isMenuOpen ? menuRef : null}>
        <button
          onClick={onMenuToggle}
          aria-label={`Open actions for ${product.name}`}
          className="w-[18px] h-[18px] flex items-center justify-center"
        >
          <MoreVertical className="h-[18px] w-[18px] text-text-secondary" />
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
