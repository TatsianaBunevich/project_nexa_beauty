export default async function LookDetailPage({
  params,
}: {
  params: Promise<{ lookId: string }>
}) {
  const { lookId } = await params

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Look Details: {lookId}</h1>
      <div className="mb-6 aspect-video rounded-xl bg-muted" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border p-6">Products used in this look</div>
        <div className="rounded-xl border p-6">AI Reasoning</div>
      </div>
    </div>
  )
}

