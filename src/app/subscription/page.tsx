'use client'

import { DUMMY_SUBSCRIPTIONS } from '@/lib/dummy-data'
import Link from 'next/link'

export default function SubscriptionPage() {
  return (
    <div className="mx-auto" style={{ maxWidth: 'var(--spacing-container-max)', padding: '40px var(--spacing-gutter)' }}>
      <div className="text-center mb-12">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-body text-sm font-semibold mb-3 inline-block">
          Fresh Farm Subscriptions
        </span>
        <h1 className="font-display text-4xl font-bold text-primary mb-4">Subscribe for Fresh Daily Delivery</h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto" style={{ lineHeight: '1.6' }}>
          Never run out of fresh A2 cow milk, organic eggs, or natural ghee. Convenient doorstep delivery every morning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {DUMMY_SUBSCRIPTIONS.map((plan) => (
          <div key={plan.id} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="aspect-[16/9] relative overflow-hidden bg-surface">
              <img 
                src={plan.imageUrl} 
                alt={plan.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-primary text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                {plan.frequency}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-2">{plan.name}</h3>
                <p className="font-body text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6 pb-4 border-b border-border">
                  <span className="font-display font-bold text-3xl text-primary">₹{plan.price}</span>
                  <span className="font-body text-muted-foreground text-sm"> / {plan.frequency}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 font-body text-sm text-foreground">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-xl font-body font-semibold hover:bg-primary-dark active:scale-95 transition-all shadow-sm">
                Start Subscription
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-emerald-900/5 rounded-2xl p-8 max-w-5xl mx-auto border border-emerald-900/10">
        <h2 className="font-display text-2xl font-bold text-primary text-center mb-8">How Subscription Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">1</div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">Select Your Plan</h3>
            <p className="font-body text-sm text-muted-foreground">Choose from daily milk deliveries, weekly egg baskets, or full family packs.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">2</div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">Set Delivery Schedule</h3>
            <p className="font-body text-sm text-muted-foreground">Pick preferred morning slot (5:30 AM - 7:30 AM). Pause or modify anytime.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-sm">3</div>
            <h3 className="font-display font-bold text-lg text-primary mb-2">Doorstep Freshness</h3>
            <p className="font-body text-sm text-muted-foreground">Receive farm-fresh, unadulterated produce direct to your doorstep every day.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

