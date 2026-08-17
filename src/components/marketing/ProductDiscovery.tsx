'use client'

import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export function ProductDiscovery() {
  return (
    <section className="overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <picture className="overflow-hidden rounded-3xl border border-stone-100 bg-stone-50 shadow-2xl">
              <img
                src="/images/img_app_options.jpg"
                alt="Nexa Beauty app options interface"
                className="h-auto w-full object-cover"
              />
            </picture>
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
