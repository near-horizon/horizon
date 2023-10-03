import { z } from "zod";

export const requirementSchema = z.object({
  requirement: z.string(),
  completed: z.boolean(),
});

export const airtableBlobSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  filename: z.string(),
  size: z.number(),
  type: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  thumbnails: z
    .object({
      small: z.object({
        url: z.string().url(),
        width: z.number(),
        height: z.number(),
      }),
      large: z.object({
        url: z.string().url(),
        width: z.number(),
        height: z.number(),
      }),
    })
    .optional(),
});

export const perkFieldsSchema = z.object({
  name: z.string(),
  logo: z.array(airtableBlobSchema),
  description: z.string(),
  benefit: z.string(),
  category: z.array(z.string()),
  instructions: z.string(),
  price: z.number(),
});

export const perkSchema = z.object({
  id: z.string(),
  url: z.union([z.string().url(), z.string().length(0)]).optional(),
  code: z.string().nullable(),
  claimed: z.boolean().optional(),
  requirements: z.array(requirementSchema).optional(),
  fields: perkFieldsSchema,
});

export type Perk = z.infer<typeof perkSchema>;
