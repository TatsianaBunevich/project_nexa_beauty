'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bot, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const messages = [
  {
    role: 'user',
    content:
      'I have warm olive skin, brown eyes and a green dress for a wedding.',
  },
  {
    role: 'bot',
    content:
      "Let's build something elegant that complements the green without competing with it. I recommend focusing on warmth to enhance your olive undertones.",
  },
]

const recommendations = [
  { name: 'Soft bronze eyes', detail: 'Adds depth and warmth' },
  { name: 'Neutral peach blush', detail: 'Freshens the complexion' },
  { name: 'Warm nude lip', detail: 'Balances the bold dress color' },
]

export function AICopilotPreview() {
  return (
    <section id="copilot" className="bg-ivory relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-espresso mb-6 font-serif text-4xl font-bold lg:text-6xl">
              Meet your <br />
              <span className="font-medium italic opacity-70">
                beauty copilot.
              </span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              Ask anything about your routine, your collection, or a specific
              event. Nexa provides reasoned, personalized beauty intelligence.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-espresso rounded-full px-8 py-6 text-white transition-all hover:bg-stone-800"
              >
                Chat with Nexa
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Mock Chat Interface */}
            <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-stone-100 bg-stone-50 p-4">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-xs font-medium text-muted-foreground">
                  Nexa Beauty Copilot
                </span>
              </div>

              <div className="space-y-6 p-6">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.5 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-stone-200' : 'bg-stone-800 text-white'}`}
                    >
                      {msg.role === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'text-espresso rounded-tr-none bg-stone-100' : 'text-espresso rounded-tl-none border border-stone-100 bg-stone-50'}`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {/* Recommendations Block */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  className="bg-champagne/30 border-champagne/50 mt-8 space-y-4 rounded-2xl border p-4"
                >
                  <div className="text-espresso flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    Recommended Look
                  </div>
                  <div className="space-y-2">
                    {recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-espresso font-medium">
                          {rec.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {rec.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-champagne/50 border-t pt-4">
                    <div className="text-espresso mb-1 text-[10px] font-bold uppercase">
                      Why it works
                    </div>
                    <p className="text-xs italic leading-relaxed text-muted-foreground">
                      {`"Warm metallic tones enhance your olive undertone while keeping the green dress as the focal point."`}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Background blur for depth */}
            <div className="absolute inset-0 -z-10 scale-110 transform rounded-full bg-beauty-rose/10 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
