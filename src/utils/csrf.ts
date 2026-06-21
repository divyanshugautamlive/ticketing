import crypto from "crypto";

export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  try {
    const tokenBuffer = Buffer.from(token);
    const storedBuffer = Buffer.from(storedToken);
    
    if (tokenBuffer.length !== storedBuffer.length) {
      return false;
    }
    
    return crypto.timingSafeEqual(tokenBuffer, storedBuffer);
  } catch (error) {
    return false;
  }
}

/**
 * Validate CSRF token from the request headers against the stored cookie token
 */
export async function checkCSRF(request: Request): Promise<boolean> {
  try {
    // Dynamic import to prevent TS loader failures in CLI testing contexts
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const storedToken = cookieStore.get("csrf_token")?.value;
    const requestToken = request.headers.get("x-csrf-token");

    if (!storedToken || !requestToken) {
      return false;
    }

    return validateCSRFToken(requestToken, storedToken);
  } catch (error) {
    return false;
  }
}
