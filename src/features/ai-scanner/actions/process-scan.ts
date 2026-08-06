'use server'

import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { scanSchema } from '../types/scanner'

export async function processScan(imageUrl: string) {
  try {
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: scanSchema,
      system: `You are a professional cosmetic expert and product analyst. Your task is to analyze images of makeup and skincare products and extract precise metadata.

      Guidelines:
      1. Brand: Identify the brand exactly as written (e.g., "Fenty Beauty", not "Fenty").
      2. Product Name: Extract the full product name (e.g., "Pro Filt'r Soft Matte Poreless Foundation").
      3. Category: Classify into a standard category (e.g., Lipstick, Foundation, Mascara, Blush).
      4. Shade: Identify the specific shade name or number.
      5. Finish: Identify the finish (e.g., Matte, Satin, Glossy, Dewy).
      6. Price: Estimate the retail price based on the brand and category if not explicitly visible.
      7. Expiration: Search for "EXP" or "Period After Opening" (PAO) symbols (e.g., 12M) and calculate a potential date.

      If a field is not found, return null.`,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Please analyze this makeup product image and extract the requested metadata.' },
            { type: 'image', image: imageUrl },
          ],
        },
      ],
    })

    return { success: true, data: object }
  } catch (error) {
    console.error('AI Scan Error:', error)
    return { success: false, error: 'Failed to analyze image' }
  }
}
