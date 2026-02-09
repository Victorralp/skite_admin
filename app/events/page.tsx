import EventsStats from '@/components/EventsStats';
import LiveSessionsGrid from '@/components/LiveSessionsGrid';

export default function EventsPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-start gap-8 px-16 py-6">
      <EventsStats />
      <LiveSessionsGrid />
    </div>
  );
}
