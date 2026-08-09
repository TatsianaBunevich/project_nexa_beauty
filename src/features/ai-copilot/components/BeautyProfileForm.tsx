'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/toast'
import { updateBeautyProfile } from '@/features/ai-copilot/actions/profile'

const ProfileSchema = z.object({
  skinTone: z.string().min(1, 'Skin tone is required'),
  eyeColor: z.string().min(1, 'Eye color is required'),
  skinType: z.string().min(1, 'Skin type is required'),
  preferredStyle: z.string().min(1, 'Preferred style is required'),
})

type ProfileFormValues = z.infer<typeof ProfileSchema>

export default function BeautyProfileForm({
  initialData,
}: {
  initialData?: any
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: initialData || {},
  })

  async function onSubmit(data: ProfileFormValues) {
    try {
      await updateBeautyProfile(data)
      toast.add({
        type: 'success',
        description: 'Beauty profile updated successfully!',
      })
    } catch (error) {
      toast.add({
        type: 'error',
        description: 'Failed to update profile.',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card space-y-6 rounded-xl border p-6"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="skinTone">Skin Tone</Label>
          <Input
            id="skinTone"
            {...register('skinTone')}
            placeholder="e.g. Warm Olive"
          />
          {errors.skinTone && (
            <p className="text-xs text-destructive">
              {errors.skinTone.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="eyeColor">Eye Color</Label>
          <Input
            id="eyeColor"
            {...register('eyeColor')}
            placeholder="e.g. Brown"
          />
          {errors.eyeColor && (
            <p className="text-xs text-destructive">
              {errors.eyeColor.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="skinType">Skin Type</Label>
          <Input
            id="skinType"
            {...register('skinType')}
            placeholder="e.g. Combination"
          />
          {errors.skinType && (
            <p className="text-xs text-destructive">
              {errors.skinType.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredStyle">Preferred Style</Label>
          <Input
            id="preferredStyle"
            {...register('preferredStyle')}
            placeholder="e.g. Natural Glam"
          />
          {errors.preferredStyle && (
            <p className="text-xs text-destructive">
              {errors.preferredStyle.message}
            </p>
          )}
        </div>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Save Beauty Profile
      </Button>
    </form>
  )
}
