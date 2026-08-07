'use server'

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma'
import { ScanResult } from '../types/scanner'
import { revalidatePath } from 'next/cache'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function saveProduct(userId: string, data: ScanResult, imagePath: string) {
  try {
    // Validate UUID format
    const validUserId = UUID_REGEX.test(userId)
      ? userId
      : '00000000-0000-0000-0000-000000000000'

    // 1. Ensure canonical product exists
    const product = await prisma.product.upsert({
      where: {
        brand_product_name: {
          brand: data.brand || 'Unknown',
          product_name: data.name || 'Unknown Product',
        },
      },
      update: {},
      create: {
        brand: data.brand || 'Unknown',
        product_name: data.name || 'Unknown Product',
        category: data.category || 'Other',
        shade: data.shade,
        finish: data.finish,
        image_url: imagePath,
        confidence_score: data.confidenceScore,
        estimated_expiration: data.expirationDate ? new Date(data.expirationDate) : null,
      },
    })

    // 2. Ensure target user exists in users table (auth.users)
    let targetUserId = validUserId
    const existingUser = await prisma.users.findUnique({
      where: { id: validUserId },
    })

    if (!existingUser) {
      const firstUser = await prisma.users.findFirst()
      if (firstUser) {
        targetUserId = firstUser.id
      } else {
        const newUser = await prisma.users.create({
          data: {
            id: validUserId,
            email: 'demo@nexa.beauty',
          },
        })
        targetUserId = newUser.id
      }
    }

    // 3. Create the user's instance of the product in user_collection
    const userProduct = await prisma.user_collection.upsert({
      where: {
        user_id_product_id: {
          user_id: targetUserId,
          product_id: product.id,
        },
      },
      update: {},
      create: {
        user_id: targetUserId,
        product_id: product.id,
      },
    })

    revalidatePath('/collection')
    return { success: true, productId: userProduct.id }
  } catch (error) {
    console.error('Save Product Error:', error)
    return { success: false, error: 'Failed to save product to collection' }
  }
}
