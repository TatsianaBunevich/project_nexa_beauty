'use client'

import React from 'react'
import { motion } from 'framer-motion'

const looks = [
  {
    title: 'Soft Sculpt',
    desc: 'Minimal, luminous, warm.',
    image: '/images/img_soft_sculpt.jpg',
  },
  {
    title: 'Golden Hour',
    desc: 'Bronzed skin, warm eyes, glossy lips.',
    image: '/images/img_golden_hour.jpg',
  },
  {
    title: 'Modern Romance',
    desc: 'Soft blush, defined eyes, muted rose lips.',
    image: '/images/img_modern_romance.jpg',
  },
  {
    title: 'After Dark',
    desc: 'Smoky eyes, sculpted skin, statement lip.',
    image: '/images/img_after_dark.jpg',
  },
]

export function LookGallery() {
  return (
    <section className="bg-ivory overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-espresso mb-4 font-serif text-4xl font-bold lg:text-6xl">
            From inspiration <br />
            <span className="font-medium italic opacity-70">to your look.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {looks.map((look, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl"
            >
              <div
                className={`absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-110`}
                style={{ backgroundImage: `url(${look.image})` }}
              />

              <div className="from-espresso/80 absolute inset-0 bg-gradient-to-t from-slate-600/60 to-slate-100/10" />

              <div className="absolute left-0 top-2/3 p-6 text-white">
                <h3 className="mb-2 font-serif text-2xl font-bold">
                  {look.title}
                </h3>
                <p className="translate-y-2 transform text-sm text-stone-300 opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {look.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
