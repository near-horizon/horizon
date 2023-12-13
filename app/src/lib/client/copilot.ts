import { z } from "zod";
import { type MessageRating } from "../validation/copilot";

export async function rateMessage(rating: MessageRating) {
  try {
    const result = await fetch("/api/chat/rate-message", {
      method: "POST",
      body: JSON.stringify(rating),
    });

    if (!result.ok) {
      return false;
    }

    const parsedBody = z.boolean().safeParse(await result.json());

    if (!parsedBody.success) {
      return false;
    }

    return parsedBody.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
