'use client'

import { useCart } from '@/context/CartContext'
import { Product } from '@/lib/types'
import { useState } from 'react'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {product.stock === 0 ? 'Sold out' : added ? 'Added ✓' : 'Add to bag'}
    </button>
  )
}
