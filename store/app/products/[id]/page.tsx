import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AddToCartButton from '@/components/ui/AddToCartButton'

export const revalidate = 60

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Image */}
        <div className="relative aspect-square bg-cream overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted text-sm">
              No image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted mb-4">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          <h1 className="font-display text-4xl font-medium text-ink mb-4">{product.name}</h1>
          <p className="text-2xl text-ink mb-6">${Number(product.price).toFixed(2)}</p>

          {product.description && (
            <p className="text-muted leading-relaxed mb-10">{product.description}</p>
          )}

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
