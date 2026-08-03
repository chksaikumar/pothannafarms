'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addToLocalCart } from '@/lib/cart-store'

const chickenImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD-jQOSkxJCnISZSf1E12gI4eLf61ZvZZjcsENwdL-wWCRs3j4e5fZ1usFiTVOte6uSB1BvODrVr2o9KZgiQ3b0J27IMIfz4SSb34MtRsWZ0HCOKQQ27zb0xZcrZllov1_wKtDBpTah8OqeKBYMl15JX3OuTKK2TlLPu3pLQ-S78cC6wXEOsptsGnMNRb07MVHy2g_8Tm-t90I4wrIfFKgpnLPSVIJmmjd56_1m3dk4Qk2DcsYJEku6',
  'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80',
  'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&q=80',
  'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?w=400&q=80',
]

export default function CountryChickenPage() {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [cutType, setCutType] = useState('Curry Cut')
  const [skinPref, setSkinPref] = useState('Skinless')
  const [weight, setWeight] = useState('1kg')
  const [quantity, setQuantity] = useState(1)

  const priceMap: Record<string, number> = { '500g': 280, '1kg': 550, '2kg': 1050 }
  const price = priceMap[weight] || 550

  const handleAddToCart = () => {
    addToLocalCart({
      id: 'country-chicken',
      name: 'Farm-Fresh Country Chicken',
      price,
      imageUrl: chickenImages[0],
      variantName: `${weight} · ${cutType} · ${skinPref}`,
    }, quantity)
    router.push('/cart')
  }

  const handleBuyNow = () => {
    addToLocalCart({
      id: 'country-chicken',
      name: 'Farm-Fresh Country Chicken',
      price,
      imageUrl: chickenImages[0],
      variantName: `${weight} · ${cutType} · ${skinPref}`,
    }, quantity)
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-6">
        {/* Breadcrumb */}
        <nav className="font-body text-xs text-[#717973] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#012d1d] flex items-center gap-1">🏠 Home</Link>
          <span>›</span>
          <Link href="/shop" className="hover:text-[#012d1d]">Chicken</Link>
          <span>›</span>
          <span className="text-[#1b1c1c] font-medium">Country Chicken</span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-16">
          {/* Left: Images */}
          <div>
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#e4e2e1] mb-4 aspect-[4/3]">
              <img
                src={chickenImages[selectedImage]}
                alt="Farm-Fresh Country Chicken"
                className="w-full h-full object-cover"
              />
              {/* Freshness Badge */}
              <span className="absolute top-4 left-4 bg-[#d1e7dd] text-[#012d1d] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-[#a5d0b9]">
                <span className="w-2 h-2 rounded-full bg-[#1f6d1a]" />
                Harvested 4h ago
              </span>
            </div>

            {/* Thumbnails Row */}
            <div className="flex gap-3">
              {chickenImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-[#012d1d] shadow-md' : 'border-[#e4e2e1] hover:border-[#012d1d]/50'
                  }`}
                >
                  {i < 3 ? (
                    <img src={img} alt={`Chicken view ${i + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#f0eded] flex flex-col items-center justify-center text-[#717973]">
                      <span className="text-xl">▶</span>
                      <span className="text-[9px] font-semibold mt-0.5">Farm Video</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-[#012d1d] mb-3 tracking-tight">
              Farm-Fresh Country Chicken
            </h1>
            <p className="font-body text-sm text-[#414844] leading-relaxed mb-6 max-w-lg">
              Antibiotic-free, free-range country chicken. Our birds are raised naturally in an open environment, foraging on natural feed for an authentic, robust flavor.
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="font-display text-5xl font-bold text-[#012d1d]">₹{price}</span>
              <span className="font-body text-sm text-[#717973]">/ kg</span>
            </div>

            {/* Select Cut Type */}
            <div className="mb-6">
              <p className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3">Select Cut Type</p>
              <div className="flex gap-3">
                {['Curry Cut', 'Biryani Cut', 'Whole'].map((cut) => (
                  <button
                    key={cut}
                    type="button"
                    onClick={() => setCutType(cut)}
                    className={`px-6 py-2.5 rounded-lg border text-sm font-semibold transition-all ${
                      cutType === cut
                        ? 'bg-[#d1e7dd] border-[#1b4332] text-[#012d1d]'
                        : 'bg-white border-[#c1c8c2] text-[#414844] hover:border-[#012d1d]'
                    }`}
                  >
                    {cut}
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Preference */}
            <div className="mb-6">
              <p className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3">Skin Preference</p>
              <div className="flex items-center gap-6">
                {['Skinless', 'With Skin'].map((pref) => (
                  <label key={pref} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="skin"
                      value={pref}
                      checked={skinPref === pref}
                      onChange={() => setSkinPref(pref)}
                      className="accent-[#012d1d] w-4 h-4"
                    />
                    <span className="font-body text-sm text-[#1b1c1c]">{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Select Weight + Quantity */}
            <div className="flex flex-wrap items-end gap-6 mb-8">
              <div>
                <p className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3">Select Weight</p>
                <div className="flex border border-[#c1c8c2] rounded-lg overflow-hidden bg-white">
                  {['500g', '1kg', '2kg'].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeight(w)}
                      className={`px-6 py-2.5 text-sm font-semibold transition-all border-r last:border-r-0 border-[#c1c8c2] ${
                        weight === w
                          ? 'bg-[#d1e7dd] text-[#012d1d]'
                          : 'text-[#414844] hover:bg-[#f0eded]'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-body text-xs font-bold text-[#1b1c1c] uppercase tracking-wider mb-3">Quantity</p>
                <div className="flex items-center border border-[#c1c8c2] rounded-lg overflow-hidden bg-white">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2.5 text-lg font-bold text-[#414844] hover:bg-[#f0eded]">
                    −
                  </button>
                  <span className="px-5 py-2.5 font-bold text-[#012d1d] border-x border-[#c1c8c2] min-w-[48px] text-center">
                    {quantity}
                  </span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="px-4 py-2.5 text-lg font-bold text-[#414844] hover:bg-[#f0eded]">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#012d1d] text-[#012d1d] py-4 rounded-xl font-body font-bold text-sm hover:bg-[#f0f4f1] active:scale-95 transition-all"
              >
                <span>🛒</span>
                <span>Add to Cart</span>
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-[#f5e6d3] text-[#1b4332] py-4 rounded-xl font-body font-bold text-sm hover:bg-[#ebd3b5] active:scale-95 transition-all shadow-sm"
              >
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* The Pothana Promise Section */}
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold text-[#012d1d] mb-6">The Pothana Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6">
              <div className="w-10 h-10 rounded-full bg-[#d1e7dd] flex items-center justify-center mb-4 text-lg">🛡️</div>
              <h3 className="font-body text-sm font-bold text-[#012d1d] mb-2">Freshness Guarantee</h3>
              <p className="font-body text-xs text-[#717973] leading-relaxed">
                Processed exactly 4 hours before delivery in our temperature-controlled facility to ensure peak texture and flavor.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6">
              <div className="w-10 h-10 rounded-full bg-[#d1e7dd] flex items-center justify-center mb-4 text-lg">🏠</div>
              <h3 className="font-body text-sm font-bold text-[#012d1d] mb-2">Hygiene Standards</h3>
              <p className="font-body text-xs text-[#717973] leading-relaxed">
                Cleaned thoroughly with RO water. Vacuum sealed immediately to prevent contamination and maintain moisture.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#e4e2e1] p-6">
              <div className="w-10 h-10 rounded-full bg-[#ffdcbd] flex items-center justify-center mb-4 text-lg">🍳</div>
              <h3 className="font-body text-sm font-bold text-[#012d1d] mb-2">Cooking Recommendations</h3>
              <p className="font-body text-xs text-[#717973] leading-relaxed">
                Requires slightly longer slow-cooking compared to broiler chicken to break down natural fibers and release deep flavors.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#052e16] text-white pt-14 pb-10">
        <div className="px-4 lg:px-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="font-display text-xl font-bold mb-3">🌿 Pothana Farms</h3>
              <p className="font-body text-xs text-emerald-200/80">© 2024 Pothana Farms. Rooted in Tradition, Delivered with Care.</p>
            </div>
            <div><ul className="space-y-2 font-body text-xs text-emerald-200/80"><li><Link href="/about" className="hover:text-white">About Us</Link></li><li><Link href="/about" className="hover:text-white">Sourcing Policy</Link></li></ul></div>
            <div><ul className="space-y-2 font-body text-xs text-emerald-200/80"><li><Link href="/about" className="hover:text-white">Freshness Guarantee</Link></li><li><Link href="/about" className="hover:text-white">Shipping Policy</Link></li></ul></div>
            <div><ul className="space-y-2 font-body text-xs text-emerald-200/80"><li><Link href="/about" className="hover:text-white">Privacy Policy</Link></li><li><Link href="/about" className="hover:text-white">Contact Support</Link></li></ul></div>
          </div>
        </div>
      </footer>
    </div>
  )
}
