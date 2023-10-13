import { type NextRequest, NextResponse } from "next/server";
import { getRequests, requestsURLQuerySchema } from "~/lib/server/requests";

export async function GET(req: NextRequest) {
  const requests = await getRequests(
    requestsURLQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams.entries())
    )
  );
  return NextResponse.json(requests);
}
