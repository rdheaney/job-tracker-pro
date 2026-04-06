import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authConfig } from './src/auth.config';

const { auth } = NextAuth(authConfig);

type MiddlewareAuthRequest = NextRequest & { auth?: unknown };

export default auth((req: MiddlewareAuthRequest) => {
  const isLoggedIn = Boolean(req.auth);
  const isProtected = req.nextUrl.pathname.startsWith('/applications');
  const isLoginPage = req.nextUrl.pathname === '/login';

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/applications', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
