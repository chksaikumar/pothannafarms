'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/client'
import { doc, getDoc } from 'firebase/firestore'
import { Order } from '@/types'
import Link from 'next/link'

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [])

  const loadOrder = async () => {
    // In real app, get id from params
    const orderId = 'demo-order-id'
    const docRef = doc(db, 'orders', orderId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setOrder({ id: docSnap.id, ...docSnap.data() } as Order)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>Loading order...</div>
  }

  if (!order) {
    return (
      <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
        <div className="text-center py-16">
          <p className="font-body text-lg text-muted-foreground mb-4">Order not found</p>
          <Link href="/orders" className="btn-primary">Back to Orders</Link>
        </div>
      </div>
    )
  }

  const statusSteps = ['pending', 'confirmed', 'packed', 'shipped', 'delivered']
  const currentStep = statusSteps.indexOf(order.status)

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <nav className="font-body text-sm text-muted-foreground mb-6">
        <Link href="/orders" className="hover:text-primary">Orders</Link>
        <span className="mx-2">/</span>
        <span>Order #{order.id}</span>
      </nav>

      <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary mb-1">Order #{order.id}</h1>
          <p className="font-body text-muted-foreground">
            {order.createdAt instanceof Date 
              ? order.createdAt.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
              : new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
            }
          </p>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <h3 className="font-display text-xl font-bold text-primary mb-4">Order Status</h3>
        <div className="flex items-center justify-between">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                index <= currentStep ? 'bg-primary text-white' : 'bg-surface-container text-muted-foreground'
              }`}>
                {index <= currentStep ? '✓' : index + 1}
              </div>
              <p className="font-body text-xs mt-2 text-center capitalize">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-border p-6 mb-6">
            <h3 className="font-display text-xl font-bold text-primary mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-surface-container rounded-lg overflow-hidden shrink-0">
                    {item.productImage && (
                      <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-body font-medium">{item.productName}</p>
                    {item.variantName && <p className="font-body text-sm text-muted-foreground">{item.variantName}</p>}
                    <p className="font-body text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-body font-semibold">₹{(item.finalItemTotal / 100).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-display text-xl font-bold text-primary mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-body">
                <span>Subtotal</span>
                <span>₹{(order.subtotal / 100).toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between font-body text-green-600">
                  <span>Discount</span>
                  <span>-₹{(order.discount / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-body">
                <span>Delivery</span>
                <span>₹{(order.deliveryCharge / 100).toFixed(2)}</span>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between font-body">
                  <span>Tax</span>
                  <span>₹{(order.tax / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-outline-variant pt-2 flex justify-between font-body font-bold text-lg">
                <span>Total</span>
                <span>₹{(order.total / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-display text-xl font-bold text-primary mb-4">Shipping Address</h3>
            <div className="font-body text-sm text-on-surface-variant space-y-1">
              <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.line1}</p>
              {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
