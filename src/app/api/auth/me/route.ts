import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";

// Scoped user DB matching signin mock database
const mockUsersDb = [
  {
    id: "usr-mock-1",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    phone: "+1 555-0199"
  }
];

export async function GET(request: Request) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const user = mockUsersDb.find((u) => u.id === session.userId);
    if (!user) {
      return NextResponse.json({ error: "User session invalid." }, { status: 401 });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
