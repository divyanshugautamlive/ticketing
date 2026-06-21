import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRefreshToken, createTokens, setSessionCookies } from "@/lib/session";
import { logAuditEvent } from "@/lib/audit-logger";

export async function POST(request: Request) {
  const clientIP =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown";

  try {
    const cookieStore = await cookies();
    const refreshTokenValue = cookieStore.get("refresh_token")?.value;

    if (!refreshTokenValue) {
      return NextResponse.json({ error: "Refresh token missing." }, { status: 400 });
    }

    const payload = verifyRefreshToken(refreshTokenValue);
    if (!payload) {
      logAuditEvent({
        action: "AUTH_REFRESH",
        resource: "/api/auth/refresh",
        ipAddress: clientIP,
        userAgent,
        timestamp: new Date(),
        status: "failure",
        changes: { error: "Invalid refresh token" }
      });
      return NextResponse.json({ error: "Invalid refresh token." }, { status: 401 });
    }

    // Generate new access + refresh tokens (Token rotation)
    const { accessToken, refreshToken } = createTokens(payload.userId, payload.email);

    // Save tokens in HTTP-only cookies
    await setSessionCookies({ accessToken, refreshToken });

    logAuditEvent({
      userId: payload.userId,
      action: "AUTH_REFRESH",
      resource: "/api/auth/refresh",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "success"
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error occurred during token refresh." },
      { status: 500 }
    );
  }
}
