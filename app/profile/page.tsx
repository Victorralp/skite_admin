import ProfileContent from '@/components/profile/ProfileContent';

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-start box-border px-4 py-6 md:px-12">
      <ProfileContent />
    </div>
  );
}