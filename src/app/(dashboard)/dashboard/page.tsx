import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

export default async function DashboardPage() {
  // Fetch the 3 most recently added products from the 'products' table
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  const bucketUrl = 'https://hdljtcyuzexuehioebru.supabase.co/storage/v1/object/public/cosmetic-scans'

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl bg-card">Collection Stats</div>
        <div className="p-6 border rounded-xl bg-card">AI Suggestions</div>
        <div className="p-6 border rounded-xl bg-card">Account Settings</div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Scans</h2>
        {!products || products.length === 0 ? (
          <div className="p-12 border-2 border-dashed rounded-xl text-center text-muted-foreground">
            No recent products found. Start scanning products!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((product: any) => (
              <Card key={product.id} className="overflow-hidden group relative aspect-square bg-muted">
                <Image
                  src={product.image_url ? `${bucketUrl}/${product.image_url}` : '/placeholder-image.jpg'}
                  alt={product.product_name || 'Recent scan'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
