import { clerkMiddleware , createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)' , '/test(.*)' , '/' , '/api/testimonials(.*)' , '/testing/test']);

export default clerkMiddleware((auth, request) => {
  console.log('Request URL:', request.nextUrl.pathname);
  if (!isPublicRoute(request)) {
      console.log('Protected route, requiring authentication.');
      auth().protect();
  } else {
      console.log('Public route, no authentication required.');
  }
});


// export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};