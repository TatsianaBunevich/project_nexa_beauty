import { z } from 'zod';
import { productRepository } from '@/lib/data/products';

export const calculateBudgetSchema = z.object({
  productIds: z.array(z.string()).describe('List of product IDs to calculate the total for'),
});

export async function calculateBudget(args: z.infer<typeof calculateBudgetSchema>) {
  console.log('[Tool] calculate_budget:', args);

  let total = 0;
  const details = [];

  for (const id of args.productIds) {
    const product = await productRepository.getById(id);
    if (product) {
      const price = Number(product.price) || 0;
      total += price;
      details.push({ name: product.product_name, price });
    }
  }

  return {
    total: total.toFixed(2),
    currency: 'USD',
    itemCount: details.length,
    details,
  };
}

export const calculateBudgetTool = {
  type: 'function',
  function: {
    name: 'calculate_budget',
    description: 'Calculate the total estimated cost for a set of recommended products.',
    parameters: calculateBudgetSchema,
  },
};
