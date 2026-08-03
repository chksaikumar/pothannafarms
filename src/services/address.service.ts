import { db } from '@/lib/firebase/client'
import { collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { Address } from '@/types'

export const getAddresses = async (userId: string): Promise<Address[]> => {
  const q = query(collection(db, 'users', userId, 'addresses'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Address))
}

export const addAddress = async (userId: string, address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
  const ref = await addDoc(collection(db, 'users', userId, 'addresses'), {
    ...address,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return ref.id
}

export const updateAddress = async (userId: string, addressId: string, data: Partial<Address>) => {
  await updateDoc(doc(db, 'users', userId, 'addresses', addressId), {
    ...data,
    updatedAt: new Date(),
  })
}

export const deleteAddress = async (userId: string, addressId: string) => {
  await deleteDoc(doc(db, 'users', userId, 'addresses', addressId))
}
