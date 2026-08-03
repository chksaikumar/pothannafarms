import { adminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { Subscription, SubscriptionDelivery } from '@/types'

export const createSubscription = async (subscription: Omit<Subscription, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const ref = await adminDb.collection('subscriptions').add({
    ...subscription,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  return ref.id
}

export const getSubscriptionById = async (id: string): Promise<Subscription | null> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const doc = await adminDb.collection('subscriptions').doc(id).get()
  return doc.exists ? { id: doc.id, ...doc.data() } as Subscription : null
}

export const getSubscriptionsByUser = async (userId: string): Promise<Subscription[]> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const snapshot = await adminDb.collection('subscriptions').where('userId', '==', userId).get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Subscription))
}

export const updateSubscriptionStatus = async (id: string, status: Subscription['status']) => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  await adminDb.collection('subscriptions').doc(id).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  })
}

export const createSubscriptionDelivery = async (delivery: Omit<SubscriptionDelivery, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const ref = await adminDb.collection('subscriptions').doc(delivery.subscriptionId).collection('deliveries').add({
    ...delivery,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  })
  return ref.id
}

export const getUpcomingDeliveries = async (date: Date): Promise<SubscriptionDelivery[]> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const snapshot = await adminDb.collectionGroup('deliveries')
    .where('deliveryDate', '>=', date)
    .where('status', '==', 'scheduled')
    .get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as SubscriptionDelivery))
}
