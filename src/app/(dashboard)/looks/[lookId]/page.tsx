export default function LookDetailPage({ params }: { params: { lookId: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Look Details: {params.lookId}</h1>
      <div className="aspect-video bg-muted rounded-xl mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-xl">Products used in this look</div>
        <div className="p-6 border rounded-xl">AI Reasoning</div>
      </div>
    </div>
  )
}
