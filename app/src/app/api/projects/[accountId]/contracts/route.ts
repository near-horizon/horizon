import { type NextRequest, NextResponse } from "next/server";
import { getProjectContracts } from "~/lib/server/projects";
import { accountIdSchema } from "~/lib/validation/common";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } },
) {
  const projectContracts = await getProjectContracts(
    accountIdSchema.parse(accountId),
  );
  return NextResponse.json(projectContracts);
}
