import { type NextRequest, NextResponse } from "next/server";
import {
  contributorsURLQuerySchema,
  getContributors,
} from "~/lib/server/contributors";

export async function GET(req: NextRequest) {
  const contributors = await getContributors(
    contributorsURLQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams.entries()),
    ),
  );
  return NextResponse.json(contributors);
}
