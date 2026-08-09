'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/toast'

interface OutfitUploadProps {
  onAnalysisComplete: (data: any) => void
}

export default function OutfitUpload({
  onAnalysisComplete,
}: OutfitUploadProps) {
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!image) {
      toast.error('Please upload an image first')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/outfit/analyze', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) throw new Error('Analysis failed')

      const data = await response.json()
      onAnalysisComplete(data)
      toast.add({
        type: 'success',
        description: 'Beauty profile updated successfully!',
      })
    } catch (error) {
      toast.add({
        type: 'error',
        description: 'Failed to update profile.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed bg-muted/30 p-8 transition-all hover:bg-muted/50">
      {!image ? (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full border bg-background p-4 shadow-sm">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium">Upload your outfit image</p>
            <p className="text-sm text-muted-foreground">PNG, JPG or WEBP</p>
          </div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="outfit-upload"
          />
          <Button asChild variant="outline">
            <label htmlFor="outfit-upload" className="cursor-pointer">
              Select Image
            </label>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="group relative">
            <img
              src={image}
              alt="Outfit"
              className="h-64 w-64 rounded-xl object-cover shadow-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
              onClick={() => setImage(null)}
            >
              ×
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setImage(null)}>
              Change Image
            </Button>
            <Button onClick={handleAnalyze} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Outfit'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
