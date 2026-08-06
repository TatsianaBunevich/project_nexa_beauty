export default function LooksPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Makeup Looks</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="aspect-square bg-muted rounded-xl" />)}
      </div>
    </div>
  )
}
