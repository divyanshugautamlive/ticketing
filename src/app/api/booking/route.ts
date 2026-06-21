import { NextResponse } from "next/server";
import { z } from "zod";
import { travelerSchema, contactSchema } from "@/utils/validation";
import { checkCSRF } from "@/utils/csrf";
import { applyRateLimit, bookingLimiter } from "@/lib/rateLimiter";
import { encrypt } from "@/lib/encryption";
import { logAuditEvent } from "@/lib/audit-logger";

const bookingRequestSchema = z.object({
  category: z.string().min(2).max(50),
  summary: z.any(), // pricing structure
  travelers: z.array(travelerSchema).min(1),
  contact: contactSchema,
  paymentMethod: z.enum(["credit_card", "agent"])
});

export async function POST(request: Request) {
  const clientIP =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = request.headers.get("user-agent") || "unknown";

  // 1. Verify CSRF Token
  const csrfValid = await checkCSRF(request);
  if (!csrfValid) {
    logAuditEvent({
      action: "BOOKING_REQUEST",
      resource: "/api/booking",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "failure",
      changes: { error: "CSRF token validation failed" }
    });

    return NextResponse.json(
      { error: "Invalid CSRF security token. Reload the page and try again." },
      { status: 403 }
    );
  }

  // 2. Apply Rate Limiting
  const rateLimitAllowed = await applyRateLimit(clientIP, bookingLimiter);
  if (!rateLimitAllowed) {
    logAuditEvent({
      action: "BOOKING_REQUEST",
      resource: "/api/booking",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "failure",
      changes: { error: "Rate limit exceeded" }
    });

    return NextResponse.json(
      { error: "Too many booking attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // 3. Validate request schema
    const result = bookingRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed: " + result.error.issues.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { category, summary, travelers, contact, paymentMethod } = result.data;

    // 4. Encrypt sensitive traveler PII
    const secureTravelers = travelers.map((traveler) => {
      return {
        ...traveler,
        firstName: encrypt(traveler.firstName),
        lastName: encrypt(traveler.lastName),
        passportNumber: traveler.passportNumber ? encrypt(traveler.passportNumber) : undefined
      };
    });

    const secureContact = {
      firstName: encrypt(contact.firstName),
      lastName: encrypt(contact.lastName),
      email: encrypt(contact.email),
      phone: encrypt(contact.phone)
    };

    const referenceNumber = "TI-" + Math.floor(100000 + Math.random() * 900000);

    // Mock CRM encrypted record payload
    const secureBookingRecord = {
      referenceNumber,
      status: paymentMethod === "agent" ? "pending" : "confirmed",
      category,
      summary,
      travelers: secureTravelers,
      contact: secureContact,
      paymentMethod,
      createdAt: new Date().toISOString()
    };

    logAuditEvent({
      action: "BOOKING_CREATED",
      resource: "/api/booking",
      changes: { referenceNumber, category, paymentMethod, status: secureBookingRecord.status },
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "success"
    });

    console.log("[CRM_SECURE_STORAGE] Booking logged successfully", {
      referenceNumber,
      encryptedPayload: secureBookingRecord
    });

    return NextResponse.json({
      success: true,
      referenceNumber,
      status: secureBookingRecord.status,
      message: "Itinerary booking logged successfully in secure backend."
    });
  } catch (error) {
    logAuditEvent({
      action: "BOOKING_REQUEST",
      resource: "/api/booking",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "failure",
      changes: { error: "Internal server error during booking processing" }
    });

    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
