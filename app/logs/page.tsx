import LogsOverview from '@/components/LogsOverview';

export default function LogsPage() {
  return (
    <div className="flex flex-col items-start p-6 gap-8 w-full min-h-screen bg-white">
      <LogsOverview />
    </div>
  );
}
