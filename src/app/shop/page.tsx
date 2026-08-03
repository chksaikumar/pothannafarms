'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DUMMY_PRODUCTS, DUMMY_CATEGORIES } from '@/lib/dummy-data'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    if (sortBy === 'low-to-high') return a.price - b.price
    if (sortBy === 'high-to-low') return b.price - a.price
    return (b.rating || 0) - (a.rating || 0)
  })

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <nav className="font-body text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Shop</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm sticky top-24">
            <h2 className="font-display text-xl font-bold text-primary mb-4 pb-2 border-b border-border">Categories</h2>
            
            <div className="space-y-2 mb-6">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors flex items-center justify-between ${
                  selectedCategory === 'All' ? 'bg-primary text-white font-semibold' : 'hover:bg-surface text-muted-foreground'
                }`}
              >
                <span>All Products</span>
                <span className="text-xs">{DUMMY_PRODUCTS.length}</span>
              </button>
              {DUMMY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-body text-sm transition-colors flex items-center justify-between ${
                    selectedCategory === cat.name ? 'bg-primary text-white font-semibold' : 'hover:bg-surface text-muted-foreground'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs">
                    {DUMMY_PRODUCTS.filter(p => p.category === cat.name).length}
                  </span>
                </button>
              ))}
            </div>

            <h3 className="font-display text-lg font-semibold text-primary mb-3">Search</h3>
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-xl font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="font-display text-3xl font-bold text-primary">
                {selectedCategory === 'All' ? 'All Farm Products' : selectedCategory}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Showing {filteredProducts.length} items harvested fresh from our farm
              </p>
            </div>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-border rounded-xl font-body text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="popular">Sort by: Rating & Popularity</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-border p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">No products found matching your search.</p>
              <button 
                onClick={() => { setSelectedCategory('All'); setSearchQuery('') }}
                className="bg-primary text-white px-6 py-2 rounded-xl font-body font-medium hover:bg-primary-dark transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-surface">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {product.category}
                    </span>
                    {product.rating && (
                      <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        ★ {product.rating}
                      </span>
                    )}
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
                      <button className="bg-primary text-white px-4 py-2 rounded-xl font-body font-semibold hover:bg-primary-dark active:scale-95 transition-all shadow-sm flex items-center gap-1.5 text-sm">
                        <span>+</span> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

