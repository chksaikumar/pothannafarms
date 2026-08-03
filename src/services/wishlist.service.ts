import { db } from '@/lib/firebase/client'
import { WishlistItem } from '@/types'
import { collection, doc, addDoc, deleteDoc, getDocs } from 'firebase/firestore'

export const getWishlist = async (userId: string): Promise<WishlistItem[]> => {
  const snapshot = await getDocs(collection(db, 'wishlists', userId, 'items'))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as WishlistItem))
}

export const addToWishlist = async (userId: string, productId: string) => {
  const ref = await addDoc(collection(db, 'wishlists', userId, 'items'), {
    userId,
    productId,
    createdAt: new Date(),
  })
  return ref.id
}

export const removeFromWishlist = async (userId: string, itemId: string) => {
  await deleteDoc(doc(db, 'wishlists', userId, 'items', itemId))
}