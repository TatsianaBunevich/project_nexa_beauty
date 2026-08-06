'use client'

import React from 'react'
import { Upload, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScannerUploadProps {
  onUpload: (formData: FormData) => void
  isUploading: boolean
}

export function ScannerUpload({ onUpload, isUploading }: ScannerUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    onUpload(formData)
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer relative overflow-hidden group">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-1">Upload Product Photo</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Take a clear photo of the product and its label
        </p>
        <div className="flex gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-background border">JPG</span>
          <span className="text-xs px-3 py-1 rounded-full bg-background border">PNG</span>
          <span className="text-xs px-3 py-1 rounded-full bg-background border">HEIC</span>
        </div>
      </div>
      {isUploading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-medium">Uploading to Nexa Cloud...</p>
        </div>
      )}
    </div>
  )
}
