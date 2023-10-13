import { NextResponse } from "next/server";
import { learningResource } from "~/lib/server/learn";

export function GET() {
  return NextResponse.json(learningResource);
}
