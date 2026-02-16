import React from 'react';
import { cn } from '@/lib/utils';

interface AppContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function AppContent({ children, className, style, ...props }: AppContentProps) {
  return (
    <div
      className={cn('w-full mx-auto flex flex-col', className)}
      style={{
        maxWidth: 'var(--layout-content-max)',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
