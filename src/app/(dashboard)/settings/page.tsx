export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="max-w-2xl space-y-6">
        <div className="p-6 border rounded-xl space-y-4">
          <h2 className="font-semibold">Profile Settings</h2>
          <div className="space-y-2">
            <label className="text-sm block">Skin Type</label>
            <input className="w-full p-2 border rounded-md" />
          </div>
        </div>
        <div className="p-6 border rounded-xl space-y-4">
          <h2 className="font-semibold">AI Preferences</h2>
          <div className="space-y-2">
            <label className="text-sm block">Recommendation Strictness</label>
            <input type="range" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
