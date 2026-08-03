'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { addToLocalCart } from '@/lib/cart-store'

interface SweetProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  unit: string
  description: string
  badge?: string
  badgeColor?: string
  imageUrl: string
  tag?: string
}

export default function SweetsPage() {
  const router = useRouter()
  const [filter, setFilter] = useState('All')

  const sweets: SweetProduct[] = [
    {
      id: 'chekkilalu',
      name: 'Traditional Chekkilalu',
      price: 120,
      unit: 'per 250g',
      description: 'Crispy, spiral-shaped savory snacks made from premium rice flour, roasted gram, and a blend of aromatic village spices. Perfect with evening chai.',
      badge: 'Freshly Fried',
      badgeColor: 'bg-[#1f6d1a] text-white',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCASlNAggo7AQwFLxwZCBrSnHrZQyPCycxsq23owjG3NamLaU1ON566HZ78EEdB94qIWO5CtH6idMZP3z8C-ZTkenrKnWawA7nL7Nlz7Z02uSF1NX01OpnQm2S0S3DGo272VJP8iXGnRZ8DuCV2LoNrnNZMJUEQXNumU0MeHi643h0udG0LNyN2LjSzhwd7MTuuw3-CWYog8KH2mXr2oAMuKl1zojtFR8Ja7iPjXWFLmLsLIzaoaaOh',
      tag: 'Stone Ground Rice Flour',
    },
    {
      id: 'appadam',
      name: 'Sun-dried Appadam',
      price: 80,
      unit: 'per pack',
      description: 'Hand-rolled lentil wafers dried under the village sun.',
      badge: 'Sun-Dried',
      badgeColor: 'bg-[#56340e] text-[#ffdcbd]',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu6JHWJRRX2FAbieU1z0V5VjvU9AFDNS6QdYPCOmAJcaYEOlw2QsMj7fQLs0gW_xXfr3_IjMhXNBTfRxSczaOuyu3tfGkaxSBydPkIsvcN6YuLy0My3ljwjJe1sNJV2nyM_pR1qGZHRQ-yH3Smv0mKcS-S2cdsENpzzDeHWgFql6TX0Szem-Q2ruNB3Pif2meeEM9cRbQN0ZYt5toJZ2lLrr7Mb8z4_Ee1pDTUw3406dS4V0VFn8A1',
    },
    {
      id: 'farm-mithai',
      name: 'Assorted Farm Mithai',
      price: 350,
      originalPrice: 400,
      unit: 'per box',
      description: 'A curated selection of our finest milk-based sweets, made with fresh A2 milk from our dairy.',
      badge: 'Gift Box',
      badgeColor: 'bg-white text-[#012d1d] border border-[#c1c8c2]',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxVmx_qYa5KHhSAJLCgEkRZDn-en7yCpPNU72Rf5VtFU245CFOBFJ9Xz93eah1mza-2G_cZA52tC9smT9v-siXxUwJ7hXhrCAGkSukdvb09Mb57_BwQn409VI6FJMA1Bb4fIkGIhcy-ca-v6jsfRvrbtV3mvHLavEAJyGZFoPRlbbtQfcdydHRylyicrxkV7B3IveSz54VmMZ_Xxd6d2bMpDxtzXjId3C17oKSKpa-63rCClmovUf3',
    },
    {
      id: 'ladoo',
      name: 'Traditional Ladoo',
      price: 200,
      unit: 'per 250g',
      description: 'Rich, melt-in-your-mouth besan ladoos crafted with pure country ghee and organic jaggery.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK4bkBp4-gi8DqawDiVdYUbbC4MDdV1OWxYPRQa0f7-olNr8YyUvsNQLBFi1ZFbMI543sEQShfYW2fVdbwgf78iHDiWJ3aEUQWxEn2JaDLh0HBbuU_-5ortJEdmsXyFzGq1AFO_S9cg9NTS44-ZkDrwUzp87LBirOFWiFTIO57YhhcIkgA2DeNJtDh-tNKWhI04emoXIBNefdOV7Dr1tV0dTn5WWBZXmfzFdVHBaoDxq722_vOIvhx',
    },
  ]

  const handleAddToCart = (product: SweetProduct) => {
    addToLocalCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      variantName: product.unit,
    })
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#1b1c1c] font-body flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-[#f0eded]">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDEln3lZ1rbCnM7P8ymo55uQlv9zLvU3dwEOLo4Q4zII-ttMZCrvlItaNhfVaa54CTIbE-m15A-HJaQwBXRHySWKQBLLg0njM9Pvt0-cpidw3zWNOcITq_mYYb1B7ENeISiPTomiynpf8tUOdX2JL4KolTYNJ84iNVH4XJebJcrwwRluud9KyRbEUC867mM8NApAGrjKyklIhmFib3KuKt693U2uOVqqM5sOregTHAUMDZZL58pEiH')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f8]/95 via-[#fcf9f8]/70 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-4 bg-[#1f6d1a]/10 text-[#005303] text-xs font-bold rounded-full border border-[#1f6d1a]/20">
              Artisanal Heritage
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-[#012d1d] mb-4 leading-tight">
              Handmade Sweets &amp; Savories
            </h1>
            <p className="font-body text-base lg:text-lg text-[#414844] mb-8 max-w-xl leading-relaxed">
              Traditional recipes passed down through generations, made with pure farm ingredients and love. Bringing the authentic taste of the village to your home.
            </p>
            <button
              type="button"
              onClick={() => {
                document.getElementById('sweets-collection')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-[#56340e] hover:bg-[#3b1f00] text-white transition-colors duration-300 px-8 py-3.5 rounded-full font-body font-bold text-sm flex items-center gap-2 shadow-lg"
            >
              Explore Collection →
            </button>
          </div>
        </div>
      </section>

      {/* Category Content */}
      <section id="sweets-collection" className="w-full max-w-[1280px] mx-auto px-6 lg:px-10 py-10">
        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8">
          {['All', 'Sweets', 'Snacks', 'Savories'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-body text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-[#012d1d] text-white shadow-sm'
                  : 'bg-white hover:bg-[#e4e2e1] text-[#414844] border border-[#c1c8c2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {/* Product 1: Chekkilalu (Large) */}
          <article className="col-span-1 md:col-span-8 group relative bg-white rounded-2xl overflow-hidden border border-[#e4e2e1] shadow-sm hover:shadow-md transition-all duration-500 min-h-[420px] flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 h-64 md:h-full relative overflow-hidden">
              <img
                src={sweets[0].imageUrl}
                alt={sweets[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#1f6d1a] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                🔥 Freshly Fried
              </div>
            </div>
            <div className="w-full md:w-2/5 p-6 flex flex-col justify-between bg-white">
              <div>
                <p className="text-[11px] text-[#717973] font-semibold mb-1">🌿 {sweets[0].tag}</p>
                <h3 className="font-display text-2xl font-bold text-[#012d1d] mb-2">{sweets[0].name}</h3>
                <p className="font-body text-xs text-[#414844] leading-relaxed mb-4">{sweets[0].description}</p>
              </div>
              <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#e4e2e1]">
                <div>
                  <span className="font-display text-3xl font-bold text-[#012d1d]">₹{sweets[0].price}</span>
                  <span className="font-body text-xs text-[#717973] block">{sweets[0].unit}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(sweets[0])}
                  className="w-11 h-11 rounded-full bg-[#a4f792] text-[#002201] flex items-center justify-center font-bold text-lg hover:bg-[#8ee87b] transition-colors shadow-sm"
                >
                  🛒
                </button>
              </div>
            </div>
          </article>

          {/* Product 2: Appadam */}
          <article className="col-span-1 md:col-span-4 group relative bg-white rounded-2xl overflow-hidden border border-[#e4e2e1] shadow-sm hover:shadow-md transition-all duration-500 min-h-[420px] flex flex-col">
            <div className="w-full h-56 relative overflow-hidden">
              <img
                src={sweets[1].imageUrl}
                alt={sweets[1].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#56340e] text-[#ffdcbd] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                ☀️ Sun-Dried
              </div>
            </div>
            <div className="w-full p-5 flex flex-col justify-between flex-1 bg-white">
              <div>
                <h3 className="font-display text-xl font-bold text-[#012d1d] mb-1">{sweets[1].name}</h3>
                <p className="font-body text-xs text-[#414844] leading-relaxed">{sweets[1].description}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e4e2e1]">
                <span className="font-display text-2xl font-bold text-[#012d1d]">₹{sweets[1].price}</span>
                <button
                  type="button"
                  onClick={() => handleAddToCart(sweets[1])}
                  className="px-4 py-2 rounded-full border-2 border-[#012d1d] text-[#012d1d] font-body text-xs font-bold hover:bg-[#012d1d] hover:text-white transition-colors"
                >
                  Add +
                </button>
              </div>
            </div>
          </article>

          {/* Product 3: Assorted Farm Mithai */}
          <article className="col-span-1 md:col-span-6 group relative bg-white rounded-2xl overflow-hidden border border-[#e4e2e1] shadow-sm hover:shadow-md transition-all duration-500 min-h-[350px] flex flex-col">
            <div className="w-full h-48 relative overflow-hidden">
              <img
                src={sweets[2].imageUrl}
                alt={sweets[2].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white text-[#012d1d] border border-[#c1c8c2] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                🎁 Gift Box
              </div>
            </div>
            <div className="w-full p-5 flex flex-col justify-between flex-1 bg-white">
              <div>
                <h3 className="font-display text-xl font-bold text-[#012d1d] mb-1">{sweets[2].name}</h3>
                <p className="font-body text-xs text-[#414844] leading-relaxed">{sweets[2].description}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e4e2e1]">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-[#012d1d]">₹{sweets[2].price}</span>
                  <span className="font-body text-xs text-[#717973] line-through">₹{sweets[2].originalPrice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(sweets[2])}
                  className="px-6 py-2.5 rounded-full bg-[#012d1d] text-white font-body text-xs font-bold hover:bg-[#1b4332] transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>

          {/* Product 4: Traditional Ladoo */}
          <article className="col-span-1 md:col-span-6 group relative bg-white rounded-2xl overflow-hidden border border-[#e4e2e1] shadow-sm hover:shadow-md transition-all duration-500 min-h-[350px] flex flex-col">
            <div className="w-full h-48 relative overflow-hidden">
              <img
                src={sweets[3].imageUrl}
                alt={sweets[3].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full p-5 flex flex-col justify-between flex-1 bg-white">
              <div>
                <h3 className="font-display text-xl font-bold text-[#012d1d] mb-1">{sweets[3].name}</h3>
                <p className="font-body text-xs text-[#414844] leading-relaxed">{sweets[3].description}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#e4e2e1]">
                <span className="font-display text-2xl font-bold text-[#012d1d]">₹{sweets[3].price}</span>
                <button
                  type="button"
                  onClick={() => handleAddToCart(sweets[3])}
                  className="px-6 py-2.5 rounded-full border-2 border-[#012d1d] text-[#012d1d] font-body text-xs font-bold hover:bg-[#012d1d] hover:text-white transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#f0eded] border-y border-[#e4e2e1] py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#c1ecd4] flex items-center justify-center text-xl">🌾</div>
            <span className="font-body text-xs font-bold text-[#012d1d]">Direct from Farm</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#c1ecd4] flex items-center justify-center text-xl">🌱</div>
            <span className="font-body text-xs font-bold text-[#012d1d]">100% Natural</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#c1ecd4] flex items-center justify-center text-xl">❤️</div>
            <span className="font-body text-xs font-bold text-[#012d1d]">Handmade with Love</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-14 h-14 rounded-full bg-[#c1ecd4] flex items-center justify-center text-xl">🚚</div>
            <span className="font-body text-xs font-bold text-[#012d1d]">Fresh Delivery</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#012d1d] text-white py-12 border-t-0 mt-auto">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-2">Pothana Farms</h3>
            <p className="font-body text-xs text-[#a5d0b9]">Rooted in Tradition, Delivered with Care.</p>
          </div>
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-wider text-[#a5d0b9] mb-3">Company</h4>
            <ul className="space-y-2 text-xs font-body text-slate-300">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/about">Sourcing Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-wider text-[#a5d0b9] mb-3">Customer</h4>
            <ul className="space-y-2 text-xs font-body text-slate-300">
              <li><Link href="/about">Freshness Guarantee</Link></li>
              <li><Link href="/about">Shipping Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-xs font-bold uppercase tracking-wider text-[#a5d0b9] mb-3">Legal</h4>
            <ul className="space-y-2 text-xs font-body text-slate-300">
              <li><Link href="/about">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
