'use server'

import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { createOpenAI } from '@ai-sdk/openai'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
})

const insightsSchema = z.object({
  insights: z
    .array(z.string())
    .describe('A list of natural language beauty collection insights'),
})

export async function generateAIInsights() {
  try {
    // Get user's collection
    const user = await prisma.users.findFirst()
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    const collection = await prisma.user_collection.findMany({
      where: { user_id: userId },
      include: { product: true },
    })

    const products = collection.map((item) => item.product).filter(Boolean)

    if (products.length === 0) {
      return {
        success: false,
        error: 'Your collection is empty. Scan some products first!',
      }
    }

    // Create a summary for the AI
    const summary = products
      .map(
        (p) =>
          `${p.brand} ${p.product_name} (${p.category}, ${p.shade}, ${p.finish})`
      )
      .join('\n')

    const { object } = await generateObject({
      model: openrouter('openrouter/free'),
      schema: insightsSchema,
      system: `You are a luxury beauty consultant. Analyze the user's makeup collection and provide 3-5 high-value, natural language insights.

      Focus on:
      1. Redundancies (e.g., too many similar shades of the same product type).
      2. Gaps (e.g., missing a basic category like "neutral eyeshadow").
      3. Optimization (e.g., suggestions based on the collection's theme).

      Make the tone professional yet encouraging.`,
      prompt: `Here is the user's current collection:\n\n${summary}\n\nPlease provide the insights.`,
    })

    return { success: true, data: object.insights }
  } catch (error) {
    console.error('AI Insights Error:', error)
    return { success: false, error: 'Failed to generate AI insights' }
  }
}
