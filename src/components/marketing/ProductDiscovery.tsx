'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function ProductDiscovery() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full bg-stone-100">
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-200 to-stone-100" />
              <div className="absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 rotate-12 rounded-2xl border border-stone-100 bg-white p-4 shadow-xl">
                  <div className="mb-2 h-4 w-1/2 rounded bg-stone-100" />
                  <div className="mb-2 h-24 w-full rounded-lg bg-stone-200" />
                  <div className="h-3 w-3/4 rounded bg-stone-100" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-espresso mb-6 font-serif text-4xl font-bold lg:text-6xl">
              Find what <br />
              <span className="font-medium italic opacity-70">
                actually fits you.
              </span>
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              No more trial and error. Nexa analyzes your undertones, skin type
              and existing collection to recommend products with scientific
              precision.
            </p>

            <div className="bg-ivory max-w-md rounded-3xl border border-stone-200 p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  AI recommendation
                </span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-600">
                  94% Match
                </span>
              </div>
              <div className="text-espresso mb-2 font-serif text-xl font-bold">
                Soft Matte Lip Color
              </div>
              <div className="mb-6 text-sm italic text-muted-foreground">
                A velvety finish that complements your warm-neutral palette.
              </div>

              <div className="space-y-3">
                {[
                  'Complements your undertone',
                  'Fits your preferred finish',
                  'Works with your existing palette',
                ].map((reason, i) => (
                  <div
                    key={i}
                    className="text-espresso flex items-center gap-2 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {reason}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
