export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Beauty Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64 border rounded-xl bg-card p-6">Category Distribution</div>
        <div className="h-64 border rounded-xl bg-card p-6">Expiration Timeline</div>
      </div>
    </div>
  )
}
