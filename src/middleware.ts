import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return;
  }

  const currentTime = new Date().getTime() / 1000;
  if (token.exp <= currentTime) {
    console.log("Should refresh token");
  }
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    // "/spotify/:path*",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
