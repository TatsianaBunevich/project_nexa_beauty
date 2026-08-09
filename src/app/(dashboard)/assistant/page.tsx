import { CopilotChat } from '@/features/ai-copilot/components/CopilotChat'

export default function AssistantPage() {
  return (
    <div className="flex h-[calc(100vh-12rem)] flex-col">
      <h1 className="mb-6 text-3xl font-bold">AI Assistant</h1>
      <CopilotChat />
    </div>
  )
}
