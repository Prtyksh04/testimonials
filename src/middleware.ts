import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Secret used to sign the JWT, it should match the one in your [...nextauth].ts file
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  if ((pathname.startsWith("/dashboard") || pathname.startsWith("/products")) && !token ) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (pathname === "/auth/signin" && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

// Match the routes you want to protect
export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*"],
};
