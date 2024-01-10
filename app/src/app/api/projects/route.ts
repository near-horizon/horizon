import { type NextRequest, NextResponse } from "next/server";
import { getProjects, projectsURLQuerySchema } from "~/lib/server/projects";

export async function GET(req: NextRequest) {
  const projects = await getProjects(
    projectsURLQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams.entries()),
    ),
  );
  return NextResponse.json(projects);
}
