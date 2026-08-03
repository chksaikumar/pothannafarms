import { adminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { Order, OrderItem, Payment, InventoryMovement } from '@/types'

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const ref = await adminDb.collection('orders').add({
    ...orderData,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  return ref.id
}

export const getOrder = async (orderId: string): Promise<Order | null> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const doc = await adminDb.collection('orders').doc(orderId).get()
  return doc.exists ? { id: doc.id, ...doc.data() } as Order : null
}

export const getOrdersByUser = async (userId: string): Promise<Order[]> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const snapshot = await adminDb.collection('orders').where('userId', '==', userId).orderBy('createdAt', 'desc').get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Order))
}

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  await adminDb.collection('orders').doc(orderId).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  })
}

export const createPayment = async (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const ref = await adminDb.collection('payments').add({
    ...paymentData,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  return ref.id
}

export const recordInventoryMovement = async (movement: Omit<InventoryMovement, 'id' | 'createdAt'>) => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  await adminDb.collection('inventoryMovements').add({
    ...movement,
    createdAt: FieldValue.serverTimestamp(),
  })
}
