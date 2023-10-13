import { accountIdSchema, cidSchema } from "~/lib/validation/common";
import { type NextRequest, NextResponse } from "next/server";
import { getRequest } from "~/lib/server/requests";

export async function GET(
  _req: NextRequest,
  { params: { accountId, cid } }: { params: { accountId: string; cid: string } }
) {
  const request = await getRequest(
    accountIdSchema.parse(accountId),
    cidSchema.parse(cid)
  );
  return NextResponse.json(request);
}
