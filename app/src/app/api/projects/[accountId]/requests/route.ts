import { accountIdSchema } from "~/lib/validation/common";
import { type NextRequest, NextResponse } from "next/server";
import { getRequestsForProject } from "~/lib/server/projects";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } },
) {
  const requestsForProject = await getRequestsForProject(
    accountIdSchema.parse(accountId),
  );
  return NextResponse.json(requestsForProject);
}
