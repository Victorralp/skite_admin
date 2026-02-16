'use client';

import { creatorProducts } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ProductDetailModal from '@/components/ProductDetailModal';
import type { Product } from '@/data/dashboard';
import DataTableShell from '@/components/layout/DataTableShell';

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Active') {
        return (
            <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-surface-success h-[14px] w-fit">
                <CheckCircle2 className="w-[10px] h-[10px] text-text-success" />
                <span className="font-sans text-caption-sm text-text-success">Approved</span>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#EBEBEB] h-[14px] w-fit">
            <XCircle className="w-[10px] h-[10px] text-text-primary" />
            <span className="font-sans text-caption-sm text-text-primary">Inactive</span>
        </div>
    );
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

const ActionMenu = ({ onClose, onViewProduct }: { onClose: () => void; onViewProduct: () => void }) => {
    return (
        <div className="absolute right-0 top-full mt-1 w-[119px] bg-white border border-border-primary rounded-xl shadow-dropdown z-10">
            <button 
                onClick={() => {
                    onViewProduct();
                    onClose();
                }}
                className="w-full px-4 py-2.5 text-left font-sans font-medium text-[13.5px] text-text-primary hover:bg-gray-50 border-b border-border-primary"
            >
                View Product
            </button>
            <button className="w-full px-4 py-2.5 text-left font-sans font-medium text-[13.5px] text-text-danger hover:bg-gray-50">
                Ban Product
            </button>
        </div>
    );
};

export default function ProductsTab() {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
            }
        };

        if (openMenuId) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openMenuId]);

    return (
        <>
            <div className="flex flex-col w-full bg-surface-secondary rounded-b-[36px] p-6 gap-6">
                {/* Title */}
                <h3 className="font-sans text-heading-sm text-text-primary">Active Products</h3>

                {/* Table Container */}
                <div className="w-full rounded-xl bg-surface-secondary p-1">
                    <DataTableShell>
                        <div className="min-w-[900px]">
                            <div className="grid grid-cols-[2.4fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-6 px-4 py-2">
                                <div className="font-sans text-body-sm text-text-secondary">Product</div>
                                <div className="font-sans text-body-sm text-text-secondary">Type</div>
                                <div className="font-sans text-body-sm text-text-secondary">Price</div>
                                <div className="font-sans text-body-sm text-text-secondary">Sales</div>
                                <div className="font-sans text-body-sm text-text-secondary">Page views</div>
                                <div className="font-sans text-body-sm text-text-secondary">Status</div>
                                <div className="w-4" />
                            </div>

                            <div className="overflow-hidden rounded-lg border border-border-primary bg-white">
                                {creatorProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={cn(
                                            "grid grid-cols-[2.4fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-6 bg-white px-4 py-3",
                                            index !== creatorProducts.length - 1 && "border-b border-border-primary"
                                        )}
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.name}
                                                className="h-[24px] w-[24px] rounded-[4px] bg-gray-100 object-cover"
                                            />
                                            <span className="flex-1 truncate font-sans text-body-sm text-text-primary">
                                                {product.name}
                                            </span>
                                        </div>

                                        <div className="font-sans text-body-sm text-text-primary">
                                            {product.id.includes('001') || product.id.includes('004') ? 'Course' :
                                                product.id.includes('002') || product.id.includes('005') ? 'Template' : 'eBook'}
                                        </div>

                                        <div className="font-sans text-body-sm text-text-primary">
                                            {formatCurrency(product.price)}
                                        </div>

                                        <div className="font-sans text-body-sm text-text-primary">
                                            {product.sales}
                                        </div>

                                        <div className="font-sans text-body-sm text-text-primary">
                                            {(product.sales * 230).toLocaleString()}
                                        </div>

                                        <div>
                                            <StatusBadge status={product.status} />
                                        </div>

                                        <div className="relative w-4" ref={openMenuId === product.id ? menuRef : null}>
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                                                className="p-0 transition-opacity hover:opacity-70"
                                            >
                                                <MoreVertical className="h-[18px] w-[18px] text-text-secondary" />
                                            </button>
                                            {openMenuId === product.id && (
                                                <ActionMenu
                                                    onClose={() => setOpenMenuId(null)}
                                                    onViewProduct={() => setSelectedProduct(product)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DataTableShell>
                </div>
            </div>

            {/* Product Detail Modal */}
            {selectedProduct && (
                <ProductDetailModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </>
    );
}
