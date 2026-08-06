'use server'

import { prisma } from '@/lib/prisma'
import { ScanResult } from '../types/scanner'
import { revalidatePath } from 'next/cache'

export async function saveProduct(userId: string, data: ScanResult, imagePath: string) {
  try {
    // 1. Ensure canonical product exists
    const product = await prisma.product.upsert({
      where: {
        brand_name: {
          brand: data.brand || 'Unknown',
          name: data.name || 'Unknown Product',
        },
      },
      update: {},
      create: {
        brand: data.brand || 'Unknown',
        name: data.name || 'Unknown Product',
        category: data.category || 'Other',
        shade: data.shade,
        finish: data.finish,
      },
    })

    // 2. Create the user's instance of the product
    const userProduct = await prisma.userProduct.create({
      data: {
        userId,
        productId: product.id,
        imagePath,
        estimatedPrice: data.estimatedPrice,
        expirationDate: data.expirationDate ? new Date(data.expirationDate) : null,
        confidenceScore: data.confidenceScore,
        status: 'Confirmed',
      },
    })

    revalidatePath('/collection')
    return { success: true, productId: userProduct.id }
  } catch (error) {
    console.error('Save Product Error:', error)
    return { success: false, error: 'Failed to save product to collection' }
  }
}
