import EventsStats from '@/components/EventsStats';
import LiveSessionsGrid from '@/components/LiveSessionsGrid';
import PageContainer from '@/components/layout/PageContainer';

export default function EventsPage() {
  return (
    <PageContainer>
      <EventsStats />
      <LiveSessionsGrid />
    </PageContainer>
  );
}
