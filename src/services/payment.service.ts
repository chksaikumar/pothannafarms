import { adminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { Coupon, CouponUsage } from '@/types'

export const createCoupon = async (coupon: Omit<Coupon, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>) => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const ref = await adminDb.collection('coupons').add({
    ...coupon,
    usageCount: 0,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  return ref.id
}

export const recordCouponUsage = async (usage: Omit<CouponUsage, 'id' | 'usedAt'>) => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const ref = await adminDb.collection('couponUsages').add({
    ...usage,
    usedAt: FieldValue.serverTimestamp(),
  })
  return ref.id
}

export const incrementCouponUsage = async (couponId: string) => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  await adminDb.collection('coupons').doc(couponId).update({
    usageCount: FieldValue.increment(1),
    updatedAt: FieldValue.serverTimestamp(),
  })
}

export const getCouponUsagesByUser = async (userId: string, couponId: string): Promise<CouponUsage[]> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const snapshot = await adminDb.collection('couponUsages')
    .where('userId', '==', userId)
    .where('couponId', '==', couponId)
    .get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CouponUsage))
}
