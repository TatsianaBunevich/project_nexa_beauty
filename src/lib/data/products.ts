import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { Product, ProductSearchQuery } from '@/types/product';

export interface ProductRepository {
  search(query: ProductSearchQuery): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  findSimilar(productId: string): Promise<Product[]>;
}

export const productRepository: ProductRepository = {
  async search(params: ProductSearchQuery) {
    const { query, category, brand, shade, limit = 10 } = params;

    // 1. Keyword Search using Prisma
    const keywordResults = await prisma.product.findMany({
      where: {
        AND: [
          query ? {
            OR: [
              { product_name: { contains: query, mode: 'insensitive' } },
              { brand: { contains: query, mode: 'insensitive' } },
              { category: { contains: query, mode: 'insensitive' } },
            ],
          } : {},
          category ? { category: { equals: category } } : {},
          brand ? { brand: { equals: brand } } : {},
          shade ? { shade: { contains: shade, mode: 'insensitive' } } : {},
        ],
      },
      take: limit,
    });

    // 2. Vector Search using Supabase RPC
    // In a real app, we would generate an embedding for the query here.
    // For MVP, we use a placeholder or empty array if no embedding is provided.
    let vectorResults: any[] = [];
    try {
      const { data, error } = await supabase.rpc('match_products', {
        query_embedding: [], // Placeholder for actual embedding
        match_threshold: 0.5,
        match_count: limit,
      });

      if (error) {
        console.error('[ProductRepo] Vector search error:', error);
      } else {
        vectorResults = data || [];
      }
    } catch (e) {
      console.error('[ProductRepo] Vector search crash:', e);
    }

    // Combine and deduplicate
    const allProducts = [...keywordResults, ...vectorResults];
    const uniqueProducts = Array.from(
      new Map(allProducts.map((p) => [p.id, p])).values()
    );

    return uniqueProducts.slice(0, limit);
  },

  async getById(id: string) {
    if (!id || typeof id !== 'string') {
      return null;
    }
    try {
      return await prisma.product.findUnique({
        where: { id },
      });
    } catch (e) {
      console.error('[ProductRepo] getById error:', e);
      return null;
    }
  },

  async findSimilar(productId: string) {
    if (!productId || typeof productId !== 'string') {
      return [];
    }

    try {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product || !product.embedding) {
        return [];
      }

      const { data, error } = await supabase.rpc('match_products', {
        query_embedding: product.embedding,
        match_threshold: 0.7,
        match_count: 10,
      });

      if (error) {
        console.error('[ProductRepo] Similarity search error:', error);
        return [];
      }

      return data || [];
    } catch (e) {
      console.error('[ProductRepo] findSimilar error:', e);
      return [];
    }
  },
};
