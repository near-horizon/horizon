import { type NextRequest, NextResponse } from "next/server";
import { getContributorCompletedContracts } from "~/lib/server/contributors";
import { accountIdSchema } from "~/lib/validation/common";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } },
) {
  const contributorContracts = await getContributorCompletedContracts(
    accountIdSchema.parse(accountId),
  );
  return NextResponse.json(contributorContracts);
}
