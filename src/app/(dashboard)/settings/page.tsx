import { getBeautyProfile } from '@/features/ai-copilot/actions/profile';
import BeautyProfileForm from '@/features/ai-copilot/components/BeautyProfileForm';
import { redirect } from 'next/navigation';
// import { auth } from '@/lib/auth';

export default async function SettingsPage() {
  // const session = await auth();
  // if (!session) redirect('/login');

  const profile = await getBeautyProfile();

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Beauty Profile</h1>
      <p className="text-muted-foreground mb-8">
        Fill out your profile to get highly personalized makeup recommendations from the AI Copilot.
      </p>
      <BeautyProfileForm initialData={profile} />
    </div>
  );
}