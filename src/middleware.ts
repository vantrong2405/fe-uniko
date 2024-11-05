import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')
  const referer = req.headers.get('referer')
  if (!token && pathname.startsWith('/dashboard') && !referer?.includes('/sign-in')) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
  if (token && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in']
}
