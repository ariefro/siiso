import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  if (
    token ||
    pathname.includes('/api/auth') ||
    pathname.includes('/api/email')
  ) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login' && pathname !== '/contact') {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
