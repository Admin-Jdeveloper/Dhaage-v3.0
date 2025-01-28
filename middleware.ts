import { NextRequest, NextResponse } from 'next/server';

export function middleware(request:NextRequest) {
  const token = request.cookies.get('next-auth.session-token');
  // const token2 = request.cookies.get('userToken'); // Example token
  // && request.nextUrl.pathname.startsWith('/yoyo')

  // Protect specific routes
  if (!token && request.nextUrl.pathname.startsWith('/home')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
 if(token && (request.nextUrl.pathname.startsWith('/signup') || request.nextUrl.pathname.startsWith('/signin')) )
 {
  return NextResponse.redirect(new URL('/home', request.url));

 }


  return NextResponse.next(); // Allow access
}

export const config = {
  matcher: ['/home','/signup', '/signin'], // Only apply to routes under /protected
};

