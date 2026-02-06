'use client';

import { X } from 'lucide-react';
import { Creator } from '@/data/dashboard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type CreatorDetailModalProps = {
    creator: Creator | null;
    isOpen: boolean;
    onClose: () => void;
    onSendMessage: (creatorId: string) => void;
    onSuspend: (creatorId: string) => void;
};

export default function CreatorDetailModal({
    creator,
    isOpen,
    onClose,
    onSendMessage,
    onSuspend
}: CreatorDetailModalProps) {
    if (!creator) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Creator Profile</DialogTitle>
                </DialogHeader>

                {/* Creator Header */}
                <div className="flex items-start gap-4 pb-6 border-b border-border">
                    <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="h-20 w-20 rounded-full object-cover ring-4 ring-brand-purple/10"
                    />
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">{creator.name}</h2>
                        <p className="text-sm text-muted-foreground">{creator.username}</p>
                        <p className="text-sm text-muted-foreground mt-1">{creator.email}</p>
                        <div className="mt-3">
                            <span
                                className={cn(
                                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                                    creator.status === 'Active'
                                        ? 'bg-success/10 text-success'
                                        : 'bg-gray-100 text-gray-600'
                                )}
                            >
                                {creator.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="py-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Bio</h3>
                    <p className="text-sm text-gray-600">{creator.bio}</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-border">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-brand-purple">{creator.revenue}</p>
                        <p className="text-xs text-muted-foreground mt-1">Total Revenue</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-brand-purple">{creator.products}</p>
                        <p className="text-xs text-muted-foreground mt-1">Products</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-brand-purple">
                            {new Date(creator.joinedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Joined</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="py-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">Last product uploaded</span>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">Last sale</span>
                            <span className="text-xs text-muted-foreground">5 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">Last login</span>
                            <span className="text-xs text-muted-foreground">1 hour ago</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                        onClick={() => onSendMessage(creator.id)}
                        className="flex-1 px-4 py-2 bg-brand-purple text-white rounded-lg text-sm font-medium hover:bg-brand-purple/90 transition-colors"
                    >
                        Send Message
                    </button>
                    <button
                        onClick={() => onSuspend(creator.id)}
                        className={cn(
                            'flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                            creator.status === 'Suspended'
                                ? 'bg-success/10 text-success hover:bg-success/20'
                                : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
                        )}
                    >
                        {creator.status === 'Suspended' ? 'Unsuspend Account' : 'Suspend Account'}
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
