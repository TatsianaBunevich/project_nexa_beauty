import { z } from 'zod';
import { collectionRepository } from '@/lib/data/collections';

export const analyzeCollectionSchema = z.object({
  userId: z.string().describe('The ID of the user whose collection is being analyzed'),
});

export async function analyzeCollection(args: z.infer<typeof analyzeCollectionSchema>) {
  console.log('[Tool] analyze_collection:', args);
  return await collectionRepository.analyze(args.userId);
}

export const analyzeCollectionTool = {
  type: 'function',
  function: {
    name: 'analyze_collection',
    description: 'Analyze the user\'s current makeup collection to identify what they own and what is missing.',
    parameters: analyzeCollectionSchema,
  },
};
