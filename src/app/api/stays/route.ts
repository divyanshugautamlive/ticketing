import { NextResponse } from "next/server";
import { mockStays } from "@/data/stays";
import { applyRateLimit, searchLimiter } from "@/lib/rateLimiter";
import { sanitizeSearchInput } from "@/utils/validation";

export async function GET(request: Request) {
  const clientIP =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // Rate Limiting
  const rateLimitAllowed = await applyRateLimit(clientIP, searchLimiter);
  if (!rateLimitAllowed) {
    return NextResponse.json(
      { error: "Too many search requests. Please wait a moment." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const rawDestination = searchParams.get("destination");
  const rawPropertyType = searchParams.get("propertyType");

  // Input Sanitization
  const destination = rawDestination ? sanitizeSearchInput(rawDestination) : null;
  const propertyType = rawPropertyType ? sanitizeSearchInput(rawPropertyType) : null;

  let filtered = [...mockStays];

  if (destination) {
    const dQuery = destination.toLowerCase();
    filtered = filtered.filter(s => 
      s.location.city.toLowerCase().includes(dQuery) ||
      s.location.country.toLowerCase().includes(dQuery)
    );
  }

  if (propertyType) {
    filtered = filtered.filter(s => s.propertyType.toLowerCase() === propertyType.toLowerCase());
  }

  return NextResponse.json(filtered);
}
