'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { SearchBar } from '@/components/ui/SearchBar';
import AppContent from '@/components/layout/AppContent';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === '/login';

  if (isAuthRoute) {
    return <div className="min-h-screen bg-surface-primary">{children}</div>;
  }

  return (
    <div className="min-h-screen flex bg-surface-primary">
      <Sidebar />

      {/* Main scrolling container */}
      <main
        className="flex-1 overflow-y-auto overflow-x-hidden bg-surface-primary"
        style={{ padding: 0 }}
      >
        {/* Header Row: Search */}
        <div className="w-full h-[62px] bg-surface-primary flex items-center sticky top-0 z-10 layout-gutter py-4 box-border">
          {/* SearchBar wrapper to match dashboard look */}
          <div className="w-full flex justify-end md:justify-start">
            <SearchBar placeholder="Search users, products, docs" />
          </div>
        </div>

        {/* Content Centering Wrapper */}
        <AppContent>
          {children}
        </AppContent>
      </main>
    </div>
  );
}
