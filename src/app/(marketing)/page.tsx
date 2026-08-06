export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-6xl font-bold tracking-tighter mb-4">Nexa Beauty</h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        The future of beauty organization. An AI-powered OS for your cosmetics collection.
      </p>
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium">Get Started</button>
        <button className="px-6 py-3 border rounded-full font-medium">Learn More</button>
      </div>
    </div>
  )
}
