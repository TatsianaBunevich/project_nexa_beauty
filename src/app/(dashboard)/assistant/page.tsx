export default function AssistantPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>
      <div className="flex-1 border rounded-xl mb-4 p-4 overflow-y-auto bg-muted/20">
        Chat interface will be here...
      </div>
      <div className="flex gap-2">
        <input className="flex-1 p-3 border rounded-lg" placeholder="Ask about your makeup..." />
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg">Send</button>
      </div>
    </div>
  )
}
