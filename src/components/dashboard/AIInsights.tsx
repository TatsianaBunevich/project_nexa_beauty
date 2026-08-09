'use client'

import * as React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Loader2 } from 'lucide-react'
import { generateAIInsights } from '@/features/ai-insights/actions/generate-insights'

export function AIInsights() {
  const [insights, setInsights] = useState<string[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setIsLoading(true)
    setError(null)
    try {
      const res = await generateAIInsights()
      if (res.success && res.data) {
        setInsights(res.data)
      } else {
        setError(res.error || 'Failed to generate insights')
      }
    } catch (e) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/5 to-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">AI Collection Insights</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerate}
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
          {isLoading ? 'Analyzing...' : 'Generate'}
        </Button>
      </div>

      {!insights && !isLoading && !error && (
        <p className="text-sm text-muted-foreground py-4">
          Click generate to let our AI analyze your collection for duplicates and gaps.
        </p>
      )}

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          {error}
        </div>
      )}

      {insights && (
        <ul className="space-y-3">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex gap-3 text-sm p-3 rounded-lg bg-background border border-primary/10 shadow-sm">
              <Badge variant="secondary" className="h-fit mt-1 shrink-0">
                {idx + 1}
              </Badge>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
