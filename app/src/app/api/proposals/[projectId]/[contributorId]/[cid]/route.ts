import { proposalIdSchema } from "~/lib/validation/proposals";
import { type NextRequest, NextResponse } from "next/server";
import { getProposal } from "~/lib/server/proposals";

export async function GET(
  _req: NextRequest,
  {
    params: { projectId, cid, contributorId },
  }: { params: { projectId: string; cid: string; contributorId: string } },
) {
  const id = proposalIdSchema.parse([[projectId, cid], contributorId]);
  const proposal = await getProposal(id);
  return NextResponse.json(proposal);
}
