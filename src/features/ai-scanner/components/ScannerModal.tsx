'use client'

import React from 'react'
import { X, Camera, CheckCircle2 } from 'lucide-react'
import { useAiScanner } from '../hooks/use-ai-scanner'
import { ScannerUpload } from './ScannerUpload'
import { ScannerPreview } from './ScannerPreview'
import { ConfirmationForm } from './ConfirmationForm'
import { cn } from '@/lib/utils'

interface ScannerModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function ScannerModal({ isOpen, onClose, userId }: ScannerModalProps) {
  const scanner = useAiScanner()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-background rounded-3xl shadow-2xl overflow-hidden border animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b bg-muted/30">
          <h2 className="text-lg font-semibold">AI Product Scanner</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {scanner.state === 'IDLE' && (
            <ScannerUpload
              onUpload={(formData) => scanner.startScan(formData)}
              isUploading={scanner.state === 'UPLOADING'}
            />
          )}

          {(scanner.state === 'UPLOADING' || scanner.state === 'SCANNING') && (
            <div className="flex flex-col items-center gap-6">
              <ScannerPreview imageUrl={scanner.image?.url || ''} />
              <div className="text-center">
                <p className="font-medium">Analyzing your beauty product...</p>
                <p className="text-sm text-muted-foreground">Using GPT-4o Vision to extract details</p>
              </div>
            </div>
          )}

          {scanner.state === 'REVIEWING' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="hidden md:block">
                <img
                  src={scanner.image?.url}
                  alt="Scanned product"
                  className="w-full aspect-square object-cover rounded-2xl border"
                />
              </div>
              <div className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  AI Extraction Complete. Please verify.
                </div>
                <ConfirmationForm
                  initialData={scanner.scanResult!}
                  isSaving={scanner.state === 'SAVING'}
                  onCancel={() => scanner.reset()}
                  onConfirm={(data) => scanner.confirmProduct(data, userId)}
                />
              </div>
            </div>
          )}

          {scanner.state === 'ERROR' && (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Scanning Failed</h3>
              <p className="text-muted-foreground">{scanner.error}</p>
              <button
                onClick={() => scanner.reset()}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full"
              >
                Try Again
              </button>
            </div>
          )}

          {scanner.state === 'COMPLETED' && (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Product Added!</h3>
              <p className="text-muted-foreground">Your collection has been updated successfully.</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-full"
              >
                View Collection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
