import { db } from '@/lib/firebase/client'
import { 
  collection, doc, query, where, orderBy, limit, getDocs, getDoc, QueryConstraint 
} from 'firebase/firestore'
import { 
  Product, ProductVariant, Category, Review, CartItem, 
  WishlistItem, Coupon, DeliveryZone, DeliveryTimeSlot, Banner 
} from '@/types'

export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(query(collection(db, 'categories'), where('active', '==', true), orderBy('sortOrder')))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Category))
}

export const getProducts = async (filters?: { categoryId?: string; featured?: boolean; minPrice?: number; maxPrice?: number; search?: string }): Promise<Product[]> => {
  const constraints: QueryConstraint[] = [where('active', '==', true)]
  if (filters?.categoryId) {
    constraints.push(where('categoryId', '==', filters.categoryId))
  }
  if (filters?.featured) {
    constraints.push(where('featured', '==', true))
  }
  constraints.push(orderBy('createdAt', 'desc'))
  
  const snapshot = await getDocs(query(collection(db, 'products'), ...constraints))
  let products = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Product))
  
  if (filters?.search) {
    const term = filters.search.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.shortDescription.toLowerCase().includes(term) ||
      p.tags.some(t => t.toLowerCase().includes(term))
    )
  }
  
  if (filters?.minPrice !== undefined) {
    products = products.filter(p => p.basePrice >= filters.minPrice!)
  }
  if (filters?.maxPrice !== undefined) {
    products = products.filter(p => p.basePrice <= filters.maxPrice!)
  }
  
  return products
}

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const snapshot = await getDocs(query(collection(db, 'products'), where('slug', '==', slug), where('active', '==', true), limit(1)))
  if (snapshot.empty) return null
  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Product
}

export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, 'products', id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Product : null
}

export const getProductVariants = async (productId: string): Promise<ProductVariant[]> => {
  const snapshot = await getDocs(query(collection(db, 'products', productId, 'variants'), where('active', '==', true)))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ProductVariant))
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return getProducts({ featured: true })
}

export const getReviews = async (productId: string): Promise<Review[]> => {
  const snapshot = await getDocs(query(collection(db, 'products', productId, 'reviews'), where('approved', '==', true), orderBy('createdAt', 'desc')))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Review))
}

export const getBanners = async (): Promise<Banner[]> => {
  const snapshot = await getDocs(query(collection(db, 'banners'), where('active', '==', true), orderBy('sortOrder')))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Banner))
}

export const getDeliveryZones = async (): Promise<DeliveryZone[]> => {
  const snapshot = await getDocs(query(collection(db, 'deliveryZones'), where('active', '==', true)))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as DeliveryZone))
}

export const getDeliveryTimeSlots = async (): Promise<DeliveryTimeSlot[]> => {
  const snapshot = await getDocs(query(collection(db, 'deliveryTimeSlots'), where('active', '==', true)))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as DeliveryTimeSlot))
}

export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
  const snapshot = await getDocs(query(collection(db, 'coupons'), where('code', '==', code.toUpperCase()), limit(1)))
  if (snapshot.empty) return null
  const data = snapshot.docs[0].data() as Omit<Coupon, 'id'>
  const now = new Date()
  if (!data.active || data.startDate > now || data.endDate < now) return null
  return { id: snapshot.docs[0].id, ...data } as Coupon
}

export const getSettings = async (): Promise<Record<string, unknown>> => {
  const snapshot = await getDocs(collection(db, 'settings'))
  const settings: Record<string, unknown> = {}
  snapshot.forEach(d => {
    settings[d.data().key] = d.data().value
  })
  return settings
}