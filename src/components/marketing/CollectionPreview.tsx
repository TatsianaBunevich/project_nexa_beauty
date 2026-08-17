'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const products = [
  {
    name: 'Rare Beauty Soft Pinch',
    shade: 'Joy',
    category: 'Blush',
    insight: 'Works beautifully with your warm-neutral palette.',
    img: '/images/img_rare_beauty_blush_joy.jpg',
  },
  {
    name: "Fenty Beauty Pro Filt'r",
    shade: '145',
    category: 'Foundation',
    insight: 'Perfect match for your olive undertone.',
    img: '/images/img_fenty_beauty_foundation_145.jpg',
  },
  {
    name: 'Dior Addict Lip Glow',
    shade: '001 Pink',
    category: 'Lip Balm',
    insight: 'Enhances your natural lip color.',
    img: '/images/img_dior_lip_balm_001.jpg',
  },
  {
    name: 'Huda Beauty Palette',
    shade: 'Nude',
    category: 'Eyeshadow',
    insight: 'Ideal for your brown eye color.',
    img: '/images/img_huda_beauty_eyeshadow_nude.jpg',
  },
  {
    name: 'Charlotte Tilbury Flawless',
    shade: 'Fair',
    category: 'Concealer',
    insight: 'Great coverage for your skin type.',
    img: '/images/img_charlotte_tilbury_concealer_fair.jpg',
  },
  {
    name: 'Too Faced Better Than Sex',
    shade: 'Black',
    category: 'Mascara',
    insight: 'Adds volume without clumping.',
    img: '/images/img_too_faced_mascara_black.jpg',
  },
]

export function CollectionPreview() {
  return (
    <section id="collection" className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="text-espresso mb-4 font-serif text-4xl font-bold lg:text-6xl">
            Your makeup,{' '}
            <span className="font-medium italic opacity-70">understood.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Stop guessing what you have. Nexa digitally organizes your
            collection and tells you exactly how to use it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative rounded-3xl border border-stone-100 bg-stone-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl"
            >
              <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-stone-200">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${product.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-stone-200/30" />
                <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 blur-xl" />
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {product.category}
                </div>
                <div className="text-espresso font-serif text-lg font-bold">
                  {product.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {product.shade}
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 rounded-xl border border-stone-100 bg-white p-3">
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                <p className="text-xs italic leading-relaxed text-muted-foreground">
                  {product.insight}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
