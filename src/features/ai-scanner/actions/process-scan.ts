'use server'

import { generateObject } from 'ai'
import { createOpenAI } from '@ai-sdk/openai';
import { scanSchema } from '../types/scanner'

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function processScan(imageUrl: string) {
  try {
    // Fetch the image and convert to base64 to avoid URL serialization issues
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) throw new Error(`Failed to fetch image: ${imageResponse.statusText}`)

    const { object } = await generateObject({
      model: openrouter('openrouter/free'),
      mode: 'json',
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
          { type: 'text', text: 'Analyze this makeup product.' },
          { 
            type: 'file', 
            data: new URL(imageUrl), 
            mediaType: 'image/jpeg'  
          },
        ],
        },
      ],
    });

    return { success: true, data: object }
  } catch (error) {
    console.error('AI Scan Error:', error)
    return { success: false, error: 'Failed to analyze image' }
  }
}
