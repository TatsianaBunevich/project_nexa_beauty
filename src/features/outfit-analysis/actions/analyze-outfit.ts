import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export async function analyzeOutfit(imagePath: string) {
  const { object } = await generateObject({
    model: google('gemini-1.5-flash'),
    schema: z.object({
      analysis: z.object({
        colors: z.array(z.string()).describe('Primary and accent colors of the outfit'),
        style: z.string().describe('The overall style (e.g., Minimalist, Bohemian, Edgy)'),
        occasion: z.string().describe('The most likely occasion (e.g., Wedding, Business Meeting, Date Night)'),
        season: z.string().describe('The appropriate season (e.g., Spring, Summer, Autumn, Winter)'),
        mood: z.string().describe('The mood the outfit conveys (e.g., Confident, Romantic, Professional)'),
      }),
      recommendations: z.array(z.object({
        lookName: z.string().describe('Name of the look (e.g., Soft Glam, Bold Evening)'),
        description: z.string().describe('Overall goal of the look'),
        products: z.array(z.object({
          category: z.string().describe('Makeup category (e.g., Lipstick, Eyeshadow)'),
          shade: z.string().describe('Recommended shade and finish'),
          explanation: z.string().describe('Detailed explanation of why this specific choice harmonizes with the outfit'),
        })),
        overallReasoning: z.string().describe('General explanation of why this look works with the analyzed outfit'),
      })),
    }),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Analyze this outfit and recommend 2-3 makeup looks. For every product and the overall look, provide a detailed explanation based on the colors, style, and occasion of the outfit. Focus on color theory (e.g., complementary colors, contrast) and style harmony.' },
          { type: 'image', image: imagePath },
        ],
      },
    ],
  });

  return object;
}
