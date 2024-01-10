import { type NextRequest, NextResponse } from "next/server";
import { search } from "~/lib/server/search";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q") ?? "";

  try {
    const results = await search(query);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Couldn't fetch results!" },
      { status: 500 },
    );
  }
}
