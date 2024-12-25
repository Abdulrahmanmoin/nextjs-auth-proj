import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    console.log(request.nextUrl.pathname);

    console.log("pathname: ", request.nextUrl.pathname)
    console.log("pathname.url", request.url);
    console.log("request");

    const token = request.cookies.get("token")?.value

    const publicPathnames = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup" || request.nextUrl.pathname === "/verifyemail"

    const privatePathname = request.nextUrl.pathname === "/profile"

    if (token && publicPathnames) {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!token && privatePathname) {
        return NextResponse.redirect(new URL('/signup', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/signup', '/profile', '/login', '/verifyemail'],
}