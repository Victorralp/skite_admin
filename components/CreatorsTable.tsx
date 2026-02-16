'use client';

import { Creator } from '@/data/dashboard';
import { Card } from '@/components/ui/card';
import { MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import ActionMenu from '@/components/ActionMenu';

type CreatorsTableProps = {
  creators: Creator[];
  isLoading: boolean;
  hasError: boolean;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onCreatorClick: (creator: Creator) => void;
  onAction: (action: 'view' | 'message' | 'suspend', creatorId: string) => void;
};

export default function CreatorsTable({
  creators,
  isLoading,
  hasError,
  pagination,
  hasPreviousPage,
  hasNextPage,
  onPreviousPage,
  onNextPage,
  onCreatorClick,
  onAction
}: CreatorsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!openMenuId) return;
      const openMenu = document.getElementById(`menu-container-${openMenuId}`);
      if (openMenu && openMenu.contains(event.target as Node)) {
        return;
      }
      setOpenMenuId(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuId]);

  const start = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const end = pagination.total === 0 ? 0 : Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <Card className="rounded-lg border border-border-primary flex flex-col w-full shadow-none p-1 gap-1 bg-surface-secondary">
      <div className="grid grid-cols-[repeat(7,minmax(0,1fr))_24px] items-center h-table-header shrink-0 px-table-padding-x gap-table-gap">
        <div className="text-caption-lg text-text-primary">Creator</div>
        <div className="text-caption-lg text-text-primary">Revenue</div>
        <div className="text-caption-lg text-text-primary">Products</div>
        <div className="text-caption-lg text-text-primary">Sales Count</div>
        <div className="text-caption-lg text-text-primary">Subscribers</div>
        <div className="text-caption-lg text-text-primary">Hub Views</div>
        <div className="text-caption-lg text-text-primary">Last Active</div>
        <div className="flex justify-end opacity-0">1</div>
      </div>

      <div className="flex flex-col bg-white border border-border-primary rounded-lg">
        {isLoading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            Loading creators...
          </div>
        )}
        {hasError && !isLoading && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            Unable to load creators.
          </div>
        )}
        {!isLoading && !hasError && creators.length === 0 && (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            No creators found
          </div>
        )}
        {!isLoading && !hasError && creators.map((creator) => (
          <div
            key={creator.id}
            className="grid grid-cols-[repeat(7,minmax(0,1fr))_24px] items-center h-table-row bg-white border-b border-border-primary last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer px-table-padding-x gap-table-gap"
            onClick={() => onCreatorClick(creator)}
          >
            <div className="flex items-center gap-1.5 relative min-w-0">
              <div className="relative">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="h-avatar-sm w-avatar-sm rounded-full object-cover"
                />
                {creator.status === 'Active' && (
                  <div className="absolute left-5 -top-0.5 h-status-dot w-status-dot rounded-full bg-green-600 border border-white box-border z-10" />
                )}
                {creator.status === 'Suspended' && (
                  <div className="absolute left-5 -top-0.5 h-status-dot w-status-dot rounded-full bg-orange-500 border border-white box-border z-10" />
                )}
                {creator.status === 'Banned' && (
                  <div className="absolute left-5 -top-0.5 h-status-dot w-status-dot rounded-full bg-red-500 border border-white box-border z-10" />
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-body-sm font-medium text-text-primary leading-4 truncate">
                  {creator.name}
                </span>
                <span className="text-caption-lg text-text-secondary leading-[14px] font-normal truncate">
                  {creator.username}
                </span>
              </div>
            </div>

            <div>
              <span className="text-body-sm font-normal text-text-primary leading-4">
                {creator.revenue}
              </span>
            </div>

            <div>
              <span className="text-body-sm font-normal text-text-primary leading-4">
                {creator.products}
              </span>
            </div>

            <div>
              <span className="text-body-sm font-normal text-text-primary leading-4">
                {creator.salesCount}
              </span>
            </div>

            <div>
              <span className="text-body-sm font-normal text-text-primary leading-4">
                {creator.subscribers.toLocaleString()}
              </span>
            </div>

            <div>
              <span className="text-body-sm font-normal text-text-primary leading-4">
                {creator.hubViews}
              </span>
            </div>

            <div>
              <span className="text-caption-lg font-normal text-text-secondary leading-[14px]">
                {creator.lastActive}
              </span>
            </div>

            <div
              id={`menu-container-${creator.id}`}
              className="flex items-center justify-end relative"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="p-0 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setOpenMenuId(openMenuId === creator.id ? null : creator.id)}
              >
                <MoreVertical className="h-action-button w-action-button text-text-secondary" />
              </button>
              {openMenuId === creator.id && (
                <ActionMenu
                  status={creator.status}
                  onView={() => {
                    onAction('view', creator.id);
                    setOpenMenuId(null);
                  }}
                  onMessage={() => {
                    onAction('message', creator.id);
                    setOpenMenuId(null);
                  }}
                  onSuspend={() => {
                    onAction('suspend', creator.id);
                    setOpenMenuId(null);
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between h-table-header shrink-0 pl-table-padding-x">
        <span className="text-caption-lg text-text-tertiary font-normal leading-[14px]">
          {pagination.total === 0
            ? 'Showing 0 results'
            : `Showing ${start} to ${end} of ${pagination.total} results`}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            className="w-20 h-8 bg-surface-secondary rounded-md shadow-button p-0.5 disabled:opacity-30"
            disabled={!hasPreviousPage}
            onClick={onPreviousPage}
          >
            <div className="w-full h-full bg-white rounded shadow-button-inset flex items-center justify-center px-3">
              <span className="text-caption-md font-medium text-text-secondary">Previous</span>
            </div>
          </button>
          <button
            type="button"
            className="w-20 h-8 bg-surface-secondary rounded-md shadow-button p-0.5 disabled:opacity-30"
            disabled={!hasNextPage}
            onClick={onNextPage}
          >
            <div className="w-full h-full bg-white rounded shadow-button-inset flex items-center justify-center px-3">
              <span className="text-caption-md font-medium text-text-secondary">Next</span>
            </div>
          </button>
        </div>
      </div>
    </Card>
  );
}
