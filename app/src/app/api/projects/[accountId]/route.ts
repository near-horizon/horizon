import { accountIdSchema } from "~/lib/validation/common";
import { type NextRequest, NextResponse } from "next/server";
import { getProject } from "~/lib/server/projects";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } }
) {
  const project = await getProject(accountIdSchema.parse(accountId));
  return NextResponse.json(project);
}
