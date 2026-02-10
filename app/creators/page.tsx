'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { allCreators, Creator } from '@/data/dashboard';
import CreatorFilters from '@/components/CreatorFilters';
import CreatorsTable from '@/components/CreatorsTable';
import StatsCard from '@/components/StatsCard';
import PageContainer from '@/components/layout/PageContainer';

export default function CreatorsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'banned'>('all');
    // const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null); // Removed modal state
    // const [isModalOpen, setIsModalOpen] = useState(false); // Removed modal state

    // Filter creators based on search and status
    const filteredCreators = useMemo(() => {
        return allCreators.filter((creator) => {
            // Status filter
            if (statusFilter === 'active' && creator.status !== 'Active') return false;
            if (statusFilter === 'suspended' && creator.status !== 'Suspended') return false;
            if (statusFilter === 'banned' && creator.status !== 'Banned') return false;

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
        router.push(`/creators/${creator.id}`);
    };

    // const handleCloseModal = () => { ... } // Removed modal handler

    const handleAction = (action: 'view' | 'message' | 'suspend', creatorId: string) => {
        const creator = allCreators.find((c) => c.id === creatorId);

        if (action === 'view' && creator) {
            router.push(`/creators/${creator.id}`);
        } else if (action === 'message') {
            console.log('Send message to creator:', creatorId);
        } else if (action === 'suspend') {
            console.log('Toggle suspend for creator:', creatorId);
        }
    };



    const handleAddCreator = () => {
        console.log('Add new creator');
    };

    return (
        <>
            <PageContainer>
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-heading-lg text-text-primary">Creators</h1>

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                        <StatsCard
                            title="Total Creators"
                            value="3,819"
                            trend="+12.3% from last month"
                            trendDirection="up"
                        />
                        <StatsCard
                            title="Active Creators"
                            value="3,281"
                            trend="+12.3% from yesterday"
                            trendDirection="up"
                        />
                        <StatsCard
                            title="Pending Verification"
                            value="21"
                            trend="+2 today"
                            trendDirection="neutral"
                        />
                        <StatsCard
                            title="Flagged Creators"
                            value="2"
                            trend="+0 today"
                            trendDirection="down"
                        />
                    </div>
                </div>

                {/* Filters and Table Section */}
                <div className="flex flex-col gap-2">
                    <CreatorFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        onAddCreator={handleAddCreator}
                    />

                    <CreatorsTable
                        creators={filteredCreators}
                        onCreatorClick={handleCreatorClick}
                        onAction={(action, creatorId) => {
                            const creator = filteredCreators.find(c => c.id === creatorId);
                            if (!creator) return;

                            switch (action) {
                                case 'view':
                                    handleCreatorClick(creator);
                                    break;
                                case 'message':
                                    console.log('Send message to:', creator.name);
                                    // TODO: Implement message functionality
                                    break;
                                case 'suspend':
                                    console.log('Suspend user:', creator.name);
                                    // TODO: Implement suspend functionality
                                    break;
                            }
                        }}
                    />
                </div>
            </PageContainer>

            {/* Detail Modal Removed */}
        </>
    );
}
