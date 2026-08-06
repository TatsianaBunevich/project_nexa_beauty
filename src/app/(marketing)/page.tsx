import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-6xl font-bold tracking-tighter mb-4">Nexa Beauty</h1>
      <p className="text-xl text-muted-foreground max-w-2xl">
        The future of beauty organization. An AI-powered OS for your cosmetics collection.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
        <Link
          href="#features"
          className="px-6 py-3 border rounded-full font-medium hover:bg-muted transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}
