import { useMutation } from "@tanstack/react-query";
import { rateMessage } from "~/lib/client/copilot";
import { type MessageRating } from "~/lib/validation/copilot";

export function useRateMessage() {
  return useMutation({
    mutationFn: async (rating: MessageRating) => {
      const result = await rateMessage(rating);

      if (!result) {
        throw new Error("Failed to rate message");
      }
    },
  });
}
