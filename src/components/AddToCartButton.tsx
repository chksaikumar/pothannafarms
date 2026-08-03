'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addToLocalCart } from '@/lib/cart-store'

interface Product {
  id: string
  name: string
  basePrice?: number
  price?: number
  discountPrice?: number
  images?: string[]
  imageUrl?: string
  variantName?: string
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const price = product.price || product.discountPrice || product.basePrice || 90
  const image = product.imageUrl || product.images?.[0] || 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600'

  const handleAddToCart = () => {
    setAdding(true)
    setMessage('')

    addToLocalCart({
      id: product.id,
      name: product.name,
      price,
      imageUrl: image,
      variantName: product.variantName,
    }, quantity)

    setMessage('✓ Added to Cart!')

    setTimeout(() => {
      setAdding(false)
      router.push('/cart')
    }, 400)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-border rounded-xl bg-surface overflow-hidden">
          <button 
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))} 
            className="px-3.5 py-2 font-bold hover:bg-white transition-colors text-lg"
          >
            −
          </button>
          <span className="px-4 py-2 font-body font-bold text-primary border-x border-border min-w-[40px] text-center">
            {quantity}
          </span>
          <button 
            type="button"
            onClick={() => setQuantity(quantity + 1)} 
            className="px-3.5 py-2 font-bold hover:bg-white transition-colors text-lg"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={adding}
          className="flex-1 bg-primary text-white py-3.5 px-6 rounded-xl font-body font-bold hover:bg-primary-dark active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>🛒</span>
          <span>{adding ? 'Adding...' : 'Add to Cart'}</span>
        </button>
      </div>
      {message && <p className="font-body text-xs font-bold text-emerald-600 text-center animate-fade-in">{message}</p>}
    </div>
  )
}
