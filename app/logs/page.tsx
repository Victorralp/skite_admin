import LogsOverview from '@/components/LogsOverview';

export default function LogsPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-start gap-8 box-border px-4 py-6 md:px-12">
      <LogsOverview />
    </div>
  );
}
