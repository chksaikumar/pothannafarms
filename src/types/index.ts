export type UserRole = 'admin' | 'customer'

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  phoneNumber?: string
  role: UserRole
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  userId: string
  fullName: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  parentId?: string
  sortOrder: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  sku: string
  unit: string
  weight?: string
  quantity: number
  price: number
  discountPrice?: number
  availableStock: number
  lowStockThreshold: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  name: string
  slug: string
  categoryId: string
  categoryName: string
  shortDescription: string
  fullDescription: string
  basePrice: number
  discountPrice?: number
  images: string[]
  sku: string
  unit: string
  stock: number
  lowStockThreshold: number
  tags: string[]
  ingredients?: string
  shelfLife?: string
  storageInstructions?: string
  minOrderQuantity: number
  maxOrderQuantity: number
  featured: boolean
  active: boolean
  subscriptionAvailable: boolean
  seoTitle?: string
  seoDescription?: string
  averageRating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface CartItem {
  id: string
  userId?: string
  productId: string
  variantId?: string
  productName: string
  productImage: string
  variantName?: string
  unitPrice: number
  discountPrice?: number
  quantity: number
  total: number
  createdAt?: Date
  updatedAt?: Date
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  createdAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  variantId?: string
  productName: string
  productImage: string
  variantName?: string
  sku: string
  unitPrice: number
  discountPrice?: number
  quantity: number
  discount: number
  finalItemTotal: number
  createdAt: Date
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  shippingAddress: {
    fullName: string
    phone: string
    line1: string
    line2?: string
    city: string
    state: string
    pincode: string
  }
  subtotal: number
  discount: number
  deliveryCharge: number
  tax: number
  total: number
  status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'razorpay' | 'cod' | 'mock'
  razorpayOrderId?: string
  razorpayPaymentId?: string
  couponId?: string
  couponCode?: string
  deliveryDate?: string
  deliveryTimeSlot?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  orderId: string
  userId: string
  amount: number
  currency: string
  method: string
  status: 'pending' | 'paid' | 'failed' | 'refunded'
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  createdAt: Date
  updatedAt: Date
}

export interface Coupon {
  id: string
  code: string
  description?: string
  type: 'percentage' | 'fixed'
  value: number
  minOrderAmount: number
  maxDiscount?: number
  applicableCategories?: string[]
  applicableProducts?: string[]
  usageLimitPerUser: number
  totalUsageLimit: number
  usageCount: number
  active: boolean
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface CouponUsage {
  id: string
  couponId: string
  userId: string
  orderId: string
  usedAt: Date
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  userPhoto?: string
  rating: number
  comment?: string
  images?: string[]
  approved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Subscription {
  id: string
  userId: string
  productId: string
  variantId: string
  productSnapshot: {
    name: string
    image: string
    sku: string
  }
  quantity: number
  frequency: 'daily' | 'alternate_day' | 'weekly' | 'monthly'
  startDate: Date
  nextDeliveryDate: Date
  deliveryAddress: {
    fullName: string
    phone: string
    line1: string
    line2?: string
    city: string
    state: string
    pincode: string
  }
  deliveryTimeSlot: string
  paymentMethod: 'razorpay' | 'cod' | 'mock'
  paymentStatus: 'pending' | 'paid' | 'failed'
  status: 'active' | 'paused' | 'cancelled' | 'completed'
  pausedDates?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionDelivery {
  id: string
  subscriptionId: string
  orderId?: string
  userId: string
  deliveryDate: Date
  status: 'scheduled' | 'converted' | 'skipped' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}

export interface DeliveryZone {
  id: string
  name: string
  pincodes: string[]
  deliveryCharge: number
  freeDeliveryThreshold?: number
  estimatedDays: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DeliveryTimeSlot {
  id: string
  name: string
  startTime: string
  endTime: string
  cutoffTime: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Banner {
  id: string
  title: string
  subtitle?: string
  imageUrl: string
  linkUrl?: string
  position: 'hero' | 'category' | 'promo'
  sortOrder: number
  active: boolean
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  body: string
  type: 'order' | 'subscription' | 'promo' | 'system'
  read: boolean
  data?: Record<string, string>
  createdAt: Date
}

export interface AdminActivityLog {
  id: string
  adminId: string
  adminEmail: string
  action: string
  resource: string
  resourceId?: string
  details?: Record<string, unknown>
  ipAddress?: string
  createdAt: Date
}

export interface InventoryMovement {
  id: string
  productId: string
  variantId?: string
  previousStock: number
  quantityChanged: number
  newStock: number
  changeType: 'sale' | 'restock' | 'adjustment' | 'return' | 'cancellation'
  relatedOrderId?: string
  adminId?: string
  createdAt: Date
}

export interface Setting {
  id: string
  key: string
  value: unknown
  updatedAt: Date
}
