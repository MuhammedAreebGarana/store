'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-32 text-center">
        <p className="font-display text-3xl text-ink mb-4">Your bag is empty</p>
        <p className="text-muted mb-10">Looks like you haven't added anything yet.</p>
        <Link href="/products" className="btn-primary inline-block">Browse products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted mb-2">Review</p>
        <h1 className="font-display text-4xl font-medium text-ink">Your Bag</h1>
      </div>
      <div className="divide-y divide-ink/10">
        {items.map(item => (
          <div key={item.id} className="py-6 flex gap-6">
            <div className="relative w-24 h-24 bg-cream flex-shrink-0 overflow-hidden">
              {item.image_url ? (
                <Image src={item.image_url} alt={item.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-cream" />
              )}
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-ink text-sm tracking-wide">{item.name}</h3>
                  <p className="text-sm text-muted mt-1">${Number(item.price).toFixed(2)} each</p>
                </div>
                <p className="font-medium text-ink text-sm">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-ink/20">
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-3 py-1 text-sm hover:bg-cream transition-colors">−</button>
                  <span className="px-4 py-1 text-sm border-x border-ink/20">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-3 py-1 text-sm hover:bg-cream transition-colors">+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-xs text-muted hover:text-rust transition-colors tracking-wide uppercase">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 border-t border-ink/10 pt-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted">Subtotal</span>
          <span className="font-medium text-ink">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm text-muted">Shipping</span>
          <span className="text-sm text-muted">{total >= 75 ? 'Free' : 'Calculated at checkout'}</span>
        </div>
        <div className="flex gap-4">
          <button onClick={clearCart} className="btn-secondary flex-1">Clear bag</button>
          <button className="btn-primary flex-1">Checkout</button>
        </div>
      </div>
    </div>
  )
}
