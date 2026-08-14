'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sparkles, Send, User, Bot } from 'lucide-react'
import { CopilotResponse } from '@/types/copilot'

export function CopilotChat({ userId }: { userId: string }) {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string; data?: CopilotResponse }[]
  >([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          userId,
        }),
      })

      if (!response.ok) throw new Error('Failed to fetch')

      const data: CopilotResponse = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
          data: data,
        },
      ])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center gap-2 border-b bg-muted/50 p-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Nexa Beauty Copilot</h2>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="py-10 text-center text-muted-foreground">
              <p>
                Hello! I&apos;m your AI Beauty Expert. How can I help you today?
              </p>
              <p className="mt-2 text-sm">
                Try: &quot;I have warm olive skin and a green dress for a
                wedding. Suggest a look!&quot;
              </p>
            </div>
          )}
          {messages.map((m, index) => (
            <div
              key={index}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex max-w-[80%] gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                >
                  {m.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`rounded-2xl p-3 ${m.role === 'user' ? 'rounded-tr-none bg-primary text-primary-foreground' : 'rounded-tl-none bg-muted'}`}
                >
                  <p className="text-sm leading-relaxed">{m.content}</p>

                  {/* Structured Data Rendering */}
                  {m.data?.look && (
                    <div className="mt-3 rounded border bg-background/50 p-3 text-xs">
                      <div className="mb-1 font-bold text-primary">
                        ✨ Recommended Look: {m.data.look.name}
                      </div>
                      <div className="mb-2 italic text-muted-foreground">
                        {m.data.look.occasion}
                      </div>
                      <div className="space-y-1">
                        {m.data.look.steps.map((step, i) => (
                          <div key={i} className="flex gap-2">
                            <span className="font-semibold">
                              {step.category}:
                            </span>
                            <span>{step.instruction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {m.data?.products.length > 0 && (
                    <div className="mt-3 rounded border bg-background/50 p-3 text-xs">
                      <div className="mb-1 font-bold text-primary">
                        🛍️ Suggested Products
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {m.data.products.map((p, i) => (
                          <div key={i} className="flex justify-between">
                            <span>
                              {p.brand} {p.product_name}
                            </span>
                            <span className="font-mono">${p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {m.data?.toolsUsed.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {m.data.toolsUsed.map((tool, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-muted-foreground/10 px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {tool.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your beauty expert..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
