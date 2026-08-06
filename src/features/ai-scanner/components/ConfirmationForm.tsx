'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ScanResult } from '../types/scanner'
import { scanSchema } from '../types/scanner'
import { Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConfirmationFormProps {
  initialData: ScanResult
  onConfirm: (data: ScanResult) => void
  onCancel: () => void
  isSaving: boolean
}

export function ConfirmationForm({ initialData, onConfirm, onCancel, isSaving }: ConfirmationFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ScanResult>({
    resolver: zodResolver(scanSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit((data) => onConfirm(data))} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Brand"
          name="brand"
          register={register}
          error={errors.brand}
          confidence={initialData.confidenceScore}
        />
        <FormField
          label="Product Name"
          name="name"
          register={register}
          error={errors.name}
          confidence={initialData.confidenceScore}
        />
        <FormField
          label="Category"
          name="category"
          register={register}
          error={errors.category}
          confidence={initialData.confidenceScore}
        />
        <FormField
          label="Shade"
          name="shade"
          register={register}
          error={errors.shade}
          confidence={initialData.confidenceScore}
        />
        <FormField
          label="Finish"
          name="finish"
          register={register}
          error={errors.finish}
          confidence={initialData.confidenceScore}
        />
        <FormField
          label="Price ($)"
          name="estimatedPrice"
          register={register}
          error={errors.estimatedPrice}
          confidence={initialData.confidenceScore}
          type="number"
        />
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border hover:bg-muted transition-colors text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Add to Collection'}
        </button>
      </div>
    </form>
  )
}

function FormField({ label, name, register, error, confidence, type = 'text' }: any) {
  const isLowConfidence = confidence && confidence < 0.7

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </label>
        {isLowConfidence && (
          <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
            <AlertCircle className="w-3 h-3" />
            VERIFY
          </div>
        )}
      </div>
      <input
        {...register(name)}
        type={type}
        className={cn(
          "w-full p-2 text-sm border rounded-lg bg-background outline-none focus:ring-2 focus:ring-primary/20 transition-all",
          error && "border-destructive focus:ring-destructive/20",
          isLowConfidence && "border-amber-300"
        )}
      />
      {error && <p className="text-[10px] text-destructive">{error.message as string}</p>}
    </div>
  )
}
