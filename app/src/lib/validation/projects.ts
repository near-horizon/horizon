import { z } from "zod";
import { fetchManySchema, linktreeSchema, profileSchema } from "./fetching";
import {
  accountIdSchema,
  applicationSchema,
  permissionSchema,
  transactionSchema,
} from "./common";
import { incentiveTypeSchema } from "./incentives";

export const projectsQuerySchema = fetchManySchema.extend({
  vertical: z.array(z.string()).optional(),
  integration: z.array(z.string()).optional(),
  dev: z.array(z.string()).optional(),
  stage: z.array(z.string()).optional(),
  size: z.array(z.tuple([z.number(), z.number()])).optional(),
  distribution: z.array(z.string()).optional(),
  fundraising: z.boolean().optional(),
});

export type ProjectsQuery = z.infer<typeof projectsQuerySchema>;

export const horizonSchema = z.object({
  founders: z.array(accountIdSchema),
  team: z.record(accountIdSchema, z.array(permissionSchema)),
  why: z.string(),
  integration: z.string(),
  success_position: z.string(),
  problem: z.string(),
  vision: z.string(),
  deck: z.string(),
  white_paper: z.string(),
  roadmap: z.string(),
  demo: z.string(),
  tam: z.string(),
  geo: z.string(),
  verified: z.boolean(),
  application: applicationSchema,
  credits: z.boolean(),
  contracts: z.array(accountIdSchema),
  credit_balance: z.number(),
  achieved_incentives: z.record(incentiveTypeSchema, z.number()),
});

export const sectionSchema = z.enum([
  "basic",
  "tech",
  "funding",
  "founders",
  "files",
]);

export type Section = z.infer<typeof sectionSchema>;

export function isHorizonProjectKey(key: string): key is keyof HorizonProject {
  return key in horizonSchema.shape;
}

export type HorizonProject = z.infer<typeof horizonSchema>;

export const projectSchema = horizonSchema
  .merge(
    profileSchema.omit({ team: true }).extend({
      company_size: z.coerce.string().optional(),
    })
  )
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });

export type Project = z.infer<typeof projectSchema>;

export const privateProjectSchema = z.object({
  email: z.string().email(),
});

export type PrivateProject = z.infer<typeof privateProjectSchema>;

export const backersDigestSchema = z.object({
  location: z.string().optional(),
  company_size: z.string().optional(),
  website: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  email: z.string().optional(),
  calendly_link: z.string().optional(),
  linktree: linktreeSchema.nullable().optional(),
  traction: z.record(z.string(), z.string()).optional().nullable(),
  founders: z
    .array(z.record(z.string(), z.string().or(linktreeSchema)))
    .optional(),
  pitch: z.string().optional(),
  demo: z.string().optional(),
  demo_video: z.string().optional(),
  announcement: z.string().optional(),
  published: z.boolean().optional(),
  fundraising: z.boolean().optional(),
  token: z.string().optional(),
});

export type BackersDigest = z.infer<typeof backersDigestSchema>;
