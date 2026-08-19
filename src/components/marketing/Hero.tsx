'use client'

import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HeroUIPreview } from './HeroUIPreview'
import { Loader2 } from 'lucide-react'

export function Hero() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <section className="bg-ivory relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-48">
      {/* Background subtle glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2">
        <div className="bg-champagne/30 absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-beauty-rose/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            AI Beauty Copilot
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-espresso mb-6 font-serif text-5xl font-bold leading-tight lg:text-8xl"
          >
            Your beauty.
            <br />
            <span className="font-medium italic opacity-80">
              Intelligently personalized.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Nexa Beauty understands your collection, your preferences, your
            style — and helps you create better beauty decisions with AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="rounded-full bg-stone-800 px-8 py-6 text-base font-medium text-white transition-all hover:bg-stone-500"
              onClick={() => startTransition(() => router.push('/dashboard'))}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading
                </>
              ) : (
                'Try Nexa Beauty'
              )}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="relative"
        >
          <HeroUIPreview />

          {/* Decorative Elements */}
          <div className="absolute inset-0 -z-10 scale-90 transform rounded-full bg-stone-200/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  )
}
