'use client';

import { MoreVertical } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type CreatorActionsProps = {
    creatorId: string;
    creatorName: string;
    status: 'Active' | 'Suspended';
    onAction: (action: 'view' | 'message' | 'suspend', creatorId: string) => void;
};

export default function CreatorActions({
    creatorId,
    creatorName,
    status,
    onAction
}: CreatorActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 hover:bg-muted rounded-md transition-colors">
                    <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onAction('view', creatorId)}>
                    View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAction('message', creatorId)}>
                    Send Message
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onAction('suspend', creatorId)}
                    className={status === 'Suspended' ? 'text-success' : 'text-destructive'}
                >
                    {status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
