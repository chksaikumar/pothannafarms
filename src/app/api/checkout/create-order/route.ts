import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase/admin'
import { getProductById, getProductVariants } from '@/services/product.service'

export async function POST(request: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 })
    }

    const Razorpay = (await import('razorpay')).default
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })

    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { items, shippingAddress, couponId, deliveryCharge } = await request.json()
    
    let subtotal = 0
    let discount = 0
    
    for (const item of items) {
      const product = await getProductById(item.productId)
      if (!product || !product.active) {
        return NextResponse.json({ error: `Product ${item.productId} not available` }, { status: 400 })
      }
      
      const variants = await getProductVariants(item.productId)
      const variant = variants.find(v => v.id === item.variantId)
      if (!variant || !variant.active) {
        return NextResponse.json({ error: `Variant not available` }, { status: 400 })
      }
      
      if (variant.availableStock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 })
      }
      
      const price = variant.discountPrice || variant.price
      subtotal += price * item.quantity
    }
    
    if (couponId) {
      const couponDoc = await adminDb.collection('coupons').doc(couponId).get()
      if (!couponDoc.exists) {
        return NextResponse.json({ error: 'Invalid coupon' }, { status: 400 })
      }
      const coupon = couponDoc.data()
      if (coupon && coupon.type === 'percentage') {
        discount = Math.floor((subtotal * coupon.value) / 100)
      } else if (coupon) {
        discount = coupon.value
      }
    }
    
    const tax = Math.floor(subtotal * 0.05)
    const total = subtotal - discount + deliveryCharge + tax
    
    const options = {
      amount: total,
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    }
    
    const razorpayOrder = await razorpay.orders.create(options)
    
    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 })
  }
}
