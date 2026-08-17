'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function FinalCTA() {
  return (
    <section className="bg-espresso relative overflow-hidden py-32 text-white">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-20">
        <div className="absolute left-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full bg-beauty-rose blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[50%] w-[50%] rounded-full bg-amber-500 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-espresso mb-8 font-serif text-5xl font-bold lg:text-8xl"
        >
          Your beauty era <br />
          <span className="font-medium italic opacity-70">starts here.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-stone-400"
        >
          A smarter way to discover, organize and experience beauty. Join the
          future of personalized cosmetics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="text-espresso min-w-72 rounded-full border-stone-600 bg-stone-200 px-8 py-6 text-base font-medium transition-all hover:bg-stone-400 hover:text-stone-100"
              >
                Start with Nexa
              </Button>
            </Link>
            <Link href="#experience">
              <Button
                variant="outline"
                size="lg"
                className="text-espresso min-w-72 rounded-full border-stone-300 px-8 py-6 text-base font-medium transition-all hover:bg-stone-100"
              >
                Explore the experience
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-xs font-medium uppercase tracking-widest text-stone-500">
            Your personal AI beauty copilot.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
