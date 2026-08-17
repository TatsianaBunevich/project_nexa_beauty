import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const { user, error } = await auth()
  if (error || !user) redirect('/login')

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Product Details: {productId}
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-xl bg-muted" />
        <div className="space-y-4">
          <div className="rounded-xl border p-6">Product Specifications</div>
          <div className="rounded-xl border p-6">AI Dupe Recommendations</div>
        </div>
      </div>
    </div>
  )
}
