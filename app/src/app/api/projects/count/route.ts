import { type NextRequest, NextResponse } from "next/server";
import {
  getProjectsCount,
  projectsURLQuerySchema,
} from "~/lib/server/projects";

export async function GET(req: NextRequest) {
  const projects = await getProjectsCount(
    projectsURLQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams.entries())
    )
  );
  return NextResponse.json(projects);
}
