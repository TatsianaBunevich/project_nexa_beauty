'use client'

import React, { useState } from 'react'
import OutfitUpload from '@/features/outfit-analysis/components/OutfitUpload'
import AnalysisResults from '@/features/outfit-analysis/components/AnalysisResults'

export default function LooksClient() {
  const [analysisData, setAnalysisData] = useState<any>(null)

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-10">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Makeup Looks</h1>
        <p className="text-muted-foreground">
          Upload your outfit and let AI design the perfect makeup look to match.
        </p>
      </div>

      {!analysisData ? (
        <div className="mx-auto max-w-xl">
          <OutfitUpload onAnalysisComplete={setAnalysisData} />
        </div>
      ) : (
        <div className="space-y-12">
          <AnalysisResults data={analysisData} />
          <div className="flex justify-center">
            <button
              onClick={() => setAnalysisData(null)}
              className="text-sm font-medium text-primary hover:underline"
            >
              ← Analyze another outfit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
