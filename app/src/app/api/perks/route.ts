import { NextResponse } from "next/server";
import { getPerks } from "~/lib/server/perks";
import { getUserFromSession } from "~/lib/session";

export async function GET() {
  const user = await getUserFromSession();

  if (!user.loggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const perks = await getPerks(user.accountId);
    return NextResponse.json(perks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
