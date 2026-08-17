import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

export const tools = {
  search_products: {
    description:
      'Search for beauty products by keywords or visual similarity. Use this to find products the user does not own.',
    parameters: z.object({
      query: z
        .string()
        .describe(
          'The search query for products (e.g., "nude lipstick", "gold eyeshadow")'
        ),
      userId: z.string().describe('The ID of the user performing the search'),
    }),
    execute: async ({ query, userId }: { query: string; userId: string }) => {
      const supabase = await createClient()
      // 1. Keyword Search using Prisma
      const keywordResults = await prisma.product.findMany({
        where: {
          OR: [
            { product_name: { contains: query, mode: 'insensitive' } },
            { brand: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } },
          ],
        },
        take: 5,
      })

      // 2. Vector Search using Supabase RPC (Requires match_products function in DB)
      // Note: In a real implementation, we would generate an embedding for the query first.
      // For now, we'll use the keyword results or a placeholder for the vector search.
      const { data: vectorResults, error } = await supabase.rpc(
        'match_products',
        {
          query_embedding: [], // Placeholder: needs actual embedding generation
          match_threshold: 0.5,
          match_count: 5,
        }
      )

      if (error) {
        console.error('Vector search error:', error)
      }

      // Combine and deduplicate results
      const allProducts = [...keywordResults, ...(vectorResults || [])]
      const uniqueProducts = Array.from(
        new Map(allProducts.map((p) => [p.id, p])).values()
      )

      return uniqueProducts
    },
  },

  analyze_collection: {
    description:
      "Analyze the user's current makeup collection to identify what they own and what is missing.",
    parameters: z.object({
      userId: z
        .string()
        .describe('The ID of the user whose collection is being analyzed'),
    }),
    execute: async ({ userId }: { userId: string }) => {
      const collection = await prisma.user_collection.findMany({
        where: { user_id: userId },
        include: { product: true },
      })

      const ownedProducts = collection.map((item) => item.product)
      const categories = [
        ...new Set(ownedProducts.map((p) => p.category).filter(Boolean)),
      ]

      return {
        ownedCount: ownedProducts.length,
        categories,
        products: ownedProducts,
        summary: `The user owns ${ownedProducts.length} products across ${categories.length} categories.`,
      }
    },
  },

  create_makeup_look: {
    description:
      'Generate a complete makeup look based on user context, preferences, and collection.',
    parameters: z.object({
      userId: z.string().describe('The ID of the user'),
      context: z
        .string()
        .describe(
          'Context for the look (e.g., "wedding", "office", "date night")'
        ),
      preferences: z
        .string()
        .optional()
        .describe('Additional preferences (e.g., "natural", "bold")'),
    }),
    execute: async ({
      userId,
      context,
      preferences,
    }: {
      userId: string
      context: string
      preferences?: string
    }) => {
      // Fetch user profile and collection
      const profile = await prisma.userProfile.findUnique({ where: { userId } })
      const collection = await prisma.user_collection.findMany({
        where: { user_id: userId },
        include: { product: true },
      })

      // This tool primarily provides data to the LLM to help it reason.
      // The LLM will then use search_products to fill gaps.
      return {
        profile,
        ownedProducts: collection.map((item) => item.product),
        context,
        preferences,
      }
    },
  },

  find_dupes: {
    description:
      'Find similar products (dupes) for a given product based on shade, finish, and formula.',
    parameters: z.object({
      productId: z.string().describe('The ID of the product to find dupes for'),
    }),
    execute: async ({ productId }: { productId: string }) => {
      const supabase = await createClient()
      const product = await prisma.product.findUnique({
        where: { id: productId },
      })
      if (!product) throw new Error('Product not found')

      // Use vector search to find similar products in the same category
      const { data: dupes, error } = await supabase.rpc('match_products', {
        query_embedding: product.embedding, // Use existing embedding
        match_threshold: 0.7,
        match_count: 5,
      })

      if (error) {
        console.error('Dupe search error:', error)
        return []
      }

      return dupes
    },
  },

  calculate_budget: {
    description:
      'Calculate the total estimated cost for a set of recommended products.',
    parameters: z.object({
      productIds: z
        .array(z.string())
        .describe('List of product IDs to calculate the total for'),
    }),
    execute: async ({ productIds }: { productIds: string[] }) => {
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      })

      const total = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0)

      return {
        total: total.toFixed(2),
        currency: 'USD',
        itemCount: products.length,
        details: products.map((p) => ({
          name: p.product_name,
          price: p.price,
        })),
      }
    },
  },
}
