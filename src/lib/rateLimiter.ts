import { RateLimiterMemory } from "rate-limiter-flexible";

// In-memory rate limiter (suited for mock environments and local runtime)
export const authLimiter = new RateLimiterMemory({
  points: 5, // 5 attempts
  duration: 15 * 60, // Per 15 minutes (900s)
});

export const searchLimiter = new RateLimiterMemory({
  points: 50, // 50 requests
  duration: 60, // Per minute
});

export const callbackLimiter = new RateLimiterMemory({
  points: 3, // 3 callback requests
  duration: 24 * 60 * 60, // Per 24 hours per IP
});

export const bookingLimiter = new RateLimiterMemory({
  points: 10, // 10 booking requests
  duration: 60, // Per minute
});

/**
 * Apply rate limit check based on key (IP or UserId) and limiter
 * Returns true if allowed, false if rejected
 */
export async function applyRateLimit(
  key: string,
  limiter: RateLimiterMemory
): Promise<boolean> {
  // If rate limiting is disabled via env
  if (process.env.RATE_LIMIT_ENABLED === "false") {
    return true;
  }
  try {
    await limiter.consume(key);
    return true;
  } catch (rejRes) {
    return false;
  }
}
