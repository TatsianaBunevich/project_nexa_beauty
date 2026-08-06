import { z } from 'zod'

export const scanSchema = z.object({
  brand: z.string().nullable().describe("The brand of the cosmetic product"),
  name: z.string().nullable().describe("The full name of the product"),
  category: z.string().nullable().describe("The category (e.g., Lipstick, Foundation, Blush)"),
  shade: z.string().nullable().describe("The specific shade name or number"),
  finish: z.string().nullable().describe("The finish of the product (e.g., Matte, Dewy, Satin)"),
  estimatedPrice: z.number().nullable().describe("Estimated retail price in USD"),
  expirationDate: z.string().nullable().describe("Estimated expiration date in ISO format"),
  confidenceScore: z.number().min(0).max(1).describe("Confidence score of the extraction (0-1)"),
})

export type ScanResult = z.infer<typeof scanSchema>

export type ScannerState = 'IDLE' | 'UPLOADING' | 'SCANNING' | 'REVIEWING' | 'SAVING' | 'COMPLETED' | 'ERROR'
