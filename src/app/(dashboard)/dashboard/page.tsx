export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl bg-card">Collection Stats</div>
        <div className="p-6 border rounded-xl bg-card">Recent Scans</div>
        <div className="p-6 border rounded-xl bg-card">AI Suggestions</div>
      </div>
    </div>
  )
}
