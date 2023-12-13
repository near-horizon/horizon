import { env } from "~/env.mjs";
import {
  MENDABLE_NEW_CONVERSATION_URL,
  MENDABLE_RATE_MESSAGE_URL,
} from "../constants/copilot";
import {
  type MessageRating,
  newConversationSchema,
} from "../validation/copilot";

export async function createNewConversation() {
  const response = await fetch(MENDABLE_NEW_CONVERSATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ api_key: env.MENDABLE_API_KEY }),
  });

  if (!response.ok) {
    throw new Error("Failed to create new conversation");
  }

  const parsedResponse = newConversationSchema.safeParse(await response.json());

  if (!parsedResponse.success) {
    throw new Error("Failed to parse response");
  }

  return parsedResponse.data;
}

export async function rateMessage({
  id: message_id,
  rating_value,
}: MessageRating) {
  try {
    const response = await fetch(MENDABLE_RATE_MESSAGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: env.MENDABLE_API_KEY,
        message_id,
        rating_value,
      }),
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}
