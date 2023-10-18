import { z } from "zod";
import { learningResourceSchema } from "./learn";
import { profileSchema } from "./fetching";
import { requestSchema } from "./requests";
import { imageSchema } from "./common";

export const searchResultSchema = z.object({
  projects: z.array(z.tuple([z.string(), profileSchema])),
  requests: z.array(requestSchema.extend({ image: imageSchema.optional() })),
  contributors: z.array(z.tuple([z.string(), profileSchema])),
  backers: z.array(z.tuple([z.string(), profileSchema])),
  learningContent: z.array(learningResourceSchema.extend({ id: z.string() })),
});

export type SearchResult = z.infer<typeof searchResultSchema>;
