'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Package,
  Palette,
  Search,
  RotateCcw,
  Wallet,
} from 'lucide-react'

const features = [
  {
    title: 'AI Copilot',
    desc: 'Ask anything about your beauty routine.',
    icon: Sparkles,
  },
  {
    title: 'Smart Collection',
    desc: 'Know what you own and how to use it.',
    icon: Package,
  },
  {
    title: 'Personalized Looks',
    desc: 'Create looks around your features, outfit and occasion.',
    icon: Palette,
  },
  {
    title: 'Product Discovery',
    desc: 'Find products that actually make sense for you.',
    icon: Search,
  },
  {
    title: 'Smart Dupes',
    desc: 'Discover alternatives to products you love.',
    icon: RotateCcw,
  },
  {
    title: 'Beauty Budget',
    desc: 'Make smarter beauty purchases.',
    icon: Wallet,
  },
]

export function FeatureGrid() {
  return (
    <section id="features" className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="hover:bg-ivory group flex flex-col items-start rounded-3xl border border-transparent bg-stone-50 p-8 transition-colors duration-300 hover:border-stone-200"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="text-espresso h-6 w-6" />
              </div>
              <h3 className="text-espresso mb-3 font-serif text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
