import { z } from "zod";
import { fetchManySchema, profileSchema } from "./fetching";
import {
  accountIdSchema,
  applicationSchema,
  permissionSchema,
  transactionSchema,
} from "./common";

export const projectsQuerySchema = fetchManySchema.extend({
  vertical: z.array(z.string()).optional(),
  integration: z.array(z.string()).optional(),
  dev: z.array(z.string()).optional(),
  stage: z.array(z.string()).optional(),
  size: z.array(z.tuple([z.number(), z.number()])).optional(),
  distribution: z.array(z.string()).optional(),
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
});

export const projectSchema = horizonSchema
  .merge(
    profileSchema.omit({ team: true }).extend({
      company_size: z.string().optional(),
    })
  )
  .extend({
    creationTx: transactionSchema.optional(),
    account_id: accountIdSchema,
  });
