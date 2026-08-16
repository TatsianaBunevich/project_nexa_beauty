'use client'

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    step: '01',
    title: 'Tell Nexa about you',
    desc: 'Your preferences, style and beauty goals.',
  },
  {
    step: '02',
    title: 'Connect your collection',
    desc: 'Add the products you already own.',
  },
  {
    step: '03',
    title: 'Ask anything',
    desc: 'Chat with your personal AI beauty copilot.',
  },
  {
    step: '04',
    title: 'Get personalized answers',
    desc: 'Recommendations, looks and insights tailored to you.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-ivory overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-espresso mb-4 font-serif text-4xl font-bold lg:text-6xl">
            How it works.
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-8 top-0 hidden w-px bg-stone-200 sm:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative flex flex-col items-start gap-8 pl-16 sm:flex-row sm:pl-20"
              >
                <div className="absolute left-8 top-0 z-10 hidden h-16 w-16 -translate-x-1/2 items-center justify-center sm:flex">
                  <div className="text-espresso flex h-16 w-16 items-center justify-center rounded-full border border-stone-200 bg-white font-serif font-bold shadow-sm">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-espresso mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white font-serif font-bold sm:hidden">
                    {step.step}
                  </div>
                  <h3 className="text-espresso mb-2 font-serif text-2xl font-bold">
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
