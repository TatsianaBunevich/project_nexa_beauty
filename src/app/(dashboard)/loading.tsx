import { Loader2 } from 'lucide-react'

export default function DashboardLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-12 w-12 animate-ping rounded-full bg-primary/20" />
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="animate-pulse text-sm font-medium text-muted-foreground">
          Preparing your beauty profile...
        </p>
      </div>
    </div>
  )
}