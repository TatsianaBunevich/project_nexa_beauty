'use server'

import { prisma } from '@/lib/prisma'

export async function getDashboardStats() {
  // In a real app, get userId from session
  const user = await prisma.users.findFirst()
  const userId = user?.id || '00000000-0000-0000-0000-000000000000'

  const collection = await prisma.user_collection.findMany({
    where: { user_id: userId },
    include: { product: true },
  })

  const products = collection.map(item => item.product).filter(Boolean)

  // 1. Total Products
  const totalProducts = products.length

  // 2. Most Used Category
  const categoryCounts: Record<string, number> = {}
  products.forEach(p => {
    const cat = p.category || 'Unknown'
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
  })
  const mostUsedCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

  // 3. Unused Products (mocked since we don't have last_used_at fully integrated in UI yet)
  const unusedProducts = products.filter(() => Math.random() > 0.7).length

  // 4. Duplicates (same brand and category)
  const productMap: Record<string, number> = {}
  products.forEach(p => {
    const key = `${p.brand}-${p.category}`
    productMap[key] = (productMap[key] || 0) + 1
  })
  const duplicates = Object.values(productMap).filter(count => count > 1).length

  // 5. Expiration Warnings (expiring in next 90 days)
  const ninetyDaysFromNow = new Date()
  ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90)

  const expiringSoon = products.filter(p => {
    if (!p.estimated_expiration) return false
    const exp = new Date(p.estimated_expiration)
    return exp <= ninetyDaysFromNow
  }).length

  return {
    totalProducts,
    mostUsedCategory,
    unusedProducts,
    duplicates,
    expiringSoonCount: expiringSoon,
  }
}
