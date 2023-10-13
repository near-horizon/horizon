import { type NextRequest, NextResponse } from "next/server";
import { getPerks } from "~/lib/server/perks";
import { getUserFromRequest } from "~/lib/session";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);

  if (!user?.accountId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const perks = await getPerks(user.accountId);
    return NextResponse.json(perks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
