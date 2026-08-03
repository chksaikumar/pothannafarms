import { auth, db } from './client'
import { adminAuth, adminDb } from './admin'
import { User as FirebaseUser } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

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

export const createUserProfile = async (user: FirebaseUser, role: UserRole = 'customer') => {
  const profile: UserProfile = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || '',
    photoURL: user.photoURL || undefined,
    phoneNumber: user.phoneNumber || undefined,
    role,
    emailVerified: user.emailVerified,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await setDoc(doc(db, 'users', user.uid), profile)
  return profile
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = await getDoc(doc(db, 'users', uid))
  return docRef.exists() ? (docRef.data() as UserProfile) : null
}

export const setAdminClaim = async (uid: string) => {
  if (!adminAuth) throw new Error('Firebase Admin not initialized')
  await adminAuth.setCustomUserClaims(uid, { role: 'admin' })
}

export const removeAdminClaim = async (uid: string) => {
  if (!adminAuth) throw new Error('Firebase Admin not initialized')
  await adminAuth.setCustomUserClaims(uid, { role: 'customer' })
}

export const verifyIdToken = async (idToken: string) => {
  if (!adminAuth) throw new Error('Firebase Admin not initialized')
  return await adminAuth.verifyIdToken(idToken)
}
