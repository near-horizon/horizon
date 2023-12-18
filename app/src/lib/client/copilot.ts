import { z } from "zod";
import { type MessageRating } from "../validation/copilot";

export async function rateMessage(rating: MessageRating) {
  try {
    const result = await fetch("/api/chat/rate", {
      method: "POST",
      body: JSON.stringify(rating),
    });

    if (!result.ok) {
      return false;
    }

    const parsedBody = z.boolean().safeParse(await result.json());

    return parsedBody.success && parsedBody.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
