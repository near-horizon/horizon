import { accountIdSchema } from "~/lib/validation/common";
import { type NextRequest, NextResponse } from "next/server";
import { getNewProject } from "~/lib/server/projects";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } },
) {
  const newProject = await getNewProject(accountIdSchema.parse(accountId));
  return NextResponse.json(newProject);
}
