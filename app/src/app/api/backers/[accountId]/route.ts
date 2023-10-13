import { accountIdSchema } from "~/lib/validation/common";
import { type NextRequest, NextResponse } from "next/server";
import { getBacker } from "~/lib/server/backers";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } }
) {
  const backer = await getBacker(accountIdSchema.parse(accountId));
  return NextResponse.json(backer);
}
