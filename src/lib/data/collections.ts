import { prisma } from '@/src/lib/prisma';
import { Product } from '@/types/product';

export interface CollectionAnalysis {
  ownedCount: number;
  categories: string[];
  products: Product[];
  summary: string;
}

export interface CollectionRepository {
  getByUserId(userId: string): Promise<Product[]>;
  analyze(userId: string): Promise<CollectionAnalysis>;
}

export const collectionRepository: CollectionRepository = {
  async getByUserId(userId: string) {
    const items = await prisma.user_collection.findMany({
      where: { userId },
      include: { product: true },
    });

    return items.map((item) => item.product);
  },

  async analyze(userId: string) {
    const items = await prisma.user_collection.findMany({
      where: { userId },
      include: { product: true },
    });

    const ownedProducts = items.map((item) => item.product);
    const categories = [
      ...new Set(ownedProducts.map((p) => p.category).filter(Boolean)),
    ];

    return {
      ownedCount: ownedProducts.length,
      categories,
      products: ownedProducts,
      summary: `The user owns ${ownedProducts.length} products across ${categories.length} categories.`,
    };
  },
};
