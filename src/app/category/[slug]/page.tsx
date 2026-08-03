'use client'

import { use } from 'react'
import Link from 'next/link'
import { DUMMY_PRODUCTS, DUMMY_CATEGORIES } from '@/lib/dummy-data'

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)

  const categoryMap: Record<string, string> = {
    'milk': 'Pure Dairy',
    'pure-dairy': 'Pure Dairy',
    'chicken': 'Farm Fresh Eggs',
    'eggs': 'Farm Fresh Eggs',
    'farm-fresh-eggs': 'Farm Fresh Eggs',
    'organic-staples': 'Organic Staples & Honey',
    'vegetables': 'Fresh Vegetables',
  }

  const targetCategory = categoryMap[slug] || 'Pure Dairy'
  const categoryInfo = DUMMY_CATEGORIES.find(c => c.name === targetCategory) || DUMMY_CATEGORIES[0]
  const products = DUMMY_PRODUCTS.filter(p => p.category === targetCategory)

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <nav className="font-body text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{targetCategory}</span>
      </nav>

      {/* Category Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-10 bg-emerald-950 text-white p-8 md:p-12 shadow-lg">
        <div className="absolute inset-0 opacity-30">
          <img src={categoryInfo.imageUrl} alt={categoryInfo.name} className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-xl">
          <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
            Farm Category
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">{categoryInfo.name}</h1>
          <p className="font-body text-emerald-100 text-base">{categoryInfo.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">
            <div className="aspect-[4/3] relative overflow-hidden bg-surface">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {product.category}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-primary mb-1 group-hover:text-emerald-700 transition-colors">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div>
                  <span className="font-display font-bold text-xl text-primary">₹{product.price}</span>
                  <span className="font-body text-xs text-muted-foreground"> / {product.unit}</span>
                </div>
                <Link href={`/product/${product.slug}`} className="bg-primary text-white px-4 py-2 rounded-xl font-body font-semibold hover:bg-primary-dark transition-all text-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="bg-white rounded-2xl border border-border p-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">No products found in this category.</p>
          <Link href="/shop" className="bg-primary text-white px-6 py-2.5 rounded-xl font-body font-medium inline-block">
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  )
}

