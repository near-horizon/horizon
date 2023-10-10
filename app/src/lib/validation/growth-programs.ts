import { z } from "zod";

// keep imageSrc as is, since imageSrc will just point to svg local path

export const growthProgramSchema = z.object({
  name: z.string(),
  imageSvg: z.boolean(),
  // Update imageSrc to handle SVGs ?
  imageSrc: z.string(),
  subHeader: z.string(),
  open: z.boolean(),
  equity: z.string(),
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
