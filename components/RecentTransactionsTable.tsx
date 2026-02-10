'use client';

import { recentTransactions } from '@/data/dashboard';
import { CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell
} from '@/components/ui/table';

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'Success') {
    return (
      <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-success h-4 w-fit">
        <CheckCircle2 className="w-2.5 h-2.5 text-text-success" />
        <span className="font-medium text-caption-sm text-text-success">Success</span>
      </div>
    );
  }
  if (status === 'Pending') {
    return (
      <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-warning h-4 w-fit">
        <AlertCircle className="w-2.5 h-2.5 text-text-warning" />
        <span className="font-medium text-caption-sm text-text-warning">Pending</span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-danger h-4 w-fit">
      <AlertTriangle className="w-2.5 h-2.5 text-text-danger" />
      <span className="font-medium text-caption-sm text-text-danger">Flagged</span>
    </div>
  );
};

export default function RecentTransactionsTable() {
  return (
    <div className="w-full h-[366px] flex flex-col gap-3">
      {/* Header */}
      <div className="w-full h-6 flex justify-between items-center">
        <h2 className="text-heading-lg text-text-primary">Recent Transactions</h2>
        <button className="text-body-sm underline text-text-brand">See All</button>
      </div>

      {/* Table */}
      <div className="w-full h-[330px]">
        <div className="w-full">
          <Table className="h-full">
            <TableHeader>
              <TableHeaderCell width="w-[100px]">TXN ID</TableHeaderCell>
              <TableHeaderCell width="flex" minWidth="150px">Product</TableHeaderCell>
              <TableHeaderCell width="flex" minWidth="120px">Creator</TableHeaderCell>
              <TableHeaderCell width="flex" minWidth="120px">Buyer</TableHeaderCell>
              <TableHeaderCell width="w-[100px]">Amount</TableHeaderCell>
              <TableHeaderCell width="w-[120px]">Date</TableHeaderCell>
              <TableHeaderCell width="w-[80px]">Status</TableHeaderCell>
            </TableHeader>

            <TableBody>
              {recentTransactions.map((txn, index) => (
                <TableRow 
                  key={`${txn.id}-${index}`}
                  isLast={index === recentTransactions.length - 1}
                >
                  <TableCell width="w-[100px]">
                    <span className="text-body-sm text-text-primary">{txn.id}</span>
                  </TableCell>
                  <TableCell width="flex" minWidth="150px">
                    <span className="text-caption-lg text-text-primary">{txn.product}</span>
                  </TableCell>
                  <TableCell width="flex" minWidth="120px">
                    <span className="text-body-sm text-text-primary">{txn.creator}</span>
                  </TableCell>
                  <TableCell width="flex" minWidth="120px">
                    <span className="text-body-sm text-text-primary">{txn.buyer}</span>
                  </TableCell>
                  <TableCell width="w-[100px]">
                    <span className="text-body-sm text-text-primary">{txn.amount}</span>
                  </TableCell>
                  <TableCell width="w-[120px]">
                    <span className="text-body-sm text-text-primary">{txn.date}</span>
                  </TableCell>
                  <TableCell width="w-[80px]">
                    <StatusBadge status={txn.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
