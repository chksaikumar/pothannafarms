import { useEffect, useState, useCallback } from 'react'
import { auth } from '@/lib/firebase/client'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { UserProfile } from '@/types'

export type UserRole = 'admin' | 'customer' | null

export interface AuthState {
  user: any | null
  profile: UserProfile | null
  loading: boolean
  role: UserRole
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({ user: null, profile: null, loading: true, role: null })

  useEffect(() => {
    // Safety timeout: ensure loading completes within 500ms even if Firebase network call delays
    const timer = setTimeout(() => {
      setState(prev => prev.loading ? { ...prev, loading: false } : prev)
    }, 500)

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(timer)
      if (!user) {
        setState({ user: null, profile: null, loading: false, role: null })
        return
      }

      let profile: UserProfile | null = null
      try {
        const docRef = doc(db, 'users', user.uid)
        const snap = await getDoc(docRef)
        if (snap.exists()) {
          profile = snap.data() as UserProfile
        } else {
          profile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || undefined,
            phoneNumber: user.phoneNumber || undefined,
            role: 'customer',
            emailVerified: user.emailVerified,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          await setDoc(docRef, profile)
        }
      } catch {
        profile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || undefined,
          phoneNumber: user.phoneNumber || undefined,
          role: 'customer',
          emailVerified: user.emailVerified,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }

      setState({ user, profile, loading: false, role: profile?.role || 'customer' })
    })

    return () => {
      clearTimeout(timer)
      unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(res.user, { displayName })
    return res.user
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }, [])

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }, [])

  return { ...state, signIn, signUp, signInWithGoogle, signOut, resetPassword }
}
