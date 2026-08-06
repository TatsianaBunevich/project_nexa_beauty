'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) throw new Error('No file uploaded')

  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
  const filePath = `scans/${fileName}`

  const { data, error } = await supabase.storage
    .from('cosmetic-scans')
    .upload(filePath, file)

  if (error) throw new Error(`Upload failed: ${error.message}`)

  const { data: { publicUrl } } = supabase.storage
    .from('cosmetic-scans')
    .getPublicUrl(filePath)

  return {
    url: publicUrl,
    path: filePath,
  }
}
