import { NextResponse } from "next/server";
import { mockCruises } from "@/data/cruises";
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
  const rawDeparturePort = searchParams.get("departurePort");

  // Input Sanitization
  const destination = rawDestination ? sanitizeSearchInput(rawDestination) : null;
  const departurePort = rawDeparturePort ? sanitizeSearchInput(rawDeparturePort) : null;

  let filtered = [...mockCruises];

  if (destination) {
    const dQuery = destination.toLowerCase();
    filtered = filtered.filter(c => 
      c.route.name.toLowerCase().includes(dQuery) ||
      c.route.ports.some((p: any) => p.location.city.toLowerCase().includes(dQuery))
    );
  }

  if (departurePort) {
    const pQuery = departurePort.toLowerCase();
    filtered = filtered.filter(c => c.departurePort.city.toLowerCase().includes(pQuery));
  }

  return NextResponse.json(filtered);
}
