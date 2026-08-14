import { prisma } from '@/lib/prisma'
import { CollectionClient } from '@/components/collection/CollectionClient'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CollectionPage() {
  const { user, error } = await auth()
  if (error || !user) redirect('/login')

  const products = await prisma.user_collection.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      product: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Inventory</h1>
          <p className="text-muted-foreground">
            Manage your beauty collection and track expiration dates.
          </p>
        </div>
      </div>

      <CollectionClient initialProducts={products} />
    </div>
  )
}
