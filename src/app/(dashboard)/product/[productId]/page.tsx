export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Product Details: {params.productId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-muted rounded-xl" />
        <div className="space-y-4">
          <div className="p-6 border rounded-xl">Product Specifications</div>
          <div className="p-6 border rounded-xl">AI Dupe Recommendations</div>
        </div>
      </div>
    </div>
  )
}
