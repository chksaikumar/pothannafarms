'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { uploadFile, generateStoragePath } from '@/services/storage.service'

export default function AddProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', category: '', sku: '', price: '', stock: '', unit: '', shortDescription: '', fullDescription: '', status: 'Active' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  const categories = [
    { id: 'milk', name: 'Milk & Dairy' },
    { id: 'chicken', name: 'Meats' },
    { id: 'eggs', name: 'Poultry' },
    { id: 'vegetables', name: 'Produce' },
    { id: 'sweets', name: 'Sweets' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = ''
      if (imageFile) {
        const path = generateStoragePath('products', 'temp', imageFile.name)
        imageUrl = await uploadFile(path, imageFile)
      }
      const token = await user?.getIdToken()
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...formData,
          basePrice: Number(formData.price) * 100,
          images: imageUrl ? [imageUrl] : [],
          categoryName: categories.find(c => c.id === formData.category)?.name || '',
          active: formData.status === 'Active',
        }),
      })
      if (!res.ok) throw new Error('Failed to save product')
      router.push('/admin/dashboard')
    } catch (err) {
      console.error(err)
      alert('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <div className="mb-8">
        <button onClick={() => router.back()} className="font-body text-sm text-primary hover:underline mb-2">← Back</button>
        <h1 className="font-display text-3xl font-bold text-primary">Add New Product</h1>
        <p className="font-body text-on-surface-variant mt-1">Create a new farm product listing</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-primary mb-4">Product Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium mb-1">Product Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" placeholder="e.g., A2 Cow Milk" required />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body bg-white" required>
                  <option value="">Select category</option>
                  {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">SKU</label>
                <input type="text" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" placeholder="e.g., MLK-A2-1L" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Short Description *</label>
                <textarea value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" rows={3} placeholder="Brief product description" required />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Full Description</label>
                <textarea value={formData.fullDescription} onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" rows={5} placeholder="Detailed product description" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-display text-xl font-bold text-primary mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm font-medium mb-1">Price (₹) *</label>
                <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" placeholder="0.00" required />
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Unit *</label>
                <select value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body bg-white" required>
                  <option value="">Select unit</option>
                  <option value="litre">Litre</option>
                  <option value="kg">Kg</option>
                  <option value="piece">Piece</option>
                  <option value="dozen">Dozen</option>
                  <option value="bunch">Bunch</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium mb-1">Stock Quantity *</label>
                <input type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-body" placeholder="0" required />
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
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </label>
            {imageFile && <p className="font-body text-sm text-green-600 mt-2">Selected: {imageFile.name}</p>}
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
            <button type="submit" disabled={saving || !user} className="flex-1 btn-primary disabled:opacity-50">{saving ? 'Saving...' : 'Save Product'}</button>
            <button type="button" onClick={() => router.back()} className="flex-1 btn-secondary">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
