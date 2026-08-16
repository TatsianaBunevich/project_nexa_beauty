'use client'

import React from 'react'
import { motion } from 'framer-motion'

const insights = [
  {
    label: 'Your Palette',
    value: 'Warm',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    label: 'Most Used',
    value: 'Lip Products',
    color: 'bg-rose-100 text-rose-700',
  },
  {
    label: 'Your Finish',
    value: 'Natural Glow',
    color: 'bg-stone-100 text-stone-600',
  },
  {
    label: 'Collection Overlap',
    value: '12%',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'Potential Additions',
    value: '3',
    color: 'bg-green-100 text-green-700',
  },
]

export function AIInsights() {
  return (
    <section className="bg-espresso overflow-hidden py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-espresso mb-4 font-serif text-4xl font-bold lg:text-6xl">
            Beauty intelligence, <br />
            <span className="font-medium italic opacity-70">
              not beauty noise.
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-400">
            Understand your habits and optimize your spending with data-driven
            beauty insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-3xl border border-stone-800 bg-stone-900/50 p-8 text-center transition-colors duration-300 hover:bg-stone-800"
            >
              <div className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-500">
                {insight.label}
              </div>
              <div className="font-serif text-2xl font-bold text-white">
                {insight.value}
              </div>
              <div
                className={`mx-auto mt-4 h-1 w-12 rounded-full ${insight.color.split(' ')[0]} opacity-50 transition-opacity group-hover:opacity-100`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
