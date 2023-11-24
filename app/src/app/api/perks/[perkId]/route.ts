import { type NextRequest, NextResponse } from "next/server";
import { unlockPerk } from "~/lib/server/perks";
import { getUserFromSession } from "~/lib/session";

export async function POST(
  _req: NextRequest,
  { params: { perkId } }: { params: { perkId: string } },
) {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await unlockPerk(perkId, user.accountId);
    return NextResponse.json({ message: "Perk unlocked!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to unlock perk!" },
      { status: 500 },
    );
  }
}
