import { z } from "zod";

export const learningResourceSchema = z.object({
  title: z.string(),
  description: z.string(),
  height: z.string(),
  link: z.string().url(),
  img: z.string().url(),
  video: z.string().url(),
  tags: z.array(z.string()),
});

export type LearningResource = z.infer<typeof learningResourceSchema>;

export const learningCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  items: z.array(learningResourceSchema),
});

export type LearningCategory = z.infer<typeof learningCategorySchema>;
