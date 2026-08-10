import { z } from 'zod';
import { userRepository } from '@/lib/data/users';
import { collectionRepository } from '@/lib/data/collections';

export const createMakeupLookSchema = z.object({
  userId: z.string().describe('The ID of the user'),
  occasion: z.string().describe('The occasion for the look (e.g., "wedding", "date night")'),
  outfit: z.string().optional().describe('Description of the outfit'),
  preferences: z.string().optional().describe('User preferences (e.g., "natural", "bold")'),
});

export async function createMakeupLook(args: z.infer<typeof createMakeupLookSchema>) {
  console.log('[Tool] create_makeup_look:', args);

  const profile = await userRepository.getProfile(args.userId);
  const collection = await collectionRepository.getByUserId(args.userId);

  return {
    profile,
    collection,
    occasion: args.occasion,
    outfit: args.outfit,
    preferences: args.preferences,
  };
}

export const createMakeupLookTool = {
  type: 'function',
  function: {
    name: 'create_makeup_look',
    description: 'Synthesize user profile, collection, and occasion into a detailed makeup look recommendation.',
    parameters: createMakeupLookSchema,
  },
};
