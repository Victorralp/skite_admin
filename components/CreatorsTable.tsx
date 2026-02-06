'use client';

import { Creator } from '@/data/dashboard';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import CreatorActions from './CreatorActions';
import { cn } from '@/lib/utils';

type CreatorsTableProps = {
    creators: Creator[];
    onCreatorClick: (creator: Creator) => void;
    onAction: (action: 'view' | 'message' | 'suspend', creatorId: string) => void;
};

export default function CreatorsTable({
    creators,
    onCreatorClick,
    onAction
}: CreatorsTableProps) {
    return (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableHead className="w-16">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Revenue</TableHead>
                            <TableHead className="text-center">Products</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="w-16 text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {creators.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                                    No creators found
                                </TableCell>
                            </TableRow>
                        ) : (
                            creators.map((creator) => (
                                <TableRow
                                    key={creator.id}
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => onCreatorClick(creator)}
                                >
                                    <TableCell>
                                        <img
                                            src={creator.avatar}
                                            alt={creator.name}
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-100"
                                        />
                                    </TableCell>
                                    <TableCell className="font-semibold text-gray-900">
                                        {creator.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {creator.username}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {creator.email}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold text-success">
                                        {creator.revenue}
                                    </TableCell>
                                    <TableCell className="text-center text-gray-700">
                                        {creator.products}
                                    </TableCell>
                                    <TableCell className="text-center">
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
                                    </TableCell>
                                    <TableCell onClick={(e) => e.stopPropagation()}>
                                        <CreatorActions
                                            creatorId={creator.id}
                                            creatorName={creator.name}
                                            status={creator.status}
                                            onAction={onAction}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
