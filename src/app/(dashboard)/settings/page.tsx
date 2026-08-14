import { getBeautyProfile } from '@/features/ai-copilot/actions/profile'
import BeautyProfileForm from '@/features/ai-copilot/components/BeautyProfileForm'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function SettingsPage() {
  const { user, error } = await auth()
  if (error || !user) redirect('/login')

  const profile = await getBeautyProfile()

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Your Beauty Profile</h1>
      <p className="mb-8 text-muted-foreground">
        Fill out your profile to get highly personalized makeup recommendations
        from the AI Copilot.
      </p>
      <BeautyProfileForm initialData={profile} />
    </div>
  )
}

