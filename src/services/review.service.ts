import { db } from '@/lib/firebase/client'
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { Review } from '@/types'

export const submitReview = async (productId: string, userId: string, userName: string, rating: number, comment?: string, images?: string[]) => {
  const ref = await addDoc(collection(db, 'products', productId, 'reviews'), {
    productId,
    userId,
    userName,
    rating,
    comment,
    images: images || [],
    approved: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return ref.id
}

export const getApprovedReviews = async (productId: string): Promise<Review[]> => {
  const snapshot = await getDocs(query(collection(db, 'products', productId, 'reviews'), where('approved', '==', true), orderBy('createdAt', 'desc')))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Review))
}

import { doc, updateDoc } from 'firebase/firestore'

export const approveReview = async (productId: string, reviewId: string) => {
  const reviewRef = doc(db, 'products', productId, 'reviews', reviewId)
  await updateDoc(reviewRef, {
    approved: true,
    updatedAt: new Date(),
  })
}
