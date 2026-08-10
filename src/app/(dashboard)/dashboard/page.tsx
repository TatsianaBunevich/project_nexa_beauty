import { getDashboardStats } from '@/app/(dashboard)/dashboard/actions'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { AIInsights } from '@/components/dashboard/AIInsights'
import { Package, AlertTriangle, Layers, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const widgetData = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'text-blue-500',
    },
    {
      label: 'Most Used',
      value: stats.mostUsedCategory,
      icon: Layers,
      color: 'text-purple-500',
    },
    {
      label: 'Unused Items',
      value: stats.unusedProducts,
      icon: Clock,
      color: 'text-amber-500',
    },
    {
      label: 'Duplicates',
      value: stats.duplicates,
      icon: AlertTriangle,
      color: 'text-red-500',
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="mb-6 text-3xl font-bold">Beauty Analytics</h1>

      {/* Analytics Widgets */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {widgetData.map((widget, idx) => (
          <Card key={idx} className="flex flex-col gap-2 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {widget.label}
              </span>
              <widget.icon className={cn('h-4 w-4', widget.color)} />
            </div>
            <div className="text-2xl font-bold">{widget.value}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* AI Insights - Taking 2 columns */}
        <div className="lg:col-span-2">
          <AIInsights />
        </div>

        {/* Quick Stats/Warnings - Taking 1 column */}
        <Card className="space-y-4 p-6">
          <h3 className="font-semibold">Health Check</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-muted p-2 text-sm">
              <span className="text-muted-foreground">Expiring Soon</span>
              <span className="font-bold text-red-500">
                {stats.expiringSoonCount}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted p-2 text-sm">
              <span className="text-muted-foreground">Collection Score</span>
              <span className="font-bold text-green-500">Good</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
