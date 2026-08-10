import { z } from 'zod';
import { productRepository } from '@/lib/data/products';

export const findDupesSchema = z.object({
  productId: z.string().describe('The ID of the product to find dupes for'),
});

export async function findDupes(args: z.infer<typeof findDupesSchema>) {
  console.log('[Tool] find_dupes:', args);
  return await productRepository.findSimilar(args.productId);
}

export const findDupesTool = {
  type: 'function',
  function: {
    name: 'find_dupes',
    description: 'Find similar products (dupes) for a given product based on shade, finish, and formula.',
    parameters: findDupesSchema,
  },
};
