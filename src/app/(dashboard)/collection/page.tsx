import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

export default async function CollectionPage() {
  // In a real app, we would get the userId from the session
  // For now, we fetch the first user's collection as a demo
  const user = await prisma.users.findFirst()

  const items = await prisma.user_collection.findMany({
    where: {
      user_id: user?.id || '00000000-0000-0000-0000-000000000000',
    },
    include: {
      products: true,
    },
  })

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-12 border-2 border-dashed rounded-xl text-center text-muted-foreground">
        <h1 className="text-3xl font-bold mb-6 text-foreground">My Collection</h1>
        <p>Your collection is empty. Start scanning products!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">My Collection</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item: any) => {
          const product = item.products;
          if (!product) return null;
          return (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square relative bg-muted">
                {product.image_url && (
                  <Image
                    src={`https://hdljtcyuzexuehioebru.supabase.co/storage/v1/object/public/cosmetic-scans/${product.image_url}`}
                    alt={product.product_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-sm line-clamp-1">
                  {product.product_name}
                </h3>
                <div className="pt-2">
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    {product.shade}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {product.finish}
                  </span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
