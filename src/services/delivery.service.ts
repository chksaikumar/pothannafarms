import { adminDb } from '@/lib/firebase/admin'
import { DeliveryZone, DeliveryTimeSlot } from '@/types'

export const getDeliveryZones = async (): Promise<DeliveryZone[]> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const snapshot = await adminDb.collection('deliveryZones').where('active', '==', true).get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as DeliveryZone))
}

export const getDeliveryTimeSlots = async (): Promise<DeliveryTimeSlot[]> => {
  if (!adminDb) throw new Error('Firebase Admin not initialized')
  const snapshot = await adminDb.collection('deliveryTimeSlots').where('active', '==', true).get()
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as DeliveryTimeSlot))
}

export const calculateDeliveryCharge = (zones: DeliveryZone[], pincode: string, subtotal: number): number => {
  const zone = zones.find(z => z.pincodes.includes(pincode))
  if (!zone) return 5000
  if (zone.freeDeliveryThreshold && subtotal >= zone.freeDeliveryThreshold) return 0
  return zone.deliveryCharge
}
