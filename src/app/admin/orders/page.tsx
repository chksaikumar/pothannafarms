'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

interface Order {
  id: string
  shippingAddress?: { fullName?: string; phone?: string }
  createdAt?: Date | string
  total?: number
  status?: string
  paymentStatus?: string
  items?: any[]
}

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const load = async () => {
      if (!user) return
      try {
        const token = await user.getIdToken()
        const res = await fetch('/api/admin/orders', {
          headers: { authorization: `Bearer ${token}` },
        })
        if (!res.ok) return
        const data = await res.json()
        setOrders(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'confirmed' || o.status === 'packed').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
  ]

  const updateStatus = async (orderId: string, status: string) => {
    if (!user) return
    try {
      const token = await user.getIdToken()
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId, status }),
      })
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    } catch (e) {
      console.error('Failed to update status', e)
    }
  }

  const filtered = activeTab === 'all' ? orders : orders.filter(o => {
    if (activeTab === 'processing') return o.status === 'confirmed' || o.status === 'packed'
    return o.status === activeTab
  })

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold text-primary">Order Management</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border rounded-lg font-body text-sm hover:border-primary transition-colors">Export</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg font-body text-sm hover:bg-primary-dark transition-colors">Bulk Actions</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex flex-wrap gap-3 mb-6">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg font-body text-sm transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-surface-container text-foreground hover:bg-surface-container-high'}`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {loading ? (
          <p className="font-body text-muted-foreground">Loading orders...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant">
                  <th className="text-left font-body font-semibold p-3">Order ID</th>
                  <th className="text-left font-body font-semibold p-3">Customer</th>
                  <th className="text-left font-body font-semibold p-3">Date</th>
                  <th className="text-left font-body font-semibold p-3">Items</th>
                  <th className="text-left font-body font-semibold p-3">Amount</th>
                  <th className="text-left font-body font-semibold p-3">Status</th>
                  <th className="text-left font-body font-semibold p-3">Payment</th>
                  <th className="text-left font-body font-semibold p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-outline-variant hover:bg-surface-container/50">
                    <td className="p-3">
                      <div>
                        <p className="font-body font-medium">#{order.id}</p>
                        <p className="font-body text-xs text-muted-foreground">{order.shippingAddress?.phone || ''}</p>
                      </div>
                    </td>
                    <td className="p-3 font-body">{order.shippingAddress?.fullName || 'Customer'}</td>
                    <td className="p-3 font-body text-muted-foreground">{order.createdAt instanceof Date ? order.createdAt.toLocaleDateString() : new Date(order.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td className="p-3 font-body text-center">{order.items?.length || 0}</td>
                    <td className="p-3 font-body font-medium">₹{((order.total as number) || 0) > 0 ? ((order.total as number) / 100).toFixed(2) : '0.00'}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : order.status === 'confirmed' || order.status === 'packed' ? 'bg-yellow-100 text-yellow-700' : order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/orders/${order.id}`} className="p-2 hover:bg-surface-container rounded-lg">👁️</Link>
                        <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} className="text-xs border border-border rounded-lg px-2 py-1">
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && (
          <div className="flex items-center justify-between mt-6">
            <p className="font-body text-sm text-muted-foreground">Showing {filtered.length} orders</p>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-container">←</button>
              <button className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center">1</button>
              <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-surface-container">→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
