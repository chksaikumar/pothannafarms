'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { DUMMY_PRODUCTS } from '@/lib/dummy-data'

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [quantity, setQuantity] = useState(1)
  const [frequency, setFrequency] = useState('Daily')

  const product = DUMMY_PRODUCTS.find(p => p.slug === slug) || DUMMY_PRODUCTS[0]

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <nav className="font-body text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 md:p-8 border border-border shadow-sm">
        {/* Product Image */}
        <div className="aspect-[4/3] bg-surface rounded-2xl overflow-hidden relative shadow-inner">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          <span className="absolute top-4 left-4 bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            🌿 100% Organic
          </span>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-emerald-700 font-semibold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
              {product.category}
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display font-bold text-3xl text-primary">₹{product.price}</span>
              <span className="font-body text-muted-foreground text-sm">/ {product.unit}</span>
              {product.rating && (
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  ★ {product.rating} ({product.reviewsCount} reviews)
                </span>
              )}
            </div>

            <p className="font-body text-muted-foreground mb-6" style={{ lineHeight: '1.6' }}>
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block font-body text-sm font-semibold mb-2">Quantity</label>
              <div className="inline-flex items-center border border-border rounded-xl bg-surface">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg font-bold hover:bg-white rounded-l-xl transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-2 font-body font-bold text-primary">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg font-bold hover:bg-white rounded-r-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Subscription Box */}
            <div className="bg-emerald-900/5 border border-emerald-900/10 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary text-xl">🔄</span>
                <span className="font-body font-bold text-primary">Subscribe & Save 10%</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Get regular doorstep delivery without placing repeat orders.</p>
              <div className="flex flex-wrap gap-2">
                {['Daily', 'Alternate Days', 'Weekly'].map((freq) => (
                  <button 
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`px-4 py-2 rounded-xl font-body text-xs font-semibold transition-all ${
                      frequency === freq ? 'bg-primary text-white shadow-sm' : 'bg-white border border-border hover:border-primary'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
            <button className="flex-1 bg-primary text-white py-3.5 rounded-xl font-body font-semibold hover:bg-primary-dark active:scale-95 transition-all shadow-md">
              Add to Cart • ₹{product.price * quantity}
            </button>
            <Link href="/checkout" className="flex-1 bg-emerald-800 text-white text-center py-3.5 rounded-xl font-body font-semibold hover:bg-emerald-900 active:scale-95 transition-all shadow-md">
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* Details & Specifications */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="text-3xl mb-3">🌾</div>
          <h3 className="font-display font-bold text-lg text-primary mb-2">Farm Practices</h3>
          <p className="font-body text-sm text-muted-foreground">Our Gir cows and free-range animals graze naturally on organic pastures with ethical feeding protocols.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-display font-bold text-lg text-primary mb-2">Nutritional Values</h3>
          <p className="font-body text-sm text-muted-foreground">Rich in natural A2 beta-casein proteins, calcium, and essential vitamins without heat processing.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="text-3xl mb-3">🚚</div>
          <h3 className="font-display font-bold text-lg text-primary mb-2">Cold Chain Delivery</h3>
          <p className="font-body text-sm text-muted-foreground">Delivered insulated within 4 hours of morning milking to maintain raw nutritional purity.</p>
        </div>
      </div>
    </div>
  )
}

