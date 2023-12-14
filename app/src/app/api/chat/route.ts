import { StreamingTextResponse } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { WELCOME_MESSAGE } from "~/lib/constants/copilot";
import { MendableStream } from "~/lib/mendable-stream";
import { createNewConversation } from "~/lib/server/copilot";
import { copilotBodySchema } from "~/lib/validation/copilot";

// Initialize an array to store links
const collectedLinks: string[] = [];

export async function POST(req: NextRequest) {
  // Extract the `messages` from the body of the request
  const parsedBody = copilotBodySchema.safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        message: "Invalid request body",
        error: parsedBody.error,
      },
      { status: 400 },
    );
  }

  const { messages } = parsedBody.data;

  const latestMessage = messages.pop();

  if (!latestMessage) {
    return NextResponse.json(
      {
        message: "No messages provided",
      },
      { status: 400 },
    );
  }

  // question is on the last message
  const { content: question } = latestMessage;

  const { conversation_id } = await createNewConversation();

  const history = messages.reduce(
    (acc, { content }, index) => {
      if (index % 2 === 0) {
        acc.push({ prompt: content });
        return acc;
      }

      acc.at(-1)!.response = content;

      return acc;
    },
    [
      {
        prompt: "",
        response: WELCOME_MESSAGE,
      },
    ] as Array<{ prompt: string; response?: string }>,
  );

  const stream = await MendableStream(
    {
      api_key: env.MENDABLE_API_KEY,
      question,
      history,
      conversation_id,
    },
    {
      // eslint-disable-next-line @typescript-eslint/require-await
      onLinksReceived: async (links) => {
        collectedLinks.push(...links);
      },
    },
  );

  return new StreamingTextResponse(stream);
}

export const runtime = "edge";
