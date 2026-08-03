import Link from 'next/link'

const milestones = [
  { year: '2012', title: 'The Seed is Planted', desc: 'Founders return to their ancestral village, recognizing that the food supply chain was broken and making a vow to fix it.' },
  { year: '2015', title: 'First Harvest', desc: 'After years of soil rehabilitation using traditional methods, Pothana Farms yields its first fully organic crop cycle.' },
  { year: '2018', title: 'The Herd Grows', desc: 'Welcoming 12 indigenous Gir and Sahiwal cows, we begin producing authentic A2 milk—zero hormones, zero additives.' },
  { year: '2021', title: 'Farm-to-Home Begins', desc: 'Launching direct delivery to Hyderabad, cutting out middlemen and ensuring the freshest produce reaches your door within hours.' },
  { year: '2024', title: 'Pothana Online', desc: 'The e-commerce platform launches, connecting thousands of families across Telangana directly to our farm.' },
]

const values = [
  { icon: '🌾', title: 'Zero Compromises', desc: 'We never use synthetic pesticides, growth hormones, or preservatives. What grows on our farm is what arrives at your doorstep.' },
  { icon: '🐄', title: 'Animal Welfare First', desc: 'Our cows live stress-free lives on open pastures. We ensure calves are fed first—because healthy animals produce healthy food.' },
  { icon: '🌱', title: 'Living Soil', desc: 'Healthy food starts with healthy soil. We use traditional composting and crop rotation to keep our land alive and thriving.' },
  { icon: '🤝', title: 'Community Rooted', desc: 'We employ only local farmers and pay fair wages. Our success is the community\'s success.' },
  { icon: '🔍', title: 'Full Transparency', desc: 'You can visit our farm anytime. We have nothing to hide—our practices are open to scrutiny.' },
  { icon: '♻️', title: 'Planet Conscious', desc: 'Minimal packaging, zero plastic where possible, and carbon-offset delivery routes. The earth sustains us; we sustain it back.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a4d2e 100%)', padding: '120px var(--spacing-gutter) 100px' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative mx-auto text-center" style={{ maxWidth: 'var(--spacing-container-max)' }}>
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase">Our Story</span>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6" style={{ lineHeight: '1.1' }}>
            Rooted in Tradition.<br />
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Delivering Pure Nourishment.</span>
          </h1>
          <p className="font-body text-lg opacity-90 max-w-2xl mx-auto mb-8" style={{ lineHeight: '1.8' }}>
            Pothana Farms was born from a single conviction: that every family deserves food that is honest, pure, and full of life—straight from our soil to your table.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/shop" className="bg-white text-primary px-8 py-3.5 rounded-xl font-body font-bold hover:bg-opacity-90 transition-all shadow-lg">
              Shop Our Products
            </Link>
            <Link href="/subscription" className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-body font-bold hover:bg-white/10 transition-all">
              View Subscriptions
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '0 var(--spacing-gutter)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { stat: '12+', label: 'Years Farming' },
              { stat: '500+', label: 'Happy Families' },
              { stat: '100%', label: 'Chemical Free' },
              { stat: '0', label: 'Middlemen' },
            ].map((item) => (
              <div key={item.label} className="text-center py-8 px-4">
                <p className="font-display text-4xl font-bold text-primary mb-1">{item.stat}</p>
                <p className="font-body text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders & Story */}
      <section className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '80px var(--spacing-gutter)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Founders Featured Card */}
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img 
                src="/images/founders.jpg" 
                alt="Founders of Pothana Farms" 
                className="w-full h-[450px] object-cover object-top group-hover:scale-102 transition-transform duration-500"
              />
              <div className="p-6 bg-white border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-primary">The Pothana Family</h3>
                    <p className="font-body text-sm text-secondary font-semibold mt-0.5">Founders & Visionaries behind Pothana Farms</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
                    Est. 2012
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="font-body text-secondary font-semibold text-sm uppercase tracking-widest mb-4 block">Our Heritage</span>
            <h2 className="font-display text-4xl font-bold text-primary mb-6" style={{ lineHeight: '1.2' }}>
              From Our Family to Yours: Pure, Honest Living
            </h2>
            <p className="font-body text-on-surface-variant mb-5" style={{ lineHeight: '1.8' }}>
              Pothana Farms began with a simple, profound realization: the food reaching our city homes had lost its soul. In a world of mass production and chemical interventions, the pure, nourishing essence of traditional Indian agrarian heritage was being forgotten.
            </p>
            <p className="font-body text-on-surface-variant mb-5" style={{ lineHeight: '1.8' }}>
              We set out to bridge the gap between ancient farming wisdom and modern living. Our mission is not just to sell food, but to restore trust in the supply chain. We cultivate our lands using sustainable, time-tested methods, ensuring that every drop of milk, every egg, and every vegetable carries the integrity nature intended.
            </p>
            <p className="font-body text-on-surface-variant" style={{ lineHeight: '1.8' }}>
              Driven by a lifelong commitment to the land, the Pothana family established this farm to preserve the sacred bond between traditional farming heritage and the health of future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--color-surface)', padding: '80px var(--spacing-gutter)' }}>
        <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)' }}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-body text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">What We Believe</span>
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="font-body text-muted-foreground">Every decision we make—from how we treat our soil to how we package our goods—is guided by these principles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl border border-border p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-display text-xl font-bold text-primary mb-2">{value.title}</h3>
                <p className="font-body text-on-surface-variant text-sm" style={{ lineHeight: '1.7' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '80px var(--spacing-gutter)' }}>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-body text-secondary font-semibold text-sm uppercase tracking-widest mb-3 block">The Journey</span>
          <h2 className="font-display text-4xl font-bold text-primary mb-4">Our Milestones</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-6 -translate-x-1/2 w-3 h-3 bg-primary rounded-full mt-2 md:left-1/2" />
                <div className="pl-16 md:pl-0 md:w-1/2 md:pr-12">
                  <div className="bg-white rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                    <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{m.year}</span>
                    <h3 className="font-display text-lg font-bold text-primary mb-2">{m.title}</h3>
                    <p className="font-body text-sm text-muted-foreground" style={{ lineHeight: '1.7' }}>{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Images Mosaic */}
      <section style={{ background: 'var(--color-surface)', padding: '80px var(--spacing-gutter)' }}>
        <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)' }}>
          <h2 className="font-display text-4xl font-bold text-primary mb-2 text-center">Life at Pothana Farms</h2>
          <p className="font-body text-muted-foreground text-center mb-10">An open invitation — come visit us anytime.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" alt="Farm life 1" className="rounded-2xl w-full h-48 object-cover md:h-64 col-span-2" />
            <img src="https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=600&q=80" alt="Cows" className="rounded-2xl w-full h-48 object-cover md:h-64" />
            <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80" alt="Vegetables" className="rounded-2xl w-full h-48 object-cover md:h-64" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-white text-center" style={{ background: 'var(--color-primary)', padding: '80px var(--spacing-gutter)' }}>
        <div className="mx-auto max-w-2xl" style={{ maxWidth: 'var(--spacing-container-max)' }}>
          <h2 className="font-display text-4xl font-bold mb-4">Ready to Taste the Difference?</h2>
          <p className="font-body opacity-90 mb-8" style={{ lineHeight: '1.8' }}>
            Join thousands of families who have made Pothana Farms their trusted source of pure, farm-fresh nutrition.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/shop" className="bg-white text-primary px-8 py-3.5 rounded-xl font-body font-bold hover:bg-opacity-90 transition-all shadow-lg">
              Shop All Products
            </Link>
            <Link href="/subscription" className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-body font-bold hover:bg-white/10 transition-all">
              Start a Subscription
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
