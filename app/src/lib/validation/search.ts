import { z } from "zod";
import { accountIdSchema, cidSchema } from "./common";
import { learningResourceSchema } from "./learn";

export const searchResultSchema = z.object({
  projects: z.array(accountIdSchema),
  requests: z.array(z.tuple([accountIdSchema, cidSchema])),
  contributors: z.array(accountIdSchema),
  backers: z.array(accountIdSchema),
  learningContent: z.array(learningResourceSchema.extend({ id: z.string() })),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
