'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'

export async function deleteCollectionItem(itemId: string) {
  try {
    const { user, error } = await auth()

    if (error || !user) {
      return { success: false, error: 'You must be logged in to perform this action' }
    }

    // Verify that the item belongs to the authenticated user
    const item = await prisma.user_collection.findUnique({
      where: { id: itemId },
    })

    if (!item || item.user_id !== user.id) {
      return { success: false, error: 'Unauthorized to delete this item' }
    }

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