import { CopilotChat } from '@/features/ai-copilot/components/CopilotChat'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AssistantPage() {
  const { user, error } = await auth()
  if (error || !user) redirect('/login')

  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col">
      <h1 className="mb-6 text-3xl font-bold">AI Assistant</h1>
      <CopilotChat userId={user.id} />
    </div>
  )
}
