import OpenAI from 'openai'

export const openrouter = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    'X-Title': 'Nexa Beauty Copilot',
  },
})

// export const OPENROUTER_MODEL =
//   process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet'
export const OPENROUTER_MODEL = 'openrouter/free'

export async function generateOpenRouterResponse(params: {
  messages: any[]
  tools?: any[]
  responseFormat?: any
}) {
  try {
    const response = await openrouter.chat.completions.create({
      model: OPENROUTER_MODEL,
      messages: params.messages,
      tools: params.tools,
      response_format: params.responseFormat,
    })

    return response
  } catch (error) {
    console.error('[OpenRouter] API Error:', error)
    throw error
  }
}
