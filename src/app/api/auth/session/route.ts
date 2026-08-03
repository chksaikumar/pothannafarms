import { NextRequest, NextResponse } from 'next/server'
import { adminAuth, adminDb } from '@/lib/firebase/admin'

export async function POST(request: NextRequest) {
  try {
    if (!adminAuth || !adminDb) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const { idToken } = await request.json()
    
    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID token' }, { status: 401 })
    }
    
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    const userDoc = await adminDb.collection('users').doc(decodedToken.uid).get()
    
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    const userData = userDoc.data()
    
    return NextResponse.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: userData?.role || 'customer',
      emailVerified: decodedToken.email_verified,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
