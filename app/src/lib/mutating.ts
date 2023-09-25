import { z } from "zod";

export const progressSchema = z.object({
  value: z.number().min(0).max(100),
  label: z.string(),
});

export type Progress = z.infer<typeof progressSchema>;
