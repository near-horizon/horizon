import { type NextRequest, NextResponse } from "next/server";
import { backersURLQuerySchema, getBackers } from "~/lib/server/backers";

export async function GET(req: NextRequest) {
  const backers = await getBackers(
    backersURLQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams.entries()),
    ),
  );
  return NextResponse.json(backers);
}
