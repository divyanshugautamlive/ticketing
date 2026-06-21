import { NextResponse } from "next/server";
import { mockCars } from "@/data/cars";
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
  const rawPickupLocation = searchParams.get("pickupLocation") || searchParams.get("destination");
  const rawCarClass = searchParams.get("carClass");

  // Input Sanitization
  const pickupLocation = rawPickupLocation ? sanitizeSearchInput(rawPickupLocation) : null;
  const carClass = rawCarClass ? sanitizeSearchInput(rawCarClass) : null;

  let filtered = [...mockCars];

  if (pickupLocation) {
    const dQuery = pickupLocation.toLowerCase();
    filtered = filtered.filter(c => 
      c.location.city.toLowerCase().includes(dQuery) ||
      c.location.country.toLowerCase().includes(dQuery) ||
      c.location.code?.toLowerCase().includes(dQuery)
    );
  }

  if (carClass && carClass !== "ALL" && carClass !== "undefined") {
    const clsQuery = carClass.toLowerCase();
    filtered = filtered.filter(c => c.type === clsQuery);
  }

  return NextResponse.json(filtered);
}
