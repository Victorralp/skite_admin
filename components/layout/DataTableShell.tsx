import React from 'react';
import { cn } from '@/lib/utils';

interface DataTableShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function DataTableShell({ children, className, ...props }: DataTableShellProps) {
  return (
    <div className={cn('w-full rounded-lg border border-border-primary bg-white overflow-hidden', className)} {...props}>
      <div className="w-full overflow-x-auto">{children}</div>
    </div>
  );
}
