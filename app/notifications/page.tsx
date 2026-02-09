import NotificationsOverview from '@/components/NotificationsOverview';

export default function NotificationsPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-start gap-8 box-border px-4 py-6 md:px-12">
      <NotificationsOverview />
    </div>
  );
}