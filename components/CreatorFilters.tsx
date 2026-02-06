'use client';

import { Search, Plus } from 'lucide-react';

type CreatorFiltersProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: 'all' | 'active' | 'suspended';
    setStatusFilter: (status: 'all' | 'active' | 'suspended') => void;
    onAddCreator: () => void;
};

export default function CreatorFilters({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    onAddCreator
}: CreatorFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            {/* Left: Status Filter */}
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'suspended')}
                className="text-sm border border-border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-shadow"
            >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
            </select>

            {/* Right: Search and Add Button */}
            <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search creators..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 w-full sm:w-[280px] rounded-full border border-border bg-white pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-shadow"
                    />
                </div>
                <button
                    onClick={onAddCreator}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-purple text-white rounded-full text-sm font-medium hover:bg-brand-purple/90 transition-colors whitespace-nowrap"
                >
                    <Plus className="h-4 w-4" />
                    Add Creator
                </button>
            </div>
        </div>
    );
}
