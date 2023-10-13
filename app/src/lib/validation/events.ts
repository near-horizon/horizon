import { z } from "zod";

export const eventSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type Event = z.infer<typeof eventSchema>;
