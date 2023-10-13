import { proposalIdSchema } from "~/lib/validation/proposals";
import { type NextRequest, NextResponse } from "next/server";
import { getContract } from "~/lib/server/contracts";

export async function GET(
  _req: NextRequest,
  {
    params: { projectId, cid, contributorId },
  }: { params: { projectId: string; cid: string; contributorId: string } }
) {
  const id = proposalIdSchema.parse([[projectId, cid], contributorId]);
  const contract = await getContract(id);
  return NextResponse.json(contract);
}
