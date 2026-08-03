'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getLocalCart } from '@/lib/cart-store'
import { DUMMY_PRODUCTS } from '@/lib/dummy-data'
import { CartItem } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    streetAddress: '123 Farm Lane, Jubilee Hills',
    city: 'Hyderabad',
    pincode: '500033',
    phone: '+91 98765 43210',
    selectedDate: 'Tomorrow, 7:00 AM',
    paymentMethod: 'cod',
  })

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1)

  useEffect(() => {
    let items = getLocalCart()
    if (!items || items.length === 0) {
      items = [
        { 
          id: 'c1', 
          productId: 'p1', 
          productName: 'A2 Cow Milk', 
          productImage: DUMMY_PRODUCTS[0].imageUrl, 
          quantity: 2, 
          unitPrice: 90, 
          total: 180, 
          variantName: '1 Litre' 
        },
        { 
          id: 'c2', 
          productId: 'country-chicken', 
          productName: 'Farm-Fresh Country Chicken', 
          productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-jQOSkxJCnISZSf1E12gI4eLf61ZvZZjcsENwdL-wWCRs3j4e5fZ1usFiTVOte6uSB1BvODrVr2o9KZgiQ3b0J27IMIfz4SSb34MtRsWZ0HCOKQQ27zb0xZcrZllov1_wKtDBpTah8OqeKBYMl15JX3OuTKK2TlLPu3pLQ-S78cC6wXEOsptsGnMNRb07MVHy2g_8Tm-t90I4wrIfFKgpnLPSVIJmmjd56_1m3dk4Qk2DcsYJEku6', 
          quantity: 1, 
          unitPrice: 550, 
          total: 550, 
          variantName: '1kg · Curry Cut · Skinless' 
        },
      ]
    }
    setCartItems(items)
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const deliveryFee = subtotal >= 500 ? 0 : 40
  const grandTotal = subtotal + deliveryFee

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pothana_cart_items')
      window.dispatchEvent(new Event('cart_updated'))
    }
    router.push('/order-confirmation')
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Checkout Main Container */}
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-8">
        {/* Header Breadcrumb / Back */}
        <div className="flex items-center justify-between mb-8 border-b border-[#e4e2e1] pb-4">
          <Link href="/cart" className="font-body text-xs font-bold text-[#012d1d] flex items-center gap-2 hover:underline">
            <span>← Back to Shopping Cart</span>
          </Link>
          <span className="font-display text-xl font-bold text-[#012d1d]">🌿 Checkout</span>
          <span className="font-body text-xs text-[#717973]">🔒 100% Secure Checkout</span>
        </div>

        {/* Steps Header */}
        <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
          {[
            { step: 1, label: '1. Delivery Address' },
            { step: 2, label: '2. Delivery Time & Payment' },
            { step: 3, label: '3. Order Summary' },
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step as 1 | 2 | 3)}
              className={`py-3 px-4 rounded-xl font-body text-xs font-bold text-center transition-all ${
                activeStep === s.step
                  ? 'bg-[#012d1d] text-white shadow-md'
                  : 'bg-white text-[#717973] border border-[#e4e2e1] hover:border-[#012d1d]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Form and Summary Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form Area */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e4e2e1] p-6 lg:p-8 space-y-8">
            {/* Step 1: Address */}
            {activeStep === 1 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#012d1d] mb-6">Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-xs font-bold text-[#1b1c1c] mb-1.5">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#c1c8c2] rounded-xl font-body text-sm bg-[#faf8f5] focus:outline-none focus:border-[#012d1d]"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-bold text-[#1b1c1c] mb-1.5">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#c1c8c2] rounded-xl font-body text-sm bg-[#faf8f5] focus:outline-none focus:border-[#012d1d]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-body text-xs font-bold text-[#1b1c1c] mb-1.5">Street Address / House No.</label>
                    <input
                      type="text"
                      required
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      className="w-full px-4 py-3 border border-[#c1c8c2] rounded-xl font-body text-sm bg-[#faf8f5] focus:outline-none focus:border-[#012d1d]"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-bold text-[#1b1c1c] mb-1.5">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-[#c1c8c2] rounded-xl font-body text-sm bg-[#faf8f5] focus:outline-none focus:border-[#012d1d]"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs font-bold text-[#1b1c1c] mb-1.5">Pincode</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-3 border border-[#c1c8c2] rounded-xl font-body text-sm bg-[#faf8f5] focus:outline-none focus:border-[#012d1d]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-body text-xs font-bold text-[#1b1c1c] mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#c1c8c2] rounded-xl font-body text-sm bg-[#faf8f5] focus:outline-none focus:border-[#012d1d]"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="mt-8 w-full bg-[#012d1d] text-white py-4 rounded-xl font-body font-bold text-sm hover:bg-[#1b4332] transition-all"
                >
                  Continue to Delivery & Payment →
                </button>
              </div>
            )}

            {/* Step 2: Payment & Delivery */}
            {activeStep === 2 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#012d1d] mb-6">Delivery Slot & Payment Method</h2>
                
                {/* Slot Choice */}
                <div className="mb-8">
                  <p className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3">Preferred Delivery Slot</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Tomorrow, 6:00 AM - 8:00 AM', 'Tomorrow, 7:00 AM - 9:00 AM', 'Tomorrow Evening 5:00 PM'].map((slot) => (
                      <label key={slot} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer ${formData.selectedDate === slot ? 'border-[#012d1d] bg-[#d1e7dd]' : 'border-[#c1c8c2] bg-white'}`}>
                        <input type="radio" name="slot" value={slot} checked={formData.selectedDate === slot} onChange={() => setFormData({ ...formData, selectedDate: slot })} className="accent-[#012d1d]" />
                        <span className="font-body text-xs font-semibold text-[#012d1d]">{slot}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-8">
                  <p className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3">Select Payment Method</p>
                  <div className="space-y-3">
                    {[
                      { id: 'cod', name: 'Cash / UPI on Delivery', desc: 'Pay when farm-fresh items reach your doorstep' },
                      { id: 'upi', name: 'Instant UPI / GPay / PhonePe', desc: 'Fast, secure UPI checkout' },
                      { id: 'card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay accepted' },
                    ].map((pm) => (
                      <label key={pm.id} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer ${formData.paymentMethod === pm.id ? 'border-[#012d1d] bg-[#d1e7dd]' : 'border-[#c1c8c2] bg-white'}`}>
                        <input type="radio" name="payment" value={pm.id} checked={formData.paymentMethod === pm.id} onChange={() => setFormData({ ...formData, paymentMethod: pm.id })} className="accent-[#012d1d] mt-1" />
                        <div>
                          <p className="font-body text-xs font-bold text-[#012d1d]">{pm.name}</p>
                          <p className="font-body text-[11px] text-[#717973] mt-0.5">{pm.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setActiveStep(1)} className="px-6 py-4 border border-[#c1c8c2] rounded-xl font-body font-bold text-sm text-[#414844]">
                    ← Back
                  </button>
                  <button type="button" onClick={() => setActiveStep(3)} className="flex-1 bg-[#012d1d] text-white py-4 rounded-xl font-body font-bold text-sm hover:bg-[#1b4332]">
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {activeStep === 3 && (
              <div>
                <h2 className="font-display text-2xl font-bold text-[#012d1d] mb-6">Review & Confirm Order</h2>
                <div className="bg-[#faf8f5] rounded-xl p-4 border border-[#e4e2e1] mb-6 text-xs space-y-2">
                  <p className="font-body text-[#1b1c1c]"><strong>Deliver To:</strong> {formData.firstName} {formData.lastName}, {formData.streetAddress}, {formData.city} - {formData.pincode}</p>
                  <p className="font-body text-[#1b1c1c]"><strong>Delivery Slot:</strong> {formData.selectedDate}</p>
                  <p className="font-body text-[#1b1c1c]"><strong>Payment Method:</strong> {formData.paymentMethod.toUpperCase()}</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#a4f792] text-[#002201] py-4 rounded-xl font-body font-bold text-base hover:bg-[#8ee87b] active:scale-95 transition-all shadow-md"
                >
                  Confirm & Place Order (₹{grandTotal}) 🎉
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6 sticky top-28">
              <h3 className="font-display text-xl font-bold text-[#012d1d] mb-4">Order Summary</h3>
              
              {/* Item List */}
              <div className="divide-y divide-[#e4e2e1] mb-6 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded-lg object-cover border border-[#e4e2e1]" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-bold text-[#012d1d] truncate">{item.productName}</p>
                      <p className="font-body text-[11px] text-[#717973]">{item.variantName} × {item.quantity}</p>
                    </div>
                    <p className="font-body text-xs font-bold text-[#012d1d]">₹{item.total}</p>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="border-t border-[#e4e2e1] pt-4 space-y-2 font-body text-xs mb-6">
                <div className="flex justify-between text-[#414844]"><span>Items Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between text-[#414844]">
                  <span>Delivery Charge</span>
                  <span className={deliveryFee === 0 ? 'text-green-700 font-bold' : ''}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#012d1d] pt-2 border-t border-[#e4e2e1]">
                  <span>Grand Total</span>
                  <span className="font-display text-xl">₹{grandTotal}</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-[#d1e7dd] rounded-xl p-3.5 border border-[#a5d0b9] text-[11px] font-body text-[#012d1d] space-y-1">
                <p className="font-bold">🌿 Pothana Freshness Guarantee</p>
                <p className="text-[#1b4332]">Directly sourced from our local farms. 100% natural, hygienic & vacuum sealed.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
