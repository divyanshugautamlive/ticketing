import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { applyRateLimit, authLimiter } from "@/lib/rateLimiter";
import { createTokens, setSessionCookies } from "@/lib/session";
import { logAuditEvent } from "@/lib/audit-logger";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

// Secure mock database of users for runtime (in-memory)
// Hashed password corresponds to "SecurePassword123!"
const mockUsersDb = [
  {
    id: "usr-mock-1",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 555-0199",
    // bcrypt hash of "SecurePassword123!"
    passwordHash: "$2b$12$DmgkfeVzJ.0JdZkPz2Z6zOyK29lMwqCymj70B/7t/CgP/7G4Z9H3S"
  }
];

export async function POST(request: Request) {
  const clientIP =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown";

  // Apply rate limit
  const rateLimitAllowed = await applyRateLimit(clientIP, authLimiter);
  if (!rateLimitAllowed) {
    logAuditEvent({
      action: "AUTH_SIGNIN",
      resource: "/api/auth/signin",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "failure",
      changes: { error: "Rate limit exceeded" }
    });

    return NextResponse.json(
      { error: "Too many login attempts. Please try again after 15 minutes." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const result = signinSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid email format or password too short." },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const user = mockUsersDb.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      logAuditEvent({
        action: "AUTH_SIGNIN",
        resource: "/api/auth/signin",
        ipAddress: clientIP,
        userAgent,
        timestamp: new Date(),
        status: "failure",
        changes: { email, error: "User not found" }
      });

      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Verify hashed password
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      logAuditEvent({
        userId: user.id,
        action: "AUTH_SIGNIN",
        resource: "/api/auth/signin",
        ipAddress: clientIP,
        userAgent,
        timestamp: new Date(),
        status: "failure",
        changes: { email, error: "Incorrect password" }
      });

      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Generate tokens
    const { accessToken, refreshToken } = createTokens(user.id, user.email);

    // Set HTTP-only cookies
    await setSessionCookies({ accessToken, refreshToken });

    logAuditEvent({
      userId: user.id,
      action: "AUTH_SIGNIN",
      resource: "/api/auth/signin",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "success"
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      }
    });
  } catch (error) {
    logAuditEvent({
      action: "AUTH_SIGNIN",
      resource: "/api/auth/signin",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "failure",
      changes: { error: "Internal server error during signin" }
    });

    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
