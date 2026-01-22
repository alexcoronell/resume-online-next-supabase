import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/admin',
  '/admin/profile',
  '/admin/portfolio',
  '/admin/studies',
  '/admin/trainings',
  '/admin/institutes',
  '/admin/experiences',
  '/admin/contact',
  '/admin/pages',
]

export function middleware(request: NextRequest) {
  const { cookies, nextUrl } = request
  const token =
    cookies.get('sb-access-token') || cookies.get('supabase-auth-token')

  const isProtected = protectedRoutes.some(route =>
    nextUrl.pathname.startsWith(route)
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
