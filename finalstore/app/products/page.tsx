import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Product } from '@/lib/types'
import ProductCard from '@/components/ui/ProductCard'

export const revalidate = 60

export default async function ProductsPage() {
  const supabase = await createServerSupabaseClient()
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center text-muted">
        Failed to load products.
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted mb-2">Collection</p>
        <h1 className="font-display text-4xl font-medium text-ink">All Products</h1>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-muted">
          <p className="font-display text-2xl mb-2">No products yet</p>
          <p className="text-sm">Add products in your Supabase dashboard.</p>
        </div>
      )}
    </div>
  )
}
