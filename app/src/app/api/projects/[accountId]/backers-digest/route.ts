import { type NextRequest, NextResponse } from "next/server";
import { hasBacker } from "~/lib/client/backers";
import {
  addBackersDigestToken,
  getBackersDigest,
  updateBackersDigest,
} from "~/lib/server/projects";
import { getUserFromRequest } from "~/lib/session";
import { backersDigestSchema } from "~/lib/validation/projects";

export async function GET(
  req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } }
) {
  const user = await getUserFromRequest(req);

  if (
    !user?.accountId ||
    user.accountId !== accountId ||
    (await hasBacker(user.accountId))
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getBackersDigest(accountId));
}

export async function PUT(
  req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } }
) {
  const user = await getUserFromRequest(req);

  if (!user?.accountId || user.accountId !== accountId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let digest;
  try {
    digest = backersDigestSchema.parse(await req.json());
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const result = await updateBackersDigest(accountId, digest);
    if (!result.ok) {
      throw new Error("Failed to update backers digest");
    }
    return NextResponse.json({ message: "Digest updated!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to unlock perk!" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } }
) {
  const user = await getUserFromRequest(req);

  if (!user?.accountId || user.accountId !== accountId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const token = await addBackersDigestToken(accountId);
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to unlock perk!" },
      { status: 500 }
    );
  }
}
