import { adminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { InventoryMovement } from '@/types'

export const recordMovement = async (movement: Omit<InventoryMovement, 'id' | 'createdAt'>) => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  await adminDb.collection('inventoryMovements').add({
    ...movement,
    createdAt: FieldValue.serverTimestamp(),
  })
}

export const getLowStockProducts = async () => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const snapshot = await adminDb.collection('products')
    .where('active', '==', true)
    .get()
  const products: any[] = []
  snapshot.forEach(d => {
    const data = d.data()
    if (data.stock <= data.lowStockThreshold) {
      products.push({ id: d.id, ...data })
    }
  })
  return products
}
