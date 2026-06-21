import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateCSRFToken } from "@/utils/csrf";

export async function GET() {
  try {
    const cookieStore = await cookies();
    let csrfToken = cookieStore.get("csrf_token")?.value;

    if (!csrfToken) {
      csrfToken = generateCSRFToken();
      cookieStore.set("csrf_token", csrfToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600, // 1 hour validity
        path: "/"
      });
    }

    return NextResponse.json({ csrfToken });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate CSRF token." },
      { status: 500 }
    );
  }
}
