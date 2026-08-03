'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { db } from '@/lib/firebase/client'
import { doc, getDoc } from 'firebase/firestore'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', category: '', sku: '', price: '', stock: '', unit: '', shortDescription: '', fullDescription: '', status: 'Active' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const load = async () => {
      const { id } = await params
      const docRef = doc(db, 'products', id)
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        const data = snap.data()
        setFormData({
          name: data.name || '',
          category: data.categoryId || '',
          sku: data.sku || '',
          price: ((data.basePrice || 0) / 100).toString(),
          stock: data.stock?.toString() || '',
          unit: data.unit || '',
          shortDescription: data.shortDescription || '',
          fullDescription: data.fullDescription || '',
          status: data.active ? 'Active' : 'Inactive',
        })
      }
      setLoading(false)
    }
    load()
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { id } = await params
      const token = await user?.getIdToken()
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...formData,
          basePrice: Number(formData.price) * 100,
          active: formData.status === 'Active',
        }),
      })
      if (!res.ok) throw new Error('Failed to update product')
      router.push('/admin/dashboard')
    } catch (err) {
      console.error(err)
      alert('Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>Loading...</div>

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <div className="mb-8">
        <button onClick={() => router.back()} className="font-body text-sm text-primary hover:underline mb-2">← Back</button>
        <h1 className="font-display text-3xl font-bold text-primary">Edit Product</h1>
        <p className="font-body text-on-surface-variant mt-1">Update product information</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-primary mb-4">Product Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium mb-1">Product Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" required />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body bg-white" required>
                  <option value="">Select category</option>
                  <option value="milk">Milk & Dairy</option>
                  <option value="chicken">Meats</option>
                  <option value="eggs">Poultry</option>
                  <option value="vegetables">Produce</option>
                  <option value="sweets">Sweets</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">SKU</label>
                <input type="text" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Short Description *</label>
                <textarea value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" rows={3} required />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Full Description</label>
                <textarea value={formData.fullDescription} onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" rows={5} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-primary mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-medium mb-1">Price (₹) *</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" required />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Unit *</label>
                <select value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body bg-white" required>
                  <option value="litre">Litre</option>
                  <option value="kg">Kg</option>
                  <option value="piece">Piece</option>
                  <option value="dozen">Dozen</option>
                  <option value="bunch">Bunch</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Stock Quantity *</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" required />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body bg-white">
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-primary mb-4">Product Image</h2>
            <label className="aspect-square bg-surface-container rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <span className="text-4xl mb-2">📷</span>
              <p className="font-body text-sm text-muted-foreground">Click to upload image</p>
              <p className="font-body text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-primary mb-4">Product Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium mb-1">Ingredients</label>
                <textarea className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" rows={3} placeholder="List ingredients" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Shelf Life</label>
                <input type="text" className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" placeholder="e.g., 7 days" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Storage Instructions</label>
                <textarea className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" rows={3} placeholder="Storage guidelines" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="flex-1 btn-primary disabled:opacity-50">{saving ? 'Updating...' : 'Update Product'}</button>
            <button type="button" onClick={() => router.back()} className="flex-1 btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
