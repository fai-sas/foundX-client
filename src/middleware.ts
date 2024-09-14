import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AuthRoutes = ['/login', '/register']

const roleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
}

type Role = keyof typeof roleBasedRoutes

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const user = {
    name: 'John Doe',
    token: 'token',
    role: 'ADMIN',
  }

  // const user = undefined()

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role]

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next()
    }
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/profile', '/admin', '/login', '/register'],
}
