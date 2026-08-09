'use client'

import React from 'react'
import { Loader2, Scan } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScannerPreviewProps {
  imageUrl: string
}

export function ScannerPreview({ imageUrl }: ScannerPreviewProps) {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
      {imageUrl && imageUrl.trim() !== "" &&
      <img
        src={imageUrl}
        alt="Scanning product"
        className="w-full h-full object-cover"
      />
      }

      {/* Scanning Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_15px_rgba(var(--primary),1)] animate-scan-line" />
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center text-white gap-2">
        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          AI is analyzing product...
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-line {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(100vh - 100%)); }
        }
        /* I'll move this to globals.css instead of jsx style for better consistency */
      `}</style>
    </div>
  )
}
