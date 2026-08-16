'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, User, Bot, ShoppingBag, LayoutDashboard } from 'lucide-react'

export function HeroUIPreview() {
  return (
    <div className="text-espresso relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-stone-200 bg-white p-4 font-sans shadow-2xl md:aspect-[16/10]">
      {/* Mock Dashboard Header */}
      <div className="mb-6 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          Beauty OS v0.1
        </div>
        <div className="h-6 w-6 rounded-full bg-stone-200" />
      </div>

      <div className="grid h-[calc(100%-40px)] grid-cols-12 gap-4">
        {/* Sidebar Mock */}
        <div className="col-span-3 hidden border-r border-stone-100 pr-4 md:block">
          <div className="space-y-3">
            <div className="h-4 w-full rounded-full bg-stone-100" />
            <div className="h-4 w-3/4 rounded-full bg-stone-50" />
            <div className="h-4 w-1/2 rounded-full bg-stone-50" />
            <div className="mt-8 h-4 w-full rounded-full bg-stone-100" />
            <div className="h-4 w-3/4 rounded-full bg-stone-50" />
          </div>
        </div>

        {/* Main Content Mock */}
        <div className="col-span-12 space-y-6 md:col-span-9">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold">
              Good Morning, Elena
            </h3>
            <div className="flex gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100">
                <LayoutDashboard className="h-4 w-4 text-stone-400" />
              </div>
            </div>
          </div>

          {/* AI Chat Preview */}
          <div className="space-y-4 rounded-xl border border-stone-100 bg-stone-50 p-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200">
                <User className="h-4 w-4 text-stone-500" />
              </div>
              <div className="max-w-xs rounded-2xl rounded-tl-none border border-stone-100 bg-white p-2 text-xs">
                I&apos;m wearing a green silk dress for a wedding. What look
                fits?
              </div>
            </div>
            <div className="flex flex-row-reverse gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-800">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="max-w-xs rounded-2xl rounded-tr-none bg-stone-800 p-2 text-xs text-white">
                For olive skin and green silk, I recommend a soft bronze gaze
                with a warm nude lip.
              </div>
            </div>
          </div>

          {/* Product Match Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-3">
              <div className="h-12 w-12 rounded-lg bg-stone-100" />
              <div>
                <div className="text-xs font-bold">Champagne Glow</div>
                <div className="text-[10px] font-medium text-green-600">
                  98% Match
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-stone-100 bg-white p-3">
              <div className="h-12 w-12 rounded-lg bg-stone-100" />
              <div>
                <div className="text-xs font-bold">Satin Nude</div>
                <div className="text-[10px] font-medium text-green-600">
                  92% Match
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-10 top-1/4 flex items-center gap-1 rounded-full border border-stone-100 bg-white/90 px-3 py-1 text-[10px] font-medium shadow-lg backdrop-blur"
      >
        <Sparkles className="h-3 w-3 text-amber-500" />
        Warm Olive
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-1/4 left-10 flex items-center gap-1 rounded-full border border-stone-100 bg-white/90 px-3 py-1 text-[10px] font-medium shadow-lg backdrop-blur"
      >
        <ShoppingBag className="h-3 w-3 text-stone-400" />3 products matched
      </motion.div>
    </div>
  )
}
