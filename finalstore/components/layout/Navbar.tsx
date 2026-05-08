'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-client'

export default function Navbar() {
  const { count } = useCart()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          STORE
        </Link>
        <nav className="flex items-center gap-8">
          <Link href="/products" className="text-sm text-muted hover:text-ink transition-colors tracking-wide">Shop</Link>
          {user ? (
            <button onClick={handleSignOut} className="text-sm text-muted hover:text-ink transition-colors tracking-wide">Sign out</button>
          ) : (
            <Link href="/auth/login" className="text-sm text-muted hover:text-ink transition-colors tracking-wide">Sign in</Link>
          )}
          <Link href="/cart" className="relative text-sm font-medium text-ink hover:text-rust transition-colors">
            Bag
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-rust text-paper text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
