import { generateOpenRouterResponse } from './openrouter'
import { COPILOT_SYSTEM_PROMPT } from './prompts/copilot-system'
import { retrieveBeautyContext } from './rag/context'
import { getBeautyProfile } from '@/features/ai-copilot/actions/profile'
import {
  CopilotMessage,
  CopilotResponse,
  CopilotRequest,
} from '../../types/copilot'

import { searchProducts, searchProductsTool } from './tools/search-products'
import {
  analyzeCollection,
  analyzeCollectionTool,
} from './tools/analyze-collection'
import {
  createMakeupLook,
  createMakeupLookTool,
} from './tools/create-makeup-look'
import { findDupes, findDupesTool } from './tools/find-dupes'
import { calculateBudget, calculateBudgetTool } from './tools/calculate-budget'
import { z } from 'zod'

const MAX_ITERATIONS = 5

const ALL_TOOLS = [
  searchProductsTool,
  analyzeCollectionTool,
  createMakeupLookTool,
  findDupesTool,
  calculateBudgetTool,
]

const TOOL_MAP: Record<string, (args: any) => Promise<any>> = {
  search_products: searchProducts,
  analyze_collection: analyzeCollection,
  create_makeup_look: createMakeupLook,
  find_dupes: findDupes,
  calculate_budget: calculateBudget,
}

const ResponseSchema = z.object({
  message: z.string(),
  recommendations: z.array(z.any()),
  look: z.any().nullable(),
  products: z.array(z.any()),
  toolsUsed: z.array(z.string()),
})

export class CopilotAgent {
  async run(
    request: CopilotRequest,
    history: CopilotMessage[] = []
  ): Promise<CopilotResponse> {
    const { userId, message } = request

    console.log(`[CopilotAgent] Starting run for user ${userId}`)

    // 1. Augment initial prompt with RAG context and User Profile
    const beautyContext = await retrieveBeautyContext(message)
    const profile = await getBeautyProfile()

    const profileContext = profile
      ? `User Beauty Profile:
       - Skin Tone: ${profile.skinTone}
       - Eye Color: ${profile.eyeColor}
       - Skin Type: ${profile.skinType}
       - Preferred Style: ${profile.preferredStyle}`
      : 'User beauty profile is not yet set up.'

    let currentMessages: any[] = [
      {
        role: 'system',
        content: `${COPILOT_SYSTEM_PROMPT}\n\n${profileContext}\n\n${beautyContext}`,
      },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ]

    const toolsUsed = new Set<string>()
    let iteration = 0

    while (iteration < MAX_ITERATIONS) {
      iteration++
      console.log(`[CopilotAgent] Iteration ${iteration}`)

      const response = await generateOpenRouterResponse({
        messages: currentMessages,
        tools: ALL_TOOLS,
      })

      const messageContent = response.choices[0].message

      if (messageContent.tool_calls) {
        for (const toolCall of messageContent.tool_calls) {
          const toolName = toolCall.function.name
          const args = JSON.parse(toolCall.function.arguments)

          console.log(`[CopilotAgent] Tool call: ${toolName}`)
          toolsUsed.add(toolName)

          const toolFn = TOOL_MAP[toolName]
          if (!toolFn) {
            throw new Error(`Tool ${toolName} not found`)
          }

          // Ensure userId is passed to tools that need it
          const toolArgs = { ...args, userId }
          const result = await toolFn(toolArgs)

          currentMessages.push(messageContent)
          currentMessages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(result),
          })
        }
      } else {
        // Final response reached
        const finalContent = messageContent.content || ''

        // The agent should return a structured JSON string that we can parse.
        // We'll prompt the agent to return JSON in the system prompt, but for robustness,
        // we can try to parse it or fallback to a default structure.

        let parsedResponse
        try {
          // If the LLM returned a JSON block
          const jsonMatch = finalContent.match(/\\{.*\\}/s)
          const jsonString = jsonMatch ? jsonMatch[0] : finalContent
          parsedResponse = JSON.parse(jsonString)
        } catch (e) {
          console.warn(
            '[CopilotAgent] Failed to parse final response as JSON, using fallback'
          )
          parsedResponse = {
            message: finalContent,
            recommendations: [],
            look: null,
            products: [],
            toolsUsed: Array.from(toolsUsed),
          }
        }

        const validated = ResponseSchema.parse(parsedResponse)

        return {
          ...validated,
          look: validated.look ?? null,
          conversationId: request.conversationId || 'new-session',
        }
      }
    }

    throw new Error('CopilotAgent exceeded maximum tool-call iterations')
  }
}
