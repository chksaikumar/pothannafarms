import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow full guest access for viewing checkout, cart, dashboard, etc.
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
