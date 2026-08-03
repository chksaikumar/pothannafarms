'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CartItem } from '@/types'
import { getLocalCart, updateCartQuantity, removeFromCart, addToLocalCart } from '@/lib/cart-store'
import { DUMMY_PRODUCTS } from '@/lib/dummy-data'

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial load from local store
    let current = getLocalCart()
    if (current.length === 0) {
      // Seed initial demo items if cart is completely empty
      addToLocalCart({ id: 'prod-1', name: 'Desi A2 Cow Milk', price: 90, imageUrl: DUMMY_PRODUCTS[0].imageUrl, variantName: '1 Liter' }, 2)
      addToLocalCart({ id: 'prod-3', name: 'Free-Range Country Eggs', price: 120, imageUrl: DUMMY_PRODUCTS[2].imageUrl, variantName: '6 Eggs' }, 1)
      current = getLocalCart()
    }
    setItems(current)
    setLoading(false)

    // Listen for cart changes
    const handleCartChange = () => {
      setItems(getLocalCart())
    }
    window.addEventListener('cart_updated', handleCartChange)
    return () => window.removeEventListener('cart_updated', handleCartChange)
  }, [])

  const handleUpdateQty = (id: string, delta: number) => {
    const updated = updateCartQuantity(id, delta)
    setItems(updated)
  }

  const handleRemove = (id: string) => {
    const updated = removeFromCart(id)
    setItems(updated)
  }

  const subtotal = items.reduce((sum, item) => sum + item.total, 0)
  const delivery = subtotal >= 500 ? 0 : subtotal > 0 ? 30 : 0
  const total = subtotal + delivery

  if (loading) {
    return (
      <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '60px var(--spacing-gutter)' }}>
        <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
          <div className="h-10 bg-surface rounded-xl w-48" />
          <div className="h-36 bg-surface rounded-2xl" />
          <div className="h-36 bg-surface rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter) 80px' }}>
      {/* Breadcrumb */}
      <nav className="font-body text-sm text-muted-foreground mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-foreground font-medium">Shopping Cart</span>
      </nav>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary">Shopping Cart</h1>
          <p className="font-body text-muted-foreground mt-1">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        <Link href="/shop" className="font-body text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          ← Add More Products
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl border border-border p-16 text-center shadow-sm">
          <div className="text-7xl mb-4">🛒</div>
          <h2 className="font-display text-2xl font-bold text-primary mb-2">Your cart is currently empty</h2>
          <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
            Explore our fresh farm products and bring home pure organic nutrition today.
          </p>
          <Link href="/shop" className="bg-primary text-white px-8 py-3.5 rounded-xl font-body font-bold hover:bg-primary-dark transition-colors inline-block shadow-md">
            Start Shopping Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Item List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-border p-5 flex gap-5 hover:shadow-md transition-all">
                <div className="w-24 h-24 bg-surface rounded-xl overflow-hidden shrink-0 border border-border">
                  {item.productImage ? (
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">🌾</div>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-display font-bold text-primary text-lg truncate">{item.productName}</h3>
                      {item.variantName && (
                        <span className="inline-block bg-surface text-muted-foreground text-xs font-semibold px-2.5 py-0.5 rounded-md mt-1 border border-border">
                          {item.variantName}
                        </span>
                      )}
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemove(item.id)} 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors text-xl leading-none"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-xl bg-surface overflow-hidden">
                      <button 
                        type="button"
                        onClick={() => handleUpdateQty(item.id, -1)} 
                        className="px-3.5 py-1.5 hover:bg-white transition-colors font-bold text-foreground"
                      >
                        −
                      </button>
                      <span className="px-5 py-1.5 font-body font-bold text-primary border-x border-border min-w-[36px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleUpdateQty(item.id, 1)} 
                        className="px-3.5 py-1.5 hover:bg-white transition-colors font-bold text-foreground"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-xs text-muted-foreground">₹{item.unitPrice} each</p>
                      <p className="font-display font-bold text-xl text-primary mt-0.5">₹{item.total}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Free Delivery Banner */}
            <div className={`rounded-2xl p-4 flex items-center gap-3 border transition-colors ${subtotal >= 500 ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              <span className="text-2xl">{subtotal >= 500 ? '🎉' : '🚚'}</span>
              <p className="font-body text-sm font-medium">
                {subtotal >= 500 
                  ? 'Congratulations! You unlocked FREE Delivery on this order.' 
                  : `Add ₹${500 - subtotal} more to qualify for FREE Delivery!`}
              </p>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-white rounded-2xl border border-border p-6 h-fit shadow-sm sticky top-24">
            <h3 className="font-display text-xl font-bold text-primary mb-5">Order Summary</h3>
            <div className="space-y-3.5 mb-5 pb-5 border-b border-border">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Delivery Charges</span>
                <span className={delivery === 0 ? 'text-emerald-600 font-bold' : 'font-semibold'}>
                  {delivery === 0 ? 'FREE' : `₹${delivery}`}
                </span>
              </div>
            </div>
            <div className="flex justify-between font-display font-bold text-2xl text-primary mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Link 
              href="/checkout" 
              className="block w-full bg-primary text-white text-center py-4 rounded-xl font-body font-bold text-base hover:bg-primary-dark active:scale-95 transition-all shadow-lg"
            >
              Proceed to Checkout →
            </Link>
            <Link href="/shop" className="block w-full text-center mt-4 font-body text-sm font-semibold text-primary hover:underline">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
