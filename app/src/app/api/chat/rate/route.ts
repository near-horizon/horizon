import { type NextRequest, NextResponse } from "next/server";
import { rateMessage } from "~/lib/server/copilot";
import { messageRatingSchema } from "~/lib/validation/copilot";

export async function POST(req: NextRequest) {
  const parsedBody = messageRatingSchema.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid body",
        error: parsedBody.error,
      },
      { status: 400 },
    );
  }

  const result = await rateMessage(parsedBody.data);

  return NextResponse.json(result);
}
