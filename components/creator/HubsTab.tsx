'use client';

import { creatorHubs } from '@/data/dashboard';
import { cn } from '@/lib/utils';
import { Eye, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import HubDetailModal from '@/components/HubDetailModal';
import DataTableShell from '@/components/layout/DataTableShell';

const CheckIcon = () => (
    <svg width="10" height="10" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 6.5C0.5 7.28793 0.655194 8.06815 0.956723 8.7961C1.25825 9.52405 1.70021 10.1855 2.25736 10.7426C2.81451 11.2998 3.47595 11.7417 4.2039 12.0433C4.93185 12.3448 5.71207 12.5 6.5 12.5C7.28793 12.5 8.06815 12.3448 8.7961 12.0433C9.52405 11.7417 10.1855 11.2998 10.7426 10.7426C11.2998 10.1855 11.7417 9.52405 12.0433 8.7961C12.3448 8.06815 12.5 7.28793 12.5 6.5C12.5 5.71207 12.3448 4.93185 12.0433 4.2039C11.7417 3.47595 11.2998 2.81451 10.7426 2.25736C10.1855 1.70021 9.52405 1.25825 8.7961 0.956723C8.06815 0.655195 7.28793 0.5 6.5 0.5C5.71207 0.5 4.93185 0.655195 4.2039 0.956723C3.47595 1.25825 2.81451 1.70021 2.25736 2.25736C1.70021 2.81451 1.25825 3.47595 0.956723 4.2039C0.655194 4.93185 0.5 5.71207 0.5 6.5Z" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.5 6.50008L5.83333 7.83341L8.5 5.16675" stroke="#239B73" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'Active') {
        return (
            <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-surface-success h-[14px] w-fit">
                <CheckIcon />
                <span className="font-sans text-caption-sm text-text-success">Healthy</span>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded-[4px] bg-surface-danger h-[14px] w-fit">
            <AlertTriangle className="w-[10px] h-[10px] text-text-danger" />
            <span className="font-sans text-caption-sm text-text-danger">Flagged</span>
        </div>
    );
};

export default function HubsTab() {
    const [selectedHub, setSelectedHub] = useState<(typeof creatorHubs)[number] | null>(null);

    return (
        <>
            <div className="flex flex-col w-full bg-surface-secondary rounded-b-[36px] p-6 gap-6">
                <h3 className="font-sans text-heading-sm text-text-primary">Managed Hubs</h3>

                <div className="w-full rounded-xl bg-surface-secondary p-1">
                    <DataTableShell>
                        <div className="min-w-[720px]">
                            <div className="flex items-center gap-6 px-4 py-2">
                                <div className="flex-1 font-sans text-body-sm text-text-secondary">Hub name</div>
                                <div className="flex-1 font-sans text-body-sm text-text-secondary">No. of members</div>
                                <div className="flex-1 font-sans text-body-sm text-text-secondary">Posts today</div>
                                <div className="flex-1 font-sans text-body-sm text-text-secondary">Status</div>
                                <div className="w-[18px]" />
                            </div>

                            <div className="overflow-hidden rounded-lg border border-border-primary bg-white">
                                {creatorHubs.map((hub, index) => (
                                    <div
                                        key={hub.id}
                                        className={cn(
                                            "flex items-center gap-6 bg-white px-4 py-3",
                                            index !== creatorHubs.length - 1 && "border-b border-border-primary"
                                        )}
                                    >
                                        <div className="flex flex-1 items-center gap-2">
                                            <div className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                                            <span className="truncate font-sans text-body-sm text-text-primary">
                                                {hub.name}
                                            </span>
                                        </div>

                                        <div className="flex-1 font-sans text-body-sm text-text-primary">
                                            {hub.members.toLocaleString()}
                                        </div>

                                        <div className="flex-1 font-sans text-body-sm text-text-primary">
                                            {hub.posts}
                                        </div>

                                        <div className="flex-1">
                                            <StatusBadge status={hub.status} />
                                        </div>

                                        <div className="w-[18px]">
                                            <button
                                                className="p-0 transition-opacity hover:opacity-70"
                                                onClick={() => setSelectedHub(hub)}
                                            >
                                                <Eye className="h-[18px] w-[18px] text-text-secondary" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DataTableShell>
                </div>
            </div>

            <HubDetailModal
                hub={selectedHub}
                onClose={() => setSelectedHub(null)}
            />
        </>
    );
}
