'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addToLocalCart } from '@/lib/cart-store'

interface Product {
  id: string
  name: string
  price: number
  unit: string
  category: string
  description: string
  imageUrl: string
  badge?: string
  dateAdded: string
}

export default function VegetablesPage() {
  const router = useRouter()
  
  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceMax, setPriceMax] = useState<number>(1000)
  const [availability, setAvailability] = useState<'all' | 'instock'>('instock')
  const [sortBy, setSortBy] = useState('Popularity')

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1)
  const ITEMS_PER_PAGE = 4

  const allProducts: Product[] = [
    {
      id: 'ladyfinger',
      name: 'Fresh Ladyfinger (Okra)',
      price: 40,
      unit: 'Kg',
      category: 'Vegetables',
      description: 'Freshly harvested organic ladyfingers straight from the farm.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpHPkhwOMW5FKgcWd0xktLTCHlvYJI7NKCtODsU4U-HPNG-psafqZ1Si4J4LyibfGuS2Lh50nDZg4hLC4bg-3MNzejmaRstfswDFmW2EsMvCtmKEqRVNndoYN9OYrKzL1AX2s4c01A-smnzoWTqjkIIYHuDg38EvsP0jOQPULH4KZI7AESLnSbFM3aCjcVHL3KovwOJSqSeJuwu3xxWQ-jrjhJjtpDbolv6aCdyChVKGkmou34wAMP',
      dateAdded: '2026-08-01',
    },
    {
      id: 'tomatoes',
      name: 'Vine-Ripened Tomatoes',
      price: 60,
      unit: 'Kg',
      category: 'Vegetables',
      description: 'Juicy, sweet tomatoes grown without synthetic pesticides.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTUF6J4TepGtcYvcM-ha3A0hrkhHC0wI4L5sbKfSyLBY4NbxrU9Lo3Jrl8xM7CY3QtTkLb7aXlqezyZJV6aUnHU-ybeU9RBFJZFF3cEhQP717HcuoZlXK2abmSQa35bjd7Yz60IJgVMNto11dMtGC9jMBR8H7GYd_w0_AkTyHas2K9uK78EUC7nxwFW5UFIbvsGo-jaoveX8W5z3vaVI0sZhO8s6KIpLlkO-Xh9nBM4wccY2scBoPg',
      dateAdded: '2026-08-02',
    },
    {
      id: 'carrots',
      name: 'Earthy Carrots',
      price: 50,
      unit: 'Kg',
      category: 'Vegetables',
      description: 'Sweet and crunchy carrots straight from the rich soil.',
      badge: 'In Season',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFElkhBXCZCc-LuVSRXxqaQAhs9NvxTz8T2rlSJBZIbu6AJIowu3xah4hzk5M8xloB8sxQPWeyx1bB2z1JDYqOEu3-ASdkLgFmOa9szorzVxrQzSweGwEucNa7x7HbNQ9a1ejRL_XorP3LlLm7wOoRnIr1FL1lkeBSEGnVBIv1f6JDOtuCOfjGwnIlwPwbU08t8gIS7xnHWOKEPt6scQavWGWdphn2Oe8fmTeiXSOgmGEimQSOh9ZT',
      dateAdded: '2026-07-28',
    },
    {
      id: 'chekkilalu',
      name: 'Traditional Chekkilalu',
      price: 120,
      unit: '250g',
      category: 'Sweets',
      description: 'Authentic traditional rice snack, crispy and delicious.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCASlNAggo7AQwFLxwZCBrSnHrZQyPCycxsq23owjG3NamLaU1ON566HZ78EEdB94qIWO5CtH6idMZP3z8C-ZTkenrKnWawA7nL7Nlz7Z02uSF1NX01OpnQm2S0S3DGo272VJP8iXGnRZ8DuCV2LoNrnNZMJUEQXNumU0MeHi643h0udG0LNyN2LjSzhwd7MTuuw3-CWYog8KH2mXr2oAMuKl1zojtFR8Ja7iPjXWFLmLsLIzaoaaOh',
      dateAdded: '2026-07-25',
    },
    {
      id: 'appadam',
      name: 'Handmade Appadam',
      price: 80,
      unit: 'Pack',
      category: 'Sweets',
      description: 'Sun-dried authentic appadams, made with traditional recipes.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu6JHWJRRX2FAbieU1z0V5VjvU9AFDNS6QdYPCOmAJcaYEOlw2QsMj7fQLs0gW_xXfr3_IjMhXNBTfRxSczaOuyu3tfGkaxSBydPkIsvcN6YuLy0My3ljwjJe1sNJV2nyM_pR1qGZHRQ-yH3Smv0mKcS-S2cdsENpzzDeHWgFql6TX0Szem-Q2ruNB3Pif2meeEM9cRbQN0ZYt5toJZ2lLrr7Mb8z4_Ee1pDTUw3406dS4V0VFn8A1',
      dateAdded: '2026-07-29',
    },
    {
      id: 'farm-mithai',
      name: 'Pure Milk Sweets Box',
      price: 350,
      unit: '500g',
      category: 'Sweets',
      description: 'Assorted premium milk sweets made with farm-fresh milk.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxVmx_qYa5KHhSAJLCgEkRZDn-en7yCpPNU72Rf5VtFU245CFOBFJ9Xz93eah1mza-2G_cZA52tC9smT9v-siXxUwJ7hXhrCAGkSukdvb09Mb57_BwQn409VI6FJMA1Bb4fIkGIhcy-ca-v6jsfRvrbtV3mvHLavEAJyGZFoPRlbbtQfcdydHRylyicrxkV7B3IveSz54VmMZ_Xxd6d2bMpDxtzXjId3C17oKSKpa-63rCClmovUf3',
      dateAdded: '2026-08-01',
    },
    {
      id: 'a2-milk',
      name: 'Desi A2 Cow Milk',
      price: 90,
      unit: 'Litre',
      category: 'Milk',
      description: 'Pure, unprocessed A2 milk from free-range indigenous Gir cows.',
      imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80',
      badge: 'Bestseller',
      dateAdded: '2026-08-02',
    },
    {
      id: 'country-eggs',
      name: 'Free-Range Country Eggs',
      price: 120,
      unit: '6 Eggs',
      category: 'Eggs',
      description: 'Nutritious country eggs from naturally scavenged hens.',
      imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&q=80',
      dateAdded: '2026-07-30',
    },
  ]

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  // Filter & Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false
      }
      if (p.price > priceMax) return false
      return true
    })

    if (sortBy === 'Price (Low to High)') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'Price (High to Low)') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'Newest First') {
      result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    }

    return result
  }, [selectedCategories, priceMax, sortBy])

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE))
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredAndSortedProducts, currentPage])

  const handleAddToCart = (product: Product) => {
    addToLocalCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      variantName: product.unit,
    })
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1b1c1c] font-body flex flex-col">
      <main className="flex-grow pt-8 pb-12 px-6 lg:px-10 max-w-[1280px] mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#717973] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#012d1d]">Home</Link>
          <span>›</span>
          <span className="text-[#012d1d] font-bold">All Products &amp; Vegetables</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-[#f6f3f2] rounded-2xl p-6 sticky top-28 border border-[#e4e2e1]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-[#012d1d]">Filters</h2>
                {(selectedCategories.length > 0 || priceMax < 1000) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategories([])
                      setPriceMax(1000)
                      setCurrentPage(1)
                    }}
                    className="text-[11px] font-bold text-[#012d1d] underline hover:text-[#1b4332]"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3 border-b border-[#c1c8c2]/30 pb-2">
                  Category
                </h3>
                <div className="space-y-2.5">
                  {['Milk', 'Chicken', 'Eggs', 'Sweets', 'Vegetables'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 text-xs text-[#414844] cursor-pointer hover:text-[#012d1d]">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="accent-[#012d1d] w-4 h-4 rounded"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3 border-b border-[#c1c8c2]/30 pb-2">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceMax}
                    onChange={(e) => {
                      setPriceMax(Number(e.target.value))
                      setCurrentPage(1)
                    }}
                    className="w-full accent-[#012d1d]"
                  />
                  <div className="flex justify-between text-xs text-[#717973] font-semibold">
                    <span>₹0</span>
                    <span>Max: ₹{priceMax}</span>
                  </div>
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3 border-b border-[#c1c8c2]/30 pb-2">
                  Availability
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2.5 text-xs text-[#414844] cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === 'instock'}
                      onChange={() => setAvailability('instock')}
                      className="accent-[#012d1d]"
                    />
                    <span>In Stock ({filteredAndSortedProducts.length})</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs text-[#414844] cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={availability === 'all'}
                      onChange={() => setAvailability('all')}
                      className="accent-[#012d1d]"
                    />
                    <span>Show All</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-grow">
            {/* Header & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-[#e4e2e1] pb-4">
              <div>
                <h1 className="font-display text-3xl font-bold text-[#012d1d]">
                  All Farm Products
                </h1>
                <p className="font-body text-xs text-[#717973] mt-1">
                  Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} items
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-[#717973]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-white border border-[#c1c8c2] text-xs font-body text-[#1b1c1c] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#012d1d]"
                >
                  <option>Popularity</option>
                  <option>Price (Low to High)</option>
                  <option>Price (High to Low)</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#e4e2e1] p-12 text-center">
                <p className="text-3xl mb-2">🔍</p>
                <p className="font-display text-xl font-bold text-[#012d1d] mb-1">No products match your filters</p>
                <p className="font-body text-xs text-[#717973] mb-4">Try adjusting your price range or selecting different categories.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceMax(1000)
                    setCurrentPage(1)
                  }}
                  className="bg-[#012d1d] text-white px-6 py-2.5 rounded-full font-body text-xs font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Product Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
                  {paginatedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white border border-[#e4e2e1] rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-300 relative flex flex-col h-full"
                    >
                      {p.badge && (
                        <div className="absolute top-3 left-3 z-10 bg-[#1f6d1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {p.badge}
                        </div>
                      )}

                      <div className="h-48 overflow-hidden bg-[#f6f3f2] relative block">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[#717973]">{p.category}</span>
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#012d1d] mb-1.5 line-clamp-1">
                          {p.name}
                        </h3>
                        <p className="font-body text-xs text-[#414844] mb-4 flex-grow line-clamp-2">
                          {p.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#e4e2e1]">
                          <span className="font-display text-lg font-bold text-[#012d1d]">
                            ₹{p.price} <span className="font-body text-xs font-normal text-[#717973]">/ {p.unit}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(p)}
                            className="bg-[#56340e] text-[#ffdcbd] hover:bg-[#3b1f00] px-4 py-2 rounded-xl flex items-center gap-1.5 font-body text-xs font-bold transition-colors shadow-xs"
                          >
                            <span>🛒</span>
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Pagination Bar */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 pt-4 border-t border-[#e4e2e1]">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1.5 rounded-lg border border-[#c1c8c2] text-xs font-body text-[#012d1d] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0eded]"
                    >
                      ← Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-full font-body text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#012d1d] text-white shadow-sm'
                            : 'bg-white text-[#414844] border border-[#c1c8c2] hover:bg-[#f0eded]'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3 py-1.5 rounded-lg border border-[#c1c8c2] text-xs font-body text-[#012d1d] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#f0eded]"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#012d1d] text-white py-10 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-2">Pothana Farms</h3>
            <p className="font-body text-xs text-[#a5d0b9]">Rooted in Tradition, Delivered with Care.</p>
          </div>
          <div className="flex flex-col gap-2 text-xs font-body text-[#a5d0b9]">
            <Link href="/about" className="hover:text-white">About Us</Link>
            <Link href="/about" className="hover:text-white">Sourcing Policy</Link>
          </div>
          <div className="flex flex-col gap-2 text-xs font-body text-[#a5d0b9]">
            <Link href="/about" className="hover:text-white">Freshness Guarantee</Link>
            <Link href="/about" className="hover:text-white">Shipping Policy</Link>
          </div>
          <div className="flex flex-col gap-2 text-xs font-body text-[#a5d0b9]">
            <Link href="/about" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
