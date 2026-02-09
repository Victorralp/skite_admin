import NotificationsOverview from '@/components/NotificationsOverview';

export default function NotificationsPage() {
  return (
    <div className="flex flex-col items-start p-6 gap-8 w-full min-h-screen bg-white">
      <NotificationsOverview />
    </div>
  );
}