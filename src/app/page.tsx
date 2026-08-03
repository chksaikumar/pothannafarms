import Link from 'next/link'

const categories = [
  {
    name: 'Fresh Milk',
    slug: 'milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&q=80',
  },
  {
    name: 'Farm Eggs',
    slug: 'eggs',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
  },
  {
    name: 'Country Chicken',
    slug: 'chicken',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80',
  },
  {
    name: 'Traditional Sweets',
    slug: 'sweets',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80',
  },
  {
    name: 'Fresh Vegetables',
    slug: 'vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Hero Banner Section */}
      <section className="px-4 lg:px-10 pt-4 pb-12 max-w-[1400px] mx-auto">
        <div className="relative rounded-[28px] overflow-hidden min-h-[500px] lg:min-h-[580px] flex items-center shadow-md">
          {/* Hero Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=85')`,
            }}
          />
          
          {/* Soft Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

          {/* Hero Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-2xl text-white">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 border border-white/30">
              ROOTED IN TRADITION
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Fresh from Our Farm to Your Family
            </h1>

            <p className="font-body text-base sm:text-lg opacity-90 mb-8 leading-relaxed font-normal text-white/95 max-w-xl">
              Fresh milk, free-range eggs, country chicken, traditional sweets and naturally grown farm products delivered directly to your home.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/shop" 
                className="bg-[#f5e6d3] text-[#1b4332] font-body font-bold text-sm px-7 py-3.5 rounded-xl hover:bg-white transition-all shadow-md active:scale-95"
              >
                Shop Fresh Products
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-white/80 text-white font-body font-semibold text-sm px-7 py-3.5 rounded-xl hover:bg-white/10 transition-all backdrop-blur-xs"
              >
                Explore Our Farm
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Fresh Categories Section */}
      <section className="px-4 lg:px-10 py-8 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1b4332]">
            Farm Fresh Categories
          </h2>
          <Link 
            href="/shop" 
            className="font-body text-sm font-semibold text-[#1b4332] hover:underline flex items-center gap-1.5"
          >
            <span>View All</span>
            <span>→</span>
          </Link>
        </div>

        {/* 5-Column Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              href="/shop" 
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 block"
            >
              {/* Category Card Image */}
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Label Title */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-body text-base font-bold text-white tracking-wide">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Footer Section matching screenshot */}
      <footer className="bg-[#052e16] text-white mt-20 pt-14 pb-10 border-t border-emerald-950">
        <div className="px-4 lg:px-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>🌿</span> Pothana Farms
              </h3>
              <p className="font-body text-xs text-emerald-200/80 leading-relaxed">
                © 2024 Pothana Farms. Rooted in Tradition, Delivered with Care.
              </p>
            </div>

            <div>
              <h4 className="font-body text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2.5 font-body text-xs text-emerald-200/80">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-bold text-white uppercase tracking-wider mb-4">Policies</h4>
              <ul className="space-y-2.5 font-body text-xs text-emerald-200/80">
                <li><Link href="/about" className="hover:text-white transition-colors">Sourcing Policy</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Freshness Guarantee</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-bold text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2.5 font-body text-xs text-emerald-200/80">
                <li><Link href="/about" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
