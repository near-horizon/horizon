import { z } from "zod";

export const copilotBodySchema = z.object({
  messages: z.array(
    z.object({
      content: z.string(),
    }),
  ),
});

export const newConversationSchema = z.object({
  conversation_id: z.number(),
});

export const messageRatingSchema = z.object({
  id: z.number(),
  rating_value: z.literal(1).or(z.literal(-1)),
});

export type MessageRating = z.infer<typeof messageRatingSchema>;
