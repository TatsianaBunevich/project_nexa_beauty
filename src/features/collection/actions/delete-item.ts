'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function deleteCollectionItem(itemId: string) {
  try {
    // In a real app, we would verify that the itemId belongs to the authenticated user
    await prisma.user_collection.delete({
      where: {
        id: itemId,
      },
    })

    revalidatePath('/collection')
    return { success: true }
  } catch (error) {
    console.error('Error deleting collection item:', error)
    return { success: false, error: 'Failed to delete item from collection' }
  }
}