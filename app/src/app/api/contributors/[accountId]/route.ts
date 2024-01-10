import { accountIdSchema } from "~/lib/validation/common";
import { type NextRequest, NextResponse } from "next/server";
import { getContributor } from "~/lib/server/contributors";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } },
) {
  const contributor = await getContributor(accountIdSchema.parse(accountId));
  return NextResponse.json(contributor);
}
