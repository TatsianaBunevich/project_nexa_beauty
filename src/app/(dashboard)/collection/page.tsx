import { prisma } from '@/lib/prisma'
import { CollectionClient } from '@/components/collection/CollectionClient'

export default async function CollectionPage() {
  // In a real app, we would get the userId from the session
  const user = await prisma.users.findFirst()

  const products = await prisma.user_collection.findMany({
    where: {
      user_id: user?.id || '00000000-0000-0000-0000-000000000000',
    },
    include: {
      product: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">My Inventory</h1>
          <p className="text-muted-foreground">Manage your beauty collection and track expiration dates.</p>
        </div>
      </div>

      <CollectionClient initialProducts={products} />
    </div>
  )
}
