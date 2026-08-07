'use client'

import React, { useState } from 'react'
import { ScannerModal } from '@/features/ai-scanner/components/ScannerModal'
import { Camera, Plus } from 'lucide-react'

export default function ScannerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const mockUserId = '00000000-0000-0000-0000-000000000000' // Will be replaced by actual auth logic

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center p-6">
      <div className="max-w-2xl space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
            <Camera className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">AI Makeup Scanner</h1>
          <p className="text-lg text-muted-foreground">
            Instantly digitize your beauty collection. Upload a photo and let our AI identify the brand, shade, and finish.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
        >
          <Plus className="w-5 h-5" />
          Scan New Product
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 border rounded-2xl text-left space-y-2">
            <h3 className="font-bold">Fast Extraction</h3>
            <p className="text-sm text-muted-foreground">Powered by openrouter for high-precision metadata</p>
          </div>
          <div className="p-6 border rounded-2xl text-left space-y-2">
            <h3 className="font-bold">Verification</h3>
            <p className="text-sm text-muted-foreground">Human-in-the-loop confirmation for 100% accuracy</p>
          </div>
          <div className="p-6 border rounded-2xl text-left space-y-2">
            <h3 className="font-bold">Smart Catalog</h3>
            <p className="text-sm text-muted-foreground">Automatic deduplication and canonical matching</p>
          </div>
        </div>
      </div>

      <ScannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={mockUserId}
      />
    </div>
  )
}
