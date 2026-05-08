import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex items-center justify-center bg-cream px-6 py-24">
        <div className="max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted mb-6">
            New Collection
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-medium leading-tight text-ink mb-8">
            Crafted with
            <br />
            <em>intention</em>
          </h1>
          <p className="text-muted text-lg mb-12 max-w-md mx-auto leading-relaxed">
            Thoughtfully designed pieces for everyday life.
          </p>
          <Link href="/products" className="btn-primary inline-block">
            Explore the store
          </Link>
        </div>
      </section>

      {/* Footer strip */}
      <div className="border-t border-ink/10 py-6 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-xs text-muted tracking-wide">
          <span>Free shipping on orders over $75</span>
          <span>© {new Date().getFullYear()} Store</span>
        </div>
      </div>
    </div>
  )
}
