'use client'

import { CartItem } from '@/types'

const CART_STORAGE_KEY = 'pothana_cart_items'

export function getLocalCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (!saved) return []
    return JSON.parse(saved)
  } catch {
    return []
  }
}

export function saveLocalCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    window.dispatchEvent(new Event('cart_updated'))
  } catch {
    // ignore
  }
}

export function addToLocalCart(product: { id: string; name: string; price: number; imageUrl: string; variantName?: string }, qty: number = 1): CartItem[] {
  const current = getLocalCart()
  const existingIndex = current.findIndex(i => i.productId === product.id)

  let updated: CartItem[]
  if (existingIndex > -1) {
    updated = [...current]
    const item = updated[existingIndex]
    const newQty = item.quantity + qty
    updated[existingIndex] = {
      ...item,
      quantity: newQty,
      total: item.unitPrice * newQty,
    }
  } else {
    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      productId: product.id,
      productName: product.name,
      productImage: product.imageUrl,
      quantity: qty,
      unitPrice: product.price,
      total: product.price * qty,
      variantName: product.variantName || '1 Unit',
    }
    updated = [...current, newItem]
  }

  saveLocalCart(updated)
  return updated
}

export function updateCartQuantity(itemId: string, delta: number): CartItem[] {
  const current = getLocalCart()
  const updated = current.map(item => {
    if (item.id === itemId) {
      const newQty = Math.max(1, item.quantity + delta)
      return {
        ...item,
        quantity: newQty,
        total: item.unitPrice * newQty,
      }
    }
    return item
  })
  saveLocalCart(updated)
  return updated
}

export function removeFromCart(itemId: string): CartItem[] {
  const current = getLocalCart()
  const updated = current.filter(item => item.id !== itemId)
  saveLocalCart(updated)
  return updated
}
