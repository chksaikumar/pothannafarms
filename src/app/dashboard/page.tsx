'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { user, signOut } = useAuth()
  const displayName = user?.displayName || 'John'
  const firstName = displayName.split(' ')[0]

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'subscriptions', label: 'Subscriptions', icon: '🔄' },
    { id: 'addresses', label: 'Addresses', icon: '📍' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ]

  const demoOrders = [
    { id: '#ORD-8801', date: 'Aug 1, 2026', items: 'A2 Milk, Eggs, Ghee', total: 560, status: 'Delivered' },
    { id: '#ORD-8799', date: 'Jul 28, 2026', items: 'Country Chicken (1kg)', total: 550, status: 'Delivered' },
    { id: '#ORD-8802', date: 'Aug 2, 2026', items: 'Organic Spinach, Paneer', total: 320, status: 'Shipped' },
  ]

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-[#fcf9f8] border-r border-[#e4e2e1] fixed left-0 top-0 h-screen pt-8 pb-6 z-30">
        {/* Brand */}
        <div className="px-6 mb-6">
          <Link href="/" className="font-display text-xl font-bold text-[#012d1d]">Pothana Farms</Link>
        </div>

        {/* User Card */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-3 border border-[#e4e2e1]">
            <div className="w-9 h-9 rounded-full bg-[#f5e6d3] text-[#56340e] flex items-center justify-center font-bold text-xs">
              {firstName.slice(0, 1)}{(user?.displayName?.split(' ')[1] || 'D').slice(0, 1)}
            </div>
            <div>
              <p className="font-body text-xs font-bold text-[#012d1d] leading-tight">{user?.displayName || 'John Doe'}</p>
              <p className="font-body text-[10px] text-[#717973]">Customer</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-xs font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-[#a4f792] text-[#002201]'
                      : 'text-[#414844] hover:bg-[#f0eded]'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Links */}
        <div className="px-3 space-y-1 mt-auto pt-4 border-t border-[#e4e2e1] mx-4">
          <button type="button" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-xs text-[#414844] hover:bg-[#f0eded]">
            <span>❓</span><span>Help</span>
          </button>
          <button
            type="button"
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-body text-xs text-[#414844] hover:bg-[#f0eded]"
          >
            <span>🚪</span><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-56 px-6 lg:px-10 py-10 max-w-[1100px]">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            <div className="mb-8">
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#012d1d] mb-2">
                Hello, {firstName}! Welcome back to the farm.
              </h1>
              <p className="font-body text-sm text-[#414844]">
                Here is an overview of your recent farm-fresh deliveries and subscriptions.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 flex items-start justify-between">
                <div>
                  <p className="font-body text-[10px] text-[#717973] uppercase tracking-wider font-semibold mb-2">Total Orders</p>
                  <p className="font-display text-4xl font-bold text-[#012d1d]">24</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#f0eded] flex items-center justify-center text-lg">📦</div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 flex items-start justify-between">
                <div>
                  <p className="font-body text-[10px] text-[#717973] uppercase tracking-wider font-semibold mb-2">Active Subscriptions</p>
                  <p className="font-display text-4xl font-bold text-[#012d1d]">2</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#d1e7dd] flex items-center justify-center text-lg">🔄</div>
              </div>

              <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 flex items-start justify-between">
                <div>
                  <p className="font-body text-[10px] text-[#717973] uppercase tracking-wider font-semibold mb-2">Reward Points</p>
                  <p className="font-display text-4xl font-bold text-[#012d1d]">1,450</p>
                  <p className="font-body text-[11px] text-[#717973] mt-0.5">Redeemable for ₹145</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#ffdcbd] flex items-center justify-center text-lg">⭐</div>
              </div>
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <>
            <h1 className="font-display text-3xl font-bold text-[#012d1d] mb-6">Your Orders</h1>
            <div className="bg-white rounded-2xl border border-[#e4e2e1] overflow-hidden">
              <table className="w-full text-left font-body text-sm">
                <thead><tr className="bg-[#f6f3f2] text-[#717973] text-[10px] uppercase tracking-wider">
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Items</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr></thead>
                <tbody className="divide-y divide-[#e4e2e1]">
                  {demoOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#f6f3f2]/50">
                      <td className="px-6 py-4 font-bold text-[#012d1d]">{o.id}</td>
                      <td className="px-6 py-4 text-[#717973]">{o.date}</td>
                      <td className="px-6 py-4 text-[#414844]">{o.items}</td>
                      <td className="px-6 py-4 font-bold text-[#012d1d]">₹{o.total}</td>
                      <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${o.status === 'Delivered' ? 'bg-[#a4f792] text-[#002201]' : 'bg-[#c1ecd4] text-[#002114]'}`}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <>
            <h1 className="font-display text-3xl font-bold text-[#012d1d] mb-6">Active Subscriptions</h1>
            <div className="space-y-4">
              {[
                { product: 'Desi A2 Cow Milk', variant: '1 Litre / Daily', price: '₹90/day', status: 'Active', nextDelivery: 'Tomorrow 7 AM' },
                { product: 'Free-Range Country Eggs', variant: '6 Eggs / Weekly', price: '₹120/week', status: 'Active', nextDelivery: 'Friday 7 AM' },
              ].map((sub) => (
                <div key={sub.product} className="bg-white rounded-2xl border border-[#e4e2e1] p-5 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="font-body font-bold text-sm text-[#012d1d]">{sub.product}</p>
                    <p className="font-body text-xs text-[#717973] mt-0.5">{sub.variant} · {sub.price}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-[#a4f792] text-[#002201] text-[10px] font-bold px-2.5 py-0.5 rounded-full">{sub.status}</span>
                    <p className="font-body text-[11px] text-[#717973] mt-1">Next: {sub.nextDelivery}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <>
            <h1 className="font-display text-3xl font-bold text-[#012d1d] mb-6">Saved Addresses</h1>
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6">
              <div className="flex items-start justify-between mb-2">
                <p className="font-body font-bold text-sm text-[#012d1d]">Home</p>
                <span className="bg-[#d1e7dd] text-[#012d1d] text-[10px] font-bold px-2 py-0.5 rounded-full">Default</span>
              </div>
              <p className="font-body text-xs text-[#414844]">123 Farm Lane, Banjara Hills</p>
              <p className="font-body text-xs text-[#717973]">Hyderabad, Telangana - 500001</p>
              <p className="font-body text-xs text-[#717973] mt-1">📞 +91 98765 43210</p>
            </div>
          </>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <>
            <h1 className="font-display text-3xl font-bold text-[#012d1d] mb-6">My Profile</h1>
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 space-y-4 max-w-lg">
              <div><label className="block font-body text-[10px] uppercase tracking-wider text-[#717973] font-semibold mb-1">Full Name</label><input type="text" defaultValue={user?.displayName || 'John Doe'} className="w-full px-4 py-2.5 border border-[#c1c8c2] rounded-lg bg-[#fcf9f8] font-body text-sm" /></div>
              <div><label className="block font-body text-[10px] uppercase tracking-wider text-[#717973] font-semibold mb-1">Email</label><input type="email" defaultValue={user?.email || 'john@example.com'} className="w-full px-4 py-2.5 border border-[#c1c8c2] rounded-lg bg-[#fcf9f8] font-body text-sm" /></div>
              <button type="button" className="bg-[#012d1d] text-white text-xs font-bold px-6 py-2.5 rounded-lg">Save Changes</button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
