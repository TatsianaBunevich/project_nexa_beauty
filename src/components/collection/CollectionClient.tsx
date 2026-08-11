'use client'

import * as React from 'react'
import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { LayoutGrid, List, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { deleteCollectionItem } from '@/features/collection/actions/delete-item'
import { useTransition } from 'react'

interface CollectionClientProps {
  initialProducts: any[]
}

function getStorageImageUrl(pathOrUrl: string | null): string | null {
  if (!pathOrUrl) return null
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  const baseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hdljtcyuzexuehioebru.supabase.co').replace(/\/$/, '')
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl.slice(1) : pathOrUrl

  if (cleanPath.startsWith('cosmetic-scans/')) {
    return `${baseUrl}/storage/v1/object/public/${cleanPath}`
  }

  if (cleanPath.startsWith('scans/')) {
    return `${baseUrl}/storage/v1/object/public/cosmetic-scans/${cleanPath}`
  }

  return `${baseUrl}/storage/v1/object/public/cosmetic-scans/scans/${cleanPath}`
}

export function CollectionClient({ initialProducts }: CollectionClientProps) {
  const [isPending, startTransition] = useTransition()
  const [viewMode, setViewMode] = useState<'gallery' | 'table'>('gallery')
  const [searchQuery, setSearchQuery] = useState('')
  const [brandFilter, setBrandFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [finishFilter, setFinishFilter] = useState('all')

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to remove this item from your collection?')) {
      return
    }

    startTransition(async () => {
      const result = await deleteCollectionItem(itemId)
      if (!result.success) {
        alert(result.error || 'An error occurred while deleting the item.')
      }
    })
  }

  // Extract unique values for filters
  const brands = useMemo(() =>
    Array.from(new Set(initialProducts.map(p => p.product?.brand).filter(Boolean))).sort(),
  [initialProducts])

  const categories = useMemo(() =>
    Array.from(new Set(initialProducts.map(p => p.product?.category).filter(Boolean))).sort(),
  [initialProducts])

  const finishes = useMemo(() =>
    Array.from(new Set(initialProducts.map(p => p.product?.finish).filter(Boolean))).sort(),
  [initialProducts])

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter(item => {
        const product = item.product
        if (!product) return false

        const matchesSearch =
          product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.shade && product.shade.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesBrand = brandFilter === 'all' || product.brand === brandFilter
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
        const matchesFinish = finishFilter === 'all' || product.finish === finishFilter

        return matchesSearch && matchesBrand && matchesCategory && matchesFinish
      })
  }, [initialProducts, searchQuery, brandFilter, categoryFilter, finishFilter])

  const getExpirationBadge = (dateString: string | null) => {
    if (!dateString) return null

    const expirationDate = new Date(dateString)
    const today = new Date()
    const diffTime = expirationDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return <Badge variant="destructive">Expired</Badge>
    if (diffDays < 90) return <Badge variant="warning">Expiring Soon</Badge>
    return <Badge variant="success">Fresh</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-muted/30 p-4 rounded-xl border">
        <div className="flex flex-wrap gap-3 items-end w-full md:w-auto">
          <Input
            placeholder="Search products..."
            className="w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <Select label="Brand" value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
            <option value="all">All Brands</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </Select>

          <Select label="Category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>

          <Select label="Finish" value={finishFilter} onChange={(e) => setFinishFilter(e.target.value)}>
            <option value="all">All Finishes</option>
            {finishes.map(f => <option key={f} value={f}>{f}</option>)}
          </Select>
        </div>

        <div className="flex items-center gap-2 bg-background p-1 rounded-lg border">
          <button
            onClick={() => setViewMode('gallery')}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'gallery' ? "bg-muted shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === 'table' ? "bg-muted shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'gallery' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(item => (
            <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square relative bg-muted">
                {item.product?.image_url && getStorageImageUrl(item.product.image_url) && (
                  <Image
                    src={getStorageImageUrl(item.product.image_url)!}
                    alt={item.product.product_name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  {getExpirationBadge(item.product?.estimated_expiration)}
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                    className="p-1.5 bg-background/80 backdrop-blur-sm text-destructive hover:bg-destructive hover:text-background rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                    title="Remove from collection"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {item.product?.brand}
                </p>
                <h3 className="font-semibold text-sm line-clamp-1">
                  {item.product?.product_name}
                </h3>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    {item.product?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.product?.shade}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Shade</TableHead>
                <TableHead>Finish</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.product?.product_name}</TableCell>
                  <TableCell>{item.product?.brand}</TableCell>
                  <TableCell>{item.product?.category}</TableCell>
                  <TableCell>{item.product?.shade}</TableCell>
                  <TableCell>{item.product?.finish}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getExpirationBadge(item.product?.estimated_expiration)}
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending}
                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                        title="Remove from collection"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          No products match your current filters.
        </div>
      )}
    </div>
  )
}
