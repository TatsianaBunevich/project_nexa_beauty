import { prisma } from '@/src/lib/prisma'
import { Product } from '@/types/product'

export interface CollectionAnalysis {
  ownedCount: number
  categories: string[]
  products: Product[]
  summary: string
}

export interface CollectionRepository {
  getByUserId(userId: string): Promise<Product[]>
  analyze(userId: string): Promise<CollectionAnalysis>
}

export const collectionRepository: CollectionRepository = {
  async getByUserId(userId: string) {
    if (!userId || typeof userId !== 'string') {
      return [];
    }
    try {
      const items = await prisma.user_collection.findMany({
        where: { user_id: userId },
        include: { product: true },
      })

      return items.map((item) => item.product)
    } catch (e) {
      console.error('[CollectionRepo] getByUserId error:', e);
      return [];
    }
  },

  async analyze(userId: string) {
    if (!userId || typeof userId !== 'string') {
      return {
        ownedCount: 0,
        categories: [],
        products: [],
        summary: 'No user ID provided.',
      }
    }
    try {
      const items = await prisma.user_collection.findMany({
        where: { user_id: userId },
        include: { product: true },
      })

      const ownedProducts = items.map((item) => item.product)
      const categories = [
        ...new Set(ownedProducts.map((p) => p.category).filter(Boolean)),
      ]

      return {
        ownedCount: ownedProducts.length,
        categories,
        products: ownedProducts,
        summary: `The user owns ${ownedProducts.length} products across ${categories.length} categories.`,
      }
    } catch (e) {
      console.error('[CollectionRepo] analyze error:', e);
      return {
        ownedCount: 0,
        categories: [],
        products: [],
        summary: 'Failed to analyze collection.',
      }
    }
  },
}
