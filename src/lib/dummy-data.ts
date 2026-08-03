export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  unit: string
  category: string
  imageUrl: string
  stock: number
  isSubscriptionOnly?: boolean
  rating?: number
  reviewsCount?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  frequency: 'daily' | 'weekly' | 'monthly'
  items: string[]
  imageUrl: string
}

export const DUMMY_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Pure Dairy',
    slug: 'pure-dairy',
    description: 'Fresh A2 milk, ghee, paneer and butter straight from indigenous cows.',
    imageUrl: 'https://images.unsplash.com/photo-1527153857715-3904f1b8a1f7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cat-2',
    name: 'Farm Fresh Eggs',
    slug: 'farm-fresh-eggs',
    description: 'Nutritious country eggs from free-range hens.',
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cat-3',
    name: 'Organic Staples & Honey',
    slug: 'organic-staples',
    description: 'Unprocessed raw honey, cold-pressed oils, and traditional grains.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cat-4',
    name: 'Fresh Vegetables',
    slug: 'vegetables',
    description: 'Naturally grown chemical-free seasonal vegetables.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
  },
]

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Desi A2 Cow Milk',
    slug: 'desi-a2-cow-milk',
    description: '100% pure, unpasteurized A2 milk from indigenous Gir cows fed on natural fodder.',
    price: 90,
    unit: '1 Liter',
    category: 'Pure Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop',
    stock: 50,
    isSubscriptionOnly: false,
    rating: 4.9,
    reviewsCount: 38,
  },
  {
    id: 'prod-2',
    name: 'Organic Bilona A2 Ghee',
    slug: 'organic-bilona-a2-ghee',
    description: 'Handcrafted traditional Bilona method Ghee made from curd of pure A2 Gir cow milk.',
    price: 1850,
    unit: '500 ml',
    category: 'Pure Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?q=80&w=800&auto=format&fit=crop',
    stock: 25,
    isSubscriptionOnly: false,
    rating: 5.0,
    reviewsCount: 64,
  },
  {
    id: 'prod-3',
    name: 'Free-Range Country Eggs',
    slug: 'free-range-country-eggs',
    description: 'Rich in Omega-3 and protein. Collected daily from pasture-raised hens.',
    price: 120,
    unit: '6 Eggs',
    category: 'Farm Fresh Eggs',
    imageUrl: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=800&auto=format&fit=crop',
    stock: 40,
    isSubscriptionOnly: false,
    rating: 4.8,
    reviewsCount: 22,
  },
  {
    id: 'prod-4',
    name: 'Raw Forest Wild Honey',
    slug: 'raw-forest-wild-honey',
    description: 'Unprocessed, unfiltered natural honey harvested sustainably from forest beehives.',
    price: 650,
    unit: '500g Jar',
    category: 'Organic Staples & Honey',
    imageUrl: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=800&auto=format&fit=crop',
    stock: 30,
    isSubscriptionOnly: false,
    rating: 4.9,
    reviewsCount: 19,
  },
  {
    id: 'prod-5',
    name: 'Fresh Farm Made Paneer',
    slug: 'fresh-farm-made-paneer',
    description: 'Soft, melt-in-the-mouth paneer crafted freshly every morning using pure A2 milk.',
    price: 240,
    unit: '250g',
    category: 'Pure Dairy',
    imageUrl: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?q=80&w=800&auto=format&fit=crop',
    stock: 15,
    isSubscriptionOnly: false,
    rating: 4.7,
    reviewsCount: 14,
  },
  {
    id: 'prod-6',
    name: 'Cold Pressed Sesame Oil',
    slug: 'cold-pressed-sesame-oil',
    description: 'Wood-pressed (Ganuga) sesame oil made from organic sesame seeds without chemicals.',
    price: 420,
    unit: '1 Liter',
    category: 'Organic Staples & Honey',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop',
    stock: 20,
    isSubscriptionOnly: false,
    rating: 4.8,
    reviewsCount: 11,
  },
]

export const DUMMY_SUBSCRIPTIONS: SubscriptionPlan[] = [
  {
    id: 'sub-1',
    name: 'Daily Morning Milk Subscription',
    description: 'Fresh A2 milk delivered to your doorstep every morning before 7:00 AM.',
    price: 2700,
    frequency: 'monthly',
    items: ['1L Desi A2 Cow Milk daily', 'Free doorstep delivery', 'Pause/Resume anytime via dashboard'],
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'sub-2',
    name: 'Weekly Egg & Dairy Basket',
    description: 'Comprehensive weekly delivery of essential fresh farm items for small families.',
    price: 3200,
    frequency: 'monthly',
    items: ['12 Country Eggs weekly', '500g Fresh Paneer weekly', '500g Bilona Ghee monthly'],
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'sub-3',
    name: 'Complete Farm Fresh Family Pack',
    description: 'All-inclusive monthly subscription featuring pure milk, organic ghee, eggs, and raw honey.',
    price: 5500,
    frequency: 'monthly',
    items: ['2L A2 Milk daily', '24 Country Eggs weekly', '1kg Bilona Ghee monthly', '500g Wild Honey monthly'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop',
  },
]
