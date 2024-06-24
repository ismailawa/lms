import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authRoutes, protectedRoutes } from './router/routes';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('auth_token')?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  //   if (
  //     protectedRoutes.includes(request.nextUrl.pathname) &&
  //     (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  //   ) {
  //     request.cookies.delete('currentUser');
  //     const response = NextResponse.redirect(new URL('/login', request.url));
  //     response.cookies.delete('currentUser');

  //     return response;
  //   }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL('/student-dashboard', request.url));
  }
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/student-dashboard', request.url));
  }
}

// export const config = {
//   matcher: ['/'],
// };
