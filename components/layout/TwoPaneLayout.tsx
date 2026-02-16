import React from 'react';
import { cn } from '@/lib/utils';

interface TwoPaneLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  mainMin?: string;
  sideWidth?: string;
  gap?: string;
}

export default function TwoPaneLayout({
  children,
  className,
  style,
  mainMin = 'var(--layout-2pane-main-min)',
  sideWidth = 'var(--layout-2pane-side)',
  gap = 'var(--layout-2pane-gap)',
  ...props
}: TwoPaneLayoutProps) {
  const normalizedMainMin = mainMin.trim().toLowerCase();
  const mainTrackClass =
    normalizedMainMin === '1fr'
      ? 'xl:grid-cols-[minmax(0,1fr)_var(--tw-side-width)]'
      : 'xl:grid-cols-[minmax(var(--tw-main-min),1fr)_var(--tw-side-width)]';

  return (
    <div
      className={cn('grid grid-cols-1 items-start', mainTrackClass, className)}
      style={
        {
          '--tw-main-min': mainMin,
          '--tw-side-width': sideWidth,
          gap,
          ...style
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}
