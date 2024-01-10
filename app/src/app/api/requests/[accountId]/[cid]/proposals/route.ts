import { type NextRequest, NextResponse } from "next/server";
import { getRequestProposals } from "~/lib/server/requests";
import { accountIdSchema, cidSchema } from "~/lib/validation/common";

export async function GET(
  _req: NextRequest,
  {
    params: { accountId, cid },
  }: { params: { accountId: string; cid: string } },
) {
  const requestProposals = await getRequestProposals(
    accountIdSchema.parse(accountId),
    cidSchema.parse(cid),
  );
  return NextResponse.json(requestProposals);
}
