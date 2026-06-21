import { NextResponse } from "next/server";
import { clearSessionCookies, getSessionUser } from "@/lib/session";
import { logAuditEvent } from "@/lib/audit-logger";

export async function POST(request: Request) {
  const clientIP =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown";

  const sessionUser = await getSessionUser();

  // Clear HTTP-only session cookies
  await clearSessionCookies();

  logAuditEvent({
    userId: sessionUser?.userId || "anonymous",
    action: "AUTH_SIGNOUT",
    resource: "/api/auth/signout",
    ipAddress: clientIP,
    userAgent,
    timestamp: new Date(),
    status: "success"
  });

  return NextResponse.json({ success: true, message: "Signed out successfully." });
}
