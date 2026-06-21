import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Force HTTPS in production environments
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("x-forwarded-proto") !== "https"
  ) {
    const host = request.headers.get("host") || request.nextUrl.host;
    return NextResponse.redirect(
      `https://${host}${request.nextUrl.pathname}${request.nextUrl.search}`,
      { status: 301 }
    );
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except public assets, static files, and images
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)"
  ]
};
