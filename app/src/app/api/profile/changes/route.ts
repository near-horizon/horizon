import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { getUserFromSession } from "~/lib/session";

export async function GET() {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetch(
      `${env.API_URL}/data/projects/${user.accountId}/changes`,
      {
        method: "GET",
      },
    );

    if (response.ok) {
      return NextResponse.json(await response.json());
    }

    return NextResponse.json(
      { ok: false, error: "Could not fetch changes" },
      { status: 500 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Could not perform fetch" },
      { status: 500 },
    );
  }
}
