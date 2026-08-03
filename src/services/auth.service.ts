import { auth, db } from '@/lib/firebase/client'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut as signOutAuth,
  onAuthStateChanged as onAuthStateChangedListener,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { 
  UserProfile, UserRole, Address, Product, ProductVariant, 
  CartItem, WishlistItem, Order, OrderItem, Payment, Coupon, 
  CouponUsage, Review, Subscription, SubscriptionDelivery,
  DeliveryZone, DeliveryTimeSlot, Banner, Notification,
  AdminActivityLog, InventoryMovement, Setting
} from '@/types'

export const signUp = async (email: string, password: string, displayName: string) => {
  const res = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(res.user, { displayName })
  await setDoc(doc(db, 'users', res.user.uid), {
    uid: res.user.uid,
    email: res.user.email,
    displayName,
    role: 'customer',
    emailVerified: res.user.emailVerified,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return res.user
}

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  const res = await signInWithPopup(auth, provider)
  if (res.user) {
    const userRef = doc(db, 'users', res.user.uid)
    await setDoc(userRef, {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName || '',
      role: 'customer',
      emailVerified: res.user.emailVerified,
      updatedAt: new Date(),
    }, { merge: true })
  }
  return res
}

export const signOut = async () => {
  return await signOutAuth(auth)
}

export const resetPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email)
}

export const getCurrentUser = () => auth.currentUser

export const onAuthStateChanged = (callback: (user: any) => void) => {
  return onAuthStateChangedListener(auth, callback)
}