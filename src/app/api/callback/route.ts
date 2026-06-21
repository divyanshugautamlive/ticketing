import { NextResponse } from "next/server";
import { z } from "zod";
import { nameSchema, emailSchema, phoneSchema } from "@/utils/validation";
import { checkCSRF } from "@/utils/csrf";
import { applyRateLimit, callbackLimiter } from "@/lib/rateLimiter";
import { encrypt, hashSensitiveData } from "@/lib/encryption";
import { logAuditEvent } from "@/lib/audit-logger";

const callbackSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  category: z.string().min(2).max(50),
  timeSlot: z.string().min(2).max(50),
  notes: z.string().max(1000).optional()
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
      action: "CALLBACK_REQUEST",
      resource: "/api/callback",
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
  const rateLimitAllowed = await applyRateLimit(clientIP, callbackLimiter);
  if (!rateLimitAllowed) {
    logAuditEvent({
      action: "CALLBACK_REQUEST",
      resource: "/api/callback",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "failure",
      changes: { error: "Rate limit exceeded" }
    });

    return NextResponse.json(
      { error: "Too many callback requests. You can request up to 3 callbacks per day." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // 3. Validate request schema
    const result = callbackSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed: " + result.error.issues.map(e => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { name, email, phone, category, timeSlot, notes } = result.data;

    // 4. Encrypt sensitive PII (Simulating secure persistence)
    const encryptedName = encrypt(name);
    const encryptedEmail = encrypt(email);
    const encryptedPhone = encrypt(phone);
    const encryptedNotes = notes ? encrypt(notes) : "";

    // 5. One-way hash for verification/indexing matches
    const emailHash = hashSensitiveData(email);
    const phoneHash = hashSensitiveData(phone);

    const referenceId = "CB-" + Math.floor(100000 + Math.random() * 900000);

    // Mock CRM structured payload (Never logs raw PII)
    const securePayload = {
      referenceId,
      encryptedName,
      encryptedEmail,
      encryptedPhone,
      emailHash,
      phoneHash,
      category,
      timeSlot,
      encryptedNotes,
      status: "queued"
    };

    logAuditEvent({
      action: "CALLBACK_QUEUED",
      resource: "/api/callback",
      changes: { referenceId, category, timeSlot },
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "success"
    });

    // Output secure debug info (Raw details REDACTED in stdout logs)
    console.log("[CRM_SECURE_STORAGE] Callback logged successfully", {
      referenceId,
      emailHash,
      phoneHash,
      encryptedPayload: securePayload
    });

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Callback request queued successfully. A travel expert will call you shortly."
    });
  } catch (error) {
    logAuditEvent({
      action: "CALLBACK_REQUEST",
      resource: "/api/callback",
      ipAddress: clientIP,
      userAgent,
      timestamp: new Date(),
      status: "failure",
      changes: { error: "Internal server error during callback processing" }
    });

    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
