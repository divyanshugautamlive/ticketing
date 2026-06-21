import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-12345678901234567890";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret-key-1234567890";

const ACCESS_TOKEN_EXPIRY = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days

export interface JWTPayload {
  userId: string;
  email: string;
  type: "access" | "refresh";
}

/**
 * Create access and refresh JWT tokens
 */
export function createTokens(userId: string, email: string) {
  const accessToken = jwt.sign(
    { userId, email, type: "access" },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { userId, email, type: "refresh" },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
}

/**
 * Set session cookies in response context
 */
export async function setSessionCookies(tokens: { accessToken: string; refreshToken: string }) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60, // 15 minutes in seconds
    path: "/"
  });

  cookieStore.set("refresh_token", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: "/"
  });
}

/**
 * Clear session cookies (logout)
 */
export async function clearSessionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

/**
 * Verify access token and return payload
 */
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    if (decoded.type !== "access") return null;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Verify refresh token and return payload
 */
export function verifyRefreshToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload;
    if (decoded.type !== "refresh") return null;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Get current session user payload from cookies
 */
export async function getSessionUser(): Promise<{ userId: string; email: string } | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) return null;

    const payload = verifyAccessToken(accessToken);
    if (!payload) return null;

    return { userId: payload.userId, email: payload.email };
  } catch (error) {
    return null;
  }
}
