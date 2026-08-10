import { z } from 'zod';
import { productRepository } from '@/lib/data/products';
import { ProductSearchQuery, Product } from '@/types/product';

export const searchProductsSchema = z.object({
  query: z.string().describe('The search query for products (e.g., "nude lipstick", "gold eyeshadow")'),
  category: z.string().optional().describe('Product category (e.g., "Eyeshadow", "Lipstick")'),
  brand: z.string().optional().describe('Product brand'),
  shade: z.string().optional().describe('Specific shade name or color'),
  limit: z.number().optional().describe('Number of results to return'),
});

export async function searchProducts(args: z.infer<typeof searchProductsSchema>): Promise<Product[]> {
  console.log('[Tool] search_products:', args);
  return await productRepository.search(args);
}

export const searchProductsTool = {
  type: 'function',
  function: {
    name: 'search_products',
    description: 'Search for beauty products in the database. Use this to find products the user does not own.',
    parameters: searchProductsSchema,
  },
};
