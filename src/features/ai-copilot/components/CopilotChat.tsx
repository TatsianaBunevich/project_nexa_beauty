'use client'

import React from 'react'
import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sparkles, Send, User, Bot } from 'lucide-react'

export function CopilotChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/copilot/chat',
    })

  return (
    <div className="mx-auto flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center gap-2 border-b bg-muted/50 p-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="font-semibold">Nexa Beauty Copilot</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="py-10 text-center text-muted-foreground">
              <p>Hello! I'm your AI Beauty Expert. How can I help you today?</p>
              <p className="mt-2 text-sm">
                Try: "I have warm olive skin and a green dress for a wedding.
                Suggest a look!"
              </p>
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
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

                  {/* Tool call rendering would go here */}
                  {m.toolInvocations?.map((toolInvocation) => {
                    const { toolCallId, toolName, args } = toolInvocation
                    if (toolInvocation.state === 'result') {
                      return (
                        <div
                          key={toolCallId}
                          className="mt-2 rounded border bg-background/50 p-2 text-xs"
                        >
                          <strong>{toolName}</strong>:{' '}
                          {JSON.stringify(toolInvocation.result)}
                        </div>
                      )
                    } else {
                      return (
                        <div
                          key={toolCallId}
                          className="mt-2 animate-pulse rounded border bg-background/50 p-2 text-xs"
                        >
                          Using {toolName}...
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
        <Input
          value={input}
          onChange={handleInputChange}
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
