// Edge middleware — JWT route protection for nep-web. Stub only (no verification logic yet).
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  // TODO: JWT route protection
  //  1. Read the access token from cookies.
  //  2. If missing/expired, attempt refresh using the refresh token.
  //  3. If still unauthenticated, redirect to /login.
  //  4. Otherwise, allow the request through (optionally forward the token).
  return NextResponse.next();
}

// Protect the dashboard route group; leave (auth) pages and static assets public.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
