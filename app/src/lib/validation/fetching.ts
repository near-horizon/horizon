import { z } from "zod";
import { imageSchema } from "./common";
import { env } from "~/env.mjs";
import { constObjectKeysIntoZodEnum, sortBy } from "../constants/filters";

export const oldSocialsSchema = z.enum([
  "github",
  "twitter",
  "discord",
  "linkedin",
  "youtube",
  "reddit",
  "website",
  "telegram",
  "x",
  "instagram",
]);

export const linktreeSchema = z.record(oldSocialsSchema, z.string());

export type Linktree = z.infer<typeof linktreeSchema>;

export const profileSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    image: imageSchema,
    website: z.string(),
    tagline: z.string(),
    linktree: linktreeSchema.nullable(),
    vertical: z.record(z.string(), z.string()),
    stage: z.string(),
    userbase: z.coerce.string(),
    credits: z.boolean(),
    distribution: z.string(),
    dev: z.string(),
    product_type: z.record(z.string(), z.string()).or(z.array(z.string())),
    team: z.string().or(z.record(z.string(), z.string())),
    tags: z.record(z.string(), z.string()),
  })
  .partial()
  .passthrough();

export type Profile = z.infer<typeof profileSchema>;

export function isProfileKey(key: string | number): key is keyof Profile {
  return key in profileSchema.shape;
}

export const validKeySchema = z.object({
  result: z.object({
    permission: z
      .object({
        FunctionCall: z.object({
          receiver_id: z
            .string()
            .refine((value) => value === env.NEXT_PUBLIC_CONTRACT_ACCOUNT_ID),
        }),
      })
      .or(z.literal("FullAccess")),
  }),
});

export const sortSchema = constObjectKeysIntoZodEnum(sortBy);

export const paginationSchema = z.object({
  from: z.number().optional(),
  limit: z.number().optional(),
});

export const paginationURLSchema = z.object({
  from: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
});

export const fetchManySchema = paginationSchema.extend({
  sort: sortSchema.optional(),
  q: z.string().optional(),
});

export type FetchMany = z.infer<typeof fetchManySchema>;

export const fetchManyURLSchema = paginationURLSchema.extend({
  sort: sortSchema.optional(),
  search: z.string().optional(),
});

export const statsSchema = z
  .object({
    projects: z.number(),
    vendors: z.number(),
    backers: z.number(),
    requests: z.number(),
    proposals: z.number(),
    contributions: z.number(),
  })
  .transform((value) => ({
    ...value,
    contributors: value.vendors,
  }));

export type Stats = z.infer<typeof statsSchema>;

export const fileUploadSchema = z.object({
  cid: z.string().min(59).max(59),
});
