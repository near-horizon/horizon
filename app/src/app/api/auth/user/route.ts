import { NextResponse } from "next/server";
import { getUserFromSession } from "~/lib/session";

export async function GET() {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return NextResponse.json(
      { ok: false },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json(user);
}
