import { db } from '@/lib/firebase/client'
import { CartItem } from '@/types'
import { collection, doc, addDoc, updateDoc, deleteDoc, writeBatch, getDocs } from 'firebase/firestore'

export const getCart = async (userId: string): Promise<CartItem[]> => {
  const snapshot = await getDocs(collection(db, 'carts', userId, 'items'))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CartItem))
}

export const addToCart = async (userId: string, item: Omit<CartItem, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
  const ref = await addDoc(collection(db, 'carts', userId, 'items'), {
    ...item,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return ref.id
}

export const updateCartItem = async (userId: string, itemId: string, data: Partial<CartItem>) => {
  await updateDoc(doc(db, 'carts', userId, 'items', itemId), {
    ...data,
    updatedAt: new Date(),
  })
}

export const removeFromCart = async (userId: string, itemId: string) => {
  await deleteDoc(doc(db, 'carts', userId, 'items', itemId))
}

export const clearCart = async (userId: string) => {
  const snapshot = await getDocs(collection(db, 'carts', userId, 'items'))
  const batch = writeBatch(db)
  snapshot.forEach(d => batch.delete(d.ref))
  await batch.commit()
}