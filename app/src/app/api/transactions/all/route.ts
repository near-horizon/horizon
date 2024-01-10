import { type NextRequest, NextResponse } from "next/server";
import { getTransactions } from "~/lib/server/transactions";
import { type TransactionQuery } from "~/lib/validation/common";

export async function GET(request: NextRequest) {
  const query: TransactionQuery = {};
  if (request.nextUrl.searchParams.has("from")) {
    query.from = Number(request.nextUrl.searchParams.get("from"));
  }
  if (request.nextUrl.searchParams.has("limit")) {
    query.limit = Number(request.nextUrl.searchParams.get("limit"));
  }
  if (request.nextUrl.searchParams.has("entity_type")) {
    query.entity_type = request.nextUrl.searchParams.get(
      "entity_type",
    ) as TransactionQuery["entity_type"];
  }
  const transactions = await getTransactions(query);
  return NextResponse.json(transactions);
}
