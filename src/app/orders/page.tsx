'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase/client'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { Order } from '@/types'
import Link from 'next/link'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    const userId = 'demo-user'
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const ordersData = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Order))
    setOrders(ordersData)
    setLoading(false)
  }

  if (loading) {
    return <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>Loading orders...</div>
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <h1 className="font-display text-3xl font-bold text-primary mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <p className="font-body text-lg text-muted-foreground mb-4">No orders yet</p>
          <Link href="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-border p-6">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="font-body text-sm text-muted-foreground">Order #{order.id}</p>
                  <p className="font-body text-sm text-muted-foreground">
                    {order.createdAt instanceof Date 
                      ? order.createdAt.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                      : new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
                    }
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden shrink-0">
                      {item.productImage && (
                        <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-body font-medium text-sm">{item.productName}</p>
                      <p className="font-body text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-body text-sm">₹{(item.finalItemTotal / 100).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                <div>
                  <p className="font-body text-sm text-muted-foreground">Total</p>
                  <p className="font-display font-bold text-lg text-primary">₹{(order.total / 100).toFixed(2)}</p>
                </div>
                <Link href={`/orders/${order.id}`} className="font-body text-sm text-primary hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
