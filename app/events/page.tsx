import EventsStats from '@/components/EventsStats';
import LiveSessionsGrid from '@/components/LiveSessionsGrid';

export default function EventsPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-start gap-8 box-border px-4 py-6 md:px-12">
      <EventsStats />
      <LiveSessionsGrid />
    </div>
  );
}
