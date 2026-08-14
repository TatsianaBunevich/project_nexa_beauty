'use client'

import React, { useState } from 'react'
import { ScannerModal } from '@/features/ai-scanner/components/ScannerModal'
import { Camera, Plus } from 'lucide-react'

export default function ScannerClient({ userId }: { userId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-8">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <Camera className="h-12 w-12" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            AI Makeup Scanner
          </h1>
          <p className="text-lg text-muted-foreground">
            Instantly digitize your beauty collection. Upload a photo and let
            our AI identify the brand, shade, and finish.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mx-auto flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="h-5 w-5" />
          Scan New Product
        </button>

        <div className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-3">
          <div className="space-y-2 rounded-2xl border p-6 text-left">
            <h3 className="font-bold">Fast Extraction</h3>
            <p className="text-sm text-muted-foreground">
              Powered by openrouter for high-precision metadata
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border p-6 text-left">
            <h3 className="font-bold">Verification</h3>
            <p className="text-sm text-muted-foreground">
              Human-in-the-loop confirmation for 100% accuracy
            </p>
          </div>
          <div className="space-y-2 rounded-2xl border p-6 text-left">
            <h3 className="font-bold">Smart Catalog</h3>
            <p className="text-sm text-muted-foreground">
              Automatic deduplication and canonical matching
            </p>
          </div>
        </div>
      </div>

      <ScannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
      />
    </div>
  )
}
