import { NextRequest, NextResponse } from 'next/server'
import { adminDb, adminAuth } from '@/lib/firebase/admin'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!adminDb || !adminAuth) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = await adminAuth.verifyIdToken(token)
    const userDoc = await adminDb.collection('users').doc(decoded.uid).get()
    const role = userDoc.data()?.role

    if (role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const ordersSnap = await adminDb.collection('orders').orderBy('createdAt', 'desc').get()
    const orders = ordersSnap.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, unknown>) })) as Array<{ id: string; total?: number; userId?: string }>
    const revenue = orders.reduce((sum, o) => sum + ((o.total as number) || 0), 0)
    const customers = new Set(orders.map(o => o.userId as string)).size

    const productsSnap = await adminDb.collection('products').get()
    const products = productsSnap.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, unknown>) }))

    return NextResponse.json({
      stats: { orders: orders.length, revenue, customers, products: products.length },
      orders: orders.slice(0, 20),
      products: products.slice(0, 20),
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load admin data' }, { status: 500 })
  }
}