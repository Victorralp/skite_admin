'use client';

import { creatorProducts } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from 'react';
import ProductDetailModal from '@/components/ProductDetailModal';
import type { Product } from '@/data/dashboard';

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Active') {
        return (
            <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#E7F3EF] h-[14px] w-fit">
                <CheckCircle2 className="w-[10px] h-[10px] text-[#239B73]" />
                <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#239B73]">Approved</span>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-[#EBEBEB] h-[14px] w-fit">
            <XCircle className="w-[10px] h-[10px] text-[#2B2834]" />
            <span className="font-['Neue_Montreal'] font-medium text-[10px] leading-[12px] text-[#2B2834]">Inactive</span>
        </div>
    );
};

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);
}

const ActionMenu = ({ onClose, onViewProduct }: { onClose: () => void; onViewProduct: () => void }) => {
    return (
        <div className="absolute right-0 top-full mt-1 w-[119px] bg-white border border-[#EBEBEB] rounded-xl shadow-[0px_116px_46px_rgba(0,0,0,0.01),0px_65px_39px_rgba(0,0,0,0.05),0px_29px_29px_rgba(0,0,0,0.09),0px_7px_16px_rgba(0,0,0,0.1)] z-10">
            <button 
                onClick={() => {
                    onViewProduct();
                    onClose();
                }}
                className="w-full px-4 py-2.5 text-left font-['Neue_Montreal'] font-medium text-[13.5px] text-[#2B2834] hover:bg-gray-50 border-b border-[#EBEBEB]"
            >
                View Product
            </button>
            <button className="w-full px-4 py-2.5 text-left font-['Neue_Montreal'] font-medium text-[13.5px] text-[#CD110A] hover:bg-gray-50">
                Ban Product
            </button>
        </div>
    );
};

export default function ProductsTab() {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <>
            <div className="flex flex-col w-full bg-[#F9F9FB] rounded-b-[36px] p-6 gap-6">
                {/* Title */}
                <h3 className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834]">Active Products</h3>

                {/* Table Container */}
                <div className="w-full bg-[#F9F9FB] rounded-xl p-1 flex flex-col">
                    {/* Header Row */}
                    <div className="flex items-center px-4 py-2 gap-6 h-[32px]">
                        <div className="w-[240px] font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Product</div>
                        <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Type</div>
                        <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Price</div>
                        <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Sales</div>
                        <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Page views</div>
                        <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#5F5971]">Status</div>
                        <div className="w-[18px]"></div>
                    </div>

                    {/* Table Body */}
                    <div className="bg-white border border-[#EBEBEB] rounded-lg overflow-hidden">
                        {/* Rows */}
                        {creatorProducts.map((product, index) => (
                            <div
                                key={product.id}
                                className={cn(
                                    "flex items-center px-4 py-3 gap-6 h-[48px] bg-white",
                                    index !== creatorProducts.length - 1 && "border-b border-[#EBEBEB]"
                                )}
                            >
                                {/* Product */}
                                <div className="w-[240px] flex items-center gap-2">
                                    <img
                                        src={product.thumbnail}
                                        alt={product.name}
                                        className="w-[24px] h-[24px] rounded-[4px] object-cover bg-gray-100"
                                    />
                                    <span className="font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834] truncate flex-1">
                                        {product.name}
                                    </span>
                                </div>

                                {/* Type */}
                                <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                    {product.id.includes('001') || product.id.includes('004') ? 'Course' : 
                                     product.id.includes('002') || product.id.includes('005') ? 'Template' : 'eBook'}
                                </div>

                                {/* Price */}
                                <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                    {formatCurrency(product.price)}
                                </div>

                                {/* Sales */}
                                <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                    {product.sales}
                                </div>

                                {/* Page views */}
                                <div className="flex-1 font-['Neue_Montreal'] font-medium text-[13.5px] leading-[16px] text-[#2B2834]">
                                    {(product.sales * 230).toLocaleString()}
                                </div>

                                {/* Status */}
                                <div className="flex-1">
                                    <StatusBadge status={product.status} />
                                </div>

                                {/* Actions */}
                                <div className="w-[18px] relative">
                                    <button 
                                        onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                                        className="p-0 hover:opacity-70 transition-opacity"
                                    >
                                        <MoreVertical className="w-[18px] h-[18px] text-[#5F5971]" />
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
