'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getLocalCart } from '@/lib/cart-store'

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const { user, role, signOut } = useAuth()

  useEffect(() => {
    const updateCount = () => {
      const items = getLocalCart()
      const totalQty = items.reduce((sum, item) => sum + item.quantity, 0)
      setCartCount(totalQty)
    }

    updateCount()
    window.addEventListener('cart_updated', updateCount)
    return () => window.removeEventListener('cart_updated', updateCount)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="text-2xl font-bold text-primary tracking-tight font-display text-[26px]">
              🌿 Pothana Farms
            </span>
          </Link>

          {/* Nav Categories */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="font-body text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Milk
            </Link>
            <Link href="/product/country-chicken" className="font-body text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Chicken
            </Link>
            <Link href="/shop" className="font-body text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Eggs
            </Link>
            <Link href="/sweets" className="font-body text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Sweets
            </Link>
            <Link href="/vegetables" className="font-body text-sm font-semibold text-foreground hover:text-primary transition-colors">
              Vegetables
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-5">
            {/* Location Selector */}
            <button type="button" className="text-foreground hover:text-primary transition-colors p-1" title="Delivery Location">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <Link href="/cart" className="relative text-foreground hover:text-primary transition-colors p-1" title="Shopping Cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-500 text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            <Link href={user ? (role === 'admin' ? '/admin/dashboard' : '/dashboard') : '/login'} className="text-foreground hover:text-primary transition-colors p-1" title="Account">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-1 text-2xl text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white">
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="font-body text-sm font-semibold py-2" onClick={() => setMobileOpen(false)}>Milk</Link>
              <Link href="/shop" className="font-body text-sm font-semibold py-2" onClick={() => setMobileOpen(false)}>Chicken</Link>
              <Link href="/shop" className="font-body text-sm font-semibold py-2" onClick={() => setMobileOpen(false)}>Eggs</Link>
              <Link href="/sweets" className="font-body text-sm font-semibold py-2" onClick={() => setMobileOpen(false)}>Sweets</Link>
              <Link href="/vegetables" className="font-body text-sm font-semibold py-2" onClick={() => setMobileOpen(false)}>Vegetables</Link>
              <Link href="/about" className="font-body text-sm font-semibold py-2" onClick={() => setMobileOpen(false)}>Founders & About Us</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
