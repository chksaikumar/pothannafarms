'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { DUMMY_PRODUCTS } from '@/lib/dummy-data'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || `PF${Date.now().toString().slice(-8)}`
  
  const orderNumber = orderId.startsWith('PF') ? orderId : `PF${orderId.slice(-8)}`
  const estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const orderItems = [
    { name: 'Desi A2 Cow Milk', image: DUMMY_PRODUCTS[0].imageUrl, qty: 2, price: 180, variant: '1 Liter' },
    { name: 'Free-Range Country Eggs', image: DUMMY_PRODUCTS[2].imageUrl, qty: 1, price: 120, variant: '6 Eggs' },
  ]

  const subtotal = orderItems.reduce((s, i) => s + i.price, 0)
  const delivery = 30
  const tax = Math.floor(subtotal * 0.05)
  const total = subtotal + delivery + tax

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter) 80px' }}>
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="text-5xl">✅</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-primary mb-3">Order Confirmed! 🌾</h1>
          <p className="font-body text-on-surface-variant max-w-md mx-auto" style={{ lineHeight: '1.7' }}>
            Thank you for choosing Pothana Farms! Your farm-fresh order is being prepared with love and care.
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-3xl border border-border p-7 mb-6 shadow-sm">
          {/* Order Info */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6 pb-6 border-b border-border">
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Order Number</p>
              <p className="font-display text-2xl font-bold text-primary">#{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-body text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Estimated Delivery</p>
              <p className="font-body font-semibold">{estimatedDelivery}</p>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full mt-1">Processing</span>
            </div>
          </div>

          {/* Order Progress */}
          <div className="mb-6 pb-6 border-b border-border">
            <div className="relative flex justify-between">
              <div className="absolute top-3 left-0 right-0 h-0.5 bg-border" />
              <div className="absolute top-3 left-0 h-0.5 bg-emerald-500 transition-all" style={{ width: '33%' }} />
              {[
                { icon: '📦', label: 'Order Placed', done: true },
                { icon: '🧑‍🍳', label: 'Preparing', active: true },
                { icon: '🚚', label: 'Out for Delivery' },
                { icon: '🏠', label: 'Delivered' },
              ].map((step, i) => (
                <div key={step.label} className="relative flex flex-col items-center text-center z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${step.done ? 'bg-emerald-500' : step.active ? 'bg-primary' : 'bg-white border-2 border-border'}`}>
                    {step.done ? '✓' : <span>{step.icon}</span>}
                  </div>
                  <p className={`font-body text-xs mt-2 ${step.done || step.active ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            <h3 className="font-display font-bold text-primary">Items Ordered</h3>
            {orderItems.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-16 h-16 bg-surface rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-body font-semibold text-sm">{item.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{item.variant} · Qty: {item.qty}</p>
                </div>
                <p className="font-body font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between font-body text-sm"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between font-body text-sm"><span className="text-muted-foreground">Delivery</span><span>₹{delivery}</span></div>
            <div className="flex justify-between font-body text-sm"><span className="text-muted-foreground">GST (5%)</span><span>₹{tax}</span></div>
          </div>
          <div className="flex justify-between font-display font-bold text-xl text-primary pt-4 border-t border-border">
            <span>Total Paid</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-surface rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase font-semibold mb-2">Delivering To</p>
              <p className="font-body font-semibold text-sm">Home Address</p>
              <p className="font-body text-sm text-muted-foreground">Hyderabad, Telangana</p>
            </div>
            <div>
              <p className="font-body text-xs text-muted-foreground uppercase font-semibold mb-2">Payment Method</p>
              <p className="font-body font-semibold text-sm">Cash on Delivery</p>
              <p className="font-body text-sm text-muted-foreground">₹{total} due on delivery</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard" className="bg-primary text-white px-8 py-3.5 rounded-xl font-body font-bold text-center hover:bg-primary-dark transition-colors shadow-md">
            Track My Order
          </Link>
          <Link href="/shop" className="border-2 border-border text-foreground px-8 py-3.5 rounded-xl font-body font-bold text-center hover:border-primary hover:text-primary transition-colors">
            Continue Shopping
          </Link>
        </div>

        {/* Support Note */}
        <p className="font-body text-center text-sm text-muted-foreground mt-8">
          Questions about your order? Contact us at{' '}
          <a href="mailto:care@pothanafarms.com" className="text-primary hover:underline">care@pothanafarms.com</a>
        </p>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
