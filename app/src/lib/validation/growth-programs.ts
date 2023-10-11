import { z } from "zod";

export const growthProgramSchema = z.object({
  name: z.string(),
  imageSvg: z.boolean(),
  imageSrc: z.string(),
  subHeader: z.string(),
  open: z.boolean(),
  equity: z.string().optional(),
  tagLine: z.string(),
  href: z.string().url(),
  duration: z.string(),
  chain: z.string(),
  location: z.string(),
  tags: z.record(z.string()),
  linkTree: z
    .object({
      website: z.string().url(),
    })
    .nonstrict(),
});

export type GrowthProgram = z.infer<typeof growthProgramSchema>;
