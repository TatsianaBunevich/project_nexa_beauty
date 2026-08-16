import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-stone-100 bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <div className="text-espresso mb-2 font-serif text-xl font-bold">
              NEXA BEAUTY
            </div>
            <div className="text-sm italic text-muted-foreground">
              &quot;Beauty, intelligently personalized.&quot;
            </div>
          </div>

          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <Link
              href="/product"
              className="hover:text-espresso transition-colors"
            >
              Product
            </Link>
            <Link
              href="/features"
              className="hover:text-espresso transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="hover:text-espresso transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-espresso transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-espresso transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-50 pt-8 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} Nexa Beauty. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
