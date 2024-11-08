import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])
const isLandingPage = createRouteMatcher(["/"])

export default clerkMiddleware((auth,request)=>{
   
  const {userId } = auth()

  if (isLandingPage(request)) {
      if (userId) {
        return NextResponse.redirect(new URL("/dashboard",request.url))
      }

      return NextResponse.next()
  }

  if (isProtectedRoute(request)) {
    // Protect the route by requiring authentication
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }
    return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}