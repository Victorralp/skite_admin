'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Base Table Container
interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <Card className={cn(
      "rounded-lg border border-border-primary flex flex-col w-full shadow-none p-1 gap-1 bg-surface-secondary",
      className
    )}>
      {children}
    </Card>
  );
}

// Table Header
interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <div className={cn(
      "flex items-center h-table-header shrink-0 px-table-padding-x gap-table-gap",
      className
    )}>
      {children}
    </div>
  );
}

// Table Body Container
interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <div className={cn(
      "flex flex-col bg-white border border-border-primary rounded-lg",
      className
    )}>
      <div className="">
        {children}
      </div>
    </div>
  );
}

// Table Row
interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  isLast?: boolean;
}

export function TableRow({ children, onClick, className, isLast = false }: TableRowProps) {
  return (
    <div
      className={cn(
        "flex items-center h-table-row bg-white transition-colors px-table-padding-x gap-table-gap",
        !isLast && "border-b border-border-primary",
        onClick && "cursor-pointer hover:bg-gray-50/50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Table Cell
interface TableCellProps {
  children: ReactNode;
  className?: string;
  width?: 'flex' | 'auto' | string;
  minWidth?: string;
}

export function TableCell({ children, className, width = 'auto', minWidth }: TableCellProps) {
  const widthClass = width === 'flex' ? 'flex-1' : width === 'auto' ? '' : width;
  const minWidthStyle = minWidth ? { minWidth } : {};
  
  return (
    <div 
      className={cn(widthClass, className)}
      style={minWidthStyle}
    >
      {children}
    </div>
  );
}

// Table Header Cell
interface TableHeaderCellProps {
  children: ReactNode;
  className?: string;
  width?: 'flex' | 'auto' | string;
  minWidth?: string;
}

export function TableHeaderCell({ children, className, width = 'auto', minWidth }: TableHeaderCellProps) {
  const widthClass = width === 'flex' ? 'flex-1' : width === 'auto' ? '' : width;
  const minWidthStyle = minWidth ? { minWidth } : {};
  
  return (
    <div 
      className={cn("text-caption-lg text-text-primary", widthClass, className)}
      style={minWidthStyle}
    >
      {children}
    </div>
  );
}

// Table Footer (for pagination)
interface TableFooterProps {
  children: ReactNode;
  className?: string;
}

export function TableFooter({ children, className }: TableFooterProps) {
  return (
    <div className={cn(
      "flex items-center justify-between h-table-header shrink-0 pl-table-padding-x",
      className
    )}>
      {children}
    </div>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevious?: () => void;
  onNext?: () => void;
  showingText?: string;
}

export function TablePagination({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPrevious, 
  onNext,
  showingText 
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const hasPrevious = currentPage > 1;
  const hasNext = endItem < totalItems;

  return (
    <>
      <span className="text-caption-lg text-text-tertiary font-normal leading-[14px]">
        {showingText || `Showing ${startItem} to ${endItem} of ${totalItems} results`}
      </span>

      <div className="flex gap-2">
        {/* Previous Button */}
        <div className={cn(
          "w-20 h-8 bg-surface-secondary rounded-md shadow-button p-0.5",
          hasPrevious ? "cursor-pointer hover:opacity-90 transition-opacity" : "opacity-30"
        )}>
          <div 
            className="w-full h-full bg-white rounded shadow-button-inset flex items-center justify-center px-3"
            onClick={hasPrevious ? onPrevious : undefined}
          >
            <span className="text-caption-md font-medium text-text-secondary">Previous</span>
          </div>
        </div>
        
        {/* Next Button */}
        <div className={cn(
          "w-20 h-8 bg-surface-secondary rounded-md shadow-button p-0.5",
          hasNext ? "cursor-pointer hover:opacity-90 transition-opacity" : "opacity-30"
        )}>
          <div 
            className="w-full h-full bg-white rounded shadow-button-inset flex items-center justify-center px-3"
            onClick={hasNext ? onNext : undefined}
          >
            <span className="text-caption-md font-medium text-text-secondary">Next</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Avatar with Status Dot
interface AvatarWithStatusProps {
  src: string;
  alt: string;
  status?: 'Active' | 'Suspended' | 'Banned' | 'Inactive';
  className?: string;
}

export function AvatarWithStatus({ src, alt, status, className }: AvatarWithStatusProps) {
  const statusColors = {
    Active: 'bg-green-600',
    Suspended: 'bg-orange-500', 
    Banned: 'bg-red-500',
    Inactive: 'bg-gray-400'
  };

  return (
    <div className={cn("relative", className)}>
      <img
        src={src}
        alt={alt}
        className="h-avatar-sm w-avatar-sm rounded-full object-cover"
      />
      {status && status !== 'Inactive' && (
        <div className={cn(
          "absolute left-5 -top-0.5 h-status-dot w-status-dot rounded-full border border-white box-border z-10",
          statusColors[status]
        )} />
      )}
    </div>
  );
}

// Action Button for table rows
interface TableActionButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export function TableActionButton({ onClick, children, className }: TableActionButtonProps) {
  return (
    <div className="w-action-button flex items-center justify-center relative">
      <button
        className={cn(
          "p-0 hover:bg-gray-100 rounded-full transition-colors",
          className
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {children}
      </button>
    </div>
  );
}