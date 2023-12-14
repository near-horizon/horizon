import { accountIdSchema } from "~/lib/validation/common";
import { type NextRequest, NextResponse } from "next/server";
import { getNewProject, updateNewProject } from "~/lib/server/projects";
import { newProjectSchema } from "~/lib/validation/project/new";
import { getUserFromSession } from "~/lib/session";

export async function GET(
  _req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } },
) {
  const newProject = await getNewProject(accountIdSchema.parse(accountId));
  return NextResponse.json(newProject);
}

export async function PUT(
  req: NextRequest,
  { params: { accountId } }: { params: { accountId: string } },
) {
  const user = await getUserFromSession();

  if (!user.logedIn) {
    return NextResponse.json({ message: "Not logged in" }, { status: 401 });
  }

  if (user.accountId !== accountId) {
    return NextResponse.json({ message: "Not authorized" }, { status: 403 });
  }

  const parseResult = newProjectSchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      {
        message: "Invalid project data",
        error: parseResult.error,
      },
      { status: 400 },
    );
  }

  if (parseResult.data.account_id !== accountId) {
    return NextResponse.json(
      {
        message: "Invalid project data",
        error: "Account ID does not match",
      },
      { status: 400 },
    );
  }

  try {
    const updatedProject = await updateNewProject(parseResult.data);

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 424 },
    );
  }
}
