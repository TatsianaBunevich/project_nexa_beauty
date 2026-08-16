'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Package, Brain } from 'lucide-react'

const props = [
  {
    title: 'Your preferences',
    items: ['Skin tone', 'Style', 'Favorite products', 'Makeup habits'],
    icon: User,
    color: 'bg-beauty-rose/10 text-beauty-rose',
  },
  {
    title: 'Your collection',
    items: ['Products you own', 'Shades', 'Categories', 'Duplicates'],
    icon: Package,
    color: 'bg-stone-100 text-stone-500',
  },
  {
    title: 'AI intelligence',
    items: [
      'Recommendations',
      'Look creation',
      'Product discovery',
      'Personalized reasoning',
    ],
    icon: Brain,
    color: 'bg-yellow-200/20 text-amber-700',
  },
]

export function ValueProposition() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-espresso mb-4 font-serif text-4xl font-bold lg:text-6xl">
            Beauty is personal.
            <br />
            <span className="font-medium italic opacity-70">
              Your AI should be too.
            </span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-24">
          {/* Background Connector Line (Desktop) */}
          <div className="absolute left-0 top-1/2 z-0 hidden h-px w-full -translate-y-1/2 bg-stone-200 md:block" />

          {props.map((prop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="group relative z-10 flex flex-col items-center text-center"
            >
              <div
                className={`h-16 w-16 rounded-full ${prop.color} mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <prop.icon className="h-7 w-7" />
              </div>

              <h3 className="text-espresso mb-6 font-serif text-2xl font-bold">
                {prop.title}
              </h3>

              <ul className="space-y-3">
                {prop.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm font-medium text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
