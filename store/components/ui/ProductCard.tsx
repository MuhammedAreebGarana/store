'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] bg-cream overflow-hidden mb-4">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted text-sm">
              No image
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-paper/70 flex items-center justify-center">
              <span className="text-xs tracking-[0.2em] uppercase text-muted">Sold out</span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <h3 className="font-medium text-ink text-sm tracking-wide mb-1">{product.name}</h3>
          <p className="text-sm text-muted">${Number(product.price).toFixed(2)}</p>
        </div>
      </Link>
      <button
        onClick={() => addItem(product)}
        disabled={product.stock === 0}
        className="w-full btn-secondary text-xs py-2 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {product.stock === 0 ? 'Sold out' : 'Add to bag'}
      </button>
    </div>
  )
}
