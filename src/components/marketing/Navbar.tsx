'use client'

import React, { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-stone-200 bg-white/80 py-3 backdrop-blur-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-espresso font-serif text-xl font-bold tracking-tight"
        >
          NEXA BEAUTY
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link
            href="#experience"
            className="hover:text-espresso transition-colors"
          >
            Experience
          </Link>
          <Link
            href="#copilot"
            className="hover:text-espresso transition-colors"
          >
            AI Copilot
          </Link>
          <Link
            href="#collection"
            className="hover:text-espresso transition-colors"
          >
            Collection
          </Link>
          <Link
            href="#features"
            className="hover:text-espresso transition-colors"
          >
            Features
          </Link>
        </div>

        <Button
          variant="outline"
          className="border-espresso text-espresso hover:bg-espresso rounded-full px-6 py-2 transition-all duration-300 hover:text-white"
          onClick={() => startTransition(() => router.push('/dashboard'))}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </>
          ) : (
            'Try Nexa'
          )}
        </Button>
      </div>
    </motion.nav>
  )
}
