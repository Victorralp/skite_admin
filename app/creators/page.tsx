'use client';

import { useState, useMemo } from 'react';
import { allCreators, Creator } from '@/data/dashboard';
import Sidebar from '@/components/Sidebar';
import CreatorFilters from '@/components/CreatorFilters';
import CreatorsTable from '@/components/CreatorsTable';
import CreatorDetailModal from '@/components/CreatorDetailModal';
import { SearchBar } from '@/components/ui/SearchBar';

export default function CreatorsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
    const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter creators based on search and status
    const filteredCreators = useMemo(() => {
        return allCreators.filter((creator) => {
            // Status filter
            if (statusFilter === 'active' && creator.status !== 'Active') return false;
            if (statusFilter === 'suspended' && creator.status !== 'Suspended') return false;

            // Search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                return (
                    creator.name.toLowerCase().includes(query) ||
                    creator.username.toLowerCase().includes(query) ||
                    creator.email.toLowerCase().includes(query)
                );
            }

            return true;
        });
    }, [searchQuery, statusFilter]);

    const handleCreatorClick = (creator: Creator) => {
        setSelectedCreator(creator);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedCreator(null), 300);
    };

    const handleAction = (action: 'view' | 'message' | 'suspend', creatorId: string) => {
        const creator = allCreators.find((c) => c.id === creatorId);

        if (action === 'view' && creator) {
            setSelectedCreator(creator);
            setIsModalOpen(true);
        } else if (action === 'message') {
            // TODO: Implement message functionality
            console.log('Send message to creator:', creatorId);
        } else if (action === 'suspend') {
            // TODO: Implement suspend/unsuspend functionality
            console.log('Toggle suspend for creator:', creatorId);
        }
    };

    const handleSendMessage = (creatorId: string) => {
        // TODO: Implement send message functionality
        console.log('Send message to:', creatorId);
        setIsModalOpen(false);
    };

    const handleSuspend = (creatorId: string) => {
        // TODO: Implement suspend functionality
        console.log('Toggle suspend for:', creatorId);
        setIsModalOpen(false);
    };

    const handleAddCreator = () => {
        // TODO: Implement add creator functionality
        console.log('Add new creator');
    };

    return (
        <div className="min-h-screen flex bg-white font-['Neue_Montreal']">
            <Sidebar activePage="creators" />

            {/* Main scrolling container - Matches app/page.tsx */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white" style={{ padding: 0 }}>
                {/* Content Centering Wrapper - Fluid width */}
                <div style={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>

                    {/* Header Row: Search (Consistent with Dashboard) */}
                    <div style={{
                        width: '100%',
                        height: '62px',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end', // Align search to right if needed, or keep same
                        padding: '16px 48px',
                        boxSizing: 'border-box',
                        position: 'sticky',
                        top: 0,
                        zIndex: 10
                    }}>
                        {/* We can reuse the SearchBar here if it's "Global", or keep specific page header things */}
                        {/* For now, sticking to the Dashboard header look but maybe without the search bar if it's redundant with the page filter? 
                            Dashboard has "Search users, products, docs". Creators page has "Search creators...".
                            User might expect the global header. Let's add a placeholder or the same SearchBar component.
                        */}
                        <div style={{ width: '400px' }}>
                            <SearchBar placeholder="Search users, products, docs" />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={{
                        width: '100%',
                        minHeight: '100vh',
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '24px 48px',
                        gap: '32px',
                        boxSizing: 'border-box'
                    }}>
                        {/* Page Header */}
                        <div className="mb-2 w-full">
                            <h1 className="text-2xl font-bold text-gray-900">Creators</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Manage and monitor all creators on the platform
                            </p>
                        </div>

                        {/* Filters */}
                        <div className="w-full">
                            <CreatorFilters
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                statusFilter={statusFilter}
                                setStatusFilter={setStatusFilter}
                                onAddCreator={handleAddCreator}
                            />
                        </div>

                        {/* Results Count */}
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredCreators.length} of {allCreators.length} creators
                        </div>

                        {/* Table */}
                        <div className="w-full">
                            <CreatorsTable
                                creators={filteredCreators}
                                onCreatorClick={handleCreatorClick}
                                onAction={handleAction}
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Detail Modal */}
            <CreatorDetailModal
                creator={selectedCreator}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSendMessage={handleSendMessage}
                onSuspend={handleSuspend}
            />
        </div>
    );
}
