import { NextResponse } from "next/server";
import { mockFlights } from "@/data/flights";
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
  const rawOrigin = searchParams.get("origin");
  const rawDestination = searchParams.get("destination");
  const rawCabinClass = searchParams.get("cabinClass");

  // Input Sanitization
  const origin = rawOrigin ? sanitizeSearchInput(rawOrigin) : null;
  const destination = rawDestination ? sanitizeSearchInput(rawDestination) : null;
  const cabinClass = rawCabinClass ? sanitizeSearchInput(rawCabinClass) : null;

  let filtered = [...mockFlights];

  if (origin) {
    const oQuery = origin.toLowerCase();
    filtered = filtered.filter(f => 
      f.origin.city.toLowerCase().includes(oQuery) ||
      f.origin.code?.toLowerCase().includes(oQuery)
    );
  }

  if (destination) {
    const dQuery = destination.toLowerCase();
    filtered = filtered.filter(f => 
      f.destination.city.toLowerCase().includes(dQuery) ||
      f.destination.code?.toLowerCase().includes(dQuery)
    );
  }

  if (cabinClass) {
    filtered = filtered.filter(f => f.cabinClass === cabinClass);
  }

  return NextResponse.json(filtered);
}
