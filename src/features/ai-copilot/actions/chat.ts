import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { tools as copilotTools } from '@/features/ai-copilot/lib/tools'
import { auth } from '@/lib/auth' // Assuming auth helper exists to get current user
import { createOpenAI } from '@ai-sdk/openai'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
})

export async function copilotChat(input: { messages: any[] }) {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const userId = session.user.id

  return streamText({
    model: openrouter('openrouter/free'),
    system: `You are the Nexa Beauty Copilot, a world-class luxury beauty expert and personal makeup artist.
Your goal is to help users optimize their makeup collection and create stunning looks.

Guidelines:
1. **Reasoning Chain**: Always follow this logic:
   - Check the User's Profile (skin tone, eye color) using 'create_makeup_look'.
   - Analyze their current collection using 'analyze_collection'.
   - Search for complementary products using 'search_products' if their collection is missing key items.
   - Provide a reasoned recommendation, explaining WHY a product suits their specific features.
   - If suggesting new purchases, use 'calculate_budget' to provide a total.

2. **Tone**: Professional, elegant, encouraging, and highly personalized.
3. **Personalization**: Reference the user's skin tone and eye color in every recommendation.
4. **Precision**: Be specific about shades and finishes (e.g., "a satin champagne gold" instead of "a gold eyeshadow").

You have access to the user's personal beauty profile and their inventory. Use them to make your advice truly personal.`,
    messages: input.messages,
    tools: {
      search_products: {
        description: copilotTools.search_products.description,
        parameters: copilotTools.search_products.parameters,
        execute: async ({ query }) => {
          return await copilotTools.search_products.execute({ query, userId })
        },
      },
      analyze_collection: {
        description: copilotTools.analyze_collection.description,
        parameters: copilotTools.analyze_collection.parameters,
        execute: async () => {
          return await copilotTools.analyze_collection.execute({ userId })
        },
      },
      create_makeup_look: {
        description: copilotTools.create_makeup_look.description,
        parameters: copilotTools.create_makeup_look.parameters,
        execute: async ({ context, preferences }) => {
          return await copilotTools.create_makeup_look.execute({
            userId,
            context,
            preferences,
          })
        },
      },
      find_dupes: {
        description: copilotTools.find_dupes.description,
        parameters: copilotTools.find_dupes.parameters,
        execute: async ({ productId }) => {
          return await copilotTools.find_dupes.execute({ productId })
        },
      },
      calculate_budget: {
        description: copilotTools.calculate_budget.description,
        parameters: copilotTools.calculate_budget.parameters,
        execute: async ({ productIds }) => {
          return await copilotTools.calculate_budget.execute({ productIds })
        },
      },
    },
  })
}
