'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Analytics', href: '/dashboard' },
    { name: 'Collection', href: '/collection' },
    { name: 'AI Scanner', href: '/scanner' },
    { name: 'AI Assistant', href: '/assistant' },
    { name: 'Looks', href: '/looks' },
    { name: 'Settings', href: '/settings' },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden',
          isSidebarOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r bg-muted/30 transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="pb-6 pt-4">
          <Link
            href="/"
            className="block px-6 text-xl font-bold tracking-tight text-secondary-foreground transition-opacity hover:opacity-90"
            onClick={() => setIsSidebarOpen(false)}
          >
            Nexa Beauty
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                'block rounded-md p-2 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="relative flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="-ml-2 mr-2 rounded-md p-2 transition-colors hover:bg-muted md:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="font-medium">Nexa OS</div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="h-8 w-8 rounded-full bg-primary transition-opacity hover:opacity-80" />
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
