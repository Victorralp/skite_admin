import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar';
import { SearchBar } from '@/components/ui/SearchBar';

export const metadata: Metadata = {
  title: 'Skite Admin Dashboard',
  description: 'Skite admin dashboard composite'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex bg-white font-['Neue_Montreal']">
          <Sidebar />

          {/* Main scrolling container */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white" style={{ padding: 0 }}>

            {/* Header Row: Search */}
            <div className="w-full h-[62px] bg-white flex items-center sticky top-0 z-10 px-4 py-4 md:px-12 box-border">
              {/* SearchBar wrapper to match dashboard look */}
              <div className="w-full flex justify-end md:justify-start">
                <SearchBar placeholder="Search users, products, docs" />
              </div>
            </div>

            {/* Content Centering Wrapper */}
            <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
