import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Retrieve the token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Redirect to sign-in page if not authenticated and accessing a protected page
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/products')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }
  }

  // If authenticated and accessing sign-in page, redirect to dashboard
  if (pathname === '/auth/signin' && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/products/:path*']
};
